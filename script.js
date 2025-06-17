const lines = [
  "Hello",
  "Welcome the homepage.",
];

const terminal = document.getElementById("terminal");
let lineIndex = 0;
let charIndex = 0;

function typeNextChar() {
  if (lineIndex < lines.length) {
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      terminal.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeNextChar, 100);
    } else {
      terminal.textContent += "\n";
      charIndex = 0;
      lineIndex++;
      setTimeout(typeNextChar, 400);
    }
  }
}

typeNextChar();

const boxes = Array.from(document.querySelectorAll('.terminal-box'));
let currentIndex = 0;
const columns = 4; // 4 columns in your grid

function updateFocus() {
  boxes.forEach(box => box.blur());
  boxes[currentIndex].focus();
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      if ((currentIndex + 1) % columns !== 0) currentIndex++;
      break;
    case 'ArrowLeft':
      if (currentIndex % columns !== 0) currentIndex--;
      break;
    case 'ArrowDown':
      if (currentIndex + columns < boxes.length) currentIndex += columns;
      break;
    case 'ArrowUp':
      if (currentIndex - columns >= 0) currentIndex -= columns;
      break;
    case 'Enter':
      boxes[currentIndex].click(); // simulate clicking the link
      return;
  }
  updateFocus();
});

// Set initial focus
updateFocus();

// Optional: Focus the search input on page load
document.getElementById('q').addEventListener('focus', () => {
  currentIndex = -1; // Remove focus from grid
});

document.getElementById('q').addEventListener('keydown', (e) => {
  // Stop arrow key navigation in search bar
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.stopPropagation();
  }
});