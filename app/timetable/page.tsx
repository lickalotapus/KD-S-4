"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  BookOpen,
  FlaskConical,
  PenTool,
  Download,
} from "lucide-react"
import { type TimetableEntry, getTimetable } from "@/lib/mock-data"

const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  lecture: { icon: BookOpen, color: "text-primary", bgColor: "bg-primary/15" },
  lab: { icon: FlaskConical, color: "text-chart-2", bgColor: "bg-chart-2/15" },
  tutorial: { icon: PenTool, color: "text-chart-3", bgColor: "bg-chart-3/15" },
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

function ClassCard({ entry }: { entry: TimetableEntry }) {
  const config = typeConfig[entry.type] || typeConfig.lecture
  const TypeIcon = config.icon

  return (
    <Card className={`transition-all ${entry.isCancelled ? "opacity-60 border-destructive/30" : "hover:border-primary/40"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bgColor} ${config.color}`}>
            <TypeIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{entry.subject}</h3>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 border-0 ${config.bgColor} ${config.color}`}>
                    {entry.type}
                  </Badge>
                  {entry.isCancelled && (
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                      Cancelled
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{entry.code}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold">{entry.startTime}</p>
                <p className="text-[10px] text-muted-foreground">{entry.endTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {entry.room}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {entry.instructor}
              </span>
            </div>
            {entry.isCancelled && entry.cancellationNote && (
              <div className="mt-2 rounded-lg bg-destructive/10 p-2 flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                <p className="text-xs text-destructive">{entry.cancellationNote}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([])

  useEffect(() => {
    getTimetable().then(setTimetable)
  }, [])

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = dayNames[new Date().getDay()]
  const defaultDay = days.includes(today) ? today : "Monday"

  const totalClasses = timetable.length
  const cancelledCount = timetable.filter((t) => t.isCancelled).length
  const labCount = timetable.filter((t) => t.type === "lab").length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Timetable
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your weekly class schedule with real-time updates.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold">{totalClasses}</p>
            <p className="text-xs text-muted-foreground">Weekly Classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-destructive">{cancelledCount}</p>
            <p className="text-xs text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-chart-2">{labCount}</p>
            <p className="text-xs text-muted-foreground">Labs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-chart-3">
              {timetable.filter((t) => t.day === today && !t.isCancelled).length}
            </p>
            <p className="text-xs text-muted-foreground">{"Today's Classes"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={defaultDay}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {days.map((day) => {
            const dayClasses = timetable.filter((t) => t.day === day)
            const hasCancelled = dayClasses.some((t) => t.isCancelled)
            return (
              <TabsTrigger
                key={day}
                value={day}
                className="relative"
              >
                {day.slice(0, 3)}
                <span className="ml-1 text-[10px] text-muted-foreground">({dayClasses.length})</span>
                {day === today && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
        {days.map((day) => {
          const dayClasses = timetable
            .filter((t) => t.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
          return (
            <TabsContent key={day} value={day} className="mt-4 space-y-3">
              {day === today && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Today - {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</span>
                </div>
              )}
              {dayClasses.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No classes scheduled for {day}.</p>
                  </CardContent>
                </Card>
              ) : (
                dayClasses.map((entry) => <ClassCard key={entry.id} entry={entry} />)
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
