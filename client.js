// ProjectHub - Client Specific Functions

// Client menu configuration
const clientMenuItems = [
    { name: 'Dasbor', icon: 'fas fa-tachometer-alt', href: '#dashboard', color: 'primary' },
    { name: 'Komunikasi', icon: 'fas fa-comments', href: '#communication', color: 'info' },
    { name: 'AI Assistant', icon: 'fas fa-robot', href: '#ai', color: 'warning' }
];

// Client dashboard configuration
const clientDashboardItems = [
    { 
        name: 'Dasbor', 
        icon: 'fas fa-tachometer-alt', 
        description: 'Tinjauan proyek Anda',
        color: 'primary'
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
    }
];

// Load client dashboard
function loadClientDashboard() {
    setupNavigation(clientMenuItems);
    setupDashboard(clientDashboardItems);
    initializeClientFeatures();
}

// Initialize client-specific features
function initializeClientFeatures() {
    console.log('Initializing client features...');
    
    // Add client-specific event listeners
    addClientEventListeners();
    
    // Load client data
    loadClientData();
    
    // Setup client notifications
    setupClientNotifications();
}

// Add client-specific event listeners
function addClientEventListeners() {
    // Client-specific events
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

// Client-specific module handlers
function openClientModule(moduleName) {
    switch(moduleName) {
        case 'dasbor':
            openClientDashboard();
            break;
        case 'komunikasi':
            openClientCommunication();
            break;
        case 'ai_assistant':
            openClientAI();
            break;
        default:
            openModule(moduleName);
    }
}

// Client Dashboard Module
function openClientDashboard() {
    alert('Client Dashboard\n\nFitur yang tersedia:\n- Progress proyek Anda\n- Status pembayaran\n- Timeline proyek\n- Dokumen proyek\n- Update terbaru');
}

// Client Communication Module
function openClientCommunication() {
    alert('Komunikasi Client\n\nFitur yang tersedia:\n- Chat dengan tim proyek\n- Kirim feedback\n- Upload file\n- Request meeting\n- View project updates');
}

// Client AI Assistant Module
function openClientAI() {
    alert('AI Assistant Client\n\nFitur yang tersedia:\n- Tanya tentang proyek\n- Minta penjelasan teknis\n- Cari informasi dokumen\n- Bantuan umum\n- Tips dan saran');
}

// Client-specific handlers
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

// Load client data
function loadClientData() {
    // Simulate loading client-specific data
    console.log('Loading client data...');
    
    // You can add AJAX calls here to load real data
    setTimeout(() => {
        console.log('Client data loaded successfully');
    }, 1000);
}

// Setup client notifications
function setupClientNotifications() {
    // Simulate client notifications
    console.log('Setting up client notifications...');
    
    // You can add real-time notification system here
}

// Client utility functions
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

// Client validation functions
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

// Client-specific error handling
function handleClientError(error) {
    console.error('Client Error:', error);
    showError('Terjadi kesalahan pada sistem klien: ' + error.message);
}

// Client feedback functions
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

// Client project management
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
    
    // Simulate project details
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
