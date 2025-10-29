<!-- components/DataTable.vue - Reusable table với pagination -->
<script setup lang="ts">
  import type { TableColumn } from '@nuxt/ui'

  const props = defineProps<{
    data: any[]
    columns: TableColumn<any>[]
    loading?: boolean
    total?: number

    queryParams: {
      page: number
      pageSize: number
    }
  }>()
  const router = useRouter()
  const route = useRoute()

  const table = useTemplateRef<HTMLTableElement>('table')
  const { t } = useI18n()
</script>

<template>
  <div class="flex-1 rounded-lg overflow-hidden flex flex-col">
    <UTable
      ref="table"
      :data="data"
      :columns="columns"
      sticky
      class="flex-1"
      :loading="loading"
      loading-state="Đang tải dữ liệu…"
    >
      <template #expanded="{ row }">
        <slot name="expanded" :row="row">
          <pre class="text-xs p-4">{{ row.original }}</pre>
        </slot>
      </template>
    </UTable>

    <div
      class="px-4 py-3.5 text-sm text-muted flex items-center justify-between border-t border-accented bg-background"
    >
      <span v-if="data.length > 0">
        {{
          t('common.table.rowsSelected', {
            total: (table as any)?.tableApi?.getFilteredRowModel().rows.length || 0,
            selected: (table as any)?.tableApi?.getFilteredSelectedRowModel().rows.length || 0
          })
        }}
      </span>
      <UPagination
        v-if="data.length > 0"
        :model-value="queryParams.page"
        :items-per-page="queryParams.pageSize"
        :total="total"
        :page="Number(route.query.page) || 1"
        @update:page="(p) => router.push({ query: { ...route.query, page: p } })"
      />
    </div>
  </div>
</template>
