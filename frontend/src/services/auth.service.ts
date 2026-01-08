import { apiService } from './api.service'
import { API_ENDPOINTS } from '@/constants'
import type { User } from '@/types'

export const authService = {
  login: async (email: string, password: string) => {
    return apiService.post<{ user: User; accessToken: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    )
  },

  register: async (email: string, password: string, name: string) => {
    return apiService.post<{ user: User }>(API_ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      name,
    })
  },

  logout: async () => {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  getCurrentUser: async () => {
    return apiService.get<User>(API_ENDPOINTS.AUTH.ME)
  },
}
