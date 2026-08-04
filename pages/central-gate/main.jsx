import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CentralGate from './CentralGate.jsx'
import SiteNavigation from '../shared/SiteNavigation.jsx'
import { getInitialLocale } from '../shared/language.js'
import { bindPageTranslations } from './translations.js'
import './styles/page.css'
import './styles/native-scroll.css'
import './styles/cinematic.css'
import './styles/typography.css'
import './styles/about-two-image-reveal.css'

function CentralGateApp() {
  const shellRef = useRef(null)
  const [locale, setLocale] = useState(() => getInitialLocale())
  useEffect(() => {
    localStorage.setItem('skydao-language', locale)
    return bindPageTranslations(shellRef.current, locale)
  }, [locale])
  const navigate = (target) => { window.location.href = target }
  return <div ref={shellRef} className="site-shell site-shell-central-gate"><SiteNavigation currentPage="central-gate" locale={locale} onLocaleChange={setLocale} onNavigate={navigate} theme="dark" /><CentralGate locale={locale} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><CentralGateApp /></StrictMode>)
