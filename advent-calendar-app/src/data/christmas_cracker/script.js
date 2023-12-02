export function run() {
  const card = document.getElementById('card');

  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });

}
