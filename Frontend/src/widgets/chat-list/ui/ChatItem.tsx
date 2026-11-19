import ListItem from '@/shared/ui/kit/ListItem'

interface ChatItemProps {
  name: string
  lastMessage: string
  initials: string
  unreadCount?: number
  selected?: boolean
  onSelect?: () => void
}

const ChatItem = ({ name, lastMessage, initials, unreadCount = 0, selected = false, onSelect }: ChatItemProps) => {
  return (
    <ListItem
      title={name}
      description={lastMessage}
      icon={<div>{initials}</div>}
      label={unreadCount > 0 ? String(unreadCount) : undefined}
      selected={selected}
      onSelect={onSelect}
    />
  )
}

export default ChatItem
