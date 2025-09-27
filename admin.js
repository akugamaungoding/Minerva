const adminMenuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt', href: 'dashboard.html', color: 'primary' },
    { name: 'Manajemen Kontrak', icon: 'fas fa-file-contract', href: 'contracts.html', color: 'success' },
    { name: 'GPS Tracking', icon: 'fas fa-map-marked-alt', href: 'gps-tracking.html', color: 'info' },
    { name: 'AI Assistant', icon: 'fas fa-robot', href: 'ai.html', color: 'warning' },
        { name: 'Komunikasi', icon: 'fas fa-comments', href: 'komunikasi.html', color: 'info' },
        { name: 'E-Billing', icon: 'fas fa-file-invoice-dollar', href: 'billing.html', color: 'success' },
];

const adminDashboardItems = [
    { 
        name: 'Dashboard', 
        icon: 'fas fa-tachometer-alt', 
        description: 'Tinjauan umum proyek dan statistik',
        color: 'primary'
    },
    { 
        name: 'Manajemen Kontrak', 
        icon: 'fas fa-file-contract', 
        description: 'Kelola semua kontrak proyek',
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
    },
    { 
        name: 'QR Scanner', 
        icon: 'fas fa-qrcode', 
        description: 'Scan QR untuk melihat kontrak',
        color: 'success'
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
        case 'manajemen_kontrak':
            window.location.href = 'contracts.html';
            break;
        case 'komunikasi':
            showPage('communication');
            break;
        case 'ai_assistant':
            window.location.href = 'ai.html';
            break;
        case 'scanner':
            showPage('scanner');
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