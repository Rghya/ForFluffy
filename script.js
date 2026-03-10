// SO if you decide to update the following things then change those too
// New song added:add in the scroll bar+dailysongcsv
// New bg added : add in const bgs



const WORKER_URL = "https://daily-fluffy-api.arghyadeepsahoo1.workers.dev";
let pairId = localStorage.getItem("pairId") || null;
let user = localStorage.getItem("user") || null;
document.getElementById("unlockBtn").onclick = async () => {
  const val = document.getElementById("lockInput").value;

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "unlock",
      data: { password: val }
    })
  });

  const json = await res.json();

  if (json.ok) {
    document.getElementById("lockScreen").style.display = "none";

    if (!user) {
      document.getElementById("loginScreen").classList.remove("hidden");
    } else {
      autoPlayDailySong();
    }

  } else {
    document.getElementById("lockError").textContent = "Wrong secret 🤍";
  }
};


document.getElementById("loginBtn").onclick = async () => {

  const name = document.getElementById("loginName").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const err = document.getElementById("loginError");

  if (!name || !pass) {
    err.textContent = "Enter login details 🤍";
    return;
  }

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      data: { name, pass }
    })
  });

  const json = await res.json();

  if (json.ok) {

    user = json.user;
    pairId = json.pairId;

    localStorage.setItem("user", user);
    localStorage.setItem("pairId", pairId);

    document.getElementById("loginScreen").classList.add("hidden");

    autoPlayDailySong();

  } else {
    err.textContent = "Wrong login 🤍";
  }

};

(function randomBackground() {
  const bgs = [
    "assets/bg1.png",
    "assets/bg3.png",
    "assets/bg4.png",
    "assets/bg5.png",
    "assets/bg6.png",
    "assets/bg7.png",
    "assets/bg8.png",
    "assets/bg9.png",
    "assets/bg10.png",
    "assets/bg11.png",
    "assets/bg12.png",
    "assets/bg13.png",
    "assets/bg14.png",
    "assets/bg15.png",
    "assets/bg16.png",
    "assets/bg17.png",
    "assets/bg18.png",
    "assets/bg19.png",
    "assets/bg20.png",
    "assets/bg21.png",
    "assets/bg22.png",
    "assets/bg23.png",
    "assets/bg24.png",
    "assets/bg25.png",
    "assets/bg26.png",
    "assets/bg27.png",
    "assets/bg28.png",
    "assets/bg29.png",
    "assets/bg30.png",
    "assets/bg31.png",
    "assets/bg32.png",
    "assets/bg33.png",
    "assets/bg34.png",
    "assets/bg35.png",
    "assets/bg36.png",
    "assets/bg37.png",
    "assets/bg38.png",
    "assets/bg39.png",
    "assets/bg40.png",
    "assets/bg41.png",
    "assets/bg42.png",
    "assets/bg43.png",
    "assets/bg44.png",
    "assets/bg45.png",
    "assets/bg46.png",
    "assets/bg47.png"
    // "assets/bg48.png",
    // "assets/bg49.png",


  ];

  const bg = bgs[Math.floor(Math.random() * bgs.length)];
  document.querySelector(".bg-overlay").style.backgroundImage = `url(${bg})`;
})();




let currentLetterType = "";

const timerEl = document.getElementById("timer");
const targetDate = new Date("May 16, 2028 00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  let diff = targetDate - now;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = (totalDays % 365) % 30;

  timerEl.innerHTML = `
    Time Left :
    ${years}Y ${months}M ${days}D
    ${hours}H ${minutes}M ${seconds}S
  `;
}, 1000);

async function checkMC() {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "mcCheck" })
  });

  const j = await res.json();
  const s = document.getElementById("mcStatus");

  if (!s) return;

  if (j.state === "waiting") {
    s.textContent = "Sent… he’ll feel it 🤍";
  }

  if (j.state === "felt") {
    s.textContent = "He felt it 🤍";
  }
}


function clearMC() {
  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "mcClear" })
  });
}






/* ===== PAGE NAVIGATION (SPA) ===== */
const homePage = document.getElementById("homePage");
const notePage = document.getElementById("notePage");
const specialPage = document.getElementById("specialPage");
const khaasPage = document.getElementById("khaasPage");
const expressPage = document.getElementById("expressPage");
const owPage = document.getElementById("owPage");
const countPage = document.getElementById("countPage");
const moodPage = document.getElementById("moodPage");
const growthPage = document.getElementById('growthPage');
const replyPage = document.getElementById("replyPage");
const repairPage = document.getElementById("repairPage");
const calmPage = document.getElementById("calmPage");
const writePage = document.getElementById("writePage");
const reassurancePage = document.getElementById("reassurancePage");
const perspectivePage = document.getElementById("perspectivePage");
const connectionPage = document.getElementById("mcPage");
const energyPage = document.getElementById("energyPage");
const doodlePage = document.getElementById("doodlePage");

function hideAllPages() {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.add("hidden");
  });

  stopFirework();
  stopEmojiRain();

}

function showRepairPage() {
  hideAllPages();
  repairPage.classList.remove("hidden");

}



function showDoodle() {
  hideAllPages();
  doodlePage.classList.remove("hidden");

  setTimeout(() => {
    const c = document.getElementById("doodleCanvas");
    if (c) {
      const rect = c.getBoundingClientRect();
      c.width = rect.width;
      c.height = 300;
    }
  }, 50);
  loadDoodles();
}


function showCalm() {
  hideAllPages();
  calmPage.classList.remove("hidden");

}

function showWrite() {
  hideAllPages();
  writePage.classList.remove("hidden");

}

function showReassurance() {
  hideAllPages();
  reassurancePage.classList.remove("hidden");

}

function showPerspective() {
  hideAllPages();
  perspectivePage.classList.remove("hidden");

}

function showMc() {
  hideAllPages();
  connectionPage.classList.remove("hidden");
  checkMC();

}

function showEnergy() {
  hideAllPages();
  energyPage.classList.remove("hidden");

}

function showHome() {
  hideAllPages();
  homePage.classList.remove("hidden");
  startHearts();
  stopFirework();
  stopEmojiRain();
}

function showReplyPage() {
  hideAllPages();
  replyPage.classList.remove("hidden");
  startEmojiRain(love2Emoji);
  loadReplies();
}




function showOW() {
  hideAllPages();
  owPage.classList.remove("hidden");
  // startEmojiRain(cuteEmoji);
}

function stopp() {
  stopHearts();
  stopFirework();
  stopEmojiRain();
}

function showGrowth() {
  hideAllPages();
  growthPage.classList.remove("hidden");
  startEmojiRain(surpriseEmoji);
}

function showCount() {
  startEmojiRain(loveEmoji);
  hideAllPages();
  countPage.classList.remove("hidden");
}
let noteInterval;

function showNote() {
  startEmojiRain(celebEmoji);
  hideAllPages();
  notePage.classList.remove("hidden");
  stopFirework();

  loadNote(); // load immediately

  clearInterval(noteInterval);
  noteInterval = setInterval(loadNote, 5000); // refresh every 5s
}
function showSpecial() {
  hideAllPages();
  specialPage.classList.remove("hidden");

}

function showMore() {
  hideAllPages();
  khaasPage.classList.remove("hidden");
  startHearts();
  stopEmojiRain();
}
let expressInterval;

function showExpress(){
  hideAllPages();
  expressPage.classList.remove("hidden");

  loadExpressLog();                 // load immediately

  clearInterval(expressInterval);
  expressInterval = setInterval(loadExpressLog, 3000); // refresh every 3s
}
/* ===== HEART RAIN ===== */
const heartsContainer = document.querySelector(".hearts");
let heartInterval;

function startHearts() {
  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }, 1500);
}

