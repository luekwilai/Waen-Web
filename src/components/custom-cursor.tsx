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
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-lime-400/50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isPointer ? 64 : 40,
          height: isPointer ? 64 : 40,
          backgroundColor: isPointer ? "rgba(163, 230, 53, 0.1)" : "transparent"
        }}
        transition={{
          width: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
          height: { type: "spring", damping: 20, stiffness: 300, mass: 0.5 },
          backgroundColor: { duration: 0.2 }
        }}
      />
      
      {/* Inner dot (Direct follow) */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full bg-lime-400 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          opacity: isVisible && !isPointer ? 1 : 0
        }}
      />
    </>
  )
}
