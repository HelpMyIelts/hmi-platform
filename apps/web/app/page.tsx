"use client";

import { Button } from "@repo/ui/components/button";
import { useTheme } from "@repo/ui/hooks/use-theme";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10"
        >
          {theme === "light" ? "🌙" : "☀️"}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to HelpMyIELTS
          </h1>
          <p className="text-xl text-muted-foreground">
            Your comprehensive IELTS preparation platform
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Start Learning</h2>
            <p className="text-muted-foreground">
              Prepare for your IELTS exam with our comprehensive study materials
              and practice tests.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Practice Tests</h2>
            <p className="text-muted-foreground">
              Take mock tests and get instant feedback to improve your IELTS
              score.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary">Start Practice</Button>
              <Button variant="ghost">View Samples</Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-6 flex-col">
            <div className="text-2xl mb-2">📚</div>
            <div className="font-medium">Study Materials</div>
            <div className="text-sm text-muted-foreground">
              Comprehensive guides
            </div>
          </Button>

          <Button variant="outline" className="h-auto p-6 flex-col">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">Practice Tests</div>
            <div className="text-sm text-muted-foreground">Mock exams</div>
          </Button>

          <Button variant="outline" className="h-auto p-6 flex-col">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">Progress Tracking</div>
            <div className="text-sm text-muted-foreground">
              Monitor improvement
            </div>
          </Button>

          <Button variant="outline" className="h-auto p-6 flex-col">
            <div className="text-2xl mb-2">👥</div>
            <div className="font-medium">Community</div>
            <div className="text-sm text-muted-foreground">Join learners</div>
          </Button>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 bg-muted/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold">Ready to ace your IELTS?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students who have improved their scores with our
            platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </div>
        </div>

        {/* Theme Demo Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Theme Demonstration</h2>
          <p className="text-muted-foreground">
            Current theme:{" "}
            <span className="font-mono bg-muted px-2 py-1 rounded">
              {theme}
            </span>
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }}
            >
              ☀️ Light Mode
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              }}
            >
              🌙 Dark Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
