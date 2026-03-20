import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import ProjectDetail from './pages/ProjectDetail'
import Admin from './pages/Admin'
import Write from './pages/Write'
import Edit from './pages/Edit'

function PageTracker() {
  const location = useLocation()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_ID, {
        page_path: location.pathname,
      })
    }
  }, [location])

  return null
}

export default function App() {
  return (
    <>
      <PageTracker />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/write" element={<Write />} />
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}