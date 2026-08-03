import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ArrowDown, ArrowRight, List, X } from '@phosphor-icons/react'
import './about.css'
import SiteFooter from '../shared/SiteFooter.jsx'

gsap.registerPlugin(ScrollTrigger)

const ecosystem = [
  { en: ['SkyDAO Collections', 'Digital ownership.|Trusted asset infrastructure.'], zh: ['SkyDAO Collections', '探索数字资产与艺术生态的新连接。|让确权、托管与流通更加高效。'], image: '/pages/about/assets/generated/collections-gallery.png' },
  { en: ['SkyDAO Wallet', 'A gateway for digital finance.|Connected to the Visa network.'], zh: ['SkyDAO Wallet', '连接数字资产与现实支付场景。|接入 Visa 全球支付网络。'], image: '/pages/about/assets/generated/wallet-cards.png' },
  { en: ['Trust Services', 'Trusted custody.|Compliance-led asset services.'], zh: ['信托服务', '以合规为基础，|构建可信的资产托管服务。'], image: '/pages/about/assets/generated/trust-services-v2.png' },
  { en: ['Central Gate', '3GW planned · 300MW initial.|Energy, data centers and GPU clusters.'], zh: ['Central Gate', '规划规模 3GW · 首期建设 300MW。|能源、数据中心与 GPU 集群一体化。'], image: '/pages/about/assets/generated/blue-infrastructure.png' },
  { en: ['Global Network', 'Connecting Asia,|the Middle East and global markets.'], zh: ['全球网络', '连接亚洲、|中东及全球市场。'], image: '/pages/about/assets/generated/global-network.png' },
]

const networkNodes = [
  { id: 'hong-kong', en: 'Hong Kong', zh: '香港', x: '77%', y: '52%', hub: true },
  { id: 'singapore', en: 'Singapore', zh: '新加坡', x: '69%', y: '72%' },
  { id: 'malaysia', en: 'Malaysia', zh: '马来西亚', x: '66%', y: '75%' },
  { id: 'japan', en: 'Japan', zh: '日本', x: '91%', y: '47%' },
  { id: 'dubai', en: 'Dubai', zh: '迪拜', x: '47%', y: '64%' },
]

