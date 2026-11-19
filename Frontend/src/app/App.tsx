import ChatPage from '@/pages/chat/ui/ChatPage'
import UiProvider from '@/shared/ui/kit/UiProvider'

const App = () => {
  return (
    <UiProvider locale="ru" mode="light">
      <ChatPage />
    </UiProvider>
  )
}

export default App
