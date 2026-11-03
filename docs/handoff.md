# Handoff: Little Pairs

## Run and project instructions

Open `index.html` in a browser; no installation, build, or server is needed. `index.html` defines the page, `styles.css` controls appearance, and `game.js` handles gameplay. Follow `AGENTS.md`: keep changes focused, agree on feature behavior and acceptance checks, and write all new player-facing text in Norwegian Bokmål while leaving existing text unchanged.

## Current implementation

- Twelve cards contain six shuffled pairs. `revealCard()` counts a move when the second distinct eligible card is selected. Matches remain visible and disabled; mismatches lock selection for 900ms. `startGame()` resets the board and counters.
- Best score is the fewest moves in a completed game. Only a strictly better result updates `little-pairs-best-score` in localStorage. “Beste resultat: –” appears before a record exists; otherwise “Beste resultat: N trekk” is shown. The record survives refresh and New game. Invalid stored values are ignored; unavailable storage falls back to keeping the record for the current page session.
- `updateMoveFeedback()` makes the page background orange (`#ffcc80`) from 16 moves and displays “Dette begynner å ta tid...” in a separate, non-blocking status field from 18 moves. Both remain through completion and reset on New game or refresh. Existing gameplay messages remain visible.
- The previously confirmed restart bug has been fixed in the current code: `mismatchTimeoutId` tracks the pending timeout, and `startGame()` cancels it before clearing card references.

## Verification and remaining work

Browser checks performed in this chat passed for best-score persistence and improvement rules, invalid/unavailable storage, ordinary matches and mismatches, counters, and blocked third-card selection. Move-feedback checks passed at 15/16/17/18/19 moves, through mismatch delays and completion, and after New game and refresh. Mobile layout was inspected at 375px with no horizontal overflow. JavaScript syntax and Git whitespace checks passed.

The previous handoff also records successful browser regression checks for the restart fix: restarting during a mismatch, selecting cards immediately afterward, overlapping old/new mismatch timing, and repeated quick restarts. Those results are carried forward from that handoff; they were not rerun during this documentation update. The timeout cancellation was verified by reading the current code.

The requested best-score and move-feedback features are implemented. No further feature is agreed. Future changes should preserve these behaviors and rerun relevant browser checks. Temporary Playwright checks are not a committed test suite; no test framework was added. This update changes documentation only and creates no Git commit.
