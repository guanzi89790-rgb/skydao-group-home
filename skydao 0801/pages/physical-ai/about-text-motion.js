import './styles/about-text-motion.css'

export function playAboutTextMotion(root) {
  if (!root) return undefined
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('about-text-motion-ready')
    return undefined
  }
  const frame = window.requestAnimationFrame(() => root.classList.add('about-text-motion-ready'))
  return () => window.cancelAnimationFrame(frame)
}
