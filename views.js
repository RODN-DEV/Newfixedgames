/**
 * views.js
 * Contains all functions responsible for generating HTML content (views).
 * It relies on the globally available 'gamesData' object defined in data.js.
 */

// --- Utility Functions for Rendering ---

/**
 * Creates the HTML markup for a single game card.
 * @param {object} game - The game object from gamesData.
 * @returns {string} HTML markup for the game card.
 */
const createGameCard = (game) => {
    const statusClass = `badge-${game.status}`;
    const scoreDisplay = game.score ? `<span class="text-sm font-semibold text-gray-700 ml-2">Score: ${game.score}</span>` : '';
    const liveIndicator = game.isLive ? `<span class="badge-live text-xs font-bold px-2 py-0.5 rounded-full uppercase ml-2 shadow-lg">Live</span>` : '';
    
    return `
        <div class="bg-white rounded-xl p-4 shadow-lg mb-4 border border-gray-200 fade-in">
            <div class="flex justify-between items-start mb-2 border-b pb-2">
                <div class="flex items-center">
                    <i class="fas fa-calendar-alt text-gray-400 text-sm mr-2"></i>
                    <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">${game.league}</span>
                </div>
                <div class="flex items-center">
                    ${liveIndicator}
                    <span class="text-sm font-bold text-gray-800 ml-2">${game.time}</span>
                </div>
            </div>
            
            <div class="flex items-center justify-center space-x-2 text-center my-3">
                <div class="flex-1">
                    <p class="font-bold text-lg text-gray-900">${game.teamA}</p>
                    <p class="text-xs text-gray-500">Home</p>
                </div>
                <span class="text-sm font-extrabold text-red-500">VS</span>
                <div class="flex-1">
                    <p class="font-bold text-lg text-gray-900">${game.teamB}</p>
                    <p class="text-xs text-gray-500">Away</p>
                </div>
            </div>

            <div class="mt-4 pt-3 border-t border-dashed border-gray-200">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-600 font-semibold">Prediction:</span>
                    <span class="text-base font-extrabold text-indigo-700">${game.prediction}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 font-semibold">Odds:</span>
                    <span class="text-base font-bold text-green-600">${game.odds}</span>
                </div>
            </div>
            
            <div class="flex justify-between items-center mt-3 pt-3 border-t">
                <span class="${statusClass} text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">${game.status}</span>
                ${scoreDisplay}
            </div>
        </div>
    `;
};


/**
 * Renders a list of games for a specific category.
 * @param {string} category - The key in gamesData (e.g., 'free', 'topSecret').
 * @param {string} title - The title to display on the page.
 * @param {string} subtitle - The subtitle/description.
 * @param {string} cardGradientClass - Tailwind class for the main card appearance.
 * @returns {string} Full HTML content for the page.
 */
const renderGameList = (category, title, subtitle, cardGradientClass) => {
    const games = gamesData[category] || [];
    
    // Generate all game cards
    const gameCards = games.map(game => createGameCard(game)).join('');

    return `
        <div class="max-w-xl mx-auto">
            <div class="${cardGradientClass} text-white p-6 rounded-2xl shadow-xl mb-6">
                <h2 class="text-3xl font-extrabold tracking-tight">${title}</h2>
                <p class="text-sm mt-1 text-white opacity-90">${subtitle}</p>
            </div>
            
            <div class="space-y-4">
                ${games.length > 0 ? gameCards : '<p class="text-center text-gray-500 mt-10">No games available for this section yet.</p>'}
            </div>
        </div>
    `;
};


// --- Specific View Functions ---

