  
// Suprise, i made this in react!
        const e = React.createElement;
        const { useState, useEffect, useRef } = React;

// --- NEW PRESETS DATA (Custom Names vs Stealth Titles) ---
// replace with ones u want
const PRESETS = [
    { name: "Activate Learning", title: "Activate Learning Digital Platform - Home", favicon: "https://activatelearningdigital.com/webapp/v2/assets/images/favicon.ico", link: "https://activatelearning.com" },
    { name: "Calculator", title: "Calculator", favicon: "https://www.calculator.net/favicon.ico", link: "https://www.calculator.net" },
    { name: "Clever", title: "Clever | Portal", favicon: "https://assets.clever.com/favicon.ico", link: "https://clever.com/oauth/district-picker" },
    { name: "Gallopade", title: "Gallopade: Educational Products, Social Studies Curriculum, Reading, Common Core", favicon: "https://gallopade.com/favicon.ico", link: "https://gallopade.com" },
    { name: "Google (Default Setting)", title: "Google", favicon: "https://google.com/favicon.ico", link: "https://google.com" },
    { name: "Google Classroom", title: "Home - Classroom", favicon: "https://ssl.gstatic.com/classroom/favicon.ico", link: "https://classroom.google.com/h" },
    { name: "Google Docs", title: "Google Docs", favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico", link: "https://docs.google.com" },
    { name: "Google Drive", title: "My Drive - Google Drive", favicon: "https://drive.google.com/favicon.ico", link: "https://drive.google.com" },
    { name: "Google Search", title: "Google Classroom - Google Search", favicon: "https://google.com/favicon.ico", link: "https://www.google.com/search?q=google+classroom" },
    { name: "Google Slides", title: "Google Slides", favicon: "https://ssl.gstatic.com/docs/presentations/images/favicon-2023q4.ico", link: "https://slides.google.com" },
    { name: "iCivics", title: "Home | iCivics", favicon: "https://ed.icivics.org/themes/custom/refresh/favicon.ico", link: "https://www.icivics.org" },
    { name: "IL Classroom", title: "Classes | IL Classroom", favicon: "https://ilclassroom.com/assets/favicons/favicon-183965d592e8285a181f1fbbc66918613f816138dae63e353d0839618e7a8382.ico", link: "https://ilclassroom.com" },
    { name: "Khan Academy", title: "Khan Academy", favicon: "https://www.khanacademy.org/favicon.ico", link: "https://www.khanacademy.org" },
    { name: "Outlook", title: "Outlook Mail", favicon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/microsoft-outlook-icon.png", link: "https://outlook.live.com" },
    { name: "Pear Assessment", title: "Pear Assessment", favicon: "https://cdn.edulastic.com/JS/webresources/images/manifest/pear-icon-256x256.png", link: "https://app.edulastic.com/home/assignments" },
    { name: "StarlightGG (Default Page)", title: "StarlightGG | Free Games!", favicon: "https://starlightgg.github.io/favicon.ico", link: "https://classroom.google.com" },
    { name: "Zearn", title: "Student Home - Zearn", favicon: "https://webassets.zearn.org/assets/zearn_fav_new.png", link: "https://zearn.org" },
    { name: "XanEdu (Sharedbook)", title: "SharedBook", favicon: "https://blog.sharedbook.com/hubfs/favicon.ico", link: "https://www.xanedu.com/" },
    { name: "Prodigy", title: "Prodigy Math | Boost Student Learning & Love of Math", favicon: "https://cdn.prod.website-files.com/67290eb56db5c02dee62db8d/67ad86542f1cda144512a37b_favicon-32x32.png", link: "https://www.prodigygame.com/main-en" },
    { name: "i-Ready", title: "i-Ready Login | Log In to i-Ready Connect", favicon: "https://login.i-ready.com/favicon.ico", link: "https://login.i-ready.com/" }
];
//replace with ones u know works
const PROXY_SERVERS = [
    { name: "DOGE UB", url: "https://dogeub-99127616725.us-west2.run.app" }
,
];
//enable if wanted
const SURF_WEB_ENABLED = false; 
// edit this if wanted (this message is for Doge UB)
const SURF_INFO_MESSAGE = "<b>Welcome to Surf Web!</b><br><br>Use the dropdown menu at the top to switch between proxy servers.<br><br><b>Tips:</b><br>- If a site is blocked, try a different server. (All may be blocked, sorry)";

        // --- MODAL COMPONENT ---
        const Modal = ({ message, isActive, onClose }) => {
            return e('div', { id: 'custom-modal', className: `modal-overlay ${isActive ? 'active' : ''}`, onClick: (ev) => { if(ev.target.id === 'custom-modal') onClose(); } },
                e('div', { className: 'modal-content' },
                    e('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' } },
                        e('h3', { id: 'modal-title' }, 'Notification'),
                        e('button', { onClick: onClose, style: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2em', color: 'var(--text-color)' } }, 
                            e('i', { className: 'fas fa-times' })
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
            const [pos, setPos] = useState({ bottom: 20, right: 20 });
            const lastTouchTime = useRef(0);
            
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

            const getColor = (val) => {
                if (val >= 50) return 'text-good';
                if (val >= 30) return 'text-medium';
                return 'text-bad';
            };

            const getPingColor = (val) => {
                if (val === 'Err') return 'text-bad';
                if (val < 100) return 'text-good';
                if (val < 200) return 'text-medium';
                return 'text-bad';
            };

            const handleStart = (e) => {
                const isTouch = e.type === 'touchstart';

                if (isTouch) {
                    lastTouchTime.current = Date.now();
                } else {
                    if (Date.now() - lastTouchTime.current < 500) return;
                    e.preventDefault();
                }
                
                const clientX = isTouch ? e.touches[0].clientX : e.clientX;
                const clientY = isTouch ? e.touches[0].clientY : e.clientY;
                
                const startX = clientX;
                const startY = clientY;
                const startRight = pos.right;
                const startBottom = pos.bottom;
                
                let hasMoved = false;

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
                        if (moveEvent.cancelable) moveEvent.preventDefault();

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

            let modalBottom = pos.bottom + 40; 
            let modalRight = pos.right;       
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
                    onTouchStart: handleStart,
                    style: { bottom: `${pos.bottom}px`, right: `${pos.right}px` }
                }, e('i', { className: 'fas fa-info', style: { fontSize: '0.9rem' } })) 
            );
        };

        // --- DASHBOARD CARD COMPONENT ---
        const DashboardCard = ({ icon, title, desc, onClick, accent, animate }) => {
            return e('div', { 
                className: `dashboard-card ${accent ? 'card-accent' : ''} ${animate ? 'card-animate' : ''}`, 
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
                e('div', { style: { display: 'flex', gap: '10px' } }, children)
            );
        };

        // --- MAIN APP COMPONENT ---
        const App = () => {
            // State
            const [isLoading, setIsLoading] = useState(true);
            const [cardsAnimated, setCardsAnimated] = useState(false);
            const [activeTab, setActiveTab] = useState('home');
            const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
            const [pattern, setPattern] = useState(localStorage.getItem('pattern') || 'stars');
            const [gradientEnabled, setGradientEnabled] = useState(() => localStorage.getItem('gradientEnabled') !== 'false');
            
            const [modalState, setModalState] = useState({ isActive: false, message: '' });
            const [time, setTime] = useState('');
            const [onlineCount, setOnlineCount] = useState('Loading...');
            const [quote, setQuote] = useState('Loading quote...');
            const [isQuoteFading, setIsQuoteFading] = useState(false);
            
            const [footerVisible, setFooterVisible] = useState(() => localStorage.getItem('footerVisible') === 'true');
            const [tabProtection, setTabProtection] = useState(() => localStorage.getItem('tabProtectionState') === 'true');
            const [redirectEnabled, setRedirectEnabled] = useState(() => localStorage.getItem('redirectToggleState') === 'true');
            const [overlayEnabled, setOverlayEnabled] = useState(() => localStorage.getItem('overlayToggleState') === 'true');
            const [aboutBlankEnabled, setAboutBlankEnabled] = useState(() => localStorage.getItem('aboutBlankPopupState') === 'true');
            const [statsEnabled, setStatsEnabled] = useState(() => localStorage.getItem('statsToggleState') === 'true');
            const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => localStorage.getItem('autoSaveState') === 'true');
            const [showSaveIndicator, setShowSaveIndicator] = useState(() => localStorage.getItem('showSaveIndicator') !== 'false');
            const [lagReducerEnabled, setLagReducerEnabled] = useState(() => localStorage.getItem('lagReducerState') === 'true');
            
            const [saveFileName, setSaveFileName] = useState(null);
            const [isSaving, setIsSaving] = useState(false);
            const [gameLoading, setGameLoading] = useState(false);
            const [cloakMode, setCloakMode] = useState('');
            const [iframeState, setIframeState] = useState({ active: false, src: '' });
            
            const canvasRef = useRef(null);
            const mousePos = useRef({ x: 0, y: 0 });
            const fileHandleRef = useRef(null);

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

            // Trigger card animation after loading
            useEffect(() => {
                if (!isLoading) {
                    setTimeout(() => {
                        setCardsAnimated(true);
                    }, 1750);
                }
            }, [isLoading]);

            // Reset animation when returning to home
            useEffect(() => {
                if (activeTab === 'home') {

                        setCardsAnimated(true);
                }
            }, [activeTab]);

            useEffect(() => {
                document.documentElement.setAttribute('data-theme', theme);

                const isCloaked = localStorage.getItem('isCloaked') === 'true';
                const targetElement = document.getElementById('Dbclick');

                if (isCloaked && targetElement) {
                    targetElement.remove(); 
                }

                setTimeout(() => {
                    const storedTitle = localStorage.getItem('customPageTitle');
                    const storedFavicon = localStorage.getItem('customFaviconURL');

                    if (isCloaked) {
                        document.title = storedTitle || "Google";
                        updateFavicon(storedFavicon || "https://google.com/favicon.ico");
                    } else {
                        const activeElement = document.getElementById('Dbclick');
                        if (activeElement) {
                            const dismissCloak = function() {
                                this.style.transform = 'scale(0.95)';
                                this.style.transition = 'transform 0.2s ease';
                                
                                setTimeout(() => {
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
                                }, 100);
                            };
                            
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

                let quoteInterval;
                fetch('txt/quotes.txt').then(r => r.text()).then(t => {
                    const allQuotes = t.split('\n').filter(l => l.trim());
                    if (allQuotes.length === 0) return setQuote('Welcome to StarlightGG');

                    let currentPool = [...allQuotes];

                    const rotate = () => {
                        setIsQuoteFading(true);

                        setTimeout(() => {
                            if (currentPool.length === 0) currentPool = [...allQuotes];
                            const randomIndex = Math.floor(Math.random() * currentPool.length);
                            setQuote(currentPool[randomIndex]);
                            currentPool.splice(randomIndex, 1);
                            setIsQuoteFading(false);
                        }, 500);
                    };

                    rotate();
                    quoteInterval = setInterval(rotate, 5000);
                }).catch(() => setQuote('Welcome to StarlightGG'));

                return () => {
                    clearInterval(timer);
                    if (quoteInterval) clearInterval(quoteInterval);
                };
            }, []);
            
            useEffect(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                
                if (pattern !== 'hexagons' && pattern !== 'snow' && pattern !== 'waves' ) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    return;
                }

                const ctx = canvas.getContext('2d');
                let width, height;
                let particles = [];
                let animationFrameId;
                
                let currentScale = 0.3;
                let targetScale = 1.0;

                const resize = () => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                };
                window.addEventListener('resize', resize);
                resize();

                class Hexagon {
                    constructor() {
                        this.init();
                    }
                    init() {
                        this.x = Math.random() * width;
                        this.y = Math.random() * height;
                        this.size = Math.random() * 2 + 1; 
                        this.angle = Math.random() * Math.PI * 2;
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
                        this.x += this.vx;
                        this.y += this.vy;

                        if (this.x > width + 50) this.x = -50;
                        if (this.x < -50) this.x = width + 50;
                        if (this.y > height + 50) this.y = -50;
                        if (this.y < -50) this.y = height + 50;
                    }
                }

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
                        this.x += Math.sin(this.y * 0.02) * 0.5; 

                        if (this.y > height + 20) {
                            this.y = -20;
                            this.x = Math.random() * width;
                            this.history = [];
                        }
                    }
                }

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

                const animate = () => {
                    ctx.clearRect(0, 0, width, height);
                    
                    if (currentScale < targetScale) {
                        currentScale += (targetScale - currentScale) * 0.15; 
                    }
                    
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

                    ctx.restore();
                    animationFrameId = requestAnimationFrame(animate);
                };
                animate();

                return () => {
                    window.removeEventListener('resize', resize);
                    cancelAnimationFrame(animationFrameId);
                };
            }, [theme, pattern]); 

            useEffect(() => {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }, [theme]);

            useEffect(() => {
                document.body.setAttribute('data-gradient', gradientEnabled);
                localStorage.setItem('gradientEnabled', gradientEnabled);
            }, [gradientEnabled]);

            useEffect(() => {
                localStorage.setItem('pattern', pattern);
                
                const menu = document.getElementById('main-menu');
                if (menu) {
                    const isCssPattern = ['lines', 'dots', 'stars', 'stripes'].includes(pattern);

                    if (isCssPattern) {
                        menu.style.transition = 'none';
                        if (pattern =="stars"){
                            menu.style.backgroundSize = '150px 150px'; 
                        }else{
                            menu.style.backgroundSize = '30px 30px'; 
                        }
                        
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                menu.style.transition = 'background-size 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
                                menu.style.backgroundSize = '';
                            });
                        });
                    } else {
                        menu.style.backgroundSize = '';
                        menu.style.transition = 'none';
                    }
                }
            }, [pattern]);

            useEffect(() => {
                localStorage.setItem('footerVisible', footerVisible.toString());
            }, [footerVisible]);

            useEffect(() => {
                if (activeTab === 'chatbots') {
                    const key = 'chatbot_advisory_shown';
                    if (!localStorage.getItem(key)) {
                        showModal("If you are using AI and it isnt getting recent resources, use either chatgpt or compound for web search.<br><br>Please always wait patiently when loading chatbot.");
                        localStorage.setItem(key, 'true');
                    }
                }
            }, [activeTab]);

            useEffect(() => {
                const fetchKeysAndInit = async () => {
                    if (!window.PubNub) return;
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

            const handleToggle = (key, currentState, setter) => {
                const newState = !currentState;
                if (key=="aboutBlankPopupState" && currentState == true){
                    showModal("This feature is recommended to be on so GoGuardian or any third party apps cannot see your screen!");
                }
                setter(newState);
                localStorage.setItem(key, newState.toString());
            };

            const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
            
            const openGame = (url, isSurfing = false) => {
                setGameLoading(true);
                setIframeState({ active: true, src: url, isSurfing });
                setActiveTab('game-view');
            };
            
            const openIframe = (url) => {
                setGameLoading(true);
                setIframeState({ active: true, src: url, isSurfing: false });
                setActiveTab('game-view');
            };
            
            const exitGame = () => {
                setIframeState({ active: false, src: '' });
                setActiveTab('home');
            };

            useEffect(() => {
                if (!lagReducerEnabled) return;
                
                let lastTime = Date.now();
                let lagAccumulator = 0; 

                const handleVisibilityChange = () => {
                    if (document.visibilityState === 'visible') {
                        lastTime = Date.now();
                        lagAccumulator = 0;
                    }
                };
                document.addEventListener('visibilitychange', handleVisibilityChange);

                const intervalId = setInterval(() => {
                    const now = Date.now();
                    const elapsed = now - lastTime;
                    lastTime = now;

                    if (gameLoading) {
                        lagAccumulator = 0;
                        return;
                    }

                    if (document.visibilityState === 'visible') {
                        
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

                        if (elapsed > 750) {
                            lagAccumulator += elapsed;
                            
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
                            lagAccumulator = Math.max(0, lagAccumulator - 500);
                        }
                    } else {
                        lagAccumulator = 0;
                    }
                }, 500);

                return () => {
                    clearInterval(intervalId);
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                };
            }, [lagReducerEnabled, iframeState.active, gameLoading]);

            const handleUrlCloak = async () => {
                const urlInput = document.getElementById('url-cloak-input').value;
                if (!urlInput) return showModal("Please enter a URL!");
                
                const targetUrl = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;

                showModal("Fetching cloak data... (This may take a moment)");
                
                try {
                    let domain;
                    try {
                        const u = new URL(targetUrl);
                        domain = u.hostname;
                    } catch { domain = targetUrl; }
                    const favicon = `https://www.google.com/s2/favicons?domain=${targetUrl}&sz=64`;

                    const proxyUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    const htmlText = await response.text();
                    const titleMatch = htmlText.match(/<title\b[^>]*>([^<]*?)<\/title>/i);
                    const fetchedTitle = titleMatch ? titleMatch[1].trim() : domain;

                    document.title = fetchedTitle;
                    updateFavicon(favicon);
                    
                    localStorage.setItem('customPageTitle', fetchedTitle);
                    localStorage.setItem('customFaviconURL', favicon);
                    localStorage.setItem('LINKTAB_KEY', targetUrl);
                    
                    showModal(`Cloaked successfully!<br><br><b>Title:</b> ${fetchedTitle}<br><b>Favicon:</b> ${favicon}<br><br>If this information is incorrect, please use the <b>Custom Cloak</b> mode instead.`);
                } catch (error) {
                    console.error(error);
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
                    const customTitle = document.getElementById('custom-title-input').value.trim();
                    const customFavicon = document.getElementById('custom-favicon-input').value.trim();
                    const customUrl = document.getElementById('custom-url-input').value.trim();

                    if (!customTitle && !customFavicon && !customUrl) {
                        return showModal("Please fill out at least one field to apply settings.");
                    }

                    if (customUrl) {
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
                    setCloakMode(''); 
                    
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
                    <html><script src="global.js"><\/script><head><title>${title}</title>
                    ${favicon ? `<link rel="icon" href="${favicon}">` : ''}
                    <style>body{margin:0;overflow:hidden;}iframe{width:100vw;height:100vh;border:none;}</style>
                    </head><body><iframe src="${iframeState.src}"    sandbox= 'allow-scripts allow-top-navigation allow-forms allow-same-origin allow-pointer-lock allow-modals allow-orientation-lock allow-presentation'
></iframe></body></html>
                 `);
                 win.document.close();
            };
            
            useEffect(() => {
                let interval;
                if (autoSaveEnabled) {
                    interval = setInterval(() => {
                        handleExportData(true);
                    }, 25000);
                }
                return () => clearInterval(interval);
            }, [autoSaveEnabled]);

            const handleExportData = async (arg = false) => {
                const isAuto = typeof arg === 'boolean' ? arg : (arg.isAuto || false);
                const forceLink = typeof arg === 'object' && arg.forceLink;

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
                
                const rawJson = JSON.stringify(data);
                const encodedData = btoa(unescape(encodeURIComponent(rawJson)));
                
                const finalFileContent = JSON.stringify({ 
                    version: 2, 
                    protected: true, 
                    payload: encodedData 
                }, null, 2);

                if ('showSaveFilePicker' in window) {
                    try {
                        if ((isAuto || forceLink) && fileHandleRef.current) {
                            const writable = await fileHandleRef.current.createWritable();
                            await writable.write(finalFileContent);
                            await writable.close();
                            
                            if (forceLink) {
                                showModal(`Saved to <b>${saveFileName}</b> successfully!`);
                            }
                            return; 
                        } else if (!isAuto) {
                            const options = {
                                suggestedName: 'starlight_save.json',
                                types: [{
                                    description: 'Starlight Save File',
                                    accept: { 'application/json': ['.json'] },
                                }],
                            };
                            const handle = await window.showSaveFilePicker(options);
                            fileHandleRef.current = handle;
                            setSaveFileName(handle.name);

                            const writable = await handle.createWritable();
                            await writable.write(finalFileContent);
                            await writable.close();
                            
                            showModal(`Linked to: <b>${handle.name}</b><br><br>Future auto-saves will overwrite this file automatically every minute.`);
                            return;
                        }
                    } catch (err) {
                        if (err.name === 'AbortError') return;
                        console.error("FS API Error:", err);
                        
                        if (isAuto && fileHandleRef.current) return;
                    }
                }

                const blob = new Blob([finalFileContent], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'starlight_save.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                if (!isAuto) showModal("Exported as download!<br><br>Browser may create duplicates like 'starlight_save (1).json' unless you use a browser that supports File System Access (Chrome/Edge on PC).");
            };

            const handleSelectAutoSaveFile = async () => {
                if ('showOpenFilePicker' in window) {
                    try {
                        const [handle] = await window.showOpenFilePicker({
                            types: [{
                                description: 'Starlight Save File',
                                accept: { 'application/json': ['.json'] },
                            }],
                            multiple: false
                        });
                        
                        fileHandleRef.current = handle;
                        setSaveFileName(handle.name);
                        
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

            const handleImportData = (event) => {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        let parsed = JSON.parse(e.target.result);
                        
                        if (parsed.protected && parsed.payload) {
                            const decodedJson = decodeURIComponent(escape(atob(parsed.payload)));
                            parsed = JSON.parse(decodedJson);
                        }

                        let store = {};
                        let cookies = "";

                        if (parsed.type === 'full-backup' || parsed.localStorage) {
                            store = parsed.localStorage || {};
                            cookies = parsed.cookies || "";
                        } else {
                            store = parsed;
                        }

                        Object.keys(store).forEach(key => {
                            localStorage.setItem(key, store[key]);
                        });

                        if (cookies) {
                            cookies.split(';').forEach(c => {
                                document.cookie = c.trim() + "; path=/; max-age=31536000";
                            });
                        }

                        showModal("Save loaded successfully! <br>Reloading page to apply changes...");
                        
                        if (typeof window.manualExitIntent !== 'undefined') {
                            window.manualExitIntent = true;
                        } else {
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
                     setGameLoading(true);
                     const url = iframeState.src.split('?')[0];
                     const newSrc = `${url}?t=${Date.now()}`;
                     setIframeState({ ...iframeState, src: newSrc });
                 }
            };

            const renderSwitch = (id, isOn, onClick, onIcon, offIcon) => 
                e('div', { id: id, className: `switch-container ${isOn ? 'switch-on' : ''}`, onClick: onClick },
                    e('div', { className: 'switch-thumb' },
                        e('i', { 
                            className: isOn ? (onIcon || 'fas fa-check') : (offIcon || 'fas fa-times'), 
                            style: { fontSize: '1rem', color: isOn ? '#ffffff' : '#888' } 
                        })
                    )
                );

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
                            onClick: () => setActiveTab('embed'),
                            animate: cardsAnimated
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-tools', 
                            title: 'Utilities', 
                            desc: 'Proxies, Chats, Diagnostics',
                            onClick: () => setActiveTab('links'),
                            animate: cardsAnimated
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-brain', 
                            title: 'Chatbots', 
                            desc: 'AI Helpers & Assistants',
                            onClick: () => setActiveTab('chatbots'),
                            animate: cardsAnimated
                        }),
                        e(DashboardCard, { 
                            icon: 'fas fa-cog', 
                            title: 'Settings', 
                            desc: 'Themes, Cloaking, Privacy',
                            onClick: () => setActiveTab('settings'),
                            animate: cardsAnimated
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
                                    const lastServer = localStorage.getItem('SURF_LAST_SERVER');
                                    const targetUrl = lastServer || 'pages/surfidle';
                                    openGame(targetUrl, true);
                                    
                                    if (!localStorage.getItem('surfInfoShown')) {
                                        showModal(SURF_INFO_MESSAGE);
                                        localStorage.setItem('surfInfoShown', 'true');
                                    }
                                }
                            },
                            animate: cardsAnimated
                        })
                    )
                )
            );

            const EmbedContent = e('div', { id: 'embed-content', className: `menu-tab-content ${activeTab === 'embed' ? 'active' : ''}` },
                e(PageHeader, { title: 'Games Hub', onBack: () => setActiveTab('home') }),
                
                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '20px' } }, 'Starlight Official'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    e('button', { 
                        onClick: () => showModal('Please use Nova Hub as this hub is down, sorry for the inconvenience'),//openGame('pages/twilight'),
                        style: { backgroundColor: 'var(--primary-color)', color: 'white' }
                    }, 
                        e('i', { className: 'fas fa-gamepad' }), 'Twilight Games'
                    ),
                    e('button', { onClick: () => openGame('pages/gamesearch') }, 
                        e('i', { className: 'fas fa-gamepad' }), 'Nova Hub'
                    )
                ),

                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '40px' } }, 'Third Party Pages'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
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

            const LinksContent = e('div', { id: 'links-content', className: `menu-tab-content ${activeTab === 'links' ? 'active' : ''}` },
                e(PageHeader, { title: 'Utilities', onBack: () => setActiveTab('home') }),

                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '30px' } }, 'Social'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    e('button', { onClick: () => window.open('pages/chat.html') }, e('i', { className: 'fas fa-comments' }), 'Chat'),
                    e('button', { onClick: () => openGame('pages/playlist.html') }, e('i', { className: 'fas fa-music' }), 'Playlist'),
                    e('button', { onClick: () => openGame('pages/events') }, e('i', { className: 'fas fa-calendar-alt' }), 'Events')
                ),

                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '30px' } }, 'System & Tools'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    e('button', { onClick: () => openGame('pages/diagnostic') }, e('i', { className: 'fas fa-chart-bar' }), 'Diagnostics'),
                    e('button', { onClick: () => window.open('pages/aihelper.html') }, e('i', { className: 'fas fa-robot' }), 'AI Helper'),
                    e('button', { onClick: () => window.location.href = 'pages/terms.html' }, e('i', { className: 'fas fa-file-contract' }), 'Terms')
                )
            );

            const ChatbotsContent = e('div', { id: 'chatbots-content', className: `menu-tab-content ${activeTab === 'chatbots' ? 'active' : ''}` },
                e(PageHeader, { title: 'AI Chatbots', onBack: () => setActiveTab('home') }),
                
                e('div', { className: 'settings-group-title', style: { width: '90%', maxWidth: '800px', marginTop: '20px' } }, 'AI Tools'),
                e('div', { className: 'menu-buttons', style: { marginTop: '10px' } },
                    e('button', { 
                        onClick: () => openIframe('pages/chatbot'),
                        style: { backgroundColor: 'var(--primary-color)', color: 'white' }
                    }, 
                        e('i', { className: 'fas fa-robot' }), 'Chatbot'
                    ),
                    e('button', { onClick: () => openIframe('pages/detector') }, 
                        e('i', { className: 'fas fa-search' }), 'Anti-Plagiarism'
                    )
                )
            );

            const SettingsContent = e('div', { id: 'settings-content', className: `menu-tab-content ${activeTab === 'settings' ? 'active' : ''}` },
                e(PageHeader, { title: 'Page Settings', onBack: () => setActiveTab('home') }),
                
                e('div', { className: 'settings-container' },
                    
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

                    e('div', { id: 'custom-cloak-options', className: 'settings-item', style: { display: cloakMode === 'custom' ? 'flex' : 'none', flexDirection: 'column' } }, 
                        e('input', { id: 'custom-title-input', type: 'text', placeholder: 'Title' }),
                        e('input', { id: 'custom-favicon-input', type: 'text', placeholder: 'Favicon URL' }),
                        e('input', { id: 'custom-url-input', type: 'text', placeholder: 'Tab Key URL (Redirect)' }),
                        e('button', { className: 'settings-btn', onClick: () => applyCloak({target:{value:'custom-apply'}}) }, 'Apply')
                    ),
                    
                    e('div', { id: 'url-cloak-options', className: 'settings-item', style: { display: cloakMode === 'url' ? 'flex' : 'none', flexDirection: 'column' } },
                         e('input', { id: 'url-cloak-input', type: 'text', placeholder: 'https://example.com' }),
                         e('button', { className: 'settings-btn', onClick: handleUrlCloak }, 'Fetch & Apply')
                    ),

                    e('div', { className: 'settings-group-title' }, 'Styling'),
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Theme:'),
                        renderSwitch('theme-toggle-switch', theme === 'dark', toggleTheme, 'fas fa-moon', 'fas fa-sun')
                    ),
                    
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
                                onClick: () => showModal("<strong>Lag Reducer Protection</strong><br><br>Prevents browser crashes by monitoring performance.<br><br><b>Triggers if:</b><br>1. Browser freezes for > 7.5s.<br>2. Sustained lag (low FPS) for 2.5s.<br><br><b>Action:</b><br>- Exits game immediately.<br>- If still frozen, attempts to close tab.")
                            })
                        ),
                        renderSwitch('lag-reducer-switch', lagReducerEnabled, () => handleToggle('lagReducerState', lagReducerEnabled, setLagReducerEnabled), 'fas fa-tachometer-alt', 'fas fa-times')
                    ),

                    e('div', { className: 'settings-group-title' }, 'Security & Privacy'),
                    
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

                    e('div', { 
                        className: 'settings-item', 
                        style: { display: redirectEnabled ? 'none' : 'flex' }
                    },
                        e('label', null, 'Overlay:'),
                        renderSwitch('overlay-toggle-switch', overlayEnabled, () => handleToggle('overlayToggleState', overlayEnabled, setOverlayEnabled), 'fas fa-eye-slash', 'fas fa-eye')
                    ),

                    e('div', { className: 'settings-item' },
                        e('label', null, 'About:Blank Popup:'),
                        renderSwitch('about-blank-toggle-switch', aboutBlankEnabled, () => handleToggle('aboutBlankPopupState', aboutBlankEnabled, setAboutBlankEnabled), 'fas fa-external-link-alt', 'fas fa-times')
                    ),

                    e('div', { className: 'settings-item' },
                        e('label', null, 'Tab Protection:'),
                        renderSwitch('protection-toggle-switch', tabProtection, () => handleToggle('tabProtectionState', tabProtection, setTabProtection), 'fas fa-shield-alt', 'fas fa-times')
                    ),

                    e('div', { className: 'settings-group-title' }, 'Data Management'),
                    
                    e('div', { className: 'settings-item' },
                        e('label', null, 'Auto-Save:'),
                        renderSwitch('autosave-toggle-switch', autoSaveEnabled, () => handleToggle('autoSaveState', autoSaveEnabled, setAutoSaveEnabled), 'fas fa-save', 'fas fa-times')
                    ),

                    e('div', { className: 'settings-item' },
                        e('label', null, 'Show Save Icon:'),
                        renderSwitch('save-indicator-switch', showSaveIndicator, () => handleToggle('showSaveIndicator', showSaveIndicator, setShowSaveIndicator), 'fas fa-eye', 'fas fa-eye-slash')
                    ),

                    e('div', { className: 'settings-item', style: { flexDirection: 'column', gap: '15px' } },
                        
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
                                'Auto-saves occur every ', e('strong', null,'25 seconds'), '.', e('br'),
                                'You must ', e('strong', null, 'Export Full Backup'), ' once to grant permission.', e('br'), e('br'),
                                'If you are on a ', e('strong', null, 'Chromebook'), ', it is recommended to drag \'n drop the file into ', e('strong', null, 'My Drive'), '.', e('br'), e('br'),
                                e('i', { className: 'fas fa-exclamation-triangle', style: { color: 'var(--text-bad)' } }), 
                                ' Works for ', e('span', { style: { color: 'var(--primary-color)', fontWeight: 'bold' } }, 'StarlightGG Official'), ' games only.'
                            )
                        ),

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

                        e('button', { 
                            className: 'settings-btn', 
                            style: { 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '10px',
                                background: 'var(--secondary-bg)',
                                color: 'var(--text-color)',
                                border: '1px solid var(--line-color)'
                            },
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

            const IframeOverlay = e('div', { id: 'iframe-container', style: { display: iframeState.active ? 'flex' : 'none' } },
                e('nav', { id: 'iframe-nav' },
                    e('button', { onClick: exitGame }, e('i', { className: 'fas fa-home' }), e('span', null, ' Home')), 
                    e('button', { onClick: reloadGame }, e('i', { className: 'fas fa-sync-alt' }), e('span', null, ' Reload')),
                    
                    iframeState.isSurfing && e('select', { 
                        className: 'server-dropdown',
                        value: iframeState.src.split('?')[0],
                        onChange: (ev) => {
                             const newUrl = ev.target.value;
                             if (newUrl && newUrl !== iframeState.src.split('?')[0]) {
                                 setGameLoading(true);
                                 setIframeState(prev => ({ ...prev, src: newUrl }));
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
                        } 
                    }, 
                        e('i', { className: footerVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up' }),
                        e('span', null, footerVisible ? ' Hide Footer' : ' Show Footer')
                    ),
                    e('div', { className: `iframe-loading-bar ${gameLoading ? 'active' : ''}` })
                ),
                e('iframe', { 
                    id: 'my-iframe', 
                    src: iframeState.src, 
                    allowFullScreen: true,
                    onLoad: () => setGameLoading(false),
                      sandbox: 'allow-scripts allow-top-navigation allow-forms allow-same-origin allow-pointer-lock allow-modals allow-orientation-lock allow-presentation'

                })
            );

            const shouldShowFooter = activeTab !== 'settings' && (activeTab !== 'game-view' || footerVisible);

            return e(React.Fragment, null,
                e('div', { id: 'loading-screen', className: isLoading ? '' : 'fade-out' },
                    e('div', { className: 'loader-circle' }),
                    e('div', { className: 'loading-text pulse' }, 'Loading Hub...')
                ),
                e('canvas', { id: 'bg-canvas', ref: canvasRef }),
                e('div', { id: 'main-menu', 'data-pattern': pattern, style: { display: iframeState.active ? 'none' : 'flex' } },
                    HomeContent,
                    EmbedContent,
                    LinksContent,
                    ChatbotsContent,
                    SettingsContent
                ),
                IframeOverlay,
                e(Modal, { message: modalState.message, isActive: modalState.isActive, onClose: closeModal }),
                e(PerformanceMonitor, { visible: statsEnabled }),
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
                        pointerEvents: 'none'
                    } 
                },
                    e('i', { className: 'fas fa-save', style: { color: 'var(--primary-color)' } }),
                    e('span', { style: { fontSize: '0.9em', fontWeight: 'bold' } }, 'Auto-Saving...')
                ),
                e('div', { id: 'bottom-bar', style: { 
                    display: 'flex', 
                    transform: shouldShowFooter 
                        ? 'translateX(-50%) translateY(0)' 
                        : 'translateX(-50%) translateY(200%)' 
                } },
                    e('div', { id: 'footer-time' }, time),
                    e('button', { 
                        id: 'footer-settings-btn', 
                        onClick: () => {
                            if (iframeState.active) {
                                setIframeState({ active: false, src: '' });
                                setFooterVisible(true);
                            }
                            setActiveTab('settings');
                        } 
                    }, e('i', { className: 'fas fa-cog' }))
                )
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(e(App));

