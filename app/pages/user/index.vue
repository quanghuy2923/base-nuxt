<script setup lang="ts">
  import { h, resolveComponent } from 'vue'
  import type { TableColumn } from '@nuxt/ui'
  import { useClipboard } from '@vueuse/core'
  import { getUsers } from '~/apis/user'
  import { useSearchParams } from '~/composables/useSearchParams'
  import Button from '@/components/ui/Button'

  const UButton = resolveComponent('UButton')
  const UCheckbox = resolveComponent('UCheckbox')
  const UDropdownMenu = resolveComponent('UDropdownMenu')
  const UAlert = resolveComponent('UAlert')

  const toast = useToast()
  const { copy } = useClipboard()
  const { locales, setLocale } = useI18n()
  const { t } = useI18n()

  const defaultFilter = {
    fullName: '',
    email: '',
    positionName: '',
    roles: '',
    status: '',
    createdFrom: '',
    createdTo: ''
  }
  const { filterForm, queryParams, applyFilter, resetFilter } = useSearchParams(defaultFilter)

  const showFilter = ref(false)

  const {
    data: users,
    pending,
    error,
    totalItems
  } = useDataLoader({
    fetchFn: getUsers,
    queryParams
  })

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
    {
      accessorKey: 'userCode',
      header: '#',
      cell: ({ row }) => `#${row.getValue('userCode')}`
    },
    {
      accessorKey: 'fullName',
      header: 'Name'
    },
    {
      accessorKey: 'positionName',
      header: 'Position',
      cell: ({ row }) => row.getValue('positionName') || '--'
    },
    {
      accessorKey: 'roles',
      header: 'Role'
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Email',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const items = [
          { type: 'label', label: 'Actions' },
          {
            label: 'View profile',
            onSelect() {
              router.push(`/user/${row.original.userCode}`)
            }
          },
          {
            label: 'Copy user ID',
            onSelect() {
              copy(String(row.original.userCode))
              toast.add({
                title: 'User Code copied to clipboard!',
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
</script>

<template>
  <div class="flex-1 flex flex-col w-full p-12 gap-4">
    <!-- ============ FILTER SECTION ============ -->
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <UButton
          :icon="showFilter ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          :label="showFilter ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'"
          color="neutral"
          variant="outline"
          @click="showFilter = !showFilter"
        />
        <UButton
          v-if="showFilter"
          color="primary"
          label="Áp dụng"
          icon="i-lucide-filter"
          @click="applyFilter"
        />
        <UButton
          v-if="showFilter"
          color="neutral"
          label="Reset"
          icon="i-lucide-refresh-ccw"
          @click="resetFilter"
        />
      </div>

      <UCard v-show="showFilter">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <!-- Họ và tên -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Họ và tên</label>
            <UInput v-model="filterForm.fullName" placeholder="Nhập họ và tên..." />
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <UInput v-model="filterForm.email" type="email" placeholder="Nhập email..." />
          </div>

          <!-- Chức vụ -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Chức vụ</label>
            <USelect
              v-model="filterForm.positionName"
              :options="[
                { label: 'Tất cả', value: '' },
                { label: 'Developer', value: 'Developer' },
                { label: 'Designer', value: 'Designer' },
                { label: 'Manager', value: 'Manager' },
                { label: 'Admin', value: 'Admin' }
              ]"
              placeholder="Chọn chức vụ..."
            />
          </div>

          <!-- Vai trò -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Vai trò</label>
            <USelect
              v-model="filterForm.roles"
              :options="[
                { label: 'Tất cả', value: '' },
                { label: 'Admin', value: 'Admin' },
                { label: 'User', value: 'User' },
                { label: 'Guest', value: 'Guest' }
              ]"
              placeholder="Chọn vai trò..."
            />
          </div>

          <!-- Trạng thái -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Trạng thái</label>
            <URadioGroup
              v-model="filterForm.status"
              :options="[
                { label: 'Tất cả', value: '' },
                { label: 'Hoạt động', value: 'active' },
                { label: 'Không hoạt động', value: 'inactive' }
              ]"
            />
          </div>

          <!-- Ngày tạo -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Ngày tạo</label>
            <div class="flex gap-2">
              <UInput v-model="filterForm.createdFrom" type="date" placeholder="Từ ngày" />
              <UInput v-model="filterForm.createdTo" type="date" placeholder="Đến ngày" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- ============ ERROR STATE ============ -->
    <UAlert
      v-if="error"
      color="error"
      icon="i-lucide-circle-x"
      :title="error.message"
      variant="soft"
    />
    <div>
      <Button v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
        {{ locale.name }}
      </Button>
      <h1>{{ t('test.hello') }}</h1>
    </div>

    <div class="flex-1 rounded-lg overflow-hidden flex flex-col">
      <DataTable
        :data="users || []"
        :columns="columns"
        :loading="pending"
        :total="totalItems"
        :query-params="queryParams"
      ></DataTable>
    </div>
  </div>
</template>
