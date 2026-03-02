// Music Management
const music = document.getElementById("bgMusic");
let musicStarted = false;

function playMusic() {
    if (!musicStarted) {
        music.play().catch(() => {});
        musicStarted = true;
    }
}

// Floating hearts function
function createFloatingHearts() {
    const container = document.getElementById("floatingHearts");
    const hearts = ["❤️", "💕", "💖", "💗", "💝"];
    
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart-float";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

// General Quiz Data
const generalQuizData = [
    {
        question: "Who loves the other more? 😌",
        answers: ["Me!", "You!", "Both equally 💕"]
    },
    {
        question: "What is our favorite time together? 💑",
        answers: ["Late night talks 🌙", "Eating together 🍕", "Every moment 💜"]
    },
    {
        question: "What are you to me?",
        answers: ["Just wife", "My whole world 🌍", "My best friend & soulmate 💞"]
    }
];

// Intimate Quiz Data
const intimateQuizData = [
    {
        question: "What is the first thing you notice about me? 👀",
        answers: ["Your eyes 👁️", "Your smile 😊", "Your entire body 🔥"]
    },
    {
        question: "When do you feel most attracted to me? 🌙",
        answers: ["In the shower 🚿", "Late at night 🛏️", "All the time 24/7 🔥"]
    },
    {
        question: "What's your favorite way to be touched? 🤗",
        answers: ["Gentle & slow 🌙", "Passionate & intense 🔥", "Any way you touch me 💕"]
    },
    {
        question: "How do you feel about spontaneous romance? 😏",
        answers: ["Love it! 🔥", "Prefer planning 📅", "Let's do it right now! 😈"]
    }
];

let currentQuestionGeneral = 0;
let currentQuestionIntimate = 0;

// General Quiz Functions
const generalQuestionEl = document.getElementById("generalQuestion");
const generalAnswersEl = document.getElementById("generalAnswers");
const generalQuizEl = document.getElementById("generalQuiz");
const generalProposalEl = document.getElementById("generalProposal");
const generalCelebrationEl = document.getElementById("generalCelebration");

function loadGeneralQuestion() {
    const current = generalQuizData[currentQuestionGeneral];
    generalQuestionEl.innerText = current.question;
    generalAnswersEl.innerHTML = "";

    current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn", "general");
        button.onclick = nextGeneralQuestion;
        generalAnswersEl.appendChild(button);
    });
}

function nextGeneralQuestion() {
    playMusic();
    currentQuestionGeneral++;
    if (currentQuestionGeneral < generalQuizData.length) {
        loadGeneralQuestion();
    } else {
        generalQuizEl.classList.add("hidden");
        generalProposalEl.classList.remove("hidden");
        startConfetti();
    }
}

function generalCelebrate() {
    generalProposalEl.classList.add("hidden");
    generalCelebrationEl.classList.remove("hidden");
}

function startGeneralQuiz() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("generalQuizSection").classList.remove("hidden");
    document.body.className = "general-quiz";
    currentQuestionGeneral = 0;
    loadGeneralQuestion();
    playMusic();
}

// Intimate Quiz Functions
const intimateQuestionEl = document.getElementById("intimateQuestion");
const intimateAnswersEl = document.getElementById("intimateAnswers");
const intimateQuizEl = document.getElementById("intimateQuiz");
const intimateResultEl = document.getElementById("intimateResult");
const naughtyRewardEl = document.getElementById("naughtyReward");

function loadIntimateQuestion() {
    const current = intimateQuizData[currentQuestionIntimate];
    intimateQuestionEl.innerText = current.question;
    intimateAnswersEl.innerHTML = "";

    current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn", "intimate");
        button.onclick = nextIntimateQuestion;
        intimateAnswersEl.appendChild(button);
    });
}

function nextIntimateQuestion() {
    playMusic();
    currentQuestionIntimate++;
    if (currentQuestionIntimate < intimateQuizData.length) {
        loadIntimateQuestion();
    } else {
        intimateQuizEl.classList.add("hidden");
        intimateResultEl.classList.remove("hidden");
        startConfetti();
    }
}

function naughtyReward() {
    intimateResultEl.classList.add("hidden");
    naughtyRewardEl.classList.remove("hidden");
    startConfetti();
}

function startIntimateQuiz() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("intimateQuizSection").classList.remove("hidden");
    document.body.className = "intimate-quiz";
    currentQuestionIntimate = 0;
    loadIntimateQuestion();
    playMusic();
}

function goHome() {
    document.getElementById("generalQuizSection").classList.add("hidden");
    document.getElementById("intimateQuizSection").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
    document.body.className = "intimate-quiz";
    currentQuestionGeneral = 0;
    currentQuestionIntimate = 0;
    musicStarted = false;
}

// Confetti Animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

for (let i = 0; i < 150; i++) {
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 50
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff1744";
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        ctx.moveTo(c.x, c.y);
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    ctx.globalAlpha = 1;
    updateConfetti();
}

function updateConfetti() {
    for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        c.y += Math.cos(c.d) + 1;
        if (c.y > canvas.height) {
            c.y = 0;
            c.x = Math.random() * canvas.width;
        }
    }
}

function startConfetti() {
    setInterval(drawConfetti, 20);
}

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize floating hearts
createFloatingHearts();
