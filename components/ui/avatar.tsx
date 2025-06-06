import type React from "react"

interface AvatarProps {
  className?: string
  children?: React.ReactNode
}

export function Avatar({ className, children }: AvatarProps) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`}>{children}</div>
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <img className={`aspect-square h-full w-full ${className || ""}`} {...props} />
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className || ""}`}
      {...props}
    />
  )
}