function stopHearts() {
  clearInterval(heartInterval);
  heartsContainer.innerHTML = "";
}


startHearts();


/* ===== EMOJI RAIN ===== */
const emojiRainBox = document.querySelector(".emoji-rain");
let emojiRainInterval = null;

// 👉 EDIT THIS LIST ONLY
const naughtyEmoji = ["🍑", "🔞", "🥵", "💦", "👅", "💋", "👡", "👙", "🍒", "👠"];
const loveEmoji = ["🤍", "💖", "💕", "💞", "💓"];
const celebEmoji = ["🎉", "🎆", "✨", "🔥", "💥"];
const susEmoji = ["😁", "😋", "😘", "🤗", "😚", "😉"];
const love2Emoji = ["🤍", "💖", "💕", "💞", "💓", "💘", "💗", "🫶", "🥰", "😍"];
const cuteEmoji = ["🌸", "🌼", "🌷", "🧸", "🐻", "🐰", "💫", "🍓", "🫧", "🎀"];
const surpriseEmoji = ["🤍", "💋", "🌙", "🔥", "🥺", "🎉", "✨", "🍒", "🫶", "😏"];


function startEmojiRain(emojiList) {
  if (emojiRainInterval) return;

  emojiRainInterval = setInterval(() => {
    const e = document.createElement("div");
    e.className = "emoji-drop";
    e.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = 16 + Math.random() * 28 + "px";
    e.style.animationDuration = 4 + Math.random() * 4 + "s";
    e.style.opacity = Math.random() * 0.6 + 0.4;

    emojiRainBox.appendChild(e);

  }, 850);
}

function stopEmojiRain() {
  clearInterval(emojiRainInterval);
  emojiRainInterval = null;
  emojiRainBox.innerHTML = "";
}


let csvNote = "";

async function loadDailyNote() {
  try {
    const res = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRm6s1CaOpMWhPKj-DLE_nTVildXV-iWq3LvkuvKNzJyK27iteTUQv5uT5tjk411dTvaN7PwySYIw1m/pub?output=csv");
    const text = await res.text();
    const rows = text.split("\n").slice(1);

    const today = new Date().toISOString().slice(0, 10);
    let note = "I was a lil busy Love, but will make up for it okkii 🤍";

    rows.forEach(row => {
      const [date, msg] = row.split(",");
      if (date === today) note = msg;
    });

    csvNote = note; // store only
  } catch {
    csvNote = "I’m here even if the note didn’t load 🤍";
  }
}


loadDailyNote();

function loadNote(){

  const day = new Date().toISOString().slice(0,10);

  onValue(ref(db,"notes/"+day),(snapshot)=>{

    const data = snapshot.val();
    const box = document.getElementById("dailyNote");

    if(!data){
      box.textContent="Waiting for note 🤍";
      return;
    }

    const partner = Object.keys(data).find(k=>k!==user);

    if(partner){
      box.textContent = data[partner].text;
    }

  });

}
let songg = "";

/* ===== LOAD DAILY SONG FROM CSV ===== */
async function loadDailySong() {
  try {
    const res = await fetch("daily-songs.csv");
    const text = await res.text();
    const rows = text.trim().split("\n").slice(1);

    const today = new Date().toISOString().slice(0, 10);

    for (let row of rows) {
      const [date, song] = row.split(",");
      if (date.trim() === today) {
        songg = song.trim();
        break;
      }
    }

    if (!songg) return;

    loadLocalSong(songg);

  } catch (err) {
    console.error("Song load failed. Reload the page fluffy", err);
  }
}

/* ===== LOAD LOCAL SONG ===== */
function loadLocalSong(filename) {
  const audio = document.getElementById("audioPlayer");
  const cover = document.getElementById("coverArt");

  audio.src = `song/${filename}`;
  audio.load();

  /* Read embedded cover */
  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      const pic = tag.tags.picture;
      if (pic) {
        const data = pic.data;
        const format = pic.format;

        let base64 = "";
        for (let i = 0; i < data.length; i++) {
          base64 += String.fromCharCode(data[i]);
        }

        cover.src = `data:${format};base64,${btoa(base64)}`;
      }
    },
    onError: function () {
      cover.src = "fallback.jpg"; // optional
    }
  });
}


/* ===== CUSTOM PLAYER CONTROLS ===== */
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const waves = document.querySelectorAll(".wave span");
const time = document.getElementById("time");

/* Play / Pause */
playBtn.onclick = () => {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    playBtn.textContent = "❚❚";
    playBtn.classList.add("playing");
    waves.forEach(w => w.style.animationPlayState = "running");
  } else {
    audio.pause();
    playBtn.textContent = "♡";
    playBtn.classList.remove("playing");
    waves.forEach(w => w.style.animationPlayState = "paused");
  }
};

/* Progress update */
audio.ontimeupdate = () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  const m = Math.floor(audio.currentTime / 60);
  const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  time.textContent = `${m}:${s}`;
};

/* Click to seek */
function seek(e) {
  if (!audio.duration) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
}

/* Reset UI when song ends */
audio.onended = () => {
  playBtn.textContent = "♡";
  playBtn.classList.remove("playing");
  waves.forEach(w => w.style.animationPlayState = "paused");
};

/* Initial state */
waves.forEach(w => w.style.animationPlayState = "paused");

/* Start */
loadDailySong();






const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let rockets = [];
let particles = [];
let loopId = null;
let intervalId = null;
let running = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ===== ROCKET ===== */
class Rocket {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.vy = -(Math.random() * 4 + 7);
    this.targetY = Math.random() * canvas.height * 0.4 + 80;
    this.exploded = false;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  update() {
    this.y += this.vy;
    this.vy += 0.02; // gravity
    this.drawTrail();

    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      explode(this.x, this.y, this.color);
    }
  }

  drawTrail() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/* ===== PARTICLES ===== */
class Particle {
  constructor(x, y, color) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.vy += 0.05;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function explode(x, y, color) {
  for (let i = 0; i < 160; i++) {
    particles.push(new Particle(x, y, color));
  }
}

/* ===== ANIMATION LOOP ===== */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rockets = rockets.filter(r => !r.exploded);
  particles = particles.filter(p => p.alpha > 0);

  rockets.forEach(r => r.update());
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  loopId = requestAnimationFrame(animate);
}

/* ===== PUBLIC CONTROLS ===== */
function startFirework() {
  if (running) return;
  running = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animate();

  intervalId = setInterval(() => {
    rockets.push(new Rocket());
  }, 550);
}

function stopFirework() {
  running = false;

  cancelAnimationFrame(loopId);
  clearInterval(intervalId);

  rockets = [];
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}






async function loadSpecialFromJSON() {
  try {
    const res = await fetch("specials.json", { cache: "no-store" });
    if (!res.ok) throw new Error("specials.json not found");

    const data = await res.json();

    const today = new Date();
    const key =
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    const eventEl = document.getElementById("specialEvent");
    const historyEl = document.getElementById("specialHistory");
    const challengeEl = document.getElementById("specialChallenge");

    if (data[key]) {
      const item = data[key];

      eventEl.textContent = item.title;
      historyEl.textContent = item.desc;
      challengeEl.textContent = item.challenge;
    } else {
      eventEl.textContent = "Fluffyy and Popooo togetherr Today ✨";
      historyEl.textContent = "Whatss moree speciall thann us havinn eachh otherrr 🤍";
      challengeEl.textContent = "Lovee mee!!";
    }

  } catch (e) {
    console.error(e);
    document.getElementById("specialEvent").textContent =
      "Failed to load special. Dont worryy reload the page lovee";
  }
}

// load once
loadSpecialFromJSON();

