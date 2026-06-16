/* =========================================
   FARMAN ANSARI PORTFOLIO — script.js
   ========================================= */

'use strict';

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
  }, 2200);
});
document.body.style.overflow = 'hidden';

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

const hoverTargets = 'a, button, .skill-card, .project-card, .stat-card, .contact-item, .floating-card';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ---- SCROLL PROGRESS ---- */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
}, { passive: true });

/* ---- NAVBAR ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* ---- ACTIVE NAV LINK ---- */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

/* ---- PARTICLES ---- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.life > this.maxLife) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---- TYPEWRITER ---- */
const words = [
  'React Applications.',
  'UI Experiences.',
  'Clean Interfaces.',
  'Responsive Designs.',
  'Frontend Magic.',
];
let wIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const word = words[wIdx];
  if (!deleting) {
    tw.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    tw.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
setTimeout(typeLoop, 2500);

/* ---- SCROLL REVEAL ---- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(r => revealObs.observe(r));
}

/* ---- ANIMATED COUNTERS ---- */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => {
        animateCounter(num, +num.dataset.target);
      });
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) counterObs.observe(statsEl);

/* ---- SKILL BARS ---- */
const skillBarObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillBarObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const skillsGrid = document.getElementById('skills-grid');
if (skillsGrid) skillBarObs.observe(skillsGrid);

/* ---- CGPA BAR ---- */
const cgpaObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.cgpa-fill').forEach(bar => {
        bar.style.width = bar.style.width; // trigger repaint
      });
      cgpaObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const eduSection = document.getElementById('education');
if (eduSection) cgpaObs.observe(eduSection);

/* ---- SKILL FILTER ---- */
document.querySelectorAll('.skill-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skill-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---- PROJECT FILTER ---- */
document.querySelectorAll('.proj-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.pfilter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.ptag.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---- PROJECT MODALS ---- */
const modalData = {
  shopper: {
    title: 'Shopper',
    desc: 'A fully responsive e-commerce platform with complete product browsing, cart management, wishlist functionality, and a seamless checkout flow. Features product filtering, dynamic search, and a clean, conversion-focused UI built entirely with React.js and CSS3.',
    tech: ['React.js', 'JavaScript', 'CSS3', 'Context API', 'Netlify'],
    url: 'https://shopperspro.netlify.app/',
  },
  medinest: {
    title: 'Medi Nest',
    desc: 'A healthcare platform clone that replicates core features of a modern medical service app — including doctor listings with specializations, appointment booking, patient dashboard, and a responsive layout optimized for mobile-first usage.',
    tech: ['React.js', 'Tailwind CSS', 'Redux Toolkit', 'React Router', 'Netlify'],
    url: 'https://medinestclone.netlify.app/',
  },
  nivia: {
    title: 'Nivia Sport',
    desc: 'A sports brand e-commerce clone inspired by Nivia\'s product catalog. Features product category filtering, detailed product pages, an interactive shopping cart, and a bold athletic UI that reflects the energy of the brand.',
    tech: ['React.js', 'Bootstrap 5', 'Context API', 'JavaScript', 'Netlify'],
    url: 'https://niviasportclone.netlify.app/',
  },
};

function openModal(id) {
  const data = modalData[id];
  if (!data) return;
  document.getElementById('modal-content').innerHTML = `
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-desc">${data.desc}</p>
    <div class="modal-tech">${data.tech.map(t => `<span>${t}</span>`).join('')}</div>
    <div class="modal-links">
      <a href="${data.url}" target="_blank" rel="noopener" class="btn btn-primary">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Live Demo
      </a>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---- CONTACT FORM ---- */
const form = document.getElementById('contact-form');

function showErr(id, msg) {
  document.getElementById(id).textContent = msg;
}
function clearErr(id) {
  document.getElementById(id).textContent = '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Clear previous errors
  ['err-name', 'err-email', 'err-subject', 'err-message'].forEach(clearErr);
  form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('err'));

  if (!name || name.length < 2) {
    showErr('err-name', 'Please enter your full name (min 2 chars).');
    form.name.classList.add('err'); valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr('err-email', 'Please enter a valid email address.');
    form.email.classList.add('err'); valid = false;
  }
  if (!subject || subject.length < 3) {
    showErr('err-subject', 'Please enter a subject (min 3 chars).');
    form.subject.classList.add('err'); valid = false;
  }
  if (!message || message.length < 10) {
    showErr('err-message', 'Please enter a message (min 10 chars).');
    form.message.classList.add('err'); valid = false;
  }

  if (!valid) return;

  const btn = form.querySelector('.btn');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate send
  setTimeout(() => {
    form.reset();
    btnText.textContent = 'Send Message';
    btn.disabled = false;
    const success = document.getElementById('form-success');
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1500);
});

// Real-time validation clear on input
form.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('err');
    const errId = 'err-' + el.name;
    if (document.getElementById(errId)) clearErr(errId);
  });
});

/* ---- BACK TO TOP ---- */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- DOWNLOAD RESUME ---- */
document.getElementById('download-resume').addEventListener('click', e => {
  e.preventDefault();
  // Creates a simple placeholder resume download
  const content = `FARMAN ANSARI
Frontend Developer
Ahmedabad, Gujarat, India
ansarifarman1203@gmail.com | +91 8866463947

EXPERIENCE
Frontend Developer Trainee — TOPS Technologies (May 2025 – Present)
• Building responsive web apps with React.js & modern JavaScript
• State management with Redux Toolkit and Context API
• UI development with Tailwind CSS and Bootstrap
• Deployment on Netlify and Render
• AI-assisted development with ChatGPT, Claude, Gemini

PROJECTS
Shopper | https://shopperspro.netlify.app/
Medi Nest | https://medinestclone.netlify.app/
Nivia Sport | https://niviasportclone.netlify.app/

EDUCATION
Bachelor of Computer Applications — Sardar Patel University (CGPA: 7.17)

CERTIFICATION
Frontend Developer — TOPS Technologies (2025)

SKILLS
React.js, Redux Toolkit, Context API, JavaScript, HTML5, CSS3,
Tailwind CSS, Bootstrap, Git, GitHub, Netlify, Render,
ChatGPT, Claude, Gemini
`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'Farman_Ansari_Resume.txt';
  a.click();
  URL.revokeObjectURL(url);
});

/* ---- SMOOTH SCROLL for nav links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ---- HERO PARALLAX ---- */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  const glows = hero.querySelectorAll('.hero-glow');
  glows.forEach((g, i) => {
    g.style.transform = `translateY(${scrolled * (i % 2 === 0 ? 0.15 : -0.1)}px)`;
  });
}, { passive: true });

/* ---- RE-APPLY CURSOR HOVER for dynamically added elements ---- */
document.getElementById('modal-overlay').addEventListener('mouseover', e => {
  if (e.target.closest('button, a')) document.body.classList.add('cursor-hover');
  else document.body.classList.remove('cursor-hover');
});