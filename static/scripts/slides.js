// 1. Grab our DOM elements
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlideIndex = 0;
let slideTimer;

// 2. Core function to transition between slides
function changeSlide(newIndex) {
    // Remove the active class from the old slide
    slides[currentSlideIndex].classList.remove('active');

    // Update our position index tracker
    currentSlideIndex = newIndex;

    // Handle boundary loops (if past the end, go to start. If past start, go to end)
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Add the active class to our fresh slide to fade it in
    slides[currentSlideIndex].classList.add('active');
}

// 3. Automatic Rotation logic
function startAutoSlide() {
    // Clear any old timers to avoid crazy fast jumping glitches
    clearInterval(slideTimer);
    
    // Change slide every 5 seconds (5000 milliseconds)
    slideTimer = setInterval(() => {
        changeSlide(currentSlideIndex + 1);
    }, 7000);
}

// 4. Manual Arrow Navigation Event Listeners
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        changeSlide(currentSlideIndex + 1);
        startAutoSlide(); // Reset the timer so it doesn't flip right after clicking
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        changeSlide(currentSlideIndex - 1);
        startAutoSlide(); // Reset the timer
    });
}

// Start up the automatic rotation loop immediately when page finishes loading
startAutoSlide();