const copy = {
  en: {
    chapters: ['Opening', 'About', 'Ecosystem', 'Compliance', 'Wallet', 'Network', 'Founder', 'Contact'],
    menu: ['Close', 'Index'], heroIndex: 'Hong Kong / Global Finance', heroTitle: ['SKYDAO GROUP'],
    heroCopy: 'Building the infrastructure|for the future of finance.', city: 'Hong Kong · Digital Assets · AI Infrastructure · Global Finance', scroll: 'Continue the story',
    foundation: 'About SkyDAO', infraTitle: 'A New Era|of Financial Infrastructure.', infraCopy: 'Headquartered in Hong Kong,|SkyDAO Group connects digital assets, AI infrastructure|and global financial services.|Building the next generation of financial technology ecosystems.',
    systems: 'Digital Assets', always: 'AI Infrastructure', architecture: 'Global Finance', globalDesign: 'Innovation Assets',
    ecosystem: 'Core Ecosystem', ecosystemTitle: 'Infrastructure|for What Comes Next.', ecosystemHint: 'Explore the systems connecting finance, technology and global markets.',
    trust: 'Trust / Compliance', trustTitle: 'Trust|Built on Compliance.', trustCopy: 'Built on regulatory foundations,|SkyDAO Group develops secure, transparent|and trusted financial infrastructure.',
    licenseRegion: 'Hong Kong', licenseName: 'Trust or Company|Service Provider', licensed: 'Hong Kong TCSP',
    registrationRegion: 'United States', registrationName: 'Money Services|Business', registered: 'US MSB',
    walletIndex: 'Product / SkyDAO Wallet', walletTitle: 'A gateway|for digital finance.', walletCopy: 'Connecting digital assets,|payments and everyday experiences.',
    discover: 'Explore SkyDAO Wallet', designed: 'Web3 Wallet · Digital Payment Card', everywhere: 'Visa Network',
    network: 'Global Network', networkTitle: 'Connected Globally.|Built from Hong Kong.', networkCopy: 'Connecting Asia,|the Middle East and global markets.',
    founder: 'Founder / Documentary', quote: 'A Long-Term Builder|at the Intersection of|Technology and Finance.', founderName: 'Neo Wang', founderOriginLabel: 'Founder / Origin', founderOrigin: 'SkyDAO Group was founded|by Neo Wang.', founderExperience: 'Years of entrepreneurial and leadership experience|across the internet, blockchain and financial technology.', founderVisionLabel: 'Founder / Vision', founderVision: 'Digital Assets.|Global Payments.|AI Infrastructure.', founderMission: 'Advancing the bridge between established finance|and the technology shaping the next era.', role: 'Founder',
    finale: 'Contact', finaleTitle: "Let's Build|the Future Together.", conversation: 'operation@skydao.com',
    global: '7 Cannon Street, Causeway Bay, Hong Kong', top: 'Back to top ↑',
  },
  zh: {
    chapters: ['序章', '关于天道', '核心生态', '信任与合规', '数字钱包', '全球网络', '创始人', '联系我们'],
    menu: ['关闭', '目录'], heroIndex: '香港 / 全球金融', heroTitle: ['SKYDAO GROUP'],
    heroCopy: '连接传统金融、数字资产与 AI 基础设施，|构建面向未来的全球金融生态。', city: '香港总部 · 数字资产 · AI 基础设施 · 全球金融', scroll: '继续探索',
    foundation: '关于天道', infraTitle: '连接全球，|构建未来金融基础设施。', infraCopy: '总部位于香港，|天道集团是一家面向未来的金融科技集团，|连接数字资产、AI 基础设施与全球金融服务，|构建新一代金融科技生态。',
    systems: '数字资产', always: 'AI 基础设施', architecture: '全球金融', globalDesign: '创新资产',
    ecosystem: '核心生态', ecosystemTitle: '连接科技，|构建未来。', ecosystemHint: '继续滚动，探索金融、科技与全球市场的连接。',
    trust: '信任与合规', trustTitle: '合规，|是长期发展的基础。', trustCopy: '依托香港国际金融中心优势，|天道集团持续建设安全、透明、|可信的全球金融基础设施。',
    licenseRegion: '香港', licenseName: '信托或公司|服务提供者', licensed: '香港 TCSP',
    registrationRegion: '美国', registrationName: '货币服务|业务资质', registered: '美国 MSB',
    walletIndex: '产品 / SkyDAO Wallet', walletTitle: '连接数字资产与|现实支付场景。', walletCopy: '连接数字资产管理、|全球支付与日常应用。',
    discover: '探索 SkyDAO Wallet', designed: 'Web3 钱包 · 数字支付卡', everywhere: 'Visa 支付网络',
    network: '全球网络', networkTitle: '立足香港，|连接全球。', networkCopy: '以香港为中心，|连接亚洲、中东及全球市场。',
    founder: '创始人 / 人物纪实', quote: '推动科技与金融融合的|长期实践者。', founderName: '王小斌 Neo Wang', founderOriginLabel: '创始人 / 创立与经历', founderOrigin: '天道集团由|王小斌 Neo Wang 创立。', founderExperience: '拥有多年互联网、区块链及金融科技领域的|创业与管理经验。', founderVisionLabel: '创始人 / 长期关注', founderVision: '数字资产。|全球支付。|AI 基础设施。', founderMission: '持续推动传统金融体系|与新兴科技生态之间的融合。', role: '创始人',
    finale: '联系我们', finaleTitle: '与我们一起探索|未来金融生态。', conversation: 'operation@skydao.com',
    global: '香港铜锣湾景隆街 7 号', top: '返回顶部 ↑',
  },
}

const Lines = ({ text }) => text.split('|').map((line, index) => <span key={line}>{line}{index < text.split('|').length - 1 && <br />}</span>)

function SectionIndex({ number, label }) {
  return <div className="section-index"><span>{number}</span><i /><small>{label}</small></div>
}

