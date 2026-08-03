import { useEffect, useRef, useState } from 'react'
import { playAboutTextMotion } from './about-text-motion'

const imageBase = '/pages/wallet/assets/wallet/generated'

const balances = [
  ['BTC', '比特币', '64,240 美元'],
  ['USDT', '美元', '28,400 美元'],
  ['ETH', '以太币', '12,860 美元'],
]

const everything = [
  {
    label: 'Store',
    title: '商店',
    copy: '安全管理加密资产',
    image: '/pages/wallet/assets/wallet/wallet-digital-asset.png',
  },
  {
    label: 'Growth',
    title: '成长',
    copy: '灵活管理财富',
    image: '/pages/wallet/assets/wallet/wallet-rwa-yield.png',
  },
  {
    label: 'Spend',
    title: '花费',
    copy: '使用 Visa 全球付款',
    image: '/pages/wallet/assets/wallet/wallet-global-card.png',
  },
  {
    label: 'Transfer',
    title: '转移',
    copy: '即时移动资产',
    image: '/pages/wallet/assets/wallet/provided/transfer-cafe.png',
  },
]

const walletItems = ['多链支持', '投资组合概览', '交易历史', '全球转移']
const yieldItems = ['灵活收入', '固定收入', '职业财富']
const yieldCards = [
  ['灵活的收入', 'top'],
  ['固定收入', 'middle'],
  ['职业财富', 'bottom'],
]
const visaItems = ['全球支付', '自动取款机提款', '网上购物', '即时钱包转账']
const globalChannels = ['Visa', 'Apple Pay', 'Google Pay']
const securityItems = ['人工智能监控', '多层安全', '受保护的付款', '合规性控制']
const complianceCards = [
  {
    label: 'Hong Kong',
    title: '香港',
    copy: '区域准入',
    image: '/pages/wallet/assets/wallet/provided/global-slide-1.png',
  },
  {
    label: 'United States',
    title: '美国',
    copy: '全球标准',
    image: '/pages/wallet/assets/wallet/provided/global-slide-2.png',
  },
  {
    label: 'License',
    title: '执照',
    copy: '清晰基础',
    image: '/pages/wallet/assets/wallet/generated/skydao-wallet-security.png',
  },
  {
    label: 'Control',
    title: '持续控制',
    copy: '长期运营',
    image: '/pages/wallet/assets/wallet/generated/skydao-wallet-product.png',
  },
]

const globalSlides = [
  '/pages/wallet/assets/wallet/provided/visa-scene.png',
  '/pages/wallet/assets/wallet/provided/global-slide-1.png',
  '/pages/wallet/assets/wallet/provided/global-slide-2.png',
]

const compareRows = [
  ['传统钱包', 'SkyDAO'],
  ['商店', '商店 + 财富'],
  ['钱包', '钱包 + Visa'],
  ['多个应用程序', '一个应用程序'],
  ['仅限加密', '加密 + 付款'],
]

const faqs = [
  '为什么我的身份验证没有通过？',
  '我可以使用 SkyDAO 支付订阅服务或其他费用吗？',
  'SkyDAO 安全吗？',
]

function WalletCta({ children, dark = false }) {
  return (
    <a className={`wallet-rev-cta ${dark ? 'is-dark' : ''}`} href="/down/">
      {children}
    </a>
  )
}

