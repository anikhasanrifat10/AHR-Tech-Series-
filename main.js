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
                            <span><i class="fas fa-video"></i> ${
