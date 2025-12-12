        // === JAVASCRIPT LOGIC ===
        
        // Key for localStorage
        const STORAGE_KEY = 'tabProtectionState';
        
        // State variable to track whether tab protection is active
        let tabProtectionEnabled = false;

        // DOM elements
        const toggleSwitch = document.getElementById('toggle-switch');
        const switchIcon = document.getElementById('switch-icon');
        const statusText = document.getElementById('protection-status');
        
        /**
         * Updates the visual appearance of the toggle switch and status text.
         */
        function updateUI() {
            if (tabProtectionEnabled) {
                // Enable state (ON)
                      const closepreventionwarning = 'closepreventionwarning';        

if (localStorage.getItem(closepreventionwarning) === null) {
  showModal('NOTE: If redirect is on, it will still redirect, it will not prevent');
        localStorage.setItem(closepreventionwarning, 'true');

}
                toggleSwitch.classList.add('switch-on');

                // Icon: Checkmark
                switchIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
                switchIcon.classList.add('text-white');
                switchIcon.classList.remove('text-[#bdc3c7]');

                // Status Text
                statusText.textContent = 'ACTIVE';
                statusText.classList.add('text-[#3498db]'); /* Use the soft blue active color */
                statusText.classList.remove('text-white/80');

            } else {
                // Disable state (OFF)
                toggleSwitch.classList.remove('switch-on');
                
                // Icon: Block/Cancel
                switchIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />`;
                switchIcon.classList.remove('text-white');
                switchIcon.classList.add('text-[#bdc3c7]');

                // Status Text
                statusText.textContent = 'DISABLED';
                statusText.classList.remove('text-[#3498db]');
                statusText.classList.add('text-white/80');
            }
        }

        /**
         * Main function to toggle the protection state and save it to localStorage.
         */
        window.toggleProtection = function() {
            tabProtectionEnabled = !tabProtectionEnabled;
            updateUI();
            
            // 1. Save the new state to localStorage (stores 'true' or 'false' as strings)
            localStorage.setItem(STORAGE_KEY, tabProtectionEnabled);

            console.log(`Tab Protection: ${tabProtectionEnabled ? 'Enabled' : 'Disabled'} (State Saved)`);
        }

        /**
         * Event listener to intercept tab/window closing attempts.
         */
        window.addEventListener('beforeunload', function(e) {
            if (tabProtectionEnabled) {
                // Return a generic string to trigger the default browser warning.
                e.preventDefault(); 
            }
        });

        // === Initialization Logic ===
        
        // 2. Load state from localStorage on page load
        const savedState = localStorage.getItem(STORAGE_KEY);
        // Check if a state was saved, and if it's the string 'true'
        tabProtectionEnabled = savedState === 'true'; 

        // 3. Initialize the UI based on the loaded state
        updateUI();