function Heading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`wallet-clean-heading ${light ? 'is-light' : ''}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <span>{copy}</span>}
    </div>
  )
}

function PhoneMock({ compact = false }) {
  return (
    <div className={`wallet-clean-phone ${compact ? 'is-compact' : ''}`}>
      <div className="wallet-clean-phone-top">
        <span>总余额</span>
        <strong>105,840 美元</strong>
      </div>
      <div className="wallet-clean-card">
        <span>SkyDAO Visa</span>
        <b>•••• 4288</b>
        <em>Visa</em>
      </div>
      <div className="wallet-clean-balance-list">
        {balances.map(([ticker, name, amount]) => (
          <div key={ticker}>
            <i>{ticker}</i>
            <span>{name}<small>可用</small></span>
            <strong>{amount}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pills({ items, dark = false }) {
  return (
    <div className={`wallet-clean-pills ${dark ? 'is-dark' : ''}`}>
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

const walletTokenCloud = [
  ['btc', '/pages/wallet/assets/wallet/provided/icon-btc.png'],
  ['usdt', '/pages/wallet/assets/wallet/provided/icon-usdt.png'],
  ['ton', '/pages/wallet/assets/wallet/provided/icon-ton.png'],
  ['trx', '/pages/wallet/assets/wallet/provided/icon-trx.png'],
  ['eth', '/pages/wallet/assets/wallet/provided/icon-eth.png'],
  ['sol', '/pages/wallet/assets/wallet/provided/icon-sol.png'],
  ['usdc', '/pages/wallet/assets/wallet/provided/icon-usdc.png'],
]

function WalletAppMock() {
  return (
    <div className="wallet-app-device" aria-hidden="true">
      <img className="wallet-app-complete" src="/pages/wallet/assets/wallet/provided/wallet-phone-complete.png" alt="" draggable="false" />
    </div>
  )
}

export default function Wallet() {
  const pageRef = useRef(null)
  const heroVideoRef = useRef(null)
  const [globalSlide, setGlobalSlide] = useState(0)
  const [everythingSlide, setEverythingSlide] = useState(1)

  useEffect(() => playAboutTextMotion(pageRef.current), [])

  useEffect(() => {
    const loadVideo = () => {
      const video = heroVideoRef.current
      if (!video || video.src) return
      video.src = '/pages/wallet/assets/wallet/provided/wallet-secondary-hero.mp4'
      video.play().catch(() => {})
    }
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(loadVideo, { timeout: 1800 })
      : window.setTimeout(loadVideo, 900)
    return () => {
      if (window.cancelIdleCallback && typeof idle === 'number') window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setGlobalSlide((index) => (index + 1) % globalSlides.length)
    }, 5000)

    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const panels = [...page.querySelectorAll('.fullpage-panel')]
    const shell = page.closest('.site-shell-wallet')
    let frame = 0
    let activePanel = ''

    const updateActivePanel = () => {
      frame = 0
      const viewportCenter = window.innerHeight / 2
      const current = panels.find((panel) => {
        const rect = panel.getBoundingClientRect()
        return rect.top <= viewportCenter && rect.bottom > viewportCenter
      }) || panels.reduce((closest, panel) => {
        const rect = panel.getBoundingClientRect()
        const distance = Math.abs((rect.top + rect.bottom) / 2 - viewportCenter)
        return !closest || distance < closest.distance ? { panel, distance } : closest
      }, null)?.panel

      if (!current || current.id === activePanel) return
      activePanel = current.id
      panels.forEach((panel) => panel.classList.toggle('is-visible', panel === current))
      shell?.setAttribute('data-visual-panel', activePanel)
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActivePanel)
    }

    updateActivePanel()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const getEverythingCardState = (index) => {
    const diff = (index - everythingSlide + everything.length) % everything.length
    if (diff === 0) return 'is-active'
    if (diff === 1) return 'is-next'
    if (diff === everything.length - 1) return 'is-prev'
    return 'is-hidden'
  }

  return (
    <main ref={pageRef} className="wallet-rev-page wallet-clean-page about-text-motion">
      <section className="wallet-clean-hero fullpage-panel" id="wallet-overview" data-panel-label="SkyDAO Wallet">
        <video
          ref={heroVideoRef}
          className="wallet-clean-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/pages/wallet/assets/wallet/provided/wallet-secondary-hero-poster.jpg"
        >
        </video>
        <div className="wallet-clean-hero-copy">
          <p className="about-text-item about-text-item-1">钱包 + Visa + 财富</p>
          <h1 className="about-text-title"><span className="about-text-line"><span>一个钱包</span></span><span className="about-text-line"><span>一张卡片</span></span><span className="about-text-line"><span>一次金融体验</span></span></h1>
          <span className="about-text-item about-text-item-2">安全保管加密资产 让财富持续增长 并在全球范围内消费 全部在一个 App 中完成</span>
          <div className="wallet-clean-actions about-text-item about-text-item-3">
            <WalletCta dark>下载 App</WalletCta>
            <WalletCta>获取 Visa 卡</WalletCta>
          </div>
        </div>
      </section>

      <section className="wallet-clean-everything fullpage-panel" id="wallet-everything" data-panel-label="Everything">
        <Heading
          eyebrow="你需要的一切"
          title="全部在一个钱包里"
          copy="管理加密货币  增加资产  在全球范围内消费  即时转移"
        />
        <div className="wallet-everything-carousel" aria-label="SkyDAO Wallet 能力轮播">
          {everything.map((card, index) => (
            <button
              className={`wallet-everything-slide ${getEverythingCardState(index)}`}
              key={card.label}
              type="button"
              onClick={() => setEverythingSlide(index)}
              aria-label={`查看${card.title}`}
              aria-pressed={index === everythingSlide}
            >
              <img className="wallet-card-art" src={card.image} alt="" draggable="false" />
              <span className="wallet-clean-card-shade" aria-hidden="true" />
              <span className="wallet-clean-card-copy">
                <em>{card.label}</em>
                <strong>{card.title}</strong>
              </span>
              <span className="wallet-clean-card-caption">
                {card.copy}
              </span>
            </button>
          ))}
        </div>
        <div className="wallet-everything-dots" aria-label="切换钱包能力">
          {everything.map((card, index) => (
            <button
              key={card.label}
              type="button"
              className={index === everythingSlide ? 'is-active' : ''}
              onClick={() => setEverythingSlide(index)}
              aria-label={`切换到${card.title}`}
            />
          ))}
        </div>
        <a className="button wallet-clean-everything-button" href="/down/">
          <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
        </a>
      </section>

      <section className="wallet-clean-wallet fullpage-panel" id="wallet-wallet" data-panel-label="Wallet">
        <div className="wallet-center-copy">
          <p>SKYDAO 钱包</p>
          <h2>您的数字资产中心</h2>
          <span>在一个地方安全管理每项加密资产。数字资产，有了更好的归宿。</span>
          <div className="wallet-center-features">
            {walletItems.map((item) => <strong key={item}>{item}</strong>)}
          </div>
          <a className="button wallet-center-button" href="/down/">
            <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="wallet-center-visual" />
      </section>

      <section className="wallet-clean-wealth fullpage-panel" id="wallet-wealth" data-panel-label="Wealth">
        <div className="wallet-wealth-copy">
          <p>SkyDAO 财富</p>
          <h2>让每项资产都算数</h2>
          <span>将闲置的加密货币转化为长期价值 加密货币应该继续创造价值</span>
          <strong>保持数字资产朝着长期目标努力的有纪律的方式</strong>
          <a className="button wallet-center-button" href="/down/">
            <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="wallet-wealth-phone-visual" aria-hidden="true" />
      </section>

      <section className="wallet-clean-visa fullpage-panel" id="wallet-visa" data-panel-label="Visa">
        <div className="wallet-visa-copy">
          <p>SKYDAO 签证卡</p>
          <h2>像现金一样消费加密货币</h2>
          <span>在接受 Visa 的任何地方使用您的加密货币 加密货币现在是日常生活的一部分</span>
          <a className="button wallet-center-button" href="/down/">
            <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="wallet-visa-visual">
          <img src="/pages/wallet/assets/wallet/provided/visa-scene.png" alt="" draggable="false" />
          <span className="wallet-visa-bubble is-top-left">全球支付</span>
          <span className="wallet-visa-bubble is-top-right">自动取款机提款</span>
          <span className="wallet-visa-bubble is-bottom-left">网上购物</span>
          <span className="wallet-visa-bubble is-bottom-right">即时钱包转账</span>
        </div>
        <div className="wallet-visa-card" aria-hidden="true">
          <div className="wallet-clean-black-card">
            <span>SkyDAO 全球 Visa 卡</span>
            <em>VISA</em>
            <strong>4288&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;2091</strong>
          </div>
          <Pills items={visaItems} />
        </div>
      </section>

      <section className="wallet-clean-flow wallet-flow-like-visa fullpage-panel" id="wallet-flow" data-panel-label="Flow">
        <div className="wallet-visa-copy">
          <p>钱包到 Visa</p>
          <h2>一次转移<br />一切都变了</h2>
          <span>将价值从钱包转移到卡中，然后用于世界各地的日常时刻。</span>
          <a className="button wallet-center-button" href="/down/">
            <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="wallet-visa-visual wallet-flow-visual">
          <img src="/pages/wallet/assets/wallet/provided/flow-group-collage.png" alt="" draggable="false" />
          <span className="wallet-visa-bubble is-top-left">钱包</span>
          <span className="wallet-visa-bubble is-top-right">Visa</span>
          <span className="wallet-visa-bubble is-bottom-left">日常消费</span>
          <span className="wallet-visa-bubble is-bottom-right">全球转移</span>
        </div>
      </section>

      <section className="wallet-clean-global fullpage-panel" id="wallet-global" data-panel-label="Global">
        <div className="wallet-global-visual">
          <img src={globalSlides[globalSlide]} alt="" draggable="false" />
          <div className="wallet-global-dots" aria-hidden="true">
            {globalSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === globalSlide ? 'is-active' : ''}
                onClick={() => setGlobalSlide(index)}
                aria-label={`切换到第 ${index + 1} 张`}
              />
            ))}
          </div>
        </div>
        <div className="wallet-global-copy">
          <p>全球支付</p>
          <h2>你的钱包和你一起旅行</h2>
          <span>在线支付 在店内付款 提取现金 覆盖全球范围</span>
          <a className="button wallet-center-button" href="/down/">
            <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
          </a>
          <div className="wallet-global-pills">
            <Pills items={globalChannels} />
          </div>
        </div>
      </section>

      <section className="wallet-clean-security fullpage-panel" id="wallet-security" data-panel-label="Security">
        <Heading
          eyebrow="安全"
          title="安全 内置"
          copy="每笔付款-每次转账-每次登录-默认受保护"
          light
        />
        <div className="wallet-security-features">{securityItems.join(' ')}</div>
        <a className="button wallet-security-button" href="/down/">
          <span>了解 SkyDAO Wallet</span><span className="button-arrow" aria-hidden="true">→</span>
        </a>
        <div className="wallet-security-visual" aria-hidden="true">
          <img src="/pages/wallet/assets/wallet/generated/skydao-wallet-security.png" alt="" draggable="false" />
        </div>
      </section>

      <section className="wallet-clean-compliance wallet-compliance-like-everything fullpage-panel" id="wallet-compliance" data-panel-label="Compliance">
        <Heading
          eyebrow="合规"
          title="建立在全球合规基础之上"
          copy="为长期信任而设计的全球金融基础设施。清晰的基础、稳健的增长和可靠的运营标准。"
        />
        <div className="wallet-clean-feature-row">
          {complianceCards.map((card, index) => (
            <article className="wallet-clean-feature-card" key={card.label} style={{ '--wallet-card-index': index }}>
              <img className="wallet-card-art" src={card.image} alt="" draggable="false" />
              <span className="wallet-clean-card-shade" aria-hidden="true" />
              <span className="wallet-clean-card-copy">
                <em>{card.label}</em>
                <strong>{card.title}</strong>
              </span>
              <span className="wallet-clean-card-caption">{card.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="wallet-clean-compare wallet-compare-premium fullpage-panel" id="wallet-compare" data-panel-label="Compare">
        <div className="wallet-center-copy">
          <p>为什么是 SkyDAO</p>
          <h2>SkyDAO 简化了加密金融</h2>
          <span>一个应用程序，用于在现实生活中存储、增长和消费数字资产。</span>
          <div className="wallet-center-features">
            <strong>商店 + 财富</strong>
            <strong>钱包 + Visa</strong>
            <strong>一个应用程序</strong>
            <strong>加密 + 付款</strong>
          </div>
        </div>
        <div className="wallet-compare-panel">
          <div className="wallet-clean-compare-table">
            {compareRows.map(([left, right]) => (
              <div key={left}>
                <span>{left}</span>
                <strong>{right}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wallet-clean-faq wallet-faq-minimal fullpage-panel" id="wallet-faq" data-panel-label="FAQ">
        <div className="wallet-faq-copy">
          <p>FAQ</p>
          <h2>常见问题</h2>
          <span>关于身份验证、支付场景和账户安全的几个核心问题。</span>
        </div>
        <div className="wallet-faq-list">
          {faqs.map((item) => (
            <article key={item}>
              <strong>{item}</strong>
              <span>+</span>
            </article>
          ))}
        </div>
      </section>

      <section className="wallet-clean-download wallet-download-like-hero fullpage-panel" id="wallet-download" data-panel-label="Download">
        <img src={`${imageBase}/skydao-wallet-hero-clean-blue.png`} alt="" draggable="false" />
        <div className="wallet-download-inner">
          <div className="wallet-clean-hero-copy">
            <p>下载</p>
            <h1>未来从你的口袋开始</h1>
            <span>立即下载 SkyDAO。开始无边界地使用加密货币。</span>
            <div className="wallet-clean-actions">
              <WalletCta dark>App Store</WalletCta>
              <WalletCta>Google Play</WalletCta>
              <WalletCta>APK</WalletCta>
            </div>
          </div>
          <div className="wallet-download-qr-card" aria-label="SkyDAO Wallet 下载二维码">
            <img className="wallet-download-qr" src="/pages/wallet/assets/wallet/provided/download-qr.png" alt="" draggable="false" />
            <div>
              <strong>扫码下载 SkyDAO</strong>
              <span>iOS / Android / APK</span>
            </div>
          </div>
        </div>
      </section>
      <div className="wallet-persistent-phone" aria-hidden="true">
        <WalletAppMock />
        <div className="wallet-phone-bubbles">
          {walletItems.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="wallet-phone-token-cloud">
          {walletTokenCloud.map(([name, src]) => <img className={`is-${name}`} src={src} alt="" key={name} draggable="false" />)}
        </div>
      </div>
    </main>
  )
}
