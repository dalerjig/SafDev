import RegisterPage from '@/pages/register/ui/RegisterPage'
import UiProvider from '@/shared/ui/kit/UiProvider'
import ToastProvider from '@/shared/ui/kit/ToastProvider'

const App = () => {
  return (
    <UiProvider locale="ru" mode="light">
      <ToastProvider>
        <RegisterPage />
      </ToastProvider>
    </UiProvider>
  )
}

export default App
