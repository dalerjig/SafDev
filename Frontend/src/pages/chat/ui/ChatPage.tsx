import { useState } from 'react'
import { style } from 'typestyle'
import useSessionStore from '@/entities/session/model/useSessionStore'
import { LogoutButton } from '@/features/logout/ui/LogoutButton'
import { Flow } from '@/shared/ui/kit/Flow'
import { color, space } from '@/shared/ui/kit/theme'
import { ChatList } from '@/widgets/chat-list/ui/ChatList'
import { Conversation } from '@/widgets/conversation/ui/Conversation'
import type { ChatMessage } from '@/entities/chat/model/types'
import { mockMessages, mockUsers } from '../model/mockChats'
import { ChatLayout } from './ChatLayout'

export const ChatPage = () => {
  const currentUser = useSessionStore(state => state.user)
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
      <ChatList
        users={users}
        selectedUserId={selectedUser.id}
        onSelectUser={setSelectedUserId}
        footer={
          currentUser && (
            <Flow mode="vertical" gap={space.md}>
              <div>
                <div className={styles.profileName}>{currentUser.display_name}</div>
                <div className={styles.profileId}>ID {currentUser.public_id}</div>
              </div>
              <LogoutButton />
            </Flow>
          )
        }
      />
      <Conversation key={selectedUser.id} user={selectedUser} messages={messages} onSend={handleSend} />
    </ChatLayout>
  )
}

const styles = {
  profileName: style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 500
  }),
  profileId: style({ fontSize: 12, color: color.textSubtle })
}
