'use client'

// Only import what we need
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Builder } from '@builder.io/react'
import React from 'react'

// Import Builder.io registration
import './register-builder'

// Remove unused import
// import './builder-components'

// Create a minimal theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black'
      }
    }
  }
})

// Ensure Builder.io is initialized
if (typeof window !== 'undefined') {
  // @ts-ignore
  (Builder as any).init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '')
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
} 