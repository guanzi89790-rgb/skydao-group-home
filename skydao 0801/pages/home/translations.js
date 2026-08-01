const pairs = [
  ['Central Gate', '中央之门'], ['Physical AI', '链基智造'], ['SkyDAO Wallet', 'SkyDAO 钱包'],
  ['SkyDAO Art', 'SkyDAO 艺术'], ['Web3 Finance', 'Web3 金融'], ['About', '关于'],
  ['INDEX', '目录'], ['CLOSE', '关闭'], ['SCROLL TO ENTER', '滚动进入'],
  ['Explore Central Gate', '探索中央之门'], ['Explore SkyDAO Wallet', '探索 SkyDAO 钱包'],
  ['Explore Physical AI', '探索实体 AI'], ['Explore SkyDAO Art', '探索 SkyDAO 艺术'],
  ['Explore AIES', '探索 AIES'], ['Continue the story', '继续探索'],
  ['AI energy infrastructure for the intelligence era.', '面向智能时代的 AI 能源基础设施。'],
  ['Digital assets, payments and real-world value in one financial system.', '将数字资产、支付与现实价值整合进一个金融系统。'],
  ['Intelligent companions designed to understand, remember and grow with you.', '能够理解、记忆并与你共同成长的智能伙伴。'],
  ['Art, provenance and global collection reimagined for the digital era.', '为数字时代重新定义艺术、溯源与全球收藏。'],
  ['Autonomous intelligence for enterprise systems.', '面向企业系统的自主智能。'],
  ['Hong Kong · Global', '香港 · 全球'],
  ['Building a Silicon–Carbon Symbiotic Civilization', '构建硅碳共生文明'],
]

function createDictionary(locale) {
  return new Map(pairs.map(([en, zh]) => locale === 'zh' ? [en, zh] : [zh, en]))
}

export function bindPageTranslations(root, locale) {
  if (!root) return undefined
  const dictionary = createDictionary(locale)
  let translating = false
  const translate = (scope) => {
    if (translating) return
    translating = true
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const node = walker.currentNode
      const value = node.nodeValue.trim()
      const translated = dictionary.get(value)
      if (translated) node.nodeValue = node.nodeValue.replace(value, translated)
    }
    translating = false
  }
  translate(root)
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  const observer = new MutationObserver((records) => records.forEach(({ target, addedNodes }) => {
    if (target.nodeType === Node.TEXT_NODE) translate(target.parentNode)
    addedNodes.forEach((node) => translate(node.nodeType === Node.TEXT_NODE ? node.parentNode : node))
  }))
  observer.observe(root, { subtree: true, childList: true, characterData: true })
  return () => observer.disconnect()
}
