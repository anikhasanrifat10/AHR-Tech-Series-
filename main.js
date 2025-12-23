// Main Application
class FireFlix {
    constructor() {
        this.content = this.loadContent();
        this.init();
    }

    // Load content from localStorage
    loadContent() {
        const saved = localStorage.getItem('fireflix-content');
        if (saved) {
            return JSON.parse(saved);
        } else {
            // Default content
            const defaultContent = [
                {
                    id: 1,
                    title: "Avatar: Fire and Ash",
                    year: 2025,
                    rating: 8.5,
                    quality: "4K",
                    duration: "197 Min",
                    category: "movies",
                    genre: "sci-fi",
                    description: "Jake Sully and Neytiri face a new threat on Pandora.",
                    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    telegramLink: "https://t.me/movies_channel/123",
                    watchLink: "#",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "Stranger Things S5",
                    year: 2024,
                    rating: 8.9,
                    quality: "1080p",
                    duration: "8 Episodes",
                    category: "series",
                    genre: "horror",
                    description: "Final season of the hit Netflix series.",
                    poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    telegramLink: "https://t.me/series_channel/456",
                    watchLink: "#",
                    dateAdded: new Date().toISOString()
                }
            ];
            localStorage.setItem('fireflix-content', JSON.stringify(defaultContent));
            return defaultContent;
        }
    }

    init() {
        this.updateStats();
        this.displayContent(this.content, 'content-grid');
        this.setupEventListeners();
    }

    // Update statistics
    updateStats() {
        const movies = this.content.filter(item => item.category === 'movies').length;
        const series = this.content.filter(item => item.category === 'series').length;
        const anime = this.content.filter(item => item.category === 'anime').length;
        const drama = this.content.filter(item => item.category === 'drama').length;

        document.getElementById('movie-count')?.textContent = movies;
        document.getElementById('series-count')?.textContent = series;
        document.getElementById('anime-count')?.textContent = anime;
        document.getElementById('drama-count')?.textContent = drama;
    }

    // Display content in grid
    displayContent(items, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-film fa-3x"></i>
                    <h3>No Content Available</h3>
                    <p>Add content from Admin Panel</p>
                    <button class="btn-primary" onclick="location.href='admin.html'">
                        <i class="fas fa-plus"></i> Add Content
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="content-card" data-id="${item.id}">
                <img src="${item.poster}" alt="${item.title}" class="card-poster">
                <div class="card-info">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-meta">
                        <span>${item.year}</span>
                        <span><i class="fas fa-star"></i> ${item.rating}</span>
                        <span>${item.quality}</span>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn watch-btn" onclick="fireflix.watchContent(${item.id})">
                            <i class="fas fa-play"></i> Watch
                        </button>
                        <button class="action-btn download-btn" onclick="fireflix.downloadContent(${item.id})">
                            <i class="fab fa-telegram"></i> Download
                        </button>
                        <button class="action-btn info-btn" onclick="fireflix.showDetails(${item.id})">
                            <i class="fas fa-info"></i> Info
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Watch content
    watchContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item && item.watchLink !== "#") {
            window.open(item.watchLink, '_blank');
        } else {
            this.showModal(`
                <h2>${item.title}</h2>
                <p>Watch link not available yet.</p>
                <p>Use Telegram download link for now.</p>
                <button class="btn-primary" onclick="fireflix.downloadContent(${id})">
                    <i class="fab fa-telegram"></i> Download via Telegram
                </button>
            `);
        }
    }

    // Download via Telegram
    downloadContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item && item.telegramLink) {
            window.open(item.telegramLink, '_blank');
        } else {
            alert('Telegram link not available for this content.');
        }
    }

    // Show details modal
    showDetails(id) {
        const item = this.content.find(c => c.id === id);
        if (!item) return;

        const modalHTML = `
            <div class="modal-details">
                <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 250px;">
                        <img src="${item.poster}" alt="${item.title}" style="width: 100%; border-radius: 10px;">
                    </div>
                    <div style="flex: 2; min-width: 300px;">
                        <h2 style="color: #ff4081; margin-bottom: 15px;">${item.title}</h2>
                        <div style="display: flex; gap: 20px; margin-bottom: 20px; color: #aaa;">
                            <span><i class="fas fa-calendar"></i> ${item.year}</span>
                            <span><i class="fas fa-star"></i> ${item.rating}/10</span>
                            <span><i class="fas fa-video"></i> ${item.quality}</span>
                            <span><i class="fas fa-clock"></i> ${item.duration}</span>
                            <span><i class="fas fa-tag"></i> ${item.genre}</span>
                        </div>
                        <p style="margin-bottom: 25px; font-size: 16px;">${item.description}</p>
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <button class="btn-primary" onclick="fireflix.watchContent(${item.id})">
                                <i class="fas fa-play"></i> Watch Now
                            </button>
                            <button class="btn-primary" style="background: #0088cc;" onclick="fireflix.downloadContent(${item.id})">
                                <i class="fab fa-telegram"></i> Telegram Download
                            </button>
                        </div>
                        <div style="margin-top: 30px; background: #222; padding: 20px; border-radius: 10px;">
                            <h4><i class="fab fa-telegram"></i> Telegram Link</h4>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <input type="text" id="telegram-link-${item.id}" 
                                    value="${item.telegramLink}" readonly 
                                    style="flex: 1; padding: 10px; background: #333; border: 1px solid #444; color: #fff; border-radius: 5px;">
                                <button onclick="fireflix.copyLink('telegram-link-${item.id}')" 
                                    style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modalHTML);
    }

    // Show modal
    showModal(content) {
        const modal = document.getElementById('content-modal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.close');

        if (modal && modalBody) {
            modalBody.innerHTML = content;
            modal.style.display = 'flex';

            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };

            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }
    }

    // Copy link to clipboard
    copyLink(inputId) {
        const input = document.getElementById(inputId);
        input.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    }

    // Search functionality
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');

        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase().trim();
                if (!query) {
                    this.displayContent(this.content, 'content-grid');
                    return;
                }

                const filtered = this.content.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.genre.toLowerCase().includes(query) ||
                    item.year.toString().includes(query)
                );

                this.displayContent(filtered, 'content-grid');
            };

            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
    }

    // Add new content (called from admin panel)
    addContent(newContent) {
        newContent.id = this.content.length > 0 
            ? Math.max(...this.content.map(c => c.id)) + 1 
            : 1;
        newContent.dateAdded = new Date().toISOString();
        
        this.content.push(newContent);
        this.saveContent();
        this.updateStats();
        
        return newContent;
    }

    // Update existing content
    updateContent(id, updatedData) {
        const index = this.content.findIndex(c => c.id === id);
        if (index !== -1) {
            this.content[index] = { ...this.content[index], ...updatedData };
            this.saveContent();
            return true;
        }
        return false;
    }

    // Delete content
    deleteContent(id) {
        const index = this.content.findIndex(c => c.id === id);
        if (index !== -1) {
            this.content.splice(index, 1);
            this.saveContent();
            this.updateStats();
            return true;
        }
        return false;
    }

    // Save to localStorage
    saveContent() {
        localStorage.setItem('fireflix-content', JSON.stringify(this.content));
    }

    // Get content by category
    getContentByCategory(category) {
        return this.content.filter(item => item.category === category);
    }
}

// Initialize FireFlix
const fireflix = new FireFlix();

// Make functions globally available
window.fireflix = fireflix;
