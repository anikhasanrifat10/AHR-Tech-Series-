```javascript
// ===== DEMO DATA =====
const demoData = {
    movies: [
        { 
            id: 1, 
            title: "Avatar: Fire and Ash", 
            year: "2025", 
            size: "2.1 GB", 
            quality: "4K", 
            category: "movies",
            description: "In the wake of devastating war, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent Na'vi tribe.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
            rating: 8.5, 
            duration: "197 Min" 
        },
        { 
            id: 2, 
            title: "Kalki 2898 AD", 
            year: "2025", 
            size: "1.8 GB", 
            quality: "1080p", 
            category: "movies",
            description: "Sci-fi epic set in a dystopian future with mythological elements.",
            image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 8.2, 
            duration: "182 Min" 
        },
        { 
            id: 3, 
            title: "Deadpool & Wolverine", 
            year: "2024", 
            size: "1.5 GB", 
            quality: "1080p", 
            category: "movies",
            description: "The Merc with a Mouth teams up with Wolverine in this action-packed adventure.",
            image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
            rating: 8.7, 
            duration: "168 Min" 
        },
        { 
            id: 4, 
            title: "Joker: Folie à Deux", 
            year: "2024", 
            size: "1.7 GB", 
            quality: "1080p", 
            category: "movies",
            description: "The sequel to the award-winning Joker film with Lady Gaga.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
            rating: 8.3, 
            duration: "175 Min" 
        },
        { 
            id: 5, 
            title: "Dune: Part Two", 
            year: "2024", 
            size: "2.2 GB", 
            quality: "4K", 
            category: "movies",
            description: "Paul Atreides unites with Chani and the Fremen for revenge.",
            image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 8.9, 
            duration: "166 Min" 
        },
        { 
            id: 6, 
            title: "Kingdom of the Planet", 
            year: "2024", 
            size: "1.9 GB", 
            quality: "1080p", 
            category: "movies",
            description: "New adventures in the world of apes set many years after Caesar's reign.",
            image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
            rating: 7.8, 
            duration: "145 Min" 
        },
        { 
            id: 7, 
            title: "Godzilla x Kong", 
            year: "2024", 
            size: "2.0 GB", 
            quality: "1080p", 
            category: "movies",
            description: "The epic battle between two titans threatens the world.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
            rating: 7.5, 
            duration: "155 Min" 
        },
        { 
            id: 8, 
            title: "Furiosa: A Mad Max Saga", 
            year: "2024", 
            size: "1.8 GB", 
            quality: "1080p", 
            category: "movies",
            description: "The origin story of the legendary Furiosa character.",
            image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 8.1, 
            duration: "148 Min" 
        },
        { 
            id: 9, 
            title: "The Batman Part II", 
            year: "2025", 
            size: "2.1 GB", 
            quality: "1080p", 
            category: "movies",
            description: "The Dark Knight returns for another dark and gritty adventure.",
            image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
            rating: 8.4, 
            duration: "190 Min" 
        },
        { 
            id: 10, 
            title: "Mission: Impossible 8", 
            year: "2025", 
            size: "2.3 GB", 
            quality: "4K", 
            category: "movies",
            description: "Ethan Hunt's most dangerous mission yet to save the world.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
            rating: 8.6, 
            duration: "165 Min" 
        }
    ],
    series: [
        { 
            id: 11, 
            title: "Stranger Things S5", 
            year: "2025", 
            size: "8.5 GB", 
            quality: "1080p", 
            category: "series",
            description: "The final season of the hit supernatural series.",
            image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
            rating: 9.0, 
            episodes: "8 Episodes" 
        },
        { 
            id: 12, 
            title: "The Last of Us S2", 
            year: "2025", 
            size: "7.2 GB", 
            quality: "1080p", 
            category: "series",
            description: "Continuation of the post-apocalyptic saga based on the game.",
            image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop",
            rating: 8.8, 
            episodes: "7 Episodes" 
        }
    ],
    anime: [
        { 
            id: 13, 
            title: "Demon Slayer S4", 
            year: "2024", 
            size: "5.2 GB", 
            quality: "1080p", 
            category: "anime",
            description: "The Hashira Training Arc continues Tanjiro's journey.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
            rating: 9.1, 
            episodes: "12 Episodes" 
        }
    ],
    apk: [
        { 
            id: 14, 
            title: "YouTube Premium Mod", 
            year: "2024", 
            size: "85 MB", 
            quality: "v19.45", 
            category: "apk",
            description: "Ad-free YouTube with background play and downloads.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop",
            version: "19.45.36" 
        }
    ]
};

// ===== ADMIN CONFIGURATION =====
const ADMIN_PASSWORD = "ahrtech2025"; // Change this to your preferred password
let adminLoggedIn = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    console.log('🎬 AHR Tech & Series Loaded Successfully!');
});

// ===== WEBSITE FUNCTIONS =====
function initializeWebsite() {
    loadAllContent();
    setupScrollEffects();
    setupSearch();
    checkMobileView();
    setupAdminAccess();
}

function loadAllContent() {
    // Load trending
    const trendingRow = document.getElementById('trendingRow');
    const allContent = [...demoData.movies, ...demoData.series, ...demoData.anime, ...demoData.apk];
    trendingRow.innerHTML = '';
    allContent.slice(0, 10).forEach(item => {
        trendingRow.appendChild(createContentCard(item));
    });

    // Load movies
    const moviesRow = document.getElementById('moviesRow');
    moviesRow.innerHTML = '';
    demoData.movies.slice(0, 10).forEach(movie => {
        moviesRow.appendChild(createContentCard(movie));
    });

    // Load series
    const seriesRow = document.getElementById('seriesRow');
    seriesRow.innerHTML = '';
    demoData.series.slice(0, 10).forEach(series => {
        seriesRow.appendChild(createContentCard(series));
    });

    // Load anime
    const animeRow = document.getElementById('animeRow');
    animeRow.innerHTML = '';
    demoData.anime.slice(0, 10).forEach(anime => {
        animeRow.appendChild(createContentCard(anime));
    });

    // Load APK
    const apkRow = document.getElementById('apkRow');
    apkRow.innerHTML = '';
    demoData.apk.slice(0, 10).forEach(apk => {
        apkRow.appendChild(createContentCard(apk));
    });
}

function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.dataset.id = item.id;
    card.dataset.category = item.category;
    
    const sizeText = item.category === 'apk' ? item.size : item.size;
    const metaText = item.category === 'apk' ? `v${item.version}` : (item.duration || item.episodes || '');
    
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${item.image}" alt="${item.title}" class="card-image">
            <div class="card-overlay"></div>
        </div>
        <div class="card-info">
            <h3 class="card-title">${item.title}</h3>
            <div class="card-meta">
                <span>${sizeText}</span>
                <span class="card-quality">${item.quality}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showDownloadModal(item.id));
    return card;
}

function showDownloadModal(itemId) {
    const item = getAllItems().find(i => i.id == itemId);
    if (!item) return;
    
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalDescription').textContent = item.description;
    
    // Update meta info
    const modalMeta = document.getElementById('modalMeta');
    if (item.category === 'apk') {
        modalMeta.innerHTML = `
            <span>${item.year}</span>
            <span>•</span>
            <span>${item.version}</span>
            <span>•</span>
            <span>${item.size}</span>
        `;
    } else {
        const rating = item.rating ? `<span>•</span><span>${item.rating}/10</span>` : '';
        modalMeta.innerHTML = `
            <span>${item.year}</span>
            <span>•</span>
            <span>${item.duration || item.episodes || ''}</span>
            ${rating}
            <span>•</span>
            <span>${item.quality}</span>
        `;
    }
    
    // Create download options
    const qualityOptions = document.getElementById('qualityOptions');
    qualityOptions.innerHTML = '';
    
    const qualities = item.category === 'apk' ? [
        { name: 'Direct Download', size: item.size, type: 'apk' },
        { name: 'Mirror Link', size: item.size, type: 'apk' },
        { name: 'Telegram', size: 'Instant', type: 'telegram' }
    ] : [
        { name: '480p SD', size: Math.round(parseFloat(item.size) * 0.4 * 100) / 100 + ' GB', type: 'video' },
        { name: '720p HD', size: Math.round(parseFloat(item.size) * 0.7 * 100) / 100 + ' GB', type: 'video' },
        { name: '1080p FHD', size: item.size, type: 'video' },
        { name: '2160p 4K', size: Math.round(parseFloat(item.size) * 1.5 * 100) / 100 + ' GB', type: 'video' }
    ];
    
    qualities.forEach(quality => {
        const option = document.createElement('div');
        option.className = 'download-option';
        option.innerHTML = `
            <div class="quality-badge">${quality.name}</div>
            <div class="download-size">${quality.size}</div>
            <button class="btn-download" style="padding: 8px 20px; font-size: 14px;">
                <i class="fas fa-download"></i> Download
            </button>
        `;
        
        option.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            startDownload(item.title, quality.name, quality.size);
        });
        
        qualityOptions.appendChild(option);
    });
    
    // Show modal
    document.getElementById('downloadModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function startDownload(title, quality, size) {
    showNotification(`Starting download: ${title} - ${quality}`);
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`${title} download completed!`);
    }, 2000);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.style.display = 'flex';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
  function openTelegram() {
    window.open('https://t.me/ahr_tech_series', '_blank');
    showNotification('Opening Telegram channel...');
}

function filterContent(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide sections
    const sections = {
        'movies': document.getElementById('movies'),
        'series': document.getElementById('series'),
        'anime': document.getElementById('anime'),
        'apk': document.getElementById('apk')
    };
    
    if (category === 'all') {
        Object.values(sections).forEach(section => {
            if (section) {
                section.style.display = 'block';
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    } else {
        Object.keys(sections).forEach(key => {
            if (sections[key]) {
                if (key === category) {
                    sections[key].style.display = 'block';
                    sections[key].scrollIntoView({ behavior: 'smooth' });
                } else {
                    sections[key].style.display = 'none';
                }
            }
        });
    }
}

function showCategoryGrid(category) {
    document.getElementById('categoryGridView').style.display = 'block';
    document.querySelector('main').style.display = 'none';
    
    const title = document.getElementById('gridCategoryTitle');
    const grid = document.getElementById('categoryGrid');
    
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' - All Content';
    grid.innerHTML = '';
    
    const items = demoData[category] || [];
    items.forEach(item => {
        grid.appendChild(createContentCard(item));
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideCategoryGrid() {
    document.getElementById('categoryGridView').style.display = 'none';
    document.querySelector('main').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAllTrending() {
    showCategoryGrid('movies');
}

function showMovieInfo(itemId) {
    const item = getAllItems().find(i => i.id == itemId);
    if (item) {
        alert(`🎬 ${item.title}\n\n📅 Year: ${item.year}\n⏱️ Duration: ${item.duration || item.episodes || 'N/A'}\n⭐ Rating: ${item.rating || 'N/A'}/10\n💾 Size: ${item.size}\n🎞️ Quality: ${item.quality}\n\n📝 Description:\n${item.description}`);
    }
}

function submitRequest() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const request = document.getElementById('contentRequest').value;
    
    if (!name || !email || !request) {
        showNotification('Please fill all fields!');
        return;
    }
    
    showNotification('Request sent successfully! We will contact you soon.');
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contentRequest').value = '';
}

function getAllItems() {
    return [...demoData.movies, ...demoData.series, ...demoData.anime, ...demoData.apk];
}

// ===== ADMIN FUNCTIONS =====
function setupAdminAccess() {
    let clickCount = 0;
    let lastClickTime = 0;
    
    document.getElementById('adminSecret').addEventListener('click', function() {
        const currentTime = new Date().getTime();
        
        if (currentTime - lastClickTime > 1000) {
            clickCount = 0;
        }
        
        clickCount++;
        lastClickTime = currentTime;
        
        if (clickCount === 3) {
            showAdminModal();
            clickCount = 0;
        }
    });
}

function showAdminModal() {
    document.getElementById('adminModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        adminLoggedIn = true;
        document.getElementById('adminDashboard').style.display = 'block';
        document.querySelector('.admin-form').style.display = 'none';
        showNotification('Admin login successful!');
    } else {
        showNotification('Incorrect password!');
    }
}

function addNewContent() {
    if (!adminLoggedIn) {
        showNotification('Please login first!');
        return;
    }
    
    const title = prompt('Enter content title:');
    if (title) {
        showNotification(`Added new content: ${title}`);
    }
}

function manageContent() {
    if (!adminLoggedIn) {
        showNotification('Please login first!');
        return;
    }
    
    showNotification('Opening content management...');
}

function viewStats() {
    if (!adminLoggedIn) {
        showNotification('Please login first!');
        return;
    }
    
    const totalItems = getAllItems().length;
    alert(`📊 Website Statistics:\n\n• Total Content: ${totalItems}\n• Movies: ${demoData.movies.length}\n• Web Series: ${demoData.series.length}\n• Anime: ${demoData.anime.length}\n• APKs: ${demoData.apk.length}`);
}

// ===== UTILITY FUNCTIONS =====
function setupScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('mainHeader');
        const scrollTop = document.getElementById('scrollTop');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.style.display = 'flex';
        } else {
            header.classList.remove('scrolled');
            scrollTop.style.display = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length > 2) {
            // Search functionality
            console.log(`Searching for: ${query}`);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                showNotification(`Search results for: ${query}`);
            }
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function checkMobileView() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.content-row').forEach(row => {
            row.style.gap = '8px';
        });
    }
}

function setupEventListeners() {
    // Close modal when clicking outside
    document.getElementById('downloadModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    document.getElementById('adminModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdminModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeAdminModal();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    // Window resize handler
    window.addEventListener('resize', checkMobileView);
}

// ===== INITIALIZATION LOG =====
console.log(`
🎥 AHR TECH & SERIES - COMPLETE WEBSITE
=======================================

Features:
1. Netflix-style interface with dark theme
2. Fully responsive (mobile, tablet, desktop)
3. 10 items per row in horizontal scroll
4. Category filtering system
5. Download modal with quality options
6. Telegram integration
7. Mobile-friendly navigation
8. Hidden Admin Panel (Triple click bottom-left corner)
9. Contact form for content requests

Admin Access:
- Triple click bottom-left corner of screen
- Password: ahrtech2025
- Change password in script.js (ADMIN_PASSWORD)

Total Content: ${getAllItems().length} items
Categories: Movies, Series, Anime, Mod APK
`);
```
