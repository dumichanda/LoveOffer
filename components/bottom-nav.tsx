"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Plus, MessageCircle, User, Settings } from "lucide-react"

const BottomNav = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/create", icon: Plus, label: "Create" },
    { href: "/chats", icon: MessageCircle, label: "Chats" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/admin", icon: Settings, label: "Admin" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50">
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { BottomNav }
export default BottomNav
