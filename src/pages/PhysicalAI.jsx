import { useEffect, useRef, useState } from 'react'
import {
  Brain,
  ChatCircleDots,
  Cpu,
  Crosshair,
  GearSix,
  Heart,
  Headset,
  Infinity,
  LinkSimple,
  Play,
  ShieldCheck,
  Sparkle,
  SquaresFour,
  Waveform,
  X,
} from '@phosphor-icons/react'

const lachatFeatures = [
  [Waveform, '情感陪伴', '理解情绪', '温暖回应'],
  [GearSix, '主动关怀', '感知需求', '主动靠近'],
  [Crosshair, '长时记忆', '记住点滴', '越陪越懂你'],
  [ShieldCheck, '环境感知', '精准感知', '安全可靠'],
  [ChatCircleDots, '互动表达', '丰富表情', '主动自然'],
  [Heart, '持续进化', '自我学习', '不断成长'],
]

const nessFeatures = [
  [ChatCircleDots, '陪伴交互', '自然对话', '温柔陪伴'],
  [Brain, '感知理解', '多模感知', '理解你'],
  [LinkSimple, '记忆连接', '记住偏好', '建立连接'],
  [Sparkle, '知识思考', '深度思考', '贴心建议'],
  [Headset, '行动执行', '帮你规划', '协助完成'],
  [Infinity, '持续成长', '自我进化', '越用越强'],
]

