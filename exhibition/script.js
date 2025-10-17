// Global game state holds which passage is currently active.
// Keep it simple so it can be reset easily.
let gameState = {
  currentPassage: 'start'
};

// Tracks which section within the current passage is being shown.
// Resets to 0 whenever the passage changes.
let sectionIndex = 0;

/**
 * Advance the story flow.
 * Shows the next section, or triggers a popup, or shows an ending,
 * or falls back to rendering choices.
 */
function continueStory() {
  // Look up the current passage object from a global `passages` map.
  const passage = passages[gameState.currentPassage];

  // 1) Still have sections to show. Display the next section of text.
  if (sectionIndex < passage.sections.length) {
    // Replace the passage text content with the current section.
    // textContent is used to avoid injecting HTML by mistake.
    document.getElementById('passage-text').textContent = passage.sections[sectionIndex];

    // Move the pointer forward for the next click.
    sectionIndex++;

  // 2) No sections left, but this passage triggers a popup window.
  } else if (passage.popupWindow) {
    // Open the external reconstruction or info view in a new tab-like window.
    openPopupWindow(passage.popupWindow);

    // After the popup, route back into the main merge passage.
    // This keeps navigation consistent and avoids dead ends.
    gameState.currentPassage = 'merge';

    // Reset the section pointer for the new passage.
    sectionIndex = 0;

    // Continue immediately so the merge passage appears without an extra click.
    continueStory();

  // 3) This passage marks the end of the story.
  } else if (passage.ending) {
    // Render the end screen with a restart option.
    displayEnding();

  // 4) Otherwise, show interactive choices that lead to other passages.
  } else {
    displayChoices(passage.choices);
  }
}

/**
 * Render a list of choices for the user.
 * Each choice is a simple div that behaves like a button.
 * Clicking either opens a popup or navigates to another passage.
 */
function displayChoices(choices) {
  const container = document.getElementById('choices-container');

  // Clear any previous choices.
  container.innerHTML = '';

  // Create one clickable element per choice.
  choices.forEach(choice => {
    const el = document.createElement('div');
    el.className = 'choice';
    el.textContent = choice.text;

    // Click handler controls branching.
    el.onclick = () => {
      // If this choice should open a popup, do that first.
      if (choice.action === 'popup' && choice.popupWindow) {
        openPopupWindow(choice.popupWindow);

        // After closing or switching focus, route back to the merge passage.
        gameState.currentPassage = 'merge';

        // Reset section pointer so the merge text starts from its first section.
        sectionIndex = 0;

        // Immediately continue so the user sees the next text without delay.
        continueStory();

      } else {
        // Otherwise navigate to the passage named in `choice.action`.
        gameState.currentPassage = choice.action;

        // Reset section pointer for the new passage.
        sectionIndex = 0;

        // Remove old choices to avoid clutter.
        container.innerHTML = '';

        // Advance the story in the new passage.
        continueStory();
      }
    };

    // Add the choice element to the container.
    container.appendChild(el);
  });
}

/**
 * Show the end screen.
 * Provides feedback and a single restart button.
 */
function displayEnding() {
  // innerHTML is used here to inject the button markup.
  document.getElementById('passage-text').innerHTML = `
    <div class="ending">
      CONNECTION TERMINATED... You reached the archive's end.
      <br><br>
      <button class="restart" onclick="restartGame()">REINITIALIZE</button>
    </div>
  `;

  // Clear any leftover choices to reduce visual noise.
  document.getElementById('choices-container').innerHTML = '';
}

/**
 * Reset core variables and return to the initial prompt.
 * Leaves the DOM in a known state so the first click can start the story.
 */
function restartGame() {
  gameState.currentPassage = 'start';
  sectionIndex = 0;

  // Remove choices in case the end screen had any extra elements.
  document.getElementById('choices-container').innerHTML = '';

  // Provide a neutral starting message.
  document.getElementById('passage-text').textContent = "[Click to begin your session]";
}

/**
 * Open a popup window for reconstructions or external material.
 * Uses `window.open` features to set a sensible size.
 */
function openPopupWindow(file) {
  window.open(file, '_blank', 'width=900,height=700');
}

/**
 * Create a lightweight Matrix style rain effect.
 * Produces multiple columns that fall with varied duration and delay.
 * The text cycles through a themed message to keep it readable.
 */
function createMatrixRain() {
  // The container that holds the animated columns.
  const container = document.getElementById('matrix-rain');

  // The message that gets repeated along the falling columns.
  const message = "These are Re:Constructs – ways to re-experience the thinking and ideas behind lost artworks.";

  // Split into characters so we can cycle through them.
  const chars = message.split('');

  // Create a fixed number of columns. Adjust this for performance on low-end devices.
  for (let i = 0; i < 12; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';

    // Random horizontal position to spread columns across the container.
    column.style.left = Math.random() * 100 + '%';

    // Vary the duration so columns fall at different speeds.
    // Range here is 30 to 60 seconds which feels calm and legible.
    column.style.animationDuration = (Math.random() * 30 + 30) + 's';

    // Add a small delay so columns do not start in sync.
    column.style.animationDelay = Math.random() * 5 + 's';

    // Build 30 lines of text per column.
    // Each line picks the next character in the message sequence.
    let text = '';
    for (let j = 0; j < 30; j++) {
      // Cycle through the message using modular arithmetic.
      const char = chars[(i + j) % chars.length];
      // Add a newline after each character to create vertical stacking.
      text += char + '\n';
    }

    // Use textContent for plain text rendering.
    column.textContent = text;

    // Attach the column to the container so CSS animations can run.
    container.appendChild(column);
  }
}

// Kick off the ambient background effect on load.
// This does not start the story. That remains user initiated.
createMatrixRain();
