import { useEffect, useRef, useState } from 'react'
import useSiteMotion from './useSiteMotion.js'

const navItems = [
  ['Central Gate', '#central-gate'],
  ['硅基智造', '#physical-ai'],
  ['SkyDAO Wallet', '#wallet'],
  ['SkyDAO Art', '#art'],
  ['Web3 Finance', '#wallet'],
  ['AIES', '#aies'],
  ['About', '#about'],
]

const featureSections = [
  {
    id: 'physical-ai',
    eyebrow: 'PHYSICAL AI · 硅基智造集团',
    title: '构建硅碳共生文明',
    copy: '把算力变成你能感知的智能——AI 潮玩与情感陪伴机器人，让硅基智能温柔地走进碳基生活。',
    button: '了解详情',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2400&q=88',
    align: 'center',
  },
  {
    id: 'wallet',
    eyebrow: 'WEB3 FINANCE · 链上资产入口',
    title: 'SkyDAO Wallet',
    subtitle: '把价值，装进口袋',
    copy: '让链上资产、卡片支付与 RWA 收益在同一个入口完成连接。',
    button: '了解 SkyDAO Wallet',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=88',
    align: 'center',
  },
  {
    id: 'art',
    eyebrow: 'WEB3 FINANCE · RWA 平台',
    title: 'SkyDAO Art',
    subtitle: '让文明，成为资产',
    copy: '将文化遗产与艺术藏品 RWA 证券化、确权与交易，让真实世界的价值在链上流动。',
    button: '了解 SkyDAO Art',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=2400&q=88',
    align: 'center',
  },
  {
    id: 'aies',
    eyebrow: 'FLAGSHIP EVENT · 全球大会品牌',
    title: 'AIES',
    subtitle: 'AI INFRASTRUCTURE × ENERGY SUMMIT · 算力能源峰会',
    copy: '集团在全球各地不定期举办的 AI 与能源算力行业大会——一个行业前沿资讯与高端对话的平台。首届 2026 · 香港。',
    button: '了解 AIES',
    image: '/assets/aies/aies-summit-collage-2026.png',
    align: 'left',
  },
]

const artCards = [
  {
    kicker: 'CURATED COLLECTION',
    value: '文明资产',
    label: 'CULTURE ON-CHAIN',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=88',
  },
  {
    kicker: 'RWA VERIFIED',
    value: '128',
    label: 'AUTHENTICATED WORKS',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=88',
  },
  {
    kicker: 'GLOBAL LIQUIDITY',
    value: '24',
    label: 'CONNECTED MARKETS',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=88',
  },
]

const physicalAIProducts = [
  {
    image: '/assets/products/ness-ai-companion.jpg',
    kicker: 'NESS.AI · DISPLAY 01',
    name: 'Ness.AI',
    label: '深度情感陪伴与互动 Choupette',
  },
  {
    image: '/assets/products/humanoid-robot-lab.jpg',
    kicker: 'NESS.AI · DISPLAY 02',
    name: 'Ness.AI',
    label: '深度情感陪伴与互动 Choupette',
  },
  {
    image: '/assets/products/designer-cat-ip.jpg',
    kicker: 'KARL LAGERFELD · DISPLAY 01',
    name: 'Karl Lagerfeld',
    label: '（老佛爷）标志性爱猫 Choupette 正版版权',
  },
  {
    image: '/assets/products/ai-cat-companion.jpg',
    kicker: 'KARL LAGERFELD · DISPLAY 02',
    name: 'Karl Lagerfeld',
    label: '（老佛爷）标志性爱猫 Choupette 正版版权',
  },
]

const walletCards = [
  {
    badge: 'Wallet',
    icon: '▣',
    value: 'All-in-One',
    title: 'Digital Wallet',
    action: 'Secure asset control',
    image: '/assets/wallet/wallet-digital-asset.png',
  },
  {
    badge: 'Card',
    icon: '▭',
    value: 'Global Card',
    title: 'Spend crypto anywhere',
    action: 'Instant settlement',
    cta: 'Pay',
    image: '/assets/wallet/wallet-global-card.png',
  },
  {
    badge: 'Yield',
    icon: '▥',
    value: 'RWA Yield',
    title: 'Real assets, on-chain',
    action: 'Projected returns',
    image: '/assets/wallet/wallet-rwa-yield.png',
  },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#central-gate" aria-label="SkyDAO 首页">
        <span>SKYDAO</span>
      </a>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <a className="team-human" href="#about">TEAM HUMAN</a>
    </header>
  )
}

