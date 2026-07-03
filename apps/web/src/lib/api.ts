import type {
  AgeGroup,
  BillingCycle,
  CheckoutInput,
  ContentCategory,
  CreateBabyProfileInput,
  ForgotPasswordInput,
  Language,
  LoginInput,
  RegisterInput,
  SubscriptionPlan,
  UpdateBabyProfileInput,
} from '@commet/shared';
import { mockDispatch } from '@/lib/mock';
import { useAuthStore, type AuthUser } from '@/stores/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
/** Frontend-only mock: when '1', the API client serves fixtures without a backend. */
const USE_MOCK = process.env.NEXT_PUBLIC_API_MOCK === '1';

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

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

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
  const method = (options.method ?? 'GET').toString().toUpperCase();

  // Mock layer (frontend-only). Handled routes return here; everything else falls through to fetch.
  if (USE_MOCK) {
    const mocked = await mockDispatch<T>(method, path, body);
    if (mocked) {
      if (!mocked.success) throw new ApiError(mocked.error);
      return mocked;
    }
  }

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

/* ------------------------------ profiles API ------------------------------ */

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string;
  avatarId: string;
  languagePref: Language;
}

export const profilesApi = {
  list: () => apiRequest<BabyProfile[]>('/api/v1/profiles', { auth: true }),
  create: (input: CreateBabyProfileInput) =>
    apiRequest<BabyProfile>('/api/v1/profiles', { method: 'POST', body: input, auth: true }),
  update: (id: string, input: UpdateBabyProfileInput) =>
    apiRequest<BabyProfile>(`/api/v1/profiles/${id}`, { method: 'PATCH', body: input, auth: true }),
  remove: (id: string) =>
    apiRequest<null>(`/api/v1/profiles/${id}`, { method: 'DELETE', auth: true }),
};

/* ------------------------------- content API ------------------------------ */
// Shape mirrors the Content model in packages/database + docs/API.md.

export interface Content {
  id: string;
  slug: string;
  title: string;
  description: string;
  ageGroup: AgeGroup;
  category: ContentCategory;
  language: Language;
  thumbnailUrl?: string;
  durationSeconds: number;
  youtubeVideoId?: string;
  audioUrl?: string;
  isFree: boolean;
  featured: boolean;
  tags: string[];
}

export interface ContentFilters {
  ageGroup?: AgeGroup;
  category?: ContentCategory;
  language?: Language;
  search?: string;
  page?: number;
  perPage?: number;
}

function toQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') q.set(k, String(v));
  }
  const s = q.toString();
  return s ? `?${s}` : '';
}

export const contentApi = {
  list: (filters: ContentFilters = {}) =>
    apiRequest<Content[]>(`/api/v1/content${toQuery({ ...filters })}`, { auth: true }),
  featured: () => apiRequest<Content[]>('/api/v1/content/featured', { auth: true }),
  bySlug: (slug: string) => apiRequest<Content>(`/api/v1/content/${slug}`, { auth: true }),
};

/* ------------------------------- billing API ------------------------------ */
// Mirrors docs/API.md (billing endpoints). Checkout input is validated with
// CheckoutInputSchema from @commet/shared before calling.

export interface CheckoutSession {
  checkoutUrl: string;
}

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  hasBilingualAddon: boolean;
  status: string;
  currentPeriodEnd?: string;
}

export const billingApi = {
  checkout: (input: CheckoutInput) =>
    apiRequest<CheckoutSession>('/api/v1/billing/checkout', {
      method: 'POST',
      body: input,
      auth: true,
    }),
  subscription: () =>
    apiRequest<SubscriptionInfo | null>('/api/v1/billing/subscription', { auth: true }),
  portal: () =>
    apiRequest<{ portalUrl: string }>('/api/v1/billing/portal', { method: 'POST', auth: true }),
};
