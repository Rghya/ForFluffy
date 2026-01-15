const STORED_HASH =
"3e05eb8f839be339e0bf3ace43e303a383805b2019a5e10fd5749c340f8ce5ed"; 
// 👆 this hash = "password"

async function hashText(text){
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2,"0"))
    .join("");
}

document.getElementById("unlockBtn").onclick = async () => {
  const val = document.getElementById("lockInput").value;
  const h = await hashText(val);

  if(h === STORED_HASH){
    document.getElementById("lockScreen").style.display="none";
    
  }else{
    document.getElementById("lockError").textContent = "Wrong secret 🤍";
  }
};


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


function hideAllPages() {
  homePage.classList.add("hidden");
  notePage.classList.add("hidden");
  specialPage.classList.add("hidden");
  khaasPage.classList.add("hidden");
  expressPage.classList.add("hidden");
  owPage.classList.add("hidden");
  countPage.classList.add("hidden");
  growthPage.classList.add("hidden");
  replyPage.classList.add("hidden");

}


function showHome() {
  hideAllPages();
  homePage.classList.remove("hidden");
  startHearts();
  stopFirework();
  stopEmojiRain();
}

function showReplyPage(){
  hideAllPages();
  replyPage.classList.remove("hidden");
  startEmojiRain(love2Emoji);
  loadReplies();
}


function showOW(){
  hideAllPages();
  owPage.classList.remove("hidden");
  // startEmojiRain(cuteEmoji);
}

function showGrowth(){
  hideAllPages();
  growthPage.classList.remove("hidden");
  startEmojiRain(surpriseEmoji);
}

function showCount(){
  startEmojiRain(loveEmoji);
  hideAllPages();
  countPage.classList.remove("hidden");
}

function showNote() {
  startEmojiRain(celebEmoji);
  hideAllPages();
  notePage.classList.remove("hidden");
 
  stopFirework();
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

function showExpress() {
  startEmojiRain(susEmoji);
  hideAllPages();
  expressPage.classList.remove("hidden");
  stopHearts();
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
  }, 1000);
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
const naughtyEmoji = ["🍑","🔞","🥵","💦","👅","💋","👡","👙","🍒","👠"];
const loveEmoji = ["🤍","💖","💕","💞","💓"];
const celebEmoji = ["🎉","🎆","✨","🔥","💥"];
const susEmoji = ["😁","😋","😘","🤗","😚","😉"];
const love2Emoji = ["🤍","💖","💕","💞","💓","💘","💗","🫶","🥰","😍"];
const cuteEmoji = ["🌸","🌼","🌷","🧸","🐻","🐰","💫","🍓","🫧","🎀"];
const surpriseEmoji = ["🤍","💋","🌙","🔥","🥺","🎉","✨","🍒","🫶","😏"];


function startEmojiRain(emojiList){
  if (emojiRainInterval) return;

  emojiRainInterval = setInterval(()=>{
    const e = document.createElement("div");
    e.className = "emoji-drop";
    e.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];

    e.style.left = Math.random()*100 + "vw";
    e.style.fontSize = 16 + Math.random()*28 + "px";
    e.style.animationDuration = 4 + Math.random()*4 + "s";
    e.style.opacity = Math.random()*0.6 + 0.4;

    emojiRainBox.appendChild(e);
    
  }, 850);
}

function stopEmojiRain(){
  clearInterval(emojiRainInterval);
  emojiRainInterval = null;
  emojiRainBox.innerHTML = "";
}



/* ===== DAILY NOTE FROM CSV ===== */
async function loadDailyNote() {
  try {
    const res = await fetch("daily-notes.csv");
    const text = await res.text();
    const rows = text.split("\n").slice(1);

    const today = new Date().toISOString().slice(0, 10);
    let note = "No note for today 🤍";

    rows.forEach(row => {
      const [date, msg] = row.split(",");
      if (date === today) note = msg;
    });

    document.getElementById("dailyNote").textContent = note;
  } catch {
    document.getElementById("dailyNote").textContent =
      "Failed to load note 🤍";
  }
}

loadDailyNote();

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
    console.error("Song load failed", err);
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
    onSuccess: function(tag) {
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
    onError: function() {
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



// /* ===== AJJ KA SPECIAL (JSON BASED) ===== */

// async function loadSpecial() {
//   const emojiEl = document.getElementById("specialEmoji");
//   const titleEl = document.getElementById("specialTitle");
//   const descEl = document.getElementById("specialDesc");
//   const challengeEl = document.getElementById("specialChallenge");

//   try {
//     const res = await fetch("specials.json", { cache: "no-store" });
//     const data = await res.json();

//     const today = new Date();
//     const key =
//       String(today.getMonth() + 1).padStart(2, "0") +
//       "-" +
//       String(today.getDate()).padStart(2, "0");

//     if (data[key]) {
//       const item = data[key];
//       emojiEl.textContent = item.emoji;
//       titleEl.textContent = item.title;
//       descEl.textContent = item.desc;
//       challengeEl.textContent = "🌟 Challenge: " + item.challenge;
//     } else {
//       emojiEl.textContent = "✨";
//       titleEl.textContent = "Nothing Special Today";
//       descEl.textContent =
//         "Even ordinary days are important. Take care 🤍";
//       challengeEl.textContent = "";
//     }

//   } catch (e) {
//     titleEl.textContent = "Unable to load special";
//     descEl.textContent = "Check your internet or file setup.";
//     challengeEl.textContent = "";
//   }
// }

// loadSpecial();


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
      "Failed to load special";
  }
}

