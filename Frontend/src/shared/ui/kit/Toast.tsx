import { useEffect } from 'react'
import { classes, style } from 'typestyle'
import Button from './Button'
import { color, radius, space } from './theme'
import type { ToastMessage } from './toast'

type ToastProps = ToastMessage & {
  onClose: (id: string) => void
}

const Toast = ({ id, message, variant, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = window.setTimeout(() => onClose(id), 6000)
    return () => window.clearTimeout(timer)
  }, [id, onClose])

  return (
    <div className={classes(styles.root, styles[variant])}>
      <div className={styles.content}>
        <div className={classes(styles.title, styles[variant])}>{variant === 'error' ? 'Ошибка' : 'Готово'}</div>
        <div className={styles.message}>{message}</div>
      </div>
      <Button variant="ghost" onClick={() => onClose(id)}>
        Закрыть
      </Button>
    </div>
  )
}

export default Toast

const styles = {
  root: style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: space.sm,
    padding: space.lg,
    border: '1px solid',
    borderRadius: radius.md,
    background: color.surface,
    boxShadow: '0 8px 28px rgba(0, 0, 0, 0.16)',
    pointerEvents: 'auto'
  }),
  content: style({
    flex: 1,
    minWidth: 0
  }),
  title: style({
    marginBottom: space.xs,
    fontWeight: 500
  }),
  message: style({
    color: color.text,
    overflowWrap: 'anywhere'
  }),
  error: style({
    borderColor: color.danger,
    color: color.danger
  }),
  success: style({
    borderColor: color.accent,
    color: color.accent
  })
}
