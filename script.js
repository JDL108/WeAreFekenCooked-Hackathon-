// DOM Elements
const datePicker = document.getElementById("date-picker")
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")

// Food Tracker Elements
const addFoodButton = document.getElementById("add-food-button")
const addFoodForm = document.getElementById("add-food-form")
const cancelFoodButton = document.getElementById("cancel-food-button")
const saveFoodButton = document.getElementById("save-food-button")
const foodLogBody = document.getElementById("food-log-body")
const analyzeFoodButton = document.getElementById("analyze-food-button")
const foodInput = document.getElementById("food-input")

// Activity Tracker Elements
const addActivityButton = document.getElementById("add-activity-button")
const addActivityForm = document.getElementById("add-activity-form")
const cancelActivityButton = document.getElementById("cancel-activity-button")
const saveActivityButton = document.getElementById("save-activity-button")
const activityLogBody = document.getElementById("activity-log-body")
const analyzeActivityButton = document.getElementById("analyze-activity-button")
const activityInput = document.getElementById("activity-input")

// Summary Elements
const totalCaloriesElement = document.getElementById("total-calories")
const totalProteinElement = document.getElementById("total-protein")
const totalCarbsElement = document.getElementById("total-carbs")
const totalFatElement = document.getElementById("total-fat")
const caloriesProgressElement = document.getElementById("calories-progress")
const proteinProgressElement = document.getElementById("protein-progress")
const carbsProgressElement = document.getElementById("carbs-progress")
const fatProgressElement = document.getElementById("fat-progress")

const activityCountElement = document.getElementById("activity-count")
const totalDurationElement = document.getElementById("total-duration")
const caloriesBurnedElement = document.getElementById("calories-burned")

// Data
let meals = [
  {
    id: "1",
    name: "Oatmeal with Berries",
    calories: 350,
    protein: 10,
    carbs: 60,
    fat: 7,
    mealType: "breakfast",
  },
  {
    id: "2",
    name: "Chicken Salad",
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 25,
    mealType: "lunch",
  },
]

let activities = [
  {
    id: "1",
    type: "running",
    duration: 30,
    distance: 5,
    calories: 300,
    notes: "Morning run in the park",
  },
]

// Targets
const calorieTarget = 2000
const proteinTarget = 150
const carbsTarget = 200
const fatTarget = 65

// Tab Switching
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all tabs
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked tab
    button.classList.add("active")
    const tabId = button.getAttribute("data-tab")
    document.getElementById(`${tabId}-tab`).classList.add("active")
  })
})

// Date Picker
datePicker.addEventListener("change", (e) => {
  // In a real app, you would load data for the selected date
  console.log("Date changed:", e.target.value)
})

// Food Form Toggle
addFoodButton.addEventListener("click", () => {
  addFoodForm.classList.remove("hidden")
})

cancelFoodButton.addEventListener("click", () => {
  addFoodForm.classList.add("hidden")
  clearFoodForm()
})

// Activity Form Toggle
addActivityButton.addEventListener("click", () => {
  addActivityForm.classList.remove("hidden")
})

cancelActivityButton.addEventListener("click", () => {
  addActivityForm.classList.add("hidden")
  clearActivityForm()
})

// Add Food
saveFoodButton.addEventListener("click", () => {
  const name = document.getElementById("food-name").value
  const mealType = document.getElementById("meal-type").value
  const calories = Number.parseInt(document.getElementById("food-calories").value)
  const protein = Number.parseInt(document.getElementById("food-protein").value) || 0
  const carbs = Number.parseInt(document.getElementById("food-carbs").value) || 0
  const fat = Number.parseInt(document.getElementById("food-fat").value) || 0

  if (name && calories) {
    const newMeal = {
      id: Date.now().toString(),
      name,
      mealType,
      calories,
      protein,
      carbs,
      fat,
    }

    meals.push(newMeal)
    renderFoodLog()
    updateNutritionSummary()
    addFoodForm.classList.add("hidden")
    clearFoodForm()
  } else {
    alert("Please enter at least a food name and calories")
  }
})

