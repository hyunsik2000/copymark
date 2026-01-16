
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CopymarkToastProvider } from '@lyu_danny/copymark'

createRoot(document.getElementById('root')!).render(
  <CopymarkToastProvider>
    <App />
  </CopymarkToastProvider>,
)
