<script setup lang="ts">
  import bgImage from '@/assets/images/bg.jpg'
  import Button from '@/components/ui/Button'
  const features = [
    'Tiên phong ứng dụng AI vào quản trị',
    'Liên thông dữ liệu giữa các phòng ban',
    'Giải pháp sản xuất thông minh, kiểm soát chi phí chặt chẽ',
    'AI thu thập & cảnh báo rủi ro HĐ ĐT'
  ]
</script>

<template>
  <section class="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
    <div
      class="absolute inset-0 w-full bg-cover bg-center bg-no-repeat h-full"
      :style="{ backgroundImage: `url(${bgImage})` }"
    />

    <div class="relative z-10 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-30 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 text-white space-y-8">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          >
            Giải pháp kế toán online theo chuẩn IFRS dành cho doanh nghiệp hiện đại
          </h1>

          <p class="text-sm sm:text-base lg:text-lg text-blue-50">
            Tự động hóa hạch toán, báo cáo và tuân thủ chuẩn mực kế toán quốc tế IFRS – giúp doanh
            nghiệp quản trị tài chính minh bạch, hiệu quả và sẵn sàng hội nhập toàn cầu.
          </p>
          <div class="flex flex-col gap-y-2">
            <ul v-for="feature in features" class="text-sm sm:text-base lg:text-lg text-blue-50">
              <li class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle-20-solid" class="h-5 w-5" />
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row gap-[10px]">
            <Button size="xl" color="warning" class="gap-3 group">
              Dùng thử miễn phí
              <div class="bg-white rounded-full p-3 flex items-center justify-center">
                <UIcon
                  name="i-heroicons-arrow-right"
                  class="h-4 w-4 text-black -rotate-45 transition-transform duration-300 group-hover:rotate-0 f"
                />
              </div>
            </Button>

            <Button
              label="Đăng ký tư vấn"
              size="xl"
              color="primary"
              class="border-1 border-amber-50"
            />
            <Button label="Mua ngay" size="xl" color="neutral" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
