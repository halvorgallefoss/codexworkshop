const symbols = ['🍓', '🐳', '🌙', '🍋', '🦊', '🌼'];
const board = document.querySelector('#board');
const movesLabel = document.querySelector('#moves');
const pairsLabel = document.querySelector('#pairs');
const message = document.querySelector('#message');
const newGameButton = document.querySelector('#new-game');

let firstCard = null;
let secondCard = null;
let locked = false;
let moves = 0;
let matchedPairs = 0;

function shuffledCards() {
  const cards = [...symbols, ...symbols].map((symbol, id) => ({ symbol, id }));
  // Fisher-Yates shuffle: each item is swapped with a randomly chosen earlier item.
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function createCard(card) {
  const button = document.createElement('button');
  button.className = 'card';
  button.type = 'button';
  button.dataset.symbol = card.symbol;
  button.setAttribute('aria-label', 'Hidden card');
  button.innerHTML = '<span class="back" aria-hidden="true">?</span>' +
    `<span class="face" aria-hidden="true">${card.symbol}</span>`;
  button.addEventListener('click', () => revealCard(button));
  return button;
}

function startGame() {
  firstCard = null;
  secondCard = null;
  locked = false;
  moves = 0;
  matchedPairs = 0;
  movesLabel.textContent = moves;
  pairsLabel.textContent = `${matchedPairs} / ${symbols.length}`;
  message.textContent = 'Choose two cards to begin.';
  board.replaceChildren(...shuffledCards().map(createCard));
}

function revealCard(card) {
  if (locked || card === firstCard || card.classList.contains('is-matched')) return;

  card.classList.add('is-revealed');
  card.setAttribute('aria-label', `Card showing ${card.dataset.symbol}`);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves += 1;
  movesLabel.textContent = moves;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.replace('is-revealed', 'is-matched');
    secondCard.classList.replace('is-revealed', 'is-matched');
    firstCard.disabled = true;
    secondCard.disabled = true;
    firstCard.setAttribute('aria-label', `Matched ${firstCard.dataset.symbol}`);
    secondCard.setAttribute('aria-label', `Matched ${secondCard.dataset.symbol}`);
    matchedPairs += 1;
    pairsLabel.textContent = `${matchedPairs} / ${symbols.length}`;
    resetTurn();

    if (matchedPairs === symbols.length) message.textContent = `You finished in ${moves} moves!`;
    else message.textContent = 'A pair! Find another.';
    return;
  }

  // Unmatched cards stay visible briefly so the player can remember them.
  locked = true;
  message.textContent = 'No match. Remember these cards…';
  window.setTimeout(() => {
    firstCard.classList.remove('is-revealed');
    secondCard.classList.remove('is-revealed');
    firstCard.setAttribute('aria-label', 'Hidden card');
    secondCard.setAttribute('aria-label', 'Hidden card');
    resetTurn();
    message.textContent = 'Choose two cards to continue.';
  }, 900);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  locked = false;
}

newGameButton.addEventListener('click', startGame);
startGame();
