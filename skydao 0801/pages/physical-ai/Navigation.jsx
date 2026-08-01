import { useEffect, useState } from 'react'
import { ArrowRight, List, X } from '@phosphor-icons/react'

const navigationItems = [
  ['Central Gate', '中央之门', '#/central-gate'],
  ['Physical AI', '链基智造', '#/physical-ai'],
  ['SkyDAO Wallet', 'SkyDAO 钱包', '#/wallet'],
  ['SkyDAO Art', 'SkyDAO 艺术', '#art'],
  ['AIES', 'AIES', '#aies'],
  ['About', '关于', '/about/'],
]

export default function Navigation({ locale = 'en', onLocaleChange = () => {}, onNavigate = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDarkSection, setOnDarkSection] = useState(false)
  const useLightNavigation = onDarkSection || menuOpen

  useEffect(() => {
    let frame = 0
    const updateTheme = () => {
      frame = 0
      const section = document.getElementById('sai-progress')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const navigationLine = 78
      setOnDarkSection(rect.top <= navigationLine && rect.bottom > navigationLine)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTheme)
    }

    updateTheme()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const navigate = (target) => {
    setMenuOpen(false)
    onNavigate(target)
  }

  return (
    <>
    <header className={`page-navigation ${useLightNavigation ? 'is-on-dark-section' : ''}`}>
        <button className="page-navigation__brand" type="button" onClick={() => navigate('#/')} aria-label="SkyDAO Group home">
          <img
          src={`/pages/physical-ai/assets/brand/skydao-logo-${useLightNavigation ? 'light' : 'dark'}.svg`}
            alt="SkyDAO Group"
          />
        </button>
        <nav className="page-navigation__links" aria-label="Primary navigation">
          {navigationItems.map(([english, chinese, target]) => (
            <button key={english} type="button" onClick={() => navigate(target)}>{locale === 'en' ? english : chinese}</button>
          ))}
        </nav>
        <div className="page-navigation__actions">
          <button
            className="page-navigation__language"
            type="button"
            onClick={() => onLocaleChange(locale === 'en' ? 'zh' : 'en')}
            aria-label={locale === 'en' ? '切换至中文' : 'Switch to English'}
          >
            <span className={locale === 'en' ? 'active' : ''}>EN</span>
            <i />
            <span className={locale === 'zh' ? 'active' : ''}>中文</span>
          </button>
          <button
            className="page-navigation__menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <List />}
            <span>{menuOpen ? (locale === 'en' ? 'CLOSE' : '关闭') : (locale === 'en' ? 'INDEX' : '目录')}</span>
          </button>
        </div>
      </header>
      <aside className={`page-navigation__menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {navigationItems.map(([english, chinese, target], index) => (
          <button key={english} type="button" onClick={() => navigate(target)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {locale === 'en' ? english : chinese}
            <ArrowRight />
          </button>
        ))}
      </aside>
    </>
  )
}
