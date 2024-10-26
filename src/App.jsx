import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Book from './pages/Book'
import FAQ from './pages/FAQ'
import GlobalStyles from './styles/GlobalStyles'
import MasonryBackground from './components/MasonryBackground'
import RetroEffect from './components/RetroEffect'
import Experimental from './pages/Experimental'
import SocialMediaLinks from './components/SocialMediaLinks'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import DashboardLayout from './components/admin/DashboardLayout'
import Orders from './pages/admin/Orders'
import OrderDetails from './pages/admin/OrderDetails'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isAdminPage = location.pathname.startsWith('/admin')
  const [hideHeader, setHideHeader] = useState(false)

  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        {!isAdminPage ? (
          // Main site layout
          <>
            {isHomePage && <MasonryBackground itemCount={20} />}
            <Layout 
              isHomePage={isHomePage} 
              hideHeader={hideHeader}
              isAdmin={isAdminPage}
            >
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery setHideHeader={setHideHeader} />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/book" element={<Book />} />
                  <Route path="/experimental" element={<Experimental />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </AnimatePresence>
            </Layout>
            <SocialMediaLinks />
            <RetroEffect />
          </>
        ) : (
          // Admin layout
          <ProtectedRoute>
            <DashboardLayout>
              <Routes location={location} key={location.pathname}>
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/orders/:orderId" element={<OrderDetails />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        )}
      </AuthProvider>
    </>
  )
}

export default App
