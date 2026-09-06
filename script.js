const riddles = [
  {
    text: "I have cities, but no houses. I have mountains, but no rocks. I have water, but no fish. What am I?",
    answers: ["map", "a map"],
    hint: "You'd unfold me before a road trip."
  },
  {
    text: "The more you take, the more you leave behind. What am I?",
    answers: ["footsteps", "footprints", "steps"],
    hint: "Think about walking on sand."
  },
  {
    text: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answers: ["echo", "an echo"],
    hint: "Shout into a canyon and wait."
  }
];

const poems = [
  { title: "The Group Chat Where It Started", body: "In a group chat, no plan, no design,\nTwo strangers, different paths, one same line.\nI didn't know that my random \"hi\"\nWould become the start of you and I." },
  { title: "The Group Chat Where It Started", body: "From school updates to talks past midnight hours,\nSlowly your messages became my safest towers.\nI didn't notice, but I started to breathe\nFreer and easier, whenever you were near me." },
  { title: "When Friend Wasn't Enough", body: "We became friends, then something more began,\nEvery laugh of yours felt like a safe room I could stand in.\nYou asked for nothing except me, just as I am,\nAnd that's when I first felt: I actually matter." },
  { title: "When Friend Wasn't Enough", body: "I don't know when the rhythm start to shift,\nWhen \"friend\" became a word that wasn't quite enough.\nBut one day, we confessed, both at once,\nTwo hearts, both scared, beating the same beat." },
  { title: "Home Without an Address", body: "You never promised I'd have to be perfect,\nYou just let me be me, even messy, even lacking.\nSo even the insecurities I used to carry,\nLittle by little, melted and disappeared." },
  { title: "Home Without an Address", body: "The comfort you gave wasn't just for a moment,\nIt's the kind of home that needs no address.\nSo even now while I'm coding tonight,\nIn between the syntax, you're still the mark that stays." },
  { title: "Still the Mark That Stays", body: "I never thought a group chat would be the start\nOf a love this whole, never half-hearted.\nYou're the quiet certainty in the middle of chaos,\nThe reason why even stressed, somehow, I'm okay." },
  { title: "Still the Mark That Stays", body: "So here I am, writing this while I code,\nBecause whatever I do, you're always on my mind.\nI love you so much, it's not just a word,\nIt's every decision I keep choosing you in." },
  { title: "From Hi to I Love You", body: "If they asked me what's the best thing that happened,\nI'd say it's you — from \"hi\" to \"I love you.\"\nYou didn't do anything grand in others' eyes,\nBut to me, you saved me from my own fears." },
  { title: "From Hi to I Love You", body: "So thank you, for being my safe space,\nFor making me feel like I matter, like I'm whole.\nFrom now until I don't even know how long,\nIt's still you, always and always, that I choose." }
];

let round = 0;
const total = riddles.length;

const roundLabel = document.getElementById('roundLabel');
const riddleText = document.getElementById('riddleText');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const msg = document.getElementById('msg');
const hintToggle = document.getElementById('hintToggle');
const progress = document.getElementById('progress');

let progressDots = [];

function buildProgress(){
  progress.innerHTML = "";
  progressDots = [];
  for(let i = 0; i < total; i++){
    const dot = document.createElement('div');
    dot.className = 'dot';
    const span = document.createElement('span');
    dot.appendChild(span);
    progress.appendChild(dot);
    progressDots.push(span);
  }
}

function loadRound(){
  roundLabel.textContent = round + 1;
  riddleText.textContent = riddles[round].text;
  answerInput.value = "";
  msg.textContent = "";
  msg.className = "msg";
  hintToggle.textContent = "Need a hint?";
  hintToggle.dataset.shown = "0";
  progressDots.forEach((span, i) => {
    span.style.width = i < round ? '100%' : '0%';
  });
}

hintToggle.addEventListener('click', () => {
  if(hintToggle.dataset.shown === "1"){
    hintToggle.textContent = "Need a hint?";
    hintToggle.dataset.shown = "0";
  } else {
    hintToggle.textContent = "Hint: " + riddles[round].hint;
    hintToggle.dataset.shown = "1";
  }
});

function checkAnswer(){
  const val = answerInput.value.trim().toLowerCase();
  if(!val){
    msg.textContent = "Type an answer first.";
    msg.className = "msg err";
    return;
  }
  const correct = riddles[round].answers.includes(val);
  if(correct){
    progressDots[round].style.width = '100%';
    msg.textContent = "That's it.";
    msg.className = "msg ok";
    round++;
    if(round >= total){
      setTimeout(() => {
        document.getElementById('game').classList.add('hidden');
        openBook();
      }, 500);
    } else {
      setTimeout(loadRound, 500);
    }
  } else {
    msg.textContent = "Not quite — try again.";
    msg.className = "msg err";
  }
}

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') checkAnswer();
});

let page = 0;
const book = document.getElementById('book');
const finale = document.getElementById('finale');
const pageNum = document.getElementById('pageNum');
const poemTitle = document.getElementById('poemTitle');
const poemBody = document.getElementById('poemBody');
const dotsMini = document.getElementById('dotsMini');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function buildDots(){
  dotsMini.innerHTML = "";
  poems.forEach((_, i) => {
    const dot = document.createElement('i');
    if(i === page) dot.classList.add('on');
    dotsMini.appendChild(dot);
  });
}

function renderPage(){
  pageNum.textContent = page + 1;
  poemTitle.textContent = poems[page].title;
  poemBody.textContent = poems[page].body;
  buildDots();
  prevBtn.disabled = page === 0;
  nextBtn.textContent = page === poems.length - 1 ? "Finish" : "Next \u2192";
}

function openBook(){
  book.classList.add('active');
  page = 0;
  renderPage();
}

prevBtn.addEventListener('click', () => {
  if(page > 0){ page--; renderPage(); }
});
nextBtn.addEventListener('click', () => {
  if(page < poems.length - 1){
    page++;
    renderPage();
  } else {
    book.classList.remove('active');
    finale.style.display = 'block';
  }
});

document.getElementById('restartBtn').addEventListener('click', () => {
  round = 0;
  page = 0;
  finale.style.display = 'none';
  book.classList.remove('active');
  document.getElementById('game').classList.remove('hidden');
  loadRound();
});

buildProgress();
loadRound();
