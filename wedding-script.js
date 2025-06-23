/*
========================================
🎭 WEDDING WEBSITE FIXED JAVASCRIPT 🎭
========================================
*/


// === 🎯 CORE CONFIGURATION ===
const CONFIG = {
    PARTICLES_COUNT: 30,
    ANIMATION_DURATION: 1000,
    SCROLL_THRESHOLD: 0.1,
    COUNTER_ANIMATION_SPEED: 50,
    RIPPLE_DURATION: 600,
    MUSIC_FADE_DURATION: 300,
    PARALLAX_INTENSITY: 0.3,
    MOUSE_FOLLOW_INTENSITY: 0.01
};

// === 🎪 GLOBAL STATE ===
const STATE = {
    isLoaded: false,
    isMusicPlaying: false,
    scrollDirection: 'down',
    lastScrollY: 0,
    isAnimating: false,
    particles: [],
    intersectionObserver: null
};

// === 🚀 MAIN INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 Starting Wedding Magic...');

    // Initialize core systems first
    setTimeout(() => {
        initPreloader();
        initParticleSystem();
        initMusicPlayer();
        initScrollAnimations();
        initCounterSystem();
        initFormEnhancements();
        initInteractiveEffects();
        addDynamicStyles();

        console.log('✨ Wedding Magic Initialized!');
    }, 100);
});

// === 🎬 FIXED PRELOADER ===
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        console.log('⚠️ Preloader not found, skipping...');
        triggerContentLoad();
        return;
    }

    console.log('🎬 Initializing preloader...');

    // Simple progress simulation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20 + 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            hidePreloader();
        }
    }, 200);

    function hidePreloader() {
        console.log('🎬 Hiding preloader...');
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            preloader.style.display = 'none';
            triggerContentLoad();
        }, 500);
    }
}

function triggerContentLoad() {
    console.log('🎯 Content loading triggered');
    STATE.isLoaded = true;
    document.body.classList.add('loaded');

    // Make sure content is visible
    const mainContent = document.querySelector('.App');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
    }

    // Trigger animations with delay
    setTimeout(() => {
        triggerLoadedAnimations();
    }, 300);
}

function triggerLoadedAnimations() {
    console.log('🎭 Starting loaded animations');

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

// === ✨ FIXED PARTICLE SYSTEM ===
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.log('⚠️ Particles container not found');
        return;
    }

    console.log('✨ Creating particle system...');

    // Create particles with staggered timing
    for (let i = 0; i < CONFIG.PARTICLES_COUNT; i++) {
        setTimeout(() => {
            createParticle(particlesContainer, i);
        }, i * 100);
    }

    // Regenerate particles
    setInterval(() => {
        if (STATE.particles.length < CONFIG.PARTICLES_COUNT) {
            createParticle(particlesContainer, STATE.particles.length);
        }
    }, 4000);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 8 + 15;
    const opacity = Math.random() * 0.08 + 0.03;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: #c9a96e;
        border-radius: 50%;
        opacity: ${opacity};
        animation: float ${duration}s infinite linear;
        animation-delay: ${delay}s;
        pointer-events: none;
    `;

    container.appendChild(particle);
    STATE.particles.push(particle);

    // Clean up particle
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            STATE.particles = STATE.particles.filter(p => p !== particle);
        }
    }, (delay + duration) * 1000);
}

// === 🎭 FIXED SCROLL ANIMATIONS ===
function initScrollAnimations() {
    console.log('🎭 Setting up scroll animations...');

    // Simplified Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    STATE.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special animations
                if (entry.target.classList.contains('counter')) {
                    setTimeout(() => animateCounters(), 300);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        STATE.intersectionObserver.observe(el);
    });

    // Scroll effects
    window.addEventListener('scroll', throttle(handleScroll, 16));
}

function handleScroll() {
    const currentScrollY = window.pageYOffset;
    STATE.scrollDirection = currentScrollY > STATE.lastScrollY ? 'down' : 'up';
    STATE.lastScrollY = currentScrollY;

    // Simple parallax
    const parallaxElements = document.querySelectorAll('.header::before, .rsvp::before');
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${currentScrollY * speed}px)`;
    });

    // Music player scroll behavior
    const musicPlayer = document.querySelector('.music-player');
    if (musicPlayer && currentScrollY > 200) {
        if (STATE.scrollDirection === 'down') {
            musicPlayer.style.transform = 'translateY(-10px)';
            musicPlayer.style.opacity = '0.8';
        } else {
            musicPlayer.style.transform = 'translateY(0)';
            musicPlayer.style.opacity = '1';
        }
    }
}

// === 🎵 FIXED MUSIC PLAYER ===
function initMusicPlayer() {
    const playButton = document.getElementById('playButton');
    const musicText = document.getElementById('music-text');
    const audio = document.getElementById('backgroundAudio');

    if (!playButton || !musicText) {
        console.log('⚠️ Music player elements not found');
        return;
    }

    console.log('🎵 Setting up music player...');

    playButton.addEventListener('click', () => {
        if (audio) {
            toggleMusic(audio, playButton, musicText);
        } else {
            // Fallback if no audio
            musicText.textContent = 'Недоступно';
        }
    });

    // Audio error handling
    if (audio) {
        audio.addEventListener('error', () => {
            console.log('🎵 Audio error');
            musicText.textContent = 'Недоступно';
            playButton.style.opacity = '0.5';
        });

        audio.volume = 0.6;
    }
}

function toggleMusic(audio, button, text) {
    if (STATE.isMusicPlaying) {
        pauseMusic(audio, button, text);
    } else {
        playMusic(audio, button, text);
    }
}

function playMusic(audio, button, text) {
    audio.play().then(() => {
        STATE.isMusicPlaying = true;
        text.textContent = 'Пауза';
        button.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="2" width="3" height="10" fill="white"/><rect x="8" y="2" width="3" height="10" fill="white"/></svg>';
        button.style.animation = 'pulse 2s ease-in-out infinite';
    }).catch(() => {
        console.log('🎵 Autoplay prevented');
        text.textContent = 'Нажмите еще раз';
    });
}

function pauseMusic(audio, button, text) {
    audio.pause();
    STATE.isMusicPlaying = false;
    text.textContent = 'Музыка';
    button.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2L11 7L3 12V2Z" fill="white"/></svg>';
    button.style.animation = 'none';
}

// === ⏳ FIXED COUNTER SYSTEM ===
function initCounterSystem() {
    console.log('⏳ Setting up counter...');
    updateRealTimeCounter();
    setInterval(updateRealTimeCounter, 1000);
}

function updateRealTimeCounter() {
    const targetDate = new Date('2025-08-15T15:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        updateCounterDisplay('days', days);
        updateCounterDisplay('hours', hours);
        updateCounterDisplay('minutes', minutes);
        updateCounterDisplay('seconds', seconds);
    }
}

function updateCounterDisplay(className, value) {
    const element = document.querySelector(`.${className}`);
    if (element && element.textContent !== value.toString()) {
        element.textContent = value;
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach((counter, index) => {
        setTimeout(() => {
            counter.style.transform = 'scale(1.05)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// === 📝 FIXED FORM ENHANCEMENTS ===
function initFormEnhancements() {
    const form = document.getElementById('rsvp');
    if (!form) return;

    console.log('📝 Setting up form...');

    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        enhanceInput(input);
    });
}

function enhanceInput(input) {
    input.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.borderColor = '#c9a96e';
    });

    input.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        this.style.borderColor = '';
    });

    input.addEventListener('input', function() {
        hideErrors();
    });
}

function hideErrors() {
    const errors = document.querySelectorAll('#rsvp_null, #rsvp_errors');
    errors.forEach(error => {
        error.style.display = 'none';
    });
}

// === 📨 FIXED RSVP FUNCTIONS ===
function submityes() {
    handleRSVPSubmission('yes');
}

function submitno() {
    handleRSVPSubmission('no');
}

function handleRSVPSubmission(response) {
    const form = document.getElementById('rsvp');
    const nameInput = form.querySelector('input[name="Имя и фамилия"]');
    const quantityInput = form.querySelector('input[name="Количество"]');

    // Simple validation
    if (!nameInput.value.trim()) {
        showError('rsvp_null');
        return;
    }

    if (response === 'yes' && (!quantityInput.value || quantityInput.value < 1 || quantityInput.value > 10)) {
        showError('rsvp_errors');
        return;
    }

    hideErrors();
    showLoader();

    setTimeout(() => {
        hideLoader();
        showSuccessMessage(response);

        if (response === 'yes') {
            triggerCelebration();
        }
    }, 2000);
}

function showError(errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.style.display = 'block';
    }
}

function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showSuccessMessage(response) {
    const container = document.getElementById('rsvp_container');
    const successMessage = document.getElementById(`rsvp-answ-${response}`);

    if (container && successMessage) {
        container.style.display = 'none';
        successMessage.style.display = 'block';
    }
}

// === 🎊 FIXED INTERACTIVE EFFECTS ===
function initInteractiveEffects() {
    console.log('🎊 Setting up interactive effects...');

    // Ripple effect
    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
    });

    // Custom cursor
    initCustomCursor();

    // Mouse follower for cards
    initMouseFollower();
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 9999;
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
    `;

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #c9a96e, #e4d5b8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
}

function initMouseFollower() {
    const followElements = document.querySelectorAll('.invitation-card, .location-showcase, .rsvp-container');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        followElements.forEach((element, index) => {
            const intensity = 0.01 * (index + 1);
            const moveX = (mouseX - 0.5) * 20 * intensity;
            const moveY = (mouseY - 0.5) * 10 * intensity;

            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// === 🎊 CELEBRATION EFFECTS ===
function triggerCelebration() {
    console.log('🎊 Celebration triggered!');

    // Create confetti
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 100);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#c9a96e', '#e4d5b8', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: -10px;
        z-index: 9997;
        pointer-events: none;
        animation: confettiFall 3s ease-out forwards;
    `;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
}

// === 🎨 DYNAMIC STYLES ===
function addDynamicStyles() {
    console.log('🎨 Adding dynamic styles...');

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(calc(100vh + 100px)) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        /* Ensure content is visible */
        .App {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        /* Fix for any hidden content */
        .section {
            opacity: 1;
            visibility: visible;
        }
        
        /* Particle float animation */
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10%, 90% {
                opacity: 0.1;
            }
            100% {
                transform: translateY(-100px) translateX(50px) rotate(360deg);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(style);
}

// === 🛠️ UTILITY FUNCTIONS ===
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === 🔧 EMERGENCY FALLBACK ===
// If something goes wrong, make sure content is visible
setTimeout(() => {
    if (!STATE.isLoaded) {
        console.log('🔧 Emergency fallback triggered');
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }

        const app = document.querySelector('.App');
        if (app) {
            app.style.opacity = '1';
            app.style.visibility = 'visible';
        }

        STATE.isLoaded = true;
        document.body.classList.add('loaded');
    }
}, 5000);

// Make functions globally available for onclick handlers
window.submityes = submityes;
window.submitno = submitno;

console.log('🎭 Wedding JavaScript loaded successfully!');
