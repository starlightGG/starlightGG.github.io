// Set this to true to enable the maintenance overlay
const fixing = false;

const logoUrl = 'media/favicon.png'; 

window.addEventListener('load', () => {
    if (fixing) {
        // 1. Clear the existing body content
        document.body.innerHTML = '';

        // 2. Inject CSS for Animations and Soft UI
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
            }
            body {
                background-color: #e0e5ec;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: 'Segoe UI', sans-serif;
                overflow: hidden;
            }
            .soft-container {
                padding: 60px 80px;
                border-radius: 30px;
                background-color: #e0e5ec;
                box-shadow: 20px 20px 60px #bec3c9, -20px -20px 60px #ffffff;
                text-align: center;
                animation: fadeIn 0.8s ease-out forwards;
                max-width: 400px;
            }
            .logo-wrapper {
                width: 80px;
                height: 80px;
                margin: 0 auto 20px auto;
                border-radius: 50%;
                background: #e0e5ec;
                box-shadow: inset 5px 5px 10px #bec3c9, inset -5px -5px 10px #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: float 3s ease-in-out infinite;
            }
            .logo-img {
                width: 50px;
                height: 50px;
                object-fit: contain;
                opacity: 0.8;
            }
            h1 {
                color: #444;
                font-size: 2rem;
                margin: 0 0 10px 0;
                text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
            }
            p {
                color: #777;
                font-size: 1.1rem;
                margin: 0;
            }
        `;
        document.head.appendChild(style);

        // 3. Create Elements
        const container = document.createElement('div');
        container.className = 'soft-container';

        // Logo Wrapper (for the inset shadow effect)
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'logo-wrapper';
        
        // The Logo Image
        const logo = document.createElement('img');
        logo.src = logoUrl;
        logo.className = 'logo-img';
        
        // Text Elements
        const text = document.createElement('h1');
        text.innerText = 'System Update';

        const subText = document.createElement('p');
        subText.innerText = 'We are improving your experience. Back shortly.';

        // 4. Assemble
        logoWrapper.appendChild(logo);
        container.appendChild(logoWrapper);
        container.appendChild(text);
        container.appendChild(subText);
        document.body.appendChild(container);
    }
});
