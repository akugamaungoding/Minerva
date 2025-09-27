let currentUser = null;
let currentRole = null;
let activityLog = [];
let charts = {};
let notifications = [];
let recentProjects = [];
let recentContracts = [];
let recentPayments = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    currentUser = localStorage.getItem('currentUser');
    currentRole = localStorage.getItem('currentRole');
    
    if (!currentUser || !currentRole) {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize dashboard
    initializeDashboard();
    initializeSidebar();
    initializeActivityLog();
    initializeNotifications();
    initializeRecentData();
});

function initializeDashboard() {
    document.getElementById('welcomeUser').textContent = currentUser;
    document.getElementById('welcomeUser2').textContent = currentUser;
    document.getElementById('currentUser').textContent = currentUser;
    document.getElementById('userRole').textContent = currentRole.toUpperCase();
    
    if (currentRole === 'admin') {
        loadAdminDashboard();
    } else {
        loadClientDashboard();
    }
    
    // Show dashboard page directly (no menu items)
    document.getElementById('dashboardPage').classList.add('active');
}

function loadAdminDashboard() {
    // Setup navigation with admin menu items
    if (typeof adminMenuItems !== 'undefined') {
        setupNavigation(adminMenuItems);
    }
    
    // Load admin dashboard data
    loadDashboardData();
}

function loadClientDashboard() {
    // Setup navigation with client menu items
    if (typeof clientMenuItems !== 'undefined') {
        setupNavigation(clientMenuItems);
    }
    
    // Load client dashboard data
    loadDashboardData();
}

function loadDashboardData() {
    // Load dashboard statistics immediately
    updateDashboardStats();
    
    // Load charts with delay
    setTimeout(() => {
        initializeCharts();
    }, 1000);
    
    // Load recent data
    setTimeout(() => {
        showRecentProjects();
        showRecentContracts();
        showRecentPayments();
        populateNotifications();
    }, 1500);
}

function updateDashboardStats() {
    console.log('Updating dashboard stats...');
    
    // Simple stats - langsung set tanpa animasi dulu
    const stats = {
        totalProjects: 47,
        activeProjects: 23,
        completedTasks: 156,
        teamMembers: 28,
        totalContracts: 89,
        activeContracts: 34,
        completedContracts: 55,
        totalRevenue: 2450000000,
        monthlyRevenue: 180000000,
        pendingBills: 12,
        overdueBills: 5,
        completedPayments: 234,
        pendingPayments: 8,
        totalClients: 67,
        activeClients: 45,
        newClients: 8,
        totalVehicles: 45,
        activeVehicles: 38,
        maintenanceVehicles: 7,
        totalDrivers: 32,
        activeDrivers: 28,
        onDutyDrivers: 15,
        totalWarehouses: 12,
        occupiedWarehouses: 9,
        availableWarehouses: 3,
        totalCapacity: 15000,
        usedCapacity: 11250,
        availableCapacity: 3750
    };
    
    // Set values directly first
    setStatValue('totalProjects', stats.totalProjects);
    setStatValue('activeProjects', stats.activeProjects);
    setStatValue('completedTasks', stats.completedTasks);
    setStatValue('teamMembers', stats.teamMembers);
    setStatValue('totalContracts', stats.totalContracts);
    setStatValue('activeContracts', stats.activeContracts);
    setStatValue('completedContracts', stats.completedContracts);
    setStatValue('totalRevenue', stats.totalRevenue);
    setStatValue('monthlyRevenue', stats.monthlyRevenue);
    setStatValue('pendingBills', stats.pendingBills);
    setStatValue('overdueBills', stats.overdueBills);
    setStatValue('completedPayments', stats.completedPayments);
    setStatValue('pendingPayments', stats.pendingPayments);
    setStatValue('totalClients', stats.totalClients);
    setStatValue('activeClients', stats.activeClients);
    setStatValue('newClients', stats.newClients);
    setStatValue('totalVehicles', stats.totalVehicles);
    setStatValue('activeVehicles', stats.activeVehicles);
    setStatValue('maintenanceVehicles', stats.maintenanceVehicles);
    setStatValue('totalDrivers', stats.totalDrivers);
    setStatValue('activeDrivers', stats.activeDrivers);
    setStatValue('onDutyDrivers', stats.onDutyDrivers);
    setStatValue('totalWarehouses', stats.totalWarehouses);
    setStatValue('occupiedWarehouses', stats.occupiedWarehouses);
    setStatValue('availableWarehouses', stats.availableWarehouses);
    setStatValue('totalCapacity', stats.totalCapacity);
    setStatValue('usedCapacity', stats.usedCapacity);
    setStatValue('availableCapacity', stats.availableCapacity);
    
    console.log('Dashboard stats updated');
}

function setStatValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        if (value > 1000) {
            element.textContent = value.toLocaleString('id-ID');
        } else {
            element.textContent = value;
        }
        console.log(`Set ${elementId} to ${value}`);
    } else {
        console.log(`Element ${elementId} not found`);
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.log(`Element ${elementId} not found`);
        return;
    }
    
    const startValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        // Format numbers with commas for large values
        if (targetValue > 1000) {
            element.textContent = Math.floor(currentValue).toLocaleString('id-ID');
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

function initializeCharts() {
    console.log('Initializing charts...');
    
    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded, retrying...');
        setTimeout(initializeCharts, 200);
        return;
    }
    
    // Initialize contract status chart
    const contractStatusCtx = document.getElementById('contractStatusChart');
    console.log('Contract status chart element:', contractStatusCtx);
    if (contractStatusCtx) {
        try {
            charts.contractStatus = new Chart(contractStatusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'Pending', 'Completed', 'Expired'],
                    datasets: [{
                        data: [34, 12, 55, 8],
                        backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            console.log('Contract status chart created successfully');
        } catch (error) {
            console.error('Error creating contract status chart:', error);
        }
    } else {
        console.log('Contract status chart element not found');
    }
    
    // Initialize risk chart
    const riskCtx = document.getElementById('riskChart');
    console.log('Risk chart element:', riskCtx);
    if (riskCtx) {
        try {
            charts.risk = new Chart(riskCtx, {
                type: 'bar',
                data: {
                    labels: ['Low', 'Medium', 'High', 'Critical'],
                    datasets: [{
                        label: 'Risk Level',
                        data: [15, 8, 3, 1],
                        backgroundColor: [
                            '#28a745',
                            '#ffc107',
                            '#fd7e14',
                            '#dc3545'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            console.log('Risk chart created successfully');
        } catch (error) {
            console.error('Error creating risk chart:', error);
        }
    }
    
    // Initialize progress chart
    const progressCtx = document.getElementById('progressChart');
    console.log('Progress chart element:', progressCtx);
    if (progressCtx) {
        try {
            charts.progress = new Chart(progressCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Project Progress (%)',
                        data: [20, 35, 50, 65, 80, 95],
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            console.log('Progress chart created successfully');
        } catch (error) {
            console.error('Error creating progress chart:', error);
        }
    }
    
    console.log('All charts initialized');
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
            <a class="nav-link" href="${item.href}">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        `;
        navMenu.appendChild(li);
    });
}

// Menu items removed - dashboard now shows only charts and stats

function showPage(pageName) {
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Hide the menu grid by default
    document.getElementById('dashboardContent').style.display = 'none';
    
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize page-specific functionality
        if (pageName === 'scanner') {
            initializeQRScanner();
        }
    } else {
        // If no specific page found, show the menu grid
        document.getElementById('dashboardContent').style.display = 'block';
    }
    
    if (pageName === 'dashboard') {
        loadDashboardData();
    } else if (pageName === 'communication') {
        loadCommunicationPage();
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
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Password berhasil diganti!',
            confirmButtonText: 'OK'
        });
        const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
        modal.hide();
        document.getElementById('changePasswordForm').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Password baru tidak cocok!',
            confirmButtonText: 'OK'
        });
    }
}

function exportReport() {
    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Laporan berhasil diekspor!',
        confirmButtonText: 'OK'
    });
}

function backupSystem() {
    Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Backup sistem berhasil dilakukan!',
        confirmButtonText: 'OK'
    });
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
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error: ' + message,
        confirmButtonText: 'OK'
    });
}

function showSuccess(message) {
    console.log('Success: ' + message);
}


// Activity Log Management
function initializeActivityLog() {
    // Comprehensive activity log data
    activityLog = [
        {
            timestamp: new Date().toISOString(),
            user: 'admin',
            action: 'login',
            description: 'User logged in successfully',
            ipAddress: '192.168.1.1'
        },
        {
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            user: 'PT. Maju Jaya',
            action: 'payment',
            description: 'Made payment for Bill #BILL-001 - Rp 50,000,000',
            ipAddress: '192.168.1.2'
        },
        {
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            user: 'Driver Budi',
            action: 'delivery',
            description: 'Started delivery Jakarta to Surabaya - Container #CTN-001',
            ipAddress: '192.168.1.3'
        },
        {
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            user: 'Warehouse Manager',
            action: 'warehouse',
            description: 'Received goods at Warehouse Jakarta - 150 packages',
            ipAddress: '192.168.1.4'
        },
        {
            timestamp: new Date(Date.now() - 14400000).toISOString(),
            user: 'PT. Semarang Cargo',
            action: 'contract',
            description: 'Signed new contract #KONTRAK_25012024_007',
            ipAddress: '192.168.1.5'
        },
        {
            timestamp: new Date(Date.now() - 18000000).toISOString(),
            user: 'system',
            action: 'report',
            description: 'Generated Monthly Revenue Report - January 2024',
            ipAddress: '192.168.1.1'
        },
        {
            timestamp: new Date(Date.now() - 21600000).toISOString(),
            user: 'CV. Medan Fresh',
            action: 'payment',
            description: 'Uploaded payment proof for Payment #PAY-006',
            ipAddress: '192.168.1.6'
        },
        {
            timestamp: new Date(Date.now() - 25200000).toISOString(),
            user: 'admin',
            action: 'approve',
            description: 'Approved payment #PAY-005 - Rp 75,000,000',
            ipAddress: '192.168.1.1'
        },
        {
            timestamp: new Date(Date.now() - 28800000).toISOString(),
            user: 'PT. Bandung Storage',
            action: 'request',
            description: 'Requested cold storage warehouse - 500 sqm',
            ipAddress: '192.168.1.7'
        },
        {
            timestamp: new Date(Date.now() - 32400000).toISOString(),
            user: 'Driver Sari',
            action: 'delivery',
            description: 'Completed delivery Surabaya to Bandung - 2 containers',
            ipAddress: '192.168.1.8'
        },
        {
            timestamp: new Date(Date.now() - 36000000).toISOString(),
            user: 'PT. Makassar Fresh',
            action: 'contract',
            description: 'Extended contract #KONTRAK_28012024_009 for 6 months',
            ipAddress: '192.168.1.9'
        },
        {
            timestamp: new Date(Date.now() - 39600000).toISOString(),
            user: 'system',
            action: 'maintenance',
            description: 'Detected maintenance needed for Vehicle #VH-015 - Brake system',
            ipAddress: '192.168.1.1'
        },
        {
            timestamp: new Date(Date.now() - 43200000).toISOString(),
            user: 'CV. Bali Logistics',
            action: 'cancel',
            description: 'Cancelled order #ORD-2024-001 - Jakarta to Bali',
            ipAddress: '192.168.1.10'
        },
        {
            timestamp: new Date(Date.now() - 46800000).toISOString(),
            user: 'admin',
            action: 'update',
            description: 'Updated pricing for Jakarta-Surabaya route (+15%)',
            ipAddress: '192.168.1.1'
        },
        {
            timestamp: new Date(Date.now() - 50400000).toISOString(),
            user: 'PT. Palembang Port',
            action: 'schedule',
            description: 'Scheduled container pickup for tomorrow 08:00',
            ipAddress: '192.168.1.11'
        },
        {
            timestamp: new Date(Date.now() - 54000000).toISOString(),
            user: 'Warehouse Staff',
            action: 'inventory',
            description: 'Updated inventory at Warehouse Medan - 1,250 items',
            ipAddress: '192.168.1.12'
        },
        {
            timestamp: new Date(Date.now() - 57600000).toISOString(),
            user: 'PT. Manado Storage',
            action: 'payment',
            description: 'Payment failed for Bill #BILL-014 - Insufficient funds',
            ipAddress: '192.168.1.13'
        },
        {
            timestamp: new Date(Date.now() - 61200000).toISOString(),
            user: 'Driver Ahmad',
            action: 'delivery',
            description: 'Started delivery Pontianak to Banjarmasin - 1 container',
            ipAddress: '192.168.1.14'
        },
        {
            timestamp: new Date(Date.now() - 64800000).toISOString(),
            user: 'CV. Jogja Storage',
            action: 'contract',
            description: 'Contract #KONTRAK_30012024_008 expired - needs renewal',
            ipAddress: '192.168.1.15'
        },
        {
            timestamp: new Date(Date.now() - 68400000).toISOString(),
            user: 'admin',
            action: 'create',
            description: 'Created new warehouse location in Balikpapan',
            ipAddress: '192.168.1.1'
        }
    ];
}

// Initialize Notifications
function initializeNotifications() {
    notifications = [
        {
            id: 1,
            title: 'Payment Received',
            message: 'Payment of Rp 50,000,000 received from PT. Maju Jaya',
            type: 'success',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            read: false
        },
        {
            id: 2,
            title: 'Contract Expiring Soon',
            message: 'Contract #KONTRAK_30012024_008 expires in 5 days',
            type: 'warning',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: false
        },
        {
            id: 3,
            title: 'Delivery Completed',
            message: 'Delivery to Surabaya completed successfully',
            type: 'info',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            read: true
        },
        {
            id: 4,
            title: 'Maintenance Required',
            message: 'Vehicle #VH-015 requires brake system maintenance',
            type: 'danger',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            read: false
        },
        {
            id: 5,
            title: 'New Contract Signed',
            message: 'New contract signed with PT. Semarang Cargo',
            type: 'success',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            read: true
        },
        {
            id: 6,
            title: 'Payment Pending Verification',
            message: 'Payment #PAY-006 requires verification - proof uploaded',
            type: 'warning',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            read: false
        },
        {
            id: 7,
            title: 'Warehouse Full',
            message: 'Warehouse Jakarta is 95% full - consider expansion',
            type: 'info',
            timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
            read: true
        },
        {
            id: 8,
            title: 'Order Cancelled',
            message: 'Order #ORD-2024-001 cancelled by CV. Bali Logistics',
            type: 'danger',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            read: false
        }
    ];
}

// Initialize Recent Data
function initializeRecentData() {
    recentProjects = [
        {
            id: 'PROJ-001',
            name: 'Pengiriman Logistik Jakarta',
            client: 'PT. Maju Jaya',
            status: 'active',
            progress: 75,
            startDate: '2024-01-15',
            endDate: '2024-02-15',
            value: 500000000
        },
        {
            id: 'PROJ-002',
            name: 'Cold Storage Medan',
            client: 'CV. Medan Fresh',
            status: 'active',
            progress: 60,
            startDate: '2024-01-10',
            endDate: '2024-02-10',
            value: 400000000
        },
        {
            id: 'PROJ-003',
            name: 'Warehouse Management Bandung',
            client: 'PT. Bandung Storage',
            status: 'completed',
            progress: 100,
            startDate: '2024-01-05',
            endDate: '2024-01-30',
            value: 600000000
        },
        {
            id: 'PROJ-004',
            name: 'Distribusi Ekspor Semarang',
            client: 'PT. Semarang Cargo',
            status: 'pending',
            progress: 0,
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            value: 850000000
        },
        {
            id: 'PROJ-005',
            name: 'Bongkar Muat Palembang',
            client: 'PT. Palembang Port',
            status: 'active',
            progress: 45,
            startDate: '2024-01-20',
            endDate: '2024-02-20',
            value: 950000000
        }
    ];

    recentContracts = [
        {
            id: 'KONTRAK_15012024_001',
            client: 'PT. Maju Jaya',
            type: 'Pengiriman Logistik',
            value: 500000000,
            startDate: '2024-01-15',
            endDate: '2024-08-15',
            status: 'active'
        },
        {
            id: 'KONTRAK_10012024_005',
            client: 'CV. Medan Fresh',
            type: 'Cold Storage',
            value: 400000000,
            startDate: '2024-01-10',
            endDate: '2024-07-10',
            status: 'active'
        },
        {
            id: 'KONTRAK_05012024_006',
            client: 'PT. Bandung Storage',
            type: 'Warehouse Management',
            value: 600000000,
            startDate: '2024-01-05',
            endDate: '2024-01-30',
            status: 'completed'
        },
        {
            id: 'KONTRAK_25012024_007',
            client: 'PT. Semarang Cargo',
            type: 'Distribusi Ekspor',
            value: 850000000,
            startDate: '2024-02-01',
            endDate: '2024-08-01',
            status: 'pending'
        },
        {
            id: 'KONTRAK_22012024_010',
            client: 'PT. Palembang Port',
            type: 'Bongkar Muat',
            value: 950000000,
            startDate: '2024-01-20',
            endDate: '2024-07-20',
            status: 'active'
        }
    ];

    recentPayments = [
        {
            id: 'PAY-001',
            billId: 'BILL-001',
            client: 'PT. Maju Jaya',
            amount: 50000000,
            method: 'Bank Transfer',
            status: 'completed',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'PAY-002',
            billId: 'BILL-002',
            client: 'CV. Sukses Mandiri',
            amount: 25000000,
            method: 'Credit Card',
            status: 'completed',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'PAY-003',
            billId: 'BILL-004',
            client: 'PT. Batam Logistics',
            amount: 100000000,
            method: 'E-Wallet',
            status: 'completed',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'PAY-004',
            billId: 'BILL-006',
            client: 'PT. Bandung Storage',
            amount: 60000000,
            method: 'Bank Transfer',
            status: 'completed',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: 'PAY-005',
            billId: 'BILL-007',
            client: 'PT. Maju Jaya',
            amount: 75000000,
            method: 'Credit Card',
            status: 'completed',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
    ];
}

function showActivityLog() {
    const modal = new bootstrap.Modal(document.getElementById('activityLogModal'));
    modal.show();
    populateActivityLog();
}

function populateActivityLog() {
    const tbody = document.getElementById('activityLogTable');
    tbody.innerHTML = '';
    
    activityLog.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(log.timestamp).toLocaleString()}</td>
            <td><span class="badge bg-${log.user === 'admin' ? 'primary' : 'secondary'}">${log.user}</span></td>
            <td><span class="badge bg-${getActionColor(log.action)}">${log.action}</span></td>
            <td>${log.description}</td>
            <td><code>${log.ipAddress}</code></td>
        `;
        tbody.appendChild(row);
    });
}

function getActionColor(action) {
    const colors = {
        'login': 'success',
        'logout': 'warning',
        'create': 'info',
        'update': 'primary',
        'delete': 'danger',
        'payment': 'info',
        'delivery': 'secondary',
        'warehouse': 'dark',
        'contract': 'primary',
        'report': 'info',
        'approve': 'success',
        'request': 'warning',
        'cancel': 'danger',
        'schedule': 'info',
        'inventory': 'secondary',
        'maintenance': 'warning'
    };
    return colors[action] || 'secondary';
}

// Notification Management
function showNotifications() {
    const modal = new bootstrap.Modal(document.getElementById('notificationsModal'));
    modal.show();
    populateNotifications();
}

function populateNotifications() {
    const container = document.getElementById('notificationsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `alert alert-${notification.type} alert-dismissible fade show ${notification.read ? '' : 'border-start border-4 border-${notification.type}'}`;
        notificationElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="alert-heading mb-1">${notification.title}</h6>
                    <p class="mb-1">${notification.message}</p>
                    <small class="text-muted">${notification.timestamp.toLocaleString()}</small>
                </div>
                <button type="button" class="btn-close" onclick="markNotificationAsRead(${notification.id})"></button>
            </div>
        `;
        container.appendChild(notificationElement);
    });
}

function markNotificationAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        populateNotifications();
    }
}

// Recent Data Display
function showRecentProjects() {
    const container = document.getElementById('recentProjectsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    recentProjects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'card mb-3';
        projectElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${project.name}</h6>
                    <span class="badge bg-${getProjectStatusColor(project.status)}">${project.status}</span>
                </div>
                <p class="card-text text-muted mb-2">Client: ${project.client}</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted">Progress: ${project.progress}%</small>
                    <small class="text-muted">Value: Rp ${project.value.toLocaleString('id-ID')}</small>
                </div>
                <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar bg-${getProjectStatusColor(project.status)}" style="width: ${project.progress}%"></div>
                </div>
                <div class="d-flex justify-content-between">
                    <small class="text-muted">Start: ${project.startDate}</small>
                    <small class="text-muted">End: ${project.endDate}</small>
                </div>
            </div>
        `;
        container.appendChild(projectElement);
    });
}

function showRecentContracts() {
    const container = document.getElementById('recentContractsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    recentContracts.forEach(contract => {
        const contractElement = document.createElement('div');
        contractElement.className = 'card mb-3';
        contractElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${contract.id}</h6>
                    <span class="badge bg-${getContractStatusColor(contract.status)}">${contract.status}</span>
                </div>
                <p class="card-text text-muted mb-2">Client: ${contract.client}</p>
                <p class="card-text mb-2">Type: ${contract.type}</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted">Value: Rp ${contract.value.toLocaleString('id-ID')}</small>
                </div>
                <div class="d-flex justify-content-between">
                    <small class="text-muted">Start: ${contract.startDate}</small>
                    <small class="text-muted">End: ${contract.endDate}</small>
                </div>
            </div>
        `;
        container.appendChild(contractElement);
    });
}

function showRecentPayments() {
    const container = document.getElementById('recentPaymentsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    recentPayments.forEach(payment => {
        const paymentElement = document.createElement('div');
        paymentElement.className = 'card mb-3';
        paymentElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${payment.id}</h6>
                    <span class="badge bg-${getPaymentStatusColor(payment.status)}">${payment.status}</span>
                </div>
                <p class="card-text text-muted mb-2">Client: ${payment.client}</p>
                <p class="card-text mb-2">Bill: ${payment.billId} | Method: ${payment.method}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">Amount: Rp ${payment.amount.toLocaleString('id-ID')}</small>
                    <small class="text-muted">${payment.date.toLocaleDateString()}</small>
                </div>
            </div>
        `;
        container.appendChild(paymentElement);
    });
}

// Helper functions for status colors
function getProjectStatusColor(status) {
    const colors = {
        'active': 'primary',
        'completed': 'success',
        'pending': 'warning',
        'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
}

function getContractStatusColor(status) {
    const colors = {
        'active': 'success',
        'completed': 'info',
        'pending': 'warning',
        'expired': 'danger'
    };
    return colors[status] || 'secondary';
}

function getPaymentStatusColor(status) {
    const colors = {
        'completed': 'success',
        'pending': 'warning',
        'failed': 'danger',
        'processing': 'info'
    };
    return colors[status] || 'secondary';
}

function filterActivityLog() {
    const dateFilter = document.getElementById('logDateFilter').value;
    const userFilter = document.getElementById('logUserFilter').value;
    const actionFilter = document.getElementById('logActionFilter').value;
    
    let filteredLogs = activityLog;
    
    if (dateFilter) {
        const filterDate = new Date(dateFilter);
        filteredLogs = filteredLogs.filter(log => {
            const logDate = new Date(log.timestamp);
            return logDate.toDateString() === filterDate.toDateString();
        });
    }
    
    if (userFilter !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.user === userFilter);
    }
    
    if (actionFilter !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.action === actionFilter);
    }
    
    const tbody = document.getElementById('activityLogTable');
    tbody.innerHTML = '';
    
    filteredLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(log.timestamp).toLocaleString()}</td>
            <td><span class="badge bg-${log.user === 'admin' ? 'primary' : 'secondary'}">${log.user}</span></td>
            <td><span class="badge bg-${getActionColor(log.action)}">${log.action}</span></td>
            <td>${log.description}</td>
            <td><code>${log.ipAddress}</code></td>
        `;
        tbody.appendChild(row);
    });
}

function exportActivityLog() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "Timestamp,User,Action,Description,IP Address\n" +
        activityLog.map(log => 
            `${log.timestamp},${log.user},${log.action},${log.description},${log.ipAddress}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "activity_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Dashboard Functions
function updateDashboard() {
    loadDashboardData();
    updateCharts();
}

function resetFilters() {
    document.getElementById('dateFilter').value = '';
    document.getElementById('roleFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    updateDashboard();
}

function initializeCharts() {
    // Prevent multiple initializations
    if (Object.keys(charts).length > 0) {
        return;
    }
    
    // Contract Status Chart (Pie Chart)
    const contractCtx = document.getElementById('contractStatusChart').getContext('2d');
    charts.contractStatus = new Chart(contractCtx, {
        type: 'pie',
        data: {
            labels: ['Active', 'Completed', 'Pending', 'Cancelled'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#28a745', '#007bff', '#ffc107', '#dc3545'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Risk Analysis Chart (Bar Chart)
    const riskCtx = document.getElementById('riskChart').getContext('2d');
    charts.risk = new Chart(riskCtx, {
        type: 'bar',
        data: {
            labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
            datasets: [{
                label: 'Number of Contracts',
                data: [25, 15, 8, 2],
                backgroundColor: ['#28a745', '#ffc107', '#fd7e14', '#dc3545'],
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Project Progress Chart (Line Chart)
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    charts.progress = new Chart(progressCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Project Progress (%)',
                data: [20, 35, 50, 65, 80, 90],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Financial Chart (Line Chart)
    const financialCtx = document.getElementById('financialChart').getContext('2d');
    charts.financial = new Chart(financialCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [100000, 110000, 120000, 125000, 130000, 135000],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Expenses',
                data: [80000, 85000, 90000, 85000, 88000, 90000],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Expense Breakdown Chart (Doughnut Chart)
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    charts.expense = new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Personnel', 'Equipment', 'Materials', 'Other'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateCharts() {
    // Update chart data based on filters
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    // Simulate data changes based on filters
    if (charts.contractStatus) {
        const newData = getFilteredContractData(roleFilter, statusFilter);
        charts.contractStatus.data.datasets[0].data = newData;
        charts.contractStatus.update();
    }
    
    if (charts.risk) {
        const newRiskData = getFilteredRiskData(roleFilter, statusFilter);
        charts.risk.data.datasets[0].data = newRiskData;
        charts.risk.update();
    }
}

function getFilteredContractData(role, status) {
    // Simulate different data based on filters
    if (status === 'active') return [60, 20, 15, 5];
    if (status === 'completed') return [10, 70, 15, 5];
    if (status === 'pending') return [20, 10, 60, 10];
    return [45, 30, 15, 10]; // Default
}

function getFilteredRiskData(role, status) {
    // Simulate different risk data based on filters
    if (role === 'admin') return [30, 20, 10, 3];
    if (role === 'client') return [20, 10, 5, 1];
    return [25, 15, 8, 2]; // Default
}

// Placeholder functions for other modules that might be called
function loadDashboardData() {
    console.log('Loading dashboard data...');
    setTimeout(() => {
        initializeCharts();
    }, 1000);
}

function loadCommunicationPage() {
    console.log('Loading communication page...');
}

function initializeQRScanner() {
    console.log('Initializing QR scanner...');
}
