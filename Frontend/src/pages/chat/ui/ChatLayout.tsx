import type { ReactNode } from 'react'
import { style } from 'typestyle'
import { color, radius, space } from '@/shared/ui/kit/theme'

type ChatLayoutProps = {
  children: ReactNode
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.root}>{children}</div>
    </div>
  )
}

const styles = {
  page: style({
    display: 'grid',
    minHeight: '100dvh',
    minWidth: 0,
    padding: space.xl,
    background: color.page,
    $nest: {
      '@media (max-width: 800px)': { padding: space.md },
      '@media (max-width: 520px)': { padding: 0 }
    }
  }),
  root: style({
    display: 'grid',
    gridTemplateColumns: '340px minmax(0, 1fr)',
    width: '100%',
    maxWidth: 1440,
    height: 'calc(100dvh - 48px)',
    minHeight: 0,
    minWidth: 0,
    margin: '0 auto',
    overflow: 'hidden',
    border: `1px solid ${color.border}`,
    borderRadius: radius.lg,
    background: color.panel,
    $nest: {
      '@media (max-width: 1000px)': { gridTemplateColumns: '280px minmax(0, 1fr)' },
      '@media (max-width: 800px)': { height: 'calc(100dvh - 24px)' },
      '@media (max-width: 700px)': { gridTemplateColumns: 'minmax(120px, 36%) minmax(0, 1fr)' },
      '@media (max-width: 520px)': { height: '100dvh', border: 0, borderRadius: 0 }
    }
  })
}
