// js/cloner.js

// 1. Tip Advisory (Defined but needs to be called if you want it to run)
function alertthing() {
    const localStorageKey4 = 'tipadvisoryShown_v2_2_0'; 
    if (localStorage.getItem(localStorageKey4) === null) {
        alert("If studentkeeper is blocking this webpage, turn off your internet, then paste back the link. It should say studentkeeper blocked it. If so, turn on internet and enter link again to bypass!");
        localStorage.setItem(localStorageKey4, 'true');
    }
}

// Helper: Ensure Cloak Exists (Moved logic here for reuse and early execution)
function ensureCloakExists() {
    let cloakElement = document.getElementById('CloakingAlert');
    const savedState = localStorage.getItem('aboutBlankPopupState');

    // Only create if enabled and not already in about:blank
    if (window.location.href !== 'about:blank' && savedState === 'true') {
        if (!cloakElement) {
            console.log("Cloak element missing, recreating...");
            
            // --- Theme Logic ---
            const theme = localStorage.getItem('theme') || 'light';
            const isDark = theme === 'dark';
            
            // Define colors based on theme to match index.html variables
            const bgColor = isDark ? '#1e2023' : '#e0e5ec';
            const textColor = isDark ? '#6a7eff' : '#4c68ff'; // Primary Color
            const spinnerTrack = isDark ? 'rgba(106, 126, 255, 0.2)' : '#7c90ff'; // Muted Primary
            const spinnerTop = isDark ? '#6a7eff' : '#4c68ff'; // Primary

            cloakElement = document.createElement('div');
            cloakElement.id = 'CloakingAlert';
            
            // Apply original CSS styles dynamically using theme colors
            cloakElement.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: ${bgColor}; z-index: 20000;
                display: flex; flex-direction: column; justify-content: center; align-items: center;
                color: ${textColor}; font-size: 1.2em; font-weight: bold;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            `;
            
            // Recreate Inner HTML (Loader + Text)
            cloakElement.innerHTML = `
                <div class="loader-circle" style="
                    width: 50px; height: 50px; 
                    border: 5px solid ${spinnerTrack}; 
                    border-top-color: ${spinnerTop}; 
                    border-radius: 50%; 
                    margin-bottom: 20px;
                    animation: spin 1s linear infinite;
                "></div>
                <div>Cloaking Window...</div>
            `;
            
            // Inject Keyframes for the spinner animation if needed
            if (!document.getElementById('dynamic-spin-style')) {
                const styleSheet = document.createElement("style");
                styleSheet.id = 'dynamic-spin-style';
                styleSheet.innerText = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
                document.head.appendChild(styleSheet);
            }

            if (document.body) {
                document.body.appendChild(cloakElement);
            }
        }
    }
}

// 2. Core Cloning Logic
function executeCloningLogic() {
    // Ensure the element exists before running logic (redundancy for retry clicks)
    ensureCloakExists();

    let cloakElement = document.getElementById('CloakingAlert');
    const savedState = localStorage.getItem('aboutBlankPopupState');

    // Only attempt cloning if enabled and not already in about:blank
    if (window.location.href !== 'about:blank' && savedState === 'true') {
        
const words = [
    'chrome://settings','chrome://camera-app','chrome://file-manager', 'chrome://os-settings'
];
        const randomWord = words[Math.floor(Math.random() * words.length)];

const newWindow = window.open(`about:blank#${randomWord}`, '_blank');
        if (newWindow) {
            // --- SUCCESS ---
            
            // 1. Remove this script so it doesn't loop in the new tab
            const scriptElement = document.getElementById('cloning-script');
            if (scriptElement) scriptElement.remove();
            
            // 2. Remove the cloak from the DOM to be copied (so the new tab doesn't start cloaked)
            if (cloakElement) cloakElement.remove();
            
            // 3. Clone HTML
            const currentHtml = document.documentElement.outerHTML;

            // 4. Write to new window
            newWindow.document.write(currentHtml);
            newWindow.document.close();

            // 5. Redirect original tab
            const savedLink = localStorage.getItem('LINKTAB_KEY');
            window.location.replace(savedLink ? savedLink : 'https://google.com/');
            
        } else {
            // --- FAILURE (Popup Blocked) ---
            
            // Update the CloakingAlert text to warn the user.
            if (cloakElement) {
                // Ensure it is visible
                cloakElement.style.display = 'flex';

                const textDiv = cloakElement.querySelector('div:last-child');
                const loaderdiv = cloakElement.querySelector('div:first-child') || cloakElement.querySelector('.loader-circle');
                
                if (textDiv) {
                    textDiv.innerText = "Popups Blocked! Please Enable Popups in Order to Cloak Window. \n(Click to dismiss/retry)";
                    textDiv.style.color = "#ff4444"; // Red color for error
                    textDiv.style.textAlign = "center";
                }
                
                if (loaderdiv) {
                    loaderdiv.remove();
                }
                
                // Allow user to click to dismiss if it failed
                cloakElement.style.cursor = "pointer";
                cloakElement.title = "Click to close";
                cloakElement.onclick = function(e) {
                    executeCloningLogic();
                    // Fade out effect
                    this.style.transition = "opacity 0.5s ease";
                    this.style.opacity = "0";
                    setTimeout(() => { this.remove(); }, 500);
                };
            }
        }
    } else {
        // --- NO CLONING NEEDED ---
        // Just remove the cloak immediately if it exists
        if (cloakElement) {
            cloakElement.remove();
        }
    }
}

// 3. Initialization
const runInitialization = () => {
    // Ensure default state is set
    if (localStorage.getItem('aboutBlankPopupState') === null) {
        localStorage.setItem('aboutBlankPopupState', 'true');
    }

    // --- Create Cloak Immediately (Before Delay) ---
    ensureCloakExists();

    const delayInMilliseconds = 400; 
    console.log(`Cloning logic initiated...`);

    setTimeout(executeCloningLogic, delayInMilliseconds);
};

// Check if the HTML is already parsed
if (document.readyState === 'loading') {
    // If still loading, wait for the 'DOMContentLoaded' event
    document.addEventListener('DOMContentLoaded', runInitialization);
} else {
    // If the HTML is already parsed, run immediately
    runInitialization();
}
