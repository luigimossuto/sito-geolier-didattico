import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import HomePage from './pages/HomePage';
import WebSiteLayout from './layouts/WebSiteLayout';
import StoreLayout from './layouts/StoreLayout';
import BigliettoLayout from './layouts/BigliettoLayout';
import CheckoutLayout from './layouts/CheckoutLayout';
import ThemeProviders from './providers/ThemeProviders';
import { CartProvider } from './providers/CartContext';
import StorePage from './pages/StorePage';
import ProdottoPage from './pages/ProdottoPage';
import TourPage from './pages/TourPage';
import BigliettoPage from './pages/BigliettoPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import Geolier from './pages/Geolier';
import Contatti from './pages/Contatti';
const router = createBrowserRouter([
  {
    path: "/",
    element: <WebSiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "tour",
        element: <TourPage />,
      },
      {
        path: "geolier",
        element: <Geolier />,
      },
      {
        path: "contatti",
        element: <Contatti />,
      },
    ]
  },
  {
    path: "/tour/:id",
    element: <BigliettoLayout />, // Usa il nuovo layout per la pagina del biglietto
    children: [
      {
        index: true,
        element: <BigliettoPage />
      }
    ]
  },
  {
    path: "/store",
    element: <StoreLayout />,
    children: [
      {
        index: true,
        element: <StorePage />
      },
      {
        path: ':id',
        element: <ProdottoPage />
      },
    ]
  },
  // Aggiungi la nuova route per il checkout
  {
    path: "/checkout",
    element: <CheckoutLayout />,
    children: [
      {
        index: true,
        element: <CheckoutPage />
      },
      {
        path: "payment",
        element: <PaymentPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ThemeProviders>
    <CartProvider>
     <NextUIProvider>
        <RouterProvider router={router} />
     </NextUIProvider>
    </CartProvider>
   </ThemeProviders>
  </React.StrictMode>,
)
