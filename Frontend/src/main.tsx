import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import { cssRule } from 'typestyle'
import '@fontsource/rubik'
import '@fontsource/rubik/500.css'

cssRule('*, *::before, *::after', {
  boxSizing: 'border-box'
})

cssRule('body', {
  margin: 0
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
