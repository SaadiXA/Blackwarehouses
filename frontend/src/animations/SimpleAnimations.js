// Simple Animation System - Embedded inline to avoid import issues
// Creates breathtaking animations without external dependencies

(function() {
  'use strict';

  // Wait for DOM and GSAP to be ready
  function initAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded, retrying...');
      setTimeout(initAnimations, 500);
      return;
    }

    console.log('🎬 Initializing cinematic animations...');

    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. FLOATING PARTICLES SYSTEM
    createFloatingParticles();

    // 2. SCROLL PROGRESS BAR
    initScrollProgress();

    // 3. TEXT REVEAL ANIMATIONS
    initTextAnimations();

    // 4. BACKGROUND GRADIENTS
    initBackgroundAnimations();

    // 5. CARD BREATHING EFFECTS
    initCardAnimations();

    // 6. SCROLL-TRIGGERED ANIMATIONS
    initScrollAnimations();

    // 7. AMBIENT LIGHTING
    createAmbientLighting();

    console.log('✅ All animations initialized successfully');
  }

  function createFloatingParticles() {
    // Create floating particles container
    const particleContainer = document.createElement('div');
    particleContainer.id = 'floating-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create 30 floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 6}px;
        height: ${2 + Math.random() * 6}px;
        background: radial-gradient(circle, rgba(255, 215, 0, ${0.4 + Math.random() * 0.4}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${100 + Math.random() * 50}%;
        filter: blur(1px);
      `;
      
      particleContainer.appendChild(particle);
      
      // Animate particle floating up
      gsap.to(particle, {
        y: -(window.innerHeight + 200),
        x: `+=${-100 + Math.random() * 200}`,
        rotation: 360,
        duration: 15 + Math.random() * 25,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 10
      });
      
      // Pulsing opacity
      gsap.to(particle, {
        opacity: 0.2 + Math.random() * 0.8,
        duration: 2 + Math.random() * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }

  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    });

    // Add glow animation
    gsap.to(progressBar, {
      boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  function initTextAnimations() {
    // Animate main headings on page load
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach((heading, index) => {
      // Set initial state
      gsap.set(heading, { y: 50, opacity: 0 });
      
      // Animate in
      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: 1 + (index * 0.2),
        ease: "power3.out",
        delay: 0.5 + (index * 0.3)
      });

      // Add floating letter effect
      const text = heading.textContent;
      const letters = text.split('').map(letter => 
        `<span style="display: inline-block; transform-origin: center bottom;">${letter === ' ' ? '&nbsp;' : letter}</span>`
      ).join('');
      
      heading.innerHTML = letters;
      
      const letterSpans = heading.querySelectorAll('span');
      letterSpans.forEach((span, letterIndex) => {
        gsap.to(span, {
          y: -2,
          duration: 1.5 + Math.random() * 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: letterIndex * 0.1
        });
      });
    });

    // Animate paragraphs with stagger
    const paragraphs = document.querySelectorAll('p');
    gsap.set(paragraphs, { y: 30, opacity: 0 });
    gsap.to(paragraphs, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: 2
    });
  }

  function initBackgroundAnimations() {
    // Create dynamic gradient backgrounds
    const ambientBg1 = document.getElementById('ambient-bg-1');
    const ambientBg2 = document.getElementById('ambient-bg-2');

    if (ambientBg1) {
      gsap.to(ambientBg1, {
        background: "radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(ambientBg1, {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1
      });
    }

    if (ambientBg2) {
      gsap.to(ambientBg2, {
        background: "radial-gradient(circle at 20% 80%, rgba(255, 165, 0, 0.12) 0%, transparent 50%)",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(ambientBg2, {
        rotation: -360,
        duration: 80,
        ease: "none",
        repeat: -1
      });
    }
  }

  function initCardAnimations() {
    // Add breathing animation to cards
    const cards = document.querySelectorAll('.service-card, .gallery-item, [class*="card"]');
    
    cards.forEach((card, index) => {
      // Breathing effect
      gsap.to(card, {
        scale: 1.02,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });

      // Glow effect
      gsap.to(card, {
        boxShadow: "0 20px 60px rgba(255, 215, 0, 0.1)",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });

      // Hover simulation (touchless)
      gsap.to(card, {
        y: -5,
        duration: 4 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.7
      });
    });
  }

  function initScrollAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;

    // Parallax scrolling elements
    const parallaxElements = document.querySelectorAll('.service-card, .gallery-item, h2, h3');
    
    parallaxElements.forEach((element, index) => {
      gsap.fromTo(element, {
        y: 100,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          stagger: 0.2
        }
      });
    });

    // Create infinite scrolling company name
    createScrollingText();
  }

  function createScrollingText() {
    const scrollText = document.createElement('div');
    scrollText.style.cssText = `
      position: fixed;
      top: 50%;
      left: 0;
      width: 300%;
      font-size: 12vw;
      font-weight: 900;
      color: rgba(255, 215, 0, 0.02);
      white-space: nowrap;
      pointer-events: none;
      z-index: 0;
      font-family: 'Cairo', sans-serif;
      transform: translateY(-50%);
    `;
    scrollText.textContent = 'المستودعات السوداء • المستودعات السوداء • المستودعات السوداء • ';
    document.body.appendChild(scrollText);
    
    gsap.to(scrollText, {
      x: '-33.333%',
      duration: 40,
      ease: "none",
      repeat: -1
    });
  }

  function createAmbientLighting() {
    // Create aurora-like background effect
    const aurora = document.createElement('div');
    aurora.style.cssText = `
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(ellipse at 20% 70%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 30%, rgba(255, 165, 0, 0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 40%, rgba(255, 193, 7, 0.04) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    `;
    
    document.body.appendChild(aurora);
    
    // Animate aurora
    gsap.to(aurora, {
      rotation: 360,
      duration: 120,
      ease: "none",
      repeat: -1
    });

    gsap.to(aurora, {
      scale: 1.3,
      duration: 25,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    setTimeout(initAnimations, 100);
  }

})();