<script setup lang="ts">
  import logo from '~/assets/images/logo.svg'
  import call from '~/assets/images/call.svg'
  import Button from '@/components/ui/Button/index.vue'
  const items = ref([
    {
      label: 'Giới thiệu',
      children: [
        {
          label: 'Giới thiệu về công ty'
        },
        {
          label: 'Giới thiệu về Finance Website'
        }
      ]
    },
    {
      label: 'Tính năng',

      children: [
        { label: 'Kế toán tổng hợp' },
        { label: 'Kế toán tiền mặt & ngân hàng' },
        { label: 'Kế toán mua hàng' },
        { label: 'Kế toán bán hàng' },
        { label: 'Kế toán kho' },
        { label: 'Kế toán tài sản cố định' },
        { label: 'Kế toán công cụ dụng cụ' },
        { label: 'Kế toán báo cáo' }
      ]
    },
    {
      label: 'Bảng giá'
    },
    {
      label: 'Tin tức'
    },
    {
      label: 'Hỗ trợ',
      children: [
        {
          label: 'Hướng dẫn sử dụng'
        },
        {
          label: 'Liên hệ'
        },
        {
          label: 'Hỗ trợ qua Zalo'
        }
      ]
    }
  ])
</script>

<template>
  <header class="header p-content header-container">
    <div class="flex items-center gap-x-2">
      <img :src="logo" alt="logo" />
      <h1 class="font-bold text-2xl lg:text-3xl">IFRS</h1>
    </div>

    <UNavigationMenu
      :items="items"
      content-orientation="vertical"
      class="-mx-2.5 hidden md:block"
    />

    <div class="flex justify-end">
      <div class="hidden lg:flex items-center gap-x-6">
        <div class="gap-x-2 lg:flex">
          <img :src="call" alt="Call" />
          <div class="flex flex-col">
            <span class="text-sm">Hỗ trợ khách hàng</span>
            <span class="text-primary text-md font-semibold">1800 6420</span>
          </div>
        </div>
        <Button label="Đăng ký tư vấn ngay" size="xl" />
      </div>
      <UModal fullscreen title="Modal fullscreen" class="flex md:hidden">
        <UButton label="Open" color="neutral" variant="subtle" />

        <template #body>
          <div class="h-full bg-red-200" />
        </template>
      </UModal>
    </div>
  </header>
</template>
