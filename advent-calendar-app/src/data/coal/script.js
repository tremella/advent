export function run() {
    const container = document.getElementById('coal');
    const numberOfEmbers = 20;

    class Ember {
        constructor(element) {
            this.element = element;
            this.reset();
        }

        reset() {
            const centerX = container.offsetWidth / 2;
            const centerY = container.offsetHeight / 2;

            // Place the embers around a central point
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 150; // Adjust the radius as needed
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            // console.log(x,y);

            this.element.style.left = `${x}px`;
            this.element.style.top = `${y}px`;
            this.element.style.backgroundColor = this.getRandomColor();
            this.speed = Math.random() * 1 + 0.5;
        }

        rise() {
            const currentTop = parseFloat(this.element.style.top);
            this.element.style.top = `${currentTop - this.speed}px`; // Move upwards

            // Reset when the ember is above the container
            if (currentTop < 0) {
                this.reset();
            }
        }

        getRandomColor() {
            return Math.random() > 0.5 ? 'black' : '#EB5406';
        }
    }

    function createEmber() {
        const emberSize = Math.random() * 1.5 + 2;
        const emberElement = document.createElement('div');
        emberElement.style.position = 'absolute';
        emberElement.style.width = `${emberSize}px`;
        emberElement.style.height = `${emberSize}px`;
        emberElement.style.borderRadius = '50%';
        container.appendChild(emberElement);
        return new Ember(emberElement);
    }

    const embers = Array.from({ length: numberOfEmbers }, createEmber);

    function updateEmbers() {
        embers.forEach(ember => ember.rise());
        requestAnimationFrame(updateEmbers);
    }

    updateEmbers();
}
