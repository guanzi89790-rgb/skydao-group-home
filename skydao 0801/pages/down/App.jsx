import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { AndroidLogo, AppleLogo, ArrowRight, EnvelopeSimple, List, TelegramLogo, X, XLogo } from '@phosphor-icons/react'
import './down.css'

gsap.registerPlugin(ScrollTrigger)

const asset = '/pages/down/assets'
// 二维码图片本身指向 https://skydao.com/#/download。
// 页面上所有点击行为一律不跳转 —— 商店徽章、社交图标、站内导航的真实地址
// 全部由后端统一接管，下面这些常量只是留给接线时用。
const QR_TARGET = 'https://skydao.com/#/download'
const STORE_LINKS = { ios: QR_TARGET, android: QR_TARGET }
const SOCIAL_LINKS = { email: 'operation@skydao.com', x: 'https://x.com/skydao', telegram: 'https://t.me/skydao' }

// Mirrors the About page's primary navigation.
const nav = [
  ['Central Gate', '中央之门', '#/central-gate'],
  ['Physical AI', '链基智造', '#/physical-ai'],
  ['SkyDAO Wallet', 'SkyDAO 钱包', '#/wallet'],
  ['SkyDAO Art', 'SkyDAO 艺术', '#art'],
  ['AIES', 'AIES', '#aies'],
  ['About', '关于', '/about/'],
]

const footerLinks = [
  ['Wallet', '钱包', '#/wallet'], ['Cards', '卡片', '#/wallet'], ['Payments', '支付服务', '#/wallet'],
  ['RWA', 'RWA', ''], ['Partners', '联盟计划', ''], ['Help Center', '帮助中心', ''],
  ['About Us', '关于我们', '/about/'], ['APP Download', 'APP下载', '/down/'],
]

const menuItems = [
  ['Central Gate', 'Central Gate', '#/central-gate'], ['Physical AI', '链基智造', '#/physical-ai'],
  ['SkyDAO Wallet', 'SkyDAO 钱包', '#/wallet'], ['SkyDAO Art', 'SkyDAO 艺术', '#art'],
  ['AIES', 'AIES', '#aies'], ['About', '关于我们', '/about/'], ['APP Download', 'APP 下载', '/down/'],
]

const copy = {
  en: {
    menu: ['Close', 'Index'],
    heroIndex: 'App / iOS · Android',
    titleTop: 'Download', titleMain: 'SkyDao', titleTail: 'APP',
    lead: 'Digital assets, global payments and everyday spending —|one application, from Hong Kong to the world.',
    iosTop: 'Download on the', iosMain: 'App Store', androidTop: 'Download APK', androidMain: 'Android',
    scanLabel: 'Scan to download',
    imageLabel: 'Hong Kong · Digital Assets · Global Payments',
    footerTagline: 'Connecting the digital and the real —|redefining the edge of future finance.',
    rights: 'Copyright © 2025 SkyDAO - All rights reserved.',
    privacy: 'Privacy Policy', terms: 'Terms of Use',
  },
  zh: {
    menu: ['关闭', '目录'],
    heroIndex: '应用程序 / iOS · Android',
    titleTop: '下载', titleMain: 'SkyDao', titleTail: 'APP',
    lead: '数字资产、全球支付与日常消费 ——|一个应用程序，由香港连接世界。',
    iosTop: 'Download on the', iosMain: 'App Store', androidTop: 'Download APK', androidMain: 'Android',
    scanLabel: '扫码下载',
    imageLabel: '香港 · 数字资产 · 全球支付',
    footerTagline: '打通数字与现实，|重塑未来金融边界。',
    rights: 'Copyright © 2025 SkyDAO - All rights reserved.',
    privacy: '隐私政策', terms: '用户协议',
  },
}

const Lines = ({ text }) => text.split('|').map((line, index) => <span key={line}>{line}{index < text.split('|').length - 1 && <br />}</span>)

function SectionIndex({ number, label }) {
  return <div className="section-index"><span>{number}</span><i /><small>{label}</small></div>
}

function StoreBadge({ icon, top, main, onClick }) {
  return <button type="button" className="store-badge" onClick={onClick}>
    <span className="store-badge-mark">{icon}</span>
    <span className="store-badge-text"><small>{top}</small><strong>{main}</strong></span>
  </button>
}

