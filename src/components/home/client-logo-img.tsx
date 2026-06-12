"use client"

import React from "react"

export function ClientLogoImg({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      className="h-8 sm:h-10 w-auto max-w-[150px] object-contain"
      onError={(e) => {
        const item = e.currentTarget.closest("[data-logo-item]") as HTMLElement | null
        if (item) item.style.display = "none"
      }}
    />
  )
}
