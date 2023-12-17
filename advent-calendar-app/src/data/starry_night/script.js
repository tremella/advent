export function run() {
  const numberOfStars = 13;
  // const starTypes = ['./star_major.png', './star_minor.png'];
  const starTypes = ['./src/data/starry_night/star_major.png', './src/data/starry_night/star_minor.png'];


  // defines stars
  class Star {
    constructor(element) {
      this.element = element;
      this.setFeatures();
    }

    // where each star is placed, the size, the transparency, and the type.
    setFeatures() {
      this.element.style.left = `${Math.random() * 100}%`;
      this.element.style.top = `${Math.random() * 40}%`;
      this.element.style.opacity = 0.3 + (Math.random() * 0.4); // 0.3-0.7
      this.element.src = starTypes[Math.floor(Math.random() * starTypes.length)];

      if(this.element.src === starTypes[0]){
        this.element.style.width = `${Math.random() + 0.8 * 18}px`; // math.random = 0-1, so 0-20px
        this.element.style.height = `${(this.element.style.width) *0.6}px` ;

      } else {
        this.element.style.width = `${Math.random() + 0.8 * 16}px`; // math.random = 0-1, so 0-20px
        this.element.style.height = `${(this.element.style.width) *0.5}px` ;
      }
      this.element.classList.add('star');
      // this.element.style.zindex = `999`;
    }
  }

  // initialize canvas
  const starryCanvas = document.getElementById('starry_night');

  // creates stars
  function placeAllStars() {
    for (let i = 0; i < numberOfStars; i++) {
      const starElement = document.createElement('img');
      starryCanvas.appendChild(starElement);
      new Star(starElement);
    }
  }

  // next add click listener to generate sound

  // and hover listener

  // also add background music. 

  // also Header, "Happy Holidays"

  // also hover modal, "click or hover :)"

  // also need to handle mobile sizing

  placeAllStars();
}
