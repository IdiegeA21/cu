gsap.registerPlugin(TextPlugin);

// DOM Elements
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const hintEl = document.querySelector('.hint');
const bgMusic = document.getElementById('bgMusic');

// Config
const CORRECT_PASSWORD = "myboy"; // 👈 CHANGE THIS TO YOUR SECRET WORD
const hintPhrases = [
  "It’s what you always call me 😉",
  "Rhymes with 'joy'...",
  "Starts with 'm'... ends with 'yboy'!",
  "Your favorite nickname for me ❤️"
];
let hintIndex = 0;

// Cycle Hints
function cycleHint() {
  gsap.to(hintEl, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      hintEl.textContent = hintPhrases[hintIndex];
      hintIndex = (hintIndex + 1) % hintPhrases.length;
      gsap.to(hintEl, { opacity: 1, duration: 0.5 });
    }
  });
}

setInterval(cycleHint, 4000);
cycleHint();

// Unlock Logic
unlockBtn.addEventListener('click', () => {
  if (passwordInput.value === CORRECT_PASSWORD) {
    // Play music if exists
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }
    
    gsap.to('#passwordGate', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.getElementById('passwordGate').classList.remove('active');
        startExperience();
      }
    });
  } else {
    gsap.from(unlockBtn, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 2, ease: "back.out" });
    passwordInput.value = '';
    passwordInput.placeholder = "Try again, my love ❤️";
  }
});

// Enter key support
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') unlockBtn.click();
});

// Main Experience Flow
function startExperience() {
  // SCENE 1: Cosmic Intro
  setTimeout(() => {
    const scene = document.getElementById('cosmicIntro');
    scene.classList.add('active');
    gsap.to(scene, { opacity: 1, duration: 1 });
    gsap.from(scene.querySelector('h3'), { opacity: 0, y: 30, duration: 1.5, delay: 1 });

    setTimeout(() => {
      scene.classList.remove('active');
      showPhotoCarousel();
    }, 4000);
  }, 500);
}

// Photo Carousel
function showPhotoCarousel() {
  const scene = document.getElementById('photoCarousel');
  scene.classList.add('active');
  
  const photos = document.querySelectorAll('.photo');
  let current = 0;

  function showNext() {
    photos[current].classList.remove('active');
    current = (current + 1) % photos.length;
    photos[current].classList.add('active');
    
    gsap.from(photos[current], {
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: "power2.out"
    });
  }

  // Show first photo
  gsap.from(photos[0], { opacity: 0, scale: 0.9, duration: 1.5, ease: "power2.out" });

  // Auto-advance every 5s
  const interval = setInterval(showNext, 5000);

  // Move to next scene after 3 photos
  setTimeout(() => {
    clearInterval(interval);
    scene.classList.remove('active');
    showFlowerGarden();
  }, 15500); // 3 photos × 5s + transition
}

// Flower Garden
function showFlowerGarden() {
  const scene = document.getElementById('flowerGarden');
  scene.classList.add('active');

  // Animate flowers
  gsap.to('.flower', {
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "elastic.out(1, 0.5)",
    stagger: 0.5
  });

  // Animate quote
  gsap.to(scene.querySelector('p'), {
    opacity: 1,
    y: 0,
    duration: 2,
    delay: 1.5
  });

  setTimeout(() => {
    scene.classList.remove('active');
    showMessageScene();
  }, 7000);
}

// MESSAGE SCENE — THE HEART
function showMessageScene() {
  const scene = document.getElementById('messageScene');
  scene.classList.add('active');

  const tl = gsap.timeline();

  tl.from(".line1", { opacity: 0, y: 50, duration: 1, ease: "back.out" })
    .from(".line2", { opacity: 0, y: 30, duration: 1.2, ease: "power2.out" }, "+=0.8")
    .from(".line3 .highlight", { scale: 1.2, opacity: 0, duration: 1, ease: "elastic.out", stagger: 0.3 }, "+=0.8")
    .from(".line4", { opacity: 0, scale: 0.5, duration: 1, ease: "back.out" }, "+=1")
    .from(".line5", { opacity: 0, x: -100, duration: 1.5, ease: "power2.out" }, "+=0.8")
    .from(".line6", { opacity: 0, x: 100, duration: 1.5, ease: "power2.out" }, "+=0.8")
    .from(".line7", { opacity: 0, y: 50, duration: 1.2 }, "+=0.8")
    .from(".line8 .highlight", { color: "#FFD700", textShadow: "0 0 20px #FFD700", scale: 1.3, duration: 1.5, ease: "elastic.out" }, "+=0.8")
    .from(".line9", { opacity: 0, y: 30, duration: 1.2, ease: "power2.out" }, "+=0.8")
    .from(".line10 .god-did", { rotation: -5, scale: 1.2, opacity: 0, duration: 1, ease: "bounce.out" }, "+=0.8")
    .from(".line11", { opacity: 0, y: 30, duration: 1.2 }, "+=0.8")
    .from(".line12 .love-text", { scaleX: 0, duration: 2, ease: "elastic.out(1, 0.5)" }, "+=0.8")
    .from(".line13", { opacity: 0, y: 50, duration: 1.5, ease: "bounce.out" }, "+=1.5");

  tl.eventCallback("onComplete", showCakeScene);
}

// Cake Scene
function showCakeScene() {
  const scene = document.getElementById('cakeScene');
  scene.classList.add('active');

  gsap.to(".cake", {
    opacity: 1,
    y: 0,
    duration: 2,
    ease: "bounce.out"
  });

  gsap.to(scene.querySelector('p'), {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 1.5
  });

  setTimeout(() => {
    scene.classList.remove('active');
    showFinalScene();
  }, 6000);
}

// Final Scene
function showFinalScene() {
  const scene = document.getElementById('finalScene');
  scene.classList.add('active');

  gsap.from(scene.querySelectorAll('p'), {
    opacity: 0,
    y: 50,
    duration: 1.2,
    stagger: 0.8,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(".last", {
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "sine.inOut"
      });
    }
  });

  gsap.from(".signature", {
    opacity: 0,
    y: 30,
    duration: 2,
    delay: 5
  });
}

// Prevent scrolling
document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
window.addEventListener('wheel', e => e.preventDefault(), { passive: false });