const adminMenuItems = [
    { name: 'Dasbor', icon: 'fas fa-tachometer-alt', href: '#dashboard', color: 'primary' },
    { name: 'Manajemen Proyek', icon: 'fas fa-tasks', href: '#projects', color: 'success' },
    { name: 'Komunikasi', icon: 'fas fa-comments', href: '#communication', color: 'info' },
    { name: 'AI Assistant', icon: 'fas fa-robot', href: '#ai', color: 'warning' }
];

const adminDashboardItems = [
    { 
        name: 'Dasbor', 
        icon: 'fas fa-tachometer-alt', 
        description: 'Tinjauan umum proyek dan statistik',
        color: 'primary'
    },
    { 
        name: 'Manajemen Proyek', 
        icon: 'fas fa-tasks', 
        description: 'Kelola proyek, tim, dan tugas',
        color: 'success'
    },
    { 
        name: 'Komunikasi', 
        icon: 'fas fa-comments', 
        description: 'Chat dan kolaborasi tim',
        color: 'info'
    },
    { 
        name: 'AI Assistant', 
        icon: 'fas fa-robot', 
        description: 'Asisten AI untuk bantuan proyek',
        color: 'warning'
    }
];

function loadAdminDashboard() {
    setupNavigation(adminMenuItems);
    setupDashboard(adminDashboardItems);
    initializeAdminFeatures();
}

function initializeAdminFeatures() {
    console.log('Initializing admin features...');
    addAdminEventListeners();
    loadAdminData();
    setupAdminNotifications();
}

function addAdminEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-admin-action="create-project"]')) {
            handleCreateProject();
        }
        
        if (e.target.closest('[data-admin-action="manage-team"]')) {
            handleManageTeam();
        }
        
        if (e.target.closest('[data-admin-action="view-analytics"]')) {
            handleViewAnalytics();
        }
    });
}

function openAdminModule(moduleName) {
    switch(moduleName) {
        case 'dasbor':
            showPage('dashboard');
            break;
        case 'manajemen_proyek':
            showPage('projects');
            break;
        case 'komunikasi':
            showPage('communication');
            break;
        case 'ai_assistant':
            showPage('ai');
            break;
        default:
            showPage('dashboard');
    }
}

function handleCreateProject() {
    alert('Membuka form pembuatan proyek baru...');
}

function handleManageTeam() {
    alert('Membuka panel manajemen tim...');
}

function handleViewAnalytics() {
    alert('Membuka dashboard analitik...');
}

function loadAdminData() {
    console.log('Loading admin data...');
    setTimeout(() => {
        console.log('Admin data loaded successfully');
    }, 1000);
}

function setupAdminNotifications() {
    console.log('Setting up admin notifications...');
}

function getAdminStats() {
    return {
        totalProjects: 15,
        activeProjects: 8,
        totalUsers: 45,
        completedTasks: 234
    };
}

function exportAdminReport() {
    alert('Mengekspor laporan admin...');
}

function backupSystem() {
    alert('Memulai backup sistem...');
}

function validateAdminAccess() {
    return currentRole === 'admin';
}

function checkAdminPermissions(action) {
    if (!validateAdminAccess()) {
        showError('Akses ditolak. Hanya admin yang dapat melakukan aksi ini.');
        return false;
    }
    return true;
}

function handleAdminError(error) {
    console.error('Admin Error:', error);
    showError('Terjadi kesalahan pada sistem admin: ' + error.message);
}