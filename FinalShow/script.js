let gameState = {
  currentPassage: 'start'
};

let sectionIndex = 0;

function continueStory() {
  const passage = passages[gameState.currentPassage];

  if (sectionIndex < passage.sections.length) {
    document.getElementById('passage-text').textContent = passage.sections[sectionIndex];
    sectionIndex++;
  } else if (passage.popupWindow) {
    openPopupWindow(passage.popupWindow);
    gameState.currentPassage = 'merge';  // Return to the main menu after popup
    sectionIndex = 0;
    continueStory();
  } else if (passage.ending) {
    displayEnding();
  } else {
    displayChoices(passage.choices);
  }
}

function displayChoices(choices) {
  const container = document.getElementById('choices-container');
  container.innerHTML = '';

  choices.forEach(choice => {
    const el = document.createElement('div');
    el.className = 'choice';
    el.textContent = choice.text;

    el.onclick = () => {
      if (choice.action === 'popup' && choice.popupWindow) {
        openPopupWindow(choice.popupWindow);
        gameState.currentPassage = 'merge'; // stay on merge after popup
        sectionIndex = 0;
        continueStory();
      } else {
        gameState.currentPassage = choice.action;
        sectionIndex = 0;
        container.innerHTML = '';
        continueStory();
      }
    };

    container.appendChild(el);
  });
}

function displayEnding() {
  document.getElementById('passage-text').innerHTML = `
    <div class="ending">
      CONNECTION TERMINATED... You reached the archive's end.
      <br><br>
      <button class="restart" onclick="restartGame()">REINITIALIZE</button>
    </div>
  `;
  document.getElementById('choices-container').innerHTML = '';
}

function restartGame() {
  gameState.currentPassage = 'start';
  sectionIndex = 0;
  document.getElementById('choices-container').innerHTML = '';
  document.getElementById('passage-text').textContent = "[Click to begin your session]";
}

function openPopupWindow(file) {
  window.open(file, '_blank', 'width=800,height=600');
}

function createMatrixRain() {
  const container = document.getElementById('matrix-rain');
  const message = "These are Re:Constructs – ways to re-experience the thinking and ideas behind lost artworks.";
  const chars = message.split('');

  for (let i = 0; i < 12; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = Math.random() * 100 + '%';
    column.style.animationDuration = (Math.random() * 30 + 30) + 's';
    column.style.animationDelay = Math.random() * 5 + 's';

    let text = '';
    for (let j = 0; j < 30; j++) {
      const char = chars[(i + j) % chars.length];
      text += char + '\n';
    }

    column.textContent = text;
    container.appendChild(column);
  }
}

createMatrixRain();

