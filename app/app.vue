<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  useHead({
    title: 'My App',
    meta: [
      { name: 'description', content: 'My amazing site.' },
      { name: 'keywords', content: 'nuxt, vue, javascript' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: { class: 'test' }
  })
</script>
