import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Parties & Special Events",
  description: "Book your Nerf birthday party or special event with Rochester Foam Dart League. We offer Basic, Rival Operator, and Dart Zone Pro packages for up to 200 guests.",
}

export default function PartiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