export default function App({ onNavigate = () => {} }) {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const t = copy[lang]
  const chapters = t.chapters.map((label, index) => [String(index + 1).padStart(2, '0'), label])

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
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { yPercent: -100, autoAlpha: 0, duration: 1 })
        .from('.hero-title .line > span', { yPercent: 110, stagger: .12, duration: 1.25 }, '-=.45')
        .from('.hero-copy, .hero-scroll, .hero .section-index', { y: 24, autoAlpha: 0, stagger: .1, duration: .8 }, '-=.7')
        .to('.opening-line', { scaleX: 1, duration: 1.3 }, '<')

      if (!reduce) {
        const heroSwitch = gsap.timeline({
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.1 },
        })
        heroSwitch
          .to('.hero-media-primary', { scale: 1.1, ease: 'none', duration: 1 }, 0)
          .fromTo('.hero-media-secondary',
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', duration: 1 },
            .18,
          )
          .to('.hero-shade-secondary', { autoAlpha: 1, ease: 'none', duration: .65 }, .28)
          .to('.hero-image-label', { autoAlpha: 1, y: 0, ease: 'power2.out', duration: .3 }, .68)
        gsap.to('.infra-image', {
          clipPath: 'inset(0% 0% 0% 0%)', scale: 1,
          scrollTrigger: { trigger: '.infrastructure', start: 'top 72%', end: 'center center', scrub: .8 },
        })
        gsap.from('.infra-copy > *', {
          y: 70, autoAlpha: 0, stagger: .12,
          scrollTrigger: { trigger: '.infrastructure', start: 'top 55%', end: 'center center', scrub: .6 },
        })
        const track = document.querySelector('.ecosystem-track')
        gsap.to(track, {
          x: () => -(track.scrollWidth - innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.ecosystem-pin', start: 'top top',
            end: () => `+=${track.scrollWidth - innerWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true,
          },
        })
        gsap.fromTo('.license-object', {
          y: 150,
          rotationY: (index) => index === 0 ? -16 : 16,
          scale: .94,
          autoAlpha: 0,
        }, {
          y: 0, rotationY: 0, scale: 1, autoAlpha: 1, stagger: .22,
          scrollTrigger: { trigger: '.compliance', start: 'top 58%', end: 'center center', scrub: .8 },
        })
        gsap.fromTo('.wallet-scene', { scale: 1.12 }, {
          scale: 1,
          scrollTrigger: { trigger: '.wallet', start: 'top 75%', end: 'center center', scrub: 1 },
        })
        const founderTrack = document.querySelector('.founder-track')
        gsap.to(founderTrack, {
          x: () => -(founderTrack.scrollWidth - innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '.founder-pin', start: 'top top',
            end: () => `+=${founderTrack.scrollWidth - innerWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true,
          },
        })
        gsap.to('.final-point', {
          scale: .12, boxShadow: '0 0 12px 2px #77bfff',
          scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'center center', scrub: 1 },
        })
      }

      gsap.utils.toArray('.reveal-copy').forEach((el) => {
        gsap.from(el.children, {
          y: 44, autoAlpha: 0, stagger: .1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        })
      })
    }, root)
    return () => {
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  const goTo = (id) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateToPage = (target) => {
    setMenuOpen(false)
    onNavigate(target)
  }

  return <div className="skydao" ref={root}>
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate('#/')} aria-label="SkyDAO Group home">
        <img src="/pages/about/assets/brand/skydao-logo-light.svg" alt="SkyDAO Group" />
      </button>
      <nav className="header-nav" aria-label="Primary navigation">
        {[
          ['Central Gate', '中央之门', '#/central-gate'], ['Physical AI', '硅基智造', '#/physical-ai'],
          ['SkyDAO Wallet', 'SkyDAO 钱包', '#/wallet'], ['SkyDAO Art', 'SkyDAO 艺术', '#art'],
          ['AIES', 'AIES', '#aies'], ['About', '关于', '/about/'],
        ].map(([en, zh, target]) =>
          <button key={en} onClick={() => navigateToPage(target)}>{lang === 'zh' ? zh : en}</button>
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
      {chapters.map(([number, label]) =>
        <button key={number} onClick={() => goTo(`#chapter-${number}`)}><span>{number}</span>{label}<ArrowRight /></button>
      )}
    </aside>

    <main>
      <section className="hero chapter" id="opening">
        <span id="chapter-01" className="anchor" />
        <div className="hero-stage">
          <img className="hero-media hero-media-primary" src="/pages/about/assets/generated/hongkong-night.png" alt="Hong Kong harbour at night" />
          <img className="hero-media hero-media-secondary" src="/pages/about/assets/generated/skydao-hongkong-street.png" alt="SkyDAO presence in Hong Kong" />
          <div className="hero-shade" />
          <div className="hero-shade-secondary" />
          <div className="hero-content">
            <SectionIndex number="01" label={t.heroIndex} />
            <h1 className="hero-title">
              {t.heroTitle.map(line => <span className="line" key={line}><span>{line}</span></span>)}
            </h1>
            <p className="hero-copy"><Lines text={t.heroCopy} /></p>
          </div>
          <div className="hero-image-label">02 <i /> {t.city}</div>
          <div className="opening-line" />
          <button className="hero-scroll" onClick={() => goTo('#chapter-02')}>{t.scroll} <ArrowDown /></button>
        </div>
      </section>

      <section className="infrastructure chapter" id="chapter-02">
        <img className="infra-image" src="/pages/about/assets/generated/blue-infrastructure.png" alt="Future financial data infrastructure" />
        <div className="infra-vignette" />
        <SectionIndex number="02" label={t.foundation} />
        <div className="infra-copy">
          <h2><Lines text={t.infraTitle} /></h2><p><Lines text={t.infraCopy} /></p>
        </div>
        <div className="infra-spec"><span>{t.systems}</span><b>{t.always}</b><span>{t.architecture}</span><b>{t.globalDesign}</b></div>
      </section>

      <section className="ecosystem chapter" id="chapter-03">
        <div className="ecosystem-pin">
          <div className="ecosystem-track">
            <article className="ecosystem-intro">
              <SectionIndex number="03" label={t.ecosystem} />
              <h2><Lines text={t.ecosystemTitle} /></h2><p>{t.ecosystemHint}</p>
            </article>
            {ecosystem.map((item, index) =>
              <article className="ecosystem-panel" key={item.en[0]}>
                <img src={item.image} alt="" />
                <div className="panel-shade" />
                <div className="panel-number">0{index + 1}</div>
                <div className="panel-copy"><h3>{item[lang][0]}</h3><p><Lines text={item[lang][1]} /></p></div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="compliance chapter" id="chapter-04">
        <div className="compliance-atmosphere" />
        <SectionIndex number="04" label={t.trust} />
        <div className="compliance-copy reveal-copy">
          <h2><Lines text={t.trustTitle} /></h2><p><Lines text={t.trustCopy} /></p>
        </div>
        <div className="license-stage">
          <article className="license-object">
            <div className="license-frame">
              <div className="license-glass"><img src="/pages/about/assets/licenses/skydao-tcsp-license.png" alt="SkyDAO Trust Limited Hong Kong TCSP licence" /></div>
            </div>
            <div className="license-caption"><span>{t.licenseRegion}</span><h3><Lines text={t.licenseName} /></h3><small>{t.licensed}</small></div>
          </article>
          <article className="license-object">
            <div className="license-frame">
              <div className="license-glass"><img src="/pages/about/assets/licenses/skydao-msb-license.png" alt="SkyDAO Trust Limited United States MSB registration" /></div>
            </div>
            <div className="license-caption"><span>{t.registrationRegion}</span><h3><Lines text={t.registrationName} /></h3><small>{t.registered}</small></div>
          </article>
        </div>
      </section>

      <section className="wallet chapter" id="chapter-05">
        <img className="wallet-scene" src="/pages/about/assets/about-reference/wallet.png" alt="SkyDAO Wallet and payment card" />
        <div className="wallet-scene-shade" />
        <div className="wallet-copy reveal-copy">
          <SectionIndex number="05" label={t.walletIndex} />
          <h2><Lines text={t.walletTitle} /></h2><p><Lines text={t.walletCopy} /></p>
        </div>
        <div className="wallet-caption"><span>{t.designed}</span><span>{t.everywhere}</span></div>
      </section>

      <section className="network chapter" id="chapter-06">
        <img className="network-background" src="/pages/about/assets/generated/global-network.png" alt="Global financial network across Asia" />
        <div className="network-background-shade" />
        <SectionIndex number="06" label={t.network} />
        <div className="network-copy reveal-copy">
          <h2><Lines text={t.networkTitle} /></h2><p><Lines text={t.networkCopy} /></p>
        </div>
        <div className="network-markers" aria-label={t.network}>
          {networkNodes.map((node) => <div className={`network-marker ${node.hub ? 'is-hub' : ''}`} key={node.id} style={{ '--x': node.x, '--y': node.y }}>
            <span className="marker-pulse" /><span className="marker-core" /><span className="marker-label">{node[lang]}{node.hub && <b>{lang === 'zh' ? '总部' : 'HQ'}</b>}</span>
          </div>)}
        </div>
      </section>

      <section className="founder chapter" id="chapter-07">
        <div className="founder-pin">
          <div className="founder-track">
            {[
              { label: t.founder, title: t.quote, body: t.founderName, meta: t.role, image: '/pages/about/assets/generated/about-founder-neo.png' },
              { label: t.founderOriginLabel, title: t.founderOrigin, body: t.founderExperience, meta: '02 / 03', image: '/pages/about/assets/generated/about-founder-hk.png' },
              { label: t.founderVisionLabel, title: t.founderVision, body: t.founderMission, meta: '03 / 03', image: '/pages/about/assets/generated/blue-infrastructure.png' },
            ].map((panel, index) => <article className={`founder-panel founder-panel-${index + 1}`} key={panel.label}>
              <img src={panel.image} alt="" aria-hidden="true" />
              <div className="founder-panel-shade" />
              <SectionIndex number="07" label={panel.label} />
              <div className="founder-panel-number">0{index + 1} / 03</div>
              <div className="founder-panel-copy">
                <blockquote><Lines text={panel.title} /></blockquote>
                <div><p><Lines text={panel.body} /></p><span>{panel.meta}</span></div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="finale chapter" id="chapter-08">
        <div className="final-grid" /><div className="final-point" />
        <SectionIndex number="08" label={t.finale} />
        <div className="final-copy reveal-copy">
          <img src="/pages/about/assets/brand/skydao-logo-light.svg" alt="SkyDAO Group" />
          <h2><Lines text={t.finaleTitle} /></h2>
          <a href="mailto:operation@skydao.com">{t.conversation} <ArrowRight /></a>
        </div>
        <SiteFooter locale={lang} />
      </section>
    </main>
  </div>
}
