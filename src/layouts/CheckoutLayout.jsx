import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const CheckoutLayout = () => {
  return (
    <div className="checkout-layout">
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default CheckoutLayout;
