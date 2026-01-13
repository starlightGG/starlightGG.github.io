// === CONFIGURATION CONSTANTS ===
const FADE_DURATION_MS = 300; 
const FADE_DURATION_CSS = `${FADE_DURATION_MS / 1000}s`;

// --- GLOBAL VARIABLES ---
let manualExitIntent = false;
let timeoutHandle = null;

// === HELPER: READ SETTINGS WITH SPECIFIC DEFAULTS ===
function getSetting(key, defaultValue) {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue;
    return val === 'true';
}

// === IMMEDIATE SETUP: CSS & OVERLAY INJECTION ===
(function initializeSetup() {
    // 1. Inject Overlay CSS
    const css = `
        #offscreen-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: white; z-index: 99999; display: none;
            flex-direction: column; justify-content: center; align-items: center;
            color: black; font-family: sans-serif; opacity: 1;
            transition: opacity 0s;
            cursor: none;
            pointer-events: auto; /* Blocks interaction when visible */
        }
        #offscreen-overlay.fade-out { 
            opacity: 0 !important; 
            transition: opacity ${FADE_DURATION_CSS} ease-in-out;
            pointer-events: none !important; /* ALLOWS CLICKS IMMEDIATELY */
        }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // 2. Create Overlay Element
    const injectOverlay = () => {
        if (!document.getElementById('offscreen-overlay')) {
            let overlay = document.createElement('div');
            overlay.id = 'offscreen-overlay';
            overlay.innerHTML = `<div></div>`; 
            document.body.appendChild(overlay);
            
            // Handle Fade Transition Cleanup
            overlay.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity' && overlay.classList.contains('fade-out')) {
                    overlay.style.display = 'none';
                    overlay.classList.remove('fade-out'); 
                }
            });
        }
    };

    if (document.body) {
        injectOverlay();
    } else {
        document.addEventListener('DOMContentLoaded', injectOverlay);
    }
})();

// === CORE FUNCTIONS ===

function toggleContentVisibility(showContent) {
    const overlay = document.getElementById('offscreen-overlay');
    if (!overlay) return;

    if (showContent) {
        // Trigger fade and immediately disable mouse blocking
        overlay.classList.add('fade-out');
        overlay.style.pointerEvents = 'none'; 
        window.focus(); 
    } else {
        // Show overlay and block mouse interaction
        overlay.classList.remove('fade-out'); 
        overlay.style.display = 'flex'; 
        overlay.style.pointerEvents = 'auto';
    }
}

function performRedirect() {
    clearTimeout(timeoutHandle);
    manualExitIntent = true; 
    const savedUrl = localStorage.getItem('LINKTAB_KEY');
    const target = savedUrl ? savedUrl : 'https://google.com/';
    window.location.replace(target);
}

// === EVENT LISTENERS ===

// 1. Tab Protection (Anti-Close)
window.addEventListener('beforeunload', function(e) {
    const isProtected = getSetting('tabProtectionState', true); 
    if (isProtected && !manualExitIntent) { 
        e.preventDefault(); 
        e.returnValue = ''; 
    }
});

// 2. Visibility Change
document.addEventListener('visibilitychange', () => {
    const redirectEnabled = getSetting('redirectToggleState', false); 
    const overlayEnabled = getSetting('overlayToggleState', true);
    const REDIRECT_DELAY = 65;

    if (document.visibilityState === 'hidden') {
        if (redirectEnabled) {
            timeoutHandle = setTimeout(() => { 
                performRedirect(); 
            }, REDIRECT_DELAY);
        } else if (overlayEnabled) {
            toggleContentVisibility(false); 
        }
    } else {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
    }
});

// 3. Clear Redirect Timer on Focus
window.addEventListener('focus', function () {
    if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
    }
});

// 4. Keydown Listeners (Escape Overlay / Manual Redirect)
document.addEventListener('keydown', (event) => {
    const overlay = document.getElementById('offscreen-overlay');
    
    // Check if overlay is active/visible
    if (overlay && getComputedStyle(overlay).display === 'flex') {
        const key = event.key.toUpperCase();
        
        if (key === 'E') {
            toggleContentVisibility(true); 
            event.preventDefault();
        }
        if (event.key === ' ') {
            performRedirect(); 
            event.preventDefault();
        }
    }
});

// 5. Initialize Defaults
(function syncDefaults() {
    const defaults = {
        'tabProtectionState': 'true',
        'overlayToggleState': 'true',
        'aboutBlankPopupState': 'true',
        'redirectToggleState': 'false'
    };
    for (const [key, value] of Object.entries(defaults)) {
        if (localStorage.getItem(key) === null) localStorage.setItem(key, value);
    }
})();
