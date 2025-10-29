<template>
  <UBadge v-bind="$attrs" :class="['rounded-xl', $attrs.class]">
    <slot />
  </UBadge>
</template>

<script setup></script>
