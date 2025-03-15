import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FitTrack - Your Fitness Journey Starts Here",
  description:
    "Track your workouts, monitor your nutrition, and achieve your fitness goals with our comprehensive platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children} 
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}



import './globals.css'
import ConvexClientProvider from "@/FitTrack/components/ConvexClientProvider"
