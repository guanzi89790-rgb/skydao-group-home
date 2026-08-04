import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Wallet from './Wallet.jsx'
import SiteNavigation from '../shared/SiteNavigation.jsx'
import { getInitialLocale } from '../shared/language.js'
import { bindPageTranslations } from './translations.js'
import './styles/page.css'
import './styles/native-scroll.css'
import './styles/cinematic.css'
import './styles/typography.css'

function WalletApp() {
  const shellRef = useRef(null)
  const [locale, setLocale] = useState(() => getInitialLocale())
  useEffect(() => {
    localStorage.setItem('skydao-language', locale)
    return bindPageTranslations(shellRef.current, locale)
  }, [locale])
  const navigate = (target) => { window.location.href = target }
  return <div ref={shellRef} className="site-shell site-shell-wallet"><SiteNavigation currentPage="wallet" locale={locale} onLocaleChange={setLocale} onNavigate={navigate} theme="wallet" /><Wallet locale={locale} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><WalletApp /></StrictMode>)
