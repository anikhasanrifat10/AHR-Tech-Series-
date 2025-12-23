class AHRApp {
    constructor() {
        this.content = this.loadContent();
        this.currentSlide = 0;
        this.sliderInterval = null;
        this.init();
    }

    loadContent() {
        try {
            const saved = localStorage.getItem('ahr-content');
            return saved ? JSON.parse(saved) : this.getDefaultContent();
        } catch {
            return this.getDefaultContent();
        }
    }

    getDefaultContent() {
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
                telegramLink: "https://t.me/s/1",
                dateAdded: new Date().toISOString(),
                isFeatured: true
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
                telegramLink: "https://t.me/s/2",
                dateAdded: new Date().toISOString(),
                isFeatured: true
            },
            {
                id: 3,
                title: "WhatsApp MOD Premium",
                year: 2024,
                rating: 9.5,
                quality: "v2.24.1.75",
                duration: "85 MB",
                category: "mod-apk",
                description: "Blue tick, Hide online, Anti-ban, 100+ features",
                poster: "https://cdn-icons-png.flaticon.com/512/124/124034.png",
                telegramLink: "https://t.me/s/3",
                dateAdded: new Date().toISOString(),
                isFeatured: true
            }
        ];
    }

    init() {
        this.initSlider();
        this.displayContent();
        this.updateStats();
        this.setupSearch();
        this.setupEventListeners();
    }

    initSlider() {
        const sliderContainer = document.getElementById('sliderContainer');
        if (!sliderContainer) return;

        const featured = this.content.filter(item => item.isFeatured);
        if (featured.length === 0) {
            sliderContainer.style.display = 'none';
            return;
        }

        sliderContainer.innerHTML = `
            <div class="slider">
                <div class="slides" id="slides">
                    ${featured.map(item => `
                        <div class="slide" style="background-image: url('${item.poster}')">
                            <div class="slide-content">
                                <h2>${item.title}</h2>
                                <p>${item.description}</p>
                                <button class="slide-btn" onclick="ahrApp.downloadContent(${item.id})">
                                    <i class="fab fa-telegram"></i> Download Now
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="slider-btn prev" onclick="ahrApp.prevSlide()">‹</button>
                <button class="slider-btn next" onclick="ahrApp.nextSlide()">›</button>
                <div class="slider-dots" id="sliderDots"></div>
            </div>
        `;

        // Create dots
        const dotsContainer = document.getElementById('sliderDots');
        featured.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => this.goToSlide(index);
            dotsContainer.appendChild(dot);
        });

        // Auto slide every 5 seconds
        this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        if (slides.length === 0) return;

        this.currentSlide = (this.currentSlide + 1) % slides.length;
        this.updateSlider();
    }

    prevSlide() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        if (slides.length === 0) return;

        this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    displayContent() {
        const container = document.getElementById('contentGrid');
        if (!container) return;

        const latest = [...this.content]
            .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
            .slice(0, 8);

        container.innerHTML = latest.length ? latest.map(item => this.createCard(item)).join('') : 
            '<p class="no-content">No content available. Add from Admin Panel.</p>';
    }

    createCard(item) {
        const icon = this.getCategoryIcon(item.category);
        return `
            <div class="content-card">
                <div class="content-poster">
                    ${item.poster.includes('http') ? 
                        `<img src="${item.poster}" alt="${item.title}">` : 
                        `<i class="${icon}"></i>`}
                </div>
                <div class="content-info">
                    <h3 class="content-title">${item.title}</h3>
                    <div class="content-meta">
                        <span>${item.year || item.quality}</span>
                        <span>${item.category === 'mod-apk' ? 'MOD' : '⭐ ' + item.rating}</span>
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
            'mod-apk': 'fas fa-mobile-alt'
        };
        return icons[category] || 'fas fa-file';
    }

    updateStats() {
        const counts = {
            movies: this.content.filter(c => c.category === 'movies').length,
            series: this.content.filter(c => c.category === 'series').length,
            anime: this.content.filter(c => c.category === 'anime').length,
            mod: this.content.filter(c => c.category === 'mod-apk').length
        };

        Object.keys(counts).forEach(key => {
            const element = document.getElementById(key + 'Count');
            if (element) element.textContent = counts[key];
        });
    }

    setupSearch() {
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');

        if (searchBtn && searchInput) {
            searchBtn.onclick = () => this.search(searchInput.value);
            searchInput.onkeypress = (e) => e.key === 'Enter' && this.search(searchInput.value);
        }
    }

    search(query) {
        if (!query.trim()) return;
        const results = this.content.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase())
        );
        this.showSearchResults(results);
    }

    showSearchResults(results) {
        const html = results.map(item => `
            <div style="display:flex;gap:1rem;padding:1rem;border-bottom:1px solid #333;cursor:pointer" 
                 onclick="ahrApp.downloadContent(${item.id})">
                <i class="${this.getCategoryIcon(item.category)}" style="font-size:2rem;color:#e50914"></i>
                <div>
                    <h4>${item.title}</h4>
                    <p style="color:#b3b3b3">${item.category} • ${item.year || item.quality}</p>
                </div>
            </div>
        `).join('');

        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:2000;display:flex;align-items:center;justify-content:center">
                <div style="background:#1a1a1a;padding:2rem;border-radius:10px;width:90%;max-width:500px;max-height:80vh;overflow-y:auto">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
                        <h3>Search Results (${results.length})</h3>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:none;border:none;color:#e50914;font-size:2rem;cursor:pointer">&times;</button>
                    </div>
                    ${results.length ? html : '<p style="text-align:center;color:#666">No results found</p>'}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    setupEventListeners() {
        window.addEventListener('storage', () => {
            this.content = this.loadContent();
            this.displayContent();
            this.updateStats();
        });
    }

    downloadContent(id) {
        const item = this.content.find(c => c.id === id);
        if (item?.telegramLink) {
            window.open(item.telegramLink, '_blank');
        } else {
            alert('Download link not available');
        }
    }

    // Admin functions
    addContent(data) {
        data.id = this.content.length ? Math.max(...this.content.map(c => c.id)) + 1 : 1;
        data.dateAdded = new Date().toISOString();
        this.content.push(data);
        this.saveContent();
        return data;
    }

    updateContent(id, data) {
        const index = this.content.findIndex(c => c.id === id);
        if (index > -1) {
            this.content[index] = { ...this.content[index], ...data };
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

const ahrApp = new AHRApp();
window.ahrApp = ahrApp;
