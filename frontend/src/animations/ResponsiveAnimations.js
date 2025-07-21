// Responsive Animation Manager
// Ensures animations work perfectly across all devices

class ResponsiveAnimations {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    this.isDesktop = window.innerWidth > 1024;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    this.setupMediaQueries();
    this.optimizeForDevice();
    this.handleReducedMotion();
    this.setupPerformanceOptimizations();
  }

  setupMediaQueries() {
    // Listen for device orientation and size changes
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
    const desktopQuery = window.matchMedia('(min-width: 1025px)');

    mobileQuery.addListener(this.handleDeviceChange.bind(this));
    tabletQuery.addListener(this.handleDeviceChange.bind(this));
    desktopQuery.addListener(this.handleDeviceChange.bind(this));

    // Orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.handleOrientationChange(), 100);
    });
  }

  handleDeviceChange(query) {
    if (query.matches) {
      this.updateDeviceState();
      this.optimizeForDevice();
    }
  }

  updateDeviceState() {
    this.isMobile = window.innerWidth <= 768;
    this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    this.isDesktop = window.innerWidth > 1024;
  }

  optimizeForDevice() {
    if (this.isMobile) {
      this.setupMobileAnimations();
    } else if (this.isTablet) {
      this.setupTabletAnimations();
    } else if (this.isDesktop) {
      this.setupDesktopAnimations();
    }
  }

  setupMobileAnimations() {
    // Reduce animation complexity for mobile
    gsap.globalTimeline.timeScale(0.8); // Slightly slower animations
    
    // Optimize particle count for mobile performance
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index > 15) { // Keep only 15 particles on mobile
        particle.style.display = 'none';
      }
    });

    // Reduce Three.js particles
    if (window.cinematicAnimations && window.cinematicAnimations.particles) {
      window.cinematicAnimations.particles.slice(20).forEach(particle => {
        particle.visible = false;
      });
    }

    // Simpler scroll animations
    ScrollTrigger.batch('.service-card, .gallery-item', {
      onEnter: (elements) => {
        gsap.fromTo(elements, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    // Touch-friendly interactions
    this.setupTouchOptimizations();
  }

  setupTabletAnimations() {
    // Balanced animations for tablets
    gsap.globalTimeline.timeScale(0.9);
    
    // Moderate particle count
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index > 25) {
        particle.style.display = 'none';
      }
    });

    // Enhanced but not full desktop animations
    ScrollTrigger.batch('.service-card', {
      onEnter: (elements) => {
        gsap.fromTo(elements, {
          y: 60,
          opacity: 0,
          scale: 0.9
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)"
        });
      }
    });
  }

  setupDesktopAnimations() {
    // Full animation suite for desktop
    gsap.globalTimeline.timeScale(1);
    
    // All particles visible
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.display = 'block';
    });

    // Enable all Three.js particles
    if (window.cinematicAnimations && window.cinematicAnimations.particles) {
      window.cinematicAnimations.particles.forEach(particle => {
        particle.visible = true;
      });
    }

    // Full complexity animations
    this.setupDesktopParallax();
    this.setupMouseFollowEffects();
  }

  setupDesktopParallax() {
    // Advanced parallax for desktop only
    const parallaxElements = [
      { selector: '.hero-particles', speed: 0.5 },
      { selector: '.service-card', speed: 0.3 },
      { selector: '.gallery-item', speed: 0.7 },
      { selector: 'h1, h2', speed: 0.2 }
    ];

    parallaxElements.forEach(({ selector, speed }) => {
      gsap.to(selector, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  setupMouseFollowEffects() {
    // Mouse cursor effects for desktop
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .service-card, .gallery-item');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
    });
  }

  setupTouchOptimizations() {
    // Touch-specific optimizations
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
      const touchMoveY = e.touches[0].clientY;
      const deltaY = touchStartY - touchMoveY;
      
      // Trigger scroll-based animations on touch
      if (Math.abs(deltaY) > 50) {
        this.triggerTouchScrollAnimations();
      }
    });
  }

  triggerTouchScrollAnimations() {
    // Enhanced animations for touch scrolling
    const visibleElements = document.querySelectorAll('.service-card:not(.animated)');
    
    visibleElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('animated');
        
        gsap.fromTo(element, {
          x: -50,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        });
      }
    });
  }

  handleReducedMotion() {
    if (this.prefersReducedMotion) {
      // Disable complex animations
      gsap.globalTimeline.pause();
      
      // Show static states
      gsap.set('*', { clearProps: 'all' });
      
      // Keep only essential animations
      const essentialAnimations = document.querySelectorAll('.essential-animation');
      essentialAnimations.forEach(element => {
        gsap.set(element, {
          opacity: 1,
          y: 0,
          scale: 1
        });
      });

      // Disable Three.js animations
      if (window.cinematicAnimations && window.cinematicAnimations.threeScene) {
        window.cinematicAnimations.particles.forEach(particle => {
          particle.visible = false;
        });
      }
    }
  }

  handleOrientationChange() {
    // Recalculate and restart animations after orientation change
    ScrollTrigger.refresh();
    
    // Update Three.js canvas size
    if (window.cinematicAnimations) {
      window.cinematicAnimations.onWindowResize();
    }
    
    // Restart particle animations
    this.optimizeForDevice();
  }

  setupPerformanceOptimizations() {
    // Performance monitoring and optimization
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Adjust animations based on FPS
        if (fps < 30) {
          this.reduceAnimationComplexity();
        } else if (fps > 55) {
          this.increaseAnimationComplexity();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
  }

  reduceAnimationComplexity() {
    // Reduce particle count
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index % 2 === 0) {
        particle.style.display = 'none';
      }
    });

    // Reduce animation frequency
    gsap.globalTimeline.timeScale(0.7);
  }

  increaseAnimationComplexity() {
    // Show all particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.display = 'block';
    });

    // Normal animation speed
    gsap.globalTimeline.timeScale(1);
  }
}

export default ResponsiveAnimations;