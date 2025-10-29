<template>
  <div :class="itemClass">
    <UFormField :label="label" :name="name" :required="required" :error="error">
      <slot />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    label: string
    name: string
    required?: boolean
    error?: string
    span?: number | string
    gridCols?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    gridCols: 24
  })

  const itemClass = computed(() => {
    if (!props.span) return ''

    const spanValue = typeof props.span === 'string' ? parseInt(props.span) : props.span
    const cols = props.gridCols

    if (cols === 12) {
      if (spanValue === 12) return 'col-span-2'
      if (spanValue === 6) return 'col-span-1'
      if (spanValue === 4) return 'col-span-1'
    }

    if (cols === 24) {
      if (spanValue === 24) return 'col-span-2'
      if (spanValue === 12) return 'col-span-1'
      if (spanValue === 8) return 'col-span-1'
      if (spanValue === 6) return 'col-span-1'
    }

    return ''
  })
</script>
