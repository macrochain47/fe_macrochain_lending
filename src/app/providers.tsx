// app/providers.jsx

'use client'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'next-themes'

export function Providers({ children } : {
    children: React.ReactNode
}) {

  const cache = createCache();

  return (
    <StyleProvider cache={cache}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </StyleProvider>
  )
}