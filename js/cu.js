// Configuration
const PASSWORD = "hbdunc1@2025";
const AUTH_KEY = "uncle_birthday_auth";
const AUTH_DURATION = 2 * 60 * 60 * 1000; // 2 hours

// Message lines
const messageLines = [
    "Happy birthday, my faveeeee!",
    "I know you're not a fan of birthdays, but this is not just another day on the calendar to mark and move.",
    "It is a reminder of how much of a light and blessing you are to us, especially me.",
    "Thank you for everything. For every time you've listened, given advice to me, scolded me for being in the wrong, given me a roof over my head, fed and clothed me, and all the in-betweens.",
    "Thank you for believing in and trusting me. It means the whole world to me.",
    "I pray that in this new year, all things are made easy for you.",
    "I pray that God illuminates your path and brings the answers to your prayers on a golden platter.",
    "Where others struggle and fail, you will shine and prosper effortlessly.",
    'This is about to be a "God did" kind of year. Brace yourself for the smoothest ride of your life, and enjoy every step and bit of it.',
    "Happy birthday to the best uncle in the whole universe. I love you sooooooooooo much!",
    "Enjoy your special day, my love.",
];


let currentStep = 0;
let isAuthenticated = false;

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById("particles");
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.width = Math.random() * 4 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particlesContainer.appendChild(particle);

        gsap.to(particle, {
            y: -100,
            opacity: 0.3,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "power2.inOut",
        });
    }
}

// Check authentication
function checkAuth() {
    const authData = localStorage.getItem(AUTH_KEY);
    if (authData) {
        const { timestamp } = JSON.parse(authData);
        if (Date.now() - timestamp < AUTH_DURATION) {
            isAuthenticated = true;
            document.getElementById("bgMusic").play();
            startExperience();
            return;
        }
        localStorage.removeItem(AUTH_KEY);
    }
}

// Authenticate user
function authenticate() {
    const input = document
        .getElementById("passwordInput")
        .value.toLowerCase()
        .trim();
    if (input === PASSWORD.toLowerCase()) {
        localStorage.setItem(
            AUTH_KEY,
            JSON.stringify({ timestamp: Date.now() })
        );
        isAuthenticated = true;
        document.getElementById("bgMusic").play();

        gsap.to("#authScreen", {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById("authScreen").classList.add("hidden");
                startExperience();
            },
        });
    } else {
        gsap.to("#passwordInput", {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut",
        });
    }
}

// Start the experience
function startExperience() {
    document.getElementById("mainExperience").classList.remove("hidden");
    gsap.to("#mainExperience", { opacity: 1, duration: 1 });
    setTimeout(() => showIntro(), 500);
}

// Show intro
function showIntro() {
    updateProgress(10);
    gsap.to("#introText", {
        duration: 3,
        text: "Heyy, guess who's day it is today...",
        ease: "none",
        onComplete: () => {
            setTimeout(() => showPhotos(), 1500);
        },
    });
}

// Show photos
function showPhotos() {
    updateProgress(25);
    document.getElementById("photoSection").classList.remove("hidden");
    document.getElementById("introText").classList.add("hidden");

    const photos = document.querySelectorAll(".photo-card");
    gsap.fromTo(
        photos,
        { scale: 0, rotation: 180 },
        {
            scale: 1,
            rotation: 0,
            duration: 3.2,
            stagger: 1.3,
            ease: "back.out(1.7)",
            onComplete: () => {
                setTimeout(() => showMessage(), 3500);
            },
        }
    );
}

