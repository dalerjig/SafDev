import { useShallow } from 'zustand/react/shallow'
import { style } from 'typestyle'
import Button from '@/shared/ui/kit/Button'
import useLogoutStore from '../model/useLogoutStore'

const LogoutButton = () => {
  const { isLoading, logout } = useLogoutStore(
    useShallow(state => ({ isLoading: state.isLoading, logout: state.logout }))
  )

  return (
    <Button className={styles.root} variant="ghost" disabled={isLoading} onClick={() => void logout()}>
      {isLoading ? 'Выходим…' : 'Выйти'}
    </Button>
  )
}

export default LogoutButton

const styles = {
  root: style({ width: '100%' })
}
