"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Utensils,
  Mail,
  Megaphone,
  Search,
  ShoppingBag,
  Car,
  MapPin,
  Calendar,
  GraduationCap,
  ArrowRight,
  Clock,
  AlertTriangle,
  Star,
  TrendingUp,
  BookOpen,
} from "lucide-react"
import {
  type MessMenu,
  type EmailSummary,
  type Announcement,
  type TimetableEntry,
  type Course,
  getMessMenu,
  getEmails,
  getAnnouncements,
  getTimetable,
  getCourses,
} from "@/lib/mock-data"

function QuickStatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
  color: string
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CurrentMealWidget({ menu }: { menu: MessMenu | null }) {
  if (!menu) return null

  const hour = new Date().getHours()
  let currentMeal = menu.meals[0]
  if (hour >= 19) currentMeal = menu.meals[3]
  else if (hour >= 16) currentMeal = menu.meals[2]
  else if (hour >= 12) currentMeal = menu.meals[1]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Utensils className="h-4 w-4 text-primary" />
            Current Meal
          </CardTitle>
          <Link href="/mess-menu">
            <Button variant="ghost" size="sm" className="text-xs">
              View Full Menu <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold capitalize">{currentMeal.type}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {currentMeal.time}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-chart-3 text-chart-3" />
            <span className="font-medium">{currentMeal.rating}</span>
            <span className="text-muted-foreground text-xs">({currentMeal.totalRatings})</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentMeal.items.map((item) => (
            <Badge key={item.name} variant="secondary" className="text-xs">
              <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`} />
              {item.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UnreadMailsWidget({ emails }: { emails: EmailSummary[] }) {
  const unread = emails.filter((e) => !e.isRead)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-primary" />
            Unread Mails
            <Badge variant="destructive" className="text-[10px] px-1.5">{unread.length}</Badge>
          </CardTitle>
          <Link href="/mail-summarizer">
            <Button variant="ghost" size="sm" className="text-xs">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {unread.slice(0, 3).map((email) => (
          <div key={email.id} className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold text-primary-foreground ${
              email.priority === "high" ? "bg-destructive" : "bg-primary"
            }`}>
              {email.from.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight truncate">{email.subject}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{email.summary}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function UpcomingClassesWidget({ timetable }: { timetable: TimetableEntry[] }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = days[new Date().getDay()]
  const todayClasses = timetable.filter((t) => t.day === today)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4 text-primary" />
            {"Today's Classes"}
          </CardTitle>
          <Link href="/timetable">
            <Button variant="ghost" size="sm" className="text-xs">
              Full Schedule <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {todayClasses.length === 0 && (
          <p className="text-sm text-muted-foreground py-4 text-center">No classes scheduled for today</p>
        )}
        {todayClasses.slice(0, 4).map((cls) => (
          <div
            key={cls.id}
            className={`flex items-center gap-3 rounded-lg border p-2.5 ${
              cls.isCancelled ? "opacity-60 border-destructive/30 bg-destructive/5" : ""
            }`}
          >
            <div className="text-center min-w-[52px]">
              <p className="text-xs font-semibold">{cls.startTime}</p>
              <p className="text-[10px] text-muted-foreground">{cls.endTime}</p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {cls.subject}
                {cls.isCancelled && (
                  <Badge variant="destructive" className="ml-2 text-[10px] px-1">
                    Cancelled
                  </Badge>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {cls.room} &middot; {cls.instructor}
              </p>
            </div>
            <Badge
              variant="secondary"
              className={`text-[10px] shrink-0 ${
                cls.type === "lab"
                  ? "bg-chart-2/15 text-chart-2"
                  : cls.type === "tutorial"
                    ? "bg-chart-3/15 text-chart-3"
                    : "bg-primary/15 text-primary"
              }`}
            >
              {cls.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AnnouncementsWidget({ announcements }: { announcements: Announcement[] }) {
  const categoryColors: Record<string, string> = {
    event: "bg-primary/15 text-primary",
    emergency: "bg-destructive/15 text-destructive",
    academic: "bg-chart-2/15 text-chart-2",
    maintenance: "bg-chart-3/15 text-chart-3",
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Megaphone className="h-4 w-4 text-primary" />
            Announcements
          </CardTitle>
          <Link href="/announcements">
            <Button variant="ghost" size="sm" className="text-xs">
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.slice(0, 3).map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            {a.isNew ? (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            ) : (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-tight truncate">{a.title}</p>
                <Badge variant="secondary" className={`text-[10px] shrink-0 ${categoryColors[a.category] || ""}`}>
                  {a.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.body}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AcademicProgressWidget({ courses }: { courses: Course[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="h-4 w-4 text-primary" />
            Academic Progress
          </CardTitle>
          <Link href="/lms">
            <Button variant="ghost" size="sm" className="text-xs">
              View LMS <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-sm font-medium">{course.code}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{course.name}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="text-xs">{course.grade}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={course.attendance} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground w-8 text-right">{course.attendance}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [menu, setMenu] = useState<MessMenu | null>(null)
  const [emails, setEmails] = useState<EmailSummary[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [timetable, setTimetable] = useState<TimetableEntry[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    getMessMenu().then(setMenu)
    getEmails().then(setEmails)
    getAnnouncements().then(setAnnouncements)
    getTimetable().then(setTimetable)
    getCourses().then(setCourses)
  }, [])

  const pendingAssignments = courses.flatMap((c) => c.assignments).filter((a) => a.status === "pending")
  const unreadEmails = emails.filter((e) => !e.isRead)

  const quickLinks = [
    { title: "Lost & Found", href: "/lost-found", icon: Search, color: "bg-chart-3/15 text-chart-3" },
    { title: "Marketplace", href: "/marketplace", icon: ShoppingBag, color: "bg-primary/15 text-primary" },
    { title: "Cab Pool", href: "/cab-pool", icon: Car, color: "bg-chart-2/15 text-chart-2" },
    { title: "Nearby Hub", href: "/nearby", icon: MapPin, color: "bg-destructive/15 text-destructive" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}, Rahul
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {"Here's what's happening on campus today."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStatCard icon={Mail} label="Unread Mails" value={String(unreadEmails.length)} sub="3 high priority" color="bg-primary/15 text-primary" />
        <QuickStatCard icon={BookOpen} label="Pending Tasks" value={String(pendingAssignments.length)} sub="2 due this week" color="bg-chart-3/15 text-chart-3" />
        <QuickStatCard icon={TrendingUp} label="Attendance" value="85%" sub="Across 3 courses" color="bg-chart-2/15 text-chart-2" />
        <QuickStatCard icon={AlertTriangle} label="Alerts" value="1" sub="Water disruption" color="bg-destructive/15 text-destructive" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${link.color}`}>
                  <link.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{link.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UpcomingClassesWidget timetable={timetable} />
        <CurrentMealWidget menu={menu} />
        <UnreadMailsWidget emails={emails} />
        <AnnouncementsWidget announcements={announcements} />
        <AcademicProgressWidget courses={courses} />
      </div>
    </div>
  )
}
