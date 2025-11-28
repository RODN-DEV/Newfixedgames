/**
 * views.js
 * Contains the functions for rendering HTML content for each view.
 * Assumes gamesData is globally available from data.js.
 * * Helper function to render game cards.
 * @param {Array<Object>} games - Array of game objects.
 * @param {string} gradientClass - Custom CSS class for the card background.
 * @returns {string} - HTML string for the game cards.
 */
const renderGameCards = (games, gradientClass) => {
    return games.map(game => {
        const statusBadgeClass = game.status === 'won' ? 'badge-won' : 
                                 game.status === 'lost' ? 'badge-lost' : 
                                 'badge-pending';
        const liveIndicator = game.isLive ? `<span class="badge-live text-xs font-bold px-2 py-0.5 rounded-full mr-2">LIVE</span>` : '';

        return `
            <div class="game-card ${gradientClass} p-4 rounded-xl shadow-lg transform hover:scale-[1.01] transition duration-300 fade-in">
                <div class="flex justify-between items-start mb-2 border-b border-white border-opacity-30 pb-2">
                    <div class="flex items-center">
                        ${liveIndicator}
                        <span class="text-sm font-semibold text-white text-opacity-80">${game.league}</span>
                    </div>
                    <span class="text-xs font-bold text-white">${game.time}</span>
                </div>
                
                <div class="flex justify-between items-center mb-3">
                    <div class="text-white font-bold text-lg leading-tight">${game.teamA}</div>
                    <div class="text-white text-opacity-80 font-bold">vs</div>
                    <div class="text-white font-bold text-lg leading-tight text-right">${game.teamB}</div>
                </div>

                <div class="bg-white bg-opacity-10 p-3 rounded-lg border border-white border-opacity-20 backdrop-blur-sm">
                    <p class="text-xs text-white text-opacity-70 font-medium uppercase mb-1">Prediction</p>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-extrabold text-white">${game.prediction}</span>
                        <span class="text-xl font-extrabold text-yellow-300">@${game.odds}</span>
                    </div>
                </div>

                <div class="mt-3 flex justify-between items-center">
                    <span class="text-sm font-bold px-3 py-1 rounded-full ${statusBadgeClass} shadow-md uppercase">
                        ${game.status} ${game.score ? `(${game.score})` : ''}
                    </span>
                    <i class="fas fa-check-circle text-white text-xl"></i>
                </div>
            </div>
        `;
    }).join('');
};

const renderHome = () => {
    return `
        <div class="space-y-6">
            <div class="bg-slate-900 p-6 rounded-2xl shadow-xl text-white text-center fade-in">
                <i class="fas fa-star text-4xl text-yellow-400 mb-3 animate-pulse"></i>
                <h2 class="text-2xl font-bold mb-2">Welcome to FOOTBALL SIMPLE</h2>
                <p class="text-white text-opacity-80">Your ultimate source for expert football predictions. Check out our free and VIP tips!</p>
            </div>
            
            <div class="bg-white p-5 rounded-2xl shadow-xl border-t-4 border-green-500 fade-in">
                <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-gift text-green-500 mr-2"></i> Daily Free Tips Preview
                </h3>
                <p class="text-gray-600 mb-4">Get a taste of our quality analysis. Tap the menu to explore all sections.</p>
                <a href="#" data-view="free-tips" class="nav-link text-center block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-lg">
                    View Free Tips <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>

            <div class="bg-white p-5 rounded-2xl shadow-xl border-t-4 border-yellow-500 fade-in">
                <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-lock text-yellow-500 mr-2"></i> Access VIP Predictions
                </h3>
                <p class="text-gray-600 mb-4">Unlock Ultimate, Top Special, O/U, and BTTS VIP sections for premium picks.</p>
                <button onclick="navigate('ultimate')" class="block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition shadow-lg">
                    Unlock VIP Access <i class="fas fa-key ml-1"></i>
                </button>
            </div>
        </div>
    `;
};

