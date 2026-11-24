import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProductDetailRoute = () => {
  const { id } = useParams();

  return <ProductDetailPage key={id} />;
};

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="wedding-site-background min-h-screen flex flex-col bg-wedora-cream text-wedora-dark selection:bg-wedora-gold/30">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Customer Facing Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/product/:id" element={<ProductDetailRoute />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Portal Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
