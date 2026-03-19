import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const nameRef    = useRef(null)
  const accentRef  = useRef(null)
  const subtitleRef = useRef(null)
  const navRef     = useRef(null)
  const navigate   = useNavigate()

  useEffect(() => {
    const t1 = setTimeout(() => nameRef.current?.classList.add('visible'), 400)
    const t2 = setTimeout(() => accentRef.current?.classList.add('visible'), 800)
    const t3 = setTimeout(() => subtitleRef.current?.classList.add('visible'), 1400)
    const t4 = setTimeout(() => navRef.current?.classList.add('visible'), 2400)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  return (
    <div className="home">
      <div className="home-hero">
        <p className="home-eyebrow">// software engineer</p>
        <h1 className="home-name" ref={nameRef}>// Horidong</h1>
        <div className="home-accent" ref={accentRef} />
        <p className="home-subtitle" ref={subtitleRef}>
          — Software Engineer —
        </p>
        <div className="home-nav" ref={navRef}>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/portfolio')}>Portfolio</button>
          <button onClick={() => navigate('/blog')}>Blog</button>
        </div>
      </div>
    </div>
  )
}