"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FoodNutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export async function analyzeFood(description: string): Promise<FoodNutrition | null> {
  try {
    const prompt = `Can you repeat in that exact order the amount of calories, Protein, Carbohydrates, and Fats in ${description}? Do not give me any other text, just these values. Eg. 300, 40, 12, 12`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are a nutrition expert. Provide accurate nutritional information for foods. Only respond with the values in the exact format requested.",
    })

    // Parse the response
    const values = text.split(",").map((val) => Number.parseInt(val.trim()))

    if (values.length >= 4 && !values.some(isNaN)) {
      return {
        calories: values[0],
        protein: values[1],
        carbs: values[2],
        fat: values[3],
      }
    } else {
      console.error("Failed to parse AI response:", text)
      return null
    }
  } catch (error) {
    console.error("Error analyzing food:", error)
    return null
  }
}

interface ActivityData {
  type: string
  duration: number
  distance?: number
  calories: number
}

export async function analyzeActivity(description: string): Promise<ActivityData | null> {
  try {
    const prompt = `Can you analyze this physical activity description and return only the following values in this exact order: activity type, duration in minutes, distance in km (if applicable, otherwise 0), calories burned. Format your response as comma-separated values only, like this: "running, 30, 5, 300". The description is: "${description}"`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are a fitness expert. Provide accurate estimates for activity data based on descriptions. Only respond with the values in the exact format requested.",
    })

    // Parse the response
    const values = text.split(",").map((val) => val.trim())

    if (values.length >= 4) {
      const activityType = values[0].toLowerCase()
      const duration = Number.parseInt(values[1])
      const distance = Number.parseFloat(values[2])
      const calories = Number.parseInt(values[3])

      if (!isNaN(duration) && !isNaN(calories)) {
        return {
          type: activityType,
          duration: duration,
          distance: distance > 0 ? distance : undefined,
          calories: calories,
        }
      }
    }

    console.error("Failed to parse AI response:", text)
    return null
  } catch (error) {
    console.error("Error analyzing activity:", error)
    return null
  }
}

