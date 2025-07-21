// Advanced Visual Effects System
// Creates stunning visual layers without modifying existing structure

class AdvancedEffects {
  constructor() {
    this.init();
  }

  init() {
    this.createMorphingSVGs();
    this.initLiquidEffects();
    this.createAuroraBackground();
    this.initTextRevealEffects();
    this.createGlassmorphism();
    this.initCountUpAnimations();
    this.createScrollMagnetism();
  }

  createMorphingSVGs() {
    // Create morphing SVG shapes
    const svgContainer = document.createElement('div');
    svgContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    `;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = 'position: absolute; top: 0; left: 0;';

    // Create morphing paths
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Create morphing shapes
    for (let i = 0; i < 5; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', `rgba(255, 215, 0, ${0.1 + Math.random() * 0.2})`);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('filter', 'url(#glow)');
      
      const morphPaths = [
        'M100,200 Q200,100 300,200 T500,200',
        'M100,200 Q250,50 400,200 T600,200',
        'M100,200 Q150,300 300,200 T500,200',
        'M100,200 Q300,150 500,200 T700,200'
      ];
      
      path.setAttribute('d', morphPaths[0]);
      svg.appendChild(path);
      
      // Animate path morphing
      gsap.to(path, {
        duration: 8 + Math.random() * 4,
        repeat: -1,
        ease: "sine.inOut",
        motionPath: {
          path: morphPaths,
          autoRotate: false
        },
        yoyo: true,
        delay: i * 2
      });

      // Position randomly
      gsap.set(path, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5
      });
    }

    svgContainer.appendChild(svg);
    document.body.appendChild(svgContainer);
  }

  initLiquidEffects() {
    // Create liquid blob effects
    const canvas = document.createElement('canvas');
    canvas.id = 'liquid-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.4;
    `;

    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blobs = [];
    for (let i = 0; i < 3; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 100 + Math.random() * 200,
        color: `hsla(${45 + Math.random() * 30}, 80%, 60%, 0.1)`
      });
    }

    const animateBlobs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        
        if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;
        
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animateBlobs);
    };
    
    animateBlobs();

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  createAuroraBackground() {
    // Aurora effect
    const aurora = document.createElement('div');
    aurora.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 120%;
      height: 120%;
      background: 
        radial-gradient(ellipse at 20% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 30%, rgba(255, 165, 0, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 40%, rgba(255, 193, 7, 0.06) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    `;
    
    document.body.appendChild(aurora);
    
    // Animate aurora
    gsap.to(aurora, {
      rotation: 360,
      duration: 60,
      ease: "none",
      repeat: -1
    });

    gsap.to(aurora, {
      scale: 1.2,
      duration: 20,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  initTextRevealEffects() {
    // Add reveal animations to text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    
    textElements.forEach((element, index) => {
      // Create mask overlay for reveal effect
      const mask = document.createElement('div');
      mask.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
        transform: translateX(-100%);
        pointer-events: none;
      `;
      
      // Make element relative if not already positioned
      const computed = window.getComputedStyle(element);
      if (computed.position === 'static') {
        element.style.position = 'relative';
      }
      
      element.appendChild(mask);
      
      // Reveal animation on scroll
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          gsap.to(mask, {
            x: "100%",
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1
          });
        }
      });
    });
  }

  createGlassmorphism() {
    // Add glassmorphism to cards
    const cards = document.querySelectorAll('.service-card, .gallery-item, .contact-info');
    
    cards.forEach(card => {
      // Create glass overlay
      const glass = document.createElement('div');
      glass.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      // Ensure card has relative positioning
      const computed = window.getComputedStyle(card);
      if (computed.position === 'static') {
        card.style.position = 'relative';
      }
      
      card.appendChild(glass);
      
      // Animate glass effect based on scroll position
      ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => gsap.to(glass, { opacity: 1, duration: 0.5 }),
        onLeave: () => gsap.to(glass, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(glass, { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(glass, { opacity: 0, duration: 0.5 })
      });
    });
  }

  initCountUpAnimations() {
    // Animate numbers
    const numbers = document.querySelectorAll('[data-count]');
    
    numbers.forEach(number => {
      const target = parseInt(number.dataset.count || number.textContent);
      number.textContent = '0';
      
      ScrollTrigger.create({
        trigger: number,
        start: "top 80%",
        onEnter: () => {
          gsap.to(number, {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.1
          });
        }
      });
    });
  }

  createScrollMagnetism() {
    // Create magnetic scroll effect for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(section, {
            scale: 1.02,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.to(section, {
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            scale: 1.02,
            duration: 0.8,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });
    });
  }
}

export default AdvancedEffects;