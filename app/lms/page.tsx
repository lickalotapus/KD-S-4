"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  TrendingUp,
  User,
  Calendar,
  Award,
  BarChart3,
  Upload,
} from "lucide-react"
import { type Course, type Assignment, getCourses } from "@/lib/mock-data"

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  pending: { icon: Clock, color: "bg-chart-3/15 text-chart-3", label: "Pending" },
  submitted: { icon: CheckCircle2, color: "bg-primary/15 text-primary", label: "Submitted" },
  graded: { icon: Star, color: "bg-chart-2/15 text-chart-2", label: "Graded" },
}

function CourseCard({ course, isSelected, onClick }: { course: Course; isSelected: boolean; onClick: () => void }) {
  const attendanceColor = course.attendance >= 85 ? "text-chart-2" : course.attendance >= 75 ? "text-chart-3" : "text-destructive"

  return (
    <Card
      className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : "hover:border-primary/40"}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-mono">{course.code}</Badge>
              {course.grade && (
                <Badge variant="secondary" className="text-xs bg-chart-2/15 text-chart-2 border-0">
                  {course.grade}
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-semibold mt-1.5">{course.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <User className="h-3 w-3" />
              {course.instructor}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">{course.credits} credits</p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Attendance</span>
            <span className={`font-semibold ${attendanceColor}`}>{course.attendance}%</span>
          </div>
          <Progress value={course.attendance} className="h-1.5" />
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {course.assignments.filter((a) => a.status === "pending").length} pending
          </span>
          <span className="text-xs text-muted-foreground">
            {course.assignments.length} total assignments
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const config = statusConfig[assignment.status] || statusConfig.pending
  const StatusIcon = config.icon
  const isOverdue = assignment.status === "pending" && new Date(assignment.dueDate) < new Date()

  return (
    <Card className={`transition-all ${isOverdue ? "border-destructive/30" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
            <StatusIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{assignment.title}</h3>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 border-0 ${config.color}`}>
                    {config.label}
                  </Badge>
                  {isOverdue && (
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                      Overdue
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{assignment.courseCode}</p>
              </div>
              {assignment.grade && assignment.maxGrade && (
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold">{assignment.grade}/{assignment.maxGrade}</p>
                  <p className="text-[10px] text-muted-foreground">Score</p>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{assignment.description}</p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Due: {new Date(assignment.dueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
              {assignment.submittedAt && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Upload className="h-3 w-3" />
                  Submitted: {new Date(assignment.submittedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                </span>
              )}
            </div>
            {assignment.status === "pending" && (
              <Button size="sm" className="mt-3 h-7 text-xs gap-1">
                <Upload className="h-3 w-3" />
                Submit Assignment
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LMSPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data)
      if (data.length > 0) setSelectedCourse(data[0].id)
    })
  }, [])

  const selected = courses.find((c) => c.id === selectedCourse)
  const allAssignments = courses.flatMap((c) => c.assignments)
  const pendingCount = allAssignments.filter((a) => a.status === "pending").length
  const submittedCount = allAssignments.filter((a) => a.status === "submitted").length
  const gradedCount = allAssignments.filter((a) => a.status === "graded").length
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          LMS Lite
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your courses, assignments, and academic progress.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{courses.length}</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{gradedCount}</p>
              <p className="text-xs text-muted-foreground">Graded</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-4/15 text-chart-4">
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{totalCredits}</p>
              <p className="text-xs text-muted-foreground">Credits</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Your Courses</h2>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isSelected={course.id === selectedCourse}
              onClick={() => setSelectedCourse(course.id)}
            />
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selected.name}</h2>
                  <p className="text-xs text-muted-foreground">{selected.code} &middot; {selected.instructor}</p>
                </div>
                <Badge variant="secondary" className="bg-chart-2/15 text-chart-2 border-0 text-sm">
                  Grade: {selected.grade}
                </Badge>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All ({selected.assignments.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="submitted">Submitted</TabsTrigger>
                  <TabsTrigger value="graded">Graded</TabsTrigger>
                </TabsList>
                {["all", "pending", "submitted", "graded"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-4 space-y-3">
                    {selected.assignments
                      .filter((a) => tab === "all" || a.status === tab)
                      .map((assignment) => (
                        <AssignmentCard key={assignment.id} assignment={assignment} />
                      ))}
                    {selected.assignments.filter((a) => tab === "all" || a.status === tab).length === 0 && (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No {tab} assignments.</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Select a course to view assignments.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
