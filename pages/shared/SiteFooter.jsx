import './site-footer.css'

export default function SiteFooter({ locale = 'en' }) {
  const isChinese = locale === 'zh'

  return (
    <footer className="shared-site-footer">
      <div className="shared-site-footer__line">
        <span>{isChinese ? '© 2026 SkyDAO Group · 天道集团' : '© 2026 SkyDAO Group'}</span>
        <span>
          {isChinese
            ? '构建硅碳共生文明 · Building a Silicon–Carbon Symbiotic Civilization'
            : 'Building a Silicon–Carbon Symbiotic Civilization'}
        </span>
      </div>
    </footer>
  )
}
