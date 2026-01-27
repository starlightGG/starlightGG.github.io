// === CONFIGURATION CONSTANTS ===
const FADE_DURATION_MS = 300; 
const FADE_DURATION_CSS = `${FADE_DURATION_MS / 1000}s`;
const LONG_PRESS_DURATION_MS = 800; 

// --- GLOBAL VARIABLES ---
window.manualExitIntent = false; 
let timeoutHandle = null;

// === HELPER: READ SETTINGS ===
function getSetting(key, defaultValue) {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue;
    return val === 'true';
}

// === HELPER: DETECT MOBILE ===
function isMobile() {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    return isCoarse && hasTouch;
}

// === CORE APP LOGIC (Wrapped in function) ===
function startApp() {
    console.log("cloning-script detected. Starting App...");

    // 1. Inject Overlay CSS & Elements
    (function initializeSetup() {
        const css = `
            #offscreen-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background-color: white; z-index: 99999; display: none;
                flex-direction: column; justify-content: center; align-items: center;
                color: black; font-family: sans-serif; opacity: 1;
                transition: opacity 0s;
                cursor: default; 
                pointer-events: auto;
                touch-action: none; 
                -webkit-user-select: none; 
                user-select: none;
            }
            #offscreen-overlay.fade-out { 
                opacity: 0 !important; 
                transition: opacity ${FADE_DURATION_CSS} ease-in-out;
                pointer-events: none !important; 
            }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        const injectOverlay = () => {
            if (!document.getElementById('offscreen-overlay')) {
                let overlay = document.createElement('div');
                overlay.id = 'offscreen-overlay';
                overlay.innerHTML = `<div></div>`; 
                document.body.appendChild(overlay);
                
                overlay.addEventListener('transitionend', (event) => {
                    if (event.propertyName === 'opacity' && overlay.classList.contains('fade-out')) {
                        overlay.style.display = 'none';
                        overlay.classList.remove('fade-out'); 
                    }
                });

                if (isMobile()) {
                    let pressTimer = null;
                    let longPressTriggered = false;

                    overlay.addEventListener('touchstart', (e) => {
                        longPressTriggered = false;
                        pressTimer = setTimeout(() => {
                            longPressTriggered = true;
                            toggleContentVisibility(true); 
                            if (navigator.vibrate) navigator.vibrate(50); 
                        }, LONG_PRESS_DURATION_MS);
                    }, { passive: false });

                    overlay.addEventListener('touchend', (e) => {
                        if (pressTimer) clearTimeout(pressTimer);
                        if (!longPressTriggered) {
                            e.preventDefault(); 
                            performRedirect();
                        }
                    }, { passive: false });

                    overlay.addEventListener('touchmove', () => {
                        if (pressTimer) {
                            clearTimeout(pressTimer);
                            pressTimer = null;
                            longPressTriggered = true; 
                        }
                    }, { passive: false });

                } else {
                    overlay.addEventListener('click', (e) => {
                       e.preventDefault();
                       e.stopPropagation();
                    });
                }
            }
        };

        if (document.body) {
            injectOverlay();
        } else {
            document.addEventListener('DOMContentLoaded', injectOverlay);
        }
    })();

    // 2. Initialize Default Settings
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

    // 3. Attach Event Listeners
    window.addEventListener('beforeunload', function(e) {
        const isProtected = getSetting('tabProtectionState', true); 
        if (isProtected && !window.manualExitIntent) { 
            e.preventDefault(); 
            e.returnValue = ''; 
        }
    });

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

    window.addEventListener('focus', function () {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
    });

    document.addEventListener('keydown', (event) => {
        const overlay = document.getElementById('offscreen-overlay');
        if (overlay && getComputedStyle(overlay).display === 'flex') {
            const key = event.key.toUpperCase();
            if (key === 'E') {
                toggleContentVisibility(true); 
                event.preventDefault();
            } else {
                performRedirect(); 
                event.preventDefault();
            }
        }
    });
}

// === CORE FUNCTIONS (Hoisted) ===

function toggleContentVisibility(showContent) {
    const overlay = document.getElementById('offscreen-overlay');
    if (!overlay) return;

    if (showContent) {
        overlay.classList.add('fade-out');
        overlay.style.pointerEvents = 'none'; 
        window.focus(); 
    } else {
        overlay.classList.remove('fade-out'); 
        overlay.style.display = 'flex'; 
        overlay.style.pointerEvents = 'auto';
    }
}

function performRedirect() {
    clearTimeout(timeoutHandle);
    window.manualExitIntent = true; 
    const savedUrl = localStorage.getItem('LINKTAB_KEY');
    const target = savedUrl ? savedUrl : 'https://google.com/';
    window.location.replace(target);
}

// === INIT OBSERVER: WAIT FOR cloning-script ===

(function waitForCloningScript() {
    const TARGET_ID = 'cloning-script';

    // 1. Check if it already exists
    if (!document.getElementById(TARGET_ID)) {
        startApp();
        return;
    }

    // 2. If not, set up a MutationObserver
    const observer = new MutationObserver((mutations, obs) => {
        const element = document.getElementById(TARGET_ID);
        if (!element) {
            startApp();
            obs.disconnect(); // Stop watching once found
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
