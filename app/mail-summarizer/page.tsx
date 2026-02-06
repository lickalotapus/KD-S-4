"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  PartyPopper,
  Info,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import { type EmailSummary, getEmails } from "@/lib/mock-data"

const categoryConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  academic: { icon: BookOpen, color: "bg-primary/15 text-primary", label: "Academic" },
  event: { icon: PartyPopper, color: "bg-chart-4/15 text-chart-4", label: "Event" },
  urgent: { icon: AlertTriangle, color: "bg-destructive/15 text-destructive", label: "Urgent" },
  general: { icon: Info, color: "bg-chart-2/15 text-chart-2", label: "General" },
}

const priorityConfig: Record<string, { color: string; label: string }> = {
  high: { color: "bg-destructive/15 text-destructive", label: "High" },
  medium: { color: "bg-chart-3/15 text-chart-3", label: "Medium" },
  low: { color: "bg-secondary text-muted-foreground", label: "Low" },
}

function EmailCard({ email }: { email: EmailSummary }) {
  const [expanded, setExpanded] = useState(false)
  const cat = categoryConfig[email.category] || categoryConfig.general
  const pri = priorityConfig[email.priority] || priorityConfig.low
  const CatIcon = cat.icon

  return (
    <Card className={`transition-all ${!email.isRead ? "border-primary/30 bg-primary/[0.02]" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
            <CatIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-semibold ${!email.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                    {email.from}
                  </p>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${cat.color} border-0`}>
                    {cat.label}
                  </Badge>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${pri.color} border-0`}>
                    {pri.label}
                  </Badge>
                  {!email.isRead && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className={`text-sm mt-1 ${!email.isRead ? "font-medium" : ""}`}>
                  {email.subject}
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                {new Date(email.receivedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
              </span>
            </div>

            <div className="mt-2 rounded-lg bg-secondary/50 p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-primary mb-1">AI Summary</p>
                  <p className="text-sm text-foreground">{email.summary}</p>
                </div>
              </div>
            </div>

            {expanded && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Action Items
                </p>
                <ul className="space-y-1.5">
                  {email.actionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-7 text-xs text-muted-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Show Action Items ({email.actionItems.length})
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MailSummarizerPage() {
  const [emails, setEmails] = useState<EmailSummary[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    getEmails().then(setEmails)
  }, [])

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || email.category === activeTab
    return matchesSearch && matchesTab
  })

  const unreadCount = emails.filter((e) => !e.isRead).length
  const highPriorityCount = emails.filter((e) => e.priority === "high").length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Mail Summarizer
            <Badge className="bg-primary/15 text-primary border-0 text-xs">AI Powered</Badge>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            AI-parsed summaries of your campus emails with extracted action items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{emails.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-3/15 text-chart-3">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{unreadCount}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{highPriorityCount}</p>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-chart-2/15 text-chart-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold">{emails.length}</p>
              <p className="text-xs text-muted-foreground">Summarized</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search emails by subject, sender, or content..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1 shrink-0 bg-transparent">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({emails.length})</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4 space-y-3">
          {filteredEmails.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No emails found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEmails.map((email) => <EmailCard key={email.id} email={email} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