const renderFreeTips = () => {
    const games = gamesData.free;
    const cards = renderGameCards(games, 'card-gradient-free');

    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Daily Free Tips</h2>
            <p class="text-gray-600">A selection of today's best free predictions with competitive odds.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </div>
    `;
};

// --- VIP Views (Protected) ---

const renderTopSecret = () => {
    const games = gamesData.topSecret;
    const cards = renderGameCards(games, 'card-gradient-ou'); // Using purple gradient for Top Special

    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-lock text-red-500 mr-2"></i> Top Special VIP Picks
            </h2>
            <div class="bg-red-100 p-4 rounded-xl border border-red-300 text-red-700 font-semibold">
                This exclusive section contains high-confidence bets with exceptional value.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </div>
    `;
};

const renderUltimate = () => {
    const games = gamesData.ultimate;
    const cards = renderGameCards(games, 'card-gradient-free'); // Using green gradient for Ultimate

    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-crown text-yellow-500 mr-2"></i> Ultimate VIP Section
            </h2>
            <div class="bg-yellow-100 p-4 rounded-xl border border-yellow-300 text-yellow-700 font-semibold">
                Our premium selection. These picks are based on extensive research and proprietary algorithms.
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </div>
    `;
};

const renderOverUnder = () => {
    const games = gamesData.overUnder;
    const cards = renderGameCards(games, 'card-gradient-ou'); // Using purple gradient for O/U

    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-chart-line text-blue-500 mr-2"></i> VIP Over/Under Tips
            </h2>
            <p class="text-gray-600">Expert predictions focused on total goals (Over/Under 2.5 or 3.5).</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </div>
    `;
};

const renderBTTS = () => {
    const games = gamesData.btts;
    const cards = renderGameCards(games, 'card-gradient-free'); // Using green gradient for BTTS

    return `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-exchange-alt text-green-500 mr-2"></i> VIP BTTS Bets
            </h2>
            <p class="text-gray-600">Predictions where both teams are expected to score (BTTS: Yes).</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </div>
    `;
};

const renderSupport = () => {
    return `
        <div class="space-y-6 max-w-lg mx-auto p-4 bg-white rounded-xl shadow-lg fade-in">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-life-ring text-blue-500 mr-2"></i> Contact Support
            </h2>
            <p class="text-gray-600">If you have any questions, payment issues, or need help with VIP access, please contact us directly.</p>

            <div class="space-y-4">
                <a href="mailto:masterbetrealfixed@gmail.com" class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition">
                    <div class="bg-blue-500 p-3 rounded-full text-white mr-4 shadow-md">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                        <div class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Email Support</div>
                        <div class="font-bold text-gray-800 text-sm">masterbetrealfixed@gmail.com</div>
                    </div>
                </a>

                <div class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Response Time</div>
                    <p class="text-gray-700 text-sm">We aim to respond to all inquiries within 12 hours.</p>
                </div>
            </div>
        </div>
    `;
};

/**
 * NEW VIEW: Privacy Policy
 */
const renderPrivacyPolicy = () => {
    return `
        <div class="space-y-6 max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg fade-in">
            <h2 class="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center">
                <i class="fas fa-shield-alt text-green-500 mr-2"></i> Privacy Policy
            </h2>
            <p class="text-gray-600">
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
            </p>

            <div class="space-y-4">
                <h3 class="text-xl font-bold text-gray-800">1. Information Collection and Use</h3>
                <p class="text-gray-700">
                    We collect very limited information necessary for providing and improving the Service. This may include non-personally identifiable information such as usage data (e.g., which pages of our Service you visit) and device information.
                </p>

                <h3 class="text-xl font-bold text-gray-800">2. VIP Access Security</h3>
                <p class="text-gray-700">
                    VIP access is granted via a temporary password system. We do not store or process payment information or personal identification data for VIP access within this application. All VIP password attempts are checked locally against a set of predefined valid tokens.
                </p>

                <h3 class="text-xl font-bold text-gray-800">3. Cookies and Tracking</h3>
                <p class="text-gray-700">
                    We do not use tracking cookies or similar tracking technologies to track activity on our Service.
                </p>

                <h3 class="text-xl font-bold text-gray-800">4. Changes to This Privacy Policy</h3>
                <p class="text-gray-700">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </div>
        </div>
    `;
};
