import { useLayoutEffect, useRef } from 'react'
import { createAboutMotion } from './about-motion.js'

const aiImages = [
  '/pages/home/assets/physical-ai/ness-ai-hero-new.png',
  '/pages/home/assets/products/humanoid-robot-lab.jpg',
  '/pages/home/assets/physical-ai/karl-lagerfeld-home.webp',
  '/pages/home/assets/physical-ai/karl-lagerfeld-cat.png',
]

const artImages = [
  '/pages/home/assets/art-auction-gallery.png',
  '/pages/home/assets/art-provenance-v2.png',
  '/pages/home/assets/art-global-collection.png',
]

const homeCopy = {
  zh: {
    heroSubtitle: '中央之门',
    heroCopy: '在吉尔吉斯斯坦，以「煤矿 — 坑口电厂 — 算力中心」垂直一体化，把每一度电直接转化为智能。这是整个集团的物理底座。',
    heroCta: '了解中央之门',
    aiTitle: '构建硅碳共生文明',
    aiCopy: '把算力变成你能感知的智能——AI 潮玩与情感陪伴机器人，让硅基智能温柔地走进碳基生活。',
    aiCta: '了解详情',
    aiScenes: [
      ['Ness.AI', '深度情感陪伴与互动 Choupette'],
      ['Ness.AI', '深度情感陪伴与互动 Choupette'],
      ['Karl Lagerfeld', '标志性爱猫 Choupette 正版版权'],
      ['Karl Lagerfeld', '标志性爱猫 Choupette 正版版权'],
    ],
    walletSubtitle: '把价值，装进口袋',
    walletCopy: '让链上资产、卡片支付与 RWA 收益在同一个入口完成连接。',
    walletCta: '了解 SkyDAO Wallet',
    artTitle: 'SkyDAO Art',
    artSubtitle: '让文明，成为资产',
    artCopy: '将文化遗产与艺术藏品 RWA 证券化、确权与交易，让真实世界的价值在链上流动。',
    artCta: '了解 SkyDAO Art',
    artScenes: [['文明资产', '文化价值上链'], ['确权', '艺术资产可信认证'], ['全球流动', '真实世界价值连接全球市场']],
    aiesTitle: 'AIES',
    aiesSubtitle: 'AI INFRASTRUCTURE × ENERGY SUMMIT · 算力能源峰会',
    aiesCopy: '集团在全球各地不定期举办的 AI 与能源算力行业大会——一个行业前沿资讯与高端对话的平台。首届 2026 · 香港。',
    groupTitle: 'SKYDAO GROUP',
    groupCopy: '立足香港，面向全球。\n构建新一代数字金融基础设施。\n\n以 AI、RWA 与 Web3 为核心，\n连接资产、价值与未来金融。',
    groupColumns: [
      ['业务版图', 'Central Gate 中央之门', '硅基智造 SGI', 'SkyDAO Wallet', 'SkyDAO Art', 'Web3 Finance', 'AIES 大会'],
      ['集团', '关于我们', '愿景与使命', '全球布局与合规', '联系我们'],
      ['联系', 'operation@skydao.com', 'X · @skydaogroup', '香港铜锣湾景隆街 7 号', 'SkyDAO Building'],
    ],
  },
  en: {
    heroSubtitle: 'Central Gate',
    heroCopy: 'In Kyrgyzstan, coal, mine-mouth power and computing infrastructure form one integrated system, converting energy directly into intelligence.',
    heroCta: 'Explore Central Gate',
    aiTitle: 'Building a silicon-carbon civilization',
    aiCopy: 'Turning computing power into intelligence you can feel through AI collectibles and emotional companion robots.',
    aiCta: 'Discover Physical AI',
    aiScenes: [
      ['Ness.AI', 'Deep emotional companionship and interaction'],
      ['Ness.AI', 'Intelligence entering the physical world'],
      ['Karl Lagerfeld', 'The officially licensed Choupette'],
      ['Karl Lagerfeld', 'A new form of future companionship'],
    ],
    walletSubtitle: 'Value, in your pocket',
    walletCopy: 'Connect on-chain assets, card payments and RWA yield through one gateway.',
    walletCta: 'Explore SkyDAO Wallet',
    artTitle: 'SkyDAO Art',
    artSubtitle: 'Turning culture into assets',
    artCopy: 'Tokenizing, authenticating and trading cultural heritage and art so real-world value can move on-chain.',
    artCta: 'Explore SkyDAO Art',
    artScenes: [['Cultural Assets', 'Culture, recorded on-chain'], ['Provenance', 'Trusted authentication for art'], ['Global Liquidity', 'Real-world value connected to global markets']],
    aiesTitle: 'AIES',
    aiesSubtitle: 'AI INFRASTRUCTURE × ENERGY SUMMIT',
    aiesCopy: 'A global forum for frontier intelligence, energy infrastructure and high-level dialogue. Inaugural summit: Hong Kong, 2026.',
    groupTitle: 'SKYDAO GROUP',
    groupCopy: 'Based in Hong Kong and built for the world. We connect assets, value and the future of finance through AI, RWA and Web3.',
    groupColumns: [
      ['Business', 'Central Gate', 'Silicon Intelligence SGI', 'SkyDAO Wallet', 'SkyDAO Art', 'Web3 Finance', 'AIES Summit'],
      ['Group', 'About us', 'Vision & mission', 'Global presence & compliance', 'Contact'],
      ['Contact', 'operation@skydao.com', 'X · @skydaogroup', '7 Jing Lung Street, Causeway Bay', 'SkyDAO Building'],
    ],
  },
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  )
}