// Show message section
function showMessage() {
    updateProgress(40);
    document.getElementById("messageSection").classList.remove("hidden");
    document.getElementById("photoSection").classList.add("hidden");

    let currentLine = 0;

    function showNextLine() {
        if (currentLine >= messageLines.length) {
            setTimeout(() => showSpinner(), 3000);
            return;
        }

        const lineElement = document.getElementById(
            `messageLine${currentLine}`
        );

        // Show the current line and animate it in
        gsap.to(lineElement, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        });

        gsap.to(lineElement, {
            duration: messageLines[currentLine].length * 0.03,
            text: messageLines[currentLine],
            ease: "none",
            onComplete: () => {
                setTimeout(() => {
                    // Smoothly fade out and slide away the previous line before removing it
                    if (currentLine > 0) {
                        const previousLineElement = document.getElementById(
                            `messageLine${currentLine - 1}`
                        );
                        gsap.to(previousLineElement, {
                            opacity: 0,
                            y: -20, // Move it up a bit as it fades out
                            duration: 0.5,
                            ease: "power2.out",
                            onComplete: () => {
                                previousLineElement.remove(); // Remove it after the animation is complete
                            },
                        });
                    }

                    currentLine++;
                    showNextLine();
                }, 1500); // Delay before removing the previous line
            },
        });
    }

    showNextLine();
}

// Show spinner
function showSpinner() {
    updateProgress(70);
    document.getElementById("spinnerSection").classList.remove("hidden");
    document.getElementById("messageSection").classList.add("hidden");

    gsap.fromTo(
        "#spinnerSection",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
}

// Spin the wheel
function spinWheel() {
    const wheel = document.getElementById("inner-wheel");
    const sections = document.querySelectorAll("#wheel .sec");
    const spinBigBtn = document.getElementById("spinBtn");

    spinBigBtn.disabled = true;
    spinBigBtn.textContent = "Spinning...";

    let isSpinning = false;

    // spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;

    const totalSections = sections.length;
    const sectionSize = 360 / totalSections;
    console.log("Section Size:", sectionSize);
    const targetIndex = 3; // 🎯 option 4 (0-based index) the message section
    const randomOffset = Math.floor(Math.random() * sectionSize);

    let finalAngle = targetIndex * sectionSize + randomOffset;
    if (finalAngle < 210) {
        finalAngle = 225;
    }

    const totalRotations = 12 * 360; // 6 full spins before landing
    const targetRotation = totalRotations + finalAngle;

    let currentRotation = 0;
    let startTime = null;
    const duration = 8000; // 8s total spin
    const tickThreshold = sectionSize; // tick every 60°

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // progress 0 → 1
        const progress = Math.min(elapsed / duration, 1);

        // ease-out cubic (fast start, slow end)
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // rotation based on eased progress
        currentRotation = easedProgress * targetRotation;

        // apply wheel transform
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        // 🎵 tick effect when crossing section boundaries
        const sectionPassed = Math.floor(currentRotation / tickThreshold);
        if (sectionPassed !== animate.lastSection) {
            tick([spinBtn, spin]); // tilt effect
            animate.lastSection = sectionPassed;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            console.log("✅ Landed on option:", targetIndex + 1);
        }
    }
    requestAnimationFrame(animate);
    setTimeout(() => spinBigBtn.textContent = "Spin Again", 8100);
    setTimeout(() => showResult("Private Jet"), 9500);
}

function tick(btns) {
    btns.forEach(element => {
        element.classList.add("spin");
    });
    setTimeout(() => btns.forEach(b => {
        b.classList.remove("spin")
    }), 100);
}

