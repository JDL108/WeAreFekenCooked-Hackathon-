"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Move the blog data outside the component to avoid re-creation on each render
const BLOG_DATA = {
  featured: {
    title: "10 Nutrition Myths Debunked by Science",
    description: "Separate fact from fiction with these evidence-based insights about nutrition and diet.",
    date: "March 15, 2023",
    author: "Dr. Sarah Johnson",
    category: "Nutrition",
    image: "/10_myths.png", // Ensure paths start with / for public directory
    url: "https://habs.uq.edu.au/blog/2023/10/debunking-10-common-nutrition-myths"
  },
  articles: [
    {
      title: "How to Build a Sustainable Workout Routine",
      description: "Create a fitness plan that you can stick with for the long term.",
      date: "March 10, 2023",
      author: "Mike Thompson",
      category: "Fitness",
      image: "/workout_routine.png",
      url: "https://www.self.com/story/fitness-resistance-building-sustainable-workout-program"
    },
    {
      title: "The Science of Protein: How Much Do You Really Need?",
      description: "Understanding protein requirements for different fitness goals and lifestyles.",
      date: "March 5, 2023",
      author: "Lisa Chen, RD",
      category: "Nutrition",
      image: "/howmuch_protein.png",
      url: "https://www.health.harvard.edu/blog/how-much-protein-do-you-need-every-day-201506188096"
    },
    {
      title: "Recovery Techniques for Athletes",
      description: "Optimize your recovery to improve performance and prevent injuries.",
      date: "February 28, 2023",
      author: "Shona L. Halson, PT",
      category: "Recovery",
      image: "/recovery_techniques.png",
      url: "https://www.gssiweb.org/sports-science-exchange/article/sse-120-recovery-techniques-for-athletes"
    }
  ]
};

export default function BlogPage() {
  // Use a stable reference for the hydration state
  const [isClient, setIsClient] = useState(false);
  
  // Only run once on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return a skeleton or null during SSR
  if (!isClient) {
    return <div className="container py-10">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-64 bg-gray-200 rounded mb-8" />
      <div className="h-80 bg-gray-200 rounded mb-8" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fitness Blog</h1>
          <p className="text-muted-foreground">Latest articles on fitness, nutrition, and wellness.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-10">
        <FeaturedArticle {...BLOG_DATA.featured} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_DATA.articles.map((article, index) => (
            <BlogCard key={index} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ArticleProps {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  url?: string;
}

function FeaturedArticle({ title, description, date, author, category, image, url }: ArticleProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-60 w-full md:h-auto md:w-1/2">
          {/* Add error handling and proper dimensions */}
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover"
            priority // Load this image first
            onError={(e) => {
              // Fallback to placeholder on error
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
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
              <Link href={url ?? "$"} target="_blank" rel="noopener noreferrer">
                Read Full Article
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ title, description, date, author, category, image, url }: ArticleProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title} 
          fill 
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
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
          <Link href={url ?? "$"} target="_blank" rel="noopener noreferrer">
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}