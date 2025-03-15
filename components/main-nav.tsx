import type React from "react"
import Link from "next/link"
import { Dumbbell } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 font-medium transition-colors hover:text-primary">
        <Dumbbell className="h-6 w-6" />
        <span className="font-bold">FitTrack</span>
      </Link>
      <Link href="/workouts" className="text-sm font-medium transition-colors hover:text-primary">
        Workouts
      </Link>
      <Link href="/calorie-calculator" className="text-sm font-medium transition-colors hover:text-primary">
        Calorie Calculator
      </Link>
      <Link href="/tracker" className="text-sm font-medium transition-colors hover:text-primary">
        Trackers
      </Link>
      <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
        Blog
      </Link>
      <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
        Contact
      </Link>
    </nav>
  )
}

