
(function() {
    const snowglobe = document.getElementById('snowglobe');
    const numberOfSnowflakes = 80; // 1 snowflake == 1 div. Don't make 2000 lmao. 
    
    class Snowflake {
        constructor(element) {
            this.element = element;
            this.reset();
        }
    
        // where each snowflake starts, how fast it falls, and how transparent it is.
        reset() {
            this.element.style.left = `${Math.random() * 100}%`;
            this.element.style.top = `-${Math.random() * 20}px`;
            this.element.style.opacity = Math.random();
            this.speed = Math.random() * 3 + 1;
        }

        fall() {
            const currentTop = parseFloat(this.element.style.top);
            this.element.style.top = `${currentTop + this.speed}px`;
          
            // Calculate opacity based on the distance from the top
            const distanceFromTop = snowglobe.offsetHeight - currentTop;
            const opacity = Math.max(0, Math.min(1, distanceFromTop / snowglobe.offsetHeight));
            this.element.style.opacity = opacity;
          
            // Reset when the snowflake is approximately 80% of the way down
            const resetThreshold = snowglobe.offsetHeight * 0.8;
            if (currentTop > resetThreshold) {
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