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
    if (window.top.location.href !== 'about:blank' && savedState === 'true') {
        
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
            
            if (cloakElement) {
                const textDiv = cloakElement.querySelector('div:last-child');
                const Loader = cloakElement.querySelector('div:first-child');
                
                // Remove the loader since it failed
                if (Loader) Loader.remove();

                if (textDiv) {
                    // Update text to tell them clicking will try again
                    textDiv.innerText = "Popups Blocked! Click here to open the window manually.";
                    textDiv.style.color = "#ff4444"; 
                }
                
                cloakElement.style.cursor = "pointer";
                cloakElement.title = "Click to open window and dismiss";

                // --- NEW ONCLICK LOGIC ---
                cloakElement.onclick = function(e) {
// Prevent default browser behavior (stops page jumps/reloads)
                    if (e) e.preventDefault(); 
                    // Stop the click from bubbling up to parents (optional but good for modals)
                    if (e) e.stopPropagation();
                    // 1. Try to open the popup AGAIN. 
    const cloakElement2 = document.getElementById('CloakingAlert');
    const savedState2 = localStorage.getItem('aboutBlankPopupState');

        
        // Attempt to open new window
        const newWindow2 = window.open('about:blank', '_blank');

        if (newWindow2) {
            // --- SUCCESS ---
            
            // 1. Remove this script so it doesn't loop in the new tab
            const scriptElement2 = document.getElementById('cloning-script');
            if (scriptElement2) scriptElement2.remove();
            
            // 2. Remove the cloak from the DOM to be copied (so the new tab doesn't start cloaked)
            if (cloakElement) cloakElement2.remove();
            
            // 3. Clone HTML
            const currentHtml2 = document.documentElement.outerHTML;

            // 4. Write to new window
            newWindow2.document.write(currentHtml2);
            newWindow2.document.close();

            // 5. Redirect original tab
            const savedLink2 = localStorage.getItem('LINKTAB_KEY');
            window.location.replace(savedLink2 ? savedLink2 : 'https://google.com/');
            

                    // 2. Run the fade out animation (happens regardless of success/fail)
                    this.style.transition = "opacity 0.5s ease";
                    this.style.opacity = "0";

                    // 3. Destroy the element after animation
                    setTimeout(() => {
                        this.remove();
                    }, 500);
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
const runInitialization = () => {
    // Ensure default state is set
    if (localStorage.getItem('aboutBlankPopupState') === null) {
        localStorage.setItem('aboutBlankPopupState', 'true');
    }

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