const technology = [
  ['/assets/physical-ai/precision-chip.webp', '精密硬件', '自研核心模块', '稳定可靠'],
  ['/assets/physical-ai/biomimetic-design.webp', '仿生设计', '自然灵动', '细节温润'],
  ['/assets/physical-ai/cloud-brain.webp', '端云协同', '本地隐私计算', '云端能力增强'],
  ['/assets/physical-ai/privacy-ness-v2.webp', '安全隐私', '多重隐私机制', '数据安心'],
  ['/assets/physical-ai/open-ecosystem.webp', '开放生态', '持续拓展', '丰富体验'],
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

function TextLink({ children, target }) {
  return (
    <button className="sai-text-link" type="button" onClick={() => scrollToId(target)}>
      <span>{children}</span>
    </button>
  )
}

function FeatureGrid({ title, features, embedded = false }) {
  const content = (
    <>
      <h2>{title}</h2>
      <div className="sai-feature-grid">
        {features.map(([Icon, name, line1, line2]) => (
          <article key={name}>
            <Icon size={36} weight="thin" />
            <h3>{name}</h3>
            <p>{line1}<br />{line2}</p>
          </article>
        ))}
      </div>
    </>
  )

  if (embedded) {
    return <div className="sai-feature-embedded">{content}</div>
  }

  return (
    <section className="sai-feature-band">
      <div className="sai-frame">{content}</div>
    </section>
  )
}

export default function PhysicalAI() {
  const [videoOpen, setVideoOpen] = useState(false)
  const nessStageRef = useRef(null)
  const lachatStageRef = useRef(null)

  useEffect(() => {
    document.title = '硅基智造｜LaChat × ness'
    const routeMap = {
      lachat: 'sai-lachat',
      system: 'sai-system',
      ness: 'sai-ness',
      technology: 'sai-technology',
      progress: 'sai-progress',
    }
    const syncRoute = () => {
      const route = window.location.hash.replace('#/physical-ai/', '')
      const target = routeMap[route]
      if (target) window.requestAnimationFrame(() => scrollToId(target))
      else window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
    }
    window.addEventListener('hashchange', syncRoute)
    syncRoute()
    return () => {
      window.removeEventListener('hashchange', syncRoute)
      document.title = 'SkyDAO Group'
    }
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('.sai-page > section, .sai-page > footer, .sai-feature-grid article, .sai-tech-grid article, .sai-system-card')
    targets.forEach((element, index) => {
      element.classList.add('sai-reveal-item')
      element.style.setProperty('--sai-reveal-delay', `${Math.min(index % 6, 5) * 55}ms`)
    })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => target.classList.toggle('is-visible', isIntersecting))
    }, { threshold: 0.12, rootMargin: '-5% 0px -8% 0px' })
    targets.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0
    const updateLachatReveal = () => {
      frame = 0
      const stage = lachatStageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      const travel = Math.max(window.innerHeight * 0.34, 1)
      stage.style.setProperty('--lachat-reveal', Math.min(1, Math.max(0, -rect.top / travel)).toFixed(4))
    }
    updateLachatReveal()
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateLachatReveal) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateLachatReveal)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', updateLachatReveal); if (frame) window.cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    let frame = 0
    const updateNessReveal = () => {
      frame = 0
      const stage = nessStageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      const travel = Math.max(window.innerHeight * 0.34, 1)
      const reveal = Math.min(1, Math.max(0, -rect.top / travel))
      stage.style.setProperty('--ness-reveal', reveal.toFixed(4))
    }
    updateNessReveal()
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNessReveal)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateNessReveal)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateNessReveal)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])


  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') setVideoOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <main className="sai-page">
      <section className="sai-hero" id="sai-top">
        <img src="/assets/physical-ai/hero-companions-v2.webp" alt="LaChat 猫机器人与 ness 人形伴侣机器人" fetchPriority="high" />
        <div className="sai-frame sai-hero-copy">
          <h1>你身边，<br />多了一种新的可能。</h1>
          <p>LaChat 猫机器人 × ness 人形伴侣机器人<br />陪你生活，陪你成为更好的自己。</p>
          <div className="sai-hero-actions">
            <button type="button" className="sai-pill is-dark" onClick={() => scrollToId('sai-lachat')}>探索 LaChat</button>
            <button type="button" className="sai-pill" onClick={() => scrollToId('sai-ness')}>探索 ness</button>
          </div>
        </div>
      </section>

      <section className="sai-lachat-stage" ref={lachatStageRef}>
      <section className="sai-product sai-lachat" id="sai-lachat">
        <img src="/assets/physical-ai/lachat-home-v2.webp" alt="LaChat 猫机器人在温暖居家环境中" />
        <img className="sai-lachat-reveal-image" src="/assets/physical-ai/lachat-reveal.png" alt="LaChat 猫咪伙伴" fetchPriority="high" />
        <div className="sai-frame sai-product-copy">
          <h2>LaChat</h2>
          <h3>猫机器人伴侣</h3>
          <p>灵动聪敏，暖心陪伴。</p>
          <TextLink target="sai-system">了解 LaChat</TextLink>
        </div>
      </section>
      </section>

      <section className="sai-lachat-overview" id="sai-system">
        <div className="sai-frame sai-lachat-overview-inner">
          <FeatureGrid title="LaChat 核心特点" features={lachatFeatures} embedded />

          <div className="sai-system-embedded">
            <div className="sai-section-heading">
              <h2>双 AI 系统</h2>
              <p>硬件 × 软件，构建完整体验闭环。</p>
            </div>
            <div className="sai-system-grid">
              <article className="sai-system-card is-hardware">
                <img src="/assets/physical-ai/dual-ai-hardware-v2.webp" alt="LaChat 硬件端" />
                <div className="sai-system-copy">
                  <div className="sai-system-copy-heading">
                    <h3>硬件端</h3>
                    <p>LaChat 设备</p>
                  </div>
                  <ul aria-label="硬件端能力">
                    <li>环境感知</li>
                    <li>情绪交互</li>
                    <li>安全可靠</li>
                  </ul>
                </div>
              </article>
              <div className="sai-system-link" aria-label="双向连接，实时协同">
                <svg className="sai-signal-flow" viewBox="0 0 310 350" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="sai-signal-left" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#b8c0ca" stopOpacity=".06" />
                      <stop offset=".18" stopColor="#aeb8c3" stopOpacity=".18" />
                      <stop offset=".64" stopColor="#9aa7b5" stopOpacity=".38" />
                      <stop offset="1" stopColor="#2997ff" stopOpacity=".72" />
                    </linearGradient>
                    <linearGradient id="sai-signal-right" x1="1" y1="0" x2="0" y2="0">
                      <stop offset="0" stopColor="#b8c0ca" stopOpacity=".06" />
                      <stop offset=".18" stopColor="#aeb8c3" stopOpacity=".18" />
                      <stop offset=".64" stopColor="#9aa7b5" stopOpacity=".38" />
                      <stop offset="1" stopColor="#2997ff" stopOpacity=".72" />
                    </linearGradient>
                    <radialGradient id="sai-signal-core">
                      <stop offset="0" stopColor="#2997ff" stopOpacity=".72" />
                      <stop offset="1" stopColor="#2997ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path className="is-left is-outer" d="M0 175 C58 175 91 126 137 151" />
                  <path className="is-left is-inner" d="M0 175 C64 175 98 151 137 164" />
                  <path className="is-left is-inner" d="M0 175 C64 175 98 199 137 186" />
                  <path className="is-left is-outer" d="M0 175 C58 175 91 224 137 199" />
                  <path className="is-right is-outer" d="M310 175 C252 175 219 126 173 151" />
                  <path className="is-right is-inner" d="M310 175 C246 175 212 151 173 164" />
                  <path className="is-right is-inner" d="M310 175 C246 175 212 199 173 186" />
                  <path className="is-right is-outer" d="M310 175 C252 175 219 224 173 199" />
                  <circle className="sai-signal-halo" cx="155" cy="175" r="31" />
                  <path className="sai-signal-bridge" d="M143 175 H167" />
                  <circle className="sai-signal-node" cx="143" cy="175" r="2.5" />
                  <circle className="sai-signal-node" cx="167" cy="175" r="2.5" />
                </svg>
                <span className="sai-signal-label"><strong>双向连接</strong><small>实时协同</small></span>
              </div>
              <article className="sai-system-card is-software">
                <img src="/assets/physical-ai/dual-ai-software-v2.webp" alt="LaChat App 软件端" />
                <div className="sai-system-copy">
                  <div className="sai-system-copy-heading">
                    <h3>软件端</h3>
                    <p>LaChat App</p>
                  </div>
                  <ul aria-label="软件端能力">
                    <li>记忆管理</li>
                    <li>互动记录</li>
                    <li>个性化设置</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="sai-ness-overview" id="sai-ness">
        <div className="sai-ness-stage" ref={nessStageRef}>
        <div className="sai-product sai-ness">
          <img src="/assets/physical-ai/ness-wide-v4.webp" alt="ness 人形伴侣机器人" />
          <img className="sai-ness-reveal-image" src="/assets/physical-ai/ness-home-reveal.png" alt="ness 在家中陪伴生活" fetchPriority="high" />
          <div className="sai-frame sai-product-copy">
            <h2>ness</h2>
            <h3>人形伴侣机器人</h3>
            <p>更真实的伙伴，更深的连接。</p>
            <TextLink target="sai-technology">了解 ness</TextLink>
          </div>
          <div className="sai-frame sai-ness-reveal-copy" aria-hidden="true">
            <p className="sai-ness-reveal-kicker">NESS · HUMAN COMPANION</p>
            <h2>更真实的陪伴，<br />始于理解。</h2>
            <p>感知你的情绪，记住你的习惯，<br />在每一次相遇中，成为更懂你的伙伴。</p>
          </div>
        </div>
        </div>
        <div className="sai-frame">
          <FeatureGrid title="ness 核心能力" features={nessFeatures} embedded />
        </div>
      </section>

      <section className="sai-technology" id="sai-technology">
        <div className="sai-frame">
          <div className="sai-section-heading">
            <h2>设计与技术</h2>
            <p>以科技与美学，创造长期陪伴的体验。</p>
          </div>
          <div className="sai-tech-grid">
            {technology.map(([image, name, line1, line2]) => (
              <article key={name}>
                <img src={image} alt={name} />
                <div><h3>{name}</h3><p>{line1}<br />{line2}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sai-progress" id="sai-progress">
        <img src="/assets/physical-ai/future-companions-v3.webp" alt="LaChat 与 ness 面向未来" />
        <div className="sai-frame sai-progress-copy">
          <h2>未来已来，<br />让陪伴更有温度。</h2>
          <p>与 LaChat 和 ness 一起，<br />开启属于你的故事。</p>
          <button type="button" className="sai-pill" onClick={() => scrollToId('sai-top')}>了解产品进展</button>
        </div>
      </section>

      <footer className="sai-footer">
        <div className="sai-frame sai-footer-grid">
          <div className="sai-footer-brand"><strong>硅基智造</strong><p>让 AI 更懂你，也更懂生活。</p></div>
          <div><b>产品</b><a href="#/physical-ai/lachat">LaChat</a><a href="#/physical-ai/ness">ness</a><a href="#/physical-ai/system">双 AI 系统</a></div>
          <div><b>技术</b><a href="#/physical-ai/technology">设计与技术</a><a href="#/physical-ai/technology">安全与隐私</a></div>
          <div><b>支持</b><a href="#about">帮助中心</a><a href="#about">服务条款</a><a href="#about">隐私政策</a></div>
          <div><b>关于</b><a href="#about">关于我们</a><a href="#about">新闻动态</a><a href="#about">加入我们</a></div>
        </div>
        <div className="sai-frame sai-footer-bottom"><span>© 2026 硅基智造 版权所有</span><span>粤 ICP 备 2025001234 号</span></div>
      </footer>

      {videoOpen && (
        <div className="sai-modal" role="dialog" aria-modal="true" aria-label="产品影片">
          <button className="sai-modal-close" type="button" onClick={() => setVideoOpen(false)} aria-label="关闭影片"><X size={22} /></button>
          <img src="/assets/physical-ai/future-companions-v3.webp" alt="" />
          <div><Play size={28} weight="fill" /><strong>硅基智造产品影片</strong><p>LaChat × ness · 让陪伴更有温度</p></div>
        </div>
      )}
    </main>
  )
}
