import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'
import './CircularGallery.css'

const lerp = (start, end, ease) => start + (end - start) * ease

function createTextTexture(gl, text, font, color) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  const fontSize = Number(font.match(/(\d+)px/)?.[1] || 24)
  canvas.width = Math.ceil(metrics.width) + 48
  canvas.height = Math.ceil(fontSize * 1.6) + 20
  context.font = font
  context.fillStyle = color
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class GalleryTitle {
  constructor({ gl, parent, text, textColor, font }) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor)
    const geometry = new Plane(gl)
    const program = new Program(gl, {
      transparent: true,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
    })

    this.mesh = new Mesh(gl, { geometry, program })
    const titleHeight = parent.scale.y * 0.14
    this.mesh.scale.set(titleHeight * (width / height), titleHeight, 1)
    this.mesh.position.y = -parent.scale.y * 0.62
    this.mesh.setParent(parent)
  }
}

class GalleryMedia {
  constructor({ geometry, gl, image, index, length, scene, screen, viewport, text, bend, textColor, borderRadius, font }) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.scene = scene
    this.screen = screen
    this.viewport = viewport
    this.text = text
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.extra = 0
    this.createShader()
    this.createMesh()
    this.onResize()
    this.title = new GalleryTitle({ gl, parent: this.plane, text, textColor, font })
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) + cos(p.y * 2.0 + uTime)) * (0.04 + abs(uSpeed) * 0.35);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: this.borderRadius },
      },
    })

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = this.image
    image.onload = () => {
      texture.image = image
      this.program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport
    const scale = this.screen.height / 900
    this.plane.scale.y = (this.viewport.height * (500 * scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (390 * scale)) / this.screen.width
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 1.6
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const halfViewport = this.viewport.width / 2
    const bend = Math.abs(this.bend)

    if (bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const radius = (halfViewport ** 2 + bend ** 2) / (2 * bend)
      const effectiveX = Math.min(Math.abs(x), halfViewport)
      const arc = radius - Math.sqrt(radius ** 2 - effectiveX ** 2)
      this.plane.position.y = this.bend > 0 ? -arc : arc
      this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / radius)
    }

    const speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.035
    this.program.uniforms.uSpeed.value = speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    const before = this.plane.position.x + planeOffset < -viewportOffset
    const after = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && before) this.extra -= this.widthTotal
    if (direction === 'left' && after) this.extra += this.widthTotal
  }
}

class GalleryApp {
  constructor(container, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase }) {
    this.container = container
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 }
    this.createRenderer()
    this.createCamera()
    this.scene = new Transform()
    this.onResize()
    this.geometry = new Plane(this.gl, { heightSegments: 40, widthSegments: 80 })
    this.createMedias(items, bend, textColor, borderRadius, font)
    const initialOffset = this.medias?.[1]?.width || 0
    this.scroll.current = initialOffset
    this.scroll.target = initialOffset
    this.scroll.last = initialOffset
    this.bindEvents()
    this.update()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createMedias(items, bend, textColor, borderRadius, font) {
    const repeated = [...items, ...items]
    this.medias = repeated.map((item, index) => new GalleryMedia({
      geometry: this.geometry,
      gl: this.gl,
      image: item.image,
      index,
      length: repeated.length,
      scene: this.scene,
      screen: this.screen,
      viewport: this.viewport,
      text: item.text,
      bend,
      textColor,
      borderRadius,
      font,
    }))
  }

  onResize = () => {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    this.viewport = { width: height * this.camera.aspect, height }
    this.medias?.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }))
  }

  onPointerDown = (event) => {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientX : event.clientX
  }

  onPointerMove = (event) => {
    if (!this.isDown) return
    const x = event.touches ? event.touches[0].clientX : event.clientX
    this.scroll.target = this.scroll.position + (this.start - x) * this.scrollSpeed * 0.025
  }

  onPointerUp = () => {
    this.isDown = false
    this.snap()
  }

  onWheel = (event) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return
    this.scroll.target += Math.sign(event.deltaX) * this.scrollSpeed * 0.2
    this.snapTimer = window.setTimeout(() => this.snap(), 120)
  }

  onKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    this.scroll.target += event.key === 'ArrowRight' ? this.scrollSpeed * 4 : -this.scrollSpeed * 4
    this.snap()
  }

  snap = () => {
    const width = this.medias?.[0]?.width
    if (!width) return
    this.scroll.target = Math.round(this.scroll.target / width) * width
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize)
    this.container.addEventListener('mousedown', this.onPointerDown)
    this.container.addEventListener('mousemove', this.onPointerMove)
    this.container.addEventListener('mouseup', this.onPointerUp)
    this.container.addEventListener('mouseleave', this.onPointerUp)
    this.container.addEventListener('touchstart', this.onPointerDown, { passive: true })
    this.container.addEventListener('touchmove', this.onPointerMove, { passive: true })
    this.container.addEventListener('touchend', this.onPointerUp)
    this.container.addEventListener('wheel', this.onWheel, { passive: true })
    this.container.addEventListener('keydown', this.onKeyDown)
  }

  update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    this.medias?.forEach((media) => media.update(this.scroll, direction))
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.clearTimeout(this.snapTimer)
    window.removeEventListener('resize', this.onResize)
    this.container.removeEventListener('mousedown', this.onPointerDown)
    this.container.removeEventListener('mousemove', this.onPointerMove)
    this.container.removeEventListener('mouseup', this.onPointerUp)
    this.container.removeEventListener('mouseleave', this.onPointerUp)
    this.container.removeEventListener('touchstart', this.onPointerDown)
    this.container.removeEventListener('touchmove', this.onPointerMove)
    this.container.removeEventListener('touchend', this.onPointerUp)
    this.container.removeEventListener('wheel', this.onWheel)
    this.container.removeEventListener('keydown', this.onKeyDown)
    this.gl.canvas.remove()
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = '500 24px "Noto Sans SC"',
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !items?.length) return undefined
    const app = new GalleryApp(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase })
    return () => app.destroy()
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase])

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="主打产品环形画廊，可拖动或使用左右方向键浏览"
    />
  )
}
