import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Download from './App.jsx'
import SiteNavigation from '../shared/SiteNavigation.jsx'
import { getInitialLocale } from '../shared/language.js'

function DownloadApp() {
  const [locale, setLocale] = useState(() => getInitialLocale('zh'))
  const navigate = (target) => { window.location.href = target }

  return <div className="site-shell site-shell-down">
    <SiteNavigation locale={locale} onLocaleChange={setLocale} onNavigate={navigate} theme="dark" />
    <Download locale={locale} />
  </div>
}

createRoot(document.getElementById('root')).render(<StrictMode><DownloadApp /></StrictMode>)
