gsap.registerPlugin(TextPlugin);

const password = "myboy"; // CHANGE THIS TO YOUR SECRET WORD
const hintPhrases = [
  "It’s what you always call me 😉",
  "Rhymes with 'joy'...",
  "Starts with 'm'... ends with 'yboy'!"
];

let hintIndex = 0;
const hintEl = document.querySelector('.hint');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');

// Typing hint
function cycleHint() {
  gsap.to(hintEl, { opacity: 0, duration: 0.5, onComplete: () => {
    hintEl.textContent = hintPhrases[hintIndex];
    hintIndex = (hintIndex + 1) % hintPhrases.length;
    gsap.to(hintEl, { opacity: 1, duration: 0.5 });
  }});
}

setInterval(cycleHint, 4000);
cycleHint();

unlockBtn.addEventListener('click', () => {
  if (passwordInput.value === password) {
    gsap.to('#passwordGate', { opacity: 0, duration: 1, onComplete: () => {
      document.getElementById('passwordGate').classList.remove('active');
      startExperience();
    }});
  } else {
    gsap.from(unlockBtn, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 2 });
    passwordInput.value = '';
    passwordInput.placeholder = "Try again, my love ❤️";
  }
});

function startExperience() {
  // SCENE 1: Cosmic
  setTimeout(() => {
    document.getElementById('cosmicIntro').classList.add('active');
    gsap.to('#cosmicIntro', { opacity: 1, duration: 1 });
    setTimeout(() => {
      document.getElementById('cosmicIntro').classList.remove('active');
      // → Photo Carousel (you build this next)
      showPhotoCarousel();
    }, 3000);
  }, 500);
}

function showPhotoCarousel() {
  document.getElementById('photoCarousel').classList.add('active');
  // Auto-rotate photos every 5s — your code here
  setTimeout(() => {
    document.getElementById('photoCarousel').classList.remove('active');
    showFlowerGarden();
  }, 15000); // 3 photos × 5s
}

function showFlowerGarden() {
  const scene = document.getElementById('flowerGarden');
  scene.classList.add('active');

  // Animate flowers blooming (you add SVG paths)
  gsap.to('.flower', { opacity: 1, duration: 2, stagger: 0.5 });

  setTimeout(() => {
    scene.classList.remove('active');
    showMessageScene();
  }, 6000);
}

function showMessageScene() {
  const scene = document.getElementById('messageScene');
  scene.classList.add('active');

  const tl = gsap.timeline();

  tl.from(".line1", { opacity: 0, y: 50, duration: 1 })
    .from(".line2", { opacity: 0, y: 30, duration: 1.2 }, "+=0.5")
    .from(".line3", { opacity: 0, y: 30, duration: 1.2 }, "+=0.5")
    .from(".line4", { opacity: 0, y: 30, duration: 1 }, "+=0.5")
    .from(".line5 span", { opacity: 0, y: 20, duration: 0.5, stagger: 0.3 }, "+=0.5")
    .from(".line6", { opacity: 0, x: -100, duration: 1 }, "+=0.5")
    .from(".line7", { opacity: 0, scale: 0.8, duration: 1 }, "+=0.5")
    .from(".line8 .highlight", { color: "#FFD700", textShadow: "0 0 20px #FFD700", duration: 1.5 }, "+=0.5")
    .from(".line9", { opacity: 0, y: 30, duration: 1 }, "+=0.5")
    .from(".line10", { opacity: 0, rotation: -10, duration: 1, ease: "elastic.out(1, 0.5)" }, "+=0.5")
    .from(".line11", { opacity: 0, duration: 1, ease: "power2.inOut" }, "+=0.5")
    .from(".line12 .love-text", { scaleX: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" }, "+=0.5")
    .from(".line13", { opacity: 0, y: 50, duration: 1.5 }, "+=1");

  tl.eventCallback("onComplete", showCakeScene);
}

function showCakeScene() {
  const scene = document.getElementById('cakeScene');
  scene.classList.add('active');

  gsap.to(".cake", { opacity: 1, y: 0, duration: 1.5, ease: "bounce.out" });

  setTimeout(() => {
    scene.classList.remove('active');
    showFinalScene();
  }, 5000);
}

function showFinalScene() {
  const scene = document.getElementById('finalScene');
  scene.classList.add('active');

  gsap.from("finalScene p", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.8,
    onComplete: () => {
      gsap.to(".last", { scale: 1.1, yoyo: true, repeat: -1, duration: 1.5 });
    }
  });
}