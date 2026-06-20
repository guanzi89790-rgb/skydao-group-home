import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useSiteMotion(scope) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    window.scrollTo(0, 0)

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.opening-sequence', { display: 'none' })
        gsap.set('.hero-title-inner, .hero-intro-item, .site-header', { clearProps: 'all' })
        return
      }

      document.body.style.overflow = 'hidden'
      gsap.ticker.lagSmoothing(500, 33)

      gsap.set('.site-header', { yPercent: -120, autoAlpha: 0 })
      gsap.set('.hero-title-inner', { yPercent: 118, scaleX: 0.68, transformOrigin: 'left center' })
      gsap.set('.hero-intro-item', { y: 34, autoAlpha: 0 })
      gsap.set('.opening-brand-inner', { yPercent: 115 })
      gsap.set('.opening-progress-bar', { scaleX: 0, transformOrigin: 'left center' })

      const opening = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          document.body.style.overflow = previousOverflow
          ScrollTrigger.refresh()
        },
      })

      opening
        .to('.opening-brand-inner', { yPercent: 0, duration: 1.05, ease: 'expo.out' }, 0.18)
        .to('.opening-progress-bar', { scaleX: 1, duration: 1.35, ease: 'power3.inOut' }, 0.35)
        .to('.opening-brand-inner', { yPercent: -120, duration: 0.72, ease: 'power3.in' }, 1.42)
        .to('.opening-curtain-top', { yPercent: -102, duration: 1.22, ease: 'expo.inOut' }, 1.72)
        .to('.opening-curtain-bottom', { yPercent: 102, duration: 1.22, ease: 'expo.inOut' }, 1.72)
        .to('.opening-sequence', { autoAlpha: 0, duration: 0.25, pointerEvents: 'none' }, 2.72)
        .to('.site-header', { yPercent: 0, autoAlpha: 1, duration: 1.05, ease: 'expo.out' }, 2.3)
        .to('.hero-title-inner', { yPercent: 0, scaleX: 1, duration: 1.6, ease: 'expo.out' }, 2.18)
        .to('.hero-intro-item', { y: 0, autoAlpha: 1, duration: 1.05, stagger: 0.12, ease: 'power3.out' }, 2.58)

      gsap.fromTo(
        '.hero-media',
        { scale: 1.03, yPercent: 0 },
        {
          scale: 1.13,
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        },
      )

      gsap.utils.toArray('.feature-section').forEach((section) => {
        const title = section.querySelector('h2')
        const eyebrow = section.querySelector('.eyebrow')
        const supporting = section.querySelectorAll('h3, .feature-copy, .gallery-hint')
        const cta = section.querySelector('.button')
        const stage = section.querySelector('.physical-ai-gallery, .wallet-card-stage, .art-card-stage')
        const cardItems = section.querySelectorAll('.wallet-card, .art-slide')
        const centered = !section.classList.contains('feature-left')

        gsap.set(section, { '--motion-scale': 1.12, '--motion-y': '-3%' })
        gsap.to(section, {
          '--motion-scale': 1.025,
          '--motion-y': '3%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
        })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            once: true,
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
            { clipPath: 'inset(0 100% 0 0)', y: 46 },
            { clipPath: 'inset(0 0% 0 0)', y: 0, duration: 1.45, ease: 'expo.inOut', clearProps: 'clipPath,transform' },
            0.7,
          )
        }

        if (cardItems.length) {
          timeline.fromTo(
            cardItems,
            { clipPath: 'inset(0 100% 0 0)', autoAlpha: 0 },
            {
              clipPath: 'inset(0 0% 0 0)',
              autoAlpha: 1,
              duration: 1.1,
              stagger: 0.16,
              ease: 'power3.inOut',
              clearProps: 'clipPath,opacity,visibility',
            },
            0.82,
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
          scrollTrigger: { trigger: '.footer', start: 'top 82%', once: true },
        },
      )
    }, root)

    return () => {
      document.body.style.overflow = previousOverflow
      context.revert()
    }
  }, [scope])
}
