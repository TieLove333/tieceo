'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  // This key helps re-mount the ChakraProvider when there are hydration issues
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme} resetCSS={true}>
        {mounted ? children : null}
      </ChakraProvider>
    </CacheProvider>
  )
}
