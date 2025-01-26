document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.body;
    const balloons = [];

    // Counter popped balloons
    let poppedBalloons = 0;

    //5 minutes
    let timeRemaining = 60;
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.innerText = `Time Remaining: ${formatTime(timeRemaining)}`;
    gameArea.appendChild(timerElement);

    // Function to format the time as mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    // Function to generate a random number between min and max (inclusive)
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Function to create a new balloon and place it on the screen
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon'; 
        balloon.innerHTML = '<img src="balloon.svg" alt="Balloon" style="width: 150%; height: 100%; border-radius: 50%;">';
        balloon.style.left = `${getRandomNumber(10, window.innerWidth - 60)}px`; 
        balloon.style.bottom = '0px'; 
        gameArea.appendChild(balloon); 
        balloons.push(balloon);
        balloon.addEventListener('click', function() {
            popBalloon(balloon); // Call popBalloon function
        });
        //Balloon to move upwards
        balloon.animate([
            { transform: 'translateY(0px)' },
            { transform: `translateY(-${window.innerHeight}px)` }
        ], {
            duration: 4000, //Balloon duration 4 seconds
            easing: 'linear'
        });
        // Remove the balloon  4 seconds 
        setTimeout(() => {
            if (balloon.parentElement) {
                burstBalloon(balloon);
            }
        }, 4000);
    }
    // Create multiple balloons
    function createMultipleBalloons(count) {
        for (let i = 0; i < count; i++) {
            createBalloon();
        }
    }
    // Function to animate and remove a popped balloon
    function popBalloon(balloon) {
        balloon.innerHTML = '<img src="Boom.png" alt="Burst Balloon" style="width: 200%; height: 100%;">';
        poppedBalloons++;

        // Remove the balloon from DOM after animation
        setTimeout(() => {
            if (balloon.parentElement) {
                balloon.parentElement.removeChild(balloon); 
                balloons.splice(balloons.indexOf(balloon), 1);
                if (balloons.length === 0) {
                    endGame(); // Call endGame function 
                }
            }
        }, 200); //0.2 seconds
    }
    // Function to animate and remove a burst balloon
    function burstBalloon(balloon) {
        balloon.innerHTML = '<img src="" alt="" style="width: 0%; height: 0%;">';
        setTimeout(() => {
            if (balloon.parentElement) {
                balloon.parentElement.removeChild(balloon); // Remove balloon from DOM
                balloons.splice(balloons.indexOf(balloon), 1); // Remove balloon from array
            }
        }, 200); //0.2 seconds
    }
    // Function to end the game and show the total popped balloons
    function endGame() {
        alert(`Congratulations! You popped ${poppedBalloons} balloons!`); 
    }
    //create multiple balloons every 0.5 seconds
    const createBalloonInterval = setInterval(() => createMultipleBalloons(2), 500);

    //update the timer 
    const timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time Remaining: ${formatTime(timeRemaining)}`;

        if (timeRemaining <= 0) {
            clearInterval(createBalloonInterval); // stop creating new balloons
            clearInterval(timerInterval); // stop updating the timer
            alert(`Time is up... You popped ${poppedBalloons} balloons!`); // show the number of popped balloons
        }
    }, 1000); //1 second
});
