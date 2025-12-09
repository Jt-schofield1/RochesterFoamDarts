import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weekly Games",
  description: "Join Rochester Foam Dart League for weekly public Nerf battles in Rochester, Buffalo, and Syracuse. Ages 5+, $20 per player, all equipment provided!",
}

export default function WeeklyGamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

