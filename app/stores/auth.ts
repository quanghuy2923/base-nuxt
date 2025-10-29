import { defineStore } from 'pinia'
import { login } from '~/apis/auth'
import { jwtDecode } from 'jwt-decode'

interface LoginState {
  username: string | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): LoginState => ({
    username: useCookie<string | null>('user_username').value || null,
    token: useCookie<string | null>('token').value || null
  }),

  getters: {
    isAuthenticated: (state) => {
      if (!state.token) return false
      try {
        const decoded = jwtDecode<any>(state.token)
        console.log(decoded.exp * 1000 > Date.now())
        return decoded.exp * 1000 > Date.now()
      } catch (e) {
        return false
      }
    },
    getToken: (state) => state.token,
    getUsername: (state) => state.username
  },

  actions: {
    async login(username: string, password: string) {
      const response = (await login(username, password)) as { payload: { token: string } }
      this.token = response.payload.token as string
      const tokenCookie = useCookie<string>('token', {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        default: () => ''
      })

      tokenCookie.value = this.token
    },

    logout() {
      // reset state
      this.username = null
      this.token = null

      const tokenCookie = useCookie('token', {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        default: () => null
      })

      tokenCookie.value = null
    },

    loadAuth() {
      const tokenCookie = useCookie<string>('token', {
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        default: () => ''
      })

      this.token = tokenCookie.value
    }
  }
})
