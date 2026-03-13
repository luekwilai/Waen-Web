"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const cursorMediaQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine)"

function subscribeToCursorCapability(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const mediaQuery = window.matchMedia(cursorMediaQuery)
  mediaQuery.addEventListener("change", onChange)

  return () => {
    mediaQuery.removeEventListener("change", onChange)
  }
}

function getCursorCapabilitySnapshot() {
  if (typeof window === "undefined") {
    return false
  }

  return window.matchMedia(cursorMediaQuery).matches
}

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isDesktopCursorEnabled = useSyncExternalStore(
    subscribeToCursorCapability,
    getCursorCapabilitySnapshot,
    () => false
  )
  const isVisibleRef = useRef(false)
  const isPointerRef = useRef(false)

  // Use motion values to track mouse position without triggering React re-renders
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Create spring physics for the trailing circle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!isDesktopCursorEnabled) {
      document.body.style.cursor = "auto"
      return
    }

    document.body.style.cursor = "none"

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null

      if (isPointerRef.current !== isClickable) {
        isPointerRef.current = isClickable
        setIsPointer(isClickable)
      }
    }

    const handleMouseLeave = () => {
      if (!isVisibleRef.current) {
        return
      }

      isVisibleRef.current = false
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      if (isVisibleRef.current) {
        return
      }

      isVisibleRef.current = true
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [cursorX, cursorY, isDesktopCursorEnabled])

  if (!isDesktopCursorEnabled) return null

  return (
    <>
      {/* Outer trailing circle (Smooth Spring) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-lime-300/80 bg-lime-300/10 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isPointer ? 78 : 52,
          height: isPointer ? 78 : 52,
          scale: isPointer ? 1.08 : 1,
          borderColor: isPointer ? "rgba(190, 242, 100, 0.95)" : "rgba(190, 242, 100, 0.8)",
          backgroundColor: isPointer ? "rgba(190, 242, 100, 0.18)" : "rgba(190, 242, 100, 0.08)"
        }}
        transition={{
          width: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
          height: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
          scale: { type: "spring", damping: 18, stiffness: 260, mass: 0.4 },
          borderColor: { duration: 0.18 },
          backgroundColor: { duration: 0.18 }
        }}
      />
      
      {/* Inner dot (Direct follow) */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-lime-300 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 10 : 12,
          height: isPointer ? 10 : 12,
          opacity: isVisible ? 1 : 0
        }}
      />
    </>
  )
}
