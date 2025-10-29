<script setup lang="ts">
  import { h, resolveComponent } from 'vue'
  import { upperFirst } from 'scule'
  import type { TableColumn } from '@nuxt/ui'
  import { useClipboard } from '@vueuse/core'
  import { getObjects } from '~/apis/object'

  const UButton = resolveComponent('UButton')
  const UCheckbox = resolveComponent('UCheckbox')
  const UDropdownMenu = resolveComponent('UDropdownMenu')

  const toast = useToast()
  const { copy } = useClipboard()
  const route = useRoute()

  const inputs = ref({
    id: String(route.query.id || ''),
    name: String(route.query.name || ''),
    status: String(route.query.status || '')
  })

  const objects = ref<any[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)
  watch(
    computed(() => route.query),
    async () => {
      await handleLoadObjects()
    }
  )

  const handleLoadObjects = async () => {
    pending.value = true
    try {
      const result = await getObjects(route.query)
      objects.value = result
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

  onMounted(async () => {
    await handleLoadObjects()
  })

  const handleClick = () => {
    cleanQuery(inputs.value)
  }

  const columns: TableColumn<any>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        h(UCheckbox, {
          modelValue: table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            table.toggleAllPageRowsSelected(!!value),
          'aria-label': 'Select all'
        }),
      cell: ({ row }) =>
        h(UCheckbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
          'aria-label': 'Select row'
        }),
      enableSorting: false,
      enableHiding: false
    },
    { accessorKey: 'id', header: '#', cell: ({ row }) => `#${row.getValue('id')}` },
    { accessorKey: 'name', header: 'Name' },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const items = [
          { type: 'label', label: 'Actions' },
          {
            label: 'Copy user ID',
            onSelect() {
              copy(String(row.original.id))
              toast.add({
                title: 'Payment ID copied to clipboard!',
                color: 'success',
                icon: 'i-lucide-circle-check'
              })
            }
          },
          {
            label: row.getIsExpanded() ? 'Collapse' : 'Expand',
            onSelect() {
              row.toggleExpanded()
            }
          },
          { type: 'separator' as const },
          { label: 'View profile' }
        ]
        return h(
          'div',
          { class: 'text-right' },
          h(
            UDropdownMenu,
            { content: { align: 'end' }, items, 'aria-label': 'Actions dropdown' },
            () =>
              h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                class: 'ml-auto',
                'aria-label': 'Actions dropdown'
              })
          )
        )
      }
    }
  ]

  const table = useTemplateRef('table')
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full p-12">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-refresh-ccw"
        :loading="pending"
        @click="handleLoadObjects"
        label="Load Objects"
      />
      <!-- Input cho các query -->
      <UInput v-model="inputs.id" class="max-w-sm" clearable placeholder="Enter ID" />
      <UInput v-model="inputs.name" class="max-w-sm" clearable placeholder="Enter Name" />
      <UInput v-model="inputs.status" class="max-w-sm" clearable placeholder="Enter Status" />
      <UButton @click="handleClick">Update Query</UButton>

      <UDropdownMenu
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(checked)
              },
              onSelect(e: Event) {
                e.preventDefault()
              }
            }))
        "
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>

    <div v-if="error" class="px-4 py-3.5 text-sm text-error">
      Lỗi tải dữ liệu: {{ (error as any)?.message || error }}
    </div>

    <UTable
      ref="table"
      :data="objects || []"
      :columns="columns"
      sticky
      class="h-full"
      :loading="pending"
    >
      <template #expanded="{ row }">
        <pre class="text-xs">{{ row.original }}</pre>
      </template>
    </UTable>

    <div class="px-4 py-3.5 text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} /
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} hàng được chọn.
    </div>
  </div>
</template>
