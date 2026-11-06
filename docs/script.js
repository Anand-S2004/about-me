/**
 * Portfolio Interactive Controller
 * Handles Spotlight card hover tracking, Decrypted Text scramble effect,
 * Filter logic, BibTeX modals, toast alerts, and navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSpotlightTracking();
    initDecryptedText();
    initProjectFiltering();
    initBibtexModals();
    initMobileNav();
    initEmailCopy();
    initCanvasModeToggle();
});

// 1. Spotlight Card Mouse Tracking (ReactBits style)
function initSpotlightTracking() {
    const cards = document.querySelectorAll('.spotlight-card');
    
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 2. Decrypted / Scrambled Text Effect (ReactBits style)
function initDecryptedText() {
    const glyphs = '01#%&*+<>~§±ΞΨΩαβγλπστφψω';
    const scrambleElements = document.querySelectorAll('.decrypted-text');

    scrambleElements.forEach(el => {
        const originalText = el.getAttribute('data-text') || el.textContent.trim();
        el.setAttribute('data-text', originalText);

        let interval = null;

        el.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(interval);

            interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return glyphs[Math.floor(Math.random() * glyphs.length)];
                    })
                    .join('');

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 2;
            }, 25);
        });
    });
}

// 3. Project Filter System
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category') || '';
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

// 4. BibTeX Modal & Copy to Clipboard
function initBibtexModals() {
    const modal = document.getElementById('bibtex-modal');
    const modalContent = document.getElementById('bibtex-code');
    const closeBtn = document.getElementById('close-bibtex-modal');
    const copyBtn = document.getElementById('copy-bibtex-btn');

    if (!modal) return;

    document.querySelectorAll('.open-bibtex-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const bibtex = btn.getAttribute('data-bibtex');
            if (modalContent) modalContent.textContent = bibtex;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (copyBtn && modalContent) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(modalContent.textContent).then(() => {
                showToast('BibTeX copied to clipboard!');
            });
        });
    }
}

// 5. Toast Notification System
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 border border-indigo-400 transition-all duration-300 transform translate-y-12 opacity-0';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <svg class="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
    `;
    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-12', 'opacity-0');
    }, 2800);
}

// 6. Email Copy Pill
function initEmailCopy() {
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email') || 'anandsr@cs.unc.edu';
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`);
            });
        });
    });
}

// 7. Canvas Background Mode Switcher (Celestial vs Vector Flow)
function initCanvasModeToggle() {
    const toggleBtn = document.getElementById('toggle-canvas-mode');
    if (!toggleBtn) return;

    let isCelestial = true;
    toggleBtn.addEventListener('click', () => {
        isCelestial = !isCelestial;
        if (window.bgCanvas) {
            window.bgCanvas.setMode(isCelestial ? 'celestial' : 'vectorflow');
        }
        toggleBtn.innerHTML = isCelestial 
            ? `<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Celestial Foliation (Milky Way)`
            : `<span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span> Vector Flow (Optimal Transport)`;
        showToast(isCelestial ? 'Switched to Celestial Foliation mode' : 'Switched to Optimal Transport Vector Field mode');
    });
}

// 8. Mobile Navigation Drawer
function initMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (!menuBtn || !mobileDrawer) return;

    menuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.add('hidden');
        });
    });
}

