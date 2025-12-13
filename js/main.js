// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang);

  // Evento botones idioma (desktop + mobile)
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      updateLanguage(currentLang);

      // Cambiar texto de TODOS los botones de idioma
      document.querySelectorAll('.lang-text').forEach(span => {
        span.textContent = translations[currentLang]['lang.' + currentLang];
      });
    });
  });
});


// Cambiar todos los textos
function updateLanguage(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const value = translations[lang][key];
    if (!value) return;

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // si quisieras placeholder: element.placeholder = value;
      element.value = value;
    } else {
      element.textContent = value;
    }
  });

  // Cambiar título página
  document.title = translations[lang].title;

  // Cambiar lang del HTML
  document.documentElement.lang = lang;
}



// Navbar Mobile con ANIMACIÓN
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenu.classList.contains('hidden')) {
    // Abrir con animación
    mobileMenu.classList.remove('hidden');
    setTimeout(() => mobileMenu.classList.add('mobile-menu-slide'), 10);
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    // Cerrar con animación
    mobileMenu.classList.add('mobile-menu-hide');
    setTimeout(() => {
      mobileMenu.classList.remove('mobile-menu-slide', 'mobile-menu-hide');
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }, 200);
  }
}


// Función para cerrar menú (para enlaces y click fuera)
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('mobile-menu-hide');
    setTimeout(() => {
      mobileMenu.classList.remove('mobile-menu-slide', 'mobile-menu-hide');
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }, 200);
  }
}


// Event listeners NAVBAR + MOBILE
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

  // Cerrar al clickear enlaces
  document.getElementById('mobile-menu').querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Click fuera
  document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenu.classList.contains('hidden') &&
      !mobileMenu.contains(event.target) &&
      !mobileBtn.contains(event.target)) {
      closeMobileMenu();
    }
  });
});


// Carrusel FUNCIONAL 100%
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    let autoPlay;
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-white', 'scale-125');
            } else {
                dot.classList.remove('bg-white', 'scale-125');
            }
        });
    }
    
    // Botones
    prevBtn.onclick = () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        goToSlide(currentIndex);
        clearInterval(autoPlay);
        restart();
    };
    
    nextBtn.onclick = () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
        clearInterval(autoPlay);
        restart();
    };
    
    // Dots
    dots.forEach((dot, index) => {
        dot.onclick = () => {
            goToSlide(index);
            clearInterval(autoPlay);
            restart();
        };
    });
    
    // Auto-play
    function restart() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }, 8000);
    }
    
    // Hover pause
    const container = document.querySelector('.carousel-container');
    container.onmouseenter = () => clearInterval(autoPlay);
    container.onmouseleave = () => restart();
    
    // Start
    goToSlide(0);
    restart();
});
// Carrusel horizontal profesional
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('projects-track');
  if (!track) return;

  const cards = track.querySelectorAll('.project-card');
  if (!cards.length) return;

  const prevLg = document.getElementById('projects-prev-lg');
  const nextLg = document.getElementById('projects-next-lg');
  const prevSm = document.getElementById('projects-prev-sm');
  const nextSm = document.getElementById('projects-next-sm');

  // ancho de scroll = ancho de una card + gap
  function getStep() {
    const card = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || '16', 10);
    return card.getBoundingClientRect().width + gap;
  }

  function scrollLeft() {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  }

  function scrollRight() {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  }

  [prevLg, prevSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollLeft);
  });

  [nextLg, nextSm].forEach(btn => {
    if (btn) btn.addEventListener('click', scrollRight);
  });
});


