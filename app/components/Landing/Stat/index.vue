<script setup lang="ts">
  interface StatItem {
    value: string
    label: string
    color?: string
  }

  const stats = ref<StatItem[]>([
    {
      value: '24/7',
      label: 'Hỗ trợ kỹ thuật & cập nhật liên tục',
      color: 'text-primary'
    },
    {
      value: '50+',
      label: 'Báo cáo và dashboard tài chính chuẩn IFRS',
      color: 'text-primary'
    },
    {
      value: '98%',
      label: 'Mức độ hài lòng từ khách hàng',
      color: 'text-primary'
    },
    {
      value: '10.000+',
      label: 'Doanh nghiệp đang sử dụng IFRS',
      color: 'text-primary'
    }
  ])
</script>

<template>
  <section class="bg-white mt-16 h-100">
    <div class="p-content">
      <div class="text-center space-y-2 mb-12 md:mb-16">
        <h2>
          Giải pháp Kế toán & Tài chính
          <span class="text-primary">4.0</span>
        </h2>
        <h2>Sẵn sàng đồng hành cùng bạn</h2>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex flex-col items-center text-center"
          :class="{
            'lg:border-l lg:border-gray-200 lg:pl-6 xl:pl-8': index > 0
          }"
        >
          <!-- Value -->
          <h1
            class="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold transition-all duration-300 group-hover:scale-110"
            :class="stat.color"
          >
            {{ stat.value }}
          </h1>

          <!-- Label: wrap tự nhiên, max-width nhỏ -->
          <p
            class="mt-3 text-sm sm:text-base text-gray-700 leading-snug max-w-[180px] sm:max-w-[200px] lg:max-w-[180px]"
          >
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @media (min-width: 1024px) {
    .border-l:first-child {
      border-left: none;
      padding-left: 0;
    }
  }
</style>
