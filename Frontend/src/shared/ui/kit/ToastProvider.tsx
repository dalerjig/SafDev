import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { style } from 'typestyle'
import { Toast } from './Toast'
import { space } from './theme'
import { subscribeToasts } from './toast'
import type { ToastMessage } from './toast'

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [notifications, setNotifications] = useState<ToastMessage[]>([])

  useEffect(() => {
    return subscribeToasts(notification => {
      setNotifications(current => [...current, notification].slice(-3))
    })
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications(current => current.filter(notification => notification.id !== id))
  }, [])

  return (
    <>
      {children}
      <div className={styles.notifications}>
        {notifications.map(notification => (
          <Toast key={notification.id} {...notification} onClose={dismiss} />
        ))}
      </div>
    </>
  )
}

const styles = {
  notifications: style({
    position: 'fixed',
    top: space.lg,
    right: space.lg,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
    width: 380,
    maxWidth: `calc(100vw - ${space.lg * 2}px)`,
    maxHeight: `calc(100dvh - ${space.lg * 2}px)`,
    overflowY: 'auto',
    pointerEvents: 'none'
  })
}
