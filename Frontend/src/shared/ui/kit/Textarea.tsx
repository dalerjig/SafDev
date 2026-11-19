import type { TextareaHTMLAttributes } from 'react'
import { classes, style } from 'typestyle'
import { color, radius, space } from './theme'

const Textarea = ({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className={classes(styles.root, className)} {...rest} />
}

export default Textarea

const styles = {
  root: style({
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    minWidth: 0,
    minHeight: 64,
    maxHeight: 160,
    padding: space.md,
    border: `1px solid ${color.border}`,
    borderRadius: radius.sm,
    background: color.surfaceMuted,
    color: color.text,
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    resize: 'none',
    outline: 'none',
    overflowY: 'auto',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    $nest: {
      '&::placeholder': { color: color.textSubtle },
      '&:focus': { borderColor: color.accent, boxShadow: `0 0 0 3px ${color.focus}` },
      '&:disabled': { opacity: 0.5, cursor: 'default' }
    }
  })
}
