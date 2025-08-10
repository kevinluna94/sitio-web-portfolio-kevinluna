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

  /* ---------- PROJECT MODAL: rellenar contenido dinámicamente ---------- */
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
      const trigger = event.relatedTarget;
      if (!trigger) return;

      const title = trigger.dataset.title || 'Proyecto';
      const img = trigger.dataset.img || 'assets/proyectos/proyecto1.jpg';
      const desc = trigger.dataset.desc || '';
      const stack = trigger.dataset.stack || '';

      projectModal.querySelector('.modal-title').textContent = title;
      projectModal.querySelector('#projectModalImg').src = img;
      projectModal.querySelector('#projectModalImg').alt = title;
      projectModal.querySelector('#projectModalDesc').textContent = desc;
      projectModal.querySelector('#projectModalStack').textContent = stack;

      const demo = trigger.dataset.demo || '#';
      const code = trigger.dataset.code || '#';
      projectModal.querySelector('#projectModalDemo').href = demo;
      projectModal.querySelector('#projectModalCode').href = code;
    });
  }

  /* ---------- CONTACT FORM -> abre mailto (demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Completá todos los campos');
        return;
      }
      const subject = encodeURIComponent(`Contacto desde portfolio: ${name}`);
      const body = encodeURIComponent(`${message}\n\n--\n${name}\n${email}`);
      window.location.href = `mailto:tuemail@dominio.com?subject=${subject}&body=${body}`;
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

// Si quieres tener un fallback para otras páginas sin hero-section
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// Conectar formulario con HTML
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycby9EueOwG6L8HuBZkrgho6JMACXFI-iVYL0mIPdqPa9M4w2WIrVqqCn6zH6MZXAdlLjeA/exec", {
    method: "POST",
    body: new URLSearchParams(formData)
  })
    .then(response => {
      if (response.ok) {
        alert("✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!");
        form.reset();
      } else {
        alert("❌ Hubo un problema al enviar el mensaje.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("⚠️ Error al enviar el formulario.");
    });
});







