      // Mobile Menu Toggle
      const menuBtn = document.querySelector('.menu-btn');
      const navLinks = document.querySelector('.nav-links');

      menuBtn.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          menuBtn.innerHTML = navLinks.classList.contains('active') ? 
              '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });

      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth <= 768) {
                  navLinks.classList.remove('active');
                  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
              }
          });
      });

      // Navbar scroll effect
      window.addEventListener('scroll', () => {
          const navbar = document.getElementById('navbar');
          if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
              });
          });
      });

      // Form submission
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
          contactForm.addEventListener('submit', (e) => {
              e.preventDefault();
              const submitBtn = contactForm.querySelector('.submit-btn');
              submitBtn.innerHTML = 'Sending...';
              submitBtn.disabled = true;
              
              // Simulate form submission
              setTimeout(() => {
                  submitBtn.innerHTML = 'Message Sent!';
                  setTimeout(() => {
                      submitBtn.innerHTML = 'Send Message';
                      submitBtn.disabled = false;
                      contactForm.reset();
                  }, 2000);
              }, 1500);
          });
      }

      // Intersection Observer for scroll animations
      const fadeElements = document.querySelectorAll('.fade-in');
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
              }
          });
      }, {
          threshold: 0.1
      });

      fadeElements.forEach(element => {
          observer.observe(element);
      });

      // Typewriter effect for hero subtitle
      const heroSubtitle = document.querySelector('.hero-subtitle');
      if (heroSubtitle) {
          const originalText = heroSubtitle.textContent;
          let i = 0;
          
          function typeWriter() {
              if (i < originalText.length) {
                  heroSubtitle.textContent = originalText.substring(0, i+1);
                  i++;
                  setTimeout(typeWriter, 50);
              }
          }
          
          // Start typewriter effect immediately for desktop, or when visible for mobile
          if (window.innerWidth > 768) {
              heroSubtitle.textContent = '';
              typeWriter();
          } else {
              const heroObserver = new IntersectionObserver((entries) => {
                  if (entries[0].isIntersecting) {
                      heroSubtitle.textContent = '';
                      typeWriter();
                      heroObserver.unobserve(entries[0].target);
                  }
              });
              
              heroObserver.observe(document.querySelector('#hero'));
          }
      }