"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Utensils,
  Mail,
  Megaphone,
  Search,
  ShoppingBag,
  Car,
  MapPin,
  Calendar,
  GraduationCap,
  Bot,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Daily Pulse",
    items: [
      { title: "Mess Menu", href: "/mess-menu", icon: Utensils },
      { title: "Mail Summarizer", href: "/mail-summarizer", icon: Mail, badge: "AI" },
      { title: "Announcements", href: "/announcements", icon: Megaphone },
    ],
  },
  {
    label: "Student Exchange",
    items: [
      { title: "Lost & Found", href: "/lost-found", icon: Search },
      { title: "Marketplace", href: "/marketplace", icon: ShoppingBag },
      { title: "Cab Pool", href: "/cab-pool", icon: Car },
    ],
  },
  {
    label: "Explorer's Guide",
    items: [
      { title: "Nearby Hub", href: "/nearby", icon: MapPin },
    ],
  },
  {
    label: "Academic Cockpit",
    items: [
      { title: "Timetable", href: "/timetable", icon: Calendar },
      { title: "LMS Lite", href: "/lms", icon: GraduationCap },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold text-sidebar-foreground">Project Nexus</span>
            <span className="text-xs text-sidebar-foreground/60">Campus Super-App</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-primary/15 text-primary text-[10px] px-1.5 py-0 font-semibold"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="AI Assistant">
              <Link href="/chatbot">
                <Bot className="h-4 w-4" />
                <span>AI Assistant</span>
                <Badge
                  variant="secondary"
                  className="ml-auto bg-accent/15 text-accent text-[10px] px-1.5 py-0 font-semibold"
                >
                  AI
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
