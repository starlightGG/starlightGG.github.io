    // --- Tab Cloaking Logic ---
    const TITLE_KEY = 'customPageTitle';
    const FAVICON_KEY = 'customFaviconURL';

    function applyCustomCloak(customTitle, faviconURL) {
        if (customTitle) {
            document.title = customTitle;
            localStorage.setItem(TITLE_KEY, customTitle);
        }
        if (faviconURL) {
            localStorage.setItem(FAVICON_KEY, faviconURL);
            let faviconEl = document.getElementById("dynamic-favicon");
            if (!faviconEl) {
                faviconEl = document.createElement("link");
                faviconEl.rel = "icon";
                faviconEl.id = "dynamic-favicon";
                document.head.appendChild(faviconEl);
            }
            faviconEl.href = faviconURL;
        }
    }

    function applyStoredCloak() {
        const storedTitle = localStorage.getItem(TITLE_KEY);
        const storedFavicon = localStorage.getItem(FAVICON_KEY);
        if (storedTitle || storedFavicon) {
            applyCustomCloak(storedTitle, storedFavicon);
        } 
    }

    window.addEventListener('load', () => {
                setTimeout(applyStoredCloak, 800);

    });
