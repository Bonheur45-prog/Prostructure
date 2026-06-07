// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/App.jsx
// Root component — sections added one by one as built
// ============================================

import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import PageLoader from './components/ui/PageLoader/PageLoader'
import Hero         from '@sections/Hero/Hero'
import About        from '@sections/About/About'


// Sections imported below as we build them:
// import TrustBar     from '@sections/TrustBar/TrustBar'

// import Services     from '@sections/Services/Services'
// import Projects     from '@sections/Projects/Projects'
// import Process      from '@sections/Process/Process'
// import WhyUs        from '@sections/WhyUs/WhyUs'
// import Testimonials from '@sections/Testimonials/Testimonials'
// import FAQ          from '@sections/FAQ/FAQ'
// import Contact      from '@sections/Contact/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader for 1.8s then reveal the site
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <PageLoader />

  return (
    <Layout>
      <Hero />
      <About />
      {/* Sections added here as we build them */}
    </Layout>
  )
}
