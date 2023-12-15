export function run({ details }) {
  const button = document.getElementById('big_blue');
  button.innerText = details.label;
  button.addEventListener('click', () => {
    // Add your action here. For example, play a sound.
    console.log('Button clicked!');
  });
}
