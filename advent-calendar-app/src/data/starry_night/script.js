export function run() {

  if (document.getElementById("postcard-message")) return;
  


  const numberOfStars = 17;
  const starTypes = ['/advent/images/star_major.png', '/advent/images/star_minor.png'];
  let starSound = new Audio("/advent/sounds/starsound.mp3");

  // defines stars
  class Star {
    constructor(element) {
      this.element = element;
      this.setFeatures();
    }

    // where each star is placed, the size, the transparency, and the type.
    setFeatures() {
      this.element.style.left = `${Math.random() * 95}%`;
      this.element.style.top = `${Math.random() * 30}%`;
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
        starSoundInstance.volume = 0.9;
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

  let doorSound = new Audio("/advent/sounds/doorbell.mp3");

  let doorFeatures = [
    { "left": "12%", "top": "72%", 
      "width": "2em", "height": "2em" ,
  },
    { "left": "72%", "top": "76%", 
      "width": "3.5em", "height": "2.5em",
  },
    { "left": "85%", "top": "75%", 
      "width": "2em", "height": "2.5em",
  },
  ];

  let glowFeatures = [
    { "left": "14%", "top": "76%", 
  },
    { "left": "76%", "top": "81%", 
  },
    { "left": "87.5%", "top": "81%", 
  },
  ];

  function placeDoors() {
    for (let i = 0; i < numberOfDoors; i++) {
      const doorElement = document.createElement('div');
      doorElement.style.left = doorFeatures[i]["left"];
      doorElement.style.top = doorFeatures[i]["top"];
      doorElement.style.width = doorFeatures[i]["width"];
      doorElement.style.height = doorFeatures[i]["height"];

      doorElement.classList.add('door');


      const doorGlow = document.createElement('img');
      const randomDelay = Math.random() * 2; // Adjust the range of random values as needed

      doorGlow.classList.add('door-glow');
      doorGlow.style.left = glowFeatures[i]["left"];
      doorGlow.style.top = glowFeatures[i]["top"];
      doorGlow.style.animationDelay = `-${randomDelay}s`;
      

  

      starryCanvas.appendChild(doorGlow);
      starryCanvas.appendChild(doorElement);
      doorElement.addEventListener('click', function() {
        let doorSoundInstance = new Audio(doorSound.src); // Create a new Audio object for this sound
        doorSoundInstance.volume = 0.2;
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
  let messageContainer = document.createElement('div');
  messageContainer.id = 'postcard-message-container';

  let message = document.createElement('h1');
  message.id = 'postcard-message'
  
  // message.innerHTML = "Happy Holidays";
  message.innerHTML = "Merry Christmas"
  starryCanvas.appendChild(messageContainer);
  messageContainer.appendChild(message);
  
  let messageSound = new Audio("/advent/sounds/music-box.mp3");
  // also add background music via clicking message
  message.addEventListener('click', function() {
    // messageSound.currentTime = 1.5;
    messageSound.play();


  });


  placeAllStars();
  placeDoors();
}