// load once
loadSpecialFromJSON();

(function checkDone(){
  const key = "done-" + new Date().toISOString().slice(0,10);

  if (localStorage.getItem(key)) {
    document.querySelector(".done-btn")?.remove();
    document.querySelector(".done-text")?.classList.remove("hidden");
    document.getElementById("reactionBox")?.classList.remove("locked");
  }
})();


/* ===== CARD TOGGLE ===== */
function unlock(card,next){
  card.classList.add("active");
  document.getElementById(next)?.classList.remove("locked");
  celebrate();
}

/* ===== DAILY CHALLENGE DONE ===== */
function markDone(){
  const key = "done-" + new Date().toISOString().slice(0,10);

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

function stopp(){
  stopEmojiRain();
  stopHearts();
  stopFirework();
}

/* ===== REACTIONS ===== */
function react(t){
  localStorage.setItem("react-"+Date(),t);
  if(t==="love")startHearts();
  if(t==="fire")startFirework();
  if(t==="meh")startEmojiRain(naughtyEmoji);
  if(t==="se")startEmojiRain(susEmoji);
  if(t==="cross")stopp();
}


function sendFeeling(type) {
  
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

  notifyTelegram(
    map[type] + "\n🕒 " + new Date().toLocaleString()
  );

  const status = document.getElementById("feelingStatus");
  status.textContent = "Sent to him 🤍";
  status.classList.remove("hidden");

  startEmojiRain();
  setTimeout(stopEmojiRain, 2000);
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
  sad1: "I know today feels heavy. You don’t need to fix anything right now. Just breathe. I’m right here with you 🤍",
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


const BOT_TOKEN2 = "8346168934:AAEp8Ss80cJEF18VLyiIk9keLRmtQAEZ4yI";
const CHAT_ID2 = 7654665438;

function sendReply() {
  const msg = document.getElementById("replyText").value.trim();
  const status = document.getElementById("replyStatus");

  if (!msg) {
    status.textContent = "Write something first 🤍";
    return;
  }

  const finalMessage =
    `💌 New Reply\n` +
    `📄 Letter: ${currentLetterType}\n\n` +
    msg;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN2}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID2,
      text: finalMessage
    })
  })
  .then(() => {
    status.textContent = "Sent 💖";
    document.getElementById("replyText").value = "";
  })
  .catch(() => {
    status.textContent = "Failed 😔";
  });
}





/* ===== COUNTDOWNS ===== */
(function initCountdowns() {
  // ✏️ EDIT THESE DATES ONLY
  const startedDate = new Date("2025-09-29");   // relationship start
  const lastCallDate = new Date("2026-01-12");  // last call
  const nextPlanDate = new Date("2026-02-14");  // next meet / plan

  const today = new Date();
  today.setHours(0,0,0,0);

  function daysBetween(a, b) {
    return Math.floor((b - a) / (1000 * 60 * 60 * 24));
  }

  document.getElementById("cdStarted").textContent =
    daysBetween(startedDate, today) + " days";

  document.getElementById("cdLastCall").textContent =
    daysBetween(lastCallDate, today) + " days";

  const until = daysBetween(today, nextPlanDate);
  document.getElementById("cdNext").textContent =
    until >= 0 ? until + " days" : "Soon 🤍";
})();




(function growthTimeline(){
  /* ✏️ EDIT THIS DATE ONLY */
  const startDate = new Date("2025-09-29");

  const today = new Date();
  today.setHours(0,0,0,0);

  const daysTogether = Math.floor(
    (today - startDate) / (1000*60*60*24)
  );

  const todayStr = new Date().toISOString().slice(0,10);

  let visits = Number(localStorage.getItem("totalVisits")) || 0;
  const lastVisitDate = localStorage.getItem("lastVisitDate");

  if (lastVisitDate !== todayStr) {
    visits++;
    localStorage.setItem("totalVisits", visits);
    localStorage.setItem("lastVisitDate", todayStr);
  }


  /* STREAK */
 

  /* HARD DAYS */
  if(!localStorage.getItem("hardDays")){
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
      visits:0,
      hardDays:0
    };

  recap.visits++;
  localStorage.setItem(monthKey, JSON.stringify(recap));

  disableHardDayBtn();

})();

/* ===== HARD DAY BUTTON ===== */
function addHardDay(){
  const today = new Date().toISOString().slice(0,10);
  const lastHardDay = localStorage.getItem("lastHardDay");

  if (lastHardDay === today) return; // already counted today

  let hard = Number(localStorage.getItem("hardDays")) || 0;
  hard++;

  localStorage.setItem("hardDays", hard);
  localStorage.setItem("lastHardDay", today);

  document.getElementById("gtHard").textContent = hard;

  disableHardDayBtn();
}