(function checkDone() {
  const key = "done-" + new Date().toISOString().slice(0, 10);

  if (localStorage.getItem(key)) {
    document.querySelector(".done-btn")?.remove();
    document.querySelector(".done-text")?.classList.remove("hidden");
    document.getElementById("reactionBox")?.classList.remove("locked");
  }
})();


/* ===== CARD TOGGLE ===== */
function unlock(card, next) {
  card.classList.add("active");
  document.getElementById(next)?.classList.remove("locked");
  celebrate();
}

/* ===== DAILY CHALLENGE DONE ===== */
function markDone() {
  const key = "done-" + new Date().toISOString().slice(0, 10);

  localStorage.setItem(key, "true");

  document.querySelector(".done-btn")?.remove();
  document.querySelector(".done-text")?.classList.remove("hidden");
  document.getElementById("reactionBox")?.classList.remove("locked");

  celebrate();
}


/* Load completion state */
(function checkDone() {
  const key = "specialDone-" + new Date().toDateString();
  if (localStorage.getItem(key)) {
    document.querySelector(".done-btn")?.remove();
    document.querySelector(".done-text")?.classList.remove("hidden");
  }
})();

function stopp() {
  stopEmojiRain();
  stopHearts();
  stopFirework();
}

/* ===== REACTIONS ===== */
function react(t) {
  localStorage.setItem("react-" + Date(), t);
  if (t === "love") startHearts();
  if (t === "fire") startFirework();
  if (t === "meh") startEmojiRain(naughtyEmoji);
  if (t === "se") startEmojiRain(susEmoji);
  if (t === "cross") stopp();
}




async function sendFeeling(type) {

  const map = {
    missing: "🤍 She is missing you",
    thinking: "💭 She is thinking of you",
    close: "🫶 She feels close to you",
    presence: "🧲 She wants you by her side",
    longing: "🌙 She is longing for you",
    attached: "🪶 She feels deeply attached to you",
    fullheart: "💖 Her heart feels full",
    voice: "🎧 She is craving your voice",
    warm: "🔥 She feels warm inside",
    connected: "🫀 She feels emotionally connected to you",

    need: "🫂 She needs you right now",
    comfort: "🧸 She wants comfort",
    insecure: "🥺 She is feeling insecure",
    reassure: "🫶 She needs reassurance",
    dependent: "🪢 She feels emotionally dependent",
    hug: "🤗 She wants a hug from you",
    small: "🫧 She feels small and vulnerable",
    support: "🛟 She needs emotional support",

    low: "🌧️ She is feeling low",
    tired: "🪫 She is mentally tired",
    drained: "🫠 She feels drained",
    sad: "😔 She feels sad without a reason",
    empty: "🕳️ She feels empty",
    overwhelmed: "🧱 She feels overwhelmed",
    lonely: "🌫️ She feels lonely",
    exhausted: "🛌 She is emotionally exhausted",

    overthinking: "🌀 She is overthinking everything",
    mind: "🧠 Her mind won’t shut up",
    anxious: "😰 She is feeling anxious",
    doubt: "❓ She is doubting herself",
    confused: "🧩 She feels confused",
    lost: "💭 She is lost in her thoughts",
    restless: "⚡ She feels emotionally restless",

    calm: "☀️ She feels calm",
    safe: "🛡️ She feels safe",
    peace: "🌿 She feels at peace",
    settled: "⚖️ She feels emotionally settled",
    balanced: "🌊 She feels balanced",
    quietHappy: "😌 She is quietly happy",

    happy: "😄 She is feeling happy",
    smile: "😊 She is smiling because of you",
    grateful: "🌸 She feels grateful",
    hopeful: "✨ She feels hopeful",
    lucky: "🍀 She feels lucky",

    irritated: "😤 She feels irritated",
    frustrated: "😣 She feels frustrated",
    tense: "🔥 She feels emotionally tense",
    vent: "🗯️ She needs to let things out",

    naughty: "💋 She is feeling naughty",
    flirty: "😏 She is feeling flirty"
  };

  const text = map[type] || type;

  push(ref(db,"expressLogs"),{
    user,
    feeling: text,
    time: Date.now()
  });

  const status = document.getElementById("feelingStatus");
  status.textContent = "Sent 🤍";
  status.classList.remove("hidden");
}

function handleStreak() {
  const today = new Date().toISOString().slice(0, 10);

  const lastVisit = localStorage.getItem("lastVisit");
  let streak = Number(localStorage.getItem("streak")) || 0;

  if (!lastVisit) {
    streak = 1; // first ever visit
  }
  else {
    const diffDays =
      (new Date(today) - new Date(lastVisit)) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak += 1; // continued streak
    }
    else if (diffDays > 1) {
      streak = 1; // streak broken
    }
    // diffDays === 0 → same day → no change
  }

  localStorage.setItem("lastVisit", today);
  localStorage.setItem("streak", streak);

  document.getElementById("streakBox").textContent =
    "🔥 Streak: " + streak + " days";
}

handleStreak();


/* ===== OPEN WHEN LETTERS ===== */
const letters = {
  sad1: "I know today feels heavy. Ya don’t need to fix anything right now. Just breathe. I’m right here with ya 🤍. Juss send me a msg and when i get time i will be there to hear ya okkii lovee. Take it easy Darlinn",
  sad2: "It’s okay to feel sad. You’re allowed to feel this without explaining it to anyone.",
  sad3: "Even on your sad days, you are still loved more than you know.",
  sad4: "This feeling will pass. You’ve survived worse, and you’re still here 🤍",
  sad5: "You don’t have to be strong today. Just exist — that’s enough.",

  low1: "Low days don’t define you. They’re just pauses, not endings.",
  low2: "You’re not weak for feeling low. You’re human.",
  low3: "Even slow days are progress. Be gentle with yourself.",
  low4: "Rest is allowed. You don’t owe productivity today.",
  low5: "I wish I could sit beside you quietly right now.",

  miss1: "I know you’re missing me right now. Distance doesn’t change what we are 🤍",
  miss2: "Missing me means we mattered. That’s something beautiful.",
  miss3: "I’m thinking of you too — probably at the same moment.",
  miss4: "Close your eyes for a second. That’s where I am.",
  miss5: "Time will bring us back to each other.",

  anx1: "Your thoughts are loud, but they are not facts. Breathe.",
  anx2: "You don’t need all the answers tonight.",
  anx3: "Slow your breathing. You’re safe right now.",
  anx4: "Overthinking means you care — not that something is wrong.",
  anx5: "Let your mind rest for a moment.",

  night1: "It’s late, and your thoughts are louder than usual. You’re not alone.",
  night2: "The night makes emotions heavier — that’s not your fault.",
  night3: "Try to relax your shoulders. You’ve done enough today.",
  night4: "Even if you can’t sleep, you can still rest.",
  night5: "I wish I was there to say goodnight properly 🤍",

  lonely1: "Feeling lonely doesn’t mean you are unloved.",
  lonely2: "You matter — even when no one is around.",
  lonely3: "This feeling won’t last forever.",
  lonely4: "I see you, even when others don’t.",
  lonely5: "You’re not invisible to me.",

  happy1: "Seeing you happy makes everything worth it.",
  happy2: "Hold onto this feeling. You deserve it.",
  happy3: "Your happiness is precious 🤍",

  secure1: "You are enough. You don’t need to prove anything.",
  secure2: "I care about you — deeply and genuinely.",
  secure3: "You are safe to be yourself.",

  hug1: "Imagine my arms around you, holding you gently.",
  hug2: "This hug lasts as long as you need it.",

  cry1: "If you need to cry, let it out. I won’t judge.",
  empty1: "Feeling empty doesn’t mean you are empty.",
  tired1: "You’ve been strong for too long. Rest now.",
  lost1: "Not knowing the way is okay. You’ll find it.",
  sad6: "Even now, you are still worthy of love and care.",
  sad7: "You don’t have to rush healing. Take your time.",
  sad8: "Sadness doesn’t erase your strength.",
  sad9: "You’re allowed to feel this without guilt.",
  sad10: "This moment will soften. I promise.",

  miss6: "I miss you too, even if you don’t hear it.",
  miss7: "Distance is hard, but it’s not permanent.",
  miss8: "You’re closer to me than you think.",
  miss9: "Every missing moment brings us closer to the next meeting.",
  miss10: "Hold on — this gap won’t last forever.",

  anx6: "Your thoughts are not commands. Let them pass.",
  anx7: "You are not your anxiety.",
  anx8: "Breathe slowly. Nothing is chasing you.",
  anx9: "It’s okay to pause the thinking.",
  anx10: "Peace will return — give it space.",

  night6: "The night exaggerates feelings. Morning will soften them.",
  night7: "You’re safe, even if sleep isn’t here yet.",
  night8: "Let your body rest, even if your mind won’t.",
  night9: "This quiet won’t hurt you.",
  night10: "You made it through today. That’s enough.",

  secure4: "You don’t need to earn love.",
  secure5: "Nothing about you is too much.",
  secure6: "You are wanted exactly as you are.",

  hug3: "Imagine being held without words.",
  hug4: "This hug doesn’t end quickly.",

  lonely6: "Loneliness is a feeling, not a truth.",
  lonely7: "You are still connected.",
  lonely8: "I’m thinking of you right now.",

  tired2: "You’ve been carrying a lot.",
  tired3: "Rest is productive too.",

  cry2: "Tears are allowed here.",
  cry3: "You don’t need permission to cry.",

  empty2: "Feeling empty means something mattered.",
  empty3: "This space will fill again.",

  hope1: "Hope doesn’t disappear — it hides.",
  strength1: "You are stronger than this moment.",
  patience1: "Not everything needs to be solved now.",
  calm1: "Slow down. You’re okay.",
  love1: "You are loved, even on quiet days."


};
let typingInterval;

function openLetter(letterEl, type) {
  const modal = document.getElementById("letterModal");
  const textEl = document.getElementById("letterText");

  const fullText = letters[type] || "This letter is empty.";

  clearInterval(typingInterval);
  textEl.textContent = "";
  textEl.classList.add("typing");
  currentLetterType = type;
  let i = 0;
  typingInterval = setInterval(() => {
    textEl.textContent += fullText.charAt(i);
    i++;

    if (i >= fullText.length) {
      clearInterval(typingInterval);
      textEl.classList.remove("typing");
    }
  }, 35);

  modal.classList.remove("hidden");
}



function sendReply() {
  const msg = document.getElementById("replyText").value.trim();
  const status = document.getElementById("replyStatus");

  if (!msg) {
    status.textContent = "Write something first Fluffy🤍";
    return;
  }

  const finalMessage =
    `💌 New Reply\n📄 Letter: ${currentLetterType}\n\n${msg}`;

  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendReply",
      data: { text: finalMessage }
    })
  })
    .then(() => {
      status.textContent = "Sent 💖";
      document.getElementById("replyText").value = "";
    })
    .catch(() => {
      status.textContent = "Failed 😔 butt dont worryy try once moree honeyy";
    });
}






/* ===== COUNTDOWNS ===== */
(function initCountdowns() {
  // ✏️ EDIT THESE DATES ONLY
  const startedDate = new Date("2025-09-29");   // relationship start
  const lastCallDate = new Date("2026-01-12");  // last call
  const nextPlanDate = new Date("2026-02-14");  // next meet / plan
  const lastheldhandsDate = new Date("2025-12-05");
  const lastVideoDate = new Date("2026-01-23");
  const lastSpicyDate = new Date("2026-02-14");
  // const Date = new Date("2026-02-14");
  // const Date = new Date("2026-02-14");
  // const Date = new Date("2026-02-14");
  // const Date = new Date("2026-02-14");
  // const Date = new Date("2026-02-14");








  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function daysBetween(a, b) {
    return Math.floor((b - a) / (1000 * 60 * 60 * 24));
  }

  document.getElementById("cdStarted").textContent =
    daysBetween(startedDate, today) + " days";

  document.getElementById("cdLastCall").textContent =
    daysBetween(lastCallDate, today) + " days";

  document.getElementById("cdLastVCall").textContent =
    daysBetween(lastVideoDate, today) + " days";

  document.getElementById("cdLastIntimate").textContent =
    daysBetween(lastSpicyDate, today) + " days";

  document.getElementById("cdLastHeld").textContent =
    daysBetween(lastheldhandsDate, today) + " days";

  const until = daysBetween(today, nextPlanDate);
  document.getElementById("cdNext").textContent =
    until >= 0 ? until + " days" : "Soon 🤍";
})();




(function growthTimeline() {
  /* ✏️ EDIT THIS DATE ONLY */
  const startDate = new Date("2025-09-29");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysTogether = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const todayStr = new Date().toISOString().slice(0, 10);

  let visits = Number(localStorage.getItem("totalVisits")) || 0;
  const lastVisitDate = localStorage.getItem("lastVisitDate");

  if (lastVisitDate !== todayStr) {
    visits++;
    localStorage.setItem("totalVisits", visits);
    localStorage.setItem("lastVisitDate", todayStr);
  }


  /* STREAK */


  /* HARD DAYS */
  if (!localStorage.getItem("hardDays")) {
    localStorage.setItem("hardDays", "0");
  }

  const hardDays =
    Number(localStorage.getItem("hardDays"));

  /* UI */
  document.getElementById("gtDays").textContent =
    daysTogether + " days";


  document.getElementById("gtVisits").textContent =
    visits;

  document.getElementById("gtHard").textContent =
    hardDays;

  /* MESSAGE */
  const msg = document.getElementById("growthMessage");
  msg.textContent =
    daysTogether > 300
      ? "If we made it this far, we can handle anything 🤍"
      : "We’re still building — and that’s beautiful 🤍";

  /* MONTHLY RECAP */
  const monthKey =
    "recap-" + today.getFullYear() + "-" + today.getMonth();

  let recap =
    JSON.parse(localStorage.getItem(monthKey)) || {
      visits: 0,
      hardDays: 0
    };

  recap.visits++;
  localStorage.setItem(monthKey, JSON.stringify(recap));

  disableHardDayBtn();

})();

/* ===== HARD DAY BUTTON ===== */
function addHardDay() {
  const today = new Date().toISOString().slice(0, 10);
  const lastHardDay = localStorage.getItem("lastHardDay");

  if (lastHardDay === today) return; // already counted today

  let hard = Number(localStorage.getItem("hardDays")) || 0;
  hard++;

  localStorage.setItem("hardDays", hard);
  localStorage.setItem("lastHardDay", today);

  document.getElementById("gtHard").textContent = hard;

  disableHardDayBtn();
}

function disableHardDayBtn() {
  const btn = document.querySelector(".growth-btn");
  if (!btn) return;

  const today = new Date().toISOString().slice(0, 10);
  const lastHardDay = localStorage.getItem("lastHardDay");

  if (lastHardDay === today) {
    btn.textContent = "🤍 You stayed strong today";
    btn.disabled = true;
    btn.style.opacity = "0.6";
  }
}

