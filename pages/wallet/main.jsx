import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Wallet from './Wallet.jsx'
import Navigation from './Navigation.jsx'
import { bindPageTranslations } from './translations.js'
import './styles/page.css'
import './styles/native-scroll.css'
import './styles/cinematic.css'
import './styles/navigation.css'
import './styles/typography.css'

const destinations = {
  '#/': '/', '#/central-gate': '/central-gate/', '#/physical-ai': '/physical-ai/',
  '#/wallet': '/wallet/', '#art': '/#art', '#aies': '/#aies', '/about/': '/about/',
}

function WalletApp() {
  const shellRef = useRef(null)
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    localStorage.setItem('skydao-language', locale)
    return bindPageTranslations(shellRef.current, locale)
  }, [locale])
  const navigate = (target) => { window.location.href = destinations[target] || target }
  return <div ref={shellRef} className="site-shell site-shell-wallet"><Navigation locale={locale} onLocaleChange={setLocale} onNavigate={navigate} /><Wallet locale={locale} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><WalletApp /></StrictMode>)
