document.addEventListener('DOMContentLoaded', () => {
  /* ---------- NAVBAR: cambiar fondo al scrollear ---------- */
  const navbar = document.getElementById('mainNavbar') || document.querySelector('.navbar');
  const hero = document.querySelector('.hero-section');
  const heroHeight = hero ? hero.offsetHeight : 500;

  const onScroll = () => {
    if (window.scrollY > (heroHeight - 120)) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- REVEAL ON SCROLL (intersection observer) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target); // unobserve for performance
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .project-card, .tool').forEach(el => io.observe(el));

  /* ---------- PAUSE icon-track on hover (for non-css hover) ---------- */
  const track = document.querySelector('.icon-track');
  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  /* ---------- Cerrar menú mobile al click en enlace ---------- */
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(document.querySelector('.navbar-collapse'));
      if (bsCollapse && window.innerWidth < 992) bsCollapse.hide();
    });
  });

  /* ---------- SCROLL para navbar en otras páginas (ejemplo: About) ---------- */
  const navbarAbout = document.getElementById('mainNavbarAbout');
  if (navbarAbout) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbarAbout.classList.add('scrolled');
      } else {
        navbarAbout.classList.remove('scrolled');
      }
    });
  }
});

// fallback para otras páginas sin hero-section
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// FORMULARIO CONTACTO - Enviar datos a Google Apps Script
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const statusMsg = document.createElement('div');
  statusMsg.style.marginTop = '1rem';
  form.appendChild(statusMsg);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Mostrar mensaje inmediato
    statusMsg.textContent = '✅ Mensaje enviado correctamente.';
    statusMsg.style.color = 'green';

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    const formData = new FormData(form);

    // Enviar datos en segundo plano sin esperar resultado
    fetch(
      "https://script.google.com/macros/s/AKfycby9EueOwG6L8HuBZkrgho6JMACXFI-iVYL0mIPdqPa9M4w2WIrVqqCn6zH6MZXAdlLjeA/exec",
      {
        method: 'POST',
        body: new URLSearchParams(formData),
        cache: 'no-cache'
      }
    )
    .catch(error => {
      // Si falla el envío, avisar después
      statusMsg.textContent = '⚠️ Error al enviar: ' + error.message;
      statusMsg.style.color = 'red';
      btn.disabled = false;
    });

    form.reset();
  });
});



// main.js o script al final del body
const diplomas = document.querySelectorAll('.reveal-hover');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  diplomas.forEach(d => {
    const top = d.getBoundingClientRect().top;
    if(top < windowHeight - 50) d.classList.add('visible');
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
