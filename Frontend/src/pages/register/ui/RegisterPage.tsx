import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import { style } from 'typestyle'
import { RegisterForm } from '@/features/register/ui/RegisterForm'
import useRegisterStore from '@/features/register/model/useRegisterStore'
import useLoginStore from '@/features/login/model/useLoginStore'
import { Button } from '@/shared/ui/kit/Button'
import { Flow } from '@/shared/ui/kit/Flow'
import { ScreenCard } from '@/shared/ui/kit/ScreenCard'
import { color, space } from '@/shared/ui/kit/theme'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useRegisterStore(
    useShallow(state => ({ user: state.user, isLoading: state.isLoading }))
  )

  const showLogin = () => {
    const publicId = user?.public_id
    useRegisterStore.getState().reset()
    useLoginStore.getState().reset()
    if (publicId !== undefined) useLoginStore.getState().setPublicId(String(publicId))
    navigate('/login')
  }

  return (
    <ScreenCard>
      <Flow mode="vertical" gap={space.xl}>
        <div className={styles.brand}>SafDev</div>
        <Flow mode="vertical" gap={space.sm}>
          <div className={styles.title}>Создать аккаунт</div>
          <div className={styles.description}>Общайтесь с близкими и оставайтесь на связи.</div>
        </Flow>
        <RegisterForm />
        <div className={styles.note}>Ваш публичный ID будет создан автоматически после регистрации.</div>
        <Button variant="ghost" disabled={isLoading} onClick={showLogin}>
          {user ? 'Перейти ко входу' : 'Уже есть аккаунт? Войти'}
        </Button>
      </Flow>
    </ScreenCard>
  )
}

const styles = {
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
