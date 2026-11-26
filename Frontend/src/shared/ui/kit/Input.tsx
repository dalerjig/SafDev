import type { InputHTMLAttributes } from 'react'
import { classes, style } from 'typestyle'
import { color, radius, space } from './theme'

export const Input = ({ className, type = 'text', ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={classes(styles.root, className)} type={type} {...rest} />
}

const styles = {
  root: style({
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 0,
    height: 48,
    padding: `0 ${space.md}px`,
    border: `1px solid ${color.border}`,
    borderRadius: radius.sm,
    background: color.surfaceMuted,
    color: color.text,
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    $nest: {
      '&::placeholder': { color: color.textSubtle },
      '&:focus': { borderColor: color.accent, boxShadow: `0 0 0 3px ${color.focus}` },
      '&:disabled': { opacity: 0.5, cursor: 'default' }
    }
  })
}
