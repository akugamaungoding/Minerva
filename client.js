const clientMenuItems = [
    { name: 'Dasbor', icon: 'fas fa-tachometer-alt', href: '#dashboard', color: 'primary' },
    { name: 'Manajemen Kontrak', icon: 'fas fa-file-contract', href: '#contracts', color: 'success'},
    { name: 'Komunikasi', icon: 'fas fa-comments', href: '#communication', color: 'info' },
    { name: 'AI Assistant', icon: 'fas fa-robot', href: '#ai', color: 'warning' },
    { name: 'QR Scanner', icon: 'fas fa-qrcode', href: 'scan.html', color: 'primary' }
];

const clientDashboardItems = [
    { 
        name: 'Dasbor', 
        icon: 'fas fa-tachometer-alt', 
        description: 'Tinjauan proyek Anda',
        color: 'primary'
    },
    { 
        name: 'Manajemen_Kontrak', 
        icon: 'fas fa-file-contract', 
        description: 'Kelola kontrak proyek',
        color: 'success'
    },
    { 
        name: 'Komunikasi', 
        icon: 'fas fa-comments', 
        description: 'Chat dengan tim proyek',
        color: 'info'
    },
    { 
        name: 'AI Assistant', 
        icon: 'fas fa-robot', 
        description: 'Asisten AI untuk bantuan',
        color: 'warning'
    },
    { 
        name: 'QR Scanner', 
        icon: 'fas fa-qrcode', 
        description: 'Scan QR untuk melihat kontrak',
        color: 'success',
        href: 'scan.html'
    }
];

function loadClientDashboard() {
    setupNavigation(clientMenuItems);
    setupDashboard(clientDashboardItems);
    initializeClientFeatures();
}

function initializeClientFeatures() {
    console.log('Initializing client features...');
    addClientEventListeners();
    loadClientData();
    setupClientNotifications();
}

function addClientEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-client-action="view-progress"]')) {
            handleViewProgress();
        }
        
        if (e.target.closest('[data-client-action="send-message"]')) {
            handleSendMessage();
        }
        
        if (e.target.closest('[data-client-action="request-update"]')) {
            handleRequestUpdate();
        }
        
        if (e.target.closest('[data-client-action="get-help"]')) {
            handleGetHelp();
        }
    });
}

function openClientModule(moduleName) {
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
            showPage('ai');
            break;
        case 'scannerPage':
            window.location.href = 'scan.html';
            break;
        default:
            showPage('dashboard');
    }
}

function handleViewProgress() {
    alert('Melihat progress proyek Anda...');
}

function handleSendMessage() {
    alert('Membuka chat dengan tim proyek...');
}

function handleRequestUpdate() {
    alert('Mengirim permintaan update proyek...');
}

function handleGetHelp() {
    alert('Membuka bantuan AI...');
}

function loadClientData() {
    console.log('Loading client data...');
    setTimeout(() => {
        console.log('Client data loaded successfully');
    }, 1000);
}

function setupClientNotifications() {
    console.log('Setting up client notifications...');
}

function getClientStats() {
    return {
        myProjects: 3,
        activeProjects: 2,
        completedProjects: 1,
        pendingApprovals: 2
    };
}

function requestProjectUpdate(projectId) {
    if (!validateClientAccess()) {
        showError('Akses ditolak.');
        return;
    }
    alert(`Mengirim permintaan update untuk proyek ${projectId}...`);
}

function downloadProjectDocument(documentId) {
    if (!validateClientAccess()) {
        showError('Akses ditolak.');
        return;
    }
    alert(`Mengunduh dokumen ${documentId}...`);
}

function validateClientAccess() {
    return currentRole === 'client';
}

function checkClientPermissions(action) {
    if (!validateClientAccess()) {
        showError('Akses ditolak. Hanya klien yang dapat melakukan aksi ini.');
        return false;
    }
    return true;
}

function handleClientError(error) {
    console.error('Client Error:', error);
    showError('Terjadi kesalahan pada sistem klien: ' + error.message);
}

function submitFeedback(feedback) {
    if (!checkClientPermissions('submit_feedback')) {
        return false;
    }
    alert('Feedback berhasil dikirim: ' + feedback);
    return true;
}

function rateProject(projectId, rating) {
    if (!checkClientPermissions('rate_project')) {
        return false;
    }
    alert(`Rating proyek ${projectId}: ${rating} bintang`);
    return true;
}

function getMyProjects() {
    if (!validateClientAccess()) {
        return [];
    }
    return [
        { id: 1, name: 'Website E-commerce', status: 'active', progress: 75 },
        { id: 2, name: 'Mobile App', status: 'pending', progress: 30 },
        { id: 3, name: 'Branding Package', status: 'completed', progress: 100 }
    ];
}

function getProjectDetails(projectId) {
    if (!checkClientPermissions('view_project_details')) {
        return null;
    }
    return {
        id: projectId,
        name: 'Website E-commerce',
        description: 'Pembuatan website e-commerce lengkap',
        status: 'active',
        progress: 75,
        startDate: '2024-01-15',
        expectedEndDate: '2024-03-15',
        team: ['John Doe', 'Jane Smith', 'Mike Johnson']
    };
}
//komen aja