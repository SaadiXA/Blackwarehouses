// Cinematic Animation System
// This file creates breathtaking animations without modifying existing HTML structure

class CinematicAnimations {
  constructor() {
    this.isInitialized = false;
    this.threeScene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = [];
    this.scrollProgress = 0;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    this.initThreeJS();
    this.initGSAP();
    this.initScrollAnimations();
    this.initBackgroundAnimations();
    this.initTextAnimations();
    this.initParticleSystem();
    this.initMicroInteractions();
    this.isInitialized = true;
  }

  initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    this.threeScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create floating geometry particles
    this.createFloatingGeometry();
    
    // Camera position
    this.camera.position.z = 5;
    
    // Animation loop
    this.animate();
    
    // Resize handler
    window.addEventListener('resize', () => this.onWindowResize());
  }

  createFloatingGeometry() {
    const geometries = [
      new THREE.RingGeometry(0.1, 0.2, 6),
      new THREE.CircleGeometry(0.1, 8),
      new THREE.PlaneGeometry(0.2, 0.2),
    ];

    const material = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material.clone());
      
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 10;
      
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      
      mesh.userData = {
        initialX: mesh.position.x,
        initialY: mesh.position.y,
        initialZ: mesh.position.z,
        speed: 0.5 + Math.random() * 0.5,
        amplitude: 0.5 + Math.random() * 1.5
      };

      this.particles.push(mesh);
      this.threeScene.add(mesh);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    const time = Date.now() * 0.001;
    
    // Animate particles
    this.particles.forEach((particle, index) => {
      const userData = particle.userData;
      
      particle.position.y = userData.initialY + Math.sin(time * userData.speed + index) * userData.amplitude;
      particle.position.x = userData.initialX + Math.cos(time * userData.speed * 0.5 + index) * userData.amplitude * 0.5;
      
      particle.rotation.x += 0.002;
      particle.rotation.y += 0.001;
      
      // Scroll-based opacity
      particle.material.opacity = 0.05 + (Math.sin(time + index) * 0.02) + (this.scrollProgress * 0.03);
    });
    
    // Subtle camera movement based on scroll
    this.camera.position.x = Math.sin(time * 0.1) * 0.1;
    this.camera.position.y = Math.cos(time * 0.15) * 0.1 + (this.scrollProgress * 0.5);
    
    this.renderer.render(this.threeScene, this.camera);
  }

  initGSAP() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states for elements that will animate on load
    gsap.set("h1, h2, h3", { y: 50, opacity: 0 });
    gsap.set("p, .service-card, .gallery-item", { y: 30, opacity: 0 });
    gsap.set(".cta-button", { scale: 0.8, opacity: 0 });
    
    // Page load master timeline
    const masterTl = gsap.timeline();
    
    // Stagger text animations
    masterTl
      .to("h1", { 
        duration: 1.2, 
        y: 0, 
        opacity: 1, 
        ease: "power3.out",
        stagger: 0.1 
      })
      .to("h2, h3", { 
        duration: 0.8, 
        y: 0, 
        opacity: 1, 
        ease: "power2.out",
        stagger: 0.05 
      }, "-=0.6")
      .to("p", { 
        duration: 0.6, 
        y: 0, 
        opacity: 1, 
        ease: "power2.out",
        stagger: 0.02 
      }, "-=0.4")
      .to(".cta-button", { 
        duration: 0.8, 
        scale: 1, 
        opacity: 1, 
        ease: "back.out(1.7)",
        stagger: 0.1 
      }, "-=0.3");
  }

  initScrollAnimations() {
    // Smooth scroll progress
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
        
        // Update scroll progress bar
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
          gsap.to(progressBar, {
            scaleX: self.progress,
            duration: 0.1,
            ease: "none"
          });
        }
      }
    });

    // Parallax backgrounds
    gsap.to("#ambient-bg-1", {
      y: -100,
      scrollTrigger: {
        trigger: "body",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to("#ambient-bg-2", {
      y: 100,
      rotation: 5,
      scrollTrigger: {
        trigger: "body",
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });

    // Section-based animations
    this.animateOnScroll(".service-card", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    this.animateOnScroll(".gallery-item", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.7)"
    });

    // Infinite scrolling text effect for company name
    this.createScrollingText();
  }

  animateOnScroll(selector, animation) {
    gsap.set(selector, { y: 50, opacity: 0, scale: 0.95 });
    
    ScrollTrigger.batch(selector, {
      onEnter: (elements) => {
        gsap.to(elements, {
          ...animation,
          overwrite: true
        });
      },
      onLeave: (elements) => {
        gsap.set(elements, { opacity: 0.3 });
      },
      onEnterBack: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
  }

  initBackgroundAnimations() {
    // Dynamic gradient shifts
    const heroSection = document.getElementById('home');
    if (heroSection) {
      gsap.to(heroSection, {
        backgroundPosition: "200% center",
        duration: 20,
        ease: "none",
        repeat: -1
      });
    }

    // Ambient light movements
    gsap.to("#ambient-bg-1", {
      background: "radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)",
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    gsap.to("#ambient-bg-2", {
      background: "radial-gradient(circle at 20% 80%, rgba(255, 165, 0, 0.12) 0%, transparent 50%)",
      duration: 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  initTextAnimations() {
    // Typewriter effect for main headings
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      const text = mainHeading.textContent;
      mainHeading.textContent = '';
      
      gsap.to(mainHeading, {
        duration: text.length * 0.05,
        text: text,
        ease: "none",
        delay: 0.5
      });
    }

    // Floating letter animations
    this.createFloatingLetters();
  }

  createFloatingLetters() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach(heading => {
      const text = heading.textContent;
      const letters = text.split('');
      
      heading.innerHTML = letters.map((letter, index) => 
        `<span class="floating-letter" style="display: inline-block; transform-origin: center bottom;">${letter === ' ' ? '&nbsp;' : letter}</span>`
      ).join('');

      const spans = heading.querySelectorAll('.floating-letter');
      
      spans.forEach((span, index) => {
        gsap.to(span, {
          y: -3,
          duration: 1.5 + Math.random() * 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1
        });
      });
    });
  }

  initParticleSystem() {
    // Create floating particles that respond to scroll
    const particleContainer = document.createElement('div');
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

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      
      particleContainer.appendChild(particle);
      
      // Animate particle
      gsap.to(particle, {
        y: -window.innerHeight - 100,
        x: `+=${-50 + Math.random() * 100}`,
        duration: 10 + Math.random() * 20,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 5
      });
      
      // Opacity animation
      gsap.to(particle, {
        opacity: 0.2 + Math.random() * 0.6,
        duration: 2 + Math.random() * 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }

  initMicroInteractions() {
    // Cards hover without actual hover
    const cards = document.querySelectorAll('.service-card, .gallery-item');
    
    cards.forEach((card, index) => {
      // Subtle breathing animation
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
        boxShadow: "0 10px 40px rgba(255, 215, 0, 0.1)",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
    });

    // Buttons pulse animation
    const buttons = document.querySelectorAll('button, .cta-button');
    
    buttons.forEach((button, index) => {
      gsap.to(button, {
        scale: 1.05,
        duration: 2,
        ease: "sine.inOut", 
        repeat: -1,
        yoyo: true,
        delay: index * 0.4
      });
    });
  }

  createScrollingText() {
    // Create infinite scrolling company name in background
    const scrollText = document.createElement('div');
    scrollText.style.cssText = `
      position: fixed;
      top: 50%;
      left: 0;
      width: 200%;
      font-size: 15vw;
      font-weight: 900;
      color: rgba(255, 215, 0, 0.03);
      white-space: nowrap;
      pointer-events: none;
      z-index: 0;
      font-family: 'Cairo', sans-serif;
      transform: translateY(-50%);
    `;
    scrollText.textContent = 'المستودعات السوداء • المستودعات السوداء • ';
    document.body.appendChild(scrollText);
    
    gsap.to(scrollText, {
      x: '-50%',
      duration: 30,
      ease: "none",
      repeat: -1
    });
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialize animations
export default CinematicAnimations;