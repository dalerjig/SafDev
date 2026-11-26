import type { ReactNode } from 'react'
import { classes, style } from 'typestyle'
import { color, radius, space } from './theme'

type ListItemProps = {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  label?: ReactNode
  selected?: boolean
  onSelect?: () => void
  className?: string
}

export const ListItem = ({ title, description, icon, label, selected = false, onSelect, className }: ListItemProps) => {
  return (
    <div
      className={classes(styles.root, selected && styles.selected, onSelect && styles.clickable, className)}
      onClick={onSelect}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={event => {
        if (onSelect && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onSelect()
        }
      }}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {label && <div className={styles.badge}>{label}</div>}
    </div>
  )
}

const styles = {
  root: style({
    display: 'grid',
    gridTemplateColumns: '44px minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: space.md,
    width: '100%',
    minWidth: 0,
    minHeight: 80,
    padding: space.md,
    borderRadius: radius.md,
    background: 'transparent',
    color: color.text,
    transition: 'background 0.15s ease',
    $nest: {
      '&:hover': { background: color.hover },
      '&:focus-visible': { outline: `2px solid ${color.accent}`, outlineOffset: -2 },
      '@media (max-width: 700px)': {
        gridTemplateColumns: '32px minmax(0, 1fr)',
        gap: space.sm,
        padding: space.sm
      }
    }
  }),
  selected: style({ background: color.selected, $nest: { '&:hover': { background: color.selected } } }),
  clickable: style({ cursor: 'pointer' }),
  icon: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    background: color.surfaceMuted,
    color: color.accent,
    fontSize: 14,
    fontWeight: 500,
    $nest: { '@media (max-width: 700px)': { width: 32, height: 32, borderRadius: radius.sm, fontSize: 12 } }
  }),
  content: style({ minWidth: 0 }),
  title: style({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }),
  description: style({
    marginTop: space.xs,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: color.textMuted,
    fontSize: 12
  }),
  badge: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    padding: '0 5px',
    borderRadius: radius.round,
    background: color.accent,
    color: color.primaryText,
    fontSize: 11,
    $nest: { '@media (max-width: 700px)': { gridColumn: 2, justifySelf: 'end' } }
  })
}