function Reveal({ children, className = '' }) {
  return <div className={`motion-reveal ${className}`}>{children}</div>
}

function ArrowButton({ children, secondary = false, href = '#about' }) {
  return (
    <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>
      <span>{children}</span><span className="button-arrow" aria-hidden="true">→</span>
    </a>
  )
}

const heroImages = [
  '/assets/hero/central-gate-energy-base.jpg',
  '/assets/hero/central-gate-valley.jpg',
  '/assets/hero/central-gate-datacenter.jpg',
]

function HeroMedia() {
  const videoRef = useRef(null)
  const startedVideo = useRef(false)
  const prefersReducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [activeMedia, setActiveMedia] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion.current) return undefined

    if (activeMedia === 'video') {
      startedVideo.current = true
      const video = videoRef.current
      if (!video) return undefined
      video.currentTime = 0
      video.play().catch(() => setActiveMedia(1))
      return undefined
    }

    videoRef.current?.pause()
    const firstRevealDelay = startedVideo.current ? 5000 : 2300
    const timer = window.setTimeout(() => {
      if (!startedVideo.current) {
        setActiveMedia('video')
      } else if (activeMedia < heroImages.length - 1) {
        setActiveMedia(activeMedia + 1)
      } else {
        setActiveMedia('video')
      }
    }, firstRevealDelay)

    return () => window.clearTimeout(timer)
  }, [activeMedia])

  return (
    <div className="hero-media" aria-hidden="true">
      {heroImages.map((image, index) => (
        <div className={`hero-media-layer hero-image-layer ${activeMedia === index ? 'is-active' : ''}`} key={image}>
          <img src={image} alt="" />
        </div>
      ))}
      <div className={`hero-media-layer hero-video-layer ${activeMedia === 'video' ? 'is-active' : ''}`}>
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={heroImages[0]}
          onEnded={() => setActiveMedia(0)}
        >
          <source src="/assets/hero/central-gate-aerial.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero fullpage-panel" id="central-gate" data-panel-label="Central Gate">
      <HeroMedia />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow hero-intro-item">ENERGY × COMPUTE · 集团旗舰</p>
        <h1 className="hero-title-mask"><span className="hero-title-inner">Central Gate</span></h1>
        <h2 className="hero-intro-item">中央之门</h2>
        <p className="hero-copy hero-intro-item">在吉尔吉斯斯坦，以「煤矿 — 坑口电厂 — 算力中心」垂直一体化，把每一度电直接转化为智能。这是整个集团的物理底座。</p>
        <div className="hero-actions hero-intro-item">
          <ArrowButton href="#physical-ai">了解中央之门</ArrowButton>
          <ArrowButton href="#about" secondary>集团价值链</ArrowButton>
        </div>
      </div>
    </section>
  )
}

const panelLinks = [
  ['Central Gate', '#central-gate'],
  ['Physical AI', '#physical-ai'],
  ['Wallet', '#wallet'],
  ['Art', '#art'],
  ['AIES', '#aies'],
  ['About', '#about'],
]

function FullPageRail() {
  const [activePanel, setActivePanel] = useState('central-gate')

  useEffect(() => {
    const panels = [...document.querySelectorAll('.fullpage-panel')]
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (active?.target?.id) setActivePanel(active.target.id)
      },
      { threshold: [0.45, 0.65, 0.82] },
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fullpage-rail" aria-label="页面章节">
      {panelLinks.map(([label, href], index) => (
        <a
          className={activePanel === href.slice(1) ? 'is-active' : ''}
          href={href}
          key={href}
          aria-label={`前往 ${label}`}
          aria-current={activePanel === href.slice(1) ? 'true' : undefined}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i />
        </a>
      ))}
    </nav>
  )
}

function OpeningSequence() {
  return (
    <div className="opening-sequence" aria-hidden="true">
      <div className="opening-curtain opening-curtain-top" />
      <div className="opening-curtain opening-curtain-bottom" />
      <div className="opening-brand">
        <div className="opening-logo-mask">
          <img className="opening-logo-inner" src="/assets/brand/skydao-logo-light.svg" alt="" />
        </div>
        <div className="opening-word-mask"><span className="opening-brand-inner">SKYDAO GROUP</span></div>
      </div>
      <div className="opening-progress"><i className="opening-progress-bar" /></div>
    </div>
  )
}

