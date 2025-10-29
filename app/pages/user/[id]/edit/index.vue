<template>
  <div class="min-h-screen p-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Edit User: {{ user?.fullName || 'User' }}</h1>
      <UButton
        icon="i-lucide-arrow-left"
        label="Back to Details"
        variant="outline"
        color="neutral"
        @click="navigateTo(`/user/${id}`)"
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

    <!-- Edit Form -->
    <UCard v-else-if="user">
      <UForm :schema="schema" :state="formState" class="space-y-6" @submit="onSubmit">
        <!-- Basic Info Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Full Name" name="fullName">
            <UInput v-model="formState.fullName" size="xl" placeholder="Enter full name" />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput v-model="formState.email" type="email" size="xl" placeholder="Enter email" />
          </UFormField>

          <UFormField label="Phone Number" name="phoneNo">
            <UInput v-model="formState.phoneNo" size="xl" placeholder="Enter phone number" />
          </UFormField>

          <UFormField label="Position Name" name="positionName">
            <UInput v-model="formState.positionName" size="xl" placeholder="Enter position" />
          </UFormField>
        </div>

        <!-- Employment Dates Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField label="Join Date" name="joinDate">
            <UInput v-model="formState.joinDate" type="date" size="xl" />
          </UFormField>

          <UFormField label="End Date" name="endDate">
            <UInput v-model="formState.endDate" type="date" size="xl" />
          </UFormField>

          <UFormField label="Probation End Date" name="endDateProbation">
            <UInput v-model="formState.endDateProbation" type="date" size="xl" />
          </UFormField>
        </div>

        <!-- Roles Section -->
        <UFormField label="Roles" name="roles">
          <USelectMultiple
            v-model="formState.roles"
            :options="availableRoles"
            option-attribute="name"
            value-attribute="id"
            placeholder="Select roles"
            multiple
          />
        </UFormField>

        <!-- Status and Flags -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Status" name="status">
            <UToggle v-model="formState.status" color="success" />
          </UFormField>

          <UFormField label="Locked" name="lockedFlag">
            <UToggle v-model="formState.lockedFlag" color="error" />
          </UFormField>
        </div>

        <!-- Advanced Fields (Optional, can be hidden or expanded) -->
        <UAccordion>
          <UAccordionItem title="Advanced Settings">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField label="User Name" name="userName">
                <UInput v-model="formState.login" size="xl" placeholder="Enter user name" />
              </UFormField>

              <UFormField label="Refer User Code" name="referUserCode">
                <UInput
                  v-model="formState.referUserCode"
                  size="xl"
                  placeholder="Enter refer code"
                />
              </UFormField>

              <UFormField label="Position Code" name="positionCode">
                <UInput
                  v-model="formState.positionCode"
                  size="xl"
                  placeholder="Enter position code"
                />
              </UFormField>

              <UFormField label="BP Code" name="bpCode">
                <UInput v-model="formState.bpCode" size="xl" placeholder="Enter BP code" />
              </UFormField>

              <UFormField label="Plant" name="plant">
                <UInput v-model="formState.plant" size="xl" placeholder="Enter plant" />
              </UFormField>
            </div>
          </UAccordionItem>
        </UAccordion>

        <!-- Submit Actions -->
        <div class="flex justify-end gap-4">
          <UButton
            label="Cancel"
            variant="outline"
            color="neutral"
            @click="navigateTo(`/users/${id}`)"
          />
          <UButton
            type="submit"
            label="Save Changes"
            color="primary"
            icon="i-lucide-save"
            :loading="submitting"
          />
        </div>
      </UForm>
    </UCard>

    <!-- Empty State -->
    <UCard v-else>
      <p class="text-gray-500">No user data available for editing</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import { getUser, updateUser } from '~/apis/user'

  // Define Valibot schema for validation
  const schema = v.object({
    fullName: v.pipe(v.string(), v.nonEmpty('Full name is required')),
    email: v.pipe(v.string(), v.email('Invalid email format')),
    phoneNo: v.optional(v.string()),
    joinDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    endDateProbation: v.optional(v.string()),
    roles: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string()
        })
      )
    ),
    lockedFlag: v.boolean(),
    positionName: v.optional(v.string()),
    status: v.boolean(),
    login: v.optional(v.string()),
    referUserCode: v.optional(v.string()),
    positionCode: v.optional(v.string()),
    bpCode: v.optional(v.string()),
    plant: v.optional(v.string())
  })

  type Schema = v.InferOutput<typeof schema>

  const route = useRoute()
  const { id } = route.params
  const toast = useToast()

  // Fetch user data
  const {
    data: user,
    pending,
    error
  } = useDataLoader({
    fetchFn: getUser,
    queryParams: computed(() => String(id)),
    single: true
  })

  // Form state initialized from user data
  const formState = reactive<Schema>({
    fullName: '',
    email: '',
    phoneNo: '',
    joinDate: '',
    endDate: '',
    endDateProbation: '',
    roles: [],
    lockedFlag: false,
    positionName: '',
    status: true,
    login: '',
    referUserCode: '',
    positionCode: '',
    bpCode: '',
    plant: ''
  })

  // Available roles (fetch from API or hardcode for demo)
  const availableRoles = ref([
    { id: '8391500e-ebad-442f-9083-d5104c148cf1', name: 'Admin' },
    { id: 'role2', name: 'User' },
    { id: 'role3', name: 'Guest' }
    // Add more or fetch dynamically
  ])

  watch(
    user,
    (newUser) => {
      if (newUser) {
        Object.assign(formState, {
          id: user.value?.userId,
          userId: newUser.userId,
          userCode: newUser.userCode,
          plants: newUser.plants,
          fullName: newUser.fullName || '',
          email: newUser.email || '',
          phoneNo: newUser.phoneNo || '',
          joinDate: newUser.joinDate ? new Date(newUser.joinDate).toISOString().split('T')[0] : '',
          endDate: newUser.endDate ? new Date(newUser.endDate).toISOString().split('T')[0] : '',
          endDateProbation: newUser.endDateProbation
            ? new Date(newUser.endDateProbation).toISOString().split('T')[0]
            : '',
          roles: newUser.roles || [],
          lockedFlag: newUser.lockedFlag || false,
          positionName: newUser.positionName || '',
          status: newUser.status || true,
          login: newUser.userName || '',
          referUserCode: newUser.referUserCode || '',
          positionCode: newUser.positionCode || '',
          bpCode: newUser.bpCode || '',
          plant: newUser.plant || ''
        })
      }
    },
    { immediate: true }
  )

  const submitting = ref(false)

  async function onSubmit(event: FormSubmitEvent<Schema>) {
    submitting.value = true
    try {
      // Prepare payload (include all editable fields)
      const payload = {
        ...event.data,
        id: user.value?.userId
        // Add non-editable if needed, e.g., userId: id,
        // Convert dates if necessary
      }

      await updateUser(String(id), payload as any)
      toast.add({
        title: 'Success',
        description: `${user.value?.fullName} updated successfully!`,
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      navigateTo(`/user/${id}`)
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message,
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    } finally {
      submitting.value = false
    }
  }

  // SEO
  useHead({
    title: computed(() => `Edit User ${user.value?.fullName || id}`)
  })
</script>
