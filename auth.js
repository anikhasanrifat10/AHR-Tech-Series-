class AdminAuth {
    constructor() {
        this.password = "Rashni@2215";
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupLogin();
    }

    checkAuth() {
        const loggedIn = localStorage.getItem('ahr-admin') === 'true';
        const page = location.pathname.split('/').pop();
        
        if (page === 'admin-panel.html' && !loggedIn) {
            location.href = 'admin-login.html';
        }
        if (page === 'admin-login.html' && loggedIn) {
            location.href = 'admin-panel.html';
        }
    }

    setupLogin() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.login();
            };
        }
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.onclick = () => this.logout();
        }
    }

    login() {
        const input = document.getElementById('adminPassword');
        const error = document.getElementById('loginError');
        
        if (input.value === this.password) {
            localStorage.setItem('ahr-admin', 'true');
            location.href = 'admin-panel.html';
        } else {
            if (error) {
                error.style.display = 'block';
                error.textContent = 'Wrong password! Try: admin123';
            }
        }
    }

    logout() {
        localStorage.removeItem('ahr-admin');
        location.href = 'admin-login.html';
    }

    isLoggedIn() {
        return localStorage.getItem('ahr-admin') === 'true';
    }
}

const adminAuth = new AdminAuth();
window.adminAuth = adminAuth;