const renderHome = () => {
    return `
        <div class="max-w-2xl mx-auto text-center py-6">
            <h2 class="text-3xl font-extrabold text-gray-800 mb-2">Welcome to FOOTBALL SIMPLE GAMES</h2>
            <p class="text-gray-600 mb-8">Your source for simple, high-value football predictions and analysis.</p>

            <div class="grid grid-cols-2 gap-4">
                <button onclick="navigate('free-tips')" class="menu-btn card-gradient-free text-white p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.02] transition">
                    <i class="fas fa-gift text-3xl mb-2"></i>
                    <span class="text-lg font-extrabold">Free Tips</span>
                    <span class="text-xs opacity-80">Daily picks for everyone</span>
                </button>
                <button onclick="navigate('ultimate')" class="menu-btn bg-slate-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.02] transition">
                    <i class="fas fa-crown text-yellow-400 text-3xl mb-2"></i>
                    <span class="text-lg font-extrabold">Ultimate VIP</span>
                    <span class="text-xs opacity-80">Top premium selections</span>
                </button>
                <button onclick="navigate('over-under')" class="menu-btn card-gradient-ou text-white p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.02] transition">
                    <i class="fas fa-chart-line text-3xl mb-2"></i>
                    <span class="text-lg font-extrabold">Over/Under</span>
                    <span class="text-xs opacity-80">Goal line predictions</span>
                </button>
                <button onclick="navigate('btts')" class="menu-btn bg-red-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.02] transition">
                    <i class="fas fa-exchange-alt text-3xl mb-2"></i>
                    <span class="text-lg font-extrabold">BTTS Bets</span>
                    <span class="text-xs opacity-80">Both teams to score picks</span>
                </button>
            </div>
            
            <div class="mt-8">
                <button onclick="navigate('support')" class="bg-gray-700 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-gray-800 transition">
                    Contact Support
                </button>
            </div>
        </div>
    `;
};

const renderFreeTips = () => {
    return renderGameList('free', 'Free Daily Tips', 'Enjoy today\'s best free selections from our analysts.', 'card-gradient-free');
};

const renderTopSecret = () => {
    return renderGameList('topSecret', 'Top Secret VIP Access', 'The most exclusive and secured picks with maximum confidence.', 'bg-slate-900');
};

const renderUltimate = () => {
    return renderGameList('ultimate', 'Ultimate VIP Selections', 'Our highest value tips, carefully researched for serious players.', 'bg-yellow-600');
};

const renderOverUnder = () => {
    return renderGameList('overUnder', 'Over/Under Specialists', 'Precise predictions on total goals scored in a match.', 'card-gradient-ou');
};

const renderBTTS = () => {
    return renderGameList('btts', 'Both Teams To Score (BTTS)', 'Focusing on matches where both sides are highly likely to find the net.', 'bg-red-600');
};

const renderSupport = () => {
    return `
        <div class="max-w-md mx-auto">
            <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 fade-in">
                <h2 class="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">Support & Contact</h2>
                <p class="text-gray-600 mb-6">Need help with your subscription or have a question about our picks? Contact us here.</p>

                <div class="space-y-4">
                    <!-- Telegram -->
                    <a href="https://t.me/masterbetrealfixed" target="_blank" class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition shadow-sm">
                        <div class="text-2xl text-blue-500 mr-4">
                            <i class="fab fa-telegram-plane"></i>
                        </div>
                        <div>
                            <div class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Telegram Chat</div>
                            <div class="font-bold text-gray-800 text-xs">@masterbetrealfixed</div>
                        </div>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://wa.me/1234567890" target="_blank" class="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition shadow-sm">
                        <div class="text-2xl text-green-500 mr-4">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <div>
                            <div class="text-[10px] text-green-600 font-bold uppercase tracking-wider">WhatsApp Line</div>
                            <div class="font-bold text-gray-800 text-xs">+1 234 567 890</div>
                        </div>
                    </a>
                    
                    <!-- Email -->
                    <a href="mailto:masterbetrealfixed@gmail.com" class="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition shadow-sm">
                        <div class="text-2xl text-red-500 mr-4">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div>
                            <div class="text-[10px] text-red-600 font-bold uppercase tracking-wider">Email</div>
                            <div class="font-bold text-gray-800 text-xs">masterbetrealfixed@gmail.com</div>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    `;
};
