const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const phrases = ['Full-Stack junior', 'passionnée du web', 'créative et curieuse'];
const typewriter = document.getElementById('typewriter');

if (typewriter) {
  let phraseIndex = 0;
  let charIndex = typewriter.textContent.length;
  let deleting = false;

  const loopTyping = () => {
    const current = phrases[phraseIndex];
    typewriter.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(loopTyping, 90);
      return;
    }

    if (!deleting) {
      deleting = true;
      setTimeout(loopTyping, 1400);
      return;
    }

    if (charIndex > 0) {
      charIndex -= 1;
      setTimeout(loopTyping, 55);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(loopTyping, 250);
  };

  loopTyping();
}

const counters = document.querySelectorAll('[data-target]');

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1500;
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const card = document.querySelector('.portrait-card');

if (card) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    card.style.transform = `rotate(${x * 0.4}deg) translateY(${y * 0.5}px)`;
  });
}
