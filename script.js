// AHR Tech & Series - Main Application
class AHRApp {
    constructor() {
        this.content = this.loadContent();
        this.currentSlide = 0;
        this.sliderInterval = null;
        this.init();
    }

    // Load content from localStorage
    loadContent() {
        try {
            const saved = localStorage.getItem('ahr-content');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.log('Loading default content...');
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
                telegramLink: "https://t.me/s/movies/1",
                isFeatured: true,
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
                telegramLink: "https://t.me/s/series/1",
                isFeatured: true,
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                title: "WhatsApp MOD Premium",
                year: 2024,
                rating: 9.5,
                quality: "v2.24.1.75",
                duration: "85 MB",
                category: "modapk",
                description: "Blue tick, Hide online, Anti-ban, 100+ features",
                poster: "https://cdn-icons-png.flaticon.com/512/124/124034.png",
                telegramLink: "https://t.me/s/modapk/1",
                isFeatured: true,
                dateAdded: new Date().toISOString()
            }
        ];
    }

    init() {
        this.initSlider();
        this.displayAllContent();
        this.setupSearch();
        this.setupEventListeners();
        this.updateStats();
    }

    // Initialize Auto Slider
    initSlider() {
        const slider = document.getElementById('slider');
        if (!slider) return;

        const featured = this.content.filter(item => item.isFeatured);
        if (featured.length === 0) return;

        slider.innerHTML = featured.map((item, index) => `
            <div class="slide" style="background-image: url('${item.poster}')">
                <div class="slide-content">
                    <h2 class="slide-title">${item.title}</h2>
                    <p class="slide-description">${item.description}</p>
                    <button class="slide-btn" onclick="ahrApp.downloadContent(${item.id})">
                        <i class="fab fa-telegram"></i> Download Now
                    </button>
                </div>
            </div>
        `).join('');

        // Auto slide every 5 seconds
        this.sliderInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;

        this.currentSlide = (this.currentSlide + 1) % slides.length;
        const slider = document.getElementById('slider');
        slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    prevSlide() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;

        this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
        const slider = document.getElementById('slider');
        slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    // Display all content
    displayAllContent() {
        this.displayLatestContent();
        this.displayCategoryContent('movies', 'moviesContent');
        this.displayCategoryContent('series', 'seriesContent');
        this.displayCategoryContent('anime', 'animeContent');
        this.displayCategoryContent('drama', 'dramaContent');
        this.displayCategoryContent('modapk', 'modapkContent');
    }

    displayLatestContent() {
        const container = document.getElementById('latestContent');
        if (!container) return;

        const latest = [...this.content]
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 10);

        container.innerHTML = latest.map(item => this.createContentCard(item)).join('');
    }

    displayCategoryContent(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = this.content.filter(item => item.category === category);
        
        if (items.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                    <p>No ${category} available yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => this.createContentCard(item)).join('');
    }

    createContentCard(item) {
        const categoryIcon = this.getCategoryIcon(item.category);
        
        return `
            <div class="content-card" data-id="${item.id}">
                <img src="${item.poster}" alt="${item.title}" class="content-poster"
                     onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1'">
                <div class="content-info">
                    <h3 class="content-title">${item.title}</h3>
                    <div class="content-meta">
                        <span>${item.year || item.quality}</span>
                        <span>${item.category === 'modapk' ? 'MOD' : '⭐ ' + item.rating}</span>
                        <span>${item.quality || item.duration}</span>
                    </div>
                    <div class="content-actions">
                        <button class="action-btn download-btn" onclick="ahrApp.downloadContent(${item.id})">
                            <i class="fab fa-telegram"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'movies': 'fas fa-film',
            'series': 'fas fa-tv',
            'anime': 'fas fa-dragon',
            'drama': 'fas fa-theater-masks',
            'modapk': 'fas fa-mobile-alt'
        };
        return icons[category] || 'fas fa-file';
    }

    // Update statistics
    updateStats() {
        const movies = this.content.filter(item => item.category === 'movies').length;
        const series = this.content.filter(item => item.category === 'series').length;
        const anime = this.content.filter(item => item.category === 'anime').length;
        const modapk = this.content.filter(item => item.category === 'modapk').length;

        document.getElementById('moviesCount') && (document.getElementById('moviesCount').textContent = movies);
        document.getElementById('seriesCount') && (document.getElementById('seriesCount').textContent = series);
        document.getElementById('animeCount') && (document.getElementById('animeCount').textContent = anime);
        document.getElementById('modapkCount') && (document.getElementById('modapkCount').textContent = modapk);
    }

    // Setup search functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch(searchInput.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch(searchInput.value);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) return;

        const results = this.content.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        this.showSearchResults(results);
    }

    showSearchResults(results) {
        const modal = document.getElementById('searchModal');
        const resultsContainer = document.getElementById('searchResults');
        
        if (!modal || !resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-search fa-2x"></i>
                    <p>No results found</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map(item => `
                <div class="search-result" onclick="ahrApp.showContentDetails(${item.id})">
                    <img src="${item.poster}" alt="${item.title}" 
                         style="width: 80px; height: 120px; object-fit: cover; border-radius: 5px;">
                    <div style="flex: 1;">
                        <h4>${item.title}</h4>
                        <p style="color: #aaa; font-size: 14px;">${item.category} • ${item.year || item.quality}</p>
                        <p style="font-size: 13px; color: #ccc;">${item.description.substring(0, 100)}...</p>
                    </div>
                </div>
            `).join('');
        }

        modal.style.display = 'flex';
    }

    // Setup event listeners
    setupEventListeners() {
        // Slider controls
        document.querySelector('.prev-btn')?.addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-btn')?.addEventListener('click', () => this.nextSlide());

        // Close modals
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Pause slider on hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(this.sliderInterval);
            });

            slider.addEventListener('mouseleave', () => {
                this.sliderInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            });
        }
    }

    // Download content
    downloadContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item && item.telegramLink) {
            window.open(item.telegramLink, '_blank');
        } else {
            alert('Download link not available.');
        }
    }

    // Show content details
    showContentDetails(id) {
        const item = this.content.find(c => c.id === id);
        if (!item) return;

        const modal = document.getElementById('contentModal');
        const details = document.getElementById('contentDetails');
        
        if (!modal || !details) return;

        details.innerHTML = `
            <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px;">
                    <img src="${item.poster}" alt="${item.title}" 
                         style="width: 100%; border-radius: 10px;">
                </div>
                <div style="flex: 2; min-width: 300px;">
                    <h2>${item.title}</h2>
                    <div style="display: flex; gap: 20px; color: #aaa; margin: 20px 0;">
                        <span>${item.year}</span>
                        <span>⭐ ${item.rating}</span>
                        <span>${item.quality}</span>
                        <span>${item.duration}</span>
                    </div>
                    <p style="line-height: 1.6; margin-bottom: 30px;">${item.description}</p>
                    <button onclick="ahrApp.downloadContent(${item.id})" 
                            style="background: #0088cc; color: white; border: none; padding: 15px 30px; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <i class="fab fa-telegram"></i> Download via Telegram
                    </button>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    // Show category content
    showCategory(category) {
        const sections = ['movies', 'series', 'anime', 'drama', 'modapk'];
        sections.forEach(section => {
            const element = document.getElementById(`${section}-section`);
            if (element) {
                element.style.display = section === category ? 'block' : 'none';
            }
        });
    }

    // Admin functions
    addContent(data) {
        data.id = this.content.length > 0 ? Math.max(...this.content.map(c => c.id)) + 1 : 1;
        data.dateAdded = new Date().toISOString();
        this.content.push(data);
        this.saveContent();
        return data;
    }

    updateContent(id, data) {
        const index = this.content.findIndex(c => c.id === id);
        if (index !== -1) {
            this.content[index] = { ...this.content[index], ...data };
            this.saveContent();
            return true;
        }
        return false;
    }

    deleteContent(id) {
        const index = this.content.findIndex(c => c.id === id);
        if (index !== -1) {
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
        return this.content.filter(item => item.category === category);
    }
}

// Initialize app
const ahrApp = new AHRApp();
window.ahrApp = ahrApp;

// Global functions
function showCategory(category) {
    ahrApp.showCategory(category);
              }
