// Admin Panel Functions
class AdminPanel {
    constructor() {
        this.currentTab = 'content';
        this.editingId = null;
        this.init();
    }

    init() {
        this.setupTabs();
        this.loadContentList();
        this.setupForm();
        this.loadStatistics();
    }

    // Setup tab switching
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');

        this.currentTab = tab;

        // Load specific tab data
        if (tab === 'content') {
            this.loadContentList();
        } else if (tab === 'links') {
            this.loadLinksManager();
        } else if (tab === 'stats') {
            this.loadStatistics();
        }
    }

    // Load content list
    loadContentList() {
        const listContainer = document.getElementById('admin-content-list');
        const totalCount = document.getElementById('total-count');
        const allContent = fireflix.content;

        if (allContent.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-film fa-3x"></i>
                    <h3>No Content Added</h3>
                    <p>Use the form above to add your first content</p>
                </div>
            `;
            totalCount.textContent = '0';
            return;
        }

        totalCount.textContent = allContent.length;

        listContainer.innerHTML = allContent.map(item => `
            <div class="content-item ${item.category}">
                <div class="item-info">
                    <h3>${item.title} (${item.year})</h3>
                    <div class="item-meta">
                        <span><i class="fas fa-tag"></i> ${item.category.toUpperCase()}</span>
                        <span><i class="fas fa-star"></i> ${item.rating}</span>
                        <span><i class="fas fa-video"></i> ${item.quality}</span>
                        <span><i class="fab fa-telegram"></i> ${item.telegramLink ? 'Link Set' : 'No Link'}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="admin.editContent(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="link-btn" onclick="admin.manageLinks(${item.id})">
                        <i class="fab fa-telegram"></i> Link
                    </button>
                    <button class="delete-btn" onclick="admin.deleteContent(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Setup add/edit form
    setupForm() {
        const form = document.getElementById('add-content-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContent();
        });
    }

    // Save content (add or update)
    saveContent() {
        const formData = {
            title: document.getElementById('content-title').value,
            category: document.getElementById('content-category').value,
            year: parseInt(document.getElementById('content-year').value),
            rating: parseFloat(document.getElementById('content-rating').value),
            quality: document.getElementById('content-quality').value,
            duration: document.getElementById('content-duration').value,
            genre: document.getElementById('content-genre').value,
            description: document.getElementById('content-description').value,
            poster: document.getElementById('content-poster').value,
            telegramLink: document.getElementById('content-telegram').value,
            watchLink: document.getElementById('content-watch').value || '#'
        };

        if (this.editingId) {
            // Update existing
            const success = fireflix.updateContent(this.editingId, formData);
            if (success) {
                alert('Content updated successfully!');
                this.cancelEdit();
            }
        } else {
            // Add new
            fireflix.addContent(formData);
            alert('Content added successfully!');
        }

        this.resetForm();
        this.loadContentList();
        this.loadStatistics();
    }

    // Edit content
    editContent(id) {
        const item = fireflix.content.find(c => c.id === id);
        if (!item) return;

        this.editingId = id;

        // Fill form with item data
        document.getElementById('content-title').value = item.title;
        document.getElementById('content-category').value = item.category;
        document.getElementById('content-year').value = item.year;
        document.getElementById('content-rating').value = item.rating;
        document.getElementById('content-quality').value = item.quality;
        document.getElementById('content-duration').value = item.duration;
        document.getElementById('content-genre').value = item.genre;
        document.getElementById('content-description').value = item.description;
        document.getElementById('content-poster').value = item.poster;
        document.getElementById('content-telegram').value = item.telegramLink;
        document.getElementById('content-watch').value = item.watchLink;

        // Change button text
        const submitBtn = document.querySelector('#add-content-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Content';
        submitBtn.style.background = '#2196F3';

        // Scroll to form
        document.getElementById('add-content-form').scrollIntoView();
    }

    // Cancel edit
    cancelEdit() {
        this.editingId = null;
        this.resetForm();
        
        const submitBtn = document.querySelector('#add-content-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Content';
        submitBtn.style.background = '#4CAF50';
    }

    // Reset form
    resetForm() {
        document.getElementById('add-content-form').reset();
        document.getElementById('content-year').value = '2025';
        document.getElementById('content-rating').value = '8.0';
        document.getElementById('content-quality').value = '4K';
        document.getElementById('content-category').value = 'movies';
    }

    // Delete content
    deleteContent(id) {
        if (confirm('Are you sure you want to delete this content?')) {
            const success = fireflix.deleteContent(id);
            if (success) {
                alert('Content deleted successfully!');
                this.loadContentList();
                this.loadStatistics();
            }
        }
    }

    // Manage Telegram links
    manageLinks(id) {
        const item = fireflix.content.find(c => c.id === id);
        if (!item) return;

        const modalHTML = `
            <h2 style="color: #0088cc; margin-bottom: 20px;">
                <i class="fab fa-telegram"></i> Update Telegram Link
            </h2>
            <div style="margin-bottom: 25px;">
                <h3 style="color: white; margin-bottom: 10px;">${item.title}</h3>
                <p style="color: #aaa;">Current Link: ${item.telegramLink || 'Not set'}</p>
            </div>
            <div class="form-group">
                <label>New Telegram Link</label>
                <input type="url" id="new-telegram-link" value="${item.telegramLink || ''}" 
                    placeholder="https://t.me/yourchannel/123" style="width: 100%; padding: 15px;">
            </div>
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <button class="btn-save" onclick="admin.updateLink(${id})" 
                    style="background: #0088cc;">
                    <i class="fas fa-save"></i> Update Link
                </button>
                <button class="btn-danger" onclick="admin.closeModal()">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        `;

        this.showEditModal(modalHTML);
    }

    updateLink(id) {
        const newLink = document.getElementById('new-telegram-link').value;
        if (!newLink) {
            alert('Please enter a Telegram link');
            return;
        }

        const success = fireflix.updateContent(id, { telegramLink: newLink });
        if (success) {
            alert('Telegram link updated successfully!');
            this.closeModal();
            this.loadContentList();
        }
    }

    // Load links manager
    loadLinksManager() {
        const container = document.getElementById('links-container');
        const allContent = fireflix.content;

        if (allContent.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fab fa-telegram fa-3x"></i>
                    <h3>No Content Available</h3>
                    <p>Add content first to manage Telegram links</p>
                </div>
            `;
            return;
        }

        container.innerHTML = allContent.map(item => `
            <div class="link-item">
                <div class="link-info">
                    <h3>${item.title}</h3>
                    <p><strong>Category:</strong> ${item.category} | <strong>Quality:</strong> ${item.quality}</p>
                    <div class="link-input">
                        <input type="text" value="${item.telegramLink}" 
                            readonly id="link-${item.id}">
                        <button onclick="admin.copyLink('link-${item.id}')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                <div class="link-actions">
                    <button class="edit-btn" onclick="admin.manageLinks(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-test" onclick="window.open('${item.telegramLink}', '_blank')">
                        <i class="fab fa-telegram"></i> Test
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Load statistics
    loadStatistics() {
        const allContent = fireflix.content;
        
        document.getElementById('stat-total').textContent = allContent.length;
        document.getElementById('stat-movies').textContent = allContent.filter(c => c.category === 'movies').length;
        document.getElementById('stat-series').textContent = allContent.filter(c => c.category === 'series').length;
        document.getElementById('stat-anime').textContent = allContent.filter(c => c.category === 'anime').length;
        document.getElementById('stat-drama').textContent = allContent.filter(c => c.category === 'drama').length;
    }

    // Show edit modal
    showEditModal(content) {
        const modal = document.getElementById('edit-modal');
        const modalBody = document.getElementById('edit-modal-body');
        const closeBtn = modal.querySelector('.close');

        modalBody.innerHTML = content;
        modal.style.display = 'flex';

        closeBtn.onclick = () => this.closeModal();
        window.onclick = (e) => {
            if (e.target === modal) this.closeModal();
        };
    }

    closeModal() {
        document.getElementById('edit-modal').style.display = 'none';
    }

    // Copy link
    copyLink(inputId) {
        const input = document.getElementById(inputId);
        input.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    }
}

// Global functions for settings
function exportData() {
    const data = fireflix.content;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fireflix-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.getElementById('import-file');
    if (!input.files.length) {
        alert('Please select a JSON file');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                // Clear existing data
                localStorage.removeItem('fireflix-content');
                
                // Add imported data
                data.forEach(item => {
                    fireflix.addContent(item);
                });
                
                alert('Data imported successfully!');
                admin.loadContentList();
                admin.loadStatistics();
            } else {
                alert('Invalid data format');
            }
        } catch (error) {
            alert('Error parsing JSON file');
        }
    };
    
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Are you sure? This will delete ALL content permanently.')) {
        localStorage.removeItem('fireflix-content');
        window.location.reload();
    }
}

// Initialize Admin Panel
const admin = new AdminPanel();
window.admin = admin;
