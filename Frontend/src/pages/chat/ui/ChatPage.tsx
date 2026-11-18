import ChatList from '@/widgets/chat-list/ui/ChatList'
import Conversation from '@/widgets/conversation/ui/Conversation'
import ChatLayout from './ChatLayout'

const ChatPage = () => {
  return (
    <ChatLayout>
      <ChatList />
      <Conversation />
    </ChatLayout>
  )
}

export default ChatPage