function disableHardDayBtn(){
  const btn = document.querySelector(".growth-btn");
  if (!btn) return;

  const today = new Date().toISOString().slice(0,10);
  const lastHardDay = localStorage.getItem("lastHardDay");

  if (lastHardDay === today) {
    btn.textContent = "🤍 You stayed strong today";
    btn.disabled = true;
    btn.style.opacity = "0.6";
  }
}

(function milestoneSystem(){
  const startDate = new Date("2025-09-29"); // SAME as growth timeline
  const today = new Date();
  today.setHours(0,0,0,0);

  const daysTogether = Math.floor(
    (today - startDate) / (1000*60*60*24)
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

  for(let i=1;i<=completed;i++){
    const label = `Completed ${i*3} months together 🤍`;
    if(!history.includes(label)){
      history.push(label);
    }
  }

  localStorage.setItem(
    "milestoneHistory",
    JSON.stringify(history)
  );

  const list = document.getElementById("milestoneList");
  list.innerHTML = "";

  history.forEach(h=>{
    const li = document.createElement("li");
    li.textContent = "✨ " + h;
    list.appendChild(li);
  });
})();


const startDate = new Date("2025-09-29"); // SAME DATE everywhere
const milestoneDays = 90; // ~3 months

const today = new Date();
today.setHours(0,0,0,0);

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

const BOT_TOKEN = "8422558341:AAE-qPlcuSBB-NLJNRTZOHVokG0lN07kHS8";
const CHAT_ID = 7654665438;

function notifyTelegram(message){
  fetch(`https://api.telegram.org/bot8422558341:AAE-qPlcuSBB-NLJNRTZOHVokG0lN07kHS8/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });
}



function celebrateFor(seconds = 5) {
  startFirework();
  
  setTimeout(stopFirework, seconds * 1000);
}


const REPLY_BOT_TOKEN = "8493536361:AAGhjUtdlotUPBUrBykJ0YY-keTP7Lhf100";
const REPLY_CHAT_ID = 7654665438;

// async function loadReplies(){
//   const box = document.getElementById("replyList");
//   box.innerHTML = "Loading replies…";

//   try {
//     const res = await fetch(
//       `https://api.telegram.org/bot${REPLY_BOT_TOKEN}/getUpdates`
//     );
//     const data = await res.json();

//     if(!data.ok){
//       box.innerHTML = "Failed to load replies 🤍";
//       return;
//     }

//     const msgs = data.result
//       .filter(u =>
//         u.message &&
//         u.message.chat.id === REPLY_CHAT_ID &&
//         u.message.text
//       )
//       .map(u => ({
//         text: u.message.text,
//         time: new Date(u.message.date * 1000)
//       }))
//       .reverse();

//     if(msgs.length === 0){
//       box.innerHTML = "No replies yet 🤍";
//       return;
//     }

//     box.innerHTML = "";

//     msgs.forEach(m => {
//       const div = document.createElement("div");
//       div.style.marginBottom = "12px";
//       div.style.paddingBottom = "8px";
//       div.style.borderBottom =
//         "1px solid rgba(255,255,255,0.4)";

//       div.innerHTML = `
//         <div style="font-size:15px">${m.text}</div>
//         <div style="font-size:11px;opacity:.6">
//           ${m.time.toLocaleString()}
//         </div>
//       `;

//       box.appendChild(div);
//     });

//   } catch(e){
//     console.error(e);
//     box.innerHTML = "Error loading replies 🤍";
//   }
// }





async function loadReplies(){
  const box = document.getElementById("replyList");
  box.innerHTML = "Loading replies…";

  let stored = JSON.parse(localStorage.getItem("savedReplies") || "[]");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${REPLY_BOT_TOKEN}/getUpdates`
    );
    const data = await res.json();

    if(!data.ok){
      box.innerHTML = "Failed to load replies 🤍";
      return;
    }

    const newMsgs = data.result
      .filter(u =>
        u.message &&
        u.message.chat.id === REPLY_CHAT_ID &&
        u.message.text
      )
      .map(u => ({
        text: u.message.text,
        time: u.message.date * 1000
      }));

    // merge + remove duplicates
    const all = [...stored, ...newMsgs].filter(
      (v,i,a)=>a.findIndex(t=>t.text===v.text && t.time===v.time)===i
    );

    localStorage.setItem("savedReplies", JSON.stringify(all));

    renderReplies(all.reverse(), box);

  } catch(e){
    console.error(e);
    renderReplies(stored.reverse(), box);
  }
}

function renderReplies(msgs, box){
  if(msgs.length === 0){
    box.innerHTML = "No replies yet 🤍";
    return;
  }

  box.innerHTML = "";
  msgs.forEach(m=>{
    const div = document.createElement("div");
    div.style.marginBottom="12px";
    div.style.paddingBottom="8px";
    div.style.borderBottom="1px solid rgba(255,255,255,0.4)";
    div.innerHTML=`
      <div style="font-size:15px">${m.text}</div>
      <div style="font-size:11px;opacity:.6">
        ${new Date(m.time).toLocaleString()}
      </div>
    `;
    box.appendChild(div);
  });
}

