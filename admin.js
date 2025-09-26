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

// Load admin dashboard
function loadAdminDashboard() {
    setupNavigation(adminMenuItems);
    setupDashboard(adminDashboardItems);
    initializeAdminFeatures();
}

// Initialize admin-specific features
function initializeAdminFeatures() {
    console.log('Initializing admin features...');
    
    // Add admin-specific event listeners
    addAdminEventListeners();
    
    // Load admin data
    loadAdminData();
    
    // Setup admin notifications
    setupAdminNotifications();
}

// Add admin-specific event listeners
function addAdminEventListeners() {
    // Project management events
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

// Admin-specific module handlers
function openAdminModule(moduleName) {
    switch(moduleName) {
        case 'dasbor':
            openAdminDashboard();
            break;
        case 'manajemen_proyek':
            openProjectManagement();
            break;
        case 'komunikasi':
            openAdminCommunication();
            break;
        case 'ai_assistant':
            openAdminAI();
            break;
        default:
            openModule(moduleName);
    }
}

// Admin Dashboard Module
function openAdminDashboard() {
    alert('Admin Dashboard\n\nFitur yang tersedia:\n- Statistik proyek\n- Grafik performa\n- Notifikasi sistem\n- Laporan harian');
}

// Project Management Module
function openProjectManagement() {
    alert('Manajemen Proyek\n\nFitur yang tersedia:\n- Buat proyek baru\n- Kelola tim\n- Assign tugas\n- Monitor progress\n- Generate laporan');
}

// Admin Communication Module
function openAdminCommunication() {
    alert('Komunikasi Admin\n\nFitur yang tersedia:\n- Chat dengan semua tim\n- Broadcast message\n- Manage channels\n- File sharing\n- Video conference');
}

// Admin AI Assistant Module
function openAdminAI() {
    alert('AI Assistant Admin\n\nFitur yang tersedia:\n- Analisis proyek otomatis\n- Prediksi risiko\n- Optimasi resource\n- Smart recommendations\n- Automated reporting');
}

// Admin-specific handlers
function handleCreateProject() {
    alert('Membuka form pembuatan proyek baru...');
}

function handleManageTeam() {
    alert('Membuka panel manajemen tim...');
}

function handleViewAnalytics() {
    alert('Membuka dashboard analitik...');
}

// Load admin data
function loadAdminData() {
    // Simulate loading admin-specific data
    console.log('Loading admin data...');
    
    // You can add AJAX calls here to load real data
    setTimeout(() => {
        console.log('Admin data loaded successfully');
    }, 1000);
}

// Setup admin notifications
function setupAdminNotifications() {
    // Simulate admin notifications
    console.log('Setting up admin notifications...');
    
    // You can add real-time notification system here
}

// Admin utility functions
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

// Admin validation functions
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

// Admin-specific error handling
function handleAdminError(error) {
    console.error('Admin Error:', error);
    showError('Terjadi kesalahan pada sistem admin: ' + error.message);
}
