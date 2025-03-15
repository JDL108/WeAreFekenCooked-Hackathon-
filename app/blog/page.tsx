import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Blog</h1>
          <p className="text-muted-foreground">Latest articles on fitness, nutrition, and wellness.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Categories</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-10">
        <FeaturedArticle
          title="10 Nutrition Myths Debunked by Science"
          description="Separate fact from fiction with these evidence-based insights about nutrition and diet."
          date="March 15, 2023"
          author="Dr. Sarah Johnson"
          category="Nutrition"
          image="/placeholder.svg?height=400&width=800"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            title="How to Build a Sustainable Workout Routine"
            description="Create a fitness plan that you can stick with for the long term."
            date="March 10, 2023"
            author="Mike Thompson"
            category="Fitness"
            image="/placeholder.svg?height=200&width=300"
          />
          <BlogCard
            title="The Science of Protein: How Much Do You Really Need?"
            description="Understanding protein requirements for different fitness goals and lifestyles."
            date="March 5, 2023"
            author="Lisa Chen, RD"
            category="Nutrition"
            image="/placeholder.svg?height=200&width=300"
          />
          <BlogCard
            title="Recovery Techniques for Athletes"
            description="Optimize your recovery to improve performance and prevent injuries."
            date="February 28, 2023"
            author="James Wilson, PT"
            category="Recovery"
            image="/placeholder.svg?height=200&width=300"
          />
          <BlogCard
            title="Mindfulness and Exercise: The Mental Benefits of Fitness"
            description="How regular physical activity can improve your mental health and well-being."
            date="February 20, 2023"
            author="Dr. Emily Roberts"
            category="Wellness"
            image="/placeholder.svg?height=200&width=300"
          />
          <BlogCard
            title="Beginner's Guide to Strength Training"
            description="Essential tips and techniques for those new to weight lifting."
            date="February 15, 2023"
            author="Chris Davis"
            category="Fitness"
            image="/placeholder.svg?height=200&width=300"
          />
          <BlogCard
            title="Healthy Meal Prep Ideas for Busy People"
            description="Quick and nutritious meal preparation strategies for those with limited time."
            date="February 10, 2023"
            author="Maria Gonzalez"
            category="Nutrition"
            image="/placeholder.svg?height=200&width=300"
          />
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>
    </div>
  )
}

interface FeaturedArticleProps {
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
}

function FeaturedArticle({ title, description, date, author, category, image }: FeaturedArticleProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-60 w-full md:h-auto md:w-1/2">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">{date}</div>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{category}</div>
              </div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="text-sm">By {author}</div>
          </div>
          <div className="mt-6">
            <Button asChild>
              <Link href={`/blog/${title.toLowerCase().replace(/\s+/g, "-")}`}>Read Full Article</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BlogCardProps {
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
}

function BlogCard({ title, description, date, author, category, image }: BlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-primary/10 text-primary px-2 py-1 rounded text-xs">{category}</div>
      </div>
      <CardHeader>
        <div className="text-sm text-muted-foreground">{date}</div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>By {author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={`/blog/${title.toLowerCase().replace(/\s+/g, "-")}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

