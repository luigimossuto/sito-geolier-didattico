import React from 'react';
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const InfoContent = () => (
  <div className='flex items-center gap-8'>
    <div className="flex items-center gap-8">
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>Spedizione gratuita dopo 40€</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>acquista vinili, cd, box e merch in esclusiva, anche con 18app</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
    </div>
    <div className="flex items-center gap-8">
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>Spedizione gratuita dopo 40€</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>acquista vinili, cd, box e merch in esclusiva, anche con 18app</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
    </div>
    <div className="flex items-center gap-8">
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>Spedizione gratuita dopo 40€</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-base'>acquista vinili, cd, box e merch in esclusiva, anche con 18app</p>
      <p className='uppercase text-secondario-default dark:text-secondario-default font-bold lg:text-lg'>///</p>
    </div>
  </div>
);

const InfoBar = () => (
  <div className="bg-titolo-default text-white text-sm py-2 overflow-hidden whitespace-nowrap">
    <div className="flex animate-marquee">
      <InfoContent />
      <InfoContent />
    </div>
  </div>
);

const StoreLayout = () => {

  return (
    <div className="relative min-h-screen">
      <InfoBar />
      <Header isStorePage={true} />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </div>
  );
};

export default StoreLayout;
