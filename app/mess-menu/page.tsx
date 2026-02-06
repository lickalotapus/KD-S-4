"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Utensils,
  Clock,
  Star,
  Flame,
  AlertTriangle,
  Leaf,
  ThumbsUp,
  ThumbsDown,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { type MessMenu, type Meal, getMessMenu } from "@/lib/mock-data"

function MealCard({ meal, isActive }: { meal: Meal; isActive: boolean }) {
  const vegCount = meal.items.filter((i) => i.isVeg).length
  const nonVegCount = meal.items.length - vegCount
  const totalCalories = meal.items.reduce((sum, i) => sum + (i.calories || 0), 0)
  const allAllergens = [...new Set(meal.items.flatMap((i) => i.allergens || []))]

  return (
    <Card className={`transition-all ${isActive ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}>
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg capitalize">{meal.type}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {meal.time}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isActive && (
              <Badge className="bg-primary/15 text-primary border-0">
                Serving Now
              </Badge>
            )}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
              <span className="font-semibold">{meal.rating}</span>
              <span className="text-xs text-muted-foreground">({meal.totalRatings})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          {meal.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-bold ${
                    item.isVeg
                      ? "border-2 border-green-500 text-green-500"
                      : "border-2 border-red-500 text-red-500"
                  }`}
                >
                  {item.isVeg ? <Leaf className="h-3 w-3" /> : <span>N</span>}
                </span>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="h-3 w-3 text-chart-3" />
                      <span className="text-[10px] text-muted-foreground">
                        {item.allergens.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {item.calories && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Flame className="h-3 w-3" />
                  {item.calories} cal
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-lg font-bold">{totalCalories}</p>
            <p className="text-xs text-muted-foreground">Total Calories</p>
          </div>
          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-green-500">{vegCount}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-lg font-bold text-red-500">{nonVegCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Veg / Non-Veg</p>
          </div>
          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-bold">{meal.totalRatings}</span>
            </div>
            <p className="text-xs text-muted-foreground">Ratings</p>
          </div>
        </div>

        {allAllergens.length > 0 && (
          <div className="flex items-start gap-2 rounded-lg border border-chart-3/30 bg-chart-3/5 p-3">
            <AlertTriangle className="h-4 w-4 text-chart-3 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-chart-3">Allergen Warning</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This meal contains: {allAllergens.join(", ")}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-xs text-muted-foreground">Rate this meal</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="text-xs">Good</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
              <ThumbsDown className="h-3.5 w-3.5" />
              <span className="text-xs">Bad</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MessMenuPage() {
  const [menu, setMenu] = useState<MessMenu | null>(null)

  useEffect(() => {
    getMessMenu().then(setMenu)
  }, [])

  if (!menu) return null

  const hour = new Date().getHours()
  let activeTab = "breakfast"
  if (hour >= 19) activeTab = "dinner"
  else if (hour >= 16) activeTab = "snacks"
  else if (hour >= 12) activeTab = "lunch"

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mess Menu</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {menu.day}, {new Date(menu.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
            Today
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {menu.meals.map((meal) => {
          const isActive = meal.type === activeTab
          return (
            <Card key={meal.type} className={`cursor-pointer transition-all ${isActive ? "ring-2 ring-primary" : "hover:border-primary/40"}`}>
              <CardContent className="p-3 text-center">
                <p className="text-sm font-semibold capitalize">{meal.type}</p>
                <p className="text-xs text-muted-foreground">{meal.time}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-chart-3 text-chart-3" />
                  <span className="text-xs font-medium">{meal.rating}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue={activeTab}>
        <TabsList className="w-full justify-start">
          {menu.meals.map((meal) => (
            <TabsTrigger key={meal.type} value={meal.type} className="capitalize">
              {meal.type}
            </TabsTrigger>
          ))}
        </TabsList>
        {menu.meals.map((meal) => (
          <TabsContent key={meal.type} value={meal.type}>
            <MealCard meal={meal} isActive={meal.type === activeTab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
