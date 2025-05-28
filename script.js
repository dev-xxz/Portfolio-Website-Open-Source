
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  loader.style.opacity = '0';
  loader.style.pointerEvents = 'none';
  setTimeout(() => loader.remove(), 1200);
});


document.getElementById('projectsBtn').addEventListener('click', () => {
  window.location.href = '#projects';
});

  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  });


function typeNextChar() {
  if (lineIndex >= textLines.length) return;
  let currentLine = textLines[lineIndex];
  typingText.textContent = textLines.slice(0, lineIndex).join('\n') + '\n' + currentLine.slice(0, charIndex);
  charIndex++;
  if (charIndex > currentLine.length) {
    charIndex = 0;
    lineIndex++;
    setTimeout(typeNextChar, 600);
  } else {
    setTimeout(typeNextChar, 60 + Math.random() * 30);
  }
}
typeNextChar();

const canvas = document.getElementById('canvasDemo');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = canvas.clientWidth * devicePixelRatio;
  height = canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 70;

class Particle {
  constructor() {
    this.x = Math.random() * width / devicePixelRatio;
    this.y = Math.random() * height / devicePixelRatio;
    this.radius = 1 + Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
    this.alpha = 0.7 + Math.random() * 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width / devicePixelRatio) this.speedX *= -1;
    if (this.y < 0 || this.y > height / devicePixelRatio) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();


const parallaxCard = document.querySelector('.parallax-card');
parallaxCard.addEventListener('mousemove', (e) => {
  const rect = parallaxCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 12;
  const rotateY = ((x - centerX) / centerX) * 12;
  parallaxCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
});
parallaxCard.addEventListener('mouseleave', () => {
  parallaxCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
});


const carousel = document.querySelector('.carousel');
const items = carousel.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

let currentIndex = 0;

function updateCarousel() {
  items.forEach((item, i) => {
    const offset = i - currentIndex;
    item.style.opacity = '0.3';
    item.style.transform = `translateX(${offset * 70}px) translateZ(${ -Math.abs(offset) * 50}px) scale(${1 - Math.abs(offset) * 0.3})`;
    item.classList.remove('active');
    if (i === currentIndex) {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0) translateZ(50px) scale(1.3)';
      item.classList.add('active');
      item.style.zIndex = 10;
    } else {
      item.style.zIndex = 0;
    }
  });
}
updateCarousel();

prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = items.length - 1;
  updateCarousel();
});
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= items.length) currentIndex = 0;
  updateCarousel();
});
