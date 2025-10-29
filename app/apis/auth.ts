export const login = async (username: string, password: string) => {
  const response = await useApi().post('/authenticate', { username, password })
  if (!response.ok)
    throw createError({ statusCode: response.status, statusMessage: response.message })
  return response.data
}
