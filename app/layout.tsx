import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhi',
  description: '',
  generator: '',
  icons: {
    icon: '/ghost.jpg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
