export function run({details}) {

  // prevents double-rendering
  if (document.getElementsByClassName('card').length > 0) {
    return;
  }

  const setupString = details.setup;
  const punchlineString = details.punchline;
    
  const scene = document.getElementById('scene');
  scene.classList.add('scene');
  scene.classList.add('scene--card');

  const card = document.createElement('div');
  card.classList.add('card');
  card.id = 'card';

  const cardFront = document.createElement('div');
  cardFront.classList.add('card__face', 'card__face--front');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card__face', 'card__face--back');
  
  const setup = document.createElement('p');
  setup.textContent = setupString;

  const punchline = document.createElement('p');
  punchline.textContent = punchlineString;

  cardFront.appendChild(setup);
  cardBack.appendChild(punchline);

  card.appendChild(cardFront);
  card.appendChild(cardBack);

  scene.appendChild(card);

  card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
  });

  return scene;
}

