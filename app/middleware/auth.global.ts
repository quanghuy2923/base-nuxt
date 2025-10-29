export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  authStore.loadAuth()

  const isAuthenticated = authStore.isAuthenticated

  if (isAuthenticated && to.path === '/login') {
    const redirectPath = to.query.redirect as string
    if (redirectPath && redirectPath !== '/login') {
      return navigateTo(redirectPath)
    }
    return navigateTo('/')
  }

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
