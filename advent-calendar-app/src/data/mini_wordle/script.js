
export function run() {

    const container = document.getElementById('mini_wordle');
    const targetWord = "yule"; // For simplicity, a fixed word. This can be randomized or fetched from a list.
    const maxGuesses = 6;
    let num_letters = 4;
    let currentGuess = [];
    let guesses = 0;

function initGame() {
    const gameContainer = document.createElement('div');

    if (document.getElementById('grid')) {
        return;
    }
    const grid = document.createElement('div');
    grid.id = 'grid';
    gameContainer.appendChild(grid);

    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < num_letters; j++) {
            let cell = document.createElement('div');
            cell.id = `cell-${i}-${j}`;
            cell.classList.add('cell');
            grid.appendChild(cell);
        }
    }

    // Container for the input
    const inputContainer = document.createElement("div");
    inputContainer.id = 'inputContainer';
    gameContainer.appendChild(inputContainer);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'guessInput';
    input.maxLength = num_letters;
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('guessButton').click();
        }
    });
    inputContainer.appendChild(input); // Add input to its container

    // Container for the button
    const buttonContainer = document.createElement('div');
    gameContainer.appendChild(buttonContainer);

    const button = document.createElement('button');
    button.id = 'guessButton';
    button.textContent = 'Guess';
    button.addEventListener('click', submitGuess);
    buttonContainer.appendChild(button); // Add button to its container

    container.appendChild(gameContainer); // Append the game container to the 
}


function submitGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    if (guess.length !== num_letters) {
        alert("Enter a 4-letter word");
        return;
    }

    if (!validWords.includes(guess)) {
        alert("Not a valid word");
        return;
    }

    updateGrid(guess);
    if (guess === targetWord) {
        alert("Congratulations! You've guessed the word!");
        return;
    }

    guesses++;
    if (guesses === maxGuesses) {
        alert("Game over! The word was " + targetWord);
    }

    document.getElementById("guessInput").value = '';
}

function updateGrid(guess) {
    let targetLetterCounts = {};

    // First, count the letters in the target word
    for (let i = 0; i < num_letters; i++) {
        const letter = targetWord[i];
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
    }

    // First pass: Mark correct guesses and update counts
    for (let i = 0; i < num_letters; i++) {
        let cell = document.getElementById(`cell-${guesses}-${i}`);
        cell.textContent = guess[i];

        if (targetWord[i] === guess[i]) {
            cell.classList.add("correct");
            targetLetterCounts[guess[i]] -= 1;
        }
    }

    // Second pass: Mark present guesses considering updated counts
    for (let i = 0; i < num_letters; i++) {
        let cell = document.getElementById(`cell-${guesses}-${i}`);
        if (!cell.classList.contains("correct")) {
            if (targetWord.includes(guess[i]) && targetLetterCounts[guess[i]] > 0) {
                cell.classList.add("present");
                targetLetterCounts[guess[i]] -= 1;
            } else {
                cell.classList.add("absent");
            }
        }
    }
}
let validWords = [];

fetch('/advent/src/data/mini_wordle/four_letter_words.txt')
  .then(response => response.text())
  .then(text => {
    validWords = text.split('\n').map(word => word.trim());    
    initGame(); // Initialize the game after loading the words
  });
}
