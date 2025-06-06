"use client"

import { Home, Plus, MessageCircle, Calendar, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BottomNavProps {
  currentPage?: string
}

const BottomNav = ({ currentPage }: BottomNavProps) => {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home", page: "home" },
    { href: "/create", icon: Plus, label: "Create", page: "create" },
    { href: "/chats", icon: MessageCircle, label: "Chats", page: "chats" },
    { href: "/calendar", icon: Calendar, label: "Calendar", page: "calendar" },
    { href: "/profile", icon: User, label: "Profile", page: "profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label, page }) => {
          const isActive = pathname === href || currentPage === page
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-0 ${
                isActive ? "text-red-500" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export { BottomNav }
export default BottomNav
