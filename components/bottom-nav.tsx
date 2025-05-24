"use client"

import { Home, Plus, MessageCircle, Calendar, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

const BottomNav = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/create", icon: Plus, label: "Create" },
    { href: "/chats", icon: MessageCircle, label: "Chats" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          )
        })}
        <div className="flex flex-col items-center p-2">
          <ThemeToggle />
          <span className="text-xs mt-1 text-muted-foreground">Theme</span>
        </div>
      </div>
    </nav>
  )
}

export { BottomNav }
export default BottomNav
