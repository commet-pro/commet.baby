import type { ApiResponse } from '@/lib/api';
import { MOCK_CONTENT } from './data';

const LATENCY_MS = 250;
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Mock dispatcher (frontend-only). Returns an envelope for handled routes, or `null`
 * to let the real `fetch` take over. Active only when NEXT_PUBLIC_API_MOCK=1.
 */
export async function mockDispatch<T>(
  method: string,
  path: string,
  _body?: unknown,
): Promise<ApiResponse<T> | null> {
  const url = new URL(path, 'http://mock.local');
  const p = url.pathname;
  const q = url.searchParams;

  // GET /api/v1/content/featured  (must precede the generic :slug match)
  if (method === 'GET' && p === '/api/v1/content/featured') {
    await delay(LATENCY_MS);
    const data = MOCK_CONTENT.filter((c) => c.featured);
    return { success: true, data: data as unknown as T };
  }

  // GET /api/v1/content  (filters: ageGroup, category, language, search)
  if (method === 'GET' && p === '/api/v1/content') {
    await delay(LATENCY_MS);
    let data = [...MOCK_CONTENT];
    const ageGroup = q.get('ageGroup');
    if (ageGroup) data = data.filter((c) => c.ageGroup === ageGroup);
    const category = q.get('category');
    if (category) data = data.filter((c) => c.category === category);
    const language = q.get('language');
    if (language) data = data.filter((c) => c.language === language);
    const search = q.get('search')?.trim().toLowerCase();
    if (search) {
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.description.toLowerCase().includes(search) ||
          c.tags.some((t) => t.toLowerCase().includes(search)),
      );
    }
    return {
      success: true,
      data: data as unknown as T,
      meta: { page: 1, perPage: data.length, total: data.length },
    };
  }

  // GET /api/v1/content/:slug
  const slug = p.match(/^\/api\/v1\/content\/([^/]+)$/);
  if (method === 'GET' && slug) {
    await delay(LATENCY_MS);
    const item = MOCK_CONTENT.find((c) => c.slug === slug[1]);
    if (!item) {
      return {
        success: false,
        error: { code: 'CONTENT_NOT_FOUND', message: 'Conteúdo não encontrado.', statusCode: 404 },
      };
    }
    return { success: true, data: item as unknown as T };
  }

  return null;
}
