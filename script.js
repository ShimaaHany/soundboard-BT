// Initialize audio objects for each sound
const sounds = {
    clapping: new Audio('sounds/clapping.wav'),
    boo: new Audio('sounds/boo.wav'),
    violin: new Audio('sounds/violin.wav'),
    drums: new Audio('sounds/drums.wav'),
    laughing: new Audio('sounds/laughing.wav'),
    scream: new Audio('sounds/scream.wav')
};

// Variable to keep track of the currently playing audio object
let currentPlayingAudio = null;
let currentPlayingSoundName = null; // To track which sound is playing

// Preload all sounds
Object.values(sounds).forEach(audio => {
    audio.preload = 'auto';
    audio.volume = 0.7; // Set volume to 70%
});

// Add click event listeners to all sound buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.sound-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundName = this.getAttribute('data-sound');
            handleSoundButtonClick(soundName);

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Add touch support for mobile devices
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
});

// Function to handle sound button clicks
function handleSoundButtonClick(soundName) {
    const audio = sounds[soundName];

    if (audio) {
        // If the same sound is already playing, stop it
        if (currentPlayingAudio === audio) {
            stopCurrentSound();
            currentPlayingAudio = null;
            currentPlayingSoundName = null;
        } else {
            // If a different sound is playing, stop it first
            if (currentPlayingAudio) {
                stopCurrentSound();
            }

            // Play the new sound
            audio.currentTime = 0; // Reset to beginning
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
                // Fallback: try to play again after a short delay
                setTimeout(() => {
                    audio.play().catch(err => {
                        console.error('Failed to play sound after retry:', err);
                    });
                }, 100);
            });
            currentPlayingAudio = audio;
            currentPlayingSoundName = soundName;
        }
    }
}

// Function to stop the currently playing sound
function stopCurrentSound() {
    if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0; // Reset to beginning
    }
}

// Handle audio loading errors
Object.entries(sounds).forEach(([name, audio]) => {
    audio.addEventListener('error', function() {
        console.error(`Failed to load ${name} sound`);
    });

    audio.addEventListener('canplaythrough', function() {
        console.log(`${name} sound loaded successfully`);
    });
});

