import axios from 'axios'
import { API_URL } from '@/shared/config/dev'
import type { SessionUser } from '../model/types'

export const getSessionUser = async (): Promise<SessionUser> => {
  const response = await axios.get<SessionUser>(`${API_URL}/auth/me`, {
    withCredentials: true,
    timeout: 15000
  })
  return response.data
}
