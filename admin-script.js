class AdminPanel {
    constructor() {
        this.editingId = null;
        this.init();
    }

    init() {
        if (!adminAuth.isLoggedIn()) {
            location.href = 'admin-login.html';
            return;
        }

        this.loadStats();
        this.loadContent();
        this.setupTabs();
        this.setupForms();
    }

    loadStats() {
        const content = ahrApp.content;
        const total = content.length;
        const movies = content.filter(c => c.category === 'movies').length;
        const series = content.filter(c => c.category === 'series').length;
        const mod = content.filter(c => c.category === 'mod-apk').length;

        document.getElementById('totalStat').textContent = total;
        document.getElementById('moviesStat').textContent = movies;
        document.getElementById('seriesStat').textContent = series;
        document.getElementById('modStat').textContent = mod;
    }

    loadContent() {
        const container = document.getElementById('contentList');
        if (!container) return;

        const content = ahrApp.content;
        
        if (content.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:#666">No content added yet.</p>';
            return;
        }

        container.innerHTML = content.map(item => `
            <div class="content-item">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <div class="item-meta">
                        <span>${item.category.toUpperCase()}</span>
                        <span>${item.year || item.quality}</span>
                        <span>${item.rating || 'N/A'}</span>
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

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
            };
        });
    }

    setupForms() {
        const form = document.getElementById('addForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.saveContent();
            };
        }
    }

    saveContent() {
        const data = {
            title: document.getElementById('contentTitle').value.trim(),
            category: document.getElementById('contentCategory').value,
            year: document.getElementById('contentYear').value.trim(),
            rating: document.getElementById('contentRating').value.trim(),
            quality: document.getElementById('contentQuality').value.trim(),
            description: document.getElementById('contentDescription').value.trim(),
            poster: document.getElementById('contentPoster').value.trim() || this.getDefaultPoster(),
            telegramLink: document.getElementById('contentTelegram').value.trim()
        };

        if (!data.title || !data.telegramLink) {
            this.showMessage('Please fill required fields', 'error');
            return;
        }

        if (this.editingId) {
            ahrApp.updateContent(this.editingId, data);
            this.showMessage('Content updated successfully!', 'success');
            this.cancelEdit();
        } else {
            ahrApp.addContent(data);
            this.showMessage('Content added successfully!', 'success');
        }

        this.resetForm();
        this.loadStats();
        this.loadContent();
        localStorage.setItem('ahr-content-updated', Date.now()); // Trigger update
    }

    getDefaultPoster() {
        return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1';
    }

    editContent(id) {
        const item = ahrApp.content.find(c => c.id === id);
        if (!item) return;

        this.editingId = id;

        document.getElementById('contentTitle').value = item.title;
        document.getElementById('contentCategory').value = item.category;
        document.getElementById('contentYear').value = item.year || '';
        document.getElementById('contentRating').value = item.rating || '';
        document.getElementById('contentQuality').value = item.quality || '';
        document.getElementById('contentDescription').value = item.description || '';
        document.getElementById('contentPoster').value = item.poster || '';
        document.getElementById('contentTelegram').value = item.telegramLink;

        const btn = document.querySelector('#addForm button[type="submit"]');
        btn.innerHTML = '<i class="fas fa-save"></i> Update Content';
        btn.style.background = '#2196F3';

        document.querySelector('[data-tab="add"]').click();
    }

    deleteContent(id) {
        if (confirm('Delete this content?')) {
            ahrApp.deleteContent(id);
            this.loadStats();
            this.loadContent();
            this.showMessage('Content deleted', 'success');
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.resetForm();
        const btn = document.querySelector('#addForm button[type="submit"]');
        btn.innerHTML = '<i class="fas fa-save"></i> Save Content';
        btn.style.background = '#e50914';
    }

    resetForm() {
        document.getElementById('addForm').reset();
        document.getElementById('contentCategory').value = 'movies';
    }

    showMessage(text, type) {
        const msg = document.getElementById('message');
        if (!msg) return;
        
        msg.textContent = text;
        msg.className = `message ${type}`;
        msg.style.display = 'block';
        
        setTimeout(() => {
            msg.style.display = 'none';
        }, 3000);
    }
}

// Global functions
function copyLink() {
    const input = document.getElementById('contentTelegram');
    input.select();
    document.execCommand('copy');
    alert('Link copied!');
}

function exportData() {
    const data = ahrApp.content;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ahr-backup.json';
    a.click();
    alert('Data exported!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    localStorage.removeItem('ahr-content');
                    data.forEach(item => ahrApp.addContent(item));
                    alert('Data imported!');
                    window.location.reload();
                }
            } catch {
                alert('Invalid file');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearData() {
    if (confirm('Delete ALL content?')) {
        localStorage.removeItem('ahr-content');
        window.location.reload();
    }
}

const adminPanel = new AdminPanel();
window.adminPanel = adminPanel;
