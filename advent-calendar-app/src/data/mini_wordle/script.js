
(function() {
const container = document.getElementById('mini_wordle');
const targetWord = "yule"; // For simplicity, a fixed word. This can be randomized or fetched from a list.
const maxGuesses = 6;
let num_letters = 4;
let currentGuess = [];
let guesses = 0;

function initGame() {
    const gameContainer = document.createElement('div');

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

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'guessInput';
    input.maxLength = num_letters;
    gameContainer.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Guess';
    button.addEventListener('click', submitGuess);
    gameContainer.appendChild(button);

    container.appendChild(gameContainer); // Append the game container to the body
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
    for (let i = 0; i < num_letters; i++) {
        let cell = document.getElementById(`cell-${guesses}-${i}`);
        cell.textContent = guess[i];

        if (targetWord[i] === guess[i]) {
            cell.classList.add("correct");
        } else if (targetWord.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
    }
}
let validWords = [];

fetch('/src/data/mini_wordle/four_letter_words.txt')
  .then(response => response.text())
  .then(text => {
    validWords = text.split('\n').map(word => word.trim());
    console.log(validWords);
    initGame(); // Initialize the game after loading the words
  });
})();
