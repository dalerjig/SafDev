import type { CSSProperties, ReactNode } from 'react'
import { classes, style } from 'typestyle'

type FlowProps = {
  children: ReactNode
  mode?: 'horizontal' | 'vertical'
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  fullWidth?: boolean
  className?: string
}

const Flow = ({ children, mode = 'horizontal', gap = 8, align = 'stretch', fullWidth = true, className }: FlowProps) => {
  return (
    <div
      className={classes(styles.root, styles[mode], alignStyles[align], fullWidth && styles.fullWidth, className)}
      style={{ '--saf-ui-flow-gap': `${gap}px` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export default Flow

const styles = {
  root: style({ display: 'flex', minWidth: 0, gap: 'var(--saf-ui-flow-gap, 8px)' }),
  horizontal: style({ flexDirection: 'row' }),
  vertical: style({ flexDirection: 'column' }),
  fullWidth: style({ width: '100%' })
}

const alignStyles = {
  start: style({ alignItems: 'flex-start' }),
  center: style({ alignItems: 'center' }),
  end: style({ alignItems: 'flex-end' }),
  stretch: style({ alignItems: 'stretch' })
}
