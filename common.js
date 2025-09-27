// Common Theme and Language Functions
// This file contains shared functions for theme and language management

// Theme Management
let currentTheme = 'light';

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    localStorage.setItem('theme', currentTheme);
    
    const themeIcon = document.getElementById('themeIconNavbar');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    
    const themeIcon = document.getElementById('themeIconNavbar');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Language Management
let currentLanguage = 'id';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function loadLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'id';
    currentLanguage = savedLanguage;
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations && translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations && translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Sidebar Management
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar) return;
    
    // Check if we're on mobile (screen width <= 768px)
    if (window.innerWidth <= 768) {
        // Mobile behavior
        sidebar.classList.toggle('show');
        if (overlay) {
            overlay.classList.toggle('show');
        }
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    } else {
        // Desktop behavior
        sidebar.classList.toggle('collapsed');
        if (mainContent) {
            mainContent.classList.toggle('expanded');
        }
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar) return;
    
    // Close sidebar
    sidebar.classList.remove('show', 'collapsed');
    if (overlay) {
        overlay.classList.remove('show');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!sidebar) return;
    
    // If resizing to desktop, remove mobile classes
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
        if (overlay) {
            overlay.classList.remove('show');
        }
        document.body.style.overflow = '';
    }
    // If resizing to mobile, remove desktop classes
    else {
        sidebar.classList.remove('collapsed');
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.classList.remove('expanded');
        }
    }
}

// Add resize listener
window.addEventListener('resize', handleResize);

// Initialize common functions
function initializeCommon() {
    loadTheme();
    loadLanguage();
}

// Logout Function
function logout() {
    const currentUser = localStorage.getItem('currentUser');
    const currentRole = localStorage.getItem('currentRole');
    
    // Clear user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    
    // Redirect to login page
    window.location.href = 'index.html';
}

// Call initializeCommon when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCommon);