(function milestoneSystem() {
  const startDate = new Date("2025-09-29"); // SAME as growth timeline
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysTogether = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  const milestoneDays = 90; // ~3 months
  const completed = Math.floor(daysTogether / milestoneDays);
  const progressDays = daysTogether % milestoneDays;

  const percent = Math.min(
    (progressDays / milestoneDays) * 100,
    100
  );

  document.getElementById("msFill").style.width = percent + "%";
  document.getElementById("msRemaining").textContent =
    milestoneDays - progressDays;

  /* ===== HISTORY ===== */
  let history =
    JSON.parse(localStorage.getItem("milestoneHistory")) || [];

  for (let i = 1; i <= completed; i++) {
    const label = `Completed ${i * 3} months together 🤍`;
    if (!history.includes(label)) {
      history.push(label);
    }
  }

  localStorage.setItem(
    "milestoneHistory",
    JSON.stringify(history)
  );

  const list = document.getElementById("milestoneList");
  list.innerHTML = "";

  history.forEach(h => {
    const li = document.createElement("li");
    li.textContent = "✨ " + h;
    list.appendChild(li);
  });
})();


const startDate = new Date("2025-09-29"); // SAME DATE everywhere
const milestoneDays = 90; // ~3 months

const today = new Date();
today.setHours(0, 0, 0, 0);

const daysTogether = Math.floor(
  (today - startDate) / (1000 * 60 * 60 * 24)
);

const completed = Math.floor(daysTogether / milestoneDays);
const progressDays = daysTogether % milestoneDays;

/* ===== PROGRESS BAR ===== */
document.getElementById("msFill").style.width =
  (progressDays / milestoneDays) * 100 + "%";

document.getElementById("msRemaining").textContent =
  milestoneDays - progressDays;

/* ===== MILESTONE HISTORY (NO STORAGE) ===== */
const list = document.getElementById("milestoneList");
list.innerHTML = "";

for (let i = 1; i <= completed; i++) {
  const d = new Date(startDate);
  d.setDate(d.getDate() + i * milestoneDays);

  const li = document.createElement("li");
  li.style.display = "flex";
  li.style.justifyContent = "space-between";

  li.innerHTML = `
    <span>Completed ${i * 3} months together 🤍</span>
    <span style="opacity:.7;font-size:12px">
      ${d.toDateString()}
    </span>
  `;

  list.appendChild(li);
}

function notifyTelegram(message) {
  return fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendFeeling",
      data: { text: message }
    })
  });
}



function celebrateFor(seconds = 5) {
  startFirework();

  setTimeout(stopFirework, seconds * 1000);
}

async function loadReplies() {
  const box = document.getElementById("replyList");
  box.innerHTML = "Loading replies…";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "fetchReplies",
        data: {}
      })
    });

    const json = await res.json();

    if (!json.ok) {
      box.innerHTML = "Error loading replies. Dontt Panicc lovee reloadd or tell me to send a replyy okkii🤍";
      return;
    }

    renderReplies(json.messages.reverse(), box);

  } catch (e) {
    console.error(e);
    box.innerHTML = "Error loading replies. Dontt Panicc lovee reloadd or tell me to send a replyy okkii🤍";
  }
}


function renderReplies(msgs, box) {
  if (msgs.length === 0) {
    box.innerHTML = "No replies yet 🤍";
    return;
  }

  box.innerHTML = "";
  msgs.forEach(m => {
    const div = document.createElement("div");
    div.style.marginBottom = "12px";
    div.style.paddingBottom = "8px";
    div.style.borderBottom = "1px solid rgba(255,255,255,0.4)";
    div.innerHTML = `
      <div style="font-size:15px">${m.text}</div>
      <div style="font-size:11px;opacity:.6">
        ${new Date(m.time).toLocaleString()}
      </div>
    `;
    box.appendChild(div);
  });
}


/* ===== CALM PAGE BREATHING ===== */

let breathState = 0;
let breathInterval;

function startBreathing() {
  const text = document.getElementById("breathText");
  const guide = document.getElementById("breathGuide");
  if (!text || !guide) return;

  clearInterval(breathInterval);

  const steps = [
    ["Inhale", "Inhale through your nose"],
    ["Hold", "Hold gently"],
    ["Exhale", "Slowly exhale through mouth"],
    ["Hold", "Rest here"]
  ];

  breathState = 0;
  text.textContent = steps[0][0];
  guide.textContent = steps[0][1];

  breathInterval = setInterval(() => {
    breathState = (breathState + 1) % steps.length;
    text.textContent = steps[breathState][0];
    guide.textContent = steps[breathState][1];
  }, 2000);
}

function restartBreathing() {
  startBreathing();
}

/* auto start when page opens */
const calmObserver = new MutationObserver(() => {
  if (!document.getElementById("calmPage").classList.contains("hidden")) {
    startBreathing();
  }
});

calmObserver.observe(document.getElementById("calmPage"), {
  attributes: true,
  attributeFilter: ["class"]
});

/* ===== WRITE & RELEASE LOGIC ===== */
function releaseWrite() {
  const box = document.getElementById("writeBox");
  const dustLayer = document.getElementById("dustLayer");
  const status = document.getElementById("writeStatus");

  if (!box.value.trim()) return;

  const rect = box.getBoundingClientRect();
  dustLayer.innerHTML = "";

  const count = 80; // soft density

  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "dust";

    const size = Math.random() * 4 + 2;
    d.style.width = size + "px";
    d.style.height = size + "px";

    d.style.left = Math.random() * rect.width + "px";
    d.style.top = Math.random() * rect.height + "px";

    d.style.setProperty("--x", Math.random());

    d.style.animationDuration =
      3 + Math.random() * 2 + "s";

    dustLayer.appendChild(d);
  }

  box.value = "";
  status.classList.remove("hidden");

  setTimeout(() => {
    dustLayer.innerHTML = "";
    status.classList.add("hidden");
  }, 5000);
}

/* ===== REASSURANCE LOGIC ===== */

const reassuranceLines = [
  "Fluffy, ya don’t have to be strong right now okki.",
  "Ya are safe here, always okki.",
  "Darlin, even your silence makes sense to me.",
  "Ya are not too much, not today, not ever.",
  "It’s okki if ya feel tired of everything.",
  "Love, I’m not going anywhere, breathe.",
  "Ya don’t need to explain yourself to be loved.",
  "Even on messy days, ya are still enough okki.",
  "Honey, your heart is allowed to rest.",
  "Ya are doing better than ya think.",
  "It’s okki to slow down, sweetie.",
  "Ya don’t have to fix anything tonight.",
  "Fluffy, I see how hard ya are trying.",
  "Ya are allowed to feel weak sometimes okki.",
  "Baby, this moment will not break ya.",
  "Ya are safe to feel everything here.",
  "Darlin, your feelings are not a burden.",
  "Ya don’t need permission to rest.",
  "Even if ya feel lost, ya are not alone okki.",
  "Love, ya are still loved on quiet days.",
  "It’s okki to take space and still be close.",
  "Ya don’t need to earn care, honey.",
  "Your softness is not a weakness okki.",
  "Sweetie, ya are held even when ya don’t feel it.",
  "Ya can take this one breath at a time.",
  "It’s okki if today is just survival.",
  "Fluffy, ya are not failing, ya are feeling.",
  "Ya are allowed to pause without guilt.",
  "Even now, ya are enough okki.",
  "Baby, your heart is still safe here.",
  "Ya don’t have to carry everything alone.",
  "It’s okki if ya cry and don’t know why.",
  "Darlin, ya matter even when ya’re quiet.",
  "Ya don’t need to rush healing okki.",
  "This heaviness will soften, love.",
  "Ya are not broken, just tired.",
  "Sweetie, your presence itself is enough.",
  "It’s okki to not be okki today.",
  "Ya are still lovable on hard days.",
  "Honey, ya are doing your best.",
  "Ya don’t need to be perfect to be cared for.",
  "It’s okki to ask for nothing and still receive.",
  "Fluffy, ya are safe to feel small here.",
  "Ya are not alone in this moment.",
  "Even your slow days count okki.",
  "Darlin, ya are held gently, always.",
  "Ya are allowed to rest without fear.",
  "It’s okki to lean a little.",
  "Baby, ya are still chosen."
];


