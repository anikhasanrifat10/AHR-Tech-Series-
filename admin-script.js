// Admin Panel Functions
class AdminPanel {
    constructor() {
        this.editingId = null;
        this.init();
    }

    init() {
        if (!adminAuth.isLoggedIn()) {
            window.location.href = 'admin-login.html';
            return;
        }

        this.loadStats();
        this.loadContent();
        this.setupTabs();
        this.setupForms();
        this.setupLogout();
    }

    loadStats() {
        const content = ahrApp.content;
        const total = content.length;
        const movies = content.filter(c => c.category === 'movies').length;
        const series = content.filter(c => c.category === 'series').length;
        const anime = content.filter(c => c.category === 'anime').length;

        document.getElementById('totalStat').textContent = total;
        document.getElementById('moviesStat').textContent = movies;
        document.getElementById('seriesStat').textContent = series;
        document.getElementById('animeStat').textContent = anime;
    }

    loadContent() {
        this.loadContentList();
        this.loadTelegramLinks();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabId + '-tab').classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Load content for specific tabs
        if (tabId === 'manage') {
            this.loadContentList();
        } else if (tabId === 'links') {
            this.loadTelegramLinks();
        }
    }

    setupForms() {
        const addForm = document.getElementById('addForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveContent();
            });
        }
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                adminAuth.logout();
            });
        }
    }

    saveContent() {
        const formData = {
            title: document.getElementById('contentTitle').value.trim(),
            category: document.getElementById('contentCategory').value,
            year: parseInt(document.getElementById('contentYear').value) || 2024,
            rating: parseFloat(document.getElementById('contentRating').value) || 8.0,
            quality: document.getElementById('contentQuality').value,
            description: document.getElementById('contentDescription').value.trim(),
            poster: document.getElementById('contentPoster').value.trim(),
            telegramLink: document.getElementById('contentTelegram').value.trim()
        };

        // Validate
        if (!formData.title || !formData.poster || !formData.telegramLink) {
            this.showMessage('Please fill all required fields', 'error');
            return;
        }

        if (this.editingId) {
            // Update
            const success = ahrApp.updateContent(this.editingId, formData);
            if (success) {
                this.showMessage('Content updated successfully!', 'success');
                this.cancelEdit();
            } else {
                this.showMessage('Failed to update content', 'error');
            }
        } else {
            // Add new
            ahrApp.addContent(formData);
            this.showMessage('Content added successfully!', 'success');
        }

        this.resetForm();
        this.loadStats();
        this.loadContent();
    }

    loadContentList() {
        const container = document.getElementById('contentList');
        if (!container) return;

        const content = ahrApp.content;
        
        if (content.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #b3b3b3;">No content added yet.</p>';
            return;
        }

        container.innerHTML = content.map(item => `
            <div class="content-item">
                <div class="item-info">
                    <h3>${item.title} (${item.year})</h3>
                    <div class="item-meta">
                        <span>${item.category.toUpperCase()}</span>
                        <span>⭐ ${item.rating}</span>
                        <span>${item.quality}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="adminPanel.editContent(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="adminPanel.deleteContent(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadTelegramLinks() {
        const container = document.getElementById('telegramList');
        if (!container) return;

        const content = ahrApp.content;
        
        if (content.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #b3b3b3;">No content available.</p>';
            return;
        }

        container.innerHTML = content.map(item => `
            <div class="content-item" style="margin-bottom: 15px;">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <div class="item-meta">
                        <span>${item.category}</span>
                        <span>${item.quality}</span>
                    </div>
                </div>
                <div class="telegram-input">
                    <input type="text" value="${item.telegramLink}" readonly 
                           style="flex: 1; background: #222; border: 1px solid #444; color: white; padding: 8px 12px; border-radius: 4px;">
                    <button class="edit-btn" onclick="copyToClipboard('${item.telegramLink}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button class="edit-btn" onclick="adminPanel.editContent(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `).join('');
    }

    editContent(id) {
        const item = ahrApp.content.find(c => c.id === id);
        if (!item) return;

        this.editingId = id;

        // Fill form
        document.getElementById('contentTitle').value = item.title;
        document.getElementById('contentCategory').value = item.category;
        document.getElementById('contentYear').value = item.year;
        document.getElementById('contentRating').value = item.rating;
        document.getElementById('contentQuality').value = item.quality;
        document.getElementById('contentDescription').value = item.description;
        document.getElementById('contentPoster').value = item.poster;
        document.getElementById('contentTelegram').value = item.telegramLink;

        // Update button text
        const submitBtn = document.querySelector('#addForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Content';
        submitBtn.style.background = '#2196F3';

        // Switch to add tab
        this.switchTab('add');
    }

    deleteContent(id) {
        if (confirm('Are you sure you want to delete this content?')) {
            const success = ahrApp.deleteContent(id);
            if (success) {
                this.showMessage('Content deleted successfully!', 'success');
                this.loadStats();
                this.loadContent();
            }
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.resetForm();
        
        const submitBtn = document.querySelector('#addForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Content';
        submitBtn.style.background = '#e50914';
    }

    resetForm() {
        document.getElementById('addForm').reset();
        document.getElementById('contentYear').value = 2024;
        document.getElementById('contentRating').value = 8.0;
        document.getElementById('contentQuality').value = '4K';
        document.getElementById('contentCategory').value = 'movies';
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('addMessage');
        if (!messageDiv) return;

        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

// Global functions
function copyLink() {
    const input = document.getElementById('contentTelegram');
    input.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
    });
}

function exportData() {
    const data = ahrApp.content;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ahr-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    // Clear existing
                    localStorage.removeItem('ahr-content');
                    
                    // Import new
                    data.forEach(item => {
                        ahrApp.addContent(item);
                    });
                    
                    alert('Data imported successfully!');
                    adminPanel.loadStats();
                    adminPanel.loadContent();
                } else {
                    alert('Invalid data format');
                }
            } catch (err) {
                alert('Error reading file');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearData() {
    if (confirm('This will delete ALL content. Are you sure?')) {
        localStorage.removeItem('ahr-content');
        window.location.reload();
    }
}

// Initialize admin panel
const adminPanel = new AdminPanel();
window.adminPanel = adminPanel;