// Add Activity
saveActivityButton.addEventListener("click", () => {
  const type = document.getElementById("activity-type").value
  const duration = Number.parseInt(document.getElementById("activity-duration").value)
  const distance = Number.parseFloat(document.getElementById("activity-distance").value) || null
  const calories = Number.parseInt(document.getElementById("activity-calories").value) || 0
  const notes = document.getElementById("activity-notes").value

  if (type && duration) {
    const newActivity = {
      id: Date.now().toString(),
      type,
      duration,
      distance,
      calories,
      notes,
    }

    activities.push(newActivity)
    renderActivityLog()
    updateActivitySummary()
    addActivityForm.classList.add("hidden")
    clearActivityForm()
  } else {
    alert("Please enter at least an activity type and duration")
  }
})

// Delete Food
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-food")) {
    const id = e.target.getAttribute("data-id")
    meals = meals.filter((meal) => meal.id !== id)
    renderFoodLog()
    updateNutritionSummary()
  }
})

// Delete Activity
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-activity")) {
    const id = e.target.getAttribute("data-id")
    activities = activities.filter((activity) => activity.id !== id)
    renderActivityLog()
    updateActivitySummary()
  }
})

// Intelligent Food Tracking
analyzeFoodButton.addEventListener("click", async () => {
  const description = foodInput.value.trim()
  if (!description) return

  analyzeFoodButton.textContent = "Analyzing..."
  analyzeFoodButton.disabled = true

  try {
    const nutrition = await analyzeFood(description)
    if (nutrition) {
      const newMeal = {
        id: Date.now().toString(),
        name: description,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
        mealType: "meal",
      }

      meals.push(newMeal)
      renderFoodLog()
      updateNutritionSummary()
      foodInput.value = ""
    }
  } catch (error) {
    console.error("Error analyzing food:", error)
    alert("Failed to analyze food. Please try again.")
  } finally {
    analyzeFoodButton.textContent = "Track"
    analyzeFoodButton.disabled = false
  }
})

// Intelligent Activity Tracking
analyzeActivityButton.addEventListener("click", async () => {
  const description = activityInput.value.trim()
  if (!description) return

  analyzeActivityButton.textContent = "Analyzing..."
  analyzeActivityButton.disabled = true

  try {
    const activityData = await analyzeActivity(description)
    if (activityData) {
      const newActivity = {
        id: Date.now().toString(),
        type: activityData.type,
        duration: activityData.duration,
        distance: activityData.distance,
        calories: activityData.calories,
        notes: description,
      }

      activities.push(newActivity)
      renderActivityLog()
      updateActivitySummary()
      activityInput.value = ""
    }
  } catch (error) {
    console.error("Error analyzing activity:", error)
    alert("Failed to analyze activity. Please try again.")
  } finally {
    analyzeActivityButton.textContent = "Track"
    analyzeActivityButton.disabled = false
  }
})

// Render Food Log
function renderFoodLog() {
  foodLogBody.innerHTML = ""

  if (meals.length === 0) {
    const emptyRow = document.createElement("tr")
    emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; padding: 20px;">
                No meals logged yet. Add your first meal!
            </td>
        `
    foodLogBody.appendChild(emptyRow)
    return
  }

  meals.forEach((meal) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td class="col-food">
                <div class="food-name">${meal.name}</div>
                <div class="meal-type">${capitalizeFirstLetter(meal.mealType)}</div>
            </td>
            <td class="col-calories">${meal.calories}</td>
            <td class="col-protein">${meal.protein}g</td>
            <td class="col-carbs">${meal.carbs}g</td>
            <td class="col-fat">${meal.fat}g</td>
            <td class="col-actions">
                <button class="icon-button delete-food" data-id="${meal.id}">✕</button>
                <button class="icon-button edit-food" data-id="${meal.id}">✎</button>
            </td>
        `
    foodLogBody.appendChild(row)
  })
}

