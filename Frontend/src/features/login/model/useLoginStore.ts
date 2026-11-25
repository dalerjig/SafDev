import { isAxiosError } from 'axios'
import { create } from 'zustand'
import useSessionStore from '@/entities/session/model/useSessionStore'
import { toast } from '@/shared/ui/kit/toast'
import { loginUser } from '../services/auth'

type LoginState = {
  publicId: string
  password: string
  isLoading: boolean
  error: string | null
  setPublicId: (value: string) => void
  setPassword: (value: string) => void
  login: () => Promise<void>
  reset: () => void
}

const useLoginStore = create<LoginState>()((set, get) => ({
  publicId: '',
  password: '',
  isLoading: false,
  error: null,
  setPublicId: value => set({ publicId: value.replace(/\D/g, '').slice(0, 6), error: null }),
  setPassword: value => set({ password: value, error: null }),
  login: async () => {
    const { publicId, password, isLoading } = get()
    if (isLoading || !/^[1-9]\d{5}$/.test(publicId) || password.length < 10 || password.length > 128) return

    set({ isLoading: true, error: null })

    try {
      const user = await loginUser({ public_id: Number(publicId), password })
      set({ password: '' })
      useSessionStore.getState().setUser(user)
    } catch (error) {
      const message = getLoginError(error)
      set({ error: message })
      toast.error(message)
    } finally {
      set({ isLoading: false })
    }
  },
  reset: () => set({ publicId: '', password: '', isLoading: false, error: null })
}))

export default useLoginStore

const getLoginError = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return 'Сервер не ответил вовремя. Попробуйте позже.'
    }
    if (!error.response) return 'Не удалось связаться с сервером. Проверьте подключение.'
    if (error.response.status === 401) return 'Неверный ID или пароль.'
    if (error.response.status === 422) return 'Проверьте шестизначный ID и пароль от 10 до 128 символов.'
    if (error.response.status === 429) return 'Слишком много попыток. Попробуйте позже.'
  }

  return 'Не удалось войти. Попробуйте позже.'
}
