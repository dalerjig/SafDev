import type { ReactNode } from 'react'

type ChatLayoutProps = {
  children: ReactNode
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div>{children}</div>
}

export default ChatLayout
