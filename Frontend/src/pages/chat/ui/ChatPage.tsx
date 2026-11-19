import { useState } from 'react'
import ChatList from '@/widgets/chat-list/ui/ChatList'
import Conversation from '@/widgets/conversation/ui/Conversation'
import type { ChatMessage } from '@/entities/chat/model/types'
import { mockMessages, mockUsers } from '../model/mockChats'
import ChatLayout from './ChatLayout'

const ChatPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(mockUsers[0].id)
  const [messagesByUser, setMessagesByUser] = useState(mockMessages)

  const selectedUser = mockUsers.find(user => user.id === selectedUserId) ?? mockUsers[0]
  const messages = messagesByUser[selectedUser.id] ?? []
  const users = mockUsers.map(user => {
    const lastMessage = messagesByUser[user.id]?.at(-1)

    return {
      ...user,
      lastMessage: lastMessage?.text ?? user.lastMessage,
      lastMessageTime: lastMessage?.time ?? user.lastMessageTime
    }
  })

  const handleSend = (value: string) => {
    const text = value.trim()

    if (!text) return

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      outgoing: true
    }

    setMessagesByUser(current => ({
      ...current,
      [selectedUser.id]: [...(current[selectedUser.id] ?? []), message]
    }))
  }

  return (
    <ChatLayout>
      <ChatList users={users} selectedUserId={selectedUser.id} onSelectUser={setSelectedUserId} />
      <Conversation key={selectedUser.id} user={selectedUser} messages={messages} onSend={handleSend} />
    </ChatLayout>
  )
}

export default ChatPage
