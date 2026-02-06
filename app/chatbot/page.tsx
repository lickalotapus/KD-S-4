"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Sparkles,
  Utensils,
  Calendar,
  MapPin,
  ShoppingBag,
  BookOpen,
  Zap,
  User,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestionChips = [
  { label: "Today's mess menu", icon: Utensils },
  { label: "My classes today", icon: Calendar },
  { label: "Places near campus", icon: MapPin },
  { label: "Pending assignments", icon: BookOpen },
  { label: "Available cab pools", icon: ShoppingBag },
]

// Simulated AI responses based on keywords
function getAIResponse(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes("mess") || lower.includes("menu") || lower.includes("food") || lower.includes("lunch") || lower.includes("dinner")) {
    return "Here's today's mess schedule:\n\n**Breakfast** (7:30-9:30 AM): Aloo Paratha, Curd, Boiled Eggs, Toast & Butter, Tea/Coffee\n**Lunch** (12:00-2:00 PM): Rajma Chawal, Chicken Curry, Mixed Veg, Roti, Gulab Jamun\n**Snacks** (4:30-6:00 PM): Samosa, Tea, Biscuits\n**Dinner** (7:30-9:30 PM): Paneer Butter Masala, Fish Fry, Dal Tadka, Naan, Ice Cream\n\nLunch is rated 3.8/5 today. Would you like nutritional details for any meal?"
  }

  if (lower.includes("class") || lower.includes("timetable") || lower.includes("schedule") || lower.includes("lecture")) {
    return "Here are today's classes (Friday):\n\n1. **Data Structures & Algorithms** - 09:00-10:00, LH-1 (Dr. Sharma)\n2. **Linear Algebra** - 11:00-12:00, LH-3 (Dr. Gupta)\n\nYou have 2 classes today with no cancellations. Your next class is DSA at 9 AM. Need help finding the lecture hall?"
  }

  if (lower.includes("nearby") || lower.includes("place") || lower.includes("eat") || lower.includes("cafe") || lower.includes("restaurant")) {
    return "Here are some popular spots near campus:\n\n1. **Chai Point** (0.5 km) - Budget-friendly, study-friendly. Rating: 4.3/5. Student discount available!\n2. **The Study Nook** (0.8 km) - Quiet workspace with great coffee. Rating: 4.5/5\n3. **Satluj View Restaurant** (1.2 km) - Great river view. Rating: 4.1/5\n4. **Tandoori Nights** (1.8 km) - Premium tandoori. Rating: 4.4/5\n\nWould you like directions to any of these?"
  }

  if (lower.includes("assignment") || lower.includes("pending") || lower.includes("homework") || lower.includes("due")) {
    return "You have **4 pending assignments**:\n\n1. **Binary Tree Operations** (CS201) - Due Feb 20\n2. **Graph Algorithms** (CS201) - Due Mar 5\n3. **Eigenvalues & Eigenvectors** (MA201) - Due Feb 22\n4. **Flip-Flop Circuits** (EE201) - Due Feb 25\n\nThe Binary Tree assignment is due first. Would you like me to help you plan your study schedule?"
  }

  if (lower.includes("cab") || lower.includes("ride") || lower.includes("travel") || lower.includes("pool")) {
    return "Here are available cab pools:\n\n1. **IIT Ropar to Chandigarh** - Feb 7, 6 AM (2 seats, Rs 350/seat)\n2. **IIT Ropar to Delhi** - Feb 8, 5:30 AM (3 seats, Rs 600/seat)\n3. **IIT Ropar to Rupnagar** - Today, 4 PM (2 seats, Rs 100/seat)\n\nWould you like to join any of these rides?"
  }

  if (lower.includes("lost") || lower.includes("found")) {
    return "Recent Lost & Found updates:\n\n**Lost Items:**\n- Blue JBL Headphones (near Library) - Feb 5\n- Black Leather Wallet (Sports Complex) - Feb 4\n\n**Found Items:**\n- Student ID Card (Main Cafeteria) - Today\n- TI-84 Calculator (Lecture Hall 3) - Today\n\nHave you lost or found something? I can help you file a report."
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I'm your Nexus AI Assistant. I can help you with:\n\n- **Mess menu** - What's being served today\n- **Timetable** - Your class schedule\n- **Assignments** - Pending tasks and deadlines\n- **Nearby places** - Restaurants, cafes, study spots\n- **Cab pools** - Available rides\n- **Lost & Found** - Report or find items\n\nWhat would you like to know?"
  }

  return "I can help you navigate campus life! Try asking me about:\n\n- Today's mess menu or meal ratings\n- Your class schedule and cancellations\n- Pending assignments and deadlines\n- Nearby restaurants and study spots\n- Available cab pool rides\n- Lost and found items\n\nWhat would you like to know?"
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Nexus AI assistant. I can help you navigate campus life, check your schedule, find nearby spots, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(messageText)
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 1200)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="border-b bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              Nexus AI Assistant
              <Badge className="bg-primary/15 text-primary border-0 text-[10px]">
                <Sparkles className="h-3 w-3 mr-0.5" />
                AI
              </Badge>
            </h1>
            <p className="text-xs text-muted-foreground">
              Your intelligent campus companion
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={`text-xs ${
                message.role === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {message.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={i} className="font-semibold">{line.replace(/\*\*/g, "")}</p>
                  }
                  const parts = line.split(/(\*\*.*?\*\*)/g)
                  return (
                    <p key={i}>
                      {parts.map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  )
                })}
              </div>
              <p className={`text-[10px] mt-1.5 ${
                message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
              }`}>
                {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestionChips.map((chip) => (
              <Button
                key={chip.label}
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 bg-transparent"
                onClick={() => handleSend(chip.label)}
              >
                <chip.icon className="h-3.5 w-3.5" />
                {chip.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t bg-card p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about mess menu, classes, nearby places..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          AI responses are simulated. Connect to a backend for real AI integration.
        </p>
      </div>
    </div>
  )
}
