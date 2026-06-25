import type { ForgotPasswordInput, LoginInput, RegisterInput } from '@commet/shared';
import { useAuthStore, type AuthUser } from '@/stores/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/* --------------------------- response envelope ---------------------------- */
// Mirrors the backend contract documented in apps/api/README.md.

export interface ApiErrorShape {
  code: string;
  message: string;
  statusCode: number;
}

export interface ApiSuccess<T> {
  success: true;
  data?: T;
  message?: string;
  meta?: { page: number; perPage: number; total: number };
}

interface ApiFailure {
  success: false;
  error: ApiErrorShape;
}

type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
  code: string;
  statusCode: number;
  constructor(err: ApiErrorShape) {
    super(err.message);
    this.name = 'ApiError';
    this.code = err.code;
    this.statusCode = err.statusCode;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Anexa o header Authorization: Bearer <token> a partir do auth store. */
  auth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  const { body, auth = false, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string> | undefined),
  };
  if (auth) {
    const token = useAuthStore.getState().accessToken;
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError({
      code: 'NETWORK_ERROR',
      message:
        'Não foi possível conectar à API. Confira se o backend está rodando em ' + API_URL + '.',
      statusCode: 0,
    });
  }

  let json: ApiResponse<T> | null = null;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch {
    json = null;
  }

  if (!json) {
    throw new ApiError({
      code: 'INVALID_RESPONSE',
      message: 'Resposta inválida da API.',
      statusCode: res.status,
    });
  }
  if (!json.success) {
    throw new ApiError(json.error);
  }
  return json;
}

/* -------------------------------- auth API -------------------------------- */

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
}

export const authApi = {
  register: (input: RegisterInput) =>
    apiRequest<AuthSession>('/api/v1/auth/register', { method: 'POST', body: input }),
  login: (input: LoginInput) =>
    apiRequest<AuthSession>('/api/v1/auth/login', { method: 'POST', body: input }),
  forgotPassword: (input: ForgotPasswordInput) =>
    apiRequest<null>('/api/v1/auth/forgot-password', { method: 'POST', body: input }),
  logout: () => apiRequest<null>('/api/v1/auth/logout', { method: 'POST', auth: true }),
  me: () => apiRequest<AuthUser>('/api/v1/users/me', { auth: true }),
};
