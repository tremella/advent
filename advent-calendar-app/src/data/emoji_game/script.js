export function run({ details }) {
  // prevents double rendering
  if (document.getElementsByClassName('card').length > 0) {
    return;
  }

  console.log('running emoji_game');

  const welcome = details.welcome;
  const instructions = details.instructions;
  const guess1 = details.guess1;
  const answer1 = details.answer1;
  
  const guess2 = details.guess2;
  const answer2 = details.answer2;
  
  const guess3 = details.guess3;
  const answer3 = details.answer3;
  
  const congrats = details.congrats;

  const scene = document.getElementById('scene');
  scene.classList.add('scene');
  scene.classList.add('scene--card');

  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';

  const front = document.createElement('div');
  front.classList.add('card__face');
  front.classList.add('card__face--front');
  front.innerHTML = guess1;

  const back = document.createElement('div');
  back.classList.add('card__face');
  back.classList.add('card__face--back');
  back.innerHTML = answer1;

  card.appendChild(front);
  card.appendChild(back);

  let currentCard = 1;

  card.addEventListener('click', function () {
    currentCard++;
    if (currentCard > 3) {
      console.log(congrats);
      return;
    }

    front.innerHTML = details[`guess${currentCard}`];
    back.innerHTML = details[`answer${currentCard}`];

    // card.classList.toggle('is-flipped');
  });

  scene.appendChild(card);

  return scene;
}
