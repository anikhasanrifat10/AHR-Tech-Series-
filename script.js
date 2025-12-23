// Main Application for AHR Tech & Series
class AHRApp {
    constructor() {
        this.content = this.loadContent();
        this.init();
    }

    loadContent() {
        try {
            const saved = localStorage.getItem('ahr-content');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.log('No saved content found');
        }

        // Default content
        return [
            {
                id: 1,
                title: "Avatar: The Way of Water",
                year: 2022,
                rating: 7.8,
                quality: "4K",
                duration: "3h 12m",
                category: "movies",
                description: "Jake Sully lives with his newfound family on Pandora.",
                poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
                telegramLink: "https://t.me/s/movieslink/1",
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                title: "Stranger Things S4",
                year: 2022,
                rating: 8.7,
                quality: "1080p",
                duration: "9 Episodes",
                category: "series",
                description: "The group struggles with the aftermath.",
                poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13",
                telegramLink: "https://t.me/s/serieslink/1",
                dateAdded: new Date().toISOString()
            }
        ];
    }

    init() {
        this.displayContent();
        this.updateStats();
        this.setupSearch();
    }

    displayContent() {
        const container = document.getElementById('contentGrid');
        if (!container) return;

        const latest = [...this.content].slice(0, 8);
        
        if (latest.length === 0) {
            container.innerHTML = '<p class="no-content">No content available. Add from Admin Panel.</p>';
            return;
        }

        container.innerHTML = latest.map(item => `
            <div class="content-card">
                <img src="${item.poster}" alt="${item.title}" class="content-poster">
                <div class="content-info">
                    <h3 class="content-title">${item.title}</h3>
                    <div class="content-meta">
                        <span>${item.year}</span>
                        <span>${item.quality}</span>
                        <span>⭐ ${item.rating}</span>
                    </div>
                    <div class="content-actions">
                        <button class="action-btn watch-btn" onclick="ahrApp.watchContent(${item.id})">
                            <i class="fas fa-play"></i> Watch
                        </button>
                        <button class="action-btn download-btn" onclick="ahrApp.downloadContent(${item.id})">
                            <i class="fab fa-telegram"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const movies = this.content.filter(c => c.category === 'movies').length;
        const series = this.content.filter(c => c.category === 'series').length;
        const anime = this.content.filter(c => c.category === 'anime').length;
        const total = this.content.length;

        const moviesCount = document.getElementById('moviesCount');
        const seriesCount = document.getElementById('seriesCount');
        const animeCount = document.getElementById('animeCount');
        const totalCount = document.getElementById('totalCount');

        if (moviesCount) moviesCount.textContent = movies;
        if (seriesCount) seriesCount.textContent = series;
        if (animeCount) animeCount.textContent = anime;
        if (totalCount) totalCount.textContent = total;
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => this.searchContent(searchInput.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchContent(searchInput.value);
            });
        }
    }

    searchContent(query) {
        if (!query.trim()) return;
        
        const results = this.content.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        this.showSearchResults(results);
    }

    showSearchResults(results) {
        // Create modal if doesn't exist
        let modal = document.getElementById('searchModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'searchModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>Search Results</h3>
                    <div id="searchResults"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').onclick = () => {
                modal.style.display = 'none';
            };
        }

        const resultsContainer = document.getElementById('searchResults');
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
        } else {
            resultsContainer.innerHTML = results.map(item => `
                <div class="search-item" onclick="ahrApp.showDetails(${item.id})">
                    <img src="${item.poster}" alt="${item.title}" style="width: 80px; height: 120px; object-fit: cover; border-radius: 5px;">
                    <div>
                        <h4>${item.title}</h4>
                        <p>${item.year} • ${item.quality} • ${item.category}</p>
                    </div>
                </div>
            `).join('');
        }

        modal.style.display = 'flex';
    }

    watchContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item) {
            this.showDetails(id);
        }
    }

    downloadContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item && item.telegramLink) {
            window.open(item.telegramLink, '_blank');
        }
    }

    showDetails(id) {
        const item = this.content.find(c => c.id === id);
        if (!item) return;

        // Create modal if doesn't exist
        let modal = document.getElementById('contentModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'contentModal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                    <img src="${item.poster}" alt="${item.title}" style="width: 300px; max-width: 100%; border-radius: 10px;">
                    <div style="flex: 1; min-width: 300px;">
                        <h2>${item.title}</h2>
                        <div style="display: flex; gap: 1.5rem; color: #b3b3b3; margin: 1rem 0;">
                            <span>${item.year}</span>
                            <span>${item.quality}</span>
                            <span>⭐ ${item.rating}</span>
                            <span>${item.duration}</span>
                        </div>
                        <p style="margin: 1.5rem 0; line-height: 1.6;">${item.description}</p>
                        <div style="display: flex; gap: 1rem;">
                            <button onclick="ahrApp.downloadContent(${id})" style="background: #0088cc; color: white; border: none; padding: 1rem 2rem; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                                <i class="fab fa-telegram"></i> Download via Telegram
                            </button>
                        </div>
                        <div style="margin-top: 2rem; background: #222; padding: 1rem; border-radius: 5px;">
                            <h4>Telegram Link</h4>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                                <input type="text" value="${item.telegramLink}" readonly style="flex: 1; padding: 0.8rem; background: #333; border: 1px solid #444; color: white; border-radius: 5px;">
                                <button onclick="navigator.clipboard.writeText('${item.telegramLink}'); alert('Copied!')" style="background: #4CAF50; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 5px; cursor: pointer;">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    // Admin functions
    addContent(newContent) {
        newContent.id = this.content.length ? Math.max(...this.content.map(c => c.id)) + 1 : 1;
        newContent.dateAdded = new Date().toISOString();
        this.content.push(newContent);
        this.saveContent();
        return newContent;
    }

    updateContent(id, updatedData) {
        const index = this.content.findIndex(c => c.id === id);
        if (index > -1) {
            this.content[index] = { ...this.content[index], ...updatedData };
            this.saveContent();
            return true;
        }
        return false;
    }

    deleteContent(id) {
        const index = this.content.findIndex(c => c.id === id);
        if (index > -1) {
            this.content.splice(index, 1);
            this.saveContent();
            return true;
        }
        return false;
    }

    saveContent() {
        localStorage.setItem('ahr-content', JSON.stringify(this.content));
    }

    getContentByCategory(category) {
        return this.content.filter(c => c.category === category);
    }
}

// Initialize app
const ahrApp = new AHRApp();
window.ahrApp = ahrApp;
