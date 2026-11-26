import type { ReactNode } from 'react'
import { Input } from '@/shared/ui/kit/Input'
import { color, space } from '@/shared/ui/kit/theme'
import type { ChatContact } from '@/entities/chat/model/types'
import { style } from 'typestyle'
import { ChatItem } from './ChatItem'

type ChatListProps = {
  users: ChatContact[]
  selectedUserId: string
  onSelectUser: (userId: string) => void
  footer?: ReactNode
}

export const ChatList = ({ users, selectedUserId, onSelectUser, footer }: ChatListProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <Input placeholder="Поиск контактов и диалогов" />
      </div>
      <div className={styles.list}>
        {users.map(user => (
          <ChatItem
            key={user.id}
            name={user.name}
            lastMessage={user.lastMessage}
            initials={user.initials}
            unreadCount={user.unreadCount}
            selected={user.id === selectedUserId}
            onSelect={() => onSelectUser(user.id)}
          />
        ))}
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

const styles = {
  root: style({
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
    minWidth: 0,
    minHeight: 0,
    background: color.panel,
    borderRight: `1px solid ${color.border}`
  }),
  search: style({
    padding: `${space.xl}px ${space.lg}px`,
    borderBottom: `1px solid ${color.border}`,
    $nest: { '@media (max-width: 700px)': { padding: space.sm } }
  }),
  list: style({
    display: 'flex',
    flexDirection: 'column',
    gap: space.xs,
    minHeight: 0,
    minWidth: 0,
    overflowY: 'auto',
    padding: space.sm
  }),
  footer: style({
    padding: space.lg,
    borderTop: `1px solid ${color.border}`,
    minWidth: 0,
    $nest: { '@media (max-width: 700px)': { padding: space.sm } }
  })
}
