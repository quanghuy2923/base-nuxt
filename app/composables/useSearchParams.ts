// composables/useSearchParams.ts
import { ref, computed, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useSearchParams<T extends Record<string, any>>(defaultFilter: T) {
  const router = useRouter()
  const route = useRoute()

  // Khởi tạo filterForm với giá trị mặc định
  const filterForm = ref<T>({ ...defaultFilter })

  // Đồng bộ filterForm với route.query khi mount
  const initializeParams = () => {
    const currentQuery = route.query
    Object.keys(defaultFilter).forEach((key) => {
      if (currentQuery[key]) filterForm.value[key] = currentQuery[key] as string
    })
    if (!currentQuery.page || !currentQuery.pageSize) {
      updateParams({ page: '1', pageSize: '10' })
    }
  }

  // Tạo queryParams computed
  const queryParams = computed(() => {
    const defaults = { page: '1', pageSize: '10' }
    return {
      ...defaults,
      ...Object.fromEntries(
        Object.entries(unref(filterForm)).map(([key, value]) => [key, value || ''])
      ),
      ...route.query // Ghi đè bằng query hiện tại
    }
  })

  // Hàm cập nhật query params
  const updateParams = (params: Record<string, any>) => {
    router.push({ query: { ...queryParams.value, ...params } })
  }

  // Áp dụng filter
  const applyFilter = () => {
    updateParams({ ...unref(filterForm), page: '1' })
  }

  // Reset filter
  const resetFilter = () => {
    const { pageSize } = queryParams.value
    filterForm.value = { ...defaultFilter }
    updateParams({ page: '1', pageSize })
  }

  // Gọi initialize khi sử dụng
  initializeParams()

  return { filterForm, queryParams, applyFilter, resetFilter }
}
