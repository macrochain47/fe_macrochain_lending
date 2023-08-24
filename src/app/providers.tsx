// app/providers.jsx

'use client'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'next-themes'
import { toast, ToastContainer } from "react-toastify";
import store, {persistor} from '@/state';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children } : {
    children: React.ReactNode
}) {

  const cache = createCache();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StyleProvider cache={cache}>
          {/* <ThemeProvider> */}
            {children}
          {/* </ThemeProvider> */}
        </StyleProvider>
      </PersistGate>
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
    </Provider>
  )
}