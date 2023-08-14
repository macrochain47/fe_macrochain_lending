// app/providers.jsx

'use client'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'next-themes'
import { toast, ToastContainer } from "react-toastify";


export function Providers({ children } : {
    children: React.ReactNode
}) {

  const cache = createCache();

  return (
    <StyleProvider cache={cache}>
      <ThemeProvider>
        {children}
        <ToastContainer 
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </ThemeProvider>
    </StyleProvider>
  )
}