import { useEffect, useState } from 'react'
import { ArrowRight, List, X } from '@phosphor-icons/react'

const navigationItems = [
  ['Central Gate', '中央之门', '/central-gate/'],
  ['Physical AI', '链基智造', '/physical-ai/'],
  ['SkyDAO Wallet', 'SkyDAO 钱包', '/wallet/'],
  ['SkyDAO Art', 'SkyDAO 艺术', '#art'],
  ['AIES', 'AIES', '#aies'],
  ['About', '关于', '/about/'],
]

export default function Navigation({ locale = 'en', onLocaleChange = () => {}, onNavigate = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('page-menu-open', menuOpen)
    return () => document.body.classList.remove('page-menu-open')
  }, [menuOpen])

  const navigate = (target) => {
    setMenuOpen(false)
    onNavigate(target)
  }

  return (
    <>
      <header className="page-navigation">
        <button className="page-navigation__brand" type="button" onClick={() => navigate('/')} aria-label="SkyDAO Group home">
          <img src="/pages/home/assets/brand/skydao-logo-light.svg" alt="SkyDAO Group" />
        </button>
        <nav className="page-navigation__links" aria-label="Primary navigation">
          {navigationItems.map(([en, zh, target]) => (
            <button key={en} type="button" onClick={() => navigate(target)}>{locale === 'zh' ? zh : en}</button>
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
            <span>{locale === 'zh' ? (menuOpen ? '关闭' : '菜单') : (menuOpen ? 'CLOSE' : 'MENU')}</span>
          </button>
        </div>
      </header>
      <aside className={`page-navigation__menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {navigationItems.map(([en, zh, target], index) => (
          <button key={en} type="button" onClick={() => navigate(target)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {locale === 'zh' ? zh : en}
            <ArrowRight />
          </button>
        ))}
      </aside>
    </>
  )
}
