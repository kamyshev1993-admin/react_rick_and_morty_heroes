import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import HeroApp from './HeroApp.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HeroApp/>
    </StrictMode>,
)
