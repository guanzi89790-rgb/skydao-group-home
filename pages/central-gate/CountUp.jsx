import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}) {
  const ref = useRef(null)
  const hasEnded = useRef(false)
  const lastText = useRef('')
  const motionValue = useMotionValue(direction === 'down' ? to : from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  const getDecimalPlaces = (num) => {
    const str = num.toString()

    if (str.includes('.')) {
      const decimals = str.split('.')[1]

      if (parseInt(decimals, 10) !== 0) {
        return decimals.length
      }
    }

    return 0
  }

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to))
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat('en-US', {
      useGrouping: !!separator,
      minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
      maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
    }),
    [maxDecimals, separator],
  )

  const formatValue = useCallback(
    (latest) => {
      const formattedNumber = numberFormatter.format(latest)

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber
    },
    [numberFormatter, separator],
  )

  useEffect(() => {
    if (ref.current) {
      const initialText = formatValue(direction === 'down' ? to : from)
      ref.current.textContent = initialText
      lastText.current = initialText
    }
  }, [from, to, direction, formatValue])

  useEffect(() => {
    if (isInView && startWhen) {
      hasEnded.current = false
      if (typeof onStart === 'function') onStart()

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to)
      }, delay * 1000)

      const durationTimeoutId = setTimeout(() => {
        hasEnded.current = true
        if (ref.current) {
          const finalText = formatValue(direction === 'down' ? from : to)
          if (finalText !== lastText.current) {
            ref.current.textContent = finalText
            lastText.current = finalText
          }
        }
        if (typeof onEnd === 'function') onEnd()
      }, delay * 1000 + duration * 1000)

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(durationTimeoutId)
      }
    }

    return undefined
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration, formatValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (hasEnded.current) return
      if (ref.current) {
        const nextText = formatValue(latest)
        if (nextText !== lastText.current) {
          ref.current.textContent = nextText
          lastText.current = nextText
        }
      }
    })

    return () => unsubscribe()
  }, [springValue, formatValue])

  return <span className={className} ref={ref} />
}