// load seen list
let seenReassure = JSON.parse(localStorage.getItem("seenReassure")) || [];
let remaining = reassuranceLines.filter(
  l => !seenReassure.includes(l)
);

let typeInterval;

function typeReassure(text) {
  const el = document.getElementById("reassureText");
  if (!el) return;

  clearInterval(typeInterval);
  el.textContent = "";
  el.classList.add("typing");

  let i = 0;
  typeInterval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      el.classList.remove("typing");
    }
  }, 45);
}

function nextReassure() {
  // if all used → reset cycle
  if (remaining.length === 0) {
    seenReassure = [];
    remaining = [...reassuranceLines];
  }

  const line = remaining.shift(); // take first unused
  seenReassure.push(line);

  localStorage.setItem("seenReassure", JSON.stringify(seenReassure));

  typeReassure(line);
}

/* auto show when page opens */
const reassureObserver = new MutationObserver(() => {
  const page = document.getElementById("reassurancePage");
  if (!page) return;

  if (!page.classList.contains("hidden")) {
    nextReassure(); // always show new one
  }
});

reassureObserver.observe(
  document.getElementById("reassurancePage"),
  { attributes: true, attributeFilter: ["class"] }
);



/* ===== PERSPECTIVE SHIFT LOGIC ===== */

const perspectives = [
  "This is a hard moment, not a hard life okki.",
  "Fluffy, feelings feel loud but they pass.",
  "Ya are tired, not broken.",
  "This moment doesn’t define your story.",
  "Love, pain is a wave, not the ocean.",
  "Ya are reacting to hurt, not failing.",
  "This is repair, not damage okki.",
  "Honey, emotions feel permanent but they aren’t.",
  "Ya can pause without quitting.",
  "This discomfort is temporary okki.",
  "Sweetie, even storms move on.",
  "Ya are allowed to take space and still be loved.",
  "This is a chapter, not the ending.",
  "Darlin, growth feels uncomfortable sometimes.",
  "Ya are learning, not losing.",
  "This moment is loud, not forever.",
  "Fluffy, rest is part of progress.",
  "Ya don’t need to solve everything tonight.",
  "This feeling will shrink with time okki.",
  "Honey, your heart is stretching, not breaking.",
  "Ya are safe even when uncertain.",
  "This is a pause, not a collapse.",
  "Darlin, healing is not linear.",
  "Ya are allowed to go slow.",
  "This is stress talking, not truth.",
  "Fluffy, your mind is tired, not right.",
  "Ya don’t need answers right now okki.",
  "This moment will look different later.",
  "Love, emotions exaggerate at night.",
  "Ya are still on your path.",
  "This is tension, not separation.",
  "Fluffy, closeness doesn’t vanish in silence.",
  "Ya are adjusting, not failing.",
  "This feeling is a signal, not a sentence.",
  "Sweetie, nothing important is lost.",
  "Ya are allowed to reset.",
  "This is a wave passing through.",
  "Gurly, tomorrow will feel softer.",
  "Ya don’t have to decide anything now.",
  "This is a moment of care, not danger.",
  "Baby, emotions don’t predict the future.",
  "Ya are still connected, even in distance.",
  "This is discomfort, not doom okki.",
  "Love, love doesn’t disappear in hard times.",
  "Ya are allowed to breathe before thinking.",
  "This moment is heavy, not permanent.",
  "Darlin, clarity comes after rest.",
  "Ya are safe to slow down.",
  "This is part of healing, not the opposite.",
  "Honey, this will make sense later okki."
];


// load seen perspectives
let seenPersp = JSON.parse(localStorage.getItem("seenPerspectives")) || [];
let remainingPersp = perspectives.filter(
  p => !seenPersp.includes(p)
);

function nextPerspective() {
  const el = document.getElementById("perspectiveText");
  if (!el) return;

  // reset when all used
  if (remainingPersp.length === 0) {
    seenPersp = [];
    remainingPersp = [...perspectives];
  }

  const line = remainingPersp.shift();
  seenPersp.push(line);

  localStorage.setItem("seenPerspectives", JSON.stringify(seenPersp));

  el.style.opacity = 0;

  setTimeout(() => {
    el.textContent = line;
    el.style.opacity = 1;
  }, 300);
}

/* auto show new one when page opens */
const perspectiveObserver = new MutationObserver(() => {
  const page = document.getElementById("perspectivePage");
  if (!page) return;

  if (!page.classList.contains("hidden")) {
    nextPerspective();
  }
});

perspectiveObserver.observe(
  document.getElementById("perspectivePage"),
  { attributes: true, attributeFilter: ["class"] }
);

function sendDayShare(){

  const text = document.getElementById("dayShareText").value.trim();
  if(!text) return;

  const day = new Date().toISOString().slice(0,10);

  set(ref(db,"notes/"+day+"/"+user),{
    text,
    time: Date.now()
  });

  document.getElementById("dayShareText").value="";
}
/* ===== MUTUAL MICRO CONNECTION ===== */

function sendPingMC() {
  clearMC();
  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "mcPing" })
  });

  document.getElementById("mcStatus").textContent =
    "Sent… he’ll feel it 🤍";
}

function waitTogether() {
  clearMC();
  const s = document.getElementById("mcStatus");
  let n = 10;
  s.textContent = "Waiting together… 10";

  const i = setInterval(() => {
    n--;
    s.textContent = "Waiting together… " + n;
    if (n <= 0) {
      clearInterval(i);
      s.textContent = "Still connected 🤍";
    }
  }, 1000);
}

function promiseConnect() {
  clearMC();
  notifyTelegram("🤍 She promised to reconnect later");
  document.getElementById("mcStatus").textContent =
    "Promise sent 🤍";
}



let energy = 0;
const maxEnergy = 100;

const zone = document.getElementById("energyZone");
const fill = document.getElementById("energyFill");
const txt = document.getElementById("energyText");

zone.onclick = () => {
  energy += 4;
  if (energy > maxEnergy) energy = maxEnergy;

  fill.style.width = energy + "%";

  if (energy < 30) txt.textContent = "Let it out…";
  else if (energy < 60) txt.textContent = "Good… keep going…";
  else if (energy < 90) txt.textContent = "Almost there…";
  else txt.textContent = "Release complete 🤍";

  zone.style.transform = `scale(${0.95 + Math.random() * 0.1})`;
};

function finishEnergy() {
  energy = 0;
  fill.style.width = "0%";
  txt.textContent = "Your body feels calmer now 🤍";
}



/* ===== PROFESSIONAL DOODLE ===== */
/* =====================================================
   🎨 DOODLE SYSTEM (SAFE, NAMESPACED, WORKING)
===================================================== */

