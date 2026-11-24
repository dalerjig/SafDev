import RegisterForm from '@/features/register/ui/RegisterForm'
import Flow from '@/shared/ui/kit/Flow'
import { color, radius, space } from '@/shared/ui/kit/theme'
import { style } from 'typestyle'

const RegisterPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Flow mode="vertical" gap={space.xl}>
          <div className={styles.brand}>SafDev</div>
          <Flow mode="vertical" gap={space.sm}>
            <div className={styles.title}>Создать аккаунт</div>
            <div className={styles.description}>Общайтесь с близкими и оставайтесь на связи.</div>
          </Flow>
          <RegisterForm />
          <div className={styles.note}>Ваш публичный ID будет создан автоматически после регистрации.</div>
        </Flow>
      </div>
    </div>
  )
}

export default RegisterPage

const styles = {
  root: style({
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '100dvh',
    padding: space.xl,
    background: color.page,
    $nest: {
      '@media (max-width: 520px)': {
        padding: space.lg
      }
    }
  }),
  card: style({
    width: '100%',
    maxWidth: 440,
    padding: space.xxl,
    border: `1px solid ${color.border}`,
    borderRadius: radius.lg,
    background: color.surface,
    $nest: {
      '@media (max-width: 520px)': {
        padding: space.xl
      }
    }
  }),
  brand: style({
    color: color.accent,
    fontSize: 24,
    fontWeight: 500
  }),
  title: style({
    color: color.text,
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.25
  }),
  description: style({
    color: color.textMuted,
    fontSize: 14,
    lineHeight: 1.6
  }),
  note: style({
    color: color.textSubtle,
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: 'center'
  })
}
