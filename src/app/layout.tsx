import "./globals.css"

export const metadata = {
  title: "Kanban App",
  description: "A simple kanban app built with Next.js and Tailwind CSS.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-zinc-200 overflow-y-hidden">{children}</body>
    </html>
  )
}
