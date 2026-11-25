import type { ReactNode } from 'react'
import { style } from 'typestyle'
import { color, radius, space } from './theme'

type ScreenCardProps = {
  children: ReactNode
}

const ScreenCard = ({ children }: ScreenCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>{children}</div>
    </div>
  )
}

export default ScreenCard

const styles = {
  root: style({
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '100dvh',
    padding: space.xl,
    background: color.page,
    $nest: { '@media (max-width: 520px)': { padding: space.lg } }
  }),
  card: style({
    width: '100%',
    maxWidth: 440,
    padding: space.xxl,
    border: `1px solid ${color.border}`,
    borderRadius: radius.lg,
    background: color.surface,
    $nest: { '@media (max-width: 520px)': { padding: space.xl } }
  })
}
