import type { ReactNode } from 'react'
import { style } from 'typestyle'
import { color, radius, space } from './theme'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
}

const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className={styles.root}>
      {children}
      <div className={styles.content} data-tooltip="">
        {content}
      </div>
    </div>
  )
}

export default Tooltip

const styles = {
  root: style({
    position: 'relative',
    display: 'inline-flex',
    minWidth: 0,
    $nest: {
      '&:hover > [data-tooltip], &:focus-within > [data-tooltip]': {
        opacity: 1,
        visibility: 'visible'
      }
    }
  }),
  content: style({
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    zIndex: 10,
    width: 'max-content',
    maxWidth: 240,
    padding: `${space.sm}px ${space.md}px`,
    border: `1px solid ${color.border}`,
    borderRadius: radius.sm,
    background: color.panel,
    color: color.text,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.4,
    pointerEvents: 'none',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.15s ease, visibility 0.15s ease'
  })
}
