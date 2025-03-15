import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkoutsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workout Library</h1>
          <p className="text-muted-foreground">Browse our collection of exercises and workout routines.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <WorkoutCard
              title="Push-Up Variations"
              description="Master different push-up techniques to target various muscle groups."
              category="Strength"
              difficulty="Beginner to Advanced"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="HIIT Cardio Blast"
              description="A high-intensity interval training workout to boost your cardio fitness."
              category="Cardio"
              difficulty="Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="Full Body Stretch Routine"
              description="Improve flexibility and reduce muscle tension with this comprehensive routine."
              category="Flexibility"
              difficulty="All Levels"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="Dumbbell Strength Circuit"
              description="Build strength with this full-body dumbbell workout."
              category="Strength"
              difficulty="Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="30-Minute Running Guide"
              description="Structured running workout for beginners and intermediate runners."
              category="Cardio"
              difficulty="Beginner to Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="Yoga for Athletes"
              description="Yoga poses specifically designed to complement athletic training."
              category="Flexibility"
              difficulty="All Levels"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>
        <TabsContent value="strength" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <WorkoutCard
              title="Push-Up Variations"
              description="Master different push-up techniques to target various muscle groups."
              category="Strength"
              difficulty="Beginner to Advanced"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="Dumbbell Strength Circuit"
              description="Build strength with this full-body dumbbell workout."
              category="Strength"
              difficulty="Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>
        <TabsContent value="cardio" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <WorkoutCard
              title="HIIT Cardio Blast"
              description="A high-intensity interval training workout to boost your cardio fitness."
              category="Cardio"
              difficulty="Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="30-Minute Running Guide"
              description="Structured running workout for beginners and intermediate runners."
              category="Cardio"
              difficulty="Beginner to Intermediate"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>
        <TabsContent value="flexibility" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <WorkoutCard
              title="Full Body Stretch Routine"
              description="Improve flexibility and reduce muscle tension with this comprehensive routine."
              category="Flexibility"
              difficulty="All Levels"
              image="/placeholder.svg?height=200&width=300"
            />
            <WorkoutCard
              title="Yoga for Athletes"
              description="Yoga poses specifically designed to complement athletic training."
              category="Flexibility"
              difficulty="All Levels"
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface WorkoutCardProps {
  title: string
  description: string
  category: string
  difficulty: string
  image: string
}

function WorkoutCard({ title, description, category, difficulty, image }: WorkoutCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
          {category}
        </div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{difficulty}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/workouts/${title.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

