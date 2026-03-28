import { useEffect, useState } from 'react'

export default function useCarousel(length, interval = 5000) {
  const [index, setIndex] = useState(0)
  const [pause, setPause] = useState(false)
  useEffect(() => {
    if (pause || length <= 1) return
    const id = setInterval(() => setIndex(i => (i + 1) % length), interval)
    return () => clearInterval(id)
  }, [pause, length, interval])
  const prev = () => setIndex(i => (i - 1 + length) % length)
  const next = () => setIndex(i => (i + 1) % length)
  const go = i => setIndex(i)
  return { index, setIndex, prev, next, go, pause, setPause }
}
