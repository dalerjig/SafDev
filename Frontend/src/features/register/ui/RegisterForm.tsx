import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import Button from '@/shared/ui/kit/Button'
import Flow from '@/shared/ui/kit/Flow'
import Input from '@/shared/ui/kit/Input'
import { color, radius, space } from '@/shared/ui/kit/theme'
import { style } from 'typestyle'
import useRegisterStore from '../model/useRegisterStore'

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const isLoading = useRegisterStore(state => state.isLoading)
  const error = useRegisterStore(state => state.error)
  const user = useRegisterStore(state => state.user)
  const register = useRegisterStore(state => state.register)
  const clearError = useRegisterStore(state => state.clearError)
  const canSubmit = displayName.trim().length > 0 && password.length >= 10 && password.length <= 128

  const handleRegister = async () => {
    if (!canSubmit || isLoading) return

    const createdUser = await register({ display_name: displayName, password })
    if (createdUser) setPassword('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void handleRegister()
    }
  }

  return (
    <Flow mode="vertical" gap={space.xl}>
      <Flow mode="vertical" gap={space.sm}>
        <div className={styles.caption}>Псевдоним</div>
        <Input
          name="display_name"
          placeholder="Как к вам обращаться"
          autoComplete="nickname"
          minLength={1}
          maxLength={64}
          value={displayName}
          disabled={isLoading}
          onChange={event => {
            setDisplayName(event.target.value)
            clearError()
          }}
          onKeyDown={handleKeyDown}
        />
      </Flow>
      <Flow mode="vertical" gap={space.sm}>
        <div className={styles.caption}>Пароль</div>
        <Input
          name="password"
          type="password"
          placeholder="Придумайте пароль"
          autoComplete="new-password"
          minLength={10}
          maxLength={128}
          value={password}
          disabled={isLoading}
          onChange={event => {
            setPassword(event.target.value)
            clearError()
          }}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.hint}>От 10 до 128 символов</div>
      </Flow>
      {error && <div className={styles.error}>{error}</div>}
      {user && <div className={styles.result}>Аккаунт создан. Ваш ID: {user.public_id}</div>}
      <Button
        className={styles.submit}
        type="button"
        disabled={!canSubmit || isLoading}
        onClick={() => void handleRegister()}
      >
        {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
      </Button>
    </Flow>
  )
}

export default RegisterForm

const styles = {
  caption: style({
    fontSize: 14,
    fontWeight: 500,
    color: color.text
  }),
  hint: style({
    fontSize: 12,
    color: color.textSubtle
  }),
  error: style({
    color: color.danger,
    overflowWrap: 'anywhere'
  }),
  result: style({
    padding: space.md,
    borderRadius: radius.sm,
    background: color.selected,
    color: color.text
  }),
  submit: style({
    width: '100%',
    height: 48
  })
}
