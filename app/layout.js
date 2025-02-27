import Navigation from './components/Navigation'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>tie.ceo - Building a $1B SaaS with AI</title>
        <meta name="description" content="Follow the journey of building a $1B SaaS company as a solo founder using AI" />
      </head>
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
} 