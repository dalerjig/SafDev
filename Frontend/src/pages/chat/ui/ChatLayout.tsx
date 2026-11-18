import type { ReactNode } from 'react'

type ChatLayoutProps = {
  children: ReactNode
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return <div>{children}</div>
}