(function () {
  const doodleCanvas = document.getElementById("doodleCanvas");
  if (!doodleCanvas) return; // page not loaded yet

  const doodleCtx = doodleCanvas.getContext("2d");

  const brushColor = document.getElementById("brushColor");
  const brushSize = document.getElementById("brushSize");
  const statusText = document.getElementById("doodleStatus");

  let drawing = false;
  let tool = "pen";
  let strokes = [];
  let currentStroke = [];

  /* ===== SETUP CANVAS ===== */
  function setupCanvas() {
    const rect = doodleCanvas.getBoundingClientRect();
    doodleCanvas.width = rect.width;
    doodleCanvas.height = 300;

    doodleCtx.lineCap = "round";
    doodleCtx.lineJoin = "round";
    redraw();
  }

  window.addEventListener("resize", setupCanvas);
  setupCanvas();

  /* ===== TOOL SELECT ===== */
  window.setTool = function (t) {
    tool = t;
  };

  /* ===== POSITION ===== */
  function getPos(e) {
    const rect = doodleCanvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }







  /* ===== DRAW EVENTS ===== */
  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    currentStroke = [getPos(e)];
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    currentStroke.push(getPos(e));
    redraw();
  }

  function stopDraw(e) {
    if (!drawing) return;
    e.preventDefault();

    strokes.push({
      tool,
      color: brushColor.value,
      size: brushSize.value,
      points: [...currentStroke]
    });

    drawing = false;
    currentStroke = [];
  }

  /* ===== RENDER ===== */
  function drawStroke(stroke) {
    const pts = stroke.points;
    if (pts.length < 2) return;

    doodleCtx.beginPath();
    doodleCtx.lineWidth = stroke.size;
    doodleCtx.strokeStyle =
      stroke.tool === "eraser" ? "#fff" : stroke.color;

    doodleCtx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      doodleCtx.lineTo(pts[i].x, pts[i].y);
    }
    doodleCtx.stroke();
  }

  function redraw() {
    doodleCtx.clearRect(0, 0, doodleCanvas.width, doodleCanvas.height);

    for (const s of strokes) drawStroke(s);

    if (currentStroke.length) {
      drawStroke({
        tool,
        color: brushColor.value,
        size: brushSize.value,
        points: currentStroke
      });
    }
  }

  /* ===== ACTIONS ===== */
  window.undoStroke = function () {
    strokes.pop();
    redraw();
  };

  window.clearDoodle = function () {
    strokes = [];
    redraw();
  };

  


  /* ===== EVENTS ===== */
  doodleCanvas.addEventListener("mousedown", startDraw);
  doodleCanvas.addEventListener("mousemove", draw);
  doodleCanvas.addEventListener("mouseup", stopDraw);
  doodleCanvas.addEventListener("mouseleave", stopDraw);

  doodleCanvas.addEventListener("touchstart", startDraw, { passive: false });
  doodleCanvas.addEventListener("touchmove", draw, { passive: false });
  doodleCanvas.addEventListener("touchend", stopDraw);
})();


function saveDoodleFirebase(){

  const img = exportWithWhiteBG();

  push(ref(db,"doodles"),{
    user,
    image: img,
    time: Date.now()
  });

}

function loadDoodles(){

  const box = document.getElementById("doodleList");

  onValue(ref(db,"doodles"),(snapshot)=>{

    const data = snapshot.val();

    box.innerHTML="";

    if(!data) return;

    const arr = Object.values(data)
      .sort((a,b)=>b.time-a.time);

    arr.forEach(d=>{

      const img = document.createElement("img");
      img.src = d.image;
      img.className="doodle-thumb";

      img.onclick = ()=>{
        openDoodleViewer(d.image);
      };

      box.appendChild(img);

    });

  });

}


function openDoodleViewer(src){

  const viewer = document.createElement("div");

  viewer.style.position="fixed";
  viewer.style.inset="0";
  viewer.style.background="rgba(0,0,0,.8)";
  viewer.style.display="flex";
  viewer.style.alignItems="center";
  viewer.style.justifyContent="center";
  viewer.style.zIndex="99999";

  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth="90vw";
  img.style.maxHeight="90vh";
  img.style.borderRadius="20px";

  viewer.appendChild(img);

  viewer.onclick = ()=>viewer.remove();

  document.body.appendChild(viewer);

}

function exportWithWhiteBG() {
  const temp = document.createElement("canvas");
  temp.width = doodleCanvas.width;
  temp.height = doodleCanvas.height;

  const tctx = temp.getContext("2d");

  // white background
  tctx.fillStyle = "#ffffff";
  tctx.fillRect(0, 0, temp.width, temp.height);

  // draw real canvas on top
  tctx.drawImage(doodleCanvas, 0, 0);

  return temp.toDataURL("image/jpeg", 0.9);
}


function sendSpecialReply() {
  const text = document.getElementById("specialReplyText").value.trim();
  const status = document.getElementById("specialReplyStatus");

  if (!text) {
    status.textContent = "Write something first 🤍";
    return;
  }

  const message =
    `💬 Special Page Reply\n🕒 ${new Date().toLocaleString()}\n\n${text}`;

  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sendFeeling",
      data: { text: message }
    })
  })
    .then(() => {
      status.textContent = "Sent to him 🤍";
      document.getElementById("specialReplyText").value = "";

      // ✅ UNLOCK challenge ONLY after successful send
      document.getElementById("challengeCard").classList.remove("locked");
    })
    .catch(() => {
      status.textContent = "Failed 😔 DOntt worryy fluffyy tryyy againn!!";
    });
}



const ALL_SONGS = [
  { file: "1.m4a", name: "Saibo" },
  { file: "2.m4a", name: "Tum Tak" },
  { file: "3.m4a", name: "Dooron Dooron (Unplugged)" },
  { file: "4.m4a", name: "Iktara" },
  { file: "5.m4a", name: "Ishq Sufiyana (Male)" },
  { file: "6.m4a", name: "Itni Si Baat Hai" },
  { file: "7.m4a", name: "Jaan Nisar" },
  { file: "8.m4a", name: "Mera Mann Kehne Laga" },
  { file: "9.m4a", name: "Qaafirana" },
  { file: "10.m4a", name: "Te Amo (Duet)" },

  { file: "11.mp3", name: "A Thousand Years" },
  { file: "12.mp3", name: "Aabad Barbaad" },
  { file: "14.mp3", name: "Maula Mere Maula" },
  { file: "15.mp3", name: "Me Gustas Tu" },
  { file: "16.mp3", name: "Meethi Boliyan" },
  { file: "17.mp3", name: "Nadaaniyan" },
  { file: "18.mp3", name: "O Rangrez" },
  { file: "19.mp3", name: "O Re Piya" },
  { file: "20.mp3", name: "Oda Lage" },
  { file: "21.mp3", name: "Pakeezah" },
  { file: "22.mp3", name: "Phir Kabhi" },
  { file: "23.mp3", name: "Raabta" },
  { file: "24.mp3", name: "Raat Bhar (De De Pyaar De)" },
  { file: "25.mp3", name: "Raat Bhar (Heropanti)" },
  { file: "26.mp3", name: "Rang Lageya" },
  { file: "27.mp3", name: "Sahiba" },
  { file: "28.mp3", name: "Sajan Jahan" },
  { file: "29.mp3", name: "Sau Aasmaan" },
  { file: "30.mp3", name: "Say Yes To Heaven" },
  { file: "31.mp3", name: "Shayad" },
  { file: "32.mp3", name: "Shinunoga E-Wa" },
  { file: "33.mp3", name: "Sparkle (Movie Ver.)" },
  { file: "34.mp3", name: "Suzume (feat. Toaka)" },
  { file: "35.mp3", name: "Taare Ginn" },
  { file: "36.mp3", name: "Teenage Dream" },
  { file: "37.mp3", name: "Tera Fitoor" },
  { file: "38.mp3", name: "Tere Bina" },
  { file: "39.mp3", name: "Teri Deewani" },
  { file: "40.mp3", name: "Teri Yaadon Mein" },
  { file: "41.mp3", name: "Those Eyes" },
  { file: "42.mp3", name: "Timro Pratiksa" },
  { file: "43.mp3", name: "Tose Naina" },
  { file: "44.mp3", name: "Tu Hi Hai" },
  { file: "45.mp3", name: "Tu Jaane Na" },
  { file: "46.mp3", name: "Tu Meri Duniya" },
  { file: "47.mp3", name: "Until I Found You" },
  { file: "48.mp3", name: "Vazhithunaiye" },
  { file: "49.mp3", name: "Yeh Fitoor Mera" },
  { file: "50.mp3", name: "Your Eyes" },
  { file: "52.mp3", name: "I Wanna Be Yours" },
  { file: "53.mp3", name: "I Don't See Nobody But You" },
  { file: "54.mp3", name: "Humsafar" },
  { file: "55.mp3", name: "Hosanna" },
  { file: "59.mp3", name: "Her" },
  { file: "62.mp3", name: "Mann Ki Lagan" },
  { file: "63.mp3", name: "Khuda Jaane" },
  { file: "64.mp3", name: "Khairiyat" },
  { file: "65.mp3", name: "Kaise Hua" },
  { file: "66.mp3", name: "Jhol (Acoustic)" },
  { file: "67.mp3", name: "Iktara (Reprise)" },
  { file: "69.mp3", name: "Mann Mera" },

  { file: "81.mp3", name: "Die With A Smile" },
  { file: "82.mp3", name: "Dandelions" },
  { file: "85.mp3", name: "Darkhaast" },
  { file: "89.mp3", name: "Dooron Dooron" },
  { file: "93.mp3", name: "Golden Brown (Sped Up)" },
  { file: "94.mp3", name: "Golden Hour" },
  { file: "99.mp3", name: "Golden Brown (Slowed)" },
  { file: "100.mp3", name: "Faasle" },
  { file: "122.mp3", name: "Dagabaaz Re" },
  { file: "125.mp3", name: "Apocalypse" },
  { file: "135.mp3", name: "CO2" },
  { file: "143.mp3", name: "Atlantis" },
  { file: "145.mp3", name: "Cinnamon Girl" },
  { file: "147.mp3", name: "Blue" },
  { file: "153.mp3", name: "Buddhu Sa Mann" },
  { file: "163.mp3", name: "Ami Tomake" },
  { file: "222.mp3", name: "Aaj Bhi (From Om Shanti Om)" },
  { file: "225.mp3", name: "I Love You" },
  { file: "236.mp3", name: "Chaar Kadam" },
  { file: "253.mp3", name: "Hoshwalon Ko Khabar Kya" },
  { file: "264.mp3", name: "Aankhon Se Batana" },
  { file: "265.mp3", name: "Bulleya" },
  { file: "331.mp3", name: "Kho Gaye Hum Kahan" },
  { file: "332.mp3", name: "Khudaya Khair" },
  { file: "335.mp3", name: "Nazm Nazm" },
  { file: "345.mp3", name: "Radha" },
  { file: "349.mp3", name: "Saware" },
  { file: "346.mp3", name: "Sooraj Dooba Hain" },
  { file: "365.mp3", name: "Abhi Kuch Dino Se" },
  { file: "366.mp3", name: "Pee Loon" },
  { file: "395.mp3", name: "Ok Jaanu Title Track" },
  { file: "452.mp3", name: "Dil Diyan Gallan" },
  { file: "663.mp3", name: "Aradhya" },
  { file: "666.mp3", name: "Pehli Nazar Mein" },
  { file: "720.mp3", name: "Zehnaseeb" },
  { file: "752.mp3", name: "Chand Sifarish" },
  { file: "755.mp3", name: "Sweetheart" },
  { file: "792.mp3", name: "Zaalima" },
  { file: "794.mp3", name: "Uff Teri Adaa" }
];



