import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "WAENWEB - รับทำเว็บไซต์ WordPress มืออาชีพ"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020817 0%, #0f1a0a 50%, #020817 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Green glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(163,230,53,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(163,230,53,0.1)",
            border: "1px solid rgba(163,230,53,0.3)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a3e635" }} />
          <span style={{ color: "#a3e635", fontSize: "18px", fontWeight: 700, letterSpacing: "0.1em" }}>
            รับทำเว็บไซต์ด้วย WORDPRESS
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <span style={{ fontSize: "96px", fontWeight: 900, color: "white", letterSpacing: "-2px" }}>
            WAEN
          </span>
          <span style={{ fontSize: "96px", fontWeight: 900, color: "#a3e635", letterSpacing: "-2px" }}>
            WEB
          </span>
        </div>

        {/* Sub */}
        <p style={{ fontSize: "28px", color: "#94a3b8", fontWeight: 400, margin: 0 }}>
          รับทำเว็บไซต์มืออาชีพ • SEO • ดูแลหลังส่งมอบ
        </p>

        {/* URL */}
        <p style={{ fontSize: "20px", color: "#475569", marginTop: "32px" }}>
          waenweb.com
        </p>
      </div>
    ),
    { ...size }
  )
}
