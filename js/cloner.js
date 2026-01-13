// js/cloner.js

// 1. Tip Advisory (Defined but needs to be called if you want it to run)
function alertthing() {
    const localStorageKey4 = 'tipadvisoryShown_v2_2_0'; 
    if (localStorage.getItem(localStorageKey4) === null) {
        alert("If studentkeeper is blocking this webpage, turn off your internet, then paste back the link. It should say studentkeeper blocked it. If so, turn on internet and enter link again to bypass!");
        localStorage.setItem(localStorageKey4, 'true');
    }
}

// 2. Core Cloning Logic
function executeCloningLogic() {
    const cloakElement = document.getElementById('CloakingAlert');
    const savedState = localStorage.getItem('aboutBlankPopupState');

    // Only attempt cloning if enabled and not already in about:blank
    if (window.location.href !== 'about:blank' && savedState === 'true') {
        
        // Attempt to open new window
        const newWindow = window.open('about:blank', '_blank');

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
            
            // Instead of calling showModal() which doesn't exist here,
            // we update the CloakingAlert text to warn the user.
            if (cloakElement) {
                const textDiv = cloakElement.querySelector('div:last-child');
                if (textDiv) {
                    textDiv.innerText = "Popups Blocked! Please Enable Popups in Order to Cloak Window. \n(Click to dismiss)";
                    textDiv.style.color = "#ff4444"; // Red color for error
                }
                
                // Allow user to click to dismiss if it failed
                cloakElement.style.cursor = "pointer";
                cloakElement.title = "Click to close";
                cloakElement.onclick = function() {
                    this.remove();
                };
            }
        }
    } else {
        // --- NO CLONING NEEDED ---
        // Just remove the cloak immediately
        if (cloakElement) {
            cloakElement.remove();
        }
    }
}

// 3. Initialization
window.addEventListener('load', () => {
    // Ensure default state is set
    if (localStorage.getItem('aboutBlankPopupState') === null) {
        localStorage.setItem('aboutBlankPopupState', 'true');
    }

    const delayInMilliseconds = 10; 
    console.log(`Cloning logic initiated...`);

    setTimeout(executeCloningLogic, delayInMilliseconds);
});
