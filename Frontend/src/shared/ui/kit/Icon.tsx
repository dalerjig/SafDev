import type { CSSProperties } from 'react'
import { classes, style } from 'typestyle'

type IconProps = {
  name: 'user' | 'search' | 'more'
  size?: number
}

const Icon = ({ name, size = 20 }: IconProps) => {
  return <div className={classes(styles.root, styles[name])} style={{ '--saf-ui-icon-size': `${size}px` } as CSSProperties} />
}

export default Icon

const styles = {
  root: style({
    position: 'relative',
    display: 'inline-block',
    flexShrink: 0,
    width: '1em',
    height: '1em',
    fontSize: 'var(--saf-ui-icon-size, 20px)'
  }),
  search: style({
    $nest: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0.1em',
        left: '0.1em',
        width: '0.6em',
        height: '0.6em',
        border: '0.09em solid currentColor',
        borderRadius: '50%'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '0.69em',
        left: '0.63em',
        width: '0.34em',
        height: '0.09em',
        borderRadius: '1em',
        background: 'currentColor',
        transform: 'rotate(45deg)'
      }
    }
  }),
  more: style({
    $nest: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0.42em',
        left: '0.42em',
        width: '0.16em',
        height: '0.16em',
        borderRadius: '50%',
        background: 'currentColor',
        boxShadow: '0 -0.3em 0 currentColor, 0 0.3em 0 currentColor'
      }
    }
  }),
  user: style({
    $nest: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0.08em',
        left: '0.33em',
        width: '0.34em',
        height: '0.34em',
        border: '0.08em solid currentColor',
        borderRadius: '50%'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '0.08em',
        left: '0.15em',
        width: '0.7em',
        height: '0.4em',
        border: '0.08em solid currentColor',
        borderRadius: '0.4em 0.4em 0.1em 0.1em'
      }
    }
  })
}
