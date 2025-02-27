import Navigation from './components/Navigation'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>tie.ceo - Building a $1B SaaS with AI</title>
        <meta name="description" content="Follow the journey of building a $1B SaaS company as a solo founder using AI" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-roboto">
        <Navigation />
        {children}
      </body>
    </html>
  )
} 