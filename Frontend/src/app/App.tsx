import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useSessionStore from '@/entities/session/model/useSessionStore'
import { ChatPage } from '@/pages/chat/ui/ChatPage'
import { LoginPage } from '@/pages/login/ui/LoginPage'
import { RegisterPage } from '@/pages/register/ui/RegisterPage'
import { Button } from '@/shared/ui/kit/Button'
import { Flow } from '@/shared/ui/kit/Flow'
import { ScreenCard } from '@/shared/ui/kit/ScreenCard'
import { UiProvider } from '@/shared/ui/kit/UiProvider'
import { ToastProvider } from '@/shared/ui/kit/ToastProvider'
import { Navigate, Route, Routes } from 'react-router'

export const App = () => {
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
    return (
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/chat" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/chat" replace /> : <RegisterPage />}
        />
        <Route path="/chat" element={user ? <ChatPage key={user.public_id} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? '/chat' : '/login'} replace />} />
      </Routes>
    )
  }

  return (
    <UiProvider locale="ru" mode="light">
      <ToastProvider>{renderScreen()}</ToastProvider>
    </UiProvider>
  )
}
