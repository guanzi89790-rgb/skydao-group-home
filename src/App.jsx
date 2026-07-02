import { useEffect, useRef, useState } from 'react'
import useSiteMotion from './useSiteMotion.js'
import CentralGate from './pages/CentralGate.jsx'
import Home from './pages/Home.jsx'
import Wallet from './pages/Wallet.jsx'
import {
  FullPageRail,
  Header,
  OpeningSequence,
  centralGatePanelLinks,
  panelLinks,
} from './site/SkydaoSite.jsx'

function getPageFromHash() {
  if (window.location.hash.startsWith('#/central-gate')) return 'central-gate'
  if (window.location.hash.startsWith('#/wallet')) return 'wallet'
  return 'home'
}

const walletPanelLinks = [
  ['Overview', '#/wallet', 'wallet-overview'],
  ['Everything', '#/wallet/everything', 'wallet-everything'],
  ['Wallet', '#/wallet/wallet', 'wallet-wallet'],
  ['Wealth', '#/wallet/wealth', 'wallet-wealth'],
  ['Visa', '#/wallet/visa', 'wallet-visa'],
  ['Flow', '#/wallet/flow', 'wallet-flow'],
  ['Global', '#/wallet/global', 'wallet-global'],
  ['Security', '#/wallet/security', 'wallet-security'],
  ['Compliance', '#/wallet/compliance', 'wallet-compliance'],
  ['Compare', '#/wallet/compare', 'wallet-compare'],
  ['FAQ', '#/wallet/faq', 'wallet-faq'],
  ['Download', '#/wallet/download', 'wallet-download'],
]

export default function App() {
  const appRef = useRef(null)
  const [page, setPage] = useState(getPageFromHash)

  useSiteMotion(appRef, page)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isCentralGate = page === 'central-gate'
  const isWallet = page === 'wallet'
  const railLinks = isCentralGate ? centralGatePanelLinks : isWallet ? walletPanelLinks : panelLinks
  const initialPanel = isCentralGate ? 'cg-definition' : isWallet ? 'wallet-overview' : 'central-gate'

  return (
    <div className={`site-shell site-shell-${page}`} ref={appRef}>
      {page === 'home' && <OpeningSequence />}
      <Header page={page} />
      <FullPageRail
        links={railLinks}
        initialPanel={initialPanel}
      />
      {isCentralGate ? <CentralGate /> : isWallet ? <Wallet /> : <Home />}
    </div>
  )
}
