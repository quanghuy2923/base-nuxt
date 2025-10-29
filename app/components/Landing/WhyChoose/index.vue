<script setup lang="ts">
  import Button from '@/components/ui/Button/index.vue'
  const items = [
    {
      id: 'accounting',
      iconName: 'i-heroicons-sparkles',
      label: 'Hạch toán chính xác',
      title: 'CHÍNH XÁC & TỰ ĐỘNG',
      heading: 'Hạch toán chính xác – ghi sổ tự động, không cần thao tác thủ công',
      description:
        'IFRS tự động xác định định khoản kế toán phù hợp với từng nghiệp vụ, sinh chứng từ kế toán và bút toán đảo tức thời - đảm bảo sổ sách kế toán luôn đúng, dù và nhất quán.',
      features: [
        'Tự động xác định tài khoản Nợ/Có theo từng loại giao dịch.',
        'Sinh chứng từ kế toán và ghi sổ cái ngay khi người dùng bấm "Ghi sổ".',
        'Bút toán đảo tự động khi hoàn tiền hoặc hủy chứng từ.',
        'Giảm thiểu rủi ro sai lệch dữ liệu, chuẩn hóa toàn bộ quy trình kế toán.'
      ],
      emoji: '📊'
    },
    {
      id: 'realtime',
      iconName: 'i-heroicons-shopping-cart',
      label: 'Cập nhật tức thời',
      title: 'CẬP NHẬT TỨC THỜI',
      heading: 'Cập nhật tức thời – kiểm soát tài chính doanh nghiệp mọi lúc, mọi nơi',
      description:
        'Dữ liệu kế toán được tổng hợp và phản ánh ngay khi phát sinh giao dịch. Giúp nhà quản lý đưa ra quyết định nhanh chóng, chính xác dựa trên số liệu realtime.',
      features: [
        'Báo cáo Cân đối kế toán, Kết quả hoạt động - Lưu chuyển tiền tệ hiện tại hiện thị tức thời.',
        'Số cái, Sổ chi tiết, CDPS liên kết trực tiếp với chứng từ.',
        'So sánh tháng/năm, phân tích biến động, theo dõi xu hướng tài chính liên tục.',
        'Giúp doanh nghiệp chủ động kiểm soát sức khỏe tài chính theo thời gian thực.'
      ],
      emoji: '📈'
    },
    {
      id: 'simplify',
      iconName: 'i-heroicons-building-office',
      label: 'Đơn giản hóa nghiệp vụ',
      title: 'ĐƠN GIẢN & NHANH CHÓNG',
      heading: 'Đơn giản hóa nghiệp vụ – tiết kiệm thời gian, tăng hiệu quả',
      description:
        'Giao diện trực quan, quy trình tối ưu giúp người dùng thao tác nhanh chóng mà không cần đào tạo phức tạp. Phù hợp với cả kế toán chuyên nghiệp và người mới.',
      features: [
        'Nhập liệu đơn giản với form được thiết kế thông minh.',
        'Tìm kiếm và tra cứu nhanh theo nhiều tiêu chí.',
        'Copy, duplicate chứng từ giúp tạo nhanh các giao dịch tương tự.',
        'Dashboard tổng quan, dễ nhìn, dễ hiểu - không cần chuyên gia.'
      ],
      emoji: '⚡'
    },
    {
      id: 'compliance',
      iconName: 'i-heroicons-chart-bar',
      label: 'Dễ dàng triển khai',
      title: 'TRIỂN KHAI DỄ DÀNG',
      heading: 'Dễ dàng triển khai – sẵn sàng sử dụng ngay',
      description:
        'Không cần cài đặt phức tạp, không cần máy chủ riêng. Chỉ cần trình duyệt web, bạn đã có thể bắt đầu ghi sổ và quản lý tài chính ngay lập tức.',
      features: [
        'Cloud-based: Truy cập mọi lúc, mọi nơi trên mọi thiết bị.',
        'Cập nhật tự động: Luôn sử dụng phiên bản mới nhất.',
        'Backup tự động: Dữ liệu an toàn, không lo mất mát.',
        'Hỗ trợ đa người dùng: Phân quyền linh hoạt cho team.'
      ],
      emoji: '🚀'
    },
    {
      id: 'international',
      iconName: 'i-heroicons-document-text',
      label: 'Đáp ứng chuẩn quốc tế',
      title: 'CHUẨN QUỐC TẾ',
      heading: 'Đáp ứng chuẩn quốc tế – IFRS & VAS',
      description:
        'Hệ thống tuân thủ chuẩn mực kế toán quốc tế IFRS và VAS Việt Nam, đảm bảo tính minh bạch và chính xác cho mọi doanh nghiệp.',
      features: [
        'Tuân thủ IFRS 16, IFRS 15 và các chuẩn mực hiện hành.',
        'Hỗ trợ đầy đủ VAS Việt Nam cho doanh nghiệp trong nước.',
        'Báo cáo tài chính chuẩn hóa, dễ dàng audit.',
        'Phù hợp cho các công ty niêm yết, FDI và startup.'
      ],
      emoji: '🌍'
    }
  ]
</script>

<template>
  <section class="p-content">
    <div class="bg-blue-200 min-h-screen rounded-3xl gap-y-8 flex items-center">
      <!--      GroupButton-->
      <div v-for="item in items" class="flex gap-x-4 items-center">
        <Button>{{ item.label }}</Button>
      </div>
    </div>
  </section>
</template>
