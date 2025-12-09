import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Game Modes",
  description: "Explore all the exciting game modes at Rochester Foam Dart League including Capture the Flag, Team Elimination, Medic, Zombies, and more!",
}

export default function GameModesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