function toggleSongMenu() {
  document.getElementById("songMenu").classList.toggle("hidden");
}
let filteredSongs = [...ALL_SONGS];

function buildSongMenu(list = filteredSongs) {
  const box = document.getElementById("songList");
  box.innerHTML = "";

  if (list.length === 0) {
    box.innerHTML = "<p style='opacity:.6'>No song found 🤍</p>";
    return;
  }

  list.forEach(s => {
    const div = document.createElement("div");
    div.className = "song-item";
    div.textContent = s.name;

    div.onclick = () => {
      loadLocalSong(s.file);
      audio.play();
      playBtn.textContent = "❚❚";
      playBtn.classList.add("playing");
      document.getElementById("songMenu").classList.add("hidden");
    };

    box.appendChild(div);
  });
}

function filterSongs(q) {
  q = q.toLowerCase();
  filteredSongs = ALL_SONGS.filter(s =>
    s.name.toLowerCase().includes(q)
  );
  buildSongMenu();
}

buildSongMenu();

function autoPlayDailySong() {
  const tryPlay = () => {
    audio.play()
      .then(() => {
        playBtn.textContent = "❚❚";
        playBtn.classList.add("playing");
        waves.forEach(w => w.style.animationPlayState = "running");
        document.removeEventListener("click", tryPlay);
      })
      .catch(() => {
        // browser blocked autoplay, wait for user tap
      });
  };

  // try immediately
  tryPlay();

  // fallback: first user interaction
  document.addEventListener("click", tryPlay, { once: true });
}

function sendHeartbeat() {
  if (!pairId || !user) return;

  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "heartbeat",
      data: { pairId, user }
    })
  });
}

setInterval(sendHeartbeat, 5000);
sendHeartbeat();


async function checkPresence() {
  if (!pairId || !user) return;

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "presence",
      data: { pairId, user }
    })
  });

  const j = await res.json();
  const box = document.getElementById("presenceBox");

  if (!j.last) {
    box.textContent = "Partner offline";
    return;
  }

  const diff = Math.floor((Date.now() - j.last) / 1000);

  if (diff < 25) {
    box.textContent = "Partner online 🤍";
  }
  else if (diff < 60) {
    box.textContent = "Last seen " + diff + "s ago";
  }
  else {
    box.textContent = "Last seen " + Math.floor(diff / 60) + "m ago";
  }
}

setInterval(checkPresence, 3000);
checkPresence();


const EXPRESS_LIST = [
"missing you",
"thinking about you",
"need you",
"want a hug",
"want your voice",
"feeling lonely",
"feeling sad",
"feeling tired",
"overthinking",
"feeling anxious",

"feeling calm",
"feeling safe",
"feeling peaceful",

"feeling happy",
"smiling because of you",
"feeling grateful",

"feeling naughty",
"feeling flirty",
"want to tease you",
"feeling playful",

"need reassurance",
"need comfort",
"need attention",
"want you near",

"thinking of our memories",
"missing your touch",
"want to see you",
"wish you were here",

"feeling excited",
"feeling hopeful",
"feeling lucky",

"feeling jealous",
"feeling clingy",
"want cuddles",
"want kisses",

"thinking deeply",
"mind is restless",
"need quiet",

"feeling proud of us",
"feeling attached",
"heart feels full",

"want to talk",
"want to listen",
"want to laugh",

"want to stay with you",
"thinking about future",
"feeling emotional"
];

function buildExpressButtons(){
  const box=document.getElementById("expressButtons");
  box.innerHTML="";

  EXPRESS_LIST.forEach(f=>{
    const btn=document.createElement("button");
    btn.textContent=f;
    btn.onclick=()=>sendExpressFeeling(f);
    box.appendChild(btn);
  });
}

buildExpressButtons();

function sendExpressFeeling(feeling){

  const entry = {
    user,
    feeling,
    time: Date.now()
  };

  push(ref(db,"expressLogs"),entry);

}
function sendCustomFeeling(){
  const txt=document.getElementById("customFeeling").value.trim();
  if(!txt) return;

  sendExpressFeeling(txt);
  document.getElementById("customFeeling").value="";
}

function loadExpressLog(){

  const box = document.getElementById("expressLog");

  onValue(ref(db,"expressLogs"),(snapshot)=>{

    const data = snapshot.val();

    box.innerHTML="";

    if(!data) return;

    const arr = Object.values(data)
      .sort((a,b)=>b.time-a.time);

    arr.forEach(m=>{

      const div = document.createElement("div");
      div.className="express-entry";

      div.textContent =
        `${m.user} ${m.feeling} at ${
        new Date(m.time).toLocaleString()
        }`;

      box.appendChild(div);

    });

  });

}