export type ChatContact = {
  id: string
  name: string
  initials: string
  avatarUrl: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export type ChatMessage = {
  id: string
  text: string
  time: string
  outgoing: boolean
}
