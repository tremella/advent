import Fuse from 'fuse.js';

export function run(data) {  
  const container = document.getElementById('emoji-game');
  if (document.getElementById('emoji-game-container')) return;  
  const emojiSongs = data.details.emojiSongs;

  const emojiContainer = document.createElement('div');
  emojiContainer.id = 'emoji-game-container';

  // Title and instruction
  const title = document.createElement('h2');
  title.textContent = 'Emoji / Song guessing game';
  emojiContainer.appendChild(title);

  const instruction = document.createElement('p');
  instruction.textContent = 'Guess the popular Christmas song from the emojis shown!';
  emojiContainer.appendChild(instruction);

  function isApproximatelyCorrect(guess, answer) {
    const options = {
        includeScore: true,
        threshold: 0.3, // Adjust threshold for fuzziness (0 is exact match, 1 is very fuzzy)
    };

    const fuse = new Fuse([answer], options);
    const result = fuse.search(guess);    
    const isGuessSubstantial = guess.length >= answer.length * 0.8; // Guess should be at least 80% of the answer

    return result.length > 0 && result[0].item === answer && isGuessSubstantial;
  }

  // Function to handle the submission of guesses
  function handleSubmit() {
    let score = 0;

    emojiSongs.forEach((item, index) => {
        const guess = document.getElementById(`input-${index}`).value;
        const correct = isApproximatelyCorrect(guess, item.song);
        if (correct) {
            score++;
        }       
    });

    // Update the score
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = `Your Score: ${score}/${emojiSongs.length}`;

    // Check if the score isn't 3/3
    if (score !== emojiSongs.length) {
        scoreDiv.textContent += ' - Keep guessing!';
    }
  }
  

  // Create the game elements
  emojiSongs.forEach((item, index) => {
    const emojiInputContainer = document.createElement('div');
    emojiInputContainer.classList.add('emoji-input-container');

    const emojiDiv = document.createElement('div');
    emojiDiv.classList.add('emoji-song');
    emojiDiv.textContent = item.emojis;
    emojiInputContainer.appendChild(emojiDiv);

    const inputField = document.createElement('input');
    inputField.setAttribute('id', `input-${index}`);
    inputField.setAttribute('type', 'text');
    // Add an event listener for the Enter key
    inputField.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault(); // Prevent the default action to stop form submission
          handleSubmit(); // Call the same function used for the submit button
      }
    });
    emojiInputContainer.appendChild(inputField);        

    emojiContainer.appendChild(emojiInputContainer);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Guesses';
  submitButton.addEventListener('click', handleSubmit);
  emojiContainer.appendChild(submitButton);

  const scoreDiv = document.createElement('div');
  scoreDiv.setAttribute('id', 'score');
  emojiContainer.appendChild(scoreDiv);

  container.appendChild(emojiContainer);
}
