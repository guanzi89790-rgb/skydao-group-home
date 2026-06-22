import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function useSiteMotion(scope) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const usesCustomScroll = !prefersReducedMotion
    const previousOverflow = document.body.style.overflow
    const panels = [...root.querySelectorAll('.fullpage-panel')]
    let fullPageEnabled = prefersReducedMotion
    let scrollLocked = false
    let transitionComplete = false
    let wheelAccumulator = 0
    let gestureReleaseTimer
    let wheelResetTimer
    let scrollTween
    let openingFallbackTimer
    let openingFinished = false
    window.scrollTo(0, 0)

    const closestPanelIndex = () => panels.reduce((closest, panel, index) => (
      Math.abs(panel.offsetTop - window.scrollY) < Math.abs(panels[closest].offsetTop - window.scrollY)
        ? index
        : closest
    ), 0)

    const scheduleGestureRelease = () => {
      window.clearTimeout(gestureReleaseTimer)
      gestureReleaseTimer = window.setTimeout(() => {
        if (!transitionComplete) return
        scrollLocked = false
        wheelAccumulator = 0
      }, 280)
    }

    const goToPanel = (index) => {
      const targetIndex = Math.max(0, Math.min(panels.length - 1, index))
      if (!panels[targetIndex]) return
      scrollLocked = true
      transitionComplete = false
      wheelAccumulator = 0
      scrollTween?.kill()
      scrollTween = gsap.to(window, {
        scrollTo: { y: panels[targetIndex], autoKill: false },
        duration: prefersReducedMotion ? 0.01 : 0.94,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          transitionComplete = true
          scheduleGestureRelease()
          ScrollTrigger.update()
        },
      })
    }

    const onWheel = (event) => {
      if (!fullPageEnabled || !usesCustomScroll || Math.abs(event.deltaY) < 2) return
      event.preventDefault()
      if (scrollLocked) {
        scheduleGestureRelease()
        return
      }

      wheelAccumulator += event.deltaY
      window.clearTimeout(wheelResetTimer)
      wheelResetTimer = window.setTimeout(() => { wheelAccumulator = 0 }, 140)
      if (Math.abs(wheelAccumulator) < 36) return

      const current = closestPanelIndex()
      const next = current + (wheelAccumulator > 0 ? 1 : -1)
      wheelAccumulator = 0
      if (next === current || next < 0 || next >= panels.length) return
      goToPanel(next)
    }

    const onAnchorClick = (event) => {
      if (!fullPageEnabled || !usesCustomScroll || !(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return
      const target = panels.find((panel) => `#${panel.id}` === anchor.getAttribute('href'))
      if (!target) return
      event.preventDefault()
      window.history.replaceState(null, '', `#${target.id}`)
      goToPanel(panels.indexOf(target))
    }

    const onKeyDown = (event) => {
      const isNext = ['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)
      const isPrevious = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)
      if ((!isNext && !isPrevious) || event.target.closest('button, a, input, textarea, select')) return
      event.preventDefault()
      if (!scrollLocked) goToPanel(closestPanelIndex() + (isNext ? 1 : -1))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    root.addEventListener('click', onAnchorClick)

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.opening-sequence', { display: 'none' })
        gsap.set('.hero-title-inner, .hero-intro-item, .site-header', { clearProps: 'all' })
        document.documentElement.classList.add('fullpage-ready')
        return
      }

      document.body.style.overflow = 'hidden'

      const finishOpening = () => {
        if (openingFinished) return
        openingFinished = true
        window.clearTimeout(openingFallbackTimer)
        document.body.style.overflow = previousOverflow
        fullPageEnabled = true
        document.documentElement.classList.add('fullpage-ready')
        document.documentElement.classList.add('fullpage-controlled')
        ScrollTrigger.refresh()
      }

      gsap.set('.site-header', { yPercent: -120, autoAlpha: 0 })
      gsap.set('.hero-title-inner', { yPercent: 118, scaleX: 0.68, transformOrigin: 'left center' })
      gsap.set('.hero-intro-item', { y: 34, autoAlpha: 0 })
      gsap.set('.opening-brand-inner', { yPercent: 120, autoAlpha: 0 })
      gsap.set('.opening-logo-inner', { yPercent: 115, scale: 0.72, autoAlpha: 0, transformOrigin: 'center center' })
      gsap.set('.opening-progress-bar', { scaleX: 0, transformOrigin: 'left center' })

      const opening = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: finishOpening,
      })

      opening
        .to('.opening-logo-inner', { yPercent: 0, scale: 1, autoAlpha: 1, duration: 1.08, ease: 'expo.out' }, 0.08)
        .to('.opening-brand-inner', { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out' }, 0.2)
        .to('.opening-progress-bar', { scaleX: 1, duration: 2.2, ease: 'power3.inOut' }, 0.35)
        .to('.opening-logo-inner', { yPercent: -120, scale: 0.94, autoAlpha: 0, duration: 0.76, ease: 'power3.in' }, 2.64)
        .to('.opening-brand-inner', { yPercent: -120, autoAlpha: 0, duration: 0.68, ease: 'power3.in' }, 2.68)
        .to('.opening-curtain-top', { yPercent: -102, duration: 1.22, ease: 'expo.inOut' }, 3.02)
        .to('.opening-curtain-bottom', { yPercent: 102, duration: 1.22, ease: 'expo.inOut' }, 3.02)
        .to('.opening-sequence', { autoAlpha: 0, duration: 0.25, pointerEvents: 'none' }, 4.02)
        .to('.site-header', { yPercent: 0, autoAlpha: 1, duration: 1.05, ease: 'expo.out' }, 3.6)
        .to('.hero-title-inner', { yPercent: 0, scaleX: 1, duration: 1.6, ease: 'expo.out' }, 3.48)
        .to('.hero-intro-item', { y: 0, autoAlpha: 1, duration: 1.05, stagger: 0.12, ease: 'power3.out' }, 3.88)

      openingFallbackTimer = window.setTimeout(() => {
        gsap.set('.opening-sequence', { autoAlpha: 0, pointerEvents: 'none' })
        gsap.set('.site-header, .hero-title-inner, .hero-intro-item', { clearProps: 'all' })
        finishOpening()
      }, 6000)

      const heroReturn = gsap.timeline({ paused: true })
        .fromTo(
          '.hero-title-inner',
          { yPercent: 82, scaleX: 0.76, transformOrigin: 'left center' },
          { yPercent: 0, scaleX: 1, duration: 1.15, ease: 'expo.out', immediateRender: false },
        )
        .fromTo(
          '.hero-intro-item',
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out', immediateRender: false },
          0.22,
        )

      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top 76%',
        end: 'bottom 24%',
        onEnterBack: () => heroReturn.restart(),
        onLeave: () => heroReturn.pause(0),
      })

      gsap.utils.toArray('.feature-section').forEach((section) => {
        const title = section.querySelector('h2')
        const eyebrow = section.querySelector('.eyebrow')
        const supporting = section.querySelectorAll('h3, .feature-copy, .gallery-hint')
        const cta = section.querySelector('.button')
        const stage = section.querySelector('.physical-product-grid, .wallet-card-stage, .art-card-stage')
        const cardItems = section.querySelectorAll('.physical-product-card, .wallet-card, .art-slide')
        const isPhysical = section.classList.contains('physical-ai-section')
        const centered = !section.classList.contains('feature-left')

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            end: 'bottom 24%',
            toggleActions: 'restart reset restart reset',
          },
        })

        timeline
          .fromTo(
            eyebrow,
            { y: 34, autoAlpha: 0, letterSpacing: '0.48em' },
            { y: 0, autoAlpha: 1, letterSpacing: '0.22em', duration: 1.05, ease: 'power3.out' },
          )
          .fromTo(
            title,
            {
              xPercent: centered ? -26 : -42,
              scaleX: 0.62,
              autoAlpha: 0,
              transformOrigin: centered ? 'center center' : 'left center',
            },
            { xPercent: 0, scaleX: 1, autoAlpha: 1, duration: 1.55, ease: 'expo.out' },
            0.08,
          )
          .fromTo(
            supporting,
            { y: 56, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.05, stagger: 0.12, ease: 'power3.out' },
            0.5,
          )

        if (stage) {
          timeline.fromTo(
            stage,
            { y: 38, scale: 0.975, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 1.05, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
            0.7,
          )
        }

        if (cardItems.length) {
          timeline.fromTo(
            cardItems,
            isPhysical ? { autoAlpha: 0, y: 64, scale: 0.92 } : { autoAlpha: 0 },
            {
              autoAlpha: 1,
              ...(isPhysical ? { y: 0, scale: 1 } : {}),
              duration: 0.82,
              stagger: 0.12,
              ease: 'power2.out',
              clearProps: isPhysical ? 'opacity,visibility,transform' : 'opacity,visibility',
            },
            0.76,
          )
        }

        if (cta) {
          timeline.fromTo(
            cta,
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' },
            1.12,
          )
        }
      })

      gsap.fromTo(
        '.footer-main > *',
        { y: 70, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer',
            start: 'top 82%',
            end: 'bottom 18%',
            toggleActions: 'restart reset restart reset',
          },
        },
      )
    }, root)

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('fullpage-ready')
      document.documentElement.classList.remove('fullpage-controlled')
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      root.removeEventListener('click', onAnchorClick)
      window.clearTimeout(gestureReleaseTimer)
      window.clearTimeout(wheelResetTimer)
      window.clearTimeout(openingFallbackTimer)
      scrollTween?.kill()
      context.revert()
    }
  }, [scope])
}
