const pairs = [
  ['猫机器人伴侣', 'Cat robot companion'], ['灵动聪敏，暖心陪伴。', 'Bright, responsive and warmly present.'], ['了解 LaChat', 'Discover LaChat'],
  ['情感陪伴', 'Emotional companionship'], ['理解情绪', 'Understands emotions'], ['温暖回应', 'Responds warmly'],
  ['主动关怀', 'Proactive care'], ['感知需求', 'Senses your needs'], ['主动靠近', 'Moves closer proactively'],
  ['长时记忆', 'Long-term memory'], ['记住点滴', 'Remembers the details'], ['越陪越懂你', 'Understands you over time'],
  ['环境感知', 'Environmental awareness'], ['精准感知', 'Precise perception'], ['安全可靠', 'Safe and reliable'],
  ['互动表达', 'Expressive interaction'], ['丰富表情', 'Rich expressions'], ['主动自然', 'Natural initiative'],
  ['持续进化', 'Continuous evolution'], ['自我学习', 'Self-learning'], ['不断成长', 'Always growing'],
  ['LaChat 核心特点', 'LaChat core features'], ['双 AI 系统', 'Dual AI system'], ['硬件 × 软件，构建完整体验闭环。', 'Hardware × software, creating a complete experience loop.'],
  ['硬件端', 'Hardware'], ['软件端', 'Software'], ['环境感知', 'Environmental awareness'], ['情绪交互', 'Emotional interaction'], ['安全可靠', 'Safe and reliable'],
  ['记忆管理', 'Memory management'], ['互动记录', 'Interaction history'], ['个性化设置', 'Personal settings'], ['双向连接', 'Two-way connection'], ['实时协同', 'Real-time coordination'],
  ['人形伴侣机器人', 'Humanoid companion robot'], ['更真实的伙伴，更深的连接。', 'A more authentic companion, a deeper connection.'], ['了解 NESS', 'Discover NESS'],
  ['陪伴交互', 'Companion interaction'], ['自然对话', 'Natural conversation'], ['温柔陪伴', 'Gentle companionship'],
  ['感知理解', 'Perception and understanding'], ['多模感知', 'Multimodal perception'], ['理解你', 'Understands you'],
  ['记忆连接', 'Memory connection'], ['记住偏好', 'Remembers preferences'], ['建立连接', 'Builds connection'],
  ['知识思考', 'Knowledge and reasoning'], ['深度思考', 'Deep reasoning'], ['贴心建议', 'Thoughtful suggestions'],
  ['行动执行', 'Action and execution'], ['帮你规划', 'Helps you plan'], ['协助完成', 'Helps you accomplish'],
  ['持续成长', 'Continuous growth'], ['自我进化', 'Self-evolution'], ['越用越强', 'Grows stronger with use'],
  ['更真实的陪伴，', 'More authentic companionship,'], ['始于理解。', 'begins with understanding.'],
  ['感知你的情绪，记住你的习惯，', 'Sensing your emotions and remembering your habits,'], ['在每一次相遇中，成为更懂你的伙伴。', 'becoming a companion who understands you more with every encounter.'],
  ['NESS 核心能力', 'NESS core capabilities'], ['设计与技术', 'Design and technology'], ['以科技与美学，创造长期陪伴的体验。', 'Combining technology and aesthetics to create lasting companionship.'],
  ['精密硬件', 'Precision hardware'], ['仿生设计', 'Biomimetic design'], ['端云协同', 'Edge-cloud collaboration'], ['安全隐私', 'Security and privacy'], ['开放生态', 'Open ecosystem'],
  ['自研核心模块', 'Proprietary core modules'], ['稳定可靠', 'Stable and reliable'], ['自然灵动', 'Natural and agile'], ['细节温润', 'Warm in every detail'],
  ['本地隐私计算', 'Private on-device computing'], ['云端能力增强', 'Cloud-enhanced capabilities'], ['多重隐私机制', 'Multi-layer privacy'], ['数据安心', 'Data you can trust'], ['持续拓展', 'Continuously expanding'], ['丰富体验', 'Richer experiences'],
  ['未来已来，', 'The future is here,'], ['让陪伴更有温度。', 'making companionship warmer.'], ['了解产品进展', 'View product progress'],
  ['与 LaChat 和 NESS 一起，', 'Together with LaChat and NESS,'], ['开启属于你的故事。', 'begin a story of your own.'],
  ['硅基智造', 'Physical AI'], ['让 AI 更懂你，也更懂生活。', 'Helping AI understand you — and life — better.'], ['产品', 'Products'], ['技术', 'Technology'], ['支持', 'Support'], ['关于', 'About'],
  ['帮助中心', 'Help center'], ['服务条款', 'Terms of service'], ['隐私政策', 'Privacy policy'], ['关于我们', 'About us'], ['新闻动态', 'News'], ['加入我们', 'Join us'],
  ['安全与隐私', 'Security and privacy'], ['© 2026 硅基智造 版权所有', '© 2026 Physical AI. All rights reserved.'],
  ['粤 ICP 备 2025001234 号', 'ICP Filing No. 2025001234'],
  ['硅基智造产品影片', 'Physical AI product film'], ['让陪伴更有温度', 'Making companionship warmer'], ['关闭影片', 'Close film'],
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
