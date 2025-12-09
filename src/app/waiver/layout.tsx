import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waiver",
  description: "Complete the digital waiver for Rochester Foam Dart League events. All participants must sign before playing.",
}

export default function WaiverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

