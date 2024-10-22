import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Book from './pages/Book'
import GlobalStyles from './styles/GlobalStyles'
import MasonryBackground from './components/MasonryBackground'
import RetroEffect from './components/RetroEffect'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [retroEffectEnabled, setRetroEffectEnabled] = useState(true)

  return (
    <>
      <GlobalStyles />
      {isHomePage && <MasonryBackground itemCount={20} />}
      <Layout isHomePage={isHomePage}>
        <button onClick={() => setRetroEffectEnabled(!retroEffectEnabled)}>
          Toggle Retro Effect
        </button>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <RetroEffect isEnabled={retroEffectEnabled} />
    </>
  )
}

export default App
