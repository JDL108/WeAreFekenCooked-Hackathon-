"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, Edit } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Add this import at the top of the file
import { analyzeFood, analyzeActivity } from "@/lib/ai-service"

export default function TrackerPage() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Trackers</h1>
          <p className="text-muted-foreground">
            Track your nutrition and activities to stay on top of your fitness goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
        </div>
      </div>

      <Tabs defaultValue="calories" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calories">Calorie Tracker</TabsTrigger>
          <TabsTrigger value="activity">Activity Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="calories" className="mt-6">
          <CalorieTracker date={date} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityTracker date={date} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CalorieTrackerProps {
  date: Date
}

function CalorieTracker({ date }: CalorieTrackerProps) {
  const [meals, setMeals] = useState<
    Array<{
      id: string
      name: string
      calories: number
      protein: number
      carbs: number
      fat: number
      mealType: string
    }>
  >([
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
  ])

  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    mealType: "breakfast",
  })

  const [isAddingMeal, setIsAddingMeal] = useState(false)
  const [intelligentInput, setIntelligentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([
        ...meals,
        {
          id: Date.now().toString(),
          name: newMeal.name,
          calories: Number.parseInt(newMeal.calories),
          protein: Number.parseInt(newMeal.protein) || 0,
          carbs: Number.parseInt(newMeal.carbs) || 0,
          fat: Number.parseInt(newMeal.fat) || 0,
          mealType: newMeal.mealType,
        },
      ])

      setNewMeal({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        mealType: "breakfast",
      })

      setIsAddingMeal(false)
    }
  }

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const processIntelligentInput = async () => {
    if (!intelligentInput.trim()) return

    setIsProcessing(true)
    try {
      const response = await analyzeFood(intelligentInput)

      // Add the analyzed food to meals
      if (response) {
        setMeals([
          ...meals,
          {
            id: Date.now().toString(),
            name: intelligentInput,
            calories: response.calories,
            protein: response.protein,
            carbs: response.carbs,
            fat: response.fat,
            mealType: "meal", // Default meal type
          },
        ])

        // Clear the input
        setIntelligentInput("")
      }
    } catch (error) {
      console.error("Error processing food input:", error)
      // You could add error handling UI here
    } finally {
      setIsProcessing(false)
    }
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  // Daily targets (example)
  const calorieTarget = 2000
  const proteinTarget = 150
  const carbsTarget = 200
  const fatTarget = 65

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Summary - {format(date, "MMMM d, yyyy")}</CardTitle>
          <CardDescription>Track your food intake and monitor your nutrition.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Calories</div>
              <div className="text-2xl font-bold">
                {totalCalories} / {calorieTarget}
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${Math.min(100, (totalCalories / calorieTarget) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Protein</div>
              <div className="text-2xl font-bold">
                {totalProtein}g / {proteinTarget}g
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${Math.min(100, (totalProtein / proteinTarget) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Carbs</div>
              <div className="text-2xl font-bold">
                {totalCarbs}g / {carbsTarget}g
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${Math.min(100, (totalCarbs / carbsTarget) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Fats</div>
              <div className="text-2xl font-bold">
                {totalFat}g / {fatTarget}g
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{ width: `${Math.min(100, (totalFat / fatTarget) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Intelligent Tracking</CardTitle>
          <CardDescription>
            Simply describe what you ate in natural language and our AI will analyze the nutritional content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="intelligent-input">What did you eat?</Label>
              <div className="flex space-x-2">
                <Input
                  id="intelligent-input"
                  placeholder="E.g., I ate around 100g of salmon today with 2 eggs and an avocado"
                  value={intelligentInput}
                  onChange={(e) => setIntelligentInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={processIntelligentInput} disabled={isProcessing || !intelligentInput.trim()}>
                  {isProcessing ? "Analyzing..." : "Track"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Be as specific as possible with portions and ingredients for more accurate results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Food Log</CardTitle>
            <CardDescription>Record what you've eaten today.</CardDescription>
          </div>
          <Button onClick={() => setIsAddingMeal(true)} disabled={isAddingMeal}>
            <Plus className="mr-2 h-4 w-4" /> Add Food Manually
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingMeal && (
            <div className="mb-6 rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-medium">Add Food Item</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input
                    id="food-name"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="e.g., Chicken Salad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <Select
                    value={newMeal.mealType}
                    onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value })}
                  >
                    <SelectTrigger id="meal-type">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    placeholder="e.g., 350"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    placeholder="e.g., 20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    placeholder="e.g., 30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingMeal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMeal}>Add Food</Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {meals.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No meals logged yet. Add your first meal!</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                    <div className="col-span-4">Food</div>
                    <div className="col-span-2 text-center">Calories</div>
                    <div className="col-span-1 text-center">Protein</div>
                    <div className="col-span-1 text-center">Carbs</div>
                    <div className="col-span-1 text-center">Fat</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  {meals.map((meal) => (
                    <div key={meal.id} className="grid grid-cols-12 gap-2 border-t p-4">
                      <div className="col-span-4">
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{meal.mealType}</div>
                      </div>
                      <div className="col-span-2 text-center">{meal.calories}</div>
                      <div className="col-span-1 text-center">{meal.protein}g</div>
                      <div className="col-span-1 text-center">{meal.carbs}g</div>
                      <div className="col-span-1 text-center">{meal.fat}g</div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMeal(meal.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ActivityTrackerProps {
  date: Date
}

function ActivityTracker({ date }: ActivityTrackerProps) {
  const [activities, setActivities] = useState<
    Array<{
      id: string
      type: string
      duration: number
      distance?: number
      calories: number
      notes?: string
    }>
  >([
    {
      id: "1",
      type: "running",
      duration: 30,
      distance: 5,
      calories: 300,
      notes: "Morning run in the park",
    },
  ])

  const [newActivity, setNewActivity] = useState({
    type: "running",
    duration: "",
    distance: "",
    calories: "",
    notes: "",
  })

  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [intelligentInput, setIntelligentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAddActivity = () => {
    if (newActivity.type && newActivity.duration) {
      setActivities([
        ...activities,
        {
          id: Date.now().toString(),
          type: newActivity.type,
          duration: Number.parseInt(newActivity.duration),
          distance: newActivity.distance ? Number.parseFloat(newActivity.distance) : undefined,
          calories: Number.parseInt(newActivity.calories) || 0,
          notes: newActivity.notes || undefined,
        },
      ])

      setNewActivity({
        type: "running",
        duration: "",
        distance: "",
        calories: "",
        notes: "",
      })

      setIsAddingActivity(false)
    }
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const processIntelligentInput = async () => {
    if (!intelligentInput.trim()) return

    setIsProcessing(true)
    try {
      const response = await analyzeActivity(intelligentInput)

      // Add the analyzed activity
      if (response) {
        setActivities([
          ...activities,
          {
            id: Date.now().toString(),
            type: response.type,
            duration: response.duration,
            distance: response.distance,
            calories: response.calories,
            notes: intelligentInput, // Use the original input as notes
          },
        ])

        // Clear the input
        setIntelligentInput("")
      }
    } catch (error) {
      console.error("Error processing activity input:", error)
      // You could add error handling UI here
    } finally {
      setIsProcessing(false)
    }
  }

  const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
  const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.calories, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary - {format(date, "MMMM d, yyyy")}</CardTitle>
          <CardDescription>Track your workouts and physical activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Activities</div>
              <div className="text-2xl font-bold">{activities.length}</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Total Duration</div>
              <div className="text-2xl font-bold">{totalDuration} min</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
              <div className="text-sm font-medium text-muted-foreground">Calories Burned</div>
              <div className="text-2xl font-bold">{totalCaloriesBurned}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Intelligent Tracking</CardTitle>
          <CardDescription>
            Simply describe your workout in natural language and our AI will analyze the activity details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="activity-intelligent-input">What activity did you do?</Label>
              <div className="flex space-x-2">
                <Input
                  id="activity-intelligent-input"
                  placeholder="E.g., I went for a 5km run this morning that took about 30 minutes"
                  value={intelligentInput}
                  onChange={(e) => setIntelligentInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={processIntelligentInput} disabled={isProcessing || !intelligentInput.trim()}>
                  {isProcessing ? "Analyzing..." : "Track"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Include details like activity type, duration, distance, and intensity for more accurate results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Record your physical activities.</CardDescription>
          </div>
          <Button onClick={() => setIsAddingActivity(true)} disabled={isAddingActivity}>
            <Plus className="mr-2 h-4 w-4" /> Add Activity Manually
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingActivity && (
            <div className="mb-6 rounded-lg border p-4">
              <h3 className="mb-4 text-lg font-medium">Add Activity</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select
                    value={newActivity.type}
                    onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                  >
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="walking">Walking</SelectItem>
                      <SelectItem value="cycling">Cycling</SelectItem>
                      <SelectItem value="swimming">Swimming</SelectItem>
                      <SelectItem value="weight-training">Weight Training</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                    placeholder="e.g., 30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={newActivity.distance}
                    onChange={(e) => setNewActivity({ ...newActivity, distance: e.target.value })}
                    placeholder="e.g., 5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories Burned</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newActivity.calories}
                    onChange={(e) => setNewActivity({ ...newActivity, calories: e.target.value })}
                    placeholder="e.g., 300"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                    placeholder="Optional notes about your activity"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingActivity(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddActivity}>Add Activity</Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No activities logged yet. Add your first activity!</p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium">
                    <div className="col-span-3">Activity</div>
                    <div className="col-span-2 text-center">Duration</div>
                    <div className="col-span-2 text-center">Distance</div>
                    <div className="col-span-2 text-center">Calories</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  {activities.map((activity) => (
                    <div key={activity.id} className="grid grid-cols-12 gap-2 border-t p-4">
                      <div className="col-span-3">
                        <div className="font-medium capitalize">{activity.type}</div>
                        {activity.notes && <div className="text-xs text-muted-foreground">{activity.notes}</div>}
                      </div>
                      <div className="col-span-2 text-center">{activity.duration} min</div>
                      <div className="col-span-2 text-center">
                        {activity.distance ? `${activity.distance} km` : "-"}
                      </div>
                      <div className="col-span-2 text-center">{activity.calories}</div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity(activity.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

