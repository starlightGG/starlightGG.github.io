
// Suprise, i made this in react, but only using index.html
        const e = React.createElement;
        const { useState, useEffect, useRef } = React;

// --- NEW PRESETS DATA (Custom Names vs Stealth Titles) ---
// replace with ones u want
const PRESETS = [
    { name: "Activate Learning", title: "Activate Learning Digital Platform - Home", favicon: "https://activatelearning.com/wp-content/uploads/2023/05/favicon.png", link: "https://activatelearning.com" },
    { name: "Calculator", title: "Calculator", favicon: "https://www.calculator.net/favicon.ico", link: "https://www.calculator.net" },
    { name: "Clever", title: "Clever | Portal", favicon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi3ptQJ9ibYtsUiQ1yNX5abVZvtmG9fwqjNpUqzO6N8qbrYgM:https://resources.finalsite.net/images/f_auto,q_auto/v1689877141/mooreschoolscom/emadd6nvplrnh1vsswjf/Clever-Logo.jpg&s", link: "https://clever.com" },
    { name: "Gallopade", title: "Gallopade: Educational Products, Social Studies Curriculum, Reading, Common Core", favicon: "https://gallopade.com/favicon.ico", link: "https://gallopade.com" },
    { name: "Google (Default Setting)", title: "Google", favicon: "https://google.com/favicon.ico", link: "https://google.com" },
    { name: "Google Classroom", title: "Home - Classroom", favicon: "https://ssl.gstatic.com/classroom/favicon.ico", link: "https://classroom.google.com/h" },
    { name: "Google Docs", title: "Google Docs", favicon: "https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_document_x16.png", link: "https://docs.google.com" },
    { name: "Google Drive", title: "My Drive - Google Drive", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB+klEQVR4AWJwL/ChKx68ForXW7SJN1iswYb5GyxaqGqhycrgR+rTAKzUA2hoURwG8Cn3bL/wbNuIz7Y5p9kOY57NMBvZs23bPtt/dW7b4VR94ep3v6OHaJvFJSoaZldQROB+hDJValcFPBj20vB82AsEAYCVyTT1uUykaWitGAQIB1oy22WoKOhKQMCCMKa0dLypYN9dTs7HcMvg5YCAHQKAzLmwpwpYGbORBHH2LAfMY4G4JdmOaJkvBQnsMQ+DHAl5MTSeqjaMASaarvZ00SB8UATCyp1OVzMWgfBDiwLhY7J2+Nn5LScyVCkUfkoI3nLqWivAcB7j52HYSISMEJz9WIwEyyE/AAtEBJLbRLoNiBxigIcVgDO08AwFwnkpwfx4Sx1aSFrmLwAvRDz+BBtaFB6Gg9txA9sEg6d9NLNO+/5HvFz0sXXardmy567d4CFW4F5V1BuXiUgVNBa5jpdEBdz2vTRy2/cyxMtduyFpTjtMotobD1D75Yvs3LjopYDwh9v/5CNWrtsOSjGc/8bFqP/mHtRx7zyVodP7tisgZMeffB8SO6xfLYeIlllvTSkM2jH34UraQeB5VkvexoeWWsttR7bEaPu9Cz95IEZbAVw8wm461+7uuXrp4Q0L6LxxS/NKQQ+t2HpYKEKQPMhXkpkNqoYwXTEA+kphQitc/vYAAAAASUVORK5CYII=", link: "https://drive.google.com" },
    { name: "Google Search", title: "Google Classroom - Google Search", favicon: "https://google.com/favicon.ico", link: "https://www.google.com/search?q=google+classroom" },
    { name: "Google Slides", title: "Google Slides", favicon: "favicons/faviconV2.png", link: "https://slides.google.com" },
    { name: "iCivics", title: "Home | iCivics", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAV1BMVEVHcEz/ZAD/ZwD/WwD/WwD/YAD/ZAD/WwD/WwD/WwD/WwD/WwD/WwD/WwD/ZgD/WwD/WwD/WwD/aAD/gAD/kQD/kAD/kQD/kQD/kQD/ZQD/kQD/jQD/bwAvM226AAAAHHRSTlMACCEwRhgPhrjT4e6tdjyd+/9a///yfrli/53evbsBzAAAAOVJREFUeAGtkgUSwlAMRL+71u3+18QSHDrWheqbbpQcIcq4EIJL+o2U0MY672yI6ZPx7EoFFavVG0sWCeDAXpmr7zLy6Wnrp7JCpjK6OZMNhvYNQgGmPidKVMq+XhXAmGpgmKPMpV4LAsgM5HDPkMX4bAWkU+KzVZ91FMjgQwDbrv8FwfYCh5+2zFxhNz4SGqbEFCVYSqlzd/kUS1m6fjU5ymcT2gtdbk1Y+q7bsAnYvvlCu3VcxvVybbF9mBJSUAuNfyt1A9zOMLLPYc/bts1vw95fExC9LZi7zoP/Xs0kEpfkAJ0B2VoUsYiyizsAAAAASUVORK5CYII=", link: "https://www.icivics.org" },
    { name: "IL Classroom", title: "Classes | IL Classroom", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAV1BMVEVHcEwAAHwAAH0AAHwAAHwAAHwAAHwAAH0AAHwAAHwAAHwAAHwAAHoaGoMoKIYAAHZGR5fv8vv///+oqs6Mjr78///3+f5ucKzU1uk4OI/j5vPCxN+fosqdJ3hnAAAADHRSTlMAN4bC6//oX+wj1USkbhSpAAABF0lEQVR4AYTSBwKEIAwEQCxrjQY5g/X/7zwi1+vaHQsEzC1JmuVAkaWJeU1Z4JaqfKK6wVOa+m4t3tI+22etASIg7u+JX25AXR+A++5RG7USZAd3Yh7FT4x7tM0VeHYiSzeIW0F3LELfAd6c810/iBxIIdAkJgWo39aJr8i0LB0rpyZDUGamC/I0e1m3PmhmimAYT5Yj8uiciLiNgdwA4N25FRGtiouIA2cRbw+kXWGcV0uK+RPq6QomqBUm+4ikmJn0/bPzvh6fTbUIdEcsXlsUG5QYU2iFxB/lm+mhK9VT4f0wMdhug1tPHaG8DRlDh4wBULjS8jWfBzu2tf47TVR/2M+pqSmr85CSACxRo2QHNmA0IWcHAAp4HJXYNfpWAAAAAElFTkSuQmCC", link: "https://ilclassroom.com" },
    { name: "Khan Academy", title: "Khan Academy", favicon: "https://www.khanacademy.org/favicon.ico", link: "https://www.khanacademy.org" },
    { name: "Outlook", title: "Outlook Mail", favicon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3ODc3Nzc3Nzc3Nzc3Nzc3Nzc3NzctNzc3NzcvNy0tNzc1NzU1NzcyNDU1MDc2OC04Nf/AABEIABwAHAMBEQACEQEDEQH/xAAbAAABBAMAAAAAAAAAAAAAAAAHAgMFBgAECP/EACsQAAIBAwEGBAcAAAAAAAAAAAECAwAEEQUSFCExQVETMmFxBgdTgZLR8P/EABoBAAIDAQEAAAAAAAAAAAAAAAQFAQIGAAP/xAAlEQACAgEDAwQDAAAAAAAAAAABAgADEQQhMQUSURMiMkFxkfD/2gAMAwEAAhEDEQA/ADe7rGhd2CqoyWY4AqQCTgSGYKMniQd38SwRuRboJI180jNsj7fujq9CxHuODAV6hU7YTceZt6Rrljqy4t5QJsZMLnDe47j1rx1GlsoPuG3mGI4cbSToaXlC+YV9Ib62tLOSWaWNC72kasdvPI8OoxTvplYFbWMMA/cRdVPq2LSM+cQc6hrc7sN4bgPLEnADHf196cBUXiB06cj4xFjFqOq3MMsMzWwibMcykr4Z7rjiT/cKlioU9wzGFWpWo9ud50Fbkm3iLMWbYGWPU4rGt8jHA4g8+Nd6s9cv2ltNQFnfW8SJd2IBeNkOSOJHPHEZHSnOiIelQCMqTseN4s1TLVYWfYMBv+JXYrWHXL3Ur7U9P8Hx7gPCr+dQBjJ9+Z6E0aimpVUHOIm1usBszU3P9+4uBTDfbuh28MFXZHPPIYoonur7jF9TYsGPuGOFSsMatzCgGsexyxM3i8CKZVddllDA9CKgEjicQDsY3u8H0Y/xFT3t5lfTTwJiW8KNtJDGrdwoBri7EYJkhFG4EdqstP/Z", link: "https://outlook.live.com" },
    { name: "Pear Assessment", title: "Pear Assessment", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEVHcEwrOkIsO0I0QkMoN0InNkIiMUEnNUImNUEqOEIwPkI0QkMzQEMxP0IyQEMxP0PI21fL3lfQ5FjO4Vi4ylR2hUphcEVNXEKer1CnuVFqekbU6FmAlTmvwVNbaUdATkQAF0B9mIX1AAAAEHRSTlMApyf621LnZv7HHJjFfLc+PB2r8AAAALxJREFUKJHFkEkWgzAMQwljAg+I7cxhuv8pC3RHwrbV9luS7aL4q/qpHothyqGRVWGxVTXk4GCXZTHiJVVYY6v5rXPumDhb37zGe1PnWbdFgLh1WdiuICWsbY41FuUptE0GcgUXBMVTxjTJW6RZarxtBOdIYm0MXdtoFYDMs7W7UkEFFYj085obKocgHSaw3FGCPFbUIe7ls7R2JMHzYyOXfrDnHgEQo+d9emjJjVPKGZ6EfpcSbSvyf/+dPiDkDIV9PRLKAAAAAElFTkSuQmCC", link: "https://app.edulastic.com/home/assignments" },
    { name: "StarlightGG (Default Page)", title: "StarlightGG | Free Games!", favicon: "favicon.ico", link: "https://classroom.google.com" },
    { name: "Zearn", title: "Student Home - Zearn", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcExFvdM6utGKxq8/u9I8utFIvtM8utFFvNM+u9JJvdNAu9Jnxdg/u9E9utFIvtQ/u9E8utFxydolutn1z0D+0Cr1z0H1zj/1z0L1z0H1z0H1zj/1z0H31GD1z0H10EovluFDAAAAIHRSTlMA2P8Vrf8v9EuXcci5auP/XGR9wLmh4v9CW5Vod9EfI0NLlVAAAACgSURBVHgBddDFAcRADATBRTMzO/8ojyTzXH9rUeKUVFKLPxllrXUEzrXfPIy+/RVglaQ+1lD91GCNSENxLk5cm34jvKhnP6lvlvMf7zyVHJhh5HzXdS+Yi2eFIjPAPLYQmGMpCUyDx+yVVIisqilkTUt1wCq2HtjANgKb2CZgXcvNc1VV9TAMJ2wfNbvp9tmyK8B1x/5hlThaur4fT/Ek3sqLEwwJ2FthAAAAAElFTkSuQmCC", link: "https://zearn.org" },
    { name: "XanEdu (Sharedbook)", title: "SharedBook", favicon: "data:image/png;base64,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", link: "https://www.xanedu.com/" },
    { name: "Prodigy", title: "Prodigy Math | Boost Student Learning & Love of Math", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcEzxXiHxXiHwXiH7YiLxXiHwXiHyXyH6YyLxXiHxXiHxXyHzXyHxXyH1YCHwXiHzzrBOAAAAD3RSTlMAqVPjFNfxbAq5xZM3gyWEvbj1AAAA4klEQVQoka2SWwIFEQhA8yZD+9/tTRrz/rt+DKdyNADOY6sYQmkdnsNG0hG2OytjG40JY25XxnvRzs/E1JyZISprkR1ROqlwxTF7a/OY+fgsNbTomJC0YieqrMhunDAVVDdMvXlYGAoeoHGW70XO46Q+Y9yMi5IDTmtZFWXOjqpYJXL3Hffiz6zBSBHWgms4sZzrKqJ8t72HRpsag4St2gpDN6vtWY7EA04hLKZt+he2C/TLYRQ9On2FHuVqL9AmpAs7wSxOFb6gqx7eITxf1932b5BMww9ota35DUKKMT4e+g97yw6PHWKiHQAAAABJRU5ErkJggg==", link: "https://www.prodigygame.com/main-en" },
    { name: "i-Ready", title: "i-Ready Login ", favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAilBMVEVHcEzzdSTydyLmfzX0dCHzdSPzdSP2cx7zdSP1cyL0dSL1dCHzdSPBnib1dBz1dCD1dCD0dCL2cx9QtpuCxkCJwz89t7sju8NjwXOGxECGxECDxkCsqFESvskbvcYdvMUevMWGxECExUAQvsgevMWGxECUxRwXvccdvMWFxUAbvMaFxUAVv9AIu9AIn5ARAAAALnRSTlMAB01Epf/3ky+H5NF7G3W/Ye6xGGA/SFwMNOd7QYXo1yn/tHH/9Uu99pmi1zVleDjrLAAAAOJJREFUeAFiQAaAZunigEEgCKAobou7u0v/5SVhcCkg//pgHSdIHHsPJymaYTn8jTheoH8hkXuYJCN6iVFU6TaZwtB7mk6ejKME+pLActtvMtCNVRxQ4rUnajKgYVqEfmONIm3H/aHn+0GoImYDWK8dxUkKmGW5SfJoMySHRVKWO2ZVXhOstiyUdJq2POEvvwsJhaZ1wu7jH50QGgJJVY0I6IbA0gj0QKieyj9HN/DfMClcbM7q/DvGfYqtuWZenbHtbff8voLhwGYysGte5y+YRCn2yLXyqp7afnQfBOy5xoW+PqM2fvefp78AAAAASUVORK5CYII=", link: "https://login.i-ready.com/" }
];

//replace with ones u know works (defaults are DogeUB since it works)
const PROXY_SERVERS = [
    { name: "DogeUB (1)", url: "https://learn.teaching.za.com/search" },
    { name: "DogeUB (2)", url: "https://auth.teaching.za.com/search" },
    { name: "DogeUB (3)", url: "https://worksheets.teaching.za.com/search" },
    { name: "DogeUB (4)", url: "https://ask.teaching.za.com/search" },
        { name: "DogeUB (5)", url: "https://algebra.teaching.za.com/search" },
];
//enable if wanted
const SURF_WEB_ENABLED = true; 
// edit this if wanted (this message is for Doge UB)
const SURF_INFO_MESSAGE = "<b>Welcome to Surf Web!</b><br><br>Use the dropdown menu at the top to switch between proxy servers.<br><br><b>Tips:</b><br>- If a site is blocked, try a different server. (All may be blocked, sorry)<br>- Use <strong>'https://duckduckgo.com'</strong> to actually search, not 'Google'.";

        // --- MODAL COMPONENT ---
        const Modal = ({ message, isActive, onClose }) => {
            return e('div', { id: 'custom-modal', className: `modal-overlay ${isActive ? 'active' : ''}`, onClick: (ev) => { if(ev.target.id === 'custom-modal') onClose(); } },
                e('div', { className: 'modal-content' },
                    e('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' } },
                        e('h3', { id: 'modal-title' }, 'Notification'),
                        e('button', { onClick: onClose, style: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2em', color: 'var(--text-color)' } }, 
                            e('i', { className: 'fas fa-times' }) // Replaced '✖'
                        )
                    ),
                    e('p', { id: 'modal-message', dangerouslySetInnerHTML: { __html: message } }),
                    e('div', { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' } },
                        e('button', { onClick: onClose, style: { background: 'var(--primary-color)', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' } }, 'OK')
                    )
                )
            );
        };

        // --- PERFORMANCE MONITOR (Draggable) ---
        const PerformanceMonitor = ({ visible }) => {
            const [fps, setFps] = useState(0);
            const [ping, setPing] = useState(0);
            const [isOpen, setIsOpen] = useState(false);
            // REVERTED: Default position back to bottom corner (20px)
            const [pos, setPos] = useState({ bottom: 20, right: 20 });
            const lastTouchTime = useRef(0); // Added ref for ghost click prevention
            
            // FPS Loop
            useEffect(() => {
                let frameCount = 0;
                let lastTime = performance.now();
                const loop = () => {
                    frameCount++;
                    const now = performance.now();
                    if (now - lastTime >= 1000) {
                        setFps(frameCount);
                        frameCount = 0;
                        lastTime = now;
                    }
                    requestAnimationFrame(loop);
                };
                loop();
            }, []);

            // Ping Loop - REVERTED TO gstatic (Works best)
            useEffect(() => {
                let interval;
                const performPing = async () => {
                    if (!isOpen) return;
                    const start = performance.now();
                    try {
                        await fetch(`https://connectivitycheck.gstatic.com/generate_204?t=${Date.now()}`, {
                            method: 'HEAD',
                            mode: 'no-cors',
                            cache: 'no-cache'
                        });
                        const end = performance.now();
                        setPing(Math.round(end - start));
                    } catch (err) {
                        setPing('Err');
                    }
                };
                if (isOpen) {
                    performPing();
                    interval = setInterval(performPing, 500);
                }
                return () => {
                    if (interval) clearInterval(interval);
                };
            }, [isOpen]);

            // Helper for Color
            const getColor = (val) => {
                if (val >= 50) return 'text-good';
                if (val >= 30) return 'text-medium';
                return 'text-bad';
            };

            // Helper for Ping Color
            const getPingColor = (val) => {
                if (val === 'Err') return 'text-bad';
                if (val < 100) return 'text-good';
                if (val < 200) return 'text-medium';
                return 'text-bad';
            };

            // Drag Logic - FIXED CLICK VS DRAG & ADDED TOUCH SUPPORT
            const handleStart = (e) => {
                // Determine input type
                const isTouch = e.type === 'touchstart';

                // Fix for double-firing on mobile (Touch -> Mouse emulation)
                if (isTouch) {
                    lastTouchTime.current = Date.now();
                } else {
                    // If mouse event is within 500ms of last touch, ignore it (it's a ghost event)
                    if (Date.now() - lastTouchTime.current < 500) return;
                    e.preventDefault(); // Prevent text selection on mouse
                }
                
                const clientX = isTouch ? e.touches[0].clientX : e.clientX;
                const clientY = isTouch ? e.touches[0].clientY : e.clientY;
                
                const startX = clientX;
                const startY = clientY;
                const startRight = pos.right;
                const startBottom = pos.bottom;
                
                let hasMoved = false;

                // Create Overlay for Dragging
                const overlay = document.createElement('div');
                overlay.id = 'drag-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.zIndex = '99999';
                overlay.style.cursor = 'grabbing';
                document.body.appendChild(overlay);

                const onMove = (moveEvent) => {
                    const moveClientX = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientX : moveEvent.clientX;
                    const moveClientY = moveEvent.type === 'touchmove' ? moveEvent.touches[0].clientY : moveEvent.clientY;

                    const deltaX = startX - moveClientX;
                    const deltaY = startY - moveClientY;

                    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                        hasMoved = true;
                    }

                    if (hasMoved) {
                        if (moveEvent.cancelable) moveEvent.preventDefault(); // Prevent scrolling while dragging

                        let newRight = startRight + deltaX;
                        let newBottom = startBottom + deltaY;

                        const maxX = window.innerWidth - 30;
                        const maxY = window.innerHeight - 30;
                        
                        newRight = Math.max(0, Math.min(maxX, newRight));
                        newBottom = Math.max(0, Math.min(maxY, newBottom));

                        setPos({
                            right: newRight,
                            bottom: newBottom
                        });
                    }
                };

                const onEnd = () => {
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onEnd);
                    document.removeEventListener('touchmove', onMove);
                    document.removeEventListener('touchend', onEnd);
                    
                    const ov = document.getElementById('drag-overlay');
                    if(ov) ov.remove();

                    if (!hasMoved) {
                        setIsOpen(prev => !prev);
                    }
                };

                if (isTouch) {
                    document.addEventListener('touchmove', onMove, { passive: false });
                    document.addEventListener('touchend', onEnd);
                } else {
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onEnd);
                }
            };

            if (!visible) return null;

            // --- SMART POSITIONING LOGIC ---
            let modalBottom = pos.bottom + 40; 
            let modalRight = pos.right;       
            // UPDATED: Reduced height estimate to 90 to remove top gap
            const modalHeight = 90; 
            const modalWidth = 120;

            if (modalBottom + modalHeight > window.innerHeight) {
                modalBottom = window.innerHeight - modalHeight;
            }
            if (modalRight + modalWidth > window.innerWidth) {
                modalRight = window.innerWidth - modalWidth;
            }

            return e(React.Fragment, null,
                e('div', { 
                    id: 'performance-modal',
                    className: isOpen ? 'visible' : '', 
                    style: { 
                        bottom: `${modalBottom}px`, 
                        right: `${modalRight}px`,
                        width: '120px',
                        padding: '10px',
                        // REMOVED INLINE OPACITY: Let CSS handle visibility
                    } 
                }, 
                    e('div', { style: { 
                        fontSize: '0.7em', 
                        opacity: 0.7, 
                        marginBottom: '4px', 
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    } }, 'Performance Stat'),
                    
                    e('div', { style: { fontSize: '0.8em' } }, 'FPS: ', e('span', { className: getColor(fps) }, fps)),
                    e('div', { style: { fontSize: '0.8em' } }, 'Ping: ', e('span', { className: getPingColor(ping) }, `${ping}ms`))
                ),
                e('div', { 
                    id: 'info-btn', 
                    onMouseDown: handleStart,
                    onTouchStart: handleStart, // Added Touch Listener
                    style: { bottom: `${pos.bottom}px`, right: `${pos.right}px` }
                }, e('i', { className: 'fas fa-info', style: { fontSize: '0.9rem' } })) 
            );
        };

        // --- DASHBOARD CARD COMPONENT ---
        const DashboardCard = ({ icon, title, desc, onClick, accent }) => {
            return e('div', { 
                className: `dashboard-card ${accent ? 'card-accent' : ''}`, 
                onClick: onClick 
            },
                e('i', { className: icon }),
                e('h3', null, title),
                e('p', null, desc)
            );
        };

        // --- SUB-PAGE HEADER (WITH CHILDREN SUPPORT) ---
        const PageHeader = ({ title, onBack, children }) => {
            return e('div', { className: 'page-header' },
                e('button', { className: 'back-btn', onClick: onBack }, 
                    e('i', { className: 'fas fa-arrow-left' }), 'Home'
                ),
                e('div', { className: 'menu-section-title' }, title),
                e('div', { style: { display: 'flex', gap: '10px' } }, children) // Changed from 'actions' prop to 'children' or generic container
            );
        };

        // --- MAIN APP COMPONENT ---
        const App = () => {
            // State
            const [isLoading, setIsLoading] = useState(true); // Loading State
            const [activeTab, setActiveTab] = useState('home');
            const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
            const [pattern, setPattern] = useState(localStorage.getItem('pattern') || 'stars');
            // ADDED: Gradient Toggle State (Default true)
            const [gradientEnabled, setGradientEnabled] = useState(() => localStorage.getItem('gradientEnabled') !== 'false');
            
            const [modalState, setModalState] = useState({ isActive: false, message: '' });
            const [time, setTime] = useState('');
            const [onlineCount, setOnlineCount] = useState('Loading...');
            const [quote, setQuote] = useState('Loading quote...');
            const [isQuoteFading, setIsQuoteFading] = useState(false); // Quote Fade State
            
            // Settings States
            const [footerVisible, setFooterVisible] = useState(() => localStorage.getItem('footerVisible') !== 'false');
            const [tabProtection, setTabProtection] = useState(() => localStorage.getItem('tabProtectionState') === 'true');
            const [redirectEnabled, setRedirectEnabled] = useState(() => localStorage.getItem('redirectToggleState') === 'true');
            const [overlayEnabled, setOverlayEnabled] = useState(() => localStorage.getItem('overlayToggleState') === 'true');
            const [aboutBlankEnabled, setAboutBlankEnabled] = useState(() => localStorage.getItem('aboutBlankPopupState') === 'true');
            const [statsEnabled, setStatsEnabled] = useState(() => localStorage.getItem('statsToggleState') === 'true');
            // NEW: Auto Save State
            const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => localStorage.getItem('autoSaveState') === 'true');
            // NEW: Save Indicator State
            const [showSaveIndicator, setShowSaveIndicator] = useState(() => localStorage.getItem('showSaveIndicator') !== 'false');
            // NEW: Lag Reducer State
            const [lagReducerEnabled, setLagReducerEnabled] = useState(() => localStorage.getItem('lagReducerState') === 'true');
            
            // NEW: Track Linked Filename
            const [saveFileName, setSaveFileName] = useState(null);

            const [isSaving, setIsSaving] = useState(false);

            // Game Loading State
            const [gameLoading, setGameLoading] = useState(false);

            // Cloak Mode State
            const [cloakMode, setCloakMode] = useState(''); // '' | 'custom' | 'url'

            const [iframeState, setIframeState] = useState({ active: false, src: '' });
            
            // REFS FOR CANVAS & MOUSE TRACKING (For Hexagons Only)
            const canvasRef = useRef(null);
            const mousePos = useRef({ x: 0, y: 0 });
            
            // NEW: File Handle Ref for Auto-Save Overwriting
            const fileHandleRef = useRef(null);

            // Helpers
            // UPDATED: Added .replace(/\n/g, '<br>') to support \n newlines
            const showModal = (msg) => setModalState({ isActive: true, message: msg.replace(/\n/g, '<br>') });
            const closeModal = () => setModalState({ ...modalState, isActive: false });
            
            const updateFavicon = (url) => {
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
                link.href = url;
            };

            // INITIAL LOAD (Cloak & Quote)
 useEffect(() => {
document.documentElement.setAttribute('data-theme', theme);

    const isCloaked = localStorage.getItem('isCloaked') === 'true';
    const targetElement = document.getElementById('Dbclick');

    // 1. INSTANT DELETE (No delay)
    if (isCloaked && targetElement) {
        targetElement.remove(); 
    }

    // 2. DELAYED EXECUTION (Wait 800ms to apply mask or set up listener)
    setTimeout(() => {
        const storedTitle = localStorage.getItem('customPageTitle');
        const storedFavicon = localStorage.getItem('customFaviconURL');

        if (isCloaked) {
            // Re-apply the mask after the load delay
            document.title = storedTitle || "Google";
            updateFavicon(storedFavicon || "https://google.com/favicon.ico");
        } else {
            const activeElement = document.getElementById('Dbclick');
            if (activeElement) {
                // Unified handler for Mouse and Touch
                const dismissCloak = function() {
                    this.classList.add('fade-out');

                    setTimeout(() => {
                        this.remove();
                        const defaultTitle = "Google";
                        const defaultFavicon = "https://google.com/favicon.ico";
                        
                        document.title = defaultTitle;
                        updateFavicon(defaultFavicon);
                        
                        localStorage.setItem('customPageTitle', defaultTitle);
                        localStorage.setItem('customFaviconURL', defaultFavicon);
                        localStorage.setItem('isCloaked', 'true');
                    }, 800);
                };
                
                // Add listeners for both PC (MouseMove) and Mobile (Touch/Click)
                activeElement.addEventListener('mousemove', dismissCloak);
                activeElement.addEventListener('touchstart', dismissCloak);
                activeElement.addEventListener('click', dismissCloak);
            }
        }
    }, 800);

    setTimeout(() => setIsLoading(false), 800);

    const timer = setInterval(() => {
        const now = new Date();
        setTime(`${now.toLocaleDateString([], {weekday:'short'})} | ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`);
    }, 1000);

    // Quote Logic with Non-Repeating Rotation and Transition
    let quoteInterval;
    fetch('txt/quotes.txt').then(r => r.text()).then(t => {
        const allQuotes = t.split('\n').filter(l => l.trim());
        if (allQuotes.length === 0) return setQuote('Welcome to StarlightGG');

        let currentPool = [...allQuotes];

        const rotate = () => {
            // 1. Fade Out
            setIsQuoteFading(true);

            setTimeout(() => {
                // 2. Change Text (while invisible)
                if (currentPool.length === 0) currentPool = [...allQuotes];
                const randomIndex = Math.floor(Math.random() * currentPool.length);
                setQuote(currentPool[randomIndex]);
                currentPool.splice(randomIndex, 1);

                // 3. Fade In
                setIsQuoteFading(false);
            }, 500); // Wait for fade-out duration
        };

        rotate(); // Initial set
        quoteInterval = setInterval(rotate, 5000);
    }).catch(() => setQuote('Welcome to StarlightGG'));

    return () => {
        clearInterval(timer);
        if (quoteInterval) clearInterval(quoteInterval);
    };
}, []);
            
            // --- NEW: HEXAGONAL & SNOW PARTICLE SYSTEM ---
            useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                
                // UPDATED: Added 'waves' to the allowed list
                if (pattern !== 'hexagons' && pattern !== 'snow' && pattern !== 'waves' ) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return;
                }

                const ctx = canvas.getContext('2d');
                let width, height;
                let particles = [];
                let animationFrameId;
                
                // Entrance Zoom State
                let currentScale = 0.3; // Start Zoomed Out (Small)
                let targetScale = 1.0;

                const resize = () => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                };
                window.addEventListener('resize', resize);
                resize();

                // --- 1. HEXAGON DOT CLASS ---
                class Hexagon {
                    constructor() {
                        this.init();
                    }
                    init() {
                        this.x = Math.random() * width;
                        this.y = Math.random() * height;
                        this.size = Math.random() * 2 + 1; 
                        this.angle = Math.random() * Math.PI * 2;
                        // REVERTED: Random independent velocity
                        this.vx = (Math.random() - 0.5) * 1.5; 
                        this.vy = (Math.random() - 0.5) * 1.5;
                    }
                    draw() {
                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)';
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                    update() {
                        // REVERTED: No angle/mouse tracking
                        this.x += this.vx;
                        this.y += this.vy;

                        if (this.x > width + 50) this.x = -50;
                        if (this.x < -50) this.x = width + 50;
                        if (this.y > height + 50) this.y = -50;
                        if (this.y < -50) this.y = height + 50;
                    }
                }

                // --- 2. SNOWFLAKE TRAIL CLASS ---
                class Snowflake {
                    constructor() {
                        this.init();
                    }
                    init() {
                        this.x = Math.random() * width;
                        this.y = Math.random() * -height; 
                        this.size = Math.random() * 2 + 1; 
                        this.speed = Math.random() * 3 + 2; 
                        this.history = []; 
                        this.maxHistory = 10;
                    }
                    draw() {
                        const headColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)';
                        const trailColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)';

                        ctx.fillStyle = headColor;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fill();

                        if (this.history.length > 1) {
                            ctx.beginPath();
                            ctx.strokeStyle = trailColor;
                            ctx.lineWidth = this.size;
                            ctx.moveTo(this.history[0].x, this.history[0].y);
                            for (let i = 1; i < this.history.length; i++) {
                                ctx.lineTo(this.history[i].x, this.history[i].y);
                            }
                            ctx.stroke();
                        }
                    }
                    update() {
                        this.history.push({ x: this.x, y: this.y });
                        if (this.history.length > this.maxHistory) {
                            this.history.shift();
                        }
                        this.y += this.speed;
                        // REVERTED: No windX/mouse tracking
                        this.x += Math.sin(this.y * 0.02) * 0.5; 

                        if (this.y > height + 20) {
                            this.y = -20;
                            this.x = Math.random() * width;
                            this.history = [];
                        }
                    }
                }

                // --- 3. WAVE CLASS ---
                class Wave {
                    constructor(y) {
                        this.y = y;
                        this.wavelength = Math.random() * 0.01 + 0.005;
                        this.amplitude = Math.random() * 30 + 20;
                        this.speed = Math.random() * 0.03 + 0.01;
                        this.offset = Math.random() * Math.PI * 2;
                    }
                    update() {
                        this.offset += this.speed;
                    }
                    draw() {
                        ctx.beginPath();
                        const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2;
                        
                        for (let x = 0; x <= width; x += 10) {
                            const y = this.y + Math.sin(x * this.wavelength + this.offset) * this.amplitude;
                            if (x === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                    }
                }


                // --- INITIALIZE PARTICLES ---
                particles = [];
                if (pattern === 'hexagons') {
                    const pCount = Math.floor((width * height) / 10000); 
                    for (let i = 0; i < pCount; i++) particles.push(new Hexagon());
                } else if (pattern === 'snow') {
                    const pCount = Math.floor(width / 5); 
                    for (let i = 0; i < pCount; i++) particles.push(new Snowflake());
                } else if (pattern === 'waves') {
                     for(let i=0; i<7; i++) {
                        particles.push(new Wave(height * ((i+1)/8)));
                     }
                } 
                // --- ANIMATION LOOP ---
                const animate = () => {
                    ctx.clearRect(0, 0, width, height);
                    
                    // --- ZOOM ENTRANCE LOGIC ---
                    if (currentScale < targetScale) {
                        currentScale += (targetScale - currentScale) * 0.15; 
                    }
                    
                    // Apply Global Scale from Center
                    ctx.save();
                    ctx.translate(width / 2, height / 2);
                    ctx.scale(currentScale, currentScale);
                    ctx.translate(-width / 2, -height / 2);

                    ctx.lineWidth = 1;
                    
                    if (pattern === 'hexagons') {
                        for (let i = 0; i < particles.length; i++) {
                            const p1 = particles[i];
                            p1.update(); 
                            p1.draw();
                            for (let j = i + 1; j < particles.length; j++) {
                                const p2 = particles[j];
                                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                                if (dist < 100) {
                                    ctx.beginPath();
                                    ctx.strokeStyle = theme === 'dark' 
                                        ? `rgba(255,255,255,${0.3 * (1 - dist/100)})` 
                                        : `rgba(0,0,0,${0.15 * (1 - dist/100)})`;
                                    ctx.moveTo(p1.x, p1.y);
                                    ctx.lineTo(p2.x, p2.y);
                                    ctx.stroke();
                                }
                            }
                        }
                    } else if (pattern === 'snow') {
                        for (let i = 0; i < particles.length; i++) {
                            particles[i].update(); 
                            particles[i].draw();
                        }
                    } else if (pattern === 'waves') {
                        for (let i = 0; i < particles.length; i++) {
                            particles[i].update();
                            particles[i].draw();
                        }
                    } 

                    
                    ctx.restore(); // Restore global scale
                    animationFrameId = requestAnimationFrame(animate);
                };
                animate();

                return () => {
                    window.removeEventListener('resize', resize);
                    cancelAnimationFrame(animationFrameId);
                };
            }, [theme, pattern]); 

            // Track mouse ONLY for Hexagons effect - REMOVED since directional flow is gone.
            // (Empty dependency array or remove listener if not used elsewhere)

            useEffect(() => {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }, [theme]);

            // ADDED: Sync Gradient State to Body Attribute
            useEffect(() => {
                document.body.setAttribute('data-gradient', gradientEnabled);
                localStorage.setItem('gradientEnabled', gradientEnabled);
            }, [gradientEnabled]);

            // ADDED: Save Pattern & Trigger Zoom Animation for CSS Backgrounds
            useEffect(() => {
                localStorage.setItem('pattern', pattern);
                
                // Trigger CSS Zoom Transition
                const menu = document.getElementById('main-menu');
                if (menu) {
                    const isCssPattern = ['lines', 'dots', 'stars', 'stripes'].includes(pattern);

                    if (isCssPattern) {
                        // 1. Set Start State (Zoomed Out) instantly
                        menu.style.transition = 'none';
                        if (pattern =="stars"){
                                                  menu.style.backgroundSize = '150px 150px'; 

                        }else{
                                                  menu.style.backgroundSize = '30px 30px'; 

                        }
                        
                        // 2. Wait for next paint frame to apply transition (Double RAF ensures paint)
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                menu.style.transition = 'background-size 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
                                menu.style.backgroundSize = ''; // Reverts to CSS defined size (Zoom In)
                            });
                        });
                    } else {
                        // Canvas patterns (Snow/Hex/Fireworks/Glitter) handle their own zoom
                        menu.style.backgroundSize = '';
                        menu.style.transition = 'none';
                    }
                }
            }, [pattern]);

            // Save footer state whenever it changes
            useEffect(() => {
                localStorage.setItem('footerVisible', footerVisible.toString());
            }, [footerVisible]);

            // Chatbot Advisory Check
            useEffect(() => {
                if (activeTab === 'chatbots') {
                    const key = 'chatbot_advisory_shown';
                    if (!localStorage.getItem(key)) {
                        showModal("If you are using AI and it isnt getting recent resources, use either chatgpt or compound for web search.<br><br>Please always wait patiently when loading chatbot.");
                        localStorage.setItem(key, 'true');
                    }
                }
            }, [activeTab]);

            // PubNub
            useEffect(() => {
                const fetchKeysAndInit = async () => {
                    if (!window.PubNub) return; // Safety check
                    try {
                        const [pubRes, subRes] = await Promise.all([
                            fetch('txt/pub.txt'),
                            fetch('txt/sub.txt')
                        ]);
                        let pubKey = (await pubRes.text()).trim();
                        let subKey = (await subRes.text()).trim();
                        pubKey = 'pub-c-' + pubKey;
                        subKey = 'sub-c-' + subKey;
                        const pubnub = new PubNub({
                            publishKey: pubKey,
                            subscribeKey: subKey,
                            uuid: "user-" + Math.random()
                        });

                        // Add listeners first to catch subscription errors
                        pubnub.addListener({
                            status: (s) => {
                                if (s.error || s.category === "PNAccessDeniedCategory") {
                                     setOnlineCount('Counter Offline');
                                }
                            },
                            presence: (p) => {
                                if(p.occupancy) setOnlineCount(p.occupancy);
                                else updateCount();
                            }
                        });

                        pubnub.subscribe({ channels: ['counter'], withPresence: true });
                        
                        const updateCount = () => {
                             pubnub.hereNow({ channels: ['counter'], includeState: true }, (status, response) => {
                                 // Check for error in status (e.g. limit reached)
                                 if (status.error) {
                                     setOnlineCount('Counter Offline');
                                     return;
                                 }

                                 if(response && response.channels && response.channels.counter) {
                                     setOnlineCount(response.channels.counter.occupancy);
                                 }
                             });
                        };
                        
                        updateCount(); 
                        const interval = setInterval(updateCount, 10000); 
                        return () => clearInterval(interval);

                    } catch (e) {
                        console.error("PubNub Init Failed", e);
                        setOnlineCount('Counter Offline');
                    }
                };
                setTimeout(fetchKeysAndInit, 1000);
            }, []);

            // --- TOGGLE HANDLERS (Update State & LocalStorage) ---
            const handleToggle = (key, currentState, setter) => {

                const newState = !currentState;
                                    if (key=="aboutBlankPopupState" && currentState == true){
                        showModal("This feature is recommended to be on so GoGuardian or any third party apps cannot see your screen!");
                  }
                setter(newState);
                localStorage.setItem(key, newState.toString());
            };

            const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
            
            // UPDATED: Now accepts isSurfing flag
            const openGame = (url, isSurfing = false) => {
                setGameLoading(true); // Start loading animation
                setIframeState({ active: true, src: url, isSurfing });
                setActiveTab('game-view');
            };
            
            // Modified Exit Game: Only hides Iframe, DOES NOT force footerVisible state
            const exitGame = () => {
                setIframeState({ active: false, src: '' });
                setActiveTab('home');
                // Removed setFooterVisible(true) so the user's preference (hidden/shown) persists
            };

            // --- LAG REDUCER LOGIC (Aggressive setInterval Version) ---
            useEffect(() => {
                if (!lagReducerEnabled) return;
                
                let lastTime = Date.now();
                let lagAccumulator = 0; 

                // Reset on visibility change to prevent false positives when tabbing out
                const handleVisibilityChange = () => {
                    if (document.visibilityState === 'visible') {
                        lastTime = Date.now();
                        lagAccumulator = 0;
                    }
                };
                document.addEventListener('visibilitychange', handleVisibilityChange);

                // Use setInterval instead of requestAnimationFrame
                // This runs independently of the screen refresh rate, making it more likely
                // to catch lag even if the graphics card is frozen.
                const intervalId = setInterval(() => {
                    const now = Date.now();
                    const elapsed = now - lastTime;
                    lastTime = now;

                    // NEW: Skip detection if the game is currently loading
                    // This prevents the natural lag spike during game load from killing the iframe.
                    if (gameLoading) {
                        lagAccumulator = 0;
                        return;
                    }

                    // Only process if visible
                    if (document.visibilityState === 'visible') {
                        
                        // 1. HARD FREEZE DETECTION (Instant Trigger)
                        // UPDATED: Threshold increased to 5 seconds (User Request: "freeze is 5")
                        // Checks every 500ms. If elapsed > 7500ms, it means the browser hung for ~4.5s+
                        if (elapsed > 7500) {
                            if (iframeState.active) {
                                exitGame();
                                showModal("⚠️ <strong>Freeze Detected!</strong><br><br>The game was exited because the browser froze for > 7.5 seconds.");
                            } else {
                                showModal("⚠️ <strong>Browser Freeze!</strong><br>Closing tab to prevent crash...");
                                setTimeout(() => window.close(), 500);
                              window.manualExitIntent = false;

                            }
                            lagAccumulator = 0;
                            return;
                        }

                        // 2. LAG ACCUMULATION
                        // If the 500ms interval took longer than 750ms (1.5x), we are lagging.
                        if (elapsed > 750) {
                            lagAccumulator += elapsed;
                            
                            // Threshold: 2.5 seconds of continuous struggle
                            // User Request: "sustain lag 2.5"
                            if (lagAccumulator > 2500) { 
                                if (iframeState.active) {
                                    exitGame();
                                    showModal("⚠️ <strong>High Latency Trigger!</strong><br><br>Game exited to prevent a total browser crash.");
                                    lagAccumulator = 0; 
                                } else {
                                    showModal("⚠️ <strong>Critical Lag!</strong><br>Browser unresponsive. Closing tab...");
                                    setTimeout(() => window.close(), 500);
                                    lagAccumulator = 0;
                                }
                            }
                        } else {
                            // Recovered - Decay slower for stability
                            lagAccumulator = Math.max(0, lagAccumulator - 500);
                        }
                    } else {
                        lagAccumulator = 0;
                    }
                }, 500); // Check every 0.5 second (500ms) - BALANCED

                return () => {
                    clearInterval(intervalId);
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                };
            }, [lagReducerEnabled, iframeState.active, gameLoading]); // Added gameLoading dependency

            // URL Cloak Logic
            const handleUrlCloak = async () => {
                const urlInput = document.getElementById('url-cloak-input').value;
                if (!urlInput) return showModal("Please enter a URL!");
                
                const targetUrl = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;

                showModal("Fetching cloak data... (This may take a moment)");
                
                try {
                    // 1. Get Favicon (Google Service)
                    let domain;
                    try {
                        const u = new URL(targetUrl);
                        domain = u.hostname;
                    } catch { domain = targetUrl; }
                    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

                    // 2. Fetch Title using Proxy
                    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    const htmlText = await response.text();
                    const titleMatch = htmlText.match(/<title\b[^>]*>([^<]*?)<\/title>/i);
                    const fetchedTitle = titleMatch ? titleMatch[1].trim() : domain;

                    // 3. Apply
                    document.title = fetchedTitle;
                    updateFavicon(favicon);
                    
                    // 4. Save
                    localStorage.setItem('customPageTitle', fetchedTitle);
                    localStorage.setItem('customFaviconURL', favicon);
                    localStorage.setItem('LINKTAB_KEY', targetUrl);
                    
                    showModal(`Cloaked successfully!<br><br><b>Title:</b> ${fetchedTitle}<br><b>Favicon:</b> ${favicon}<br><br>If this information is incorrect, please use the <b>Custom Cloak</b> mode instead.`);
                } catch (error) {
                    console.error(error);
                    // Fallback to domain if proxy fails
                    let domain;
                    try {
                        const u = new URL(targetUrl);
                        domain = u.hostname;
                    } catch { domain = targetUrl; }
                    
                    document.title = domain;
                    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                    updateFavicon(favicon);
                    
                    localStorage.setItem('customPageTitle', domain);
                    localStorage.setItem('customFaviconURL', favicon);
                    localStorage.setItem('LINKTAB_KEY', targetUrl);

                    showModal(`Could not fetch full title (Proxy Blocked?).\nCloaked as domain: ${domain}`);
                }
            };

            const applyCloak = (e) => {
                const val = e.target.value;
                
                if (val === 'custom') {
                    setCloakMode('custom');
                } else if (val === 'url-cloak') {
                    setCloakMode('url');
                } else if (val === 'custom-apply') {
                    // Manual Custom Apply
                    const customTitle = document.getElementById('custom-title-input').value.trim();
                    const customFavicon = document.getElementById('custom-favicon-input').value.trim();
                    const customUrl = document.getElementById('custom-url-input').value.trim();

                    // 1. Check if ANY info is filled
                    if (!customTitle && !customFavicon && !customUrl) {
                        return showModal("Please fill out at least one field to apply settings.");
                    }

                    // 2. Tab Key URL Logic
                    if (customUrl) {
                        // Check for valid protocol
                        if (!customUrl.startsWith('http://') && !customUrl.startsWith('https://')) {
                            return showModal("Invalid URL format.<br><br>Please include <b>https://</b> or <b>http://</b> at the start of your Tab Key URL.");
                        }
                        localStorage.setItem('LINKTAB_KEY', customUrl);
                    }

                    if (customTitle) {
                        document.title = customTitle;
                        localStorage.setItem('customPageTitle', customTitle);
                    }
                    if (customFavicon) {
                        updateFavicon(customFavicon);
                        localStorage.setItem('customFaviconURL', customFavicon);
                    }
                    
                    showModal("Custom cloak applied!");
                } else {
                    // Preset Selected - HIDE inputs
                    setCloakMode(''); 
                    
                    // Find preset by Name
                    const preset = PRESETS.find(p => p.name === val);
                    
                    if(preset) {
                        const { title, favicon, link } = preset;
                        document.title = title;
                        updateFavicon(favicon);
                        localStorage.setItem('customPageTitle', title);
                        localStorage.setItem('customFaviconURL', favicon);
                        localStorage.setItem('LINKTAB_KEY', link);
                    }
                }
            };

            const openNewWindow = () => {
                 if (!iframeState.active || !iframeState.src) return showModal("No game loaded!");
                 const win = window.open('about:blank', '_blank');
                 if (!win) return showModal("Popups are blocked! Please allow popups for this site.");
                 
                 const title = document.title;
                 const favicon = localStorage.getItem('customFaviconURL') || document.querySelector("link[rel*='icon']")?.href;
                 
                 win.document.write(`
                    <html><head><title>${title}</title>
                    ${favicon ? `<link rel="icon" href="${favicon}">` : ''}
                    <style>body{margin:0;overflow:hidden;}iframe{width:100vw;height:100vh;border:none;}</style>
                    </head><body><iframe src="${iframeState.src}"></iframe></body></html>
                 `);
                 win.document.close();
            };
            
            // --- DATA MANAGEMENT (Export/Import) ---
            
            // AUTO SAVE EFFECT (Runs every 1 minutes if enabled)
            useEffect(() => {
                let interval;
                if (autoSaveEnabled) {
                    interval = setInterval(() => {
                        handleExportData(true); // true = silent auto-save
                    }, 60000); // 1 Minutes (60000 ms)
                }
                return () => clearInterval(interval);
            }, [autoSaveEnabled]);

            // UPDATED: Export Logic to support Manual "Quick Save"
            // arg can be boolean (isAuto) OR object { isAuto, forceLink }
            const handleExportData = async (arg = false) => {
                const isAuto = typeof arg === 'boolean' ? arg : (arg.isAuto || false);
                const forceLink = typeof arg === 'object' && arg.forceLink; // New flag for manual Quick Save

                // TRIGGER INDICATOR IF AUTO-SAVE
                if (isAuto && showSaveIndicator) {
                    setIsSaving(true);
                    setTimeout(() => setIsSaving(false), 2000);
                }

                const data = {
                    timestamp: new Date().toISOString(),
                    type: 'full-backup',
                    localStorage: { ...localStorage }, 
                    cookies: document.cookie 
                };
                
                // 1. ENCODE DATA (Base64) to prevent tampering/cheating
                const rawJson = JSON.stringify(data);
                const encodedData = btoa(unescape(encodeURIComponent(rawJson)));
                
                // Wrap in a secure object
                const finalFileContent = JSON.stringify({ 
                    version: 2, 
                    protected: true, 
                    payload: encodedData 
                }, null, 2);

                // 1. Try File System Access API (True Overwrite)
                if ('showSaveFilePicker' in window) {
                    try {
                        // Condition: Auto-save OR Manual Quick Save (forceLink)
                        if ((isAuto || forceLink) && fileHandleRef.current) {
                            // Write to existing handle
                            const writable = await fileHandleRef.current.createWritable();
                            await writable.write(finalFileContent);
                            await writable.close();
                            
                            // If it was a manual click, show confirmation
                            if (forceLink) {
                                showModal(`Saved to <b>${saveFileName}</b> successfully!`);
                            }
                            return; 
                        } else if (!isAuto) {
                            // Manual Save - Open Picker (Save As...)
                            const options = {
                                suggestedName: 'starlight_save.json',
                                types: [{
                                    description: 'Starlight Save File',
                                    accept: { 'application/json': ['.json'] },
                                }],
                            };
                            const handle = await window.showSaveFilePicker(options);
                            fileHandleRef.current = handle; // Store handle for future auto-saves
                            setSaveFileName(handle.name); // Update UI with filename

                            const writable = await handle.createWritable();
                            await writable.write(finalFileContent);
                            await writable.close();
                            
                            showModal(`Linked to: <b>${handle.name}</b><br><br>Future auto-saves will overwrite this file automatically every minute.`);
                            return;
                        }
                    } catch (err) {
                        // Ignore AbortError (User cancelled)
                        if (err.name === 'AbortError') return;
                        console.error("FS API Error:", err);
                        
                        // NEW: If this was a background auto-save (isAuto) that failed (e.g. permission denied),
                        // DO NOT fall back to download. This prevents spamming the downloads folder.
                        if (isAuto && fileHandleRef.current) return;
                    }
                }

                // 2. Fallback: Standard Download
                const blob = new Blob([finalFileContent], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                // Force .json extension if not present (though hardcoded here, it guarantees it)
                a.download = 'starlight_save.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                if (!isAuto) showModal("Exported as download!<br><br>Browser may create duplicates like 'starlight_save (1).json' unless you use a browser that supports File System Access (Chrome/Edge on PC).");
            };

            // NEW: Select File Logic (Uses Open Picker instead of Save Picker)
            const handleSelectAutoSaveFile = async () => {
                if ('showOpenFilePicker' in window) {
                    try {
                        // Uses "Open" dialog to pick existing file
                        const [handle] = await window.showOpenFilePicker({
                            types: [{
                                description: 'Starlight Save File',
                                accept: { 'application/json': ['.json'] },
                            }],
                            multiple: false
                        });
                        
                        fileHandleRef.current = handle;
                        setSaveFileName(handle.name);
                        
                        // We trigger an auto-save immediately to establish the write permission
                        // and ensure the file is valid/writable.
                        await handleExportData(true);
                        
                        showModal(`Linked to: <b>${handle.name}</b><br><br>Future auto-saves will overwrite this file.<br><br><span style="color:var(--text-bad);font-size:0.9em;">Warning: This overwrites the selected file with your current data immediately.</span>`);
                    } catch (err) {
                        if (err.name !== 'AbortError') {
                            console.error("File selection failed:", err);
                            showModal("Error selecting file. Your browser might not support this feature.");
                        }
                    }
                } else {
                    showModal("Your browser does not support the File System Access API (needed to link files).<br>Please use Chrome or Edge on Desktop.");
                }
            };

            // UPDATED: Import Logic to handle Full Backups & Base64 Decoding
            const handleImportData = (event) => {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        let parsed = JSON.parse(e.target.result);
                        
                        // DECODE IF PROTECTED
                        if (parsed.protected && parsed.payload) {
                            const decodedJson = decodeURIComponent(escape(atob(parsed.payload)));
                            parsed = JSON.parse(decodedJson);
                        }

                        let store = {};
                        let cookies = "";

                        // Detect format (New Full Backup vs Old Simple JSON)
                        if (parsed.type === 'full-backup' || parsed.localStorage) {
                            store = parsed.localStorage || {};
                            cookies = parsed.cookies || "";
                        } else {
                            // Legacy format support
                            store = parsed;
                        }

                        // 1. Restore LocalStorage
                        Object.keys(store).forEach(key => {
                            localStorage.setItem(key, store[key]);
                        });

                        // 2. Restore Cookies
                        if (cookies) {
                            cookies.split(';').forEach(c => {
                                document.cookie = c.trim() + "; path=/; max-age=31536000"; // Set to expire in 1 year
                            });
                        }

                        showModal("Save loaded successfully! <br>Reloading page to apply changes...");
                        
                        // BYPASS TAB PROTECTION: Signal to settings.js that this exit is intentional
                        if (typeof window.manualExitIntent !== 'undefined') {
                            window.manualExitIntent = true;
                        } else {
                             // Fallback if settings.js isn't loaded yet or variables differ
                             window.manualExitIntent = true; 
                        }

                        setTimeout(() => window.location.replace("/"), 1500);
                    } catch (err) {
                        showModal("Error importing file. The save file might be corrupted or modified.");
                        console.error(err);
                    }
                };
                reader.readAsText(file);
            };

            const reloadGame = () => {
                 if(iframeState.src) {
                                       setGameLoading(true); // Start loading animation

                     // Add timestamp to force reload
                     const url = iframeState.src.split('?')[0];
                     const newSrc = `${url}?t=${Date.now()}`;
                     setIframeState({ ...iframeState, src: newSrc });
                 }
            };

            // MODIFIED: Accepts onIcon and offIcon as arguments
            const renderSwitch = (id, isOn, onClick, onIcon, offIcon) => 
                e('div', { id: id, className: `switch-container ${isOn ? 'switch-on' : ''}`, onClick: onClick },
                    e('div', { className: 'switch-thumb' },
                        // Renders specific icons based on state
                        // Changed color logic: White when ON for better contrast in dark mode
                        e('i', { 
                            className: isOn ? (onIcon || 'fas fa-check') : (offIcon || 'fas fa-times'), 
                            style: { fontSize: '1rem', color: isOn ? '#ffffff' : '#888' } 
                        })
                    )
                );

            // --- TAB CONTENTS ---
            
            // 1. HOME (DASHBOARD)
            const HomeContent = e('div', { id: 'home-content', className: `menu-tab-content ${activeTab === 'home' ? 'active' : ''}` },
                e('div', { className: 'dashboard-container' },
                    e('div', { className: 'hero-section' },
                        e('h2', null, 'Welcome to StarlightGG'),
                        e('div', { id: 'quote-display', className: isQuoteFading ? 'fade-out' : '' }, `"${quote}"`),
                        e('div', { style: { marginTop: '15px', fontWeight: '600', color: 'var(--primary-color)' } }, 
                             `Active Users: ${onlineCount === 0 ? 1 : onlineCount}`
                        )
                    ),
                    e('div', { className: 'card-grid' },
                        e(DashboardCard, { 
                            icon: 'fas fa-gamepad', 
                            title: 'Games', 
                            desc: 'Play 1500+ unblocked games',
                            onClick: () => setActiveTab('embed')
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-tools', 
                            title: 'Utilities', 
                            desc: 'Proxies, Chats, Diagnostics',
                            onClick: () => setActiveTab('links')
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-brain', 
                            title: 'Chatbots', 
                            desc: 'AI Helpers & Assistants',
                            onClick: () => setActiveTab('chatbots')
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-cog', 
                            title: 'Settings', 
                            desc: 'Themes, Cloaking, Privacy',
                            onClick: () => setActiveTab('settings')
                        }),
                         e(DashboardCard, { 
                            icon: 'fas fa-rocket', 
                            title: 'Surf Web', 
                            desc: 'Browse the internet freely',
                            accent: true,
                            onClick: () => {
                                if (!SURF_WEB_ENABLED) {
                                    showModal("This feature has been <b>Disabled by Host</b>.");
                                } else {
                                    // UPDATED: Check for saved server
                                    const lastServer = localStorage.getItem('SURF_LAST_SERVER');
                                    const targetUrl = lastServer || 'pages/surfidle';

                                    openGame(targetUrl, true);
                                    
                                    if (!localStorage.getItem('surfInfoShown')) {
                                        showModal(SURF_INFO_MESSAGE);
                                        localStorage.setItem('surfInfoShown', 'true');
                                    }
                                }
                            }
                        })
                    )
                )
            );

            // 2. GAMES (Embeds)
            const EmbedContent = e('div', { id: 'embed-content', className: `menu-tab-content ${activeTab === 'embed' ? 'active' : ''}` },
                e(PageHeader, { title: 'Games Hub', onBack: () => setActiveTab('home') }),
                
                // Section 1: Starlight Official
                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '20px' } }, 'Starlight Official'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    // Lunaar Lite (Recommended - Moved to Top & Styled Blue)
                    e('button', { 
                        onClick: () => openGame('pages/twilight'),
                        style: { backgroundColor: 'var(--primary-color)', color: 'white' }
                    }, 
                        e('i', { className: 'fas fa-gamepad' }), 'Twilight Games'
                    ),
                    e('button', { onClick: () => openGame('pages/gamesearch') }, 
                        e('i', { className: 'fas fa-gamepad' }), 'StarlightGG Hub'
                    )
                ),

                // Section 2: Third Party Pages
                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '40px' } }, 'Third Party Pages'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    // SlashFlash Added
                    e('button', { onClick: () => openGame('https://amhooman.github.io/website/games/index.html') }, 
                        e('i', { className: 'fas fa-bolt' }), 'SlashFlash'
                    ),
                    e('button', { onClick: () => openGame('https://unblockedgames1024.gitlab.io/') }, 
                        e('i', { className: 'fas fa-unlock' }), 'Unblocked 66'
                    ),
                    e('button', { onClick: () => openGame('https://unicycle-hero.gitlab.io/category/new.html') }, 
                        e('i', { className: 'fab fa-gitlab' }), 'Gitlab Hub'
                    )
                )
            );