function FeatureSection({ item }) {
  if (item.id === 'physical-ai') return <PhysicalAISection item={item} />
  if (item.id === 'wallet') return <WalletCarouselSection item={item} />
  if (item.id === 'art') return <ArtCarouselSection item={item} />

  return (
    <section
      className={`feature-section fullpage-panel feature-${item.align}`}
      id={item.id}
      data-panel-label={item.title}
      style={{ '--feature-image': `url(${item.image})` }}
    >
      <div className="feature-shade" aria-hidden="true" />
      <Reveal className="feature-content">
        <p className="eyebrow">{item.eyebrow}</p>
        <h2>{item.title}</h2>
        {item.subtitle && <h3>{item.subtitle}</h3>}
        <p className="feature-copy">{item.copy}</p>
        <ArrowButton>{item.button}</ArrowButton>
      </Reveal>
    </section>
  )
}

function WalletCarouselSection({ item }) {
  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--spot-x', '50%')
    event.currentTarget.style.setProperty('--spot-y', '30%')
  }

  const moveTilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    card.style.setProperty('--tilt-x', `${((0.5 - y) * 8).toFixed(2)}deg`)
    card.style.setProperty('--tilt-y', `${((x - 0.5) * 8).toFixed(2)}deg`)
    card.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`)
    card.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`)
  }

  return (
    <section
      className="feature-section fullpage-panel wallet-carousel-section"
      id={item.id}
      data-panel-label={item.title}
      style={{ '--feature-image': `url(${item.image})` }}
    >
      <div className="feature-shade" aria-hidden="true" />
      <Reveal className="wallet-carousel-content">
        <div className="wallet-heading">
          <p className="eyebrow">{item.eyebrow}</p>
          <h2>{item.title}</h2>
          <h3>{item.subtitle}</h3>
          <p className="feature-copy">{item.copy}</p>
        </div>

        <div className="wallet-card-stage" aria-label="SkyDAO Wallet 产品能力">
          {walletCards.map((card, index) => (
            <article
              className={`wallet-card wallet-feature-card ${card.abstract ? 'is-abstract' : ''}`}
              key={card.badge}
              onPointerMove={moveTilt}
              onPointerLeave={resetTilt}
              style={{ '--wallet-card-index': index }}
            >
              {card.image && <img className="wallet-card-art" src={card.image} alt="" draggable="false" />}
              <span className="wallet-card-abstract" aria-hidden="true" />
              <span className="wallet-card-glare" aria-hidden="true" />
              <span className="wallet-card-badge">
                <i aria-hidden="true">{card.icon}</i>
                {card.badge}
              </span>
              <span className="wallet-card-copy">
                <strong>{card.value}</strong>
                <em>{card.title}</em>
              </span>
              <span className="wallet-card-action">
                <i aria-hidden="true">{card.icon}</i>
                <span>{card.action}</span>
                {card.cta && <b>{card.cta}</b>}
                <small aria-hidden="true">›</small>
              </span>
            </article>
          ))}
        </div>
        <ArrowButton>{item.button}</ArrowButton>
      </Reveal>
    </section>
  )
}

function PhysicalAISection({ item }) {
  return (
    <section
      className="feature-section fullpage-panel physical-ai-section"
      id={item.id}
      data-panel-label={item.title}
      style={{ '--feature-image': `url(${item.image})` }}
    >
      <div className="feature-shade" aria-hidden="true" />
      <Reveal className="physical-ai-content">
        <div className="physical-ai-heading">
          <p className="eyebrow">{item.eyebrow}</p>
          <h2>{item.title}</h2>
          <p className="feature-copy">{item.copy}</p>
          <p className="gallery-hint">TWO PRODUCTS · FOUR VISUAL STORIES · 两大产品 / 四组展示</p>
        </div>
        <div className="physical-product-grid" aria-label="两大产品的四组展示">
          {physicalAIProducts.map((product, index) => (
            <article className="physical-product-card" key={`${product.name}-${index}`}>
              <img src={product.image} alt={product.name} />
              <span className="physical-product-shade" aria-hidden="true" />
              <span className="physical-product-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="physical-product-copy">
                <small>{product.kicker}</small>
                <strong>{product.name}</strong>
                <em>{product.label}</em>
              </span>
            </article>
          ))}
        </div>
        <ArrowButton>{item.button}</ArrowButton>
      </Reveal>
    </section>
  )
}

