import './globals.css'

export const metadata = {
  title: 'The $1B Solo SaaS Challenge',
  description: 'Documenting the journey of building a solo SaaS business',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 