import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Goals Visualizer',
  description: 'Visualize and achieve your goals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-grain min-h-screen">
        {children}
      </body>
    </html>
  )
}

