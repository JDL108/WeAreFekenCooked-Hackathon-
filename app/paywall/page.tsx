"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaywallPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/workouts" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Workouts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Premium Content</h1>
        <p className="text-muted-foreground">
          Unlock detailed workout instructions, personalized plans, and expert guidance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <PricingCard
          title="Monthly"
          price="$9.99"
          description="Perfect for short-term fitness goals"
          features={["Detailed workout instructions", "HD video tutorials", "Progress tracking", "Cancel anytime"]}
          isSelected={selectedPlan === "monthly"}
          onSelect={() => setSelectedPlan("monthly")}
        />

        <PricingCard
          title="Quarterly"
          price="$19.99"
          description="Our most popular plan"
          features={["Everything in Monthly", "Personalized workout plans", "Nutrition guides", "Priority support"]}
          isPopular={true}
          isSelected={selectedPlan === "quarterly"}
          onSelect={() => setSelectedPlan("quarterly")}
        />

        <PricingCard
          title="Annual"
          price="$49.99"
          description="Best value for serious athletes"
          features={["Everything in Quarterly", "1-on-1 coaching session", "Advanced analytics", "Exclusive content"]}
          isSelected={selectedPlan === "annual"}
          onSelect={() => setSelectedPlan("annual")}
        />
      </div>
    </div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  isSelected?: boolean
  onSelect: () => void
}

function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  isSelected = false,
  onSelect,
}: PricingCardProps) {
  return (
    <Card
      className={`relative overflow-hidden ${isPopular ? "border-primary shadow-lg" : ""} ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {title !== "Annual" && <span className="text-muted-foreground"> /period</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check size={16} className="text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isSelected ? "default" : "outline"} onClick={onSelect}>
          {isSelected ? "Selected" : "Choose Plan"}
        </Button>
      </CardFooter>
    </Card>
  )
}

