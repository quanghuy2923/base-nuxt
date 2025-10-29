export const getObjects = async (params: Record<string, any>) => {
  const response = await useApi().get<any[]>('https://api.restful-api.dev/objects', params)
  if (!response.ok)
    throw createError({ statusCode: response.status, statusMessage: response.message })
  return response.data
}
