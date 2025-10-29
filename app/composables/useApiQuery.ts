import type { FetchOptions } from 'ofetch'

type UseApiQueryOpts = {
  query?: Record<string, any>
  fetch?: FetchOptions<'json'>
  immediate?: boolean
  watch?: any[]
  server?: boolean
}

export function useApiQuery<T>(key: string, url: string, opts: UseApiQueryOpts = {}) {
  const { request } = useApi()

  return useAsyncData<T>(
    key,
    async () => {
      const res = await request<T>(url, { method: 'GET', query: opts.query, ...(opts.fetch ?? {}) })
      if (!res.ok) throw createError({ statusCode: res.status, statusMessage: res.message })
      return res.data
    },
    {
      server: opts.server ?? true,
      immediate: opts.immediate ?? true,
      watch: opts.watch
    }
  )
}
