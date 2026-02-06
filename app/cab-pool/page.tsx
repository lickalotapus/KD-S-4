"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  IndianRupee,
  ArrowRight,
  Plus,
  Navigation,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { type CabPoolTrip, getCabPoolTrips } from "@/lib/mock-data"

const statusConfig: Record<string, { color: string; label: string }> = {
  open: { color: "bg-chart-2/15 text-chart-2", label: "Open" },
  full: { color: "bg-chart-3/15 text-chart-3", label: "Full" },
  completed: { color: "bg-muted text-muted-foreground", label: "Completed" },
}

function TripCard({ trip }: { trip: CabPoolTrip }) {
  const status = statusConfig[trip.status] || statusConfig.open
  const seatPercentage = ((trip.totalSeats - trip.seatsAvailable) / trip.totalSeats) * 100
  const totalCost = trip.pricePerSeat * trip.totalSeats
  const isToday = trip.date === "2026-02-06"

  return (
    <Card className={`transition-all hover:border-primary/40 ${trip.status === "full" ? "opacity-80" : ""}`}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="truncate max-w-[120px]">{trip.from.replace("IIT Ropar Campus", "IIT Ropar")}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="truncate max-w-[120px]">{trip.to}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(trip.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {trip.time}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 border-0 ${status.color}`}>
              {status.label}
            </Badge>
            {isToday && (
              <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 border-0">
                Today
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {trip.totalSeats - trip.seatsAvailable}/{trip.totalSeats} seats filled
            </span>
            <span className="font-medium">{trip.seatsAvailable} left</span>
          </div>
          <Progress value={seatPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <IndianRupee className="h-4 w-4 text-chart-2" />
            <span className="text-lg font-bold">{trip.pricePerSeat}</span>
            <span className="text-xs text-muted-foreground">/seat</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            by {trip.driver}
          </div>
        </div>

        {trip.passengers.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Passengers:</span>
            {trip.passengers.map((p) => (
              <Badge key={p} variant="outline" className="text-[10px]">
                <UserCheck className="h-3 w-3 mr-0.5" />
                {p}
              </Badge>
            ))}
          </div>
        )}

        <Button
          className="w-full"
          disabled={trip.status !== "open"}
          variant={trip.status === "open" ? "default" : "secondary"}
        >
          {trip.status === "open" ? "Join Ride" : trip.status === "full" ? "Ride Full" : "Completed"}
        </Button>
      </CardContent>
    </Card>
  )
}

function CreateTripDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Create Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a New Trip</DialogTitle>
          <DialogDescription>Share your ride with fellow students.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>From</Label>
            <Input placeholder="Pickup location" defaultValue="IIT Ropar Campus" />
          </div>
          <div className="space-y-2">
            <Label>To</Label>
            <Input placeholder="Destination" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Total Seats</Label>
              <Input type="number" placeholder="4" />
            </div>
            <div className="space-y-2">
              <Label>Price per Seat (INR)</Label>
              <Input type="number" placeholder="0" />
            </div>
          </div>
          <Button className="w-full">Create Trip</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function CabPoolPage() {
  const [trips, setTrips] = useState<CabPoolTrip[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    getCabPoolTrips().then(setTrips)
  }, [])

  const filtered = trips.filter((trip) => {
    return (
      trip.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const openTrips = trips.filter((t) => t.status === "open").length
  const totalSeats = trips.filter((t) => t.status === "open").reduce((sum, t) => sum + t.seatsAvailable, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            Cab Pool
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Share rides and split costs with fellow students.
          </p>
        </div>
        <CreateTripDialog />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{openTrips}</p>
              <p className="text-xs text-muted-foreground">Active Trips</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{totalSeats}</p>
              <p className="text-xs text-muted-foreground">Seats Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
              <IndianRupee className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">100-600</p>
              <p className="text-xs text-muted-foreground">Price Range</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-4/15 text-chart-4">
              <Navigation className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{trips.length}</p>
              <p className="text-xs text-muted-foreground">Total Trips</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by destination, origin, or driver..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="p-8 text-center">
              <Car className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No trips found. Create one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((trip) => <TripCard key={trip.id} trip={trip} />)
        )}
      </div>
    </div>
  )
}
