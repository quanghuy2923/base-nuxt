import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { useAuthStore } from '~/stores/auth'

type Json = Record<string, any> | null | undefined

type ApiOk<T> = { ok: true; data: T; status: number; headers: Headers }
type ApiErr = { ok: false; message?: string; status: number; headers?: Headers; detail?: string }
type ApiResult<T> = ApiOk<T> | ApiErr

const DEFAULTS: Partial<FetchOptions> = {
  retry: 2,
  retryDelay: 500,
  retryStatusCodes: [408, 429, 500, 502, 503, 504],
  parseResponse: JSON.parse
}

export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const controller = new AbortController()

  const api = ofetch.create({
    baseURL: (config.public.apiBase as string) || 'https://hrm-uat.pratek.vn/api',
    ...DEFAULTS,
    onRequest({ options }) {
      options.headers = new Headers(options.headers ?? {})

      if (!options.headers.has('Content-Type') && options.method !== 'GET') {
        options.headers.set('Content-Type', 'application/json')
      }

      if (auth.getToken && !options.headers.has('Authorization')) {
        options.headers.set('Authorization', `Bearer ${auth.getToken}`)
      }
    },
    onResponse({ response }) {
      console.log('[API]', response.url, response.status)
    },
    onResponseError({ response }) {
      console.log('[API]', response.url, response.status)
      throw createError({
        statusCode: response.status,
        statusMessage: response._data.detail
      })
    }
  })

  async function request<T = unknown>(
    url: string,
    opts: FetchOptions<'json'> = {}
  ): Promise<ApiResult<T>> {
    try {
      const data = await api<T>(url, {
        signal: controller.signal,
        ...opts
      })
      const headers: Headers =
        (opts as any)?.headers instanceof Headers
          ? (opts as any).headers
          : new Headers((opts as any)?.headers)
      return { ok: true, data, status: 200, headers }
    } catch (e: any) {
      const status = e?.statusCode ?? 500
      const message = e?.statusMessage || e?.message || 'Unexpected error'
      return { ok: false, message, status, detail: e?.detail }
    }
  }

  const get = <T = unknown>(url: string, query?: Json, opts?: FetchOptions<'json'>) =>
    request<T>(url, { method: 'GET', query: query as Record<string, any> | undefined, ...opts })

  const post = <T = unknown>(url: string, body?: Json, opts?: FetchOptions<'json'>) =>
    request<T>(url, { method: 'POST', body, ...opts })

  const put = <T = unknown>(url: string, body?: Json, opts?: FetchOptions<'json'>) =>
    request<T>(url, { method: 'PUT', body, ...opts })

  const patch = <T = unknown>(url: string, body?: Json, opts?: FetchOptions<'json'>) =>
    request<T>(url, { method: 'PATCH', body, ...opts })

  const del = <T = unknown>(url: string, body?: Json, opts?: FetchOptions<'json'>) =>
    request<T>(url, { method: 'DELETE', body, ...opts })

  const cancel = () => controller.abort()

  return { api, request, get, post, put, patch, del, cancel }
}