export default function App({ onNavigate = () => {} }) {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = copy[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    localStorage.setItem('skydao-language', lang)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [lang])

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ duration: 1.15, smoothWheel: !reduce, wheelMultiplier: .9 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.set('.opening-line', { scaleX: 0 })

      // fromTo throughout: under StrictMode's double-mounted effect a plain `from`
      // can capture a mid-flight transform as its resting value and leave the
      // element permanently offset. Explicit end states make that impossible.
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.site-header', { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1 })
        .fromTo('.hero-title .line > span', { yPercent: 112 }, { yPercent: 0, stagger: .12, duration: 1.25 }, '-=.45')
        .fromTo('.title-stroke', { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' }, { scaleX: 1, autoAlpha: 1, duration: .9 }, '-=.55')
        .fromTo('.hero-copy, .hero .section-index', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .1, duration: .8 }, '-=.85')
        .fromTo('.hero-phone',
          { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 6 },
          { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.15')
        .fromTo('.store-badge', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .12, duration: .85 }, '-=1')
        .fromTo('.qr-exhibit', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, '-=.85')
        .fromTo('.hero-image-label', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6 }, '-=.7')
        .to('.opening-line', { scaleX: 1, duration: 1.3 }, '<')

      if (!reduce) {
        gsap.to('.hero-phone', { y: -18, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true })

        // Scroll-scrubbed depth belongs to the full-height desktop stage only —
        // on the stacked mobile layout it would fade content that is still in view.
        gsap.matchMedia().add('(min-width: 901px)', () => {
          gsap.to('.hero-media', {
            scale: 1.12, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
          })
          gsap.to('.hero-content, .hero-phone, .hero-get', {
            yPercent: -6, autoAlpha: .2, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: 1 },
          })
        })
      }

      gsap.utils.toArray('.reveal-copy').forEach((el) => {
        gsap.from(el.children, {
          y: 44, autoAlpha: 0, stagger: .1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })
    }, root)

    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  const go = (target) => {
    setMenuOpen(false)
    if (target) onNavigate(target)
  }

  return <div className="skydao skydao-down" ref={root}>
    <header className="site-header">
      <button className="brand" onClick={() => go('#/')} aria-label="SkyDAO Group home">
        <img src={`${asset}/brand/skydao-logo-light.svg`} alt="SkyDAO Group" />
      </button>

      <nav className="header-nav" aria-label="Primary navigation">
        {nav.map(([en, zh, target]) =>
          <button key={en} onClick={() => go(target)}>{lang === 'zh' ? zh : en}</button>
        )}
      </nav>

      <div className="header-actions">
        <button className="language-toggle" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} aria-label={lang === 'en' ? '切换至中文' : 'Switch to English'}>
          <span className={lang === 'en' ? 'active' : ''}>EN</span><i /><span className={lang === 'zh' ? 'active' : ''}>中文</span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <List />} <span>{menuOpen ? t.menu[0] : t.menu[1]}</span>
        </button>
      </div>
    </header>

    <aside className={`chapter-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
      {menuItems.map(([en, zh, target], index) =>
        <button key={en} onClick={() => go(target)}>
          <span>{String(index + 1).padStart(2, '0')}</span>{lang === 'zh' ? zh : en}<ArrowRight />
        </button>
      )}
    </aside>

    <main>
      <section className="hero chapter" id="download">
        <div className="hero-stage">
          <img className="hero-media" src={`${asset}/app/backdrop.png`} alt="" aria-hidden="true" />
          <div className="hero-shade" />

          <div className="hero-content">
            <SectionIndex number="01" label={t.heroIndex} />
            <h1 className="hero-title">
              <span className="line"><span>{t.titleTop}</span></span>
              <span className="line"><span>{t.titleMain}</span></span>
              <span className="line line-tail">
                <span>{t.titleTail}</span>
                <svg className="title-stroke" viewBox="0 0 300 26" fill="none" aria-hidden="true">
                  <path d="M4 20C58 8 132 4 214 9" stroke="#5aa9ff" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M22 22C82 12 168 9 256 15" stroke="#f0454e" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="hero-copy"><Lines text={t.lead} /></p>
          </div>

          <div className="hero-phone">
            <img src={`${asset}/app/wallet-phone-complete.png`} alt="SkyDAO App" draggable="false" />
          </div>

          <aside className="hero-get">
            <div className="store-row">
              <StoreBadge onClick={go} icon={<AppleLogo weight="fill" />} top={t.iosTop} main={t.iosMain} />
              <StoreBadge onClick={go} icon={<AndroidLogo weight="fill" />} top={t.androidTop} main={t.androidMain} />
            </div>
            <div className="qr-exhibit">
              <div className="qr-plate">
                <img src={`${asset}/app/download-qr.png`} alt={`${t.scanLabel} — ${QR_TARGET}`} draggable="false" />
              </div>
            </div>
          </aside>

          <div className="hero-image-label">02 <i /> {t.imageLabel}</div>
          <div className="opening-line" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={`${asset}/brand/skydao-logo-light.svg`} alt="SkyDAO Group" />
            <p><Lines text={t.footerTagline} /></p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerLinks.map(([en, zh]) =>
              <button key={en + zh} onClick={go}>{lang === 'zh' ? zh : en}</button>
            )}
          </nav>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>{t.rights}</span>
            <button onClick={go}>{t.privacy}</button>
            <button onClick={go}>{t.terms}</button>
          </div>
          <div className="footer-social">
            <button type="button" onClick={go} aria-label="Email"><EnvelopeSimple /></button>
            <button type="button" onClick={go} aria-label="X"><XLogo /></button>
            <button type="button" onClick={go} aria-label="Telegram"><TelegramLogo /></button>
          </div>
        </div>
      </footer>
    </main>
  </div>
}