// Render Activity Log
function renderActivityLog() {
  activityLogBody.innerHTML = ""

  if (activities.length === 0) {
    const emptyRow = document.createElement("tr")
    emptyRow.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 20px;">
                No activities logged yet. Add your first activity!
            </td>
        `
    activityLogBody.appendChild(emptyRow)
    return
  }

  activities.forEach((activity) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td class="col-activity">
                <div class="activity-name">${capitalizeFirstLetter(activity.type)}</div>
                ${activity.notes ? `<div class="activity-notes">${activity.notes}</div>` : ""}
            </td>
            <td class="col-duration">${activity.duration} min</td>
            <td class="col-distance">${activity.distance ? `${activity.distance} km` : "-"}</td>
            <td class="col-calories">${activity.calories}</td>
            <td class="col-actions">
                <button class="icon-button delete-activity" data-id="${activity.id}">✕</button>
                <button class="icon-button edit-activity" data-id="${activity.id}">✎</button>
            </td>
        `
    activityLogBody.appendChild(row)
  })
}

// Update Nutrition Summary
function updateNutritionSummary() {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  totalCaloriesElement.textContent = totalCalories
  totalProteinElement.textContent = totalProtein
  totalCarbsElement.textContent = totalCarbs
  totalFatElement.textContent = totalFat

  caloriesProgressElement.style.width = `${Math.min(100, (totalCalories / calorieTarget) * 100)}%`
  proteinProgressElement.style.width = `${Math.min(100, (totalProtein / proteinTarget) * 100)}%`
  carbsProgressElement.style.width = `${Math.min(100, (totalCarbs / carbsTarget) * 100)}%`
  fatProgressElement.style.width = `${Math.min(100, (totalFat / fatTarget) * 100)}%`
}

// Update Activity Summary
function updateActivitySummary() {
  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
  const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.calories, 0)

  activityCountElement.textContent = activities.length
  totalDurationElement.textContent = totalDuration
  caloriesBurnedElement.textContent = totalCaloriesBurned
}

// Clear Forms
function clearFoodForm() {
  document.getElementById("food-name").value = ""
  document.getElementById("meal-type").value = "breakfast"
  document.getElementById("food-calories").value = ""
  document.getElementById("food-protein").value = ""
  document.getElementById("food-carbs").value = ""
  document.getElementById("food-fat").value = ""
}

function clearActivityForm() {
  document.getElementById("activity-type").value = "running"
  document.getElementById("activity-duration").value = ""
  document.getElementById("activity-distance").value = ""
  document.getElementById("activity-calories").value = ""
  document.getElementById("activity-notes").value = ""
}

// Helper Functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// AI Analysis Functions (Mock implementations for demo)
async function analyzeFood(description) {
  // In a real implementation, this would call your backend API
  // For demo purposes, we'll simulate a response after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate AI analysis with random values
      resolve({
        calories: Math.floor(Math.random() * 500) + 200,
        protein: Math.floor(Math.random() * 30) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fat: Math.floor(Math.random() * 20) + 5,
      })
    }, 1500)
  })
}

async function analyzeActivity(description) {
  // In a real implementation, this would call your backend API
  // For demo purposes, we'll simulate a response after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate AI analysis with random values
      const activityTypes = ["running", "walking", "cycling", "swimming", "weight-training", "yoga"]
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      const duration = Math.floor(Math.random() * 60) + 15

      resolve({
        type: randomType,
        duration: duration,
        distance:
          randomType === "running" || randomType === "walking" || randomType === "cycling"
            ? Number.parseFloat((Math.random() * 10 + 1).toFixed(1))
            : null,
        calories: Math.floor(duration * (Math.random() * 10 + 5)),
      })
    }, 1500)
  })
}

// Initialize
renderFoodLog()
renderActivityLog()
updateNutritionSummary()
updateActivitySummary()

