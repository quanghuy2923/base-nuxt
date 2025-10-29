// composables/useDataLoader.ts - Reusable cho load data
import type { ComputedRef } from 'vue'

// Generic response interface
interface ApiResponse<T> {
  payload: T
  metaData?: { totalItems?: number }
  status?: number
  message?: string
}

// Options for array data (like users list)
interface UseDataLoaderArrayOptions<TParams, TData> {
  fetchFn: (params: TParams) => Promise<ApiResponse<TData[]>>
  queryParams: ComputedRef<TParams>
}

// Options for single item data (like user detail)
interface UseDataLoaderSingleOptions<TParams, TData> {
  fetchFn: (params: TParams) => Promise<ApiResponse<TData>>
  queryParams: ComputedRef<TParams>
  single: true
}

// Union type for options
type UseDataLoaderOptions<TParams, TData> =
  | UseDataLoaderArrayOptions<TParams, TData>
  | UseDataLoaderSingleOptions<TParams, TData>

export function useDataLoader<TParams, TData>(
  options: UseDataLoaderArrayOptions<TParams, TData>
): {
  data: Ref<TData[]>
  pending: Ref<boolean>
  error: Ref<Error | null>
  totalItems: Ref<number>
  loadData: () => Promise<void>
}

export function useDataLoader<TParams, TData>(
  options: UseDataLoaderSingleOptions<TParams, TData>
): {
  data: Ref<TData | null>
  pending: Ref<boolean>
  error: Ref<Error | null>
  totalItems: Ref<number>
  loadData: () => Promise<void>
}

export function useDataLoader<TParams, TData>(options: UseDataLoaderOptions<TParams, TData>) {
  const data = ref<TData[] | TData | null>('single' in options && options.single ? null : [])
  const pending = ref(false)
  const error = ref<Error | null>(null)
  const totalItems = ref(0)
  const toast = useToast()

  const loadData = async () => {
    try {
      pending.value = true
      error.value = null

      const params = options.queryParams.value as TParams
      const response = await options.fetchFn(params)

      if ('single' in options && options.single) {
        data.value = response.payload as TData
        totalItems.value = 1
      } else {
        data.value = response.payload as TData[]
        totalItems.value = response.metaData?.totalItems || 0
      }
    } catch (e) {
      error.value = e as Error
      toast.add({
        title: (e as Error).message,
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    } finally {
      pending.value = false
    }
  }

  watch(options.queryParams, loadData, { immediate: true })

  return { data, pending, error, totalItems, loadData }
}
