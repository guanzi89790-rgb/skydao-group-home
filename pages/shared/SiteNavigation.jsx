import { useEffect, useRef, useState } from 'react'
import { ArrowRight, List, X } from '@phosphor-icons/react'
import './site-navigation.css'

export const siteNavigationItems = [
  { id: 'home', en: 'Home', zh: '首页', href: '/' },
  { id: 'central-gate', en: 'Central Gate', zh: '中央之门', href: '/central-gate/' },
  { id: 'physical-ai', en: 'Physical AI', zh: '硅基智造', href: '/physical-ai/' },
  { id: 'wallet', en: 'SkyDAO Wallet', zh: 'SkyDAO 钱包', href: '/wallet/' },
  { id: 'art', en: 'SkyDAO Art', zh: 'SkyDAO 艺术', href: '/#art' },
  { id: 'aies', en: 'AIES', zh: 'AIES', href: '/#aies' },
  { id: 'about', en: 'About', zh: '关于', href: '/about/' },
]

export default function SiteNavigation({
  locale = 'en',
  onLocaleChange = () => {},
  onNavigate = (href) => { window.location.href = href },
  currentPage = '',
  theme = 'dark',
  darkSectionId,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDarkSection, setOnDarkSection] = useState(false)
  const [onWalletDarkPanel, setOnWalletDarkPanel] = useState(false)
  const [navigationHidden, setNavigationHidden] = useState(false)
  const [atPageTop, setAtPageTop] = useState(true)
  const scrollFrame = useRef(0)

  useEffect(() => {
    document.body.classList.toggle('site-navigation-menu-open', menuOpen)
    if (menuOpen) setNavigationHidden(false)
    return () => document.body.classList.remove('site-navigation-menu-open')
  }, [menuOpen])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let direction = ''
    let distance = 0

    const updateVisibility = () => {
      scrollFrame.current = 0
      const currentScrollY = Math.max(0, window.scrollY)
      const delta = currentScrollY - lastScrollY
      const nextDirection = delta > 0 ? 'down' : delta < 0 ? 'up' : direction
      const isAtPageTop = currentScrollY <= 24

      setAtPageTop(isAtPageTop)

      if (nextDirection !== direction) {
        direction = nextDirection
        distance = 0
      }
      distance += Math.abs(delta)

      if (isAtPageTop || menuOpen) {
        setNavigationHidden(false)
      } else if (direction === 'up' && distance > 0) {
        setNavigationHidden(false)
      } else if (direction === 'down' && distance >= 12) {
        setNavigationHidden(true)
      }

      lastScrollY = currentScrollY
    }

    const requestUpdate = () => {
      if (!scrollFrame.current) scrollFrame.current = window.requestAnimationFrame(updateVisibility)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    updateVisibility()
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!darkSectionId) return undefined

    let frame = 0
    const updateTheme = () => {
      frame = 0
      const section = document.getElementById(darkSectionId)
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
  }, [darkSectionId])

  useEffect(() => {
    if (theme !== 'wallet') return undefined

    const shell = document.querySelector('.site-shell-wallet')
    if (!shell) return undefined
    const darkPanels = new Set(['wallet-overview', 'wallet-security', 'wallet-download'])
    const updateTheme = () => setOnWalletDarkPanel(darkPanels.has(shell.getAttribute('data-visual-panel')))
    const observer = new MutationObserver(updateTheme)
    observer.observe(shell, { attributes: true, attributeFilter: ['data-visual-panel'] })
    updateTheme()
    return () => observer.disconnect()
  }, [theme])

  const usesDarkTheme = theme === 'dark' || menuOpen || onDarkSection || onWalletDarkPanel
  const navigate = (href) => {
    setMenuOpen(false)
    onNavigate(href)
  }

  return (
    <>
      <header className={`site-navigation ${usesDarkTheme ? 'is-dark' : 'is-light'} ${atPageTop ? 'is-at-top' : 'is-scrolled'} ${navigationHidden ? 'is-hidden' : ''}`}>
        <button className="site-navigation__brand" type="button" onClick={() => navigate('/')} aria-label="SkyDAO Group home">
          <img className="site-navigation__logo site-navigation__logo--dark" src="/pages/shared/assets/brand/skydao-logo-dark.svg" alt="SkyDAO Group" />
          <img className="site-navigation__logo site-navigation__logo--light" src="/pages/shared/assets/brand/skydao-logo-light.svg" alt="" aria-hidden="true" />
        </button>

        <nav className="site-navigation__links" aria-label="Primary navigation">
          {siteNavigationItems.map((item) => (
            <button
              className={item.id === currentPage ? 'is-active' : ''}
              key={item.id}
              type="button"
              aria-current={item.id === currentPage ? 'page' : undefined}
              onClick={() => navigate(item.href)}
            >
              {locale === 'zh' ? item.zh : item.en}
            </button>
          ))}
        </nav>

        <div className="site-navigation__actions">
          <button
            className="site-navigation__language"
            type="button"
            onClick={() => onLocaleChange(locale === 'en' ? 'zh' : 'en')}
            aria-label={locale === 'en' ? '切换至中文' : 'Switch to English'}
          >
            <span className={locale === 'en' ? 'active' : ''}>EN</span>
            <i />
            <span className={locale === 'zh' ? 'active' : ''}>中文</span>
          </button>
          <button
            className="site-navigation__menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-menu"
          >
            {menuOpen ? <X /> : <List />}
            <span>{menuOpen ? (locale === 'zh' ? '关闭' : 'CLOSE') : 'INDEX'}</span>
          </button>
        </div>
      </header>

      <aside id="site-navigation-menu" className={`site-navigation__menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {siteNavigationItems.map((item, index) => (
          <button
            className={item.id === currentPage ? 'is-active' : ''}
            key={item.id}
            type="button"
            aria-current={item.id === currentPage ? 'page' : undefined}
            onClick={() => navigate(item.href)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {locale === 'zh' ? item.zh : item.en}
            <ArrowRight />
          </button>
        ))}
      </aside>
    </>
  )
}
