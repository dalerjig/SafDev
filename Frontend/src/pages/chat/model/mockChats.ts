import alexAvatar from '@/assets/avatars/alex.svg'
import mariaAvatar from '@/assets/avatars/maria.svg'
import ivanAvatar from '@/assets/avatars/ivan.svg'
import annaAvatar from '@/assets/avatars/anna.svg'
import sergeyAvatar from '@/assets/avatars/sergey.svg'
import type { ChatContact, ChatMessage } from '@/entities/chat/model/types'

export const mockUsers: ChatContact[] = [
  {
    id: '100201',
    name: 'Алексей',
    initials: 'АЛ',
    avatarUrl: alexAvatar,
    lastMessage: 'Сегодня идём на босса?',
    lastMessageTime: '12:40',
    unreadCount: 2
  },
  {
    id: '100202',
    name: 'Мария',
    initials: 'МА',
    avatarUrl: mariaAvatar,
    lastMessage: 'Скинешь аккорды той песни?',
    lastMessageTime: '12:15',
    unreadCount: 0
  },
  {
    id: '100203',
    name: 'Иван',
    initials: 'ИВ',
    avatarUrl: ivanAvatar,
    lastMessage: 'Я посмотрел твой проект, обсудим вечером.',
    lastMessageTime: '11:58',
    unreadCount: 1
  },
  {
    id: '100204',
    name: 'Анна',
    initials: 'АН',
    avatarUrl: annaAvatar,
    lastMessage: 'Спасибо! До встречи на репетиции.',
    lastMessageTime: '10:32',
    unreadCount: 0
  },
  {
    id: '100205',
    name: 'Сергей',
    initials: 'СЕ',
    avatarUrl: sergeyAvatar,
    lastMessage: 'Есть идея для следующего мероприятия.',
    lastMessageTime: '09:45',
    unreadCount: 3
  }
]

export const mockMessages: Record<string, ChatMessage[]> = {
  ...Object.fromEntries(
    mockUsers.map(user => [
      user.id,
      [{ id: `${user.id}-1`, text: user.lastMessage, time: user.lastMessageTime, outgoing: false }]
    ])
  ),
  '100201': [
    { id: '100201-1', text: 'Привет! Сегодня идём на босса?', time: '12:40', outgoing: false },
    { id: '100201-2', text: 'Да, буду после восьми.', time: '12:42', outgoing: true },
    { id: '100201-3', text: 'Отлично, тогда до вечера!', time: '12:43', outgoing: false }
  ]
}
