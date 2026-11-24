import { useEffect, useRef, useState } from 'react'
import type { ChatContact, ChatMessage } from '@/entities/chat/model/types'
import Button from '@/shared/ui/kit/Button'
import Flow from '@/shared/ui/kit/Flow'
import Header from '@/shared/ui/kit/Header'
import Icon from '@/shared/ui/kit/Icon'
import Textarea from '@/shared/ui/kit/Textarea'
import { color, radius, space } from '@/shared/ui/kit/theme'
import { classes, style } from 'typestyle'

type ConversationProps = {
  user: ChatContact
  messages: ChatMessage[]
  onSend: (text: string) => void
}

const Conversation = ({ user, messages, onSend }: ConversationProps) => {
  const [draft, setDraft] = useState('')
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const history = historyRef.current

    if (history) history.scrollTop = history.scrollHeight
  }, [messages])

  const handleSend = () => {
    const text = draft.trim()

    if (!text) return

    onSend(text)
    setDraft('')
  }

  return (
    <div className={styles.root}>
      <Header
        left={<div className={styles.avatar}>{user.initials}</div>}
        center={
          <Flow mode="vertical" gap={0}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.contactInfo}>Контакт · ID {user.id}</div>
          </Flow>
        }
        right={
          <Flow mode="horizontal" gap={4} align="center" fullWidth={false}>
            <Button type="button" variant="ghost" square icon={<Icon name="search" />} tooltip="Поиск по переписке" />
            <Button type="button" variant="ghost" square icon={<Icon name="more" />} tooltip="Информация о контакте" />
          </Flow>
        }
      />

      <div className={styles.history} ref={historyRef}>
        <div className={styles.messages}>
          {messages.map(message => (
            <div key={message.id} className={classes(styles.message, message.outgoing && styles.outgoing)}>
              {!message.outgoing && <div className={styles.author}>{user.name}</div>}
              <div>{message.text}</div>
              <div className={styles.time}>{message.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.composer}>
        <Textarea
          placeholder="Написать сообщение"
          rows={1}
          value={draft}
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault()
              handleSend()
            }
          }}
        />
        <Button className={styles.sendButton} type="button" onClick={handleSend} disabled={!draft.trim()}>
          Отправить
        </Button>
      </div>
    </div>
  )
}

export default Conversation

const styles = {
  root: style({
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
    background: color.surfaceMuted,
    color: color.text,
    fontSize: 14,
    lineHeight: 1.5
  }),
  avatar: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    background: color.selected,
    color: color.accent,
    $nest: { '@media (max-width: 700px)': { width: 32, height: 32, borderRadius: radius.sm } }
  }),
  name: style({
    fontSize: 15,
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }),
  contactInfo: style({
    marginTop: space.xs,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 12,
    color: color.textMuted
  }),
  history: style({
    minHeight: 0,
    minWidth: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: space.xxl,
    $nest: { '@media (max-width: 800px)': { padding: space.md } }
  }),
  messages: style({ display: 'flex', flexDirection: 'column', gap: space.lg }),
  message: style({
    alignSelf: 'flex-start',
    maxWidth: 'min(78%, 560px)',
    padding: `${space.md}px ${space.lg}px`,
    borderRadius: '14px 14px 14px 4px',
    background: color.surfaceSecondary,
    border: `1px solid ${color.border}`,
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap',
    $nest: { '@media (max-width: 700px)': { maxWidth: '100%', padding: space.md } }
  }),
  outgoing: style({
    alignSelf: 'flex-end',
    background: color.outgoing,
    borderColor: color.outgoing,
    borderRadius: '14px 14px 4px 14px'
  }),
  author: style({ marginBottom: space.xs, fontSize: 12, fontWeight: 500, color: color.accent }),
  time: style({ marginTop: space.xs, textAlign: 'right', fontSize: 11, color: color.textMuted }),
  composer: style({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'end',
    gap: space.lg,
    padding: `${space.xl}px ${space.xxl}px`,
    background: color.surface,
    borderTop: `1px solid ${color.border}`,
    $nest: {
      '@media (max-width: 800px)': { gap: space.sm, padding: space.md },
      '@media (max-width: 700px)': { gridTemplateColumns: 'minmax(0, 1fr)' }
    }
  }),
  sendButton: style({ height: 48 })
}
