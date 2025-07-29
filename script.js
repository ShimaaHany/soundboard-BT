// Initialize audio objects for each sound
const sounds = {
    clapping: new Audio('sounds/clapping.wav'),
    boo: new Audio('sounds/boo.wav'),
    violin: new Audio('sounds/violin.wav'),
    drums: new Audio('sounds/drums.wav'),
    laughing: new Audio('sounds/laughing.wav'),
    scream: new Audio('sounds/scream.wav')
};

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
            playSound(soundName);
            
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

// Function to play sound
function playSound(soundName) {
    const audio = sounds[soundName];
    if (audio) {
        // Reset audio to beginning in case it's already playing
        audio.currentTime = 0;
        
        // Play the sound
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
            // Fallback: try to play again after a short delay
            setTimeout(() => {
                audio.play().catch(err => {
                    console.error('Failed to play sound after retry:', err);
                });
            }, 100);
        });
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

