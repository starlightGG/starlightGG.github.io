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
    // 1. Inject Overlay CSS (Safe to do in HEAD)
    const css = `
        #offscreen-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: white; z-index: 99999; display: none;
            flex-direction: column; justify-content: center; align-items: center;
            color: black; font-family: sans-serif; opacity: 1;
            transition: opacity ${FADE_DURATION_CSS} ease-in-out;
            cursor: none;
        }
        #offscreen-overlay.fade-out { opacity: 0 !important; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // 2. Create Overlay Element (Needs BODY)
    const injectOverlay = () => {
        if (!document.getElementById('offscreen-overlay')) {
            let overlay = document.createElement('div');
            overlay.id = 'offscreen-overlay';
            overlay.innerHTML = `<div></div>`; 
            document.body.appendChild(overlay);
            
            // Handle Fade Transition
            overlay.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity' && overlay.classList.contains('fade-out')) {
                    overlay.style.display = 'none';
                    overlay.classList.remove('fade-out'); 
                }
            });
        }
    };

    // FIX: Check if body exists. If script is in <head>, wait for DOMContentLoaded.
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
        overlay.classList.add('fade-out');
    } else {
        overlay.classList.remove('fade-out'); 
        overlay.style.display = 'flex'; 
    }
}

function performRedirect() {
    clearTimeout(timeoutHandle);
    manualExitIntent = true; 
    const savedUrl = localStorage.getItem('LINKTAB_KEY');
    const target = savedUrl ? savedUrl : 'https://google.com/';
    window.location.replace(target);
}

// === EVENT LISTENERS (The "Engine") ===

// 1. Tab Protection (Anti-Close)
window.addEventListener('beforeunload', function(e) {
    const isProtected = getSetting('tabProtectionState', true); 
    
    if (isProtected && !manualExitIntent) { 
        e.preventDefault(); 
        e.returnValue = ''; 
    }
});

// 2. Visibility Change (The Main Cloaking Logic)
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
    
    // Only listen if overlay is actually blocking screen
    if (overlay && getComputedStyle(overlay).display === 'flex') {
        if (event.key.toUpperCase() === 'E') {
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
    if (localStorage.getItem('tabProtectionState') === null) localStorage.setItem('tabProtectionState', 'true');
    if (localStorage.getItem('overlayToggleState') === null) localStorage.setItem('overlayToggleState', 'true');
    if (localStorage.getItem('aboutBlankPopupState') === null) localStorage.setItem('aboutBlankPopupState', 'true');
    if (localStorage.getItem('redirectToggleState') === null) localStorage.setItem('redirectToggleState', 'false');
})();
