import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { AndroidLogo } from '@phosphor-icons/react'
import './down.css'
import SiteFooter from '../shared/SiteFooter.jsx'

gsap.registerPlugin(ScrollTrigger)

const asset = '/pages/down/assets'
// 二维码图片本身指向 https://skydao.com/#/download。
// 页面上所有点击行为一律不跳转 —— 商店徽章、社交图标、站内导航的真实地址
// 全部由后端统一接管，下面这些常量只是留给接线时用。
const QR_TARGET = 'https://skydao.com/#/download'
const IOS_DOWNLOAD_URL = 'https://apps.apple.com/hk/app/skydao/id6499490160'
const ANDROID_DOWNLOAD_URL = 'https://skydao.s3.ap-east-1.amazonaws.com/download/android/skydao.apk'

const copy = {
  en: {
    menu: ['Close', 'Index'],
    heroIndex: 'App / iOS · Android',
    titleTop: 'Download', titleMain: 'SkyDao', titleTail: 'APP',
    lead: 'Digital assets, global payments and everyday spending —|one application, from Hong Kong to the world.',
    iosTop: 'Download on the', iosMain: 'App Store', androidTop: 'Download APK', androidMain: 'Android',
    scanLabel: 'Scan to download',
    imageLabel: 'Hong Kong · Digital Assets · Global Payments',
  },
  zh: {
    menu: ['关闭', '目录'],
    heroIndex: '应用程序 / iOS · Android',
    titleTop: '下载', titleMain: 'SkyDao', titleTail: 'APP',
    lead: '数字资产、全球支付与日常消费 ——|一个应用程序，由香港连接世界。',
    iosTop: 'Download on the', iosMain: 'App Store', androidTop: 'Download APK', androidMain: 'Android',
    scanLabel: '扫码下载',
    imageLabel: '香港 · 数字资产 · 全球支付',
  },
}

const Lines = ({ text }) => text.split('|').map((line, index) => <span key={line}>{line}{index < text.split('|').length - 1 && <br />}</span>)

function AppleMark() {
  return <svg viewBox="0 0 384 512" role="img" aria-label="Apple">
    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-72.5-19.7-39.2.6-75.3 22.8-95.5 58.4-40.7 70.6-10.4 174.5 29.3 231.9 19.8 28.6 43.5 60.8 74.6 59.6 29.8-1.2 41.1-19.3 77.2-19.3 35 0 45 19.3 76.3 18.6 31.5-.6 51.5-28.6 70.8-57.4 23-33.6 32.5-66.2 33.1-67.9-72.8-34.2-69-100.5-69-102.6zm-58.5-164.2c27.3-32.3 24.8-61.7 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
}

function SectionIndex({ number, label }) {
  return <div className="section-index"><span>{number}</span><i /><small>{label}</small></div>
}

function StoreBadge({ icon, top, main, href }) {
  return <a className="store-badge" href={href} target="_blank" rel="noreferrer">
    <span className="store-badge-mark">{icon}</span>
    <span className="store-badge-text"><small>{top}</small><strong>{main}</strong></span>
  </a>
}

export default function App({ locale = 'zh' }) {
  const root = useRef(null)
  const lang = locale
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

      // fromTo throughout: under StrictMode's double-mounted effect a plain `from`
      // can capture a mid-flight transform as its resting value and leave the
      // element permanently offset. Explicit end states make that impossible.
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-title .line > span', { yPercent: 112 }, { yPercent: 0, stagger: .12, duration: 1.25 }, '-=.45')
        .fromTo('.title-stroke', { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' }, { scaleX: 1, autoAlpha: 1, duration: .9 }, '-=.55')
        .fromTo('.hero-copy, .hero .section-index', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .1, duration: .8 }, '-=.85')
        .fromTo('.hero-phone',
          { clipPath: 'inset(100% 0% 0% 0%)', yPercent: 6 },
          { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.15')
        .fromTo('.store-badge', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .12, duration: .85 }, '-=1')
        .fromTo('.qr-exhibit', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, '-=.85')
        .fromTo('.hero-image-label', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6 }, '-=.7')

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

  return <div className="skydao skydao-down" ref={root}>
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
              <StoreBadge href={IOS_DOWNLOAD_URL} icon={<AppleMark />} top={t.iosTop} main={t.iosMain} />
              <StoreBadge href={ANDROID_DOWNLOAD_URL} icon={<AndroidLogo weight="fill" />} top={t.androidTop} main={t.androidMain} />
            </div>
            <div className="qr-exhibit">
              <div className="qr-plate">
                <img src={`${asset}/app/download-qr.png`} alt={`${t.scanLabel} — ${QR_TARGET}`} draggable="false" />
              </div>
            </div>
          </aside>

          <div className="hero-image-label">02 <i /> {t.imageLabel}</div>
          <SiteFooter locale={lang} />
        </div>
      </section>

    </main>
  </div>
}
