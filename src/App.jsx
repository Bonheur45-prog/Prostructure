// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/App.jsx
// Root component with React Router
// ============================================

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import PageLoader from '@components/ui/PageLoader/PageLoader'
import Hero from '@sections/Hero/Hero'
import About from '@sections/About/About'
import Services from '@sections/Services/Services'
import Projects from '@sections/Projects/Projects'
import ProjectDetail from '@pages/ProjectDetail/ProjectDetail'

// import Process      from '@sections/Process/Process'
// import WhyUs        from '@sections/WhyUs/WhyUs'
// import Testimonials from '@sections/Testimonials/Testimonials'
// import FAQ          from '@sections/FAQ/FAQ'
// import Contact      from '@sections/Contact/Contact'

// ── Home page — all sections ──────────────
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      {/* Remaining sections added here as built */}
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <PageLoader />

  return (
    <Routes>
      {/* Main single-page route */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      {/* Project detail page */}
      <Route
        path="/projects/:slug"
        element={
          <Layout>
            <ProjectDetail />
          </Layout>
        }
      />
    </Routes>
  )
}