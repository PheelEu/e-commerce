import React from "react";
import { createRoot } from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Store";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
           <App />
         </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
