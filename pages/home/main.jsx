import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import Navigation from './Navigation.jsx'
import { bindPageTranslations } from './translations.js'
import './styles/page.css'
import './styles/native-scroll.css'
import './styles/cinematic.css'
import './styles/navigation.css'
import './styles/about-motion.css'
import './styles/typography.css'

function HomeApp() {
  const shellRef = useRef(null)
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    localStorage.setItem('skydao-language', locale)
    return bindPageTranslations(shellRef.current, locale)
  }, [locale])
  const navigate = (target) => { window.location.href = target }
  return <div ref={shellRef} className="site-shell site-shell-home"><Navigation locale={locale} onLocaleChange={setLocale} onNavigate={navigate} /><Home locale={locale} /></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><HomeApp /></StrictMode>)
