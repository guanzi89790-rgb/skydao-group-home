import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import About from './App.jsx'

const destinations = {
  '#/': '/', '#/central-gate': '/central-gate/', '#/physical-ai': '/physical-ai/',
  '#/wallet': '/wallet/', '#art': '/#art', '#aies': '/#aies', '/about/': '/about/',
}

const navigate = (target) => { window.location.href = destinations[target] || target }

createRoot(document.getElementById('root')).render(<StrictMode><About onNavigate={navigate} /></StrictMode>)
