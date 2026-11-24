import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { toast } from '@/shared/ui/kit/toast'
import { registerUser } from '../services/auth'
import type { RegisterRequest, RegisterResponse } from '../services/auth'

type RegisterState = {
  isLoading: boolean
  error: string | null
  user: RegisterResponse | null
  register: (data: RegisterRequest) => Promise<RegisterResponse | null>
  clearError: () => void
}

const useRegisterStore = create<RegisterState>()((set, get) => ({
  isLoading: false,
  error: null,
  user: null,
  register: async data => {
    if (get().isLoading) return null

    set({ isLoading: true, error: null, user: null })

    try {
      const user = await registerUser(data)
      set({ user })
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
  clearError: () => set({ error: null })
}))

export default useRegisterStore

const getRegisterError = (error: unknown): string => {
  if (!isAxiosError(error)) {
    return 'Не удалось завершить регистрацию. Попробуйте позже.'
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'Сервер не ответил вовремя. Попробуйте позже.'
  }

  if (!error.response) {
    return 'Не удалось связаться с сервером. Проверьте подключение.'
  }

  const status = error.response.status

  if (status === 422) {
    return 'Проверьте псевдоним и пароль: имя от 1 до 64 символов, пароль от 10 до 128.'
  }

  if (status === 429) {
    return 'Слишком много запросов. Попробуйте позже.'
  }

  return 'Не удалось завершить регистрацию. Попробуйте позже.'
}
