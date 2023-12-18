export function run({ details }) {
  if (document.getElementById('big_blue_label')) {
    return;
    
  }
  
  function createSnowflakeShower() {
    const overlay = document.getElementsByClassName('ReactModal__Overlay')[0];
  
    const num_emojis = 50;
    
    for (let i = 0; i < num_emojis; i++) {
      let emoji = document.createElement('div');
      emoji.innerHTML = '❄️';
      emoji.className = 'emoji';
      overlay.appendChild(emoji);
  
      emoji.style.left = Math.random() * 100 + 'vw'; // Adjust based on your needs
      emoji.style.animationDelay = Math.random() * 2 + 's';
      emoji.style.zIndex = 999;
  
      emoji.addEventListener('animationend', function() {
        emoji.remove();
      });
    }
  }

  let numPresses = 0;
  let buttonLabels = [
    'Click Me!', 
    'woah!',
    'pretty snowflakes!',
    'Click me again!!',
    'And again!', 
    'WOW! What a rush!', 
    'You\'re really going for it!',
    'More clicks!',
    'MORE CLICKS!',
    'LET IT SNOW!!',
    '❄️❄️❄️',
    '❄️❄️❄️❄️❄️',
    '❄️❄️❄️ ❄️❄️❄️❄️ ❄️❄️❄️'];
      
  const bigBlue = document.getElementById('big_blue');
  const label = document.createElement('label');
  label.id = 'big_blue_label';
  label.innerText = 'Click!';
  bigBlue.appendChild(label);

  bigBlue.addEventListener('click', function () {

    if(numPresses < buttonLabels.length - 1) {
      numPresses++;
      label.innerText = buttonLabels[numPresses];
    }
    createSnowflakeShower();
  });
}
