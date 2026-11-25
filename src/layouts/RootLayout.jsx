import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Ecrit une seule fois ici pour toutes les routes enfants */}
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '28px 16px' }}>
        {/* React Router injecte ici Accueil, ArticleList, ArticleDetail ou ArticleCreate */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}