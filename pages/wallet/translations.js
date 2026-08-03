const pairs = [
  ['中央之门', 'Central Gate'], ['硅基智造', 'Physical AI'], ['SkyDAO 钱包', 'SkyDAO Wallet'],
  ['SkyDAO 艺术', 'SkyDAO Art'], ['Web3 金融', 'Web3 Finance'], ['关于', 'About'], ['目录', 'INDEX'], ['关闭', 'CLOSE'],
  ['钱包 + Visa + 财富', 'Wallet + Visa + Wealth'], ['一个钱包', 'One wallet'], ['一张卡片', 'One card'], ['一次金融体验', 'One financial experience'],
  ['安全保管加密资产 让财富持续增长 并在全球范围内消费 全部在一个 App 中完成', 'Safeguard crypto, grow wealth and spend worldwide — all in one app.'],
  ['下载 App', 'Download App'], ['下载 APP', 'Download App'], ['获取 Visa 卡', 'Get a Visa Card'], ['你需要的一切', 'Everything you need'],
  ['全部在一个钱包里', 'Everything in one wallet'], ['管理加密货币  增加资产  在全球范围内消费  即时转移', 'Manage crypto · Grow assets · Spend worldwide · Transfer instantly'],
  ['商店', 'Store'], ['成长', 'Growth'], ['花费', 'Spend'], ['转移', 'Transfer'], ['安全管理加密资产', 'Securely manage crypto assets'],
  ['灵活管理财富', 'Grow wealth flexibly'], ['使用 Visa 全球付款', 'Pay worldwide with Visa'], ['即时移动资产', 'Move assets instantly'],
  ['了解 SkyDAO Wallet', 'Discover SkyDAO Wallet'], ['SKYDAO 钱包', 'SKYDAO WALLET'], ['您的数字资产中心', 'Your digital asset center'],
  ['在一个地方安全管理每项加密资产。数字资产，有了更好的归宿。', 'Securely manage every crypto asset in one place. A better home for digital assets.'],
  ['多链支持', 'Multi-chain support'], ['投资组合概览', 'Portfolio overview'], ['交易历史', 'Transaction history'], ['全球转移', 'Global transfers'],
  ['SkyDAO 财富', 'SkyDAO Wealth'], ['让每项资产都算数', 'Make every asset count'],
  ['将闲置的加密货币转化为长期价值 加密货币应该继续创造价值', 'Turn idle crypto into long-term value. Your assets should keep working.'],
  ['保持数字资产朝着长期目标努力的有纪律的方式', 'A disciplined way to keep digital assets working toward long-term goals.'],
  ['像现金一样消费加密货币', 'Spend crypto like cash'], ['全球支付', 'Global payments'], ['自动取款机提款', 'ATM withdrawals'],
  ['网上购物', 'Online shopping'], ['即时钱包转账', 'Instant wallet transfers'], ['钱包到 Visa', 'Wallet to Visa'],
  ['一次转移', 'One transfer'], ['一切都变了', 'Everything changes'], ['钱包', 'Wallet'], ['日常消费', 'Everyday spending'],
  ['你的钱包和你一起旅行', 'Your wallet travels with you'], ['在线支付 在店内付款 提取现金 覆盖全球范围', 'Pay online · Pay in store · Withdraw cash · Available worldwide'],
  ['安全 内置', 'Security, built in'], ['人工智能监控', 'AI monitoring'], ['多层安全', 'Multi-layer security'],
  ['受保护的付款', 'Protected payments'], ['合规性控制', 'Compliance controls'], ['合规', 'Compliance'],
  ['建立在全球合规基础之上', 'Built on global compliance'], ['为什么是 SkyDAO', 'Why SkyDAO'],
  ['为长期信任而设计的全球金融基础设施。清晰的基础、稳健的增长和可靠的运营标准。', 'Global financial infrastructure designed for long-term trust, with clear foundations, steady growth and reliable operating standards.'],
  ['区域准入', 'Regional access'], ['全球标准', 'Global standards'], ['执照', 'License'], ['清晰基础', 'Clear foundations'], ['持续控制', 'Continuous control'], ['长期运营', 'Long-term operation'],
  ['SkyDAO 简化了加密金融', 'SkyDAO simplifies crypto finance'], ['常见问题', 'Frequently asked questions'],
  ['一个应用程序，用于在现实生活中存储、增长和消费数字资产。', 'One app to store, grow and spend digital assets in real life.'],
  ['商店 + 财富', 'Store + Wealth'], ['钱包 + Visa', 'Wallet + Visa'], ['一个应用程序', 'One app'], ['加密 + 付款', 'Crypto + Payments'],
  ['传统钱包', 'Traditional wallet'], ['多个应用程序', 'Multiple apps'], ['仅限加密', 'Crypto only'],
  ['关于身份验证、支付场景和账户安全的几个核心问题。', 'Key questions about verification, payments and account security.'],
  ['为什么我的身份验证没有通过？', 'Why did my identity verification fail?'],
  ['我可以使用 SkyDAO 支付订阅服务或其他费用吗？', 'Can I use SkyDAO to pay subscriptions or other bills?'],
  ['SkyDAO 安全吗？', 'Is SkyDAO secure?'],
  ['下载', 'Download'], ['未来从你的口袋开始', 'The future starts in your pocket'],
  ['立即下载 SkyDAO。开始无边界地使用加密货币。', 'Download SkyDAO today and start using crypto without borders.'],
  ['扫码下载 SkyDAO', 'Scan to download SkyDAO'],
  ['比特币', 'Bitcoin'], ['以太币', 'Ethereum'], ['美元', 'USD'],
  ['64,240 美元', '$64,240'], ['28,400 美元', '$28,400'], ['12,860 美元', '$12,860'],
  ['总余额', 'Total balance'], ['105,840 美元', '$105,840'], ['可用', 'Available'],
  ['灵活收入', 'Flexible income'], ['固定收入', 'Fixed income'], ['职业财富', 'Professional wealth'], ['灵活的收入', 'Flexible income'],
  ['香港', 'Hong Kong'], ['美国', 'United States'], ['安全', 'Security'],
  ['每笔付款-每次转账-每次登录-默认受保护', 'Every payment, transfer and login is protected by default.'],
  ['SKYDAO 签证卡', 'SKYDAO VISA CARD'], ['SkyDAO 全球 Visa 卡', 'SkyDAO Global Visa Card'],
  ['在接受 Visa 的任何地方使用您的加密货币 加密货币现在是日常生活的一部分', 'Use your crypto anywhere Visa is accepted. Crypto is now part of everyday life.'],
  ['将价值从钱包转移到卡中，然后用于世界各地的日常时刻。', 'Move value from your wallet to your card, then use it for everyday moments worldwide.'],
]

function createDictionary(locale) { return new Map(pairs.map(([zh, en]) => locale === 'en' ? [zh, en] : [en, zh])) }
export function bindPageTranslations(root, locale) {
  if (!root) return undefined
  const dictionary = createDictionary(locale); let translating = false
  const translate = (scope) => { if (!scope || translating) return; translating = true; const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT); while (walker.nextNode()) { const node = walker.currentNode; const value = node.nodeValue.trim(); const translated = dictionary.get(value); if (translated) node.nodeValue = node.nodeValue.replace(value, translated) } translating = false }
  translate(root); document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  const observer = new MutationObserver((records) => records.forEach(({ target, addedNodes }) => { if (target.nodeType === Node.TEXT_NODE) translate(target.parentNode); addedNodes.forEach((node) => translate(node.nodeType === Node.TEXT_NODE ? node.parentNode : node)) }))
  observer.observe(root, { subtree: true, childList: true, characterData: true }); return () => observer.disconnect()
}
