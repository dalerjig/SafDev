export type ToastMessage = {
  id: string
  message: string
  variant: 'error' | 'success'
}

type ToastListener = (notification: ToastMessage) => void

const listeners = new Set<ToastListener>()

const showToast = (message: string, variant: ToastMessage['variant']) => {
  const notification: ToastMessage = {
    id: `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    variant
  }
  listeners.forEach(listener => listener(notification))
  return notification.id
}

export const subscribeToasts = (listener: ToastListener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const toast = {
  error: (message: string) => showToast(message, 'error'),
  success: (message: string) => showToast(message, 'success')
}
