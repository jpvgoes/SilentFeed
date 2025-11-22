import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../ui/Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;