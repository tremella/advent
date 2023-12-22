export function run() {

  if (document.getElementById("postcard-message")) return;
  


  const numberOfStars = 15;
  const starTypes = ['./src/data/starry_night/star_major.png', './src/data/starry_night/star_minor.png'];
  let starSound = new Audio("./src/data/starry_night/starsound.mp3");
  starSound.volume = 0.7;
  
  // defines stars
  class Star {
    constructor(element) {
      this.element = element;
      this.setFeatures();
    }

    // where each star is placed, the size, the transparency, and the type.
    setFeatures() {
      this.element.style.left = `${Math.random() * 95}%`;
      this.element.style.top = `${Math.random() * 33}%`;
      this.element.style.opacity = 0.3 + (Math.random() * 0.4); // 0.3-0.7
      this.element.src = starTypes[Math.floor(Math.random() * starTypes.length)];

      this.element.classList.add('star');

      // Calculate a random delay for each star
      const randomDelay = Math.random() * 2; // Adjust the range of random values as needed

    // Add inline style for animation delay
      this.element.style.animationDelay = `-${randomDelay}s`;

      // Code to animate the star on hover
      this.element.addEventListener('mouseenter', () => {
        this.element.classList.add('star--hover');

        let starSoundInstance = new Audio(starSound.src); // Create a new Audio object for this sound
        starSoundInstance.play();
      });
  
      this.element.addEventListener('mouseleave', () => {
        // Code to reset the star after hover
        this.element.classList.remove('star--hover');
      });
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

  const numberOfDoors = 3
  let doorSound = new Audio("./src/data/starry_night/doorbell.mp3");
  doorSound.volume = 0.5;
  let doorFeatures = [
    { "left": "12%", "top": "72%", 
      "width": "2em", "height": "2em"    
  },
    { "left": "72%", "top": "76%", 
      "width": "3.5em", "height": "2.5em"    
  },
    { "left": "85%", "top": "75%", 
      "width": "2em", "height": "2.5em"    
  },
  ];

  function placeDoors() {
    for (let i = 0; i < numberOfDoors; i++) {
      const doorElement = document.createElement('img');
      doorElement.style.left = doorFeatures[i]["left"];
      doorElement.style.top = doorFeatures[i]["top"];
      doorElement.style.width = doorFeatures[i]["width"];
      doorElement.style.height = doorFeatures[i]["height"];
      doorElement.classList.add('door');
      starryCanvas.appendChild(doorElement);
      doorElement.addEventListener('click', function() {
        // doorSound.play();
        let doorSoundInstance = new Audio(doorSound.src); // Create a new Audio object for this sound
        doorSoundInstance.play();
      });
    }
  }

  // transparent overlay with instructions
let overlay = document.createElement('div');
overlay.id = 'advice-overlay';
overlay.style.opacity = '1';
overlay.style.transition = 'opacity 2s'; // Change '2s' to the duration of the fade

let advice = document.createElement('p');
advice.innerHTML = "try clicking or hovering on things!";
overlay.appendChild(advice);

starryCanvas.appendChild(overlay);

// Fade out and remove overlay after 10 seconds
  setTimeout(function() {
    overlay.style.opacity = '0';
    setTimeout(function() {
      if (starryCanvas.contains(overlay)) {
        starryCanvas.removeChild(overlay);
      }
    }, 2000); // Wait for the fade out to finish before removing the element
  }, 2500); // 10000 milliseconds = 10 seconds

  // You can still keep the click-to-close functionality
  overlay.addEventListener('click', function() {
    overlay.style.opacity = '0';
    setTimeout(function() {
      if (starryCanvas.contains(overlay)) {
        starryCanvas.removeChild(overlay);
      }
    }, 2000); // Wait for the fade out to finish before removing the element
  });

  
  // also Header, "Happy Holidays"
  let message = document.createElement('h1');
  message.id = 'postcard-message'
  
  message.innerHTML = "Happy Holidays";
  starryCanvas.appendChild(message);
  
  let messageSound = new Audio("./src/data/starry_night/music-box.mp3");
  // also add background music via clicking message
  message.addEventListener('click', function() {
    messageSound.currentTime = 1.5;
    messageSound.play();

    setTimeout(function() {
      messageSound.pause();
      messageSound.currentTime = 0;
    }, 14000); // 10000 milliseconds = 10 seconds
    
  });


  placeAllStars();
  placeDoors();
}
