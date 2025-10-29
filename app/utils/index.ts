export const { format: formatNumber } = Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1
})

// utils/cn.ts
export function cn(...classes: any[]): string {
  return classes
    .flat(Infinity) // gộp mảng lồng
    .filter(Boolean) // bỏ null/undefined/false
    .join(' ') // nối thành chuỗi
}

export function cleanQuery(
  queryUpdates: Record<string, any>,
  options: { preserveExisting?: boolean } = { preserveExisting: true }
): void {
  const route = useRoute()
  const { push } = useRouter()

  // Lấy query hiện tại
  const currentQuery = options.preserveExisting ? { ...route.query } : {}

  // Cập nhật hoặc xóa query
  Object.entries(queryUpdates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      delete currentQuery[key] // Xóa query nếu giá trị rỗng
    } else {
      currentQuery[key] = String(value) // Chuyển value thành string
    }
  })

  // Đẩy query mới vào URL
  push({ query: currentQuery }).catch((err) => {
    console.error('Error updating query:', err)
  })
}
export const normalizeQueryValue = (value: string | string[] | null | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || '' // Lấy giá trị đầu tiên nếu là mảng, hoặc chuỗi rỗng
  }
  return value || '' // Trả về chuỗi rỗng nếu là null/undefined
}

export function normalizeQueryObject(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' && v !== null))
}
