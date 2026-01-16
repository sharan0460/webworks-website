// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Smooth scroll function to center section content on screen
function scrollToSection(targetElement, headerHeight) {
  const startPosition = window.pageYOffset || window.scrollY;
  
  // Get viewport height
  const viewportHeight = window.innerHeight;
  
  // Get section position
  const sectionTop = targetElement.offsetTop;
  
  // Find the main content element (h2) to center it
  const sectionHeading = targetElement.querySelector('h2');
  
  if (sectionHeading) {
    // Get the heading's absolute position relative to document
    const headingRect = sectionHeading.getBoundingClientRect();
    const headingTop = headingRect.top + startPosition;
    
    // Calculate scroll position to center the heading in viewport
    // Account for header by centering in available viewport space
    const availableViewport = viewportHeight - headerHeight;
    const targetPosition = headingTop - (availableViewport / 2);
    
    // Ensure section starts below header (minimum position)
    const minPosition = sectionTop - headerHeight;
    const finalPosition = Math.max(minPosition, targetPosition);
    
    const distance = finalPosition - startPosition;

    if (Math.abs(distance) < 5) return;

    const duration = 200;
    let startTime = null;

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress);

      window.scrollTo(
        0,
        startPosition + distance * easedProgress
      );

      if (elapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, finalPosition);
      }
    }

    requestAnimationFrame(animation);
  } else {
    // Fallback: just scroll to section top below header
    const targetPosition = sectionTop - headerHeight;
    const distance = targetPosition - startPosition;

    if (Math.abs(distance) < 5) return;

    const duration = 200;
    let startTime = null;

    function easeInOut(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress);

      window.scrollTo(
        0,
        startPosition + distance * easedProgress
      );

      if (elapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition);
      }
    }

    requestAnimationFrame(animation);
  }
}


// Handle menu link clicks
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Close mobile menu
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    
    // Get target section ID
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;
    
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    
    // Get header height for offset
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 130;
    
    // Small delay to ensure menu closes before scrolling (for mobile)
    setTimeout(() => {
      scrollToSection(targetSection, headerHeight);
    }, 50);
  });
});

// Change header color based on scroll position
function updateHeaderColor() {
  const header = document.querySelector('header');
  const scrollPosition = window.pageYOffset || window.scrollY;
  
  // Change to light header immediately when scrolling starts
  // Keep dark header only when at the very top (home section)
  const scrollThreshold = 20; // Small threshold to detect any scroll
  
  if (scrollPosition > scrollThreshold) {
    header.classList.add('header-light');
  } else {
    header.classList.remove('header-light');
  }
}

// Update header color on scroll
window.addEventListener('scroll', updateHeaderColor);

// Update header color on page load
updateHeaderColor();

function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const phoneNumber = "919553433545"; // your WhatsApp number

  const text = `Hello WebWorks Studio,%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

  window.open(whatsappURL, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const serviceTexts = document.querySelectorAll(".service-text");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 }
  );

  serviceTexts.forEach(text => observer.observe(text));
});
