import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useSessionStore from '@/entities/session/model/useSessionStore'
import useLoginStore from '@/features/login/model/useLoginStore'
import useRegisterStore from '@/features/register/model/useRegisterStore'
import ChatPage from '@/pages/chat/ui/ChatPage'
import LoginPage from '@/pages/login/ui/LoginPage'
import RegisterPage from '@/pages/register/ui/RegisterPage'
import Button from '@/shared/ui/kit/Button'
import Flow from '@/shared/ui/kit/Flow'
import ScreenCard from '@/shared/ui/kit/ScreenCard'
import UiProvider from '@/shared/ui/kit/UiProvider'
import ToastProvider from '@/shared/ui/kit/ToastProvider'

const App = () => {
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login')
  const { user, status, error, restoreSession } = useSessionStore(
    useShallow(state => ({
      user: state.user,
      status: state.status,
      error: state.error,
      restoreSession: state.restoreSession
    }))
  )

  useEffect(() => {
    void restoreSession()
  }, [restoreSession])

  const showRegister = () => {
    useLoginStore.getState().reset()
    useRegisterStore.getState().reset()
    setAuthPage('register')
  }

  const showLogin = (publicId?: number) => {
    useRegisterStore.getState().reset()
    useLoginStore.getState().reset()
    if (publicId !== undefined) useLoginStore.getState().setPublicId(String(publicId))
    setAuthPage('login')
  }

  const renderScreen = () => {
    if (status === 'idle' || status === 'checking') {
      return <ScreenCard>Проверяем вход...</ScreenCard>
    }

    if (status === 'error') {
      return (
        <ScreenCard>
          <Flow mode="vertical" gap={16}>
            <div>{error}</div>
            <Button onClick={() => void restoreSession()}>Повторить</Button>
          </Flow>
        </ScreenCard>
      )
    }

    if (user) return <ChatPage key={user.public_id} />
    if (authPage === 'register') return <RegisterPage onLogin={showLogin} />
    return <LoginPage onRegister={showRegister} />
  }

  return (
    <UiProvider locale="ru" mode="light">
      <ToastProvider>{renderScreen()}</ToastProvider>
    </UiProvider>
  )
}

export default App
