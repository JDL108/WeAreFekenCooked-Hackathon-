import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, BookOpen, MessageSquare, Calculator } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-400 to-blue-500">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Your Journey to a Healthier You Starts Here
              </h1>
              <p className="max-w-[600px] text-white md:text-xl">
                Track your workouts, monitor your nutrition, and achieve your fitness goals with our comprehensive
                platform.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100">
                    Start Your Fitness Journey Today <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/workouts">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Explore Workouts
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/FitTrack.png?height=400&width=400"
                alt="Fitness"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools you need to achieve your fitness goals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
              <Dumbbell className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Workout Library</h3>
              <p className="text-sm text-center text-muted-foreground">
                Access a variety of exercises with detailed instructions and videos.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
              <Calculator className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Calorie Tools</h3>
              <p className="text-sm text-center text-muted-foreground">
                Calculate your needs and track your daily intake with our easy-to-use tools.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
              <BookOpen className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Fitness Blog</h3>
              <p className="text-sm text-center text-muted-foreground">
                Stay informed with the latest fitness tips, nutrition advice, and success stories.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
              <MessageSquare className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-sm text-center text-muted-foreground">
                Connect with others on the same journey and get support when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of others who have already started their fitness journey with us.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our users have achieved with our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 border rounded-lg p-6 shadow-sm">
              <Image
                src="/RICHARD_Z.png?height=100&width=100"
                alt="User"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Richard Z.</h3>
                <p className="text-sm text-muted-foreground">
                  "I've lost 30 pounds in 6 months using the calorie tracker and workout library. This platform changed
                  my life!"
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 border rounded-lg p-6 shadow-sm">
              <Image
                src="/Jason_L.png?height=100&width=100"
                alt="User"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Jason L.</h3>
                <p className="text-sm text-muted-foreground">
                  "The activity tracker helps me stay accountable. I've improved my running time by 15% in just 3
                  months!"
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 border rounded-lg p-6 shadow-sm">
              <Image
                src="/White_Girl.jpg?height=100&width=100"
                alt="User"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Emily W.</h3>
                <p className="text-sm text-muted-foreground">
                  "The nutrition articles and calorie tracker helped me understand my body's needs. I feel more
                  energetic than ever!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}