document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved user preference or use system preference
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Add animation class when elements come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-method');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };

  // Run once on load and then on scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});