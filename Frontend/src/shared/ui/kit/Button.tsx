import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { classes, style } from 'typestyle'
import Tooltip from './Tooltip'
import { color, radius, space } from './theme'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
  square?: boolean
  icon?: ReactNode
  tooltip?: string
}

const Button = ({
  children,
  variant = 'primary',
  square = false,
  icon,
  tooltip,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const button = (
    <button className={classes(styles.root, styles[variant], square && styles.square, className)} type={type} {...rest}>
      {icon}
      {children}
    </button>
  )

  return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button
}

export default Button

const styles = {
  root: style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    flexShrink: 0,
    minWidth: 0,
    height: 44,
    padding: `0 ${space.lg}px`,
    border: '1px solid transparent',
    borderRadius: radius.sm,
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    cursor: 'pointer',
    transition: 'background 0.15s ease, border-color 0.15s ease',
    $nest: {
      '&:focus-visible': { outline: `2px solid ${color.accent}`, outlineOffset: 3 },
      '&:disabled': { opacity: 0.5, cursor: 'default' }
    }
  }),
  primary: style({
    background: color.primary,
    color: color.primaryText,
    $nest: { '&:hover:not(:disabled)': { background: color.primaryHover } }
  }),
  ghost: style({
    background: 'transparent',
    color: color.textMuted,
    $nest: { '&:hover:not(:disabled)': { background: color.hover, color: color.text } }
  }),
  square: style({ width: 36, height: 36, padding: 0 })
}
