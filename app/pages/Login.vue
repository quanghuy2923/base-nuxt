<script setup lang="ts">
  import * as v from 'valibot'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import { useAuthStore } from '~/stores/auth'
  import Button from '@/components/ui/Button'
  definePageMeta({
    layout: 'custom'
  })
  const schema = v.object({
    username: v.pipe(v.string(), v.nonEmpty('Invalid username')),
    password: v.pipe(v.string(), v.minLength(3, 'Must be at least 8 characters'))
  })
  type Schema = v.InferOutput<typeof schema>
  const state = reactive({
    username: '',
    password: ''
  })
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      const { username, password } = event.data
      await authStore.login(username, password)
      toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
      const redirectPath = route.query.redirect as string

      if (redirectPath && redirectPath !== '/login') {
        await router.push(redirectPath)
      } else {
        await router.push('/')
      }
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message,
        color: 'error'
      })
      return
    }
  }
  const handleClickCus = () => {
    toast.add({
      title: 'Button clicked!',
      description: 'You have clicked the custom button.',
      icon: 'i-lucide-check-circle',
      close: {
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }
    })
  }
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
    <UCard variant="subtle">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Username" name="username">
          <UInput
            v-model="state.username"
            size="xl"
            :placeholder="'Username'"
            trailing-icon="i-lucide-at-sign"
            class="w-xs"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" size="xl" class="w-xs" />
        </UFormField>
        <UButton type="submit" size="xl" label="Login" class="cursor-pointer" />
        <Button
          size="xl"
          trailing-icon="i-lucide-at-sign"
          color="secondary"
          @click="handleClickCus"
        >
          Test
        </Button>
      </UForm>
    </UCard>
  </div>
</template>
