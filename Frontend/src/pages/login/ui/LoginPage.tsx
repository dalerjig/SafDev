import { style } from 'typestyle'
import LoginForm from '@/features/login/ui/LoginForm'
import useLoginStore from '@/features/login/model/useLoginStore'
import Button from '@/shared/ui/kit/Button'
import Flow from '@/shared/ui/kit/Flow'
import ScreenCard from '@/shared/ui/kit/ScreenCard'
import { color, space } from '@/shared/ui/kit/theme'

type LoginPageProps = {
  onRegister: () => void
}

const LoginPage = ({ onRegister }: LoginPageProps) => {
  const isLoading = useLoginStore(state => state.isLoading)

  return (
    <ScreenCard>
      <Flow mode="vertical" gap={space.xl}>
        <div className={styles.brand}>SafDev</div>
        <Flow mode="vertical" gap={space.sm}>
          <div className={styles.title}>С возвращением</div>
          <div className={styles.description}>Войдите по публичному ID и паролю.</div>
        </Flow>
        <LoginForm />
        <Button variant="ghost" disabled={isLoading} onClick={onRegister}>
          Создать аккаунт
        </Button>
      </Flow>
    </ScreenCard>
  )
}

export default LoginPage

const styles = {
  brand: style({ color: color.accent, fontSize: 24, fontWeight: 500 }),
  title: style({ color: color.text, fontSize: 24, fontWeight: 500, lineHeight: 1.25 }),
  description: style({ color: color.textMuted, fontSize: 14, lineHeight: 1.6 })
}