// Show result with typing + image reveal (supports \n newlines)
function showResult(gift) {
    // hide spinner and update progress
    document.getElementById("spinnerSection").classList.add("hidden");
    updateProgress(85);

    const resultSection = document.getElementById("resultSection");
    const resultTitle = document.getElementById("resultTitle");
    const resultText = document.getElementById("resultText");

    // reveal the result section and set title
    resultSection.classList.remove("hidden");
    resultTitle.textContent = "Wowww!!!";

    // set up markup: image + typing wrapper (note typedText uses textContent)
    resultText.innerHTML = `
    <div id="resultImage" style="opacity:0; transform:scale(0.85); display:flex; justify-content:center; margin-bottom:16px;">
      <img src="./images/jet.jpg"
           height="350"
           alt="gift"
           style="border-radius:6px; box-shadow:0 10px 30px rgba(0,0,0,0.55);" />
    </div>
    <div id="typeWrap">
      <span id="typedText" style="white-space:pre-wrap;"></span><span id="caret" class="caret">|</span>
    </div>
  `;

    const typedEl = document.getElementById("typedText");
    const caretEl = document.getElementById("caret");

    // message: use \n for line breaks (not /n)
    const message = (`A whole ${gift} 😂😂😂😂\n \n Is like you will give me Gun oo!!!\n😂😂😂`).trim();

    // animate the result section in
    gsap.fromTo(
        resultSection,
        { opacity: 0, scale: 0.88 },
        {
            opacity: 1,
            scale: 1,
            duration: 4.2,
            ease: "back.out(1.2)",
            onComplete: () => {
                // reveal image with a pop
                gsap.to("#resultImage", {
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "back.out(1.7)",
                });

                // start typing
                typeWriter(message, typedEl, 0, 108, () => {
                    // hide caret when done
                    caretEl.classList.add("hidden");
                    // progress to final after a short pause
                    setTimeout(() => showFinal(), 7000);
                });
            },
        }
    );
}

// typewriter: writes into element.textContent so \n becomes visible with pre-wrap
function typeWriter(text, el, i, speed, callback) {
    if (i < text.length) {
        const ch = text.charAt(i);
        // we write into textContent to preserve raw text and newlines
        el.textContent += ch;
        setTimeout(() => typeWriter(text, el, i + 1, speed, callback), speed);
    } else {
        if (typeof callback === "function") callback();
    }
}


// Show final section
function showFinal() {
    updateProgress(100);
    document.getElementById("finalSection").classList.remove("hidden");
    document.getElementById("resultSection").classList.add("hidden");

    gsap.fromTo(
        "#finalSection",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Confetti effect
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }

    document.getElementById("bgMusic").pause();
}

// Create confetti
function createConfetti() {
    const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
    ];
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = "200";
    document.body.appendChild(confetti);

    gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 3 + 2,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
    });
}

// Update progress
function updateProgress(percentage) {
    gsap.to("#progressFill", { width: percentage + "%", duration: 0.5 });
}

// Reset experience
function resetExperience() {
    currentStep = 0;
    document.getElementById("bgMusic").play();

    // Hide all sections
    document.querySelector(".refresh-notification").classList.remove("hide");
    document
    .querySelectorAll(".hidden")
    .forEach((el) => el.classList.add("hidden"));
    document.getElementById("photoSection").classList.add("hidden");
    document.getElementById("messageSection").classList.add("hidden");
    document.getElementById("spinnerSection").classList.add("hidden");
    document.getElementById("resultSection").classList.add("hidden");
    document.getElementById("finalSection").classList.add("hidden");

    // Reset elements
    document.getElementById("introText").textContent = "";
    document.getElementById("spinBtn").disabled = false;
    document.getElementById("spinBtn").textContent = "Spin the Wheel!";
    document.getElementById("spinnerWheel").style.transform =
        "rotate(0deg)";

    // Reset message lines
    messageLines.forEach((_, index) => {
        const line = document.getElementById(`messageLine${index}`);
        line.textContent = "";
        line.style.opacity = "0";
    });

    updateProgress(0);
    setTimeout(() => startExperience(), 500);
}

// Event listeners
document
    .getElementById("authBtn")
    .addEventListener("click", authenticate);
document
    .getElementById("passwordInput")
    .addEventListener("keypress", (e) => {
        if (e.key === "Enter") authenticate();
    });
document.getElementById("spinBtn").addEventListener("click", spinWheel);
document.getElementById("spin").addEventListener("click", spinWheel);
document
    .getElementById("watchAgainBtn")
    .addEventListener("click", resetExperience);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    checkAuth();

    if (!isAuthenticated) {
        gsap.fromTo(
            "#authScreen",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        );
    } else {
        document.getElementById("authScreen").classList.add("hidden");
        startExperience();
    }
});
