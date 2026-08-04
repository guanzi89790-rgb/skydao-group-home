import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import SiteNavigation from '../shared/SiteNavigation.jsx'
import { getInitialLocale } from '../shared/language.js'
import { bindPageTranslations } from './translations.js'
import './styles/page.css'
import './styles/native-scroll.css'
import './styles/cinematic.css'
import './styles/about-motion.css'
import './styles/typography.css'

function HomeApp() {
  const shellRef = useRef(null)
  const [locale, setLocale] = useState(() => getInitialLocale())
  useEffect(() => {
    localStorage.setItem('skydao-language', locale)
    return bindPageTranslations(shellRef.current, locale)
  }, [locale])
  const navigate = (target) => { window.location.href = target }
  return <div ref={shellRef} className="site-shell site-shell-home"><SiteNavigation currentPage="home" locale={locale} onLocaleChange={setLocale} onNavigate={navigate} theme="dark" /><Home locale={locale} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><HomeApp /></StrictMode>)
