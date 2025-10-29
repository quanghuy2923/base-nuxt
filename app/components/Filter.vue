<template>
  <div class="w-full">
    <div class="flex items-center gap-2 mb-4">
      <UButton
        :icon="isOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        :label="isOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'"
        color="neutral"
        variant="outline"
        @click="toggleFilter"
      />
      <UButton
        v-if="isOpen"
        color="primary"
        label="Áp dụng bộ lọc"
        icon="i-lucide-filter"
        @click="applyFilter"
      />
      <UButton
        v-if="isOpen"
        color="neutral"
        label="Reset"
        icon="i-lucide-refresh-ccw"
        @click="resetFilter"
      />
    </div>

    <!-- Collapsible Filter Content -->
    <UCard v-show="isOpen" class="mb-4">
      <UForm :state="modelValue" @submit="applyFilter">
        <div class="grid grid-cols-1" :class="gridClass">
          <slot />
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: Record<string, any>
    gridCols?: number
    defaultOpen?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    gridCols: 24,
    defaultOpen: false
  })

  const emit = defineEmits<{
    'update:modelValue': [value: Record<string, any>]
    filter: [value: Record<string, any>]
    reset: []
  }>()

  const isOpen = ref(props.defaultOpen)

  const gridClass = computed(() => {
    const cols = props.gridCols
    if (cols === 12) return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    if (cols === 24) return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'
    return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  })

  const toggleFilter = () => {
    isOpen.value = !isOpen.value
  }

  const applyFilter = () => {
    emit('filter', { ...props.modelValue })
  }

  const resetFilter = () => {
    emit('reset')
  }
</script>
