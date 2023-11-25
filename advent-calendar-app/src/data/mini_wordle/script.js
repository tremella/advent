
(function() {
const container = document.getElementById('mini_wordle');
const targetWord = "apple"; // For simplicity, a fixed word. This can be randomized or fetched from a list.
const maxGuesses = 6;
let currentGuess = [];
let guesses = 0;
let validWords = ["apple", "hello", "world", "there", "about", "again", "heart", "pizza", "water", "happy", "sixty", "board", "month", "angel", "death", "green", "music", "fifty", "three", "party", "piano", "mouth", "woman", "sugar", "amber", "dream", "apple", "laugh", "tiger", "faith", "earth", "river", "money", "peace", "forty", "words", "smile", "abate", "house", "alone", "watch", "lemon", "south", "erica", "anime", "after", "santa"];

function initGame() {
    const gameContainer = document.createElement('div');

    const grid = document.createElement('div');
    grid.id = 'grid';
    gameContainer.appendChild(grid);

    for (let i = 0; i < maxGuesses; i++) {
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement('div');
            cell.id = `cell-${i}-${j}`;
            cell.classList.add('cell');
            grid.appendChild(cell);
        }
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'guessInput';
    input.maxLength = 5;
    gameContainer.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Guess';
    button.addEventListener('click', submitGuess);
    gameContainer.appendChild(button);

    container.appendChild(gameContainer); // Append the game container to the body
}


function submitGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    if (guess.length !== 5) {
        alert("Enter a 5-letter word");
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
    for (let i = 0; i < 5; i++) {
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
initGame();
})();
