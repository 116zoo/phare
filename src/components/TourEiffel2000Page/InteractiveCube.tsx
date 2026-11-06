'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './TourEiffel2000Page.module.css'

type CubeImage = {
  src: string
  alt: string
  className: string
}

type Props = {
  images: CubeImage[]
}

export function InteractiveCube({ images }: Props) {
  const [rotation, setRotation] = useState({ x: -6, y: 16 })
  const [speed, setSpeed] = useState(0.14)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ x: 0, y: 0, rotationX: -6, rotationY: 16 })

  useEffect(() => {
    let frame = 0
    let previous = performance.now()

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50)
      previous = now

      if (!dragging) {
        setRotation((current) => ({
          x: current.x + speed * elapsed * 0.28,
          y: current.y + speed * elapsed,
        }))
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [dragging, speed])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotationX: rotation.x,
      rotationY: rotation.y,
    }
    setDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return

    setRotation({
      x: dragRef.current.rotationX - (event.clientY - dragRef.current.y) * 0.45,
      y: dragRef.current.rotationY + (event.clientX - dragRef.current.x) * 0.45,
    })
  }

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setDragging(false)
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    setSpeed((current) => Math.max(-0.8, Math.min(0.8, current + (event.deltaY > 0 ? -0.06 : 0.06))))
  }

  return (
    <>
      <div
        aria-label="Cube photographique interactif Tour Eiffel"
        className={styles.cubeStage}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onWheel={handleWheel}
        role="application"
      >
        <div
          className={`${styles.cube} ${dragging ? styles.cubeDragging : ''}`}
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {images.map((image, index) => (
            <figure className={`${styles.cubeFace} ${image.className}`} key={`${image.src}-${index}`}>
              <Image
                alt={image.alt}
                className={styles.image}
                fill
                priority={index < 2}
                sizes="(max-width: 700px) 78vw, 30rem"
                src={image.src}
              />
              <figcaption>Tour Eiffel / {String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className={styles.cubeNote}>
        Glisser pour orienter · molette pour accélérer
        <span aria-hidden="true"> · {Math.abs(speed).toFixed(1)}×</span>
      </p>
    </>
  )
}
