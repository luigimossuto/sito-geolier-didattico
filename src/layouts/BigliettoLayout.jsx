import React from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header'; // Assicurati che il percorso sia corretto
import Footer from '../components/Footer'; // Assicurati che il percorso sia corretto

const BigliettoLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra superiore */}
      <div className="bg-titolo-default text-white text-center py-2">
        <Link to="/info-rimborso" className="hover:underline">
          PER INFO E MODALITÀ DI RIMBORSO CLICCA QUI
        </Link>
      </div>

      {/* Header */}
      <Header />

      {/* Contenuto principale */}
      <main className="flex-grow">
        <Outlet />
        <ScrollRestoration />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BigliettoLayout;