function ChapterLink({ href, children }) {
  return (
    <a className="cinematic-link" href={href}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  )
}

function GalleryPanel({ scene, index, total, type }) {
  return (
    <article className={`cinematic-gallery-panel cinematic-gallery-panel-${type}`}>
      <img className="about-motion-image" src={scene.image} alt="" />
      <span className="cinematic-media-shade" aria-hidden="true" />
      <div className="cinematic-gallery-meta">
        <span>
          {type === 'ai' || type === 'art'
            ? String(index + 1).padStart(2, '0')
            : `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
        </span>
        <span>{type === 'ai' ? 'SILICON CIVILIZATION' : 'SKYDAO ART'}</span>
      </div>
      <div className="cinematic-gallery-copy">
        <h3>{scene.title}</h3>
        <p>{scene.copy}</p>
      </div>
    </article>
  )
}

export default function Home({ locale = 'en' }) {
  const pageRef = useRef(null)
  const copy = homeCopy[locale]
  const aiScenes = aiImages.map((image, index) => ({ image, title: copy.aiScenes[index][0], copy: copy.aiScenes[index][1] }))
  const artScenes = artImages.map((image, index) => ({ image, title: copy.artScenes[index][0], copy: copy.artScenes[index][1] }))

  useLayoutEffect(() => createAboutMotion(pageRef.current), [locale])

  return (
    <>
    <main className="cinematic-home" ref={pageRef}>
      <section className="cinematic-hero" id="central-gate">
        <div className="cinematic-hero-stage">
          <div className="cinematic-hero-media hero-scene-aerial about-motion-image">
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/pages/home/assets/hero/central-gate-aerial.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="cinematic-media-shade" aria-hidden="true" />
          <div className="cinematic-chapter-mark"><span>01</span><i /></div>
          <div className="cinematic-hero-copy about-motion-copy">
            <h1>Central Gate</h1>
            <h2>{copy.heroSubtitle}</h2>
            <p>{copy.heroCopy}</p>
            <ChapterLink href="/central-gate/">{copy.heroCta}</ChapterLink>
          </div>
          <div className="hero-scene-caption">
            <span>ENERGY</span><i /><span>COMPUTE</span><i /><span>INTELLIGENCE</span>
          </div>
          <div className="cinematic-opening-line" aria-hidden="true" />
          <div className="cinematic-scroll-cue"><span>SCROLL TO ENTER</span><i /></div>
        </div>
      </section>

      <section className="cinematic-gallery cinematic-ai" id="physical-ai">
        <div className="cinematic-gallery-stage">
          <div className="cinematic-gallery-track">
            <article className="cinematic-gallery-intro">
              <div className="cinematic-chapter-mark"><span>02</span><i /></div>
              <div>
                <h2>{copy.aiTitle}</h2>
                <p>{copy.aiCopy}</p>
              </div>
              <ChapterLink href="/physical-ai/">{copy.aiCta}</ChapterLink>
            </article>
            {aiScenes.map((scene, index) => (
              <GalleryPanel scene={scene} index={index} total={aiScenes.length} type="ai" key={scene.image} />
            ))}
          </div>
          <div className="cinematic-gallery-progress" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="cinematic-wallet" id="wallet">
        <div className="cinematic-wallet-stage">
          <div className="wallet-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="wallet-products" aria-hidden="true">
            <img className="wallet-device-main" src="/pages/home/assets/wallet/generated/skydao-wallet-product.png" alt="" />
          </div>
          <div className="cinematic-chapter-mark"><span>03</span><i /></div>
          <div className="wallet-story-copy about-motion-copy">
            <h2>SkyDAO<br />Wallet</h2>
            <h3>{copy.walletSubtitle}</h3>
            <p>{copy.walletCopy}</p>
            <ChapterLink href="/wallet/">{copy.walletCta}</ChapterLink>
          </div>
          <p className="wallet-utility-copy">ASSETS · PAYMENT · RWA</p>
        </div>
      </section>

      <section className="cinematic-gallery cinematic-art" id="art">
        <div className="cinematic-gallery-stage">
          <div className="cinematic-gallery-track">
            <article className="cinematic-gallery-intro cinematic-art-intro">
              <div className="cinematic-chapter-mark"><span>04</span><i /></div>
              <div>
                <h2>{copy.artTitle}</h2>
                <h3>{copy.artSubtitle}</h3>
                <p>{copy.artCopy}</p>
              </div>
              <ChapterLink href="#art">{copy.artCta}</ChapterLink>
            </article>
            {artScenes.map((scene, index) => (
              <GalleryPanel scene={scene} index={index} total={artScenes.length} type="art" key={scene.image} />
            ))}
          </div>
          <div className="cinematic-gallery-progress" aria-hidden="true"><i /></div>
        </div>
      </section>

      <section className="cinematic-aies" id="aies">
        <div className="aies-media">
          <img className="about-motion-image" src="/pages/home/assets/aies/aies-summit-collage-2026.png" alt="" />
        </div>
        <span className="cinematic-media-shade" aria-hidden="true" />
        <div className="cinematic-chapter-mark"><span>05</span><i /></div>
        <div className="aies-story-copy about-motion-copy">
          <h2>{copy.aiesTitle}</h2>
          <h3>{copy.aiesSubtitle}</h3>
          <p>{copy.aiesCopy}</p>
          <span>2026 · HONG KONG</span>
        </div>
      </section>

      <section className="cinematic-group" id="about">
        <div className="cinematic-group-stage">
          <img className="group-image-primary about-motion-image" src="/pages/home/assets/about/about-hongkong-skyline-01.png" alt="" />
          <span className="cinematic-media-shade" aria-hidden="true" />
          <div className="cinematic-chapter-mark"><span>06</span><i /></div>
          <div className="group-editorial">
            <div className="group-story-copy about-motion-copy">
              <span>HONG KONG · GLOBAL</span>
              <h2>{copy.groupTitle}</h2>
              <p>{copy.groupCopy}</p>
              <strong>TEAM HUMAN</strong>
            </div>
            <div className="group-details">
              {copy.groupColumns.map(([title, ...items], index) => (
                <div className="group-detail-column" key={title}>
                  <div className="group-detail-heading">
                    <small>0{index + 1}</small>
                    <h3>{title}</h3>
                  </div>
                  <div className="group-detail-items">
                    {items.map((item) => item.includes('@') ? (
                      <a href={item.startsWith('operation') ? `mailto:${item}` : '#about'} key={item}>{item}</a>
                    ) : <span key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="group-legal-line">
            <span>{locale === 'zh' ? '© 2026 SkyDAO Group · 天道集团' : '© 2026 SkyDAO Group'}</span>
            <span>{locale === 'zh' ? '构建硅碳共生文明 · Building a Silicon–Carbon Symbiotic Civilization' : 'Building a Silicon–Carbon Symbiotic Civilization'}</span>
          </div>
        </div>
      </section>

    </main>
    </>
  )
}
