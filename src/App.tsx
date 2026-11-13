import { useLayoutEffect, useRef } from 'react'
import { initAnimations } from './lib/animations'
import StatusBar from './components/StatusBar'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Expertise from './sections/Expertise'
import Work from './sections/Work'
import Story from './sections/Story'
import Experience from './sections/Experience'
import Principles from './sections/Principles'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  // useLayoutEffect so GSAP sets hidden start states before first paint (no flash).
  // The returned cleanup reverts every tween/ScrollTrigger and tears Lenis down,
  // which also makes React StrictMode's double-mount and Vite HMR safe.
  useLayoutEffect(() => {
    if (!root.current) return
    const mm = initAnimations(root.current)
    return () => mm.revert()
  }, [])

  return (
    <div ref={root}>
      <a
        href="#expertise"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ice focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <StatusBar />
      <Nav />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Story />
        <Experience />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
