import type { CSSProperties, ReactNode } from 'react'
import { classes, style } from 'typestyle'
import { color, themes } from './theme'
import type { ThemeColors, ThemeMode } from './theme'

type UiProviderProps = {
  children: ReactNode
  locale?: 'ru' | 'en'
  mode?: ThemeMode
  theme?: Partial<ThemeColors>
}

export const UiProvider = ({ children, locale = 'ru', mode = 'dark', theme }: UiProviderProps) => {
  const variables = Object.fromEntries(
    Object.entries({ ...themes[mode], ...theme }).map(([key, value]) => [
      `--saf-ui-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`,
      value
    ])
  ) as CSSProperties

  return (
    <div className={classes(styles.root, styles[mode])} lang={locale} style={variables}>
      {children}
    </div>
  )
}

const styles = {
  root: style({
    boxSizing: 'border-box',
    minWidth: 0,
    background: color.page,
    color: color.text,
    fontFamily: "'Rubik', system-ui, sans-serif",
    fontSize: 14,
    lineHeight: 1.5,
    $nest: {
      '& *, & *::before, & *::after': { boxSizing: 'border-box' }
    }
  }),
  dark: style({ colorScheme: 'dark' }),
  light: style({ colorScheme: 'light' })
}
