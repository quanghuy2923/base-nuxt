<template>
  <UButton v-bind="$attrs" :class="['cursor-pointer', $attrs.class]">
    <slot />
  </UButton>
</template>

<script setup></script>
