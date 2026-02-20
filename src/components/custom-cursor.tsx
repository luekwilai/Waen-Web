"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Use motion values to track mouse position without triggering React re-renders
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const [mounted, setMounted] = useState(false)

  // Create spring physics for the trailing circle
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    // Hide default cursor
    document.body.style.cursor = "none"

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      // Update motion values directly
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Check if hovering a clickable element
      const target = e.target as HTMLElement
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null

      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [cursorX, cursorY, isVisible])

  // Prevent SSR hydration mismatch
  if (!mounted) return null

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
