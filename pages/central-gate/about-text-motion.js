import './styles/about-text-motion.css'

export function playAboutTextMotion(root) {
  if (!root) return undefined
  const shell = root.closest('.site-shell-central-gate')
  shell?.classList.add('about-page-entry')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('about-text-motion-ready')
    shell?.classList.add('about-page-entry-ready')
    return () => {
      root.classList.remove('about-text-motion-ready')
      shell?.classList.remove('about-page-entry', 'about-page-entry-ready')
    }
  }
  const frame = window.requestAnimationFrame(() => {
    root.classList.add('about-text-motion-ready')
    shell?.classList.add('about-page-entry-ready')
  })
  return () => {
    window.cancelAnimationFrame(frame)
    root.classList.remove('about-text-motion-ready')
    shell?.classList.remove('about-page-entry', 'about-page-entry-ready')
  }
}
