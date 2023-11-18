
(function() {
    const snowglobe = document.getElementById('snowglobe');
    const numberOfSnowflakes = 100;
    
    class Snowflake {
        constructor(element) {
            this.element = element;
            this.reset();
        }
    
        reset() {
            this.element.style.left = `${Math.random() * 100}%`;
            this.element.style.top = `-${Math.random() * 20}px`;
            this.element.style.opacity = Math.random();
            this.speed = Math.random() * 3 + 1;
        }
    
        fall() {
            this.element.style.top = `${parseFloat(this.element.style.top) + this.speed}px`;
            if (parseFloat(this.element.style.top) > snowglobe.offsetHeight) {
                this.reset();
            }
        }
    }
    
    function createSnowflake() {
        const snowflakeElement = document.createElement('div');
        snowflakeElement.style.position = 'absolute';
        snowflakeElement.style.backgroundColor = 'white';
        snowflakeElement.style.width = '5px';
        snowflakeElement.style.height = '5px';
        snowflakeElement.style.borderRadius = '50%';
        snowglobe.appendChild(snowflakeElement);
        return new Snowflake(snowflakeElement);
    }
    
    const snowflakes = Array.from({ length: numberOfSnowflakes }, createSnowflake);
    
    function updateSnowflakes() {
        snowflakes.forEach(snowflake => snowflake.fall());
        requestAnimationFrame(updateSnowflakes);
    }
    
    updateSnowflakes();
})();