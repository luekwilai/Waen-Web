"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"

type Direction = "up" | "left" | "right" | "scale"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  threshold?: number
}

const directionClass: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal",
}

const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)"
const mobileRevealMediaQuery = "(max-width: 767px), (hover: none) and (pointer: coarse)"

function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const mediaQuery = window.matchMedia(reducedMotionMediaQuery)
  mediaQuery.addEventListener("change", onChange)

  return () => {
    mediaQuery.removeEventListener("change", onChange)
  }
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return window.matchMedia(reducedMotionMediaQuery).matches
}

function subscribeToMobileReveal(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const mediaQuery = window.matchMedia(mobileRevealMediaQuery)
  mediaQuery.addEventListener("change", onChange)

  return () => {
    mediaQuery.removeEventListener("change", onChange)
  }
}

function getMobileRevealSnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return window.matchMedia(mobileRevealMediaQuery).matches
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  )
  const isMobileReveal = useSyncExternalStore(
    subscribeToMobileReveal,
    getMobileRevealSnapshot,
    () => false
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion) {
      el.classList.add("revealed")
      return
    }

    const effectiveDelay = isMobileReveal ? 0 : delay
    const effectiveThreshold = isMobileReveal ? Math.min(threshold, 0.01) : threshold
    const effectiveRootMargin = isMobileReveal ? "0px 0px 22% 0px" : "0px 0px 8% 0px"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutRef.current = window.setTimeout(() => {
            el.classList.add("revealed")
          }, effectiveDelay)
          observer.unobserve(el)
        }
      },
      {
        threshold: effectiveThreshold,
        rootMargin: effectiveRootMargin,
      }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay, isMobileReveal, prefersReducedMotion, threshold])

  return (
    <div ref={ref} className={`${directionClass[direction]} ${className}`}>
      {children}
    </div>
  )
}
