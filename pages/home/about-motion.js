import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function createAboutMotion(root) {
  if (!root) return () => {}

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: !reducedMotion,
    wheelMultiplier: 0.9,
  })
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

      gsap.fromTo('.aies-media img', { clipPath: 'inset(18% 12% 18% 12%)', scale: 1.17 }, {
        clipPath: 'inset(0% 0 0 0)',
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

  return () => {
    context.revert()
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    lenis.off('scroll', updateScroll)
    lenis.destroy()
  }
}
