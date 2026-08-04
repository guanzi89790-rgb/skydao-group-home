import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

gsap.registerPlugin(ScrollTrigger)

export function createAboutMotion(root) {
  if (!root) return () => {}

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobileLayout = window.matchMedia('(max-width: 900px)').matches
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: !reducedMotion,
    wheelMultiplier: 0.9,
  })
  root.__cinematicLenis = lenis
  const updateScroll = () => ScrollTrigger.update()
  const tick = (time) => lenis.raf(time * 1000)

  lenis.on('scroll', updateScroll)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const context = gsap.context(() => {
    const navigation = document.querySelector('.page-navigation')
    gsap.set('.cinematic-opening-line', { scaleX: 0 })
    gsap.set('.cinematic-hero .cinematic-media-shade', { autoAlpha: 1 })
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(navigation, { yPercent: -100, autoAlpha: 0, duration: 1 })
      .from('.cinematic-hero-media', {
        scale: 1.06,
        autoAlpha: .78,
        duration: 1.25,
      }, '-=.55')
      .from('.cinematic-hero .cinematic-chapter-mark', { y: 24, autoAlpha: 0, duration: .7 }, '-=.5')
      .from('.cinematic-hero-copy h1', { yPercent: 110, autoAlpha: 0, duration: 1.1 }, '-=.55')
      .from('.cinematic-hero-copy h2, .cinematic-hero-copy p, .cinematic-hero-copy .cinematic-link, .cinematic-scroll-cue', {
        y: 24,
        autoAlpha: 0,
        stagger: .1,
        duration: .8,
      }, '-=.65')
      .to('.cinematic-opening-line', { scaleX: 1, duration: 1.3 }, '<')

    if (!reducedMotion) {
      gsap.to('.hero-scene-aerial', {
        scale: 1.14,
        ease: 'none',
        scrollTrigger: { trigger: '.cinematic-hero', start: 'top top', end: 'bottom bottom', scrub: 1.1 },
      })

      const setupGallery = (selector) => {
        if (mobileLayout) return
        const gallery = root.querySelector(selector)
        const stage = gallery?.querySelector('.cinematic-gallery-stage')
        const track = gallery?.querySelector('.cinematic-gallery-track')
        if (!gallery || !stage || !track) return

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: stage,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.fromTo(gallery.querySelector('.cinematic-gallery-progress i'), { scaleX: 0 }, {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
          },
        })

    const matchesAboutEcosystem = selector === '.cinematic-ai' || selector === '.cinematic-art'

        gsap.utils.toArray('.cinematic-gallery-panel', track).forEach((panel) => {
          if (matchesAboutEcosystem) {
            gsap.set(panel.querySelector('img'), {
              clearProps: 'clipPath,xPercent,scale',
            })
            return
          }

          gsap.fromTo(panel.querySelector('img'), {
            clipPath: 'inset(100% 0 0 0)',
            scale: 1.15,
            xPercent: 4,
          }, {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            xPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'right left',
              scrub: 1,
            },
          })
          gsap.from(panel.querySelectorAll('.cinematic-gallery-meta, .cinematic-gallery-copy'), {
            y: 44,
            autoAlpha: 0,
            stagger: .08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left 78%',
              once: true,
            },
          })
        })
      }

      setupGallery('.cinematic-ai')
      setupGallery('.cinematic-art')

      gsap.timeline({
        scrollTrigger: {
          trigger: '.cinematic-wallet',
          start: 'top top',
          end: 'bottom bottom',
          scrub: .8,
        },
      })
        .fromTo('.wallet-device-main', { yPercent: 24, rotate: -8, scale: .78 }, { yPercent: -4, rotate: 0, scale: 1 }, 0)
        .fromTo('.wallet-orbit', { scale: .45, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }, .12)

      gsap.set('.aies-media img', { clearProps: 'clipPath' })
      gsap.fromTo('.aies-media img', { scale: 1.08 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.cinematic-aies', start: 'top 72%', end: 'center center', scrub: .8 },
      })

      gsap.from('.aies-story-copy > *', {
        y: 70,
        autoAlpha: 0,
        stagger: .12,
        ease: 'none',
        scrollTrigger: { trigger: '.cinematic-aies', start: 'top 55%', end: 'center center', scrub: .6 },
      })

      gsap.to('.group-image-primary', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: '.cinematic-group', start: 'top top', end: 'bottom bottom', scrub: 1 },
      })

      gsap.utils.toArray('.cinematic-gallery-intro, .wallet-story-copy, .group-story-copy, .group-details').forEach((copyBlock) => {
        gsap.from(copyBlock.children, {
          y: 44,
          autoAlpha: 0,
          stagger: .1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: copyBlock, start: 'top 78%', once: true },
        })
      })
    }
  }, root)

  ScrollTrigger.refresh()

  let gestureLocked = false
  let snapAnimationComplete = true
  let wheelIdle = true
  let wheelIdleTimer = 0
  let gestureFallbackTimer = 0

  const unlockGesture = () => {
    if (snapAnimationComplete && wheelIdle) gestureLocked = false
  }

  const snap = new Snap(lenis, {
    type: 'lock',
    duration: .72,
    debounce: 160,
    onSnapComplete: () => {
      snapAnimationComplete = true
      unlockGesture()
    },
  })
  snap.stop()
  root.__cinematicSnap = snap

  const snapPoints = new Set()
  const addSnapPoint = (value) => {
    const point = Math.max(0, Math.round(value))
    if (snapPoints.has(point)) return
    snapPoints.add(point)
    snap.add(point)
  }
  const elementTop = (element) => element.getBoundingClientRect().top + window.scrollY

  const addGallerySnaps = (selector) => {
    const gallery = root.querySelector(selector)
    const stage = gallery?.querySelector('.cinematic-gallery-stage')
    const track = gallery?.querySelector('.cinematic-gallery-track')
    if (!gallery || !stage || !track) return

    const panelCount = track.children.length
    const start = elementTop(gallery)
    const travel = mobileLayout
      ? Math.max(0, gallery.offsetHeight - window.innerHeight)
      : Math.max(0, track.scrollWidth - window.innerWidth)

    for (let index = 0; index < panelCount; index += 1) {
      const progress = panelCount > 1 ? index / (panelCount - 1) : 0
      addSnapPoint(start + travel * progress)
    }
  }

  const addSectionSnaps = (selector, includeEnd = true) => {
    const section = root.querySelector(selector)
    if (!section) return
    const start = elementTop(section)
    addSnapPoint(start)
    if (includeEnd) {
      const end = start + Math.max(0, section.offsetHeight - window.innerHeight)
      if (end - start > 4) addSnapPoint(end)
    }
  }

  addSectionSnaps('.cinematic-hero')
  addGallerySnaps('.cinematic-ai')
  addSectionSnaps('.cinematic-wallet')
  addGallerySnaps('.cinematic-art')
  addSectionSnaps('.cinematic-aies', false)
  addSectionSnaps('.cinematic-group')

  const orderedSnapPoints = Array.from(snapPoints).sort((a, b) => a - b)
  const closestSnapIndex = () => orderedSnapPoints.reduce((closestIndex, point, index) => (
    Math.abs(point - lenis.scroll) < Math.abs(orderedSnapPoints[closestIndex] - lenis.scroll)
      ? index
      : closestIndex
  ), 0)
  const moveOneScreen = (direction) => {
    if (gestureLocked || orderedSnapPoints.length < 2) return
    gestureLocked = true
    snapAnimationComplete = false
    const targetIndex = Math.max(
      0,
      Math.min(orderedSnapPoints.length - 1, closestSnapIndex() + direction),
    )
    snap.goTo(targetIndex)
    window.clearTimeout(gestureFallbackTimer)
    gestureFallbackTimer = window.setTimeout(() => {
      snapAnimationComplete = true
      wheelIdle = true
      unlockGesture()
    }, 1200)
  }

  const onWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || event.ctrlKey) return
    event.preventDefault()
    wheelIdle = false
    window.clearTimeout(wheelIdleTimer)
    wheelIdleTimer = window.setTimeout(() => {
      wheelIdle = true
      unlockGesture()
    }, 180)
    moveOneScreen(event.deltaY > 0 ? 1 : -1)
  }

  let touchStartX = 0
  let touchStartY = 0
  let touchCurrentY = 0
  let verticalTouch = false
  const onTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartX = touch.clientX
    touchStartY = touch.clientY
    touchCurrentY = touch.clientY
    verticalTouch = false
  }
  const onTouchMove = (event) => {
    const touch = event.touches[0]
    const deltaX = touch.clientX - touchStartX
    const deltaY = touch.clientY - touchStartY
    touchCurrentY = touch.clientY
    verticalTouch = Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8
    if (verticalTouch) event.preventDefault()
  }
  const onTouchEnd = () => {
    const deltaY = touchStartY - touchCurrentY
    if (verticalTouch && Math.abs(deltaY) > 30) {
      wheelIdle = true
      moveOneScreen(deltaY > 0 ? 1 : -1)
    }
    verticalTouch = false
  }

  root.addEventListener('wheel', onWheel, { passive: false })
  root.addEventListener('touchstart', onTouchStart, { passive: true })
  root.addEventListener('touchmove', onTouchMove, { passive: false })
  root.addEventListener('touchend', onTouchEnd, { passive: true })
  root.classList.add('is-snap-ready')
  root.dataset.snapPointCount = String(snapPoints.size)

  return () => {
    root.removeEventListener('wheel', onWheel)
    root.removeEventListener('touchstart', onTouchStart)
    root.removeEventListener('touchmove', onTouchMove)
    root.removeEventListener('touchend', onTouchEnd)
    window.clearTimeout(wheelIdleTimer)
    window.clearTimeout(gestureFallbackTimer)
    root.classList.remove('is-snap-ready')
    delete root.dataset.snapPointCount
    if (root.__cinematicSnap === snap) delete root.__cinematicSnap
    snap.destroy()
    if (root.__cinematicLenis === lenis) delete root.__cinematicLenis
    context.revert()
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    lenis.off('scroll', updateScroll)
    lenis.destroy()
  }
}
