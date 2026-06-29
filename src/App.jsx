import { useEffect, useRef, useState } from 'react'
import useSiteMotion from './useSiteMotion.js'
import CountUp from './CountUp.jsx'

const homeNavItems = [
  ['Central Gate', '#/central-gate/definition'],
  ['硅基智造', '#physical-ai'],
  ['SkyDAO Wallet', '#wallet'],
  ['SkyDAO Art', '#art'],
  ['Web3 Finance', '#wallet'],
  ['AIES', '#aies'],
  ['About', '#about'],
]

const centralGateNavItems = [
  ['Definition', '#/central-gate/definition', 'cg-definition'],
  ['System', '#/central-gate/system', 'cg-system'],
  ['Capacity', '#/central-gate/capacity', 'cg-capacity'],
  ['AI Horizon', '#/central-gate/ai-horizon', 'cg-ai-horizon'],
  ['Expansion', '#/central-gate/expansion', 'cg-expansion'],
  ['Energy Base', '#/central-gate/energy-base', 'cg-energy-base'],
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

const aboutSlides = [
  '/assets/about/about-hongkong-skyline-01.png',
  '/assets/about/about-hongkong-skyline-02.png',
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

function Header({ page = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const navItems = homeNavItems

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
        {navItems.map(([label, href, target]) => (
          <a key={label} href={href} data-scroll-target={target}>{label}</a>
        ))}
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
          <ArrowButton href="#/central-gate">了解中央之门</ArrowButton>
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
  ['Footer', '#footer'],
]

const centralGatePanelLinks = [
  ['Definition', '#/central-gate/definition', 'cg-definition'],
  ['System', '#/central-gate/system', 'cg-system'],
  ['Capacity', '#/central-gate/capacity', 'cg-capacity'],
  ['AI Horizon', '#/central-gate/ai-horizon', 'cg-ai-horizon'],
  ['Expansion', '#/central-gate/expansion', 'cg-expansion'],
  ['Energy Base', '#/central-gate/energy-base', 'cg-energy-base'],
]

function FullPageRail({ links = panelLinks, initialPanel = 'central-gate' }) {
  const [activePanel, setActivePanel] = useState(initialPanel)

  useEffect(() => {
    setActivePanel(initialPanel)
    const panels = [...document.querySelectorAll('.fullpage-panel')]
    let animationFrame = 0

    const updateActivePanel = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2
        const active = panels
          .map((panel) => {
            const rect = panel.getBoundingClientRect()
            return {
              panel,
              distance: Math.abs((rect.top + rect.bottom) / 2 - viewportCenter),
            }
          })
          .sort((a, b) => a.distance - b.distance)[0]

        if (active?.panel?.id) setActivePanel(active.panel.id)
      })
    }

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
    updateActivePanel()
    window.addEventListener('scroll', updateActivePanel, { passive: true })
    window.addEventListener('resize', updateActivePanel)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateActivePanel)
      window.removeEventListener('resize', updateActivePanel)
    }
  }, [initialPanel, links])

  return (
    <nav className="fullpage-rail" aria-label="页面章节">
      {links.map(([label, href, target], index) => (
        <a
          className={activePanel === (target || href.slice(1)) ? 'is-active' : ''}
          href={href}
          data-scroll-target={target}
          key={href}
          aria-label={`前往 ${label}`}
          aria-current={activePanel === (target || href.slice(1)) ? 'true' : undefined}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i />
        </a>
      ))}
    </nav>
  )
}

function CentralGatePage() {
  return (
    <main className="central-page">
      <section className="hero central-detail-hero central-starship-hero fullpage-panel" id="cg-definition" data-panel-label="Definition">
        <div className="central-detail-bg" aria-hidden="true">
          <img src="/assets/central-gate/cg-energy-campus-20260626.png" alt="" />
        </div>
        <div className="central-detail-shade" aria-hidden="true" />
        <div className="central-starship-copy">
          <h1 className="central-starship-title hero-title-mask">
            <span className="hero-title-inner">CENTRAL GATE</span>
          </h1>
          <p className="central-starship-subtitle hero-intro-item">AI ENERGY INFRASTRUCTURE NETWORK</p>
          <p className="central-starship-caption hero-intro-item">3GW级AI算力基础设施系统 · 中央之门</p>
        </div>
        <p className="central-panel-index hero-intro-item">01 / 06</p>
      </section>

      <CentralGateSection
        id="cg-system"
        index="02 / 06"
        eyebrow="SYSTEM · 能源 × 算力一体化系统"
        title="能源 × 算力一体化系统"
        background="/assets/central-gate/cg-dc-power-corridor-20260626.png"
        tone="left"
      >
        <div className="central-flow" aria-label="系统运行结构">
          {['能源生产', '电力调度', '800V直流输配', 'AI算力集群'].map((item) => (
            <span className="central-flow-step" key={item}>{item}</span>
          ))}
        </div>
        <ul className="central-component-grid">
          {['超超临界自备电力系统', '800V直流AI供电架构', 'GPU高密度计算集群', '模块化扩展基础设施'].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CentralGateSection>

      <CentralGateSection
        id="cg-capacity"
        index="03 / 06"
        eyebrow="CAPACITY · 工业级AI计算网络"
        title="工业级AI计算网络"
        background="/assets/central-gate/cg-gpu-hall-20260626.png"
        tone="counter"
      >
        <div className="central-counter-band" aria-label="已具备能力">
          <Metric to={300} suffix="MW" label="起步部署" variant="counter" />
          <Metric to={30000} suffix="+" separator="," label="GPU算力规模" variant="counter" />
          <Metric prefix="< " to={1.2} label="PUE" variant="counter" />
        </div>
        <p className="central-output">支持高密度AI训练与推理 · 系统输出：持续运行的工业级AI计算能力</p>
      </CentralGateSection>

      <CentralGateSection
        id="cg-ai-horizon"
        index="04 / 06"
        eyebrow="AI HORIZON · 认知驱动核心"
        title="AI进入智能体时代"
        background="/assets/central-gate/cg-highland-grid-20260626.png"
        tone="horizon"
      >
        <div className="central-horizon-brief">
          <p>
            AI正在从模型能力进入自主执行阶段。芯片是算力的大脑，能源是算力的心脏。
          </p>
          <p>
            当AI运行开始受能源结构约束，能源、算力与数据系统正在形成新的工业层。
          </p>
          <ul className="central-horizon-rows" aria-label="AI基础结构判断">
            <li><span>COMPUTE</span><strong>芯片驱动智能执行</strong></li>
            <li><span>ENERGY</span><strong>能源决定算力边界</strong></li>
            <li><span>INFRASTRUCTURE</span><strong>CENTRAL GATE 提供运行基础</strong></li>
          </ul>
          <strong className="central-horizon-lock">我们构建的不是AI应用，而是AI的基础结构</strong>
        </div>
      </CentralGateSection>

      <CentralGateSection
        id="cg-expansion"
        index="05 / 06"
        eyebrow="EXPANSION · 模块化AI基础设施网络"
        title="模块化AI基础设施网络"
        background="/assets/central-gate/cg-modular-buildout-20260626.png"
        tone="left"
      >
        <div className="central-expansion-overview">
          <p>
            模块化AI基础设施以工业节奏滚动建设。每个新增模块独立交付，并持续并入统一能源与算力网络。
          </p>
        </div>
        <ul className="central-expansion-list">
          <li>
            <span>新增模块</span>
            <strong>
              <CountUp from={0} to={300} duration={0.85} className="count-up-text" />
              <span className="central-number-join">–</span>
              <CountUp from={0} to={600} duration={0.95} className="count-up-text" />
              <span className="central-number-unit">MW</span>
            </strong>
          </li>
          <li>
            <span>目标规模</span>
            <strong>
              <CountUp from={0} to={3} duration={0.9} className="count-up-text" />
              <span className="central-number-unit">GW</span>
            </strong>
          </li>
          <li><span>建设体系</span><strong>Rolling Build</strong></li>
        </ul>
        <p className="central-system-note">连续扩展 · 可复制 · 可规模化</p>
      </CentralGateSection>

      <CentralGateSection
        id="cg-energy-base"
        index="06 / 06"
        eyebrow="ENERGY BASE · 现实收束"
        title="能源决定算力的边界"
        background="/assets/central-gate/cg-highland-grid-20260626.png"
        tone="final"
      >
        <div className="central-final-grid">
          <div>
            <p className="central-kicker">能源底座</p>
            <ul>
              <li>自建超超临界电力系统</li>
              <li>
                <span className="central-inline-number">$</span>
                <CountUp from={0} to={0.03} duration={0.8} className="central-inline-number" />
                <span className="central-inline-number">–</span>
                <CountUp from={0} to={0.05} duration={0.9} className="central-inline-number" />
                <span className="central-inline-number">/kWh</span>
                长期成本结构
              </li>
              <li><CountUp from={0} to={30} duration={0.85} className="central-inline-number" />年能源保障体系</li>
              <li>完全独立电网系统</li>
            </ul>
          </div>
          <div>
            <p className="central-kicker">部署环境</p>
            <ul>
              <li>吉尔吉斯斯坦 · 奥什区域</li>
              <li><CountUp from={0} to={3400} separator="," duration={0.9} className="central-inline-number" />米高海拔自然冷却</li>
              <li><CountUp from={0} to={1200} separator="," duration={0.9} className="central-inline-number" />公顷扩展空间</li>
              <li>独立数据与能源主权环境</li>
            </ul>
          </div>
        </div>
        <div className="central-definition-lock">
          <span>CENTRAL GATE</span>
          <p>不是数据中心，不是能源项目，不是AI工厂。</p>
          <strong>它是：AI时代的能源基础设施系统</strong>
        </div>
        <p className="central-footer-mark">© CENTRAL GATE · 2026</p>
      </CentralGateSection>
    </main>
  )
}

function CentralGateSection({ id, index, eyebrow, title, background, tone = 'center', children }) {
  return (
    <section
      className={`central-detail-panel feature-section fullpage-panel central-${tone}`}
      id={id}
      data-panel-label={title}
      style={{ '--feature-image': `url(${background})` }}
    >
      <div className="central-detail-shade" aria-hidden="true" />
      <Reveal className="central-detail-content">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="central-detail-body">{children}</div>
      </Reveal>
      <p className="central-panel-index">{index}</p>
    </section>
  )
}

function Metric({ to, label, prefix = '', suffix = '', separator = '', text, variant = 'table' }) {
  return (
    <div className={`central-metric central-metric-${variant}`}>
      <strong>
        {text ? (
          text
        ) : (
          <>
            {prefix && <span className="central-number-prefix">{prefix}</span>}
            <CountUp from={0} to={to} separator={separator} duration={0.95} className="count-up-text" />
            {suffix && <span className="central-number-unit">{suffix}</span>}
          </>
        )}
      </strong>
      <span>{label}</span>
    </div>
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
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % aboutSlides.length)
    }, 6800)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <footer className="footer fullpage-panel" id="about" data-panel-label="About SkyDAO">
      <div className="footer-bg" aria-hidden="true">
        {aboutSlides.map((image, index) => (
          <div className={`footer-bg-layer ${index === activeSlide ? 'is-active' : ''}`} key={image}>
            <img src={image} alt="" />
          </div>
        ))}
        <div className="footer-bg-overlay" />
      </div>
      <div className="footer-shell">
        <Reveal className="footer-about">
          <div className="footer-about-copy-block">
            <h2 className="footer-about-title">
              <span>SKYDAO GROUP</span>
            </h2>
            <p className="footer-about-copy">
              <span>立足香港，面向全球。</span>
              <span>构建新一代数字金融基础设施。</span>
              <br />
              <span>以 AI、RWA 与 Web3 为核心，</span>
              <span>连接资产、价值与未来金融。</span>
            </p>
            <strong className="footer-about-signature">TEAM HUMAN</strong>
          </div>
        </Reveal>

        <div className="footer-main">
          <div className="footer-column">
            <p className="footer-label">业务版图</p>
            {[
              ['Central Gate 中央之门', '#/central-gate/definition'],
              ['硅基智造 SGI', '#physical-ai'],
              ['SkyDAO Wallet', '#wallet'],
              ['SkyDAO Art', '#art'],
              ['Web3 Finance', '#wallet'],
              ['AIES 大会', '#aies'],
            ].map(([label, href]) => <a key={label} href={href}>{label}</a>)}
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

        <div className="footer-page-bottom">
          <span>© 2026 SkyDAO Group · 天道集团</span>
          <span>构建硅碳共生文明 · Building a Silicon–Carbon Symbiotic Civilization</span>
        </div>
      </div>
    </footer>
  )
}

function OfficialFooter() {
  const footerLinks = [
    ['錢包', '#wallet'],
    ['卡片', '#wallet'],
    ['支付服務', '#wallet'],
    ['聯盟計劃', '#about'],
    ['幫助中心', '#about'],
    ['關於我們', '#about'],
    ['APP下載', '#about'],
  ]

  return (
    <section className="official-footer fullpage-panel" id="footer" data-panel-label="Footer">
      <div className="official-footer-shell">
        <div className="official-footer-top">
          <div className="official-footer-brand">
            <img src="/assets/brand/skydao-logo-light.svg" alt="SkyDAO" />
            <p>打通數位與現實，重塑未來金融邊界</p>
          </div>
          <nav className="official-footer-nav" aria-label="頁腳導航">
            {footerLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
        </div>

        <div className="official-footer-bottom">
          <div className="official-footer-legal">
            <span>Copyright © 2025 SkyDAO - All rights reserved.</span>
            <a href="#footer">隱私政策</a>
            <a href="#footer">用戶協議</a>
          </div>

          <div className="official-footer-social" aria-label="SkyDAO social links">
            <a href="mailto:operation@skydao.com" aria-label="Email" className="official-footer-social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4.5" y="6.5" width="15" height="11" rx="1.8" />
                <path d="m5.25 7.5 6.75 5 6.75-5" />
              </svg>
            </a>
            <a href="#footer" aria-label="X" className="official-footer-social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5.25 4.75 13.5 14.5M18.75 4.75 5.25 19.25" />
              </svg>
            </a>
            <a href="#footer" aria-label="Telegram" className="official-footer-social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 5.25 4.5 11.3l5.85 2.05L16.7 8.2l-4.95 6.28 5.15 3.95L20 5.25Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const appRef = useRef(null)
  const [page, setPage] = useState(() => (window.location.hash.startsWith('#/central-gate') ? 'central-gate' : 'home'))
  useSiteMotion(appRef, page)

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash.startsWith('#/central-gate') ? 'central-gate' : 'home')
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="site-shell" ref={appRef}>
      <OpeningSequence />
      <Header page={page} />
      <FullPageRail
        links={page === 'central-gate' ? centralGatePanelLinks : panelLinks}
        initialPanel={page === 'central-gate' ? 'cg-definition' : 'central-gate'}
      />
      {page === 'central-gate' ? (
        <CentralGatePage />
      ) : (
        <>
          <main>
            <Hero />
            {featureSections.map((item) => <FeatureSection key={item.id} item={item} />)}
          </main>
          <Footer />
          <OfficialFooter />
        </>
      )}
    </div>
  )
}
