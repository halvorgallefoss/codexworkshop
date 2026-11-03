# Handoff: Little Pairs memory game

The workspace contains a small browser-based memory game in `codex-memory-workshop/` and workshop instructions in `worksheet.html`. The game requires no installation or build step: open `codex-memory-workshop/index.html` in a browser.

The main files are:

- `index.html`: page structure, New game button, counters, status message, and board container.
- `styles.css`: visual design, card states, four-column board, and adjustments for small screens.
- `game.js`: card creation, shuffling, turn handling, counters, and restarting.
- `README.md`: basic usage instructions.

In `game.js`, `startGame()` resets the state and builds twelve cards containing six pairs. `shuffledCards()` randomizes their order, and `createCard()` creates each clickable button. `revealCard()` reveals cards and counts one move when the second card is selected. Matching cards remain visible and become disabled. Mismatches remain visible for 900 milliseconds while further card selection is blocked. `resetTurn()` clears the selections and unlocks play.

These behaviors were identified by reading the source; no browser checks have been performed in this conversation. A potential restart bug exists: `startGame()` does not cancel a pending mismatch timeout, which may subsequently access cleared or unrelated card references.

The user has explored the project and asked about opening it in IntelliJ IDEA. No feature requirements have been agreed, and no game files have been changed by the assistant. Next, verify gameplay in a browser, reproduce the potential restart bug, and agree on a small improvement with observable acceptance checks.
