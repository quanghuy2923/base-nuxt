<script setup lang="ts">
  import Badge from '~/components/ui/Badge/index.vue'
</script>

<template>
  <section class="h-54 mt-8 flex flex-col items-center gap-y-16">
    <span>
      <Badge color="neutral" variant="outline" size="lg">
        <span class="gradient-text font-semibold">10.000+</span>
      </Badge>
      <span class="ml-2">doanh nghiệp đã chuyển mình cùng</span>
      <span class="text-primary ml-2 font-semibold">IFRS</span>
    </span>
    <div>
      <UMarquee class="w-[70vw]">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    </div>
  </section>
</template>

<style scoped>
  .gradient-text {
    background: linear-gradient(
      90deg,
      #000 0%,
      #000 20%,
      #3b82f6 40%,
      #2563eb 50%,
      #3b82f6 60%,
      #000 80%,
      #000 100%
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-wave 6s ease-in-out infinite;
  }

  @keyframes gradient-wave {
    0%,
    100% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
