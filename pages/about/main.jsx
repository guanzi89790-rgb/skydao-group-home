import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import About from './App.jsx'
import SiteNavigation from '../shared/SiteNavigation.jsx'
import { getInitialLocale } from '../shared/language.js'

function AboutApp() {
  const [locale, setLocale] = useState(() => getInitialLocale())
  const navigate = (target) => { window.location.href = target }

  return <div className="site-shell site-shell-about">
    <SiteNavigation currentPage="about" locale={locale} onLocaleChange={setLocale} onNavigate={navigate} theme="dark" />
    <About locale={locale} />
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><AboutApp /></StrictMode>)
