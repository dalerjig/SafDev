export const darkTheme = {
  page: '#101a1e',
  panel: '#17272d',
  surface: '#1b2c33',
  surfaceMuted: '#142329',
  surfaceSecondary: '#20343c',
  selected: '#244741',
  hover: '#20383d',
  outgoing: '#254d44',
  text: '#edf5f7',
  textMuted: '#a8c4cd',
  textSubtle: '#8caab5',
  border: '#2d434b',
  primary: '#80aaa5',
  primaryHover: '#a0c5be',
  primaryText: '#132b2c',
  accent: '#94d4ca',
  danger: '#f2aaa5',
  focus: 'rgba(148, 212, 202, 0.18)'
} as const

export type ThemeColors = { [Key in keyof typeof darkTheme]: string }

export type ThemeMode = 'dark' | 'light'

export const lightTheme: ThemeColors = {
  page: '#e5eeea',
  panel: '#f7faf8',
  surface: '#ffffff',
  surfaceMuted: '#edf3f1',
  surfaceSecondary: '#ffffff',
  selected: '#dcebe5',
  hover: '#eaf2ee',
  outgoing: '#d7eadd',
  text: '#203638',
  textMuted: '#526f75',
  textSubtle: '#637c82',
  border: '#cedcd6',
  primary: '#356d64',
  primaryHover: '#28564e',
  primaryText: '#ffffff',
  accent: '#286d62',
  danger: '#a52e35',
  focus: 'rgba(53, 109, 100, 0.15)'
}

export const themes: Record<ThemeMode, ThemeColors> = {
  dark: darkTheme,
  light: lightTheme
}

export const color = {
  page: 'var(--saf-ui-page, #101a1e)',
  panel: 'var(--saf-ui-panel, #17272d)',
  surface: 'var(--saf-ui-surface, #1b2c33)',
  surfaceMuted: 'var(--saf-ui-surface-muted, #142329)',
  surfaceSecondary: 'var(--saf-ui-surface-secondary, #20343c)',
  selected: 'var(--saf-ui-selected, #244741)',
  hover: 'var(--saf-ui-hover, #20383d)',
  outgoing: 'var(--saf-ui-outgoing, #254d44)',
  text: 'var(--saf-ui-text, #edf5f7)',
  textMuted: 'var(--saf-ui-text-muted, #a8c4cd)',
  textSubtle: 'var(--saf-ui-text-subtle, #8caab5)',
  border: 'var(--saf-ui-border, #2d434b)',
  primary: 'var(--saf-ui-primary, #80aaa5)',
  primaryHover: 'var(--saf-ui-primary-hover, #a0c5be)',
  primaryText: 'var(--saf-ui-primary-text, #132b2c)',
  accent: 'var(--saf-ui-accent, #94d4ca)',
  danger: 'var(--saf-ui-danger, #f2aaa5)',
  focus: 'var(--saf-ui-focus, rgba(148, 212, 202, 0.18))'
} as const

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const
export const radius = { sm: 8, md: 12, lg: 16, round: 999 } as const
