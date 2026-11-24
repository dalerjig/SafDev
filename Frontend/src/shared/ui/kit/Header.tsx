import type { ReactNode } from 'react'
import { classes, style } from 'typestyle'
import { color, space } from './theme'

type HeaderProps = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  className?: string
}

const Header = ({ left, center, right, className }: HeaderProps) => {
  return (
    <div className={classes(styles.root, className)}>
      <div className={styles.side}>{left}</div>
      <div className={styles.center}>{center}</div>
      <div className={styles.side}>{right}</div>
    </div>
  )
}

export default Header

const styles = {
  root: style({
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: space.md,
    minHeight: 88,
    padding: `16px ${space.xxl}px`,
    background: color.surface,
    borderBottom: `1px solid ${color.border}`,
    $nest: {
      '@media (max-width: 800px)': { minHeight: 76, padding: space.md, gap: space.sm }
    }
  }),
  side: style({ display: 'flex', alignItems: 'center', minWidth: 0 }),
  center: style({ minWidth: 0 })
}
