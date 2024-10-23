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

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [hideHeader, setHideHeader] = useState(false)

  return (
    <>
      <GlobalStyles />
      {isHomePage && <MasonryBackground itemCount={20} />}
      <Layout isHomePage={isHomePage} hideHeader={hideHeader}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery setHideHeader={setHideHeader} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/book" element={<Book />} />
            <Route path="/experimental" element={<Experimental />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <RetroEffect />
    </>
  )
}

export default App
