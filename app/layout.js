import Navigation from './components/Navigation'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>tie.ceo - Building a $1B SaaS with AI</title>
        <meta name="description" content="Follow the journey of building a $1B SaaS company as a solo founder using AI" />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
} 