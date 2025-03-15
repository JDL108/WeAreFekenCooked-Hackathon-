"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalorieCalculatorPage() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintain",
  })

  const [results, setResults] = useState<{
    bmr: number
    maintenance: number
    target: number
    protein: number
    carbs: number
    fats: number
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault()

    // Parse input values
    const age = Number.parseInt(formData.age)
    const weight = Number.parseInt(formData.weight) // in kg
    const height = Number.parseInt(formData.height) // in cm

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Apply activity multiplier
    let activityMultiplier = 1.2 // sedentary
    switch (formData.activityLevel) {
      case "light":
        activityMultiplier = 1.375
        break
      case "moderate":
        activityMultiplier = 1.55
        break
      case "active":
        activityMultiplier = 1.725
        break
      case "very-active":
        activityMultiplier = 1.9
        break
    }

    const maintenance = Math.round(bmr * activityMultiplier)

    // Calculate target calories based on goal
    let target = maintenance
    switch (formData.goal) {
      case "lose":
        target = maintenance - 500 // 500 calorie deficit
        break
      case "gain":
        target = maintenance + 500 // 500 calorie surplus
        break
    }

    // Calculate macros (simple estimation)
    // Protein: 2g per kg of bodyweight
    const protein = Math.round(weight * 2)
    // Fats: 25% of total calories
    const fats = Math.round((target * 0.25) / 9) // 9 calories per gram of fat
    // Carbs: remaining calories
    const carbs = Math.round((target - protein * 4 - fats * 9) / 4) // 4 calories per gram of carbs

    setResults({
      bmr: Math.round(bmr),
      maintenance,
      target,
      protein,
      carbs,
      fats,
    })
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Calorie Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Calculate your daily calorie needs based on your goals and activity level.
          </p>
        </div>

        <Tabs defaultValue="calculator">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter your details to calculate your calorie needs.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateCalories} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Years"
                          value={formData.age}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          placeholder="kg"
                          value={formData.weight}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          placeholder="cm"
                          value={formData.height}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activity-level">Activity Level</Label>
                      <Select
                        value={formData.activityLevel}
                        onValueChange={(value) => handleSelectChange("activityLevel", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                          <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goal">Goal</Label>
                      <Select value={formData.goal} onValueChange={(value) => handleSelectChange("goal", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">Lose Weight</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="gain">Gain Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Calculate
                  </Button>
                </form>

                {results && (
                  <div className="mt-8 space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-semibold mb-4">Your Results</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Basal Metabolic Rate</p>
                          <p className="text-2xl font-bold">{results.bmr} calories</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Maintenance Calories</p>
                          <p className="text-2xl font-bold">{results.maintenance} calories</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">
                            {formData.goal === "lose"
                              ? "Calorie Target for Weight Loss"
                              : formData.goal === "gain"
                                ? "Calorie Target for Weight Gain"
                                : "Calorie Target for Maintenance"}
                          </p>
                          <p className="text-3xl font-bold text-primary">{results.target} calories</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-semibold mb-4">Recommended Macronutrients</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Protein</p>
                          <p className="text-xl font-bold">{results.protein}g</p>
                          <p className="text-xs text-muted-foreground">{results.protein * 4} calories</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Carbs</p>
                          <p className="text-xl font-bold">{results.carbs}g</p>
                          <p className="text-xs text-muted-foreground">{results.carbs * 4} calories</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fats</p>
                          <p className="text-xl font-bold">{results.fats}g</p>
                          <p className="text-xs text-muted-foreground">{results.fats * 9} calories</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Calorie Calculations</CardTitle>
                <CardDescription>Learn how we calculate your calorie needs and what the results mean.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">Basal Metabolic Rate (BMR)</h3>
                  <p className="text-muted-foreground">
                    BMR is the number of calories your body needs to maintain basic physiological functions while at
                    rest. We calculate this using the Mifflin-St Jeor Equation, which is considered one of the most
                    accurate formulas.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Total Daily Energy Expenditure (TDEE)</h3>
                  <p className="text-muted-foreground">
                    Your TDEE, or maintenance calories, is your BMR multiplied by an activity factor based on your
                    lifestyle and exercise habits.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Calorie Targets</h3>
                  <p className="text-muted-foreground">
                    For weight loss, we typically recommend a 500 calorie deficit, which should result in about 1 pound
                    of weight loss per week. For weight gain, we recommend a 500 calorie surplus, which should result in
                    about 1 pound of weight gain per week.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Macronutrients</h3>
                  <p className="text-muted-foreground">
                    Protein: We recommend 2g per kg of bodyweight to support muscle maintenance and growth.
                    <br />
                    Fats: About 25% of your total calories should come from healthy fats.
                    <br />
                    Carbs: The remaining calories come from carbohydrates to fuel your activities.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Important Note:</p>
                  <p>
                    These calculations provide estimates based on formulas and averages. Individual needs may vary based
                    on genetics, medical conditions, and other factors. Always consult with a healthcare professional
                    before making significant changes to your diet or exercise routine.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

