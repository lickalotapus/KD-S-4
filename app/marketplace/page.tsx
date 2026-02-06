"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ShoppingBag,
  Search,
  Plus,
  Tag,
  User,
  Clock,
  TrendingDown,
  TrendingUp,
  IndianRupee,
  Heart,
  MessageCircle,
  Filter,
  LayoutGrid,
  List,
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
import { type MarketplaceItem, getMarketplaceItems } from "@/lib/mock-data"

const conditionColors: Record<string, string> = {
  new: "bg-chart-2/15 text-chart-2",
  "like-new": "bg-primary/15 text-primary",
  good: "bg-chart-3/15 text-chart-3",
  fair: "bg-muted text-muted-foreground",
}

function ProductCard({ item }: { item: MarketplaceItem }) {
  const priceDiff = item.suggestedPrice ? item.price - item.suggestedPrice : 0

  return (
    <Card className="transition-all hover:border-primary/40 overflow-hidden">
      <div className="h-36 bg-secondary flex items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-tight line-clamp-2">{item.title}</h3>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <Heart className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <IndianRupee className="h-4 w-4" />
            <span className="text-lg font-bold">{item.price}</span>
          </div>
          {item.suggestedPrice && (
            <div className="flex items-center gap-1">
              {priceDiff < 0 ? (
                <Badge variant="secondary" className="text-[10px] bg-chart-2/15 text-chart-2 border-0 gap-0.5">
                  <TrendingDown className="h-3 w-3" />
                  Below market
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] bg-chart-3/15 text-chart-3 border-0 gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  Above market
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className={`text-[10px] border-0 ${conditionColors[item.condition]}`}>
            {item.condition}
          </Badge>
          <Badge variant="outline" className="text-[10px]">{item.category}</Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{item.seller}</span>
          </div>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(item.postedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
          </span>
        </div>

        <Button className="w-full gap-1" size="sm">
          <MessageCircle className="h-3.5 w-3.5" />
          Contact Seller
        </Button>
      </CardContent>
    </Card>
  )
}

function SellDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Sell Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>List an Item for Sale</DialogTitle>
          <DialogDescription>Add details about the item you want to sell.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Item name" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe your item..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Price (INR)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="cycles">Cycles</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">List Item</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    getMarketplaceItems().then(setItems)
  }, [])

  const categories = ["all", ...new Set(items.map((i) => i.category))]

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory && !item.isSold
  })

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Marketplace
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Buy and sell within your campus community.
          </p>
        </div>
        <SellDialog />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={categoryFilter === cat ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs capitalize"
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No items found matching your search.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
