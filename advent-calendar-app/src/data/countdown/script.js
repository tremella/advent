export function run() {
    if (document.getElementById('countdown-timer')) {
        return;
    }

    const container = document.getElementById('countdown');
    const countdownContainer = document.createElement('div');
    countdownContainer.setAttribute('id', 'countdown-timer');

    const daysHoursDiv = document.createElement('div');
    daysHoursDiv.setAttribute('id', 'days-hours');
    const minutesSecondsDiv = document.createElement('div');
    minutesSecondsDiv.setAttribute('id', 'minutes-seconds');

    countdownContainer.appendChild(daysHoursDiv);
    countdownContainer.appendChild(minutesSecondsDiv);

    container.appendChild(countdownContainer);

    // Function to update the countdown
    const updateCountdown = () => {
        const christmasDay = new Date('December 25, 2023 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = christmasDay - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysHoursDiv.textContent = `${days} Day${days !== 1 ? 's' : ''} | ${hours} Hour${hours !== 1 ? 's' : ''}`;        
        minutesSecondsDiv.textContent = `${minutes} Minute${minutes !== 1 ? 's' : ''} | ${seconds} Second${seconds !== 1 ? 's' : ''}`;        

        if (distance < 0) {
            clearInterval(interval);
            countdownContainer.textContent = "Merry Christmas!";
        }
    };

    // Call once to display countdown immediately, then set interval for subsequent updates
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}
