import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults for smoother animations
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
})

// ScrollTrigger global config
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

// Initialize Lenis smooth scroll — synced with GSAP ticker
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  lerp: 0.08,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
})

// Keep ScrollTrigger in sync with Lenis
lenis.on('scroll', ScrollTrigger.update)

// Drive Lenis through GSAP ticker for frame-perfect sync
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Expose for anchor link interception
window.__lenis = lenis

// Intercept anchor clicks for smooth scroll
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href')
  if (!id || id === '#') return
  const target = document.querySelector(id)
  if (!target) return
  e.preventDefault()
  lenis.scrollTo(target, {
    offset: 0,
    duration: 1.3,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
