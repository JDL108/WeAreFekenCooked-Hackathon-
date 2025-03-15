"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Blog</h1>
          <p className="text-muted-foreground">Latest articles on fitness, nutrition, and wellness.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-10">
        <FeaturedArticle
          title="10 Nutrition Myths Debunked by Science"
          description="Separate fact from fiction with these evidence-based insights about nutrition and diet."
          date="March 15, 2023"
          author="Dr. Sarah Johnson"
          category="Nutrition"
          image="10_myths.png?height=400&width=800"
          url="https://habs.uq.edu.au/blog/2023/10/debunking-10-common-nutrition-myths"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            title="How to Build a Sustainable Workout Routine"
            description="Create a fitness plan that you can stick with for the long term."
            date="March 10, 2023"
            author="Mike Thompson"
            category="Fitness"
            image="workout_routine.png?height=200&width=300"
            url="https://www.self.com/story/fitness-resistance-building-sustainable-workout-program"
          />
          <BlogCard
            title="The Science of Protein: How Much Do You Really Need?"
            description="Understanding protein requirements for different fitness goals and lifestyles."
            date="March 5, 2023"
            author="Lisa Chen, RD"
            category="Nutrition"
            image="howmuch_protein.png?height=200&width=300"
            url="https://www.health.harvard.edu/blog/how-much-protein-do-you-need-every-day-201506188096"
          />
          <BlogCard
            title="Recovery Techniques for Athletes"
            description="Optimize your recovery to improve performance and prevent injuries."
            date="February 28, 2023"
            author="Shona L. Halson, PT"
            category="Recovery"
            image="recovery_techniques.png?height=200&width=300"
            url="https://www.gssiweb.org/sports-science-exchange/article/sse-120-recovery-techniques-for-athletes"
          />
        </div>
      </div>
    </div>
  );
}

interface FeaturedArticleProps {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  url?: string;
}

function FeaturedArticle({ title, description, date, author, category, image, url }: FeaturedArticleProps) {
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
              <Link href={url ?? "#"} target="_blank" rel="noopener noreferrer">
                Read Full Article
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  url?: string;
}

function BlogCard({ title, description, date, author, category, image, url }: BlogCardProps) {
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
          <Link href={url ?? "#"} target="_blank" rel="noopener noreferrer">
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}