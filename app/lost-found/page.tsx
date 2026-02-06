"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Calendar,
  User,
  Plus,
  CheckCircle2,
  AlertCircle,
  Package,
  Laptop,
  CreditCard,
  Droplets,
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type LostFoundItem, getLostFoundItems } from "@/lib/mock-data"

const categoryIcons: Record<string, React.ElementType> = {
  Electronics: Laptop,
  "ID/Documents": CreditCard,
  Personal: Package,
}

function ItemCard({ item }: { item: LostFoundItem }) {
  const Icon = categoryIcons[item.category] || Package

  return (
    <Card className={`transition-all hover:border-primary/40 ${item.status === "resolved" ? "opacity-60" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
            item.type === "lost" ? "bg-destructive/15 text-destructive" : "bg-chart-2/15 text-chart-2"
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0 border-0 ${
                      item.type === "lost"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-chart-2/15 text-chart-2"
                    }`}
                  >
                    {item.type === "lost" ? "Lost" : "Found"}
                  </Badge>
                  {item.status === "resolved" && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-chart-2/15 text-chart-2 border-0">
                      <CheckCircle2 className="h-3 w-3 mr-0.5" />
                      Resolved
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(item.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {item.contactInfo}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
              {item.status === "open" && (
                <Button size="sm" className="h-7 text-xs ml-auto">
                  {item.type === "lost" ? "I Found This" : "Claim Item"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Report Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report an Item</DialogTitle>
          <DialogDescription>Report a lost or found item on campus.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Lost or Found" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="documents">ID/Documents</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Brief title for the item" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the item in detail..." />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Where was it lost/found?" />
          </div>
          <div className="space-y-2">
            <Label>Contact</Label>
            <Input placeholder="Your email or phone" />
          </div>
          <Button className="w-full">Submit Report</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function LostFoundPage() {
  const [items, setItems] = useState<LostFoundItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    getLostFoundItems().then(setItems)
  }, [])

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" || (activeTab === "lost" && item.type === "lost") || (activeTab === "found" && item.type === "found")
    return matchesSearch && matchesTab
  })

  const lostCount = items.filter((i) => i.type === "lost" && i.status === "open").length
  const foundCount = items.filter((i) => i.type === "found" && i.status === "open").length
  const resolvedCount = items.filter((i) => i.status === "resolved").length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Lost & Found
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Report and find lost items across campus.
          </p>
        </div>
        <ReportDialog />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{lostCount}</p>
              <p className="text-xs text-muted-foreground">Lost Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{foundCount}</p>
              <p className="text-xs text-muted-foreground">Found Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{resolvedCount}</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by item name, description, or location..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="lost">Lost ({lostCount})</TabsTrigger>
          <TabsTrigger value="found">Found ({foundCount})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No items found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
