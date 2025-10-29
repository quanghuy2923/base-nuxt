import { useApi } from '~/composables/useApi'
import type { UserPayload, UserResponse } from '~/types/user'

export async function getUsers(params: Record<string, any>) {
  const response = await useApi().get<any>('/users', params)
  if (!response.ok)
    throw createError({ statusCode: response.status, statusMessage: response.message })
  return response.data
}

export async function getUser(id: string) {
  const response = await useApi().get<UserResponse>(`/user/${id}`)
  if (!response.ok)
    throw createError({ statusCode: response.status, statusMessage: response.message })
  return response.data
}

export async function updateUser(id: string, data: UserPayload) {
  const response = await useApi().put<UserResponse>(`/user/${id}`, data)
  if (!response.ok)
    throw createError({ statusCode: response.status, statusMessage: response.message })
  return response.data
}
