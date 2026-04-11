// Coffee shop website behavior
// Handles mobile menu toggle, scroll animations, and contact form feedback.

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

// Toggle the mobile navigation menu
navToggle?.addEventListener('click', () => {
  mainNav?.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
mainNav?.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    mainNav.classList.remove('open');
  }
});

// Scroll reveal animation using IntersectionObserver
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observerRef.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => observer.observe(element));
}

// Handle contact form submission
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Thanks! We received your message and will reply soon.';
  contactForm.reset();
});

initScrollReveal();
