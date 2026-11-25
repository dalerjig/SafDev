import type { KeyboardEvent } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { style } from 'typestyle'
import Button from '@/shared/ui/kit/Button'
import Flow from '@/shared/ui/kit/Flow'
import Input from '@/shared/ui/kit/Input'
import { color, space } from '@/shared/ui/kit/theme'
import useLoginStore from '../model/useLoginStore'

const LoginForm = () => {
  const { publicId, password, isLoading, error, setPublicId, setPassword, login } = useLoginStore(
    useShallow(state => ({
      publicId: state.publicId,
      password: state.password,
      isLoading: state.isLoading,
      error: state.error,
      setPublicId: state.setPublicId,
      setPassword: state.setPassword,
      login: state.login
    }))
  )
  const canSubmit = /^[1-9]\d{5}$/.test(publicId) && password.length >= 10 && password.length <= 128

  const handleLogin = () => {
    if (canSubmit && !isLoading) void login()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      handleLogin()
    }
  }

  return (
    <Flow mode="vertical" gap={space.xl}>
      <Flow mode="vertical" gap={space.sm}>
        <div className={styles.caption}>Публичный ID</div>
        <Input
          name="public_id"
          placeholder="Например, 123456"
          inputMode="numeric"
          autoComplete="username"
          maxLength={6}
          value={publicId}
          disabled={isLoading}
          onChange={event => setPublicId(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Flow>
      <Flow mode="vertical" gap={space.sm}>
        <div className={styles.caption}>Пароль</div>
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          autoComplete="current-password"
          maxLength={128}
          value={password}
          disabled={isLoading}
          onChange={event => setPassword(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Flow>
      {error && <div className={styles.error}>{error}</div>}
      <Button className={styles.submit} disabled={!canSubmit || isLoading} onClick={handleLogin}>
        {isLoading ? 'Входим...' : 'Войти'}
      </Button>
    </Flow>
  )
}

export default LoginForm

const styles = {
  caption: style({ fontSize: 14, fontWeight: 500, color: color.text }),
  error: style({ color: color.danger, overflowWrap: 'anywhere' }),
  submit: style({ width: '100%', height: 48 })
}
