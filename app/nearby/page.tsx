"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Search,
  Star,
  Clock,
  Ticket,
  Navigation,
  Coffee,
  UtensilsCrossed,
  Landmark,
  BookOpen,
  ShoppingBag,
  Wifi,
} from "lucide-react"
import { type NearbyPlace, getNearbyPlaces } from "@/lib/mock-data"

const typeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  restaurant: { icon: UtensilsCrossed, color: "bg-destructive/15 text-destructive", label: "Restaurant" },
  cafe: { icon: Coffee, color: "bg-chart-3/15 text-chart-3", label: "Cafe" },
  attraction: { icon: Landmark, color: "bg-chart-4/15 text-chart-4", label: "Attraction" },
  "study-spot": { icon: BookOpen, color: "bg-primary/15 text-primary", label: "Study Spot" },
  shopping: { icon: ShoppingBag, color: "bg-chart-2/15 text-chart-2", label: "Shopping" },
}

const vibeColors: Record<string, string> = {
  "study-friendly": "bg-primary/15 text-primary",
  budget: "bg-chart-2/15 text-chart-2",
  "date-spot": "bg-chart-4/15 text-chart-4",
  "group-dining": "bg-chart-3/15 text-chart-3",
  quiet: "bg-secondary text-secondary-foreground",
  heritage: "bg-chart-3/15 text-chart-3",
  photography: "bg-chart-4/15 text-chart-4",
  coffee: "bg-chart-3/15 text-chart-3",
  rooftop: "bg-primary/15 text-primary",
  "non-veg": "bg-destructive/15 text-destructive",
  "local-experience": "bg-chart-2/15 text-chart-2",
}

function PlaceCard({ place }: { place: NearbyPlace }) {
  const config = typeConfig[place.type] || typeConfig.cafe
  const TypeIcon = config.icon

  return (
    <Card className="transition-all hover:border-primary/40 overflow-hidden">
      <div className="h-32 bg-secondary flex items-center justify-center relative">
        <TypeIcon className="h-12 w-12 text-muted-foreground/30" />
        {place.hasStudentDiscount && (
          <Badge className="absolute top-2 right-2 bg-chart-2 text-chart-2-foreground text-[10px] border-0">
            <Ticket className="h-3 w-3 mr-0.5" />
            Student Discount
          </Badge>
        )}
        <Badge
          variant="secondary"
          className={`absolute top-2 left-2 text-[10px] border-0 ${
            place.openNow ? "bg-chart-2/15 text-chart-2" : "bg-destructive/15 text-destructive"
          }`}
        >
          <Clock className="h-3 w-3 mr-0.5" />
          {place.openNow ? "Open Now" : "Closed"}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold">{place.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 border-0 ${config.color}`}>
                {config.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{place.priceRange}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-3.5 w-3.5 fill-chart-3 text-chart-3" />
            <span className="text-sm font-semibold">{place.rating}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">{place.description}</p>

        <div className="flex flex-wrap gap-1">
          {place.vibe.map((v) => (
            <Badge
              key={v}
              variant="secondary"
              className={`text-[10px] px-1.5 py-0 border-0 ${vibeColors[v] || "bg-secondary text-secondary-foreground"}`}
            >
              {v}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            {place.distance}
          </span>
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1 bg-transparent">
            <MapPin className="h-3 w-3" />
            Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function NearbyPage() {
  const [places, setPlaces] = useState<NearbyPlace[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    getNearbyPlaces().then(setPlaces)
  }, [])

  const types = ["all", ...new Set(places.map((p) => p.type))]

  const filtered = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.vibe.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || place.type === typeFilter
    return matchesSearch && matchesType
  })

  const openCount = places.filter((p) => p.openNow).length
  const discountCount = places.filter((p) => p.hasStudentDiscount).length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          {"Nearby Hub"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Discover the best spots around Rupnagar / Ropar.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold">{places.length}</p>
            <p className="text-xs text-muted-foreground">Total Places</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-chart-2">{openCount}</p>
            <p className="text-xs text-muted-foreground">Open Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-chart-3">{discountCount}</p>
            <p className="text-xs text-muted-foreground">Student Discounts</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search places, vibes, or cuisines..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {types.map((t) => {
          const conf = typeConfig[t]
          return (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs capitalize"
              onClick={() => setTypeFilter(t)}
            >
              {t === "all" ? "All" : conf?.label || t}
            </Button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No places found matching your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  )
}
