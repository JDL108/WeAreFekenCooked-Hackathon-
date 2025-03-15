"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

interface FoodNutrition {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export async function analyzeFood(
  description: string
): Promise<FoodNutrition | null> {
  try {
    const prompt = `Can you repeat in that exact order the title for the meal all together and amount of calories, Protein, Carbohydrates, and Fats in ${description}? Do not give me any other text, just the title and these values. Eg. 1 Cup of Rice and 1 Glass of Milk and 7 Carrots, 300, 40, 12, 12. Do not provide the units of measurment and separate the names in the title with "and" and separate the other values from title using commas. DO NOT use commas in the title or in the numerical values, only use commas as separators. Give a general estimate if an exact value is not possible.`;
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(
      "AIzaSyA5c8E1Ubc_xXwqTwNYbf8_7ESDNmz2EzA"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(prompt);

    // Parse the response as JSON
    const text = response.response.text();
    console.log(prompt, text);
    // Parse the response
    const values = text.split(",").map((val: string) => val.trim());
    console.log(values);
    if (values.length == 5) {
      console.log("all good");
      return {
        title: values[0],
        calories: Number.parseInt(values[1]),
        protein: Number.parseInt(values[2]),
        carbs: Number.parseInt(values[3]),
        fat: Number.parseInt(values[4]),
      };
    } else {
      console.error("Failed to parse AI response:", text);
      return null;
    }
  } catch (error) {
    console.error("Error analyzing food:", error);
    return null;
  }
}

interface ActivityData {
  type: string;
  duration: number;
  distance?: number;
  calories: number;
}

export async function analyzeActivity(
  description: string
): Promise<ActivityData | null> {
  try {
    const prompt = `Can you analyze this physical activity description and return only the following values in this exact order: activity type, duration in minutes, distance in km (if applicable, otherwise 0), calories burned. Format your response as comma-separated values only, like this: "running, 30, 5, 300". The description is: "${description}"`;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "You are a fitness expert. Provide accurate estimates for activity data based on descriptions. Only respond with the values in the exact format requested.",
    });

    // Parse the response
    const values = text.split(",").map((val) => val.trim());

    if (values.length >= 4) {
      const activityType = values[0].toLowerCase();
      const duration = Number.parseInt(values[1]);
      const distance = Number.parseFloat(values[2]);
      const calories = Number.parseInt(values[3]);

      if (!isNaN(duration) && !isNaN(calories)) {
        return {
          type: activityType,
          duration: duration,
          distance: distance > 0 ? distance : undefined,
          calories: calories,
        };
      }
    }

    console.error("Failed to parse AI response:", text);
    return null;
  } catch (error) {
    console.error("Error analyzing activity:", error);
    return null;
  }
}