function ArtCarouselSection({ item }) {
  const [activeCard, setActiveCard] = useState(0)

  const positionFor = (index) => {
    const offset = (index - activeCard + artCards.length) % artCards.length
    if (offset === 0) return 'is-center'
    if (offset === 1) return 'is-right'
    return 'is-left'
  }

  const move = (direction) => {
    setActiveCard((current) => (current + direction + artCards.length) % artCards.length)
  }

  return (
    <section
      className="feature-section fullpage-panel art-carousel-section"
      id={item.id}
      data-panel-label={item.title}
      style={{ '--feature-image': `url(${item.image})` }}
    >
      <div className="feature-shade" aria-hidden="true" />
      <Reveal className="art-carousel-content">
        <div className="art-heading">
          <p className="eyebrow">{item.eyebrow}</p>
          <h2>{item.title}</h2>
          <h3>{item.subtitle}</h3>
          <p className="feature-copy">{item.copy}</p>
        </div>

        <div className="art-card-stage" aria-label="SkyDAO Art 展示卡片">
          {artCards.map((card, index) => (
            <button
              className={`art-slide ${positionFor(index)}`}
              key={card.kicker}
              type="button"
              onClick={() => setActiveCard(index)}
              aria-label={`查看 ${card.kicker}`}
              aria-pressed={index === activeCard}
            >
              <img src={card.image} alt="" />
              <span className="art-slide-shade" />
              <span className="art-slide-copy">
                <small>{card.kicker}</small>
                <strong>{card.value}</strong>
                <em>{card.label}</em>
              </span>
            </button>
          ))}
        </div>

        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)}>PREV</button>
          <span>{String(activeCard + 1).padStart(2, '0')} / 03</span>
          <button type="button" onClick={() => move(1)}>NEXT</button>
        </div>
        <ArrowButton>{item.button}</ArrowButton>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer fullpage-panel" id="about" data-panel-label="About SkyDAO">
      <div className="footer-about">
        <p className="footer-about-label">ABOUT SKYDAO · 关于我们</p>
        <h2>构建安全、合规、可持续的 Web3 金融基础设施。</h2>
        <p>
          SkyDAO 是立足香港、面向全球的数字金融集团，围绕数字资产管理、链上支付、RWA
          与全球合规网络，连接链上资产与真实金融生活。
        </p>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-mark">SKYDAO GROUP</span>
          <p>国际化控股集团，根植香港，布局全球。围绕 AI 能源算力、物理智能、Web3 金融与资本构建协同生态。</p>
          <strong>TEAM HUMAN</strong>
        </div>
        <div className="footer-column">
          <p className="footer-label">业务版图</p>
          {['Central Gate 中央之门', '硅基智造 SGI', 'SkyDAO Wallet', 'SkyDAO Art', 'Web3 Finance', 'AIES 大会'].map((item) => <a key={item} href="#central-gate">{item}</a>)}
        </div>
        <div className="footer-column">
          <p className="footer-label">集团</p>
          {['关于我们', '愿景与使命', '全球布局与合规', '联系我们'].map((item) => <a key={item} href="#about">{item}</a>)}
        </div>
        <div className="footer-column">
          <p className="footer-label">联系</p>
          <a href="mailto:operation@skydao.com">operation@skydao.com</a>
          <a href="#about">X · @skydaogroup</a>
          <span>香港铜锣湾景隆街 7 号<br />SkyDAO Building</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SkyDAO Group · 天道集团</span>
        <span>构建硅碳共生文明 · Building a Silicon–Carbon Symbiotic Civilization</span>
      </div>
    </footer>
  )
}

export default function App() {
  const appRef = useRef(null)
  useSiteMotion(appRef)

  return (
    <div className="site-shell" ref={appRef}>
      <OpeningSequence />
      <Header />
      <FullPageRail />
      <main>
        <Hero />
        {featureSections.map((item) => <FeatureSection key={item.id} item={item} />)}
      </main>
      <Footer />
    </div>
  )
}
