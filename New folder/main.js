let currentUser = null;
let currentRole = null;
let currentTheme = 'light';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    initializeSidebar();
    loadTheme();
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username && password) {
        currentRole = determineRole(username);
        currentUser = username;
        showDashboard();
    } else {
        alert('Mohon isi semua field!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
            alert('Registrasi berhasil! Silakan login dengan akun baru Anda.');
            showLoginForm();
        } else {
            alert('Password tidak cocok!');
        }
    } else {
        alert('Mohon isi semua field!');
    }
}

function determineRole(username) {
    if (username.toLowerCase().includes('admin') || username.toLowerCase().includes('administrator')) {
        return 'admin';
    } else {
        return 'client';
    }
}

function showDashboard() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    
    document.getElementById('welcomeUser').textContent = currentUser;
    document.getElementById('welcomeUser2').textContent = currentUser;
    document.getElementById('currentUser').textContent = currentUser;
    document.getElementById('userRole').textContent = currentRole.toUpperCase();
    
    if (currentRole === 'admin') {
        loadAdminDashboard();
    } else {
        loadClientDashboard();
    }
    
    showPage('dashboard');
}

function logout() {
    currentUser = null;
    currentRole = null;
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').reset();
    }
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').reset();
    }
    
    showLoginForm();
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authToggle').innerHTML = 'Belum punya akun? <a href="#" onclick="showRegisterForm()">Daftar di sini</a>';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authToggle').innerHTML = 'Sudah punya akun? <a href="#" onclick="showLoginForm()">Login di sini</a>';
}

function initializeSidebar() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
}

function setupNavigation(menuItems) {
    const navMenu = document.getElementById('sidebarNav');
    navMenu.innerHTML = '';
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <a class="nav-link" href="#" onclick="showPage('${item.name.toLowerCase().replace(' ', '_')}')">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        `;
        navMenu.appendChild(li);
    });
}

function setupDashboard(menuItems) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card dashboard-card ${currentRole}-card h-100 fade-in">
                <div class="card-body text-center p-4">
                    <div class="card-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <h5 class="card-title text-${item.color}">${item.name}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                    <button class="btn btn-outline-${item.color}" onclick="showPage('${item.name.toLowerCase().replace(' ', '_')}')">
                        <i class="fas fa-arrow-right me-2"></i>Buka
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(col);
    });
}

function showPage(pageName) {
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        document.getElementById('dashboardContent').style.display = 'none';
    } else {
        document.getElementById('dashboardContent').style.display = 'block';
        document.getElementById('dashboardPage').classList.add('active');
    }
    
    if (pageName === 'dashboard') {
        loadDashboardData();
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    const themeIconNavbar = document.getElementById('themeIconNavbar');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIconNavbar.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIconNavbar.className = 'fas fa-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    const themeIconNavbar = document.getElementById('themeIconNavbar');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIconNavbar.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIconNavbar.className = 'fas fa-moon';
    }
}

function showChangePasswordModal() {
    const modal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
    modal.show();
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    if (newPassword === confirmNewPassword) {
        alert('Password berhasil diganti!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
        modal.hide();
        document.getElementById('changePasswordForm').reset();
    } else {
        alert('Password baru tidak cocok!');
    }
}

function exportReport() {
    alert('Laporan berhasil diekspor!');
}

function backupSystem() {
    alert('Backup sistem berhasil dilakukan!');
}

function formatModuleName(name) {
    return name.toLowerCase().replace(/\s+/g, '_');
}

function addFadeInAnimation(element) {
    element.classList.add('fade-in');
}

function addSlideInAnimation(element) {
    element.classList.add('slide-in');
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    console.log('Success: ' + message);
}