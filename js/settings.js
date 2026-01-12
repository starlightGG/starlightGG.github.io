// === CONFIGURATION CONSTANTS ===
const FADE_DURATION_MS = 300; 
const FADE_DURATION_CSS = `${FADE_DURATION_MS / 1000}s`;

// --- GLOBAL VARIABLES ---
let manualExitIntent = false;
let timeoutHandle = null;

// === HELPER: READ SETTINGS WITH SPECIFIC DEFAULTS ===
// This ensures your requested defaults apply if the user hasn't toggled anything yet.
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
            transition: opacity ${FADE_DURATION_CSS} ease-in-out;
            cursor: none;
        }
        #offscreen-overlay.fade-out { opacity: 0 !important; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // 2. Create Overlay Element if missing
    if (!document.getElementById('offscreen-overlay')) {
        let overlay = document.createElement('div');
        overlay.id = 'offscreen-overlay';
        // Add a hidden text or instruction if you want, currently empty for stealth
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
    // Default fallback if no custom URL is set
    const target = savedUrl ? savedUrl : 'https://google.com/';
    window.location.replace(target);
}

// === EVENT LISTENERS (The "Engine") ===

// 1. Tab Protection (Anti-Close)
// Default: ON (true)
window.addEventListener('beforeunload', function(e) {
    const isProtected = getSetting('tabProtectionState', true); // Default true
    
    if (isProtected && !manualExitIntent) { 
        e.preventDefault(); 
        e.returnValue = ''; 
    }
});

// 2. Visibility Change (The Main Cloaking Logic)
document.addEventListener('visibilitychange', () => {
    // Defaults: Redirect OFF, Overlay ON
    const redirectEnabled = getSetting('redirectToggleState', false); 
    const overlayEnabled = getSetting('overlayToggleState', true);
    const REDIRECT_DELAY = 65;

    if (document.visibilityState === 'hidden') {
        if (redirectEnabled) {
            // Priority 1: Redirect (If enabled, ignore overlay)
            timeoutHandle = setTimeout(() => { 
                // We just set the intent here, actual redirect on user return isn't usually possible
                // fully headless, but we prepare the state.
                // However, standard "Redirect" cloaks usually redirect immediately 
                // or when you try to switch back.
                
                // For this specific implementation style:
                performRedirect(); 
            }, REDIRECT_DELAY);
        } else if (overlayEnabled) {
            // Priority 2: Overlay (Only if redirect is OFF)
            toggleContentVisibility(false); 
        }
    } else {
        // Tab is visible/focused again
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
    }
});

// 3. Clear Redirect Timer on Focus (Safety net)
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
        // Press 'E' to Exit overlay
        if (event.key.toUpperCase() === 'E') {
            toggleContentVisibility(true); 
            event.preventDefault();
        }
        // Press 'Space' to Panic Redirect
        if (event.key === ' ') {
            performRedirect(); 
            event.preventDefault();
        }
    }
});

// 5. Initialize Defaults in LocalStorage if missing
// This ensures the React UI picks up the correct state on next reload
(function syncDefaults() {
    if (localStorage.getItem('tabProtectionState') === null) localStorage.setItem('tabProtectionState', 'true');
    if (localStorage.getItem('overlayToggleState') === null) localStorage.setItem('overlayToggleState', 'true');
    if (localStorage.getItem('aboutBlankPopupState') === null) localStorage.setItem('aboutBlankPopupState', 'true');
    if (localStorage.getItem('redirectToggleState') === null) localStorage.setItem('redirectToggleState', 'false');
})();
