import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Data stream animations
    const dataStreams = document.querySelectorAll('.data-stream')
    if (dataStreams.length > 0) {
      gsap.set(dataStreams, { y: '100vh', opacity: 0 })
      
      gsap.to(dataStreams, {
        y: '-100vh',
        opacity: 1,
        duration: 8,
        stagger: 2,
        repeat: -1,
        ease: 'none'
      })
    }

    // Enhanced hero section parallax
    const heroElements = document.querySelectorAll('.hero-parallax')
    heroElements.forEach((element, index) => {
      gsap.to(element, {
        y: (index + 1) * -50,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    })

    // Floating tech modules enhanced animation
    const techModules = document.querySelectorAll('.tech-module')
    techModules.forEach((module, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: module,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(module, 
        { 
          y: 100, 
          opacity: 0, 
          rotationX: 45,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out'
        }
      )
    })

    // Central data sphere enhancements
    const dataSphere = document.querySelector('.data-sphere')
    if (dataSphere) {
      gsap.to(dataSphere, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(dataSphere, {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    // Network connections animation
    const networkLines = document.querySelectorAll('.network-line')
    networkLines.forEach((line, index) => {
      gsap.fromTo(line, 
        { 
          strokeDasharray: '5,5',
          strokeDashoffset: 10
        },
        {
          strokeDashoffset: 0,
          duration: 2,
          repeat: -1,
          ease: 'none',
          delay: index * 0.2
        }
      )
    })

    // Section reveal animations
    const sections = document.querySelectorAll('section')
    sections.forEach((section, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      })

      const children = section.querySelectorAll('h2, h3, p, .card, .button')
      tl.fromTo(children, 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      )
    })

    // Enhanced holographic effects
    const holoElements = document.querySelectorAll('.holo-element')
    holoElements.forEach((element) => {
      gsap.to(element, {
        opacity: 0.3,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        repeatDelay: Math.random() * 3
      })
    })

    // Particle system animations
    const particles = document.querySelectorAll('.particle')
    particles.forEach((particle, index) => {
      const tl = gsap.timeline({ repeat: -1 })
      
      tl.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        duration: 5 + Math.random() * 5,
        ease: 'none'
      })
      .to(particle, {
        opacity: 0.2,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0)
      .to(particle, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 2.5)
    })

    // Star Trek LCARS-style sliding panels
    const panels = document.querySelectorAll('.lcars-panel')
    panels.forEach((panel, index) => {
      gsap.fromTo(panel,
        { x: index % 2 === 0 ? -300 : 300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Enhanced 3D Solar System scroll effects
    const solarSystemContainer = document.querySelector('.solar-system-container')
    if (solarSystemContainer) {
      gsap.to(solarSystemContainer, {
        rotationY: 360,
        scrollTrigger: {
          trigger: solarSystemContainer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    }

    // 3D Planet reveal animations
    const planets = document.querySelectorAll('.tech-planet')
    planets.forEach((planet, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: planet,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(planet, 
        { 
          scale: 0,
          rotationY: -180,
          opacity: 0,
          z: -200
        },
        { 
          scale: 1,
          rotationY: 0,
          opacity: 1,
          z: 0,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: index * 0.2
        }
      )
    })

    // Cosmic energy beam effects
    const energyBeams = document.querySelectorAll('.energy-beam')
    energyBeams.forEach((beam, index) => {
      gsap.fromTo(beam, 
        { 
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'left center'
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          delay: index * 0.3,
          scrollTrigger: {
            trigger: beam,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Holographic UI elements
    const holoUI = document.querySelectorAll('.holo-ui')
    holoUI.forEach((element, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(element, 
        { 
          y: 50,
          opacity: 0,
          filter: 'blur(10px)',
          scale: 0.8
        },
        { 
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        }
      )
      .to(element, {
        boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.5')
    })

    // Starship warp effect
    const warpElements = document.querySelectorAll('.warp-effect')
    warpElements.forEach((element) => {
      gsap.to(element, {
        x: '200vw',
        duration: 0.5,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: element,
          start: 'top 50%',
          toggleActions: 'play none none none'
        }
      })
    })

    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      gsap.to('.parallax-layer-1', {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: 'power2.out'
      })

      gsap.to('.parallax-layer-2', {
        x: x * 40,
        y: y * 40,
        duration: 1.5,
        ease: 'power2.out'
      })

      gsap.to('.parallax-layer-3', {
        x: x * 60,
        y: y * 60,
        duration: 2,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Mountain parallax effects
    const mountainElements = document.querySelectorAll('.mountain-layer')
    mountainElements.forEach((mountain, index) => {
      gsap.to(mountain, {
        y: (index + 1) * -30,
        x: (index + 1) * -10,
        scrollTrigger: {
          trigger: mountain,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    })

    // Snow particle enhanced animations
    const snowParticles = document.querySelectorAll('.snow-particle')
    snowParticles.forEach((particle, index) => {
      const tl = gsap.timeline({ repeat: -1 })
      
      tl.to(particle, {
        y: '100vh',
        x: Math.sin(index) * 50,
        rotation: 360,
        duration: 8 + Math.random() * 4,
        ease: 'none'
      })
      .set(particle, { y: '-10vh', x: Math.random() * window.innerWidth })
    })

    // 3D tech logo floating animations
    const techLogos = document.querySelectorAll('.tech-logo-3d')
    techLogos.forEach((logo, index) => {
      gsap.to(logo, {
        y: Math.sin(index * 2) * 20,
        x: Math.cos(index * 2) * 15,
        rotation: 360,
        duration: 10 + index * 2,
        repeat: -1,
        ease: 'none'
      })
    })

    // Mountain backdrop reveal
    const mountainBackdrops = document.querySelectorAll('.mountain-backdrop')
    mountainBackdrops.forEach((backdrop, index) => {
      gsap.fromTo(backdrop, 
        { 
          scale: 1.2,
          opacity: 0,
          filter: 'blur(5px)'
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: backdrop,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // 3D card hover effects
    const cards3D = document.querySelectorAll('.card-3d')
    cards3D.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          rotationY: 5,
          rotationX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
      
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    })

    // Enhanced environmental effects
    const environmentalElements = document.querySelectorAll('.environmental-effect')
    environmentalElements.forEach((element, index) => {
      gsap.to(element, {
        opacity: 0.3 + Math.sin(index * 0.5) * 0.2,
        scale: 1 + Math.sin(index * 0.3) * 0.1,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    })

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { scope: containerRef })

  return <div ref={containerRef} className="scroll-animations-container" />
}

export function useScrollAnimation(selector: string, animation: gsap.TweenVars, trigger?: ScrollTrigger.Vars) {
  useGSAP(() => {
    const elements = document.querySelectorAll(selector)
    
    if (elements.length > 0) {
      if (trigger) {
        gsap.to(elements, {
          ...animation,
          scrollTrigger: {
            trigger: elements[0],
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...trigger
          }
        })
      } else {
        gsap.to(elements, animation)
      }
    }
  })
}