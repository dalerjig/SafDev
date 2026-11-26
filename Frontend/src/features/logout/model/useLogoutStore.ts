import { create } from 'zustand'
import useSessionStore from '@/entities/session/model/useSessionStore'
import { toast } from '@/shared/ui/kit/toast'
import { logoutUser } from '../services/auth'

type LogoutState = {
  isLoading: boolean
  error: string | null
  logout: () => Promise<void>
}

const useLogoutStore = create<LogoutState>()((set, get) => ({
  isLoading: false,
  error: null,
  logout: async () => {
    if (get().isLoading) return

    set({ isLoading: true, error: null })

    try {
      await logoutUser()
      useSessionStore.getState().clearSession()
    } catch {
      const message = 'Не удалось выйти. Попробуйте ещё раз.'
      set({ error: message })
      toast.error(message)
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useLogoutStore
