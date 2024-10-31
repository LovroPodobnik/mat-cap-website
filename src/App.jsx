import React, { useState, useMemo, Suspense } from 'react'
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
import SocialMediaLinks from './components/SocialMediaLinks'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/auth/ProtectedRoute'
import DashboardLayout from './components/admin/DashboardLayout'
import Orders from './pages/admin/Orders'
import OrderDetails from './pages/admin/OrderDetails'
import PerformanceTracker from './components/PerformanceTracker'

function App() {
  const location = useLocation()
  const [hideHeader, setHideHeader] = useState(false)
  
  const { isHomePage, isAdminPage } = useMemo(() => ({
    isHomePage: location.pathname === '/',
    isAdminPage: location.pathname.startsWith('/admin')
  }), [location.pathname])

  const mainRoutes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/gallery', element: <Gallery setHideHeader={setHideHeader} /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/book', element: <Book /> },
    { path: '/login', element: <Login /> }
  ]

  const adminRoutes = [
    { path: '/admin/orders', element: <Orders /> },
    { path: '/admin/orders/:orderId', element: <OrderDetails /> }
  ]

  return (
    <>
      <GlobalStyles />
      <Suspense fallback={null}>
        {process.env.NODE_ENV === 'development' && <PerformanceTracker />}
        <AuthProvider>
          {!isAdminPage ? (
            <>
              {isHomePage && <MasonryBackground itemCount={20} />}
              <Layout 
                isHomePage={isHomePage} 
                hideHeader={hideHeader}
                isAdmin={isAdminPage}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <Routes location={location} key={location.pathname}>
                    {mainRoutes.map(({ path, element }) => (
                      <Route key={path} path={path} element={element} />
                    ))}
                  </Routes>
                </AnimatePresence>
              </Layout>
              <SocialMediaLinks />
            </>
          ) : (
            <ProtectedRoute>
              <DashboardLayout>
                <Routes location={location} key={location.pathname}>
                  {adminRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          )}
        </AuthProvider>
      </Suspense>
    </>
  )
}

export default App
