"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"

const spotlightMediaQuery = "(hover: hover) and (pointer: fine)"

function subscribeToSpotlightCapability(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const mediaQuery = window.matchMedia(spotlightMediaQuery)
  mediaQuery.addEventListener("change", onChange)

  return () => {
    mediaQuery.removeEventListener("change", onChange)
  }
}

function getSpotlightCapabilitySnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return window.matchMedia(spotlightMediaQuery).matches
}

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const isFocusedRef = useRef(false)
  const pendingPositionRef = useRef({ x: 0, y: 0 })
  const isSpotlightEnabled = useSyncExternalStore(
    subscribeToSpotlightCapability,
    getSpotlightCapabilitySnapshot,
    () => false
  )

  const setOverlayOpacity = useCallback((value: number) => {
    overlayRef.current?.style.setProperty("--spotlight-opacity", String(value))
  }, [])

  const flushPendingPosition = useCallback(() => {
    frameRef.current = null
    const overlay = overlayRef.current
    if (!overlay) {
      return
    }

    overlay.style.setProperty("--spotlight-x", `${pendingPositionRef.current.x}px`)
    overlay.style.setProperty("--spotlight-y", `${pendingPositionRef.current.y}px`)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocusedRef.current || !isSpotlightEnabled) {
      return
    }

    const rect = divRef.current.getBoundingClientRect()
    pendingPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(flushPendingPosition)
    }
  }, [flushPendingPosition, isSpotlightEnabled])

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true
    setOverlayOpacity(1)
  }, [setOverlayOpacity])

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false
    setOverlayOpacity(0)
  }, [setOverlayOpacity])

  const handlePointerEnter = useCallback(() => {
    if (!isSpotlightEnabled) {
      return
    }

    setOverlayOpacity(1)
  }, [isSpotlightEnabled, setOverlayOpacity])

  const handlePointerLeave = useCallback(() => {
    if (isFocusedRef.current) {
      return
    }

    setOverlayOpacity(0)
  }, [setOverlayOpacity])

  useEffect(() => {
    if (!isSpotlightEnabled && !isFocusedRef.current) {
      setOverlayOpacity(0)
    }
  }, [isSpotlightEnabled, setOverlayOpacity])

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-all duration-300 ${className}`}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-inherit overflow-hidden"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: "radial-gradient(600px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(163,230,53,0.1), transparent 40%)",
          borderRadius: "inherit",
        }}
      />
      {children}
    </div>
  )
}
