import axios from 'axios'
import { API_URL } from '@/shared/config/dev'

export const logoutUser = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/logout`, {}, {
    withCredentials: true,
    timeout: 15000
  })
}
