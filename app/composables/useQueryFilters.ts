// composables/useQueryFilters.ts - Reusable cho quản lý filters từ query
import type { Ref } from 'vue'

interface UseQueryFiltersOptions<T> {
  defaultFilters: T
}

export function useQueryFilters<T extends Record<string, any>>(options: UseQueryFiltersOptions<T>) {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const filterForm = ref<T>({ ...options.defaultFilters })
  const showFilter = ref(false)

  const queryParams = computed(
    () =>
      ({
        page: Number(route.query.page) || 1,
        pageSize: Number(route.query.pageSize) || 10,
        ...Object.fromEntries(
          Object.entries(route.query).filter(([key]) => key in options.defaultFilters)
        )
      }) as { page: number; pageSize: number } & T
  )

  const updateQuery = (updates: Partial<{ page: number; pageSize: number } & T>) => {
    router.push({
      query: {
        ...route.query,
        ...updates,
        page: updates.page ?? 1 // Reset page khi filter
      }
    })
  }

  const applyFilter = () => {
    updateQuery(filterForm.value)
  }

  const resetFilter = () => {
    filterForm.value = { ...options.defaultFilters }
    router.push({ query: { page: 1, pageSize: queryParams.value.pageSize } })
  }

  watch(
    () => route.query,
    () => {
      filterForm.value = { ...queryParams.value } as T
    },
    { immediate: true }
  )

  return { queryParams, filterForm, showFilter, applyFilter, resetFilter, updateQuery }
}
