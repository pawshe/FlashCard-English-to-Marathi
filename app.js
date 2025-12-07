// Check if data is loaded
if (typeof oxford3000Words === 'undefined') {
    alert("Error: words.js not loaded. Make sure the file exists and is linked.");
}

let currentIndex = 0;
let isFlipped = false;
let cardData = [...oxford3000Words]; // Create a copy we can shuffle

// DOM Elements
const cardElement = document.getElementById('flashcard');
const currentCountEl = document.getElementById('current-count');
const totalCountEl = document.getElementById('total-count');

// Content Elements
const elLevel = document.getElementById('level-badge');
const elEnWord = document.getElementById('en-word');
const elPos = document.getElementById('pos-tag');
const elMrWord = document.getElementById('mr-word');
const elTrans = document.getElementById('transliteration');
const elMeaning = document.getElementById('mr-meaning');
const elExEn = document.getElementById('ex-en');
const elExMr = document.getElementById('ex-mr');

// Initialize
function init() {
    totalCountEl.innerText = cardData.length;
    renderCard();
    
    // Add Click listener to card
    cardElement.addEventListener('click', flipCard);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') flipCard();
        if (e.code === 'ArrowRight') nextCard();
        if (e.code === 'ArrowLeft') prevCard();
    });
}

function renderCard() {
    const word = cardData[currentIndex];
    
    // Update Counter
    currentCountEl.innerText = currentIndex + 1;

    // Reset Flip
    isFlipped = false;
    cardElement.classList.remove('is-flipped');

    // Slight delay to update text so user doesn't see change while flipping back
    setTimeout(() => {
        // Front
        elLevel.innerText = word.level || 'N/A';
        elEnWord.innerText = word.english;
        elPos.innerText = word.pos;

        // Back
        elMrWord.innerText = word.marathi;
        elTrans.innerText = word.transliteration;
        elMeaning.innerText = word.marathi_meaning;
        elExEn.innerText = word.example_en;
        elExMr.innerText = word.example_mr;
    }, 200);
}

function flipCard() {
    isFlipped = !isFlipped;
    if(isFlipped) {
        cardElement.classList.add('is-flipped');
    } else {
        cardElement.classList.remove('is-flipped');
    }
}

function nextCard() {
    if (currentIndex < cardData.length - 1) {
        currentIndex++;
        renderCard();
    } else {
        alert("You've reached the end!");
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        renderCard();
    }
}

function shuffleDeck() {
    // Fisher-Yates Shuffle Algorithm
    for (let i = cardData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardData[i], cardData[j]] = [cardData[j], cardData[i]];
    }
    currentIndex = 0;
    renderCard();
}

function resetDeck() {
    cardData = [...oxford3000Words]; // Restore original order
    cardData.sort((a, b) => a.id - b.id);
    currentIndex = 0;
    renderCard();
}

// Text to Speech
function speakWord(e) {
    e.stopPropagation(); // Prevent card flip when clicking speaker
    const word = cardData[currentIndex].english;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Start App
init();