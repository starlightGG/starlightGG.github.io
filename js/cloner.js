// 1. Configuration
const words = [
    'about:blank#chrome://settings',
    'about:blank#chrome://camera-app',
    'about:blank#chrome://file-manager', 
    'about:blank#chrome://os-settings'
];

// 2. Helper: Get current URL safely
function getSafeUrl() {
    try {
        return window.top.location.href;
    } catch (e) {
        return window.location.href;
    }
}

// 3. Helper: Ensure Cloak Exists
function ensureCloakExists() {
    let cloakElement = document.getElementById('CloakingAlert');
    const savedState = localStorage.getItem('aboutBlankPopupState');
    
    // --- CHECK 1: Look for the hidden tag we injected ---
    const isCloakedViaMeta = document.querySelector('meta[name="cloaked"]');
    
    // --- CHECK 2: Backup URL Check (often blocked, but good to have) ---
    const currentUrl = getSafeUrl();
    const isCloakedViaUrl = words.some(word => currentUrl.includes(word)) || currentUrl.includes('about:blank');

    // If EITHER is true, we stop.
    const isAlreadyCloaked = isCloakedViaMeta || isCloakedViaUrl;

    if (!isAlreadyCloaked && savedState === 'true') {      
        if (!cloakElement) {
            const theme = localStorage.getItem('theme') || 'light';
            const isDark = theme === 'dark';
            const bgColor = isDark ? '#1e2023' : '#e0e5ec';
            const textColor = isDark ? '#6a7eff' : '#4c68ff';
            const spinnerTrack = isDark ? 'rgba(106, 126, 255, 0.2)' : '#7c90ff';
            const spinnerTop = isDark ? '#6a7eff' : '#4c68ff';

            cloakElement = document.createElement('div');
            cloakElement.id = 'CloakingAlert';
            cloakElement.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: ${bgColor}; z-index: 20000;
                display: flex; flex-direction: column; justify-content: center; align-items: center;
                color: ${textColor}; font-size: 1.2em; font-weight: bold;
                font-family: 'Inter', sans-serif;
            `;
            
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

// 4. Core Cloning Logic
function executeCloningLogic() {
    ensureCloakExists();

    let cloakElement = document.getElementById('CloakingAlert');
    const savedState = localStorage.getItem('aboutBlankPopupState');
    
    // --- CHECK 1: Meta Tag ---
    const isCloakedViaMeta = document.querySelector('meta[name="cloaked"]');
    
    // --- CHECK 2: URL Fallback ---
    const currentUrl = getSafeUrl();
    const isCloakedViaUrl = words.some(word => currentUrl.includes(word)) || currentUrl.includes('about:blank');
    
    const isAlreadyCloaked = isCloakedViaMeta || isCloakedViaUrl;

    if (!isAlreadyCloaked && savedState === 'true') {      
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const newWindow = window.open(randomWord, '_blank');

        if (newWindow) {
            const scriptElement = document.getElementById('cloning-script');
            if (scriptElement) scriptElement.remove();
            if (cloakElement) cloakElement.remove();
            
            let currentHtml = document.documentElement.outerHTML;

            // --- IMPORTANT: Inject the marker tag into the copied HTML ---
            if (currentHtml.includes('<head>')) {
                currentHtml = currentHtml.replace('<head>', '<head><meta name="cloaked" content="true">');
            } else {
                currentHtml = "<meta name='cloaked' content='true'>" + currentHtml;
            }

            newWindow.document.write(currentHtml);
            newWindow.document.close();

            const savedLink = localStorage.getItem('LINKTAB_KEY');
            window.location.replace(savedLink ? savedLink : 'https://google.com/');
        } else {
            if (cloakElement) {
                const textDiv = cloakElement.querySelector('div:last-child');
                const loader = cloakElement.querySelector('.loader-circle');
                if (textDiv) {
                    textDiv.innerHTML = "Popups Blocked!<br>Enable popups to cloak.<br>(Click to retry)";
                    textDiv.style.color = "#ff4444";
                }
                if (loader) loader.remove();
                cloakElement.style.cursor = "pointer";
                cloakElement.onclick = () => location.reload();
            }
        }
    } else {
        // If we found the meta tag, we are safe. Remove the loader.
        if (cloakElement) cloakElement.remove();
    }
}

// 5. Initialization
const runInitialization = () => {
    if (localStorage.getItem('aboutBlankPopupState') === null) {
        localStorage.setItem('aboutBlankPopupState', 'true');
    }

    // Immediate check to stop flicker
    if (document.querySelector('meta[name="cloaked"]')) {
        return;
    }

    ensureCloakExists();
    setTimeout(executeCloningLogic, 400);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitialization);
} else {
    runInitialization();
}
