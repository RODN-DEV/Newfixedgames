/**
 * script.js
 * Contains application logic, authentication, event listeners, and the main router.
 * It uses the rendering functions defined in views.js.
 */

// --- DOM Element References ---
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');
const contentDiv = document.getElementById('content');
const passwordModal = document.getElementById('password-modal');
const passwordInput = document.getElementById('password-input');
const submitPasswordBtn = document.getElementById('submit-password');
const cancelPasswordBtn = document.getElementById('cancel-password');
const passwordError = document.getElementById('password-error');
const navLinksDiv = document.getElementById('nav-links'); // Reference to the nav container
const headerTitle = document.getElementById('header-title');

// --- Global State and Constants ---
const validPasswords = ['12300', '12400', '12500'];
const menuItems = [
    { view: 'home', title: 'Home', icon: 'fas fa-home', isVip: false },
    { view: 'free-tips', title: 'Free Daily Tips', icon: 'fas fa-gift', isVip: false },
    { view: 'top-secret', title: 'Top Secret VIP', icon: 'fas fa-lock', isVip: true },
    { view: 'ultimate', title: 'Ultimate VIP', icon: 'fas fa-crown', isVip: true },
    { view: 'over-under', title: 'Over/Under', icon: 'fas fa-chart-line', isVip: true },
    { view: 'btts', title: 'BTTS Bets', icon: 'fas fa-exchange-alt', isVip: true },
    { view: 'support', title: 'Support & Contact', icon: 'fas fa-life-ring', isVip: false }
];

let currentView = 'home';
let isAuthenticated = false;

// --- Helper Functions ---

const closeDrawer = () => {
    drawer.classList.remove('drawer-open');
    drawer.classList.add('drawer-closed');
    overlay.classList.add('hidden');
};

const openDrawer = () => {
    drawer.classList.remove('drawer-closed');
    drawer.classList.add('drawer-open');
    overlay.classList.remove('hidden');
};

const updateNavLinks = () => {
    navLinksDiv.innerHTML = menuItems.map(item => `
        <a href="#" data-view="${item.view}" class="nav-link text-white text-opacity-80 hover:text-white hover:bg-slate-700 p-3 rounded-lg font-semibold transition flex items-center">
            <i class="${item.icon} w-5 mr-3 ${item.isVip && !isAuthenticated ? 'text-yellow-500' : ''}"></i>
            <span>${item.title}</span>
            ${item.isVip && !isAuthenticated ? '<i class="fas fa-lock text-xs ml-auto"></i>' : ''}
        </a>
    `).join('');
    
    // Attach event listeners to new links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.getAttribute('data-view');
            navigate(view);
        });
    });
};

// --- Router ---

/**
 * Handles navigation between different views.
 * @param {string} view - The view key to navigate to.
 */
const navigate = (view) => {
    closeDrawer();
    window.scrollTo(0, 0);
    
    currentView = view;
    
    const menuItem = menuItems.find(item => item.view === view);
    if (!menuItem) {
        // Fallback if view is invalid
        contentDiv.innerHTML = renderHome();
        return;
    }
    
    headerTitle.textContent = menuItem.title.toUpperCase();

    // Check if view requires authentication (isVip)
    if (menuItem.isVip && !isAuthenticated) {
        passwordInput.value = ''; // Clear previous input
        passwordError.classList.add('hidden');
        passwordModal.classList.remove('hidden');
        return;
    }
    
    // Render the content based on the view
    switch(view) {
        case 'home': contentDiv.innerHTML = renderHome(); break;
        case 'free-tips': contentDiv.innerHTML = renderFreeTips(); break;
        case 'top-secret': contentDiv.innerHTML = renderTopSecret(); break;
        case 'ultimate': contentDiv.innerHTML = renderUltimate(); break;
        case 'over-under': contentDiv.innerHTML = renderOverUnder(); break;
        case 'btts': contentDiv.innerHTML = renderBTTS(); break;
        case 'support': contentDiv.innerHTML = renderSupport(); break;
        default: contentDiv.innerHTML = renderHome();
    }
    
    // Update navigation links to reflect new auth state (e.g., locking)
    updateNavLinks();
};

// --- Event Listeners and Initialization ---

document.addEventListener('DOMContentLoaded', function() {
    // Initial content and navigation setup
    updateNavLinks();
    navigate('home'); // Load the home view initially

    // Drawer toggles
    document.getElementById('menu-toggle').addEventListener('click', openDrawer);
    document.getElementById('close-drawer').addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Password modal handlers
    submitPasswordBtn.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        
        if (validPasswords.includes(password)) {
            isAuthenticated = true;
            passwordModal.classList.add('hidden');
            // Navigate to the view that was blocked
            navigate(currentView); 
        } else {
            passwordError.classList.remove('hidden');
            passwordInput.value = ''; // Clear input on error
        }
    });

    cancelPasswordBtn.addEventListener('click', () => {
        passwordModal.classList.add('hidden');
        // If cancelled, return to the home screen
        currentView = 'home';
        navigate('home');
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitPasswordBtn.click();
        }
    });
});
