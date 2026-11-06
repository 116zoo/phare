'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'

import styles from './TourEiffel2000Page.module.css'

type CubeImage = {
  src: string
  alt: string
  className: string
}

type Props = {
  images: CubeImage[]
  locale: Locale
}

export function InteractiveCube({ images, locale }: Props) {
  const isEnglish = locale === 'en'
  const [rotation, setRotation] = useState({ x: -6, y: 16 })
  const [dragging, setDragging] = useState(false)
  const rotationRef = useRef({ x: -6, y: 16 })
  const targetRef = useRef({ x: -6, y: 16 })
  const draggingRef = useRef(false)
  const dragRef = useRef({ x: 0, y: 0, rotationX: -6, rotationY: 16 })

  useEffect(() => {
    let frame = 0
    let previous = performance.now()

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50)
      previous = now

      if (!draggingRef.current) {
        targetRef.current.y += elapsed * 0.018
        targetRef.current.x += elapsed * 0.004
      }

      const current = rotationRef.current
      const target = targetRef.current
      const next = {
        x: current.x + (target.x - current.x) * 0.1,
        y: current.y + (target.y - current.y) * 0.1,
      }

      rotationRef.current = next
      setRotation(next)

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotationX: targetRef.current.x,
      rotationY: targetRef.current.y,
    }
    draggingRef.current = true
    setDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return

    targetRef.current = {
      x: dragRef.current.rotationX - (event.clientY - dragRef.current.y) * 0.32,
      y: dragRef.current.rotationY + (event.clientX - dragRef.current.x) * 0.32,
    }
  }

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    draggingRef.current = false
    setDragging(false)
  }

  return (
    <>
      <div
        aria-label={
          isEnglish
            ? 'Interactive Eiffel Tower photo cube'
            : 'Cube photographique interactif Tour Eiffel'
        }
        className={styles.cubeStage}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        role="application"
      >
        <div
          className={`${styles.cube} ${dragging ? styles.cubeDragging : ''}`}
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {images.map((image, index) => (
            <figure
              className={`${styles.cubeFace} ${image.className}`}
              key={`${image.src}-${index}`}
            >
              <Image
                alt={image.alt}
                className={styles.image}
                fill
                decoding="async"
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes="(max-width: 700px) 78vw, 30rem"
                src={image.src}
                unoptimized
              />
              <figcaption>
                {isEnglish ? 'Eiffel Tower' : 'Tour Eiffel'} / {String(index + 1).padStart(2, '0')}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className={styles.cubeNote}>
        {isEnglish
          ? 'Drag to rotate · gentle automatic motion'
          : 'Glisser pour orienter · rotation automatique douce'}
      </p>
    </>
  )
}
