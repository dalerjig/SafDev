import axios from 'axios'
import type { SessionUser } from '@/entities/session/model/types'
import { API_URL } from '@/shared/config/dev'

export type LoginRequest = {
  public_id: number
  password: string
}

export const loginUser = async (data: LoginRequest): Promise<SessionUser> => {
  const response = await axios.post<SessionUser>(`${API_URL}/auth/login`, data, {
    withCredentials: true,
    timeout: 15000
  })
  return response.data
}
