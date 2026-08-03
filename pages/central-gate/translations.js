const pairs = [
  ['中央之门', 'Central Gate'], ['硅基智造', 'Physical AI'], ['SkyDAO 钱包', 'SkyDAO Wallet'],
  ['SkyDAO 艺术', 'SkyDAO Art'], ['Web3 金融', 'Web3 Finance'], ['关于', 'About'],
  ['目录', 'INDEX'], ['关闭', 'CLOSE'], ['了解中央之门', 'Explore Central Gate'],
  ['集团价值链', 'Group Value Chain'], ['集团旗舰', 'Group Flagship'],
  ['在吉尔吉斯斯坦，以「煤矿 — 坑口电厂 — 算力中心」垂直一体化，把每一度电直接转化为智能。这是整个集团的物理底座。', 'In Kyrgyzstan, coal, mine-mouth power and computing infrastructure form one integrated system, converting energy directly into intelligence. This is the physical foundation of the Group.'],
  ['3GW级AI算力基础设施系统 · 中央之门', '3GW AI computing infrastructure system · Central Gate'],
  ['SYSTEM · 能源 × 算力一体化系统', 'SYSTEM · INTEGRATED ENERGY × COMPUTE'],
  ['CAPACITY · 工业级AI计算网络', 'CAPACITY · INDUSTRIAL AI COMPUTING NETWORK'],
  ['AI HORIZON · 认知驱动核心', 'AI HORIZON · COGNITIVE CORE'],
  ['EXPANSION · 模块化AI基础设施网络', 'EXPANSION · MODULAR AI INFRASTRUCTURE'],
  ['ENERGY BASE · 现实收束', 'ENERGY BASE · PHYSICAL FOUNDATION'],
  ['能源 × 算力一体化系统', 'Integrated energy × compute system'], ['能源生产', 'Energy generation'], ['电力调度', 'Power dispatch'],
  ['800V直流输配', '800V DC transmission'], ['AI算力集群', 'AI compute cluster'],
  ['超超临界自备电力系统', 'Ultra-supercritical captive power system'], ['800V直流AI供电架构', '800V DC AI power architecture'],
  ['GPU高密度计算集群', 'High-density GPU compute cluster'], ['模块化扩展基础设施', 'Modular expansion infrastructure'],
  ['工业级AI计算网络', 'Industrial AI computing network'], ['起步部署', 'Initial deployment'], ['GPU算力规模', 'GPU compute scale'],
  ['已具备能力', 'Current capacity'],
  ['支持高密度AI训练与推理 · 系统输出：持续运行的工业级AI计算能力', 'Supporting high-density AI training and inference · Output: continuously operating industrial AI computing capacity'],
  ['AI进入智能体时代', 'AI enters the agentic era'],
  ['AI正在从模型能力进入自主执行阶段。芯片是算力的大脑，能源是算力的心脏。', 'AI is moving from model capability to autonomous execution. Chips are the brain of compute; energy is its heart.'],
  ['当AI运行开始受能源结构约束，能源、算力与数据系统正在形成新的工业层。', 'As AI operation becomes constrained by energy structures, energy, compute and data systems are forming a new industrial layer.'],
  ['芯片驱动智能执行', 'Chips drive intelligent execution'], ['能源决定算力边界', 'Energy defines the boundary of compute'],
  ['CENTRAL GATE 提供运行基础', 'CENTRAL GATE provides the operating foundation'],
  ['我们构建的不是AI应用，而是AI的基础结构', 'We are not building an AI application, but the infrastructure beneath AI'],
  ['新增模块', 'New modules'], ['目标规模', 'Target scale'], ['建设体系', 'Build system'],
  ['模块化AI基础设施网络', 'Modular AI infrastructure network'],
  ['模块化AI基础设施以工业节奏滚动建设。每个新增模块独立交付，并持续并入统一能源与算力网络。', 'Modular AI infrastructure is built at industrial cadence. Each new module is delivered independently and continuously integrated into a unified energy and compute network.'],
  ['连续扩展 · 可复制 · 可规模化', 'Continuous expansion · Replicable · Scalable'],
  ['能源决定算力的边界', 'Energy defines the boundary of compute'], ['长期成本结构', 'long-term cost structure'],
  ['能源底座', 'Energy foundation'], ['自建超超临界电力系统', 'Self-built ultra-supercritical power system'],
  ['年能源保障体系', 'year energy assurance system'], ['完全独立电网系统', 'Fully independent power grid'],
  ['部署环境', 'Deployment environment'], ['吉尔吉斯斯坦 · 奥什区域', 'Osh Region · Kyrgyzstan'],
  ['米高海拔自然冷却', 'm altitude with natural cooling'], ['公顷扩展空间', 'hectares of expansion space'],
  ['独立数据与能源主权环境', 'Independent data and energy sovereignty'],
  ['不是数据中心，不是能源项目，不是AI工厂。', 'Not a data center, not an energy project, not an AI factory.'],
  ['它是：AI时代的能源基础设施系统', 'It is the energy infrastructure system for the AI era'],
  ['立足香港，面向全球。', 'Based in Hong Kong, serving the world.'],
  ['构建新一代数字金融基础设施。', 'Building the next generation of digital financial infrastructure.'],
  ['业务版图', 'Business'], ['集团', 'Group'], ['联系', 'Contact'],
  ['首页', 'Home'], ['关于我们', 'About us'], ['愿景与使命', 'Vision & mission'],
  ['全球布局与合规', 'Global presence & compliance'], ['联系我们', 'Contact us'],
  ['新闻动态', 'News'], ['投资者关系', 'Investor relations'], ['加入我们', 'Join us'], ['APP下载', 'Download app'],
  ['隐私政策', 'Privacy policy'], ['用户协议', 'User agreement'],
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
