<!-- pages/users/[id].vue -->
<template>
  <div class="min-h-screen p-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">User Details: {{ user?.fullName || 'User' }}</h1>
      <UButton
        icon="i-lucide-arrow-left"
        label="Back to Users"
        variant="outline"
        color="neutral"
        @click="navigateTo('/user')"
      />
    </div>

    <!-- Loading State -->
    <USkeleton v-if="pending" class="space-y-4">
      <USkeletonItem class="h-10 w-1/3" />
      <USkeletonItem class="h-64 w-full" />
      <USkeletonItem class="h-32 w-full" />
    </USkeleton>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      color="error"
      icon="i-lucide-circle-x"
      :title="error.message"
      variant="soft"
      class="mb-6"
    />

    <!-- User Content -->
    <div v-else-if="user" class="space-y-6">
      <!-- User Overview Card -->
      <UCard>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-500">Full Name</label>
              <p class="text-lg">{{ user.fullName || 'N/A' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Email</label>
              <p class="text-lg">{{ user.email || 'N/A' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Phone</label>
              <p class="text-lg">{{ user.phoneNo || 'N/A' }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-500">User Code</label>
              <p class="text-lg">{{ user.userCode || 'N/A' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Status</label>
              <UBadge :color="user.status ? 'success' : 'error'">
                {{ user.status ? 'Active' : 'Inactive' }}
              </UBadge>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Locked</label>
              <UBadge :color="user.lockedFlag ? 'error' : 'success'">
                {{ user.lockedFlag ? 'Locked' : 'Unlocked' }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Roles Card -->
      <UCard>
        <h2 class="text-lg font-semibold mb-4">Roles</h2>
        <div v-if="user.roles?.length" class="flex flex-wrap gap-2">
          <UBadge v-for="role in user.roles" :key="role.id" color="primary" variant="soft">
            {{ role.name || 'N/A' }}
          </UBadge>
        </div>
        <p v-else class="text-gray-500">No roles assigned</p>
      </UCard>

      <!-- Employment Details Card -->
      <UCard>
        <h2 class="text-lg font-semibold mb-4">Employment Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-sm font-medium text-gray-500">Position</label>
            <p class="text-lg">{{ user.positionName || 'N/A' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Join Date</label>
            <p class="text-lg">{{ formatDate(user?.joinDate) || 'N/A' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">End Date</label>
            <p class="text-lg">{{ formatDate(user.endDate) || 'N/A' }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Probation End</label>
            <p class="text-lg">{{ formatDate(user.endDateProbation) || 'N/A' }}</p>
          </div>
        </div>
      </UCard>

      <!-- Actions -->
      <div class="flex gap-4">
        <UButton
          icon="i-lucide-edit"
          label="Edit User"
          color="primary"
          @click="navigateTo(`/user/${id}/edit`)"
        />
        <UButton
          icon="i-lucide-copy"
          label="Copy User ID"
          variant="outline"
          color="neutral"
          @click="copyUserId"
        />
      </div>
    </div>

    <!-- Empty State -->
    <UCard v-else>
      <p class="text-gray-500">No user data available</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  import { getUser } from '~/apis/user'
  import { useClipboard } from '@vueuse/core'

  const route = useRoute()
  const { id } = route.params
  const toast = useToast()
  const { copy } = useClipboard()

  // Fetch user data using useDataLoader (assuming it's defined as in previous responses)
  const {
    data: user,
    pending,
    error
  } = useDataLoader({
    fetchFn: getUser,
    queryParams: computed(() => String(id)),
    single: true
  })

  // SEO with useHead
  useHead({
    title: computed(() => `User ${user.value?.fullName || id}`),
    meta: [
      {
        name: 'description',
        content: computed(() => `Details for user ${user.value?.fullName || id}`)
      }
    ]
  })

  // Format date utility
  const formatDate = (date: string | null) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Copy user ID action
  const copyUserId = () => {
    if (user.value?.userId) {
      copy(user.value.userId)
      toast.add({
        title: 'Success',
        description: 'User ID copied to clipboard!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
  }
</script>
