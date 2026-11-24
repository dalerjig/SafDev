import axios from 'axios'
import { API_URL } from '@/shared/config/dev'

export type RegisterRequest = {
  display_name: string
  password: string
}

export type RegisterResponse = {
  display_name: string
  public_id: number
}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, data, { timeout: 15000 })
  return response.data
}
