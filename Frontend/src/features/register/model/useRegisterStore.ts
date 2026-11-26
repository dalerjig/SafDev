import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { toast } from '@/shared/ui/kit/toast'
import { registerUser } from '../services/auth'
import type { RegisterRequest, RegisterResponse } from '../services/auth'

type RegisterState = {
  displayName: string
  password: string
  isLoading: boolean
  error: string | null
  user: RegisterResponse | null
  setDisplayName: (value: string) => void
  setPassword: (value: string) => void
  register: () => Promise<RegisterResponse | null>
  clearError: () => void
  reset: () => void
}

const useRegisterStore = create<RegisterState>()((set, get) => ({
  displayName: '',
  password: '',
  isLoading: false,
  error: null,
  user: null,
  setDisplayName: value => set({ displayName: value, error: null }),
  setPassword: value => set({ password: value, error: null }),
  register: async () => {
    const { displayName, password, isLoading } = get()
    if (isLoading || !displayName.trim() || displayName.trim().length > 64 || password.length < 10 || password.length > 128) {
      return null
    }

    set({ isLoading: true, error: null, user: null })
    const data: RegisterRequest = { display_name: displayName.trim(), password }

    try {
      const user = await registerUser(data)
      set({ user, password: '' })
      return user
    } catch (error) {
      const message = getRegisterError(error)
      set({ error: message })
      toast.error(message)
      return null
    } finally {
      set({ isLoading: false })
    }
  },
  clearError: () => set({ error: null }),
  reset: () => set({ displayName: '', password: '', isLoading: false, error: null, user: null })
}))

export default useRegisterStore

const getRegisterError = (error: unknown): string => {
  if (!isAxiosError(error)) return 'Не удалось завершить регистрацию. Попробуйте позже.'
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'Сервер не ответил вовремя. Попробуйте позже.'
  }
  if (!error.response) return 'Не удалось связаться с сервером. Проверьте подключение.'
  if (error.response.status === 422) {
    return 'Проверьте псевдоним и пароль: имя от 1 до 64 символов, пароль от 10 до 128.'
  }
  if (error.response.status === 429) return 'Слишком много запросов. Попробуйте позже.'

  return 'Не удалось завершить регистрацию. Попробуйте позже.'
}