// 3. UTILITIES
const LinksContent = e('div', { id: 'links-content', className: `menu-tab-content ${activeTab === 'links' ? 'active' : ''}` },
    e(PageHeader, { title: 'Utilities', onBack: () => setActiveTab('home') }),

    // Section 1: Social
    e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '30px' } }, 'Social'),
    e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
        e('button', { onClick: () => window.open('pages/chat.html') }, e('i', { className: 'fas fa-comments' }), 'Chat'),
        e('button', { onClick: () => openGame('pages/playlist.html') }, e('i', { className: 'fas fa-music' }), 'Playlist'), // Added comma here
        e('button', { onClick: () => openGame('pages/events') }, e('i', { className: 'fas fa-calendar-alt' }), 'Events')
    ),

    // Section 2: System & Tools
    e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '30px' } }, 'System & Tools'),
    e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
        e('button', { onClick: () => openGame('pages/diagnostic') }, e('i', { className: 'fas fa-chart-bar' }), 'Diagnostics'),
        e('button', { onClick: () => window.open('pages/aihelper.html') }, e('i', { className: 'fas fa-robot' }), 'AI Helper'),
        e('button', { onClick: () => window.location.href = 'pages/terms.html' }, e('i', { className: 'fas fa-file-contract' }), 'Terms')
    )
);


            // 4. CHATBOTS (Iframe Logic)
            const ChatbotsContent = e('div', { id: 'chatbots-content', className: `menu-tab-content ${activeTab === 'chatbots' ? 'active' : ''}` },
                e(PageHeader, { title: 'AI Chatbots', onBack: () => setActiveTab('home') },
                    // Refresh Button added as a child of PageHeader
                    e('button', { 
                        onClick: () => {
                            const iframe = document.getElementById('chatbot-iframe');
                            if(iframe) iframe.src = iframe.src;
                        },
                        style: { 
                            background: 'var(--primary-color)', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 15px', 
                            borderRadius: '12px', 
                            cursor: 'pointer', 
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: 'var(--shadow-light-bottom)'
                        }
                    }, e('i', { className: 'fas fa-sync-alt' }), 'Refresh')
                ),
                  // Content wrapper for sizing - Fixed with flex: 1
                e('div', { style: { 
                    width: '100%', 
                    flex: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    marginTop: '10px' // minimal spacing from header
                } },
                    e('iframe', { 
                        id: 'chatbot-iframe', 
                        src: activeTab === 'chatbots' ? 'pages/chatbot' : 'about:blank',
                        // Sandbox: Blocks popups (window.open) but allows everything else
                        sandbox: 'allow-forms allow-scripts allow-same-origin allow-downloads allow-modals allow-presentation allow-pointer-lock',
                        fullscreen: true
                    })
                )
            );

            // 5. SETTINGS (Strict ID Preservation)
            const SettingsContent = e('div', { id: 'settings-content', className: `menu-tab-content ${activeTab === 'settings' ? 'active' : ''}` },
                e(PageHeader, { title: 'Page Settings', onBack: () => setActiveTab('home') }),
                
                e('div', { className: 'settings-container' },
                    
                    // --- CLOAKING SECTION ---
                    e('div', { className: 'settings-group-title' }, 'Cloaking'),
                    e('div', { className: 'settings-item' },
                        e('label', { htmlFor: 'cloak-dropdown' }, 'Cloak Type:'),
                        e('select', { id: 'cloak-dropdown', onChange: applyCloak },
                            e('option', { value: '' }, 'Select Preset...'),
                            PRESETS.map(p => e('option', { value: p.name, key: p.name }, p.name)), 
                            e('option', { value: 'custom' }, 'Custom...'),
                            e('option', { value: 'url-cloak' }, 'URL Cloak...')
                        )
                    ),

                    // Custom Cloak Inputs (Controlled by React State)
                    e('div', { id: 'custom-cloak-options', className: 'settings-item', style: { display: cloakMode === 'custom' ? 'flex' : 'none', flexDirection: 'column' } }, 
                        e('input', { id: 'custom-title-input', type: 'text', placeholder: 'Title' }),
                        e('input', { id: 'custom-favicon-input', type: 'text', placeholder: 'Favicon URL' }),
                        e('input', { id: 'custom-url-input', type: 'text', placeholder: 'Tab Key URL (Redirect)' }), // ADDED
                        e('button', { className: 'settings-btn', onClick: () => applyCloak({target:{value:'custom-apply'}}) }, 'Apply')
                    ),
                    
                    // URL Cloak Inputs (Controlled by React State)
                    e('div', { id: 'url-cloak-options', className: 'settings-item', style: { display: cloakMode === 'url' ? 'flex' : 'none', flexDirection: 'column' } },
                         e('input', { id: 'url-cloak-input', type: 'text', placeholder: 'https://example.com' }),
                         e('button', { className: 'settings-btn', onClick: handleUrlCloak }, 'Fetch & Apply')
                    ),

                    // --- STYLING SECTION ---
                    e('div', { className: 'settings-group-title' }, 'Styling'),
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Theme:'),
                        renderSwitch('theme-toggle-switch', theme === 'dark', toggleTheme, 'fas fa-moon', 'fas fa-sun')
                    ),
                    
                    // ADDED: Gradient Toggle
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Animated Gradient:'),
                        renderSwitch('gradient-toggle-switch', gradientEnabled, () => setGradientEnabled(!gradientEnabled), 'fas fa-palette', 'fas fa-ban')
                    ),

                    e('div', { className: 'settings-item' },
                        e('label', null, 'Background:'),
                        e('select', { id: 'pattern-select', value: pattern, onChange: (e) => setPattern(e.target.value) },
                            e('option', { value: 'lines' }, 'Lines'),
                            e('option', { value: 'dots' }, 'Dots'),
                            e('option', { value: 'stars' }, 'Stars (Default)'),
                            e('option', { value: 'stripes' }, 'Scanlines'),
                            e('option', { value: 'hexagons' }, 'Hexagons'),
                            e('option', { value: 'snow' }, 'Starfall'), 
                            e('option', { value: 'waves' }, 'Waves'),
                            e('option', { value: 'none' }, 'None')
                        )
                    ),
                    
                    // --- GAMEPLAY SECTION ---
                    e('div', { className: 'settings-group-title' }, 'Gameplay'),
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Show Stats:'),
                        renderSwitch('stats-toggle-switch', statsEnabled, () => handleToggle('statsToggleState', statsEnabled, setStatsEnabled), 'fas fa-chart-line', 'fas fa-times')
                    ),
                    e('div', { className: 'settings-item' },
                        e('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                            e('label', null, 'Lag Reducer:'),
                            e('i', { 
                                className: 'fas fa-question-circle', 
                                style: { cursor: 'pointer', opacity: 0.7 },
                                // UPDATED: Info Text to match new logic
                                onClick: () => showModal("<strong>Lag Reducer Protection</strong><br><br>Prevents browser crashes by monitoring performance.<br><br><b>Triggers if:</b><br>1. Browser freezes for > 7.5s.<br>2. Sustained lag (low FPS) for 2.5s.<br><br><b>Action:</b><br>- Exits game immediately.<br>- If still frozen, attempts to close tab.")
                            })
                        ),
                        renderSwitch('lag-reducer-switch', lagReducerEnabled, () => handleToggle('lagReducerState', lagReducerEnabled, setLagReducerEnabled), 'fas fa-tachometer-alt', 'fas fa-times')
                    ),

                    // --- SECURITY SECTION ---
                    e('div', { className: 'settings-group-title' }, 'Security & Privacy'),
                    
                    // Redirect Toggle with Info
                    e('div', { className: 'settings-item' },
                        e('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                            e('label', null, 'Redirect:'),
                            e('i', { 
                                className: 'fas fa-question-circle', 
                                style: { cursor: 'pointer', opacity: 0.7 },
                                onClick: () => showModal("When enabled, switching tabs will instantly redirect this page to a decoy URL (Google) to hide your activity.\n\n If not enabled, the overlay can hide page if state is on, when you go off page, the screen is white, you can click 'E' to show page or anything else besides 'E' to redirect to an decoy page.")
                            })
                        ),
                        renderSwitch('blur-toggle-switch', redirectEnabled, () => handleToggle('redirectToggleState', redirectEnabled, setRedirectEnabled), 'fas fa-location-arrow', 'fas fa-times')
                    ),

                    // Overlay Toggle
                    e('div', { 
                        className: 'settings-item', 
                        style: { display: redirectEnabled ? 'none' : 'flex' }
                    },
                        e('label', null, 'Overlay:'),
                        renderSwitch('overlay-toggle-switch', overlayEnabled, () => handleToggle('overlayToggleState', overlayEnabled, setOverlayEnabled), 'fas fa-eye-slash', 'fas fa-eye')
                    ),

                    // About:Blank Toggle
                    e('div', { className: 'settings-item' },
                        e('label', null, 'About:Blank Popup:'),
                        renderSwitch('about-blank-toggle-switch', aboutBlankEnabled, () => handleToggle('aboutBlankPopupState', aboutBlankEnabled, setAboutBlankEnabled), 'fas fa-external-link-alt', 'fas fa-times')
                    ),

                    // Tab Protection Toggle
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Tab Protection:'),
                        renderSwitch('protection-toggle-switch', tabProtection, () => handleToggle('tabProtectionState', tabProtection, setTabProtection), 'fas fa-shield-alt', 'fas fa-times')
                    ),

                    // --- DATA MANAGEMENT SECTION ---
                    e('div', { className: 'settings-group-title' }, 'Data Management'),
                    
                    // Auto Save Toggle
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Auto-Save:'),
                        renderSwitch('autosave-toggle-switch', autoSaveEnabled, () => handleToggle('autoSaveState', autoSaveEnabled, setAutoSaveEnabled), 'fas fa-save', 'fas fa-times')
                    ),

                    // Save Indicator Toggle
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Show Save Icon:'),
                        renderSwitch('save-indicator-switch', showSaveIndicator, () => handleToggle('showSaveIndicator', showSaveIndicator, setShowSaveIndicator), 'fas fa-eye', 'fas fa-eye-slash')
                    ),

                    e('div', { className: 'settings-item', style: { flexDirection: 'column', gap: '15px' } },
                        
                        // NEW STATIC NOTE (Moved from Modal)
                        e('div', { style: { 
                            background: 'var(--bg-color)', 
                            border: '1px solid var(--line-color)', 
                            borderRadius: '12px', 
                            padding: '15px', 
                            width: '100%',
                            display: 'flex', 
                            gap: '15px', 
                            alignItems: 'flex-start', 
                            textAlign: 'left', 
                            boxShadow: 'var(--shadow-inset-light)'
                        } },
                            e('div', { style: { 
                                background: 'var(--primary-color)', 
                                color: 'white', 
                                borderRadius: '50%', 
                                width: '35px', 
                                height: '35px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                flexShrink: 0, 
                                fontSize: '1.2em' 
                            } }, e('i', { className: 'fas fa-lightbulb' })),
                            e('div', { style: { fontSize: '0.9em', opacity: 0.9 } },
                                e('strong', null, 'Starlight Tip:'), e('br'),
                                'Auto-saves occur every ', e('strong', null, '1 minute'), '.', e('br'),
                                'You must ', e('strong', null, 'Export Full Backup'), ' once to grant permission.', e('br'), e('br'),
                                'If you are on a ', e('strong', null, 'Chromebook'), ', it is recommended to drag \'n drop the file into ', e('strong', null, 'My Drive'), '.', e('br'), e('br'),
                                e('i', { className: 'fas fa-exclamation-triangle', style: { color: 'var(--text-bad)' } }), 
                                ' Works for ', e('span', { style: { color: 'var(--primary-color)', fontWeight: 'bold' } }, 'StarlightGG Official'), ' games only.'
                            )
                        ),

                        // NEW: Filename Display
                        saveFileName && e('div', { 
                            style: { 
                                width: '100%', 
                                textAlign: 'center', 
                                fontSize: '0.9em', 
                                color: 'var(--primary-color)', 
                                fontWeight: 'bold',
                                padding: '5px',
                                background: 'rgba(76, 104, 255, 0.1)',
                                borderRadius: '8px',
                                border: '1px solid var(--primary-color)'
                            } 
                        }, e('i', { className: 'fas fa-link', style: { marginRight: '8px' } }), `Linked: ${saveFileName}`),

                        // NEW: Quick Save Button (Only visible if a file is linked)
                        saveFileName && e('button', { 
                            className: 'settings-btn', 
                            style: { 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '10px',
                                background: 'var(--primary-color)',
                                color: 'white',
                                marginBottom: '5px'
                            },
                            onClick: () => handleExportData({ forceLink: true })
                        }, e('i', { className: 'fas fa-save' }), `Quick Save to ${saveFileName}`),

                        // NEW: Separate Selector Button (Functionally same as Export, but clearer purpose)
                        e('button', { 
                            className: 'settings-btn', 
                            style: { 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '10px',
                                background: 'var(--secondary-bg)', // Different style to distinguish
                                color: 'var(--text-color)',
                                border: '1px solid var(--line-color)'
                            },
                            // UPDATED: Calls the new Open Picker logic
                            onClick: handleSelectAutoSaveFile
                        }, e('i', { className: 'fas fa-file-signature' }), 'Select Save File'),

                        e('button', { 
                            className: 'settings-btn', 
                            style: { width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' },
                            onClick: () => handleExportData(false)
                        }, e('i', { className: 'fas fa-file-export' }), 'Export Full Backup'),
                        
                        e('label', { 
                            className: 'settings-btn', 
                            style: { width: '100%', display: 'flex', justifyContent: 'center', gap: '10px', margin: 0, cursor: 'pointer' } 
                        }, 
                            e('i', { className: 'fas fa-file-import' }), 'Import Save Data',
                            e('input', { 
                                type: 'file', 
                                accept: '.json', 
                                style: { display: 'none' },
                                onChange: handleImportData
                            })
                        )
                    )
                )
            );

            // --- IFRAME OVERLAY (Game View) ---
            const IframeOverlay = e('div', { id: 'iframe-container', style: { display: iframeState.active ? 'flex' : 'none' } },
                e('nav', { id: 'iframe-nav' },
                    // UPDATED: Wrapped text in 'span' so CSS @media query can hide it on mobile
                    e('button', { onClick: exitGame }, e('i', { className: 'fas fa-home' }), e('span', null, ' Home')), 
                    e('button', { onClick: reloadGame }, e('i', { className: 'fas fa-sync-alt' }), e('span', null, ' Reload')),
                    
                    // ADDED: Server Selector & Help Button (Only visible when surfing)
                    iframeState.isSurfing && e('select', { 
                        className: 'server-dropdown',
                        // UPDATED: Strip query strings so dropdown matches even after Reload
                        value: iframeState.src.split('?')[0],
                        onChange: (ev) => {
                             const newUrl = ev.target.value;
                             // Compare against base URL to avoid loops with timestamps
                             if (newUrl && newUrl !== iframeState.src.split('?')[0]) {
                                 setGameLoading(true);
                                 setIframeState(prev => ({ ...prev, src: newUrl }));
                                 // UPDATED: Save selection
                                 localStorage.setItem('SURF_LAST_SERVER', newUrl);
                             }
                        },
                        style: {
                            padding: '8px 12px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'var(--secondary-bg)',
                            color: 'var(--text-color)',
                            boxShadow: 'var(--shadow-light-bottom)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            outline: 'none',
                            maxWidth: '180px'
                        }
                    },
                        e('option', { value: 'pages/surfidle', disabled: true }, 'Select Server...'),
                        PROXY_SERVERS.map(s => e('option', { value: s.url, key: s.name }, s.name))
                    ),

                    iframeState.isSurfing && e('button', { onClick: () => showModal(SURF_INFO_MESSAGE) }, e('i', { className: 'fas fa-question' }), e('span', null, ' Help')),

                    e('button', { onClick: openNewWindow }, e('i', { className: 'fas fa-external-link-alt' }), e('span', null, ' Popout')), 
                    e('button', { onClick: () => document.getElementById('my-iframe').requestFullscreen() }, e('i', { className: 'fas fa-expand' }), e('span', null, ' Fullscreen')), 
                    e('button', { 
                        id: 'footer-toggle', 
                        onClick: () => {
                            const newFooterState = !footerVisible;
                            setFooterVisible(newFooterState);
                            // We do NOT save temporary toggle state to localStorage here if we want it to be transient,
                            // BUT user asked for "remember preference". So we update state, which triggers useEffect save.
                        } 
                    }, 
                        // UPDATED: Added Icon + Span so it works on mobile
                        e('i', { className: footerVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up' }),
                        e('span', null, footerVisible ? ' Hide Footer' : ' Show Footer')
                    ),
                    // Loading Bar Component inside Nav
                    e('div', { className: `iframe-loading-bar ${gameLoading ? 'active' : ''}` })
                ),
                e('iframe', { 
                    id: 'my-iframe', 
                    src: iframeState.src, 
                    allowFullScreen: true,
                    onLoad: () => setGameLoading(false) // Stop loading when done
                })
            );

            // FOOTER DISPLAY LOGIC:
            // 1. Always hide in Chatbots AND Settings.
            // 2. In Game View, respect footerVisible toggle.
            // 3. Everywhere else (Home, etc), show it.
            const shouldShowFooter = activeTab !== 'chatbots' && activeTab !== 'settings' && (activeTab !== 'game-view' || footerVisible);

            return e(React.Fragment, null,
// Loading Screen
e('div', { id: 'loading-screen', className: isLoading ? '' : 'fade-out' },
    e('div', { className: 'loader-circle' }),
    // Added a div wrapper to ensure it breaks to a new line
    e('div', { className: 'loading-text pulse' }, 'Loading Hub...')
),
                // ADDED: Canvas for Hexagonal Particles
                e('canvas', { id: 'bg-canvas', ref: canvasRef }),

                // Main Content Wrapper (Applies Pattern)
                e('div', { id: 'main-menu', 'data-pattern': pattern, style: { display: iframeState.active ? 'none' : 'flex' } },
                    HomeContent,
                    EmbedContent,
                    LinksContent,
                    ChatbotsContent,
                    SettingsContent
                ),

                // Overlays
                IframeOverlay,
                e(Modal, { message: modalState.message, isActive: modalState.isActive, onClose: closeModal }),
                e(PerformanceMonitor, { visible: statsEnabled }),

                // NEW: Auto-Save Indicator
                e('div', { 
                    style: { 
                        position: 'fixed', 
                        top: '20px', 
                        right: '20px', 
                        background: 'var(--card-glass)', 
                        backdropFilter: 'blur(10px)',
                        padding: '10px 20px', 
                        borderRadius: '20px', 
                        display: isSaving ? 'flex' : 'none', 
                        alignItems: 'center', 
                        gap: '10px', 
                        zIndex: 5000,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        border: '1px solid var(--primary-color)',
                        color: 'var(--text-color)',
                        animation: 'fadeUp 0.3s ease-out',
                        pointerEvents: 'none' // Click through
                    } 
                },
                    e('i', { className: 'fas fa-save', style: { color: 'var(--primary-color)' } }),
                    e('span', { style: { fontSize: '0.9em', fontWeight: 'bold' } }, 'Auto-Saving...')
                ),

                // Footer
                e('div', { id: 'bottom-bar', style: { 
                    display: 'flex', 
                    // Move footer down if in game view but visible, or keep centered normally
                    transform: shouldShowFooter 
                        ? 'translateX(-50%) translateY(0)' 
                        : 'translateX(-50%) translateY(200%)' 
                } },
                    e('div', { id: 'footer-time' }, time),
                    e('button', { 
                        id: 'footer-settings-btn', 
                        onClick: () => {
                            // Kick out of iframe if active
                            if (iframeState.active) {
                                setIframeState({ active: false, src: '' });
                                setFooterVisible(true);
                            }
                            setActiveTab('settings');
                        } 
                    }, e('i', { className: 'fas fa-cog' })) // Replaced '⚙️'
                )
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(e(App));


