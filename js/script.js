// Script for handling navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Activate the Back to Top button
  const backToTopButton = document.getElementById('backToTop');
  
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTopButton);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.getAttribute('href') === '#') return;
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close the mobile menu if it's open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form Validation
  const nssForm = document.getElementById('nssForm');
  if (nssForm) {
    nssForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const department = document.getElementById('department');
      const year = document.getElementById('year');
      
      if (!fullName.value.trim()) {
        markInvalid(fullName, 'Please enter your full name');
        valid = false;
      } else {
        markValid(fullName);
      }
      
      if (!email.value.trim()) {
        markInvalid(email, 'Please enter your email');
        valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        markInvalid(email, 'Please enter a valid email address');
        valid = false;
      } else {
        markValid(email);
      }
      
      if (!phone.value.trim()) {
        markInvalid(phone, 'Please enter your phone number');
        valid = false;
      } else if (!isValidPhone(phone.value.trim())) {
        markInvalid(phone, 'Please enter a valid phone number');
        valid = false;
      } else {
        markValid(phone);
      }
      
      if (!department.value) {
        markInvalid(department, 'Please select your department');
        valid = false;
      } else {
        markValid(department);
      }
      
      if (!year.value) {
        markInvalid(year, 'Please select your year of study');
        valid = false;
      } else {
        markValid(year);
      }
      
      if (valid) {
        // Show success message
        showFormSuccess();
        nssForm.reset();
      }
    });
  }
  
  function markInvalid(element, message) {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    
    let feedbackElement = element.nextElementSibling;
    if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
      feedbackElement = document.createElement('div');
      feedbackElement.classList.add('invalid-feedback');
      element.parentNode.insertBefore(feedbackElement, element.nextSibling);
    }
    
    feedbackElement.textContent = message;
  }
  
  function markValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function isValidPhone(phone) {
    const regex = /^[0-9]{10,12}$/;
    return regex.test(phone);
  }
  
  function showFormSuccess() {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-success', 'mt-3');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.textContent = 'Your application has been submitted successfully! Our NSS coordinator will contact you shortly.';
    
    // Insert alert before the form
    nssForm.parentNode.insertBefore(alertDiv, nssForm);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
  
  // Initialize active nav link based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  
  // Simple image lightbox for gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const title = this.querySelector('.gallery-info h3').textContent;
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="close-lightbox">&times;</span>
          <h3>${title}</h3>
          <img src="${imgSrc}" alt="${title}" class="img-fluid">
        </div>
      `;
      
      // Append to body
      document.body.appendChild(lightbox);
      
      // Add styles
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      lightbox.style.zIndex = '9999';
      lightbox.style.display = 'flex';
      lightbox.style.alignItems = 'center';
      lightbox.style.justifyContent = 'center';
      
      const lightboxContent = lightbox.querySelector('.lightbox-content');
      lightboxContent.style.position = 'relative';
      lightboxContent.style.maxWidth = '90%';
      lightboxContent.style.maxHeight = '90%';
      lightboxContent.style.overflow = 'hidden';
      lightboxContent.style.backgroundColor = '#fff';
      lightboxContent.style.borderRadius = '8px';
      lightboxContent.style.padding = '20px';
      
      const closeBtn = lightbox.querySelector('.close-lightbox');
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '10px';
      closeBtn.style.right = '15px';
      closeBtn.style.fontSize = '28px';
      closeBtn.style.fontWeight = 'bold';
      closeBtn.style.color = '#333';
      closeBtn.style.cursor = 'pointer';
      
      // Close lightbox on click
      closeBtn.addEventListener('click', () => {
        lightbox.remove();
      });
      
      // Close lightbox on outside click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    });
  });
  
  // Initialize AOS (if needed)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
});