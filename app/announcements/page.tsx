"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Megaphone,
  AlertTriangle,
  Calendar,
  BookOpen,
  Wrench,
  Bell,
  Clock,
} from "lucide-react"
import { type Announcement, getAnnouncements } from "@/lib/mock-data"

const categoryConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; label: string }> = {
  event: { icon: Calendar, color: "text-primary", bgColor: "bg-primary/15", label: "Event" },
  emergency: { icon: AlertTriangle, color: "text-destructive", bgColor: "bg-destructive/15", label: "Emergency" },
  academic: { icon: BookOpen, color: "text-chart-2", bgColor: "bg-chart-2/15", label: "Academic" },
  maintenance: { icon: Wrench, color: "text-chart-3", bgColor: "bg-chart-3/15", label: "Maintenance" },
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const config = categoryConfig[announcement.category] || categoryConfig.event
  const CatIcon = config.icon
  const timeAgo = getTimeAgo(announcement.timestamp)

  return (
    <Card className={`transition-all ${announcement.isNew ? "border-primary/30" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bgColor} ${config.color}`}>
            <CatIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold">{announcement.title}</h3>
                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${config.bgColor} ${config.color} border-0`}>
                  {config.label}
                </Badge>
                {announcement.isNew && (
                  <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 border-0">
                    New
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {announcement.body}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return "Yesterday"
  return `${diffDays}d ago`
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    getAnnouncements().then(setAnnouncements)
  }, [])

  const filtered = filter === "all" ? announcements : announcements.filter((a) => a.category === filter)
  const newCount = announcements.filter((a) => a.isNew).length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            Announcements
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Stay updated with the latest campus news and notices.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          <Bell className="h-3.5 w-3.5" />
          {newCount} New
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {[
          { value: "all", label: "All" },
          { value: "emergency", label: "Emergency" },
          { value: "academic", label: "Academic" },
          { value: "event", label: "Events" },
          { value: "maintenance", label: "Maintenance" },
        ].map((cat) => (
          <Button
            key={cat.value}
            variant={filter === cat.value ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Megaphone className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No announcements in this category.</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        )}
      </div>
    </div>
  )
}
