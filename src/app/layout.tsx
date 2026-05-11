import type { Metadata } from "next";
import { Noto_Sans_Thai, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { getSiteSettings } from "@/lib/queries";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const logoUrl = settings["site.logoUrl"] || "/waenweb-logo-r1.svg"
  const siteName = settings["site.name"] || "WAENWEB"
  return {
    title: {
      default: `${siteName} | รับทำเว็บไซต์ WordPress มืออาชีพ`,
      template: `%s | ${siteName}`,
    },
    description: "รับทำเว็บไซต์และ WordPress สำหรับธุรกิจ บริษัท ร้านค้าออนไลน์ ออกแบบสวย รองรับมือถือ SEO ติดหน้าแรก",
    metadataBase: new URL("https://waenweb.com"),
    icons: {
      icon: [{ url: logoUrl }],
      shortcut: logoUrl,
      apple: logoUrl,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${notoSansThai.variable} ${geistMono.variable} antialiased font-sans text-slate-900 dark:text-slate-300 transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
