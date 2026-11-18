import { ChatList } from '@/widgets/chat-list/ui/ChatList'
import { Conversation } from '@/widgets/conversation/ui/Conversation'
import { ChatLayout } from './ChatLayout'

export function ChatPage() {
  return (
    <ChatLayout>
      <ChatList />
      <Conversation />
    </ChatLayout>
  )
}
