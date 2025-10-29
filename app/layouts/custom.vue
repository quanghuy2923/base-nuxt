<template>
  <div>
    <p class="text-amber-400">Some custom layout content shared across all pages</p>
    <slot />
  </div>
  
</template>
<script setup lang="ts">
  const toast = useToast()

  function showToast() {
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      icon: 'i-lucide-wifi',
      close: {
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }
    })
  }
</script>
