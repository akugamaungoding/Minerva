// GPS Tracking JavaScript
let map;
let markers = [];
let autoRefreshInterval;
let isAutoRefresh = false;

// Sample GPS tracking data
const gpsTrackingData = {
    containers: [
        {
            id: 'CONT_001',
            contractId: 1,
            containerNumber: 'TCLU1234567',
            currentLocation: {
                lat: -6.2088,
                lng: 106.8456,
                address: 'Jakarta, Indonesia',
                timestamp: new Date().toISOString()
            },
            route: [
                { lat: -6.2088, lng: 106.8456, timestamp: new Date(Date.now() - 3600000).toISOString() },
                { lat: -6.2088, lng: 106.8456, timestamp: new Date().toISOString() }
            ],
            status: 'in_transit',
            alerts: [
                {
                    type: 'deviation',
                    message: 'Kontainer menyimpang dari rute yang direncanakan',
                    timestamp: new Date(Date.now() - 1800000).toISOString(),
                    severity: 'high'
                }
            ],
            estimatedArrival: new Date(Date.now() + 14400000).toISOString(),
            actualProgress: 65,
            contractInfo: {
                nomorKontrak: 'KONTRAK_15012024_001',
                namaProyek: 'Pengiriman Logistik Jakarta',
                namaPic: 'John Doe'
            }
        },
        {
            id: 'CONT_002',
            contractId: 2,
            containerNumber: 'TCLU2345678',
            currentLocation: {
                lat: -7.2575,
                lng: 112.7521,
                address: 'Surabaya, Indonesia',
                timestamp: new Date().toISOString()
            },
            route: [
                { lat: -7.2575, lng: 112.7521, timestamp: new Date(Date.now() - 7200000).toISOString() },
                { lat: -7.2575, lng: 112.7521, timestamp: new Date().toISOString() }
            ],
            status: 'delayed',
            alerts: [
                {
                    type: 'delay',
                    message: 'Kontainer terlambat 2 jam dari jadwal',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    severity: 'medium'
                }
            ],
            estimatedArrival: new Date(Date.now() + 7200000).toISOString(),
            actualProgress: 45,
            contractInfo: {
                nomorKontrak: 'KONTRAK_01022024_002',
                namaProyek: 'Penyimpanan Barang Surabaya',
                namaPic: 'Jane Smith'
            }
        },
        {
            id: 'CONT_003',
            contractId: 3,
            containerNumber: 'TCLU3456789',
            currentLocation: {
                lat: -6.9175,
                lng: 107.6191,
                address: 'Bandung, Indonesia',
                timestamp: new Date().toISOString()
            },
            route: [
                { lat: -6.9175, lng: 107.6191, timestamp: new Date(Date.now() - 10800000).toISOString() },
                { lat: -6.9175, lng: 107.6191, timestamp: new Date().toISOString() }
            ],
            status: 'delivered',
            alerts: [],
            estimatedArrival: new Date().toISOString(),
            actualProgress: 100,
            contractInfo: {
                nomorKontrak: 'KONTRAK_01122023_003',
                namaProyek: 'Bongkar Muat Pelabuhan',
                namaPic: 'Mike Johnson'
            }
        },
        {
            id: 'CONT_004',
            contractId: 4,
            containerNumber: 'TCLU4567890',
            currentLocation: {
                lat: -6.1751,
                lng: 106.8650,
                address: 'Jakarta Pusat, Indonesia',
                timestamp: new Date().toISOString()
            },
            route: [
                { lat: -6.1751, lng: 106.8650, timestamp: new Date(Date.now() - 1800000).toISOString() },
                { lat: -6.1751, lng: 106.8650, timestamp: new Date().toISOString() }
            ],
            status: 'in_transit',
            alerts: [],
            estimatedArrival: new Date(Date.now() + 10800000).toISOString(),
            actualProgress: 30,
            contractInfo: {
                nomorKontrak: 'KONTRAK_20012024_004',
                namaProyek: 'Pengiriman Elektronik Jakarta',
                namaPic: 'Sarah Wilson'
            }
        },
        {
            id: 'CONT_005',
            contractId: 5,
            containerNumber: 'TCLU5678901',
            currentLocation: {
                lat: -6.2000,
                lng: 106.8167,
                address: 'Jakarta Barat, Indonesia',
                timestamp: new Date().toISOString()
            },
            route: [
                { lat: -6.2000, lng: 106.8167, timestamp: new Date(Date.now() - 900000).toISOString() },
                { lat: -6.2000, lng: 106.8167, timestamp: new Date().toISOString() }
            ],
            status: 'delivered',
            alerts: [],
            estimatedArrival: new Date().toISOString(),
            actualProgress: 100,
            contractInfo: {
                nomorKontrak: 'KONTRAK_25012024_005',
                namaProyek: 'Pengiriman Makanan Jakarta',
                namaPic: 'David Brown'
            }
        }
    ]
};

// Initialize GPS tracking page
function initializeGPSTracking() {
    initializeMap();
    populateContainerList();
    populateAlertsList();
    updateStatistics();
    populateContractFilter();
    setupEventListeners();
    
    // Check for contract filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const contractId = urlParams.get('contractId');
    if (contractId) {
        document.getElementById('contractFilter').value = contractId;
        filterContainers();
        
        // Center map on the specific contract's container
        const container = gpsTrackingData.containers.find(c => c.contractId == contractId);
        if (container) {
            map.setView([container.currentLocation.lat, container.currentLocation.lng], 10);
        }
    }
}

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on Indonesia
    map = L.map('map').setView([-2.5489, 118.0149], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for each container
    addContainerMarkers();
}

// Add markers for all containers
function addContainerMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    gpsTrackingData.containers.forEach(container => {
        const marker = createContainerMarker(container);
        markers.push(marker);
        map.addLayer(marker);
    });
}

// Create marker for container
function createContainerMarker(container) {
    const statusColors = {
        'in_transit': '#17a2b8',
        'delivered': '#28a745',
        'delayed': '#ffc107',
        'deviated': '#dc3545'
    };
    
    const statusIcons = {
        'in_transit': 'fas fa-truck',
        'delivered': 'fas fa-check-circle',
        'delayed': 'fas fa-clock',
        'deviated': 'fas fa-exclamation-triangle'
    };
    
    const color = statusColors[container.status] || '#6c757d';
    const icon = statusIcons[container.status] || 'fas fa-box';
    
    // Create custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">
                <i class="${icon}" style="color: white; font-size: 12px;"></i>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    const marker = L.marker([container.currentLocation.lat, container.currentLocation.lng], {
        icon: customIcon
    });
    
    // Add popup
    const popupContent = `
        <div style="min-width: 200px;">
            <h6><i class="fas fa-box me-2"></i>${container.containerNumber}</h6>
            <p class="mb-1"><strong>Kontrak:</strong> ${container.contractInfo.nomorKontrak}</p>
            <p class="mb-1"><strong>Proyek:</strong> ${container.contractInfo.namaProyek}</p>
            <p class="mb-1"><strong>Status:</strong> <span class="badge bg-${getStatusColor(container.status)}">${getStatusLabel(container.status)}</span></p>
            <p class="mb-1"><strong>Progress:</strong> ${container.actualProgress}%</p>
            <p class="mb-1"><strong>Lokasi:</strong> ${container.currentLocation.address}</p>
            <p class="mb-1"><strong>Update:</strong> ${formatDateTime(container.currentLocation.timestamp)}</p>
            <button class="btn btn-sm btn-primary mt-2" onclick="showContainerDetails('${container.id}')">
                <i class="fas fa-info-circle me-1"></i>Detail
            </button>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    return marker;
}

// Get status color for Bootstrap classes
function getStatusColor(status) {
    const colors = {
        'in_transit': 'info',
        'delivered': 'success',
        'delayed': 'warning',
        'deviated': 'danger'
    };
    return colors[status] || 'secondary';
}

// Get status label
function getStatusLabel(status) {
    const labels = {
        'in_transit': 'Dalam Perjalanan',
        'delivered': 'Terkirim',
        'delayed': 'Terlambat',
        'deviated': 'Menyimpang'
    };
    return labels[status] || status;
}

// Populate container list
function populateContainerList() {
    const containerList = document.getElementById('containerList');
    containerList.innerHTML = '';
    
    gpsTrackingData.containers.forEach(container => {
        const containerElement = createContainerElement(container);
        containerList.appendChild(containerElement);
    });
}

// Create container element
function createContainerElement(container) {
    const div = document.createElement('div');
    div.className = 'container-status';
    div.innerHTML = `
        <div>
            <h6 class="mb-1">${container.containerNumber}</h6>
            <small class="text-muted">${container.contractInfo.nomorKontrak}</small>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${container.actualProgress}%"></div>
            </div>
            <small class="text-muted">${container.actualProgress}% selesai</small>
        </div>
        <div class="text-end">
            <span class="status-badge status-${container.status}">${getStatusLabel(container.status)}</span>
            <br>
            <small class="text-muted">${formatDateTime(container.currentLocation.timestamp)}</small>
        </div>
    `;
    
    div.onclick = () => showContainerDetails(container.id);
    return div;
}

// Populate alerts list
function populateAlertsList() {
    const alertsList = document.getElementById('alertsList');
    alertsList.innerHTML = '';
    
    const allAlerts = [];
    gpsTrackingData.containers.forEach(container => {
        container.alerts.forEach(alert => {
            allAlerts.push({
                ...alert,
                containerNumber: container.containerNumber,
                contractId: container.contractId
            });
        });
    });
    
    // Sort by timestamp (newest first)
    allAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    allAlerts.slice(0, 5).forEach(alert => {
        const alertElement = createAlertElement(alert);
        alertsList.appendChild(alertElement);
    });
}

// Create alert element
function createAlertElement(alert) {
    const div = document.createElement('div');
    div.className = `alert-item ${alert.severity === 'high' ? 'high' : ''}`;
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div>
                <h6 class="mb-1">${alert.containerNumber}</h6>
                <p class="mb-0">${alert.message}</p>
                <small class="text-muted">${formatDateTime(alert.timestamp)}</small>
            </div>
            <span class="badge bg-${alert.severity === 'high' ? 'danger' : 'warning'}">
                ${alert.severity.toUpperCase()}
            </span>
        </div>
    `;
    return div;
}

// Update statistics
function updateStatistics() {
    const totalContainers = gpsTrackingData.containers.length;
    const activeTracking = gpsTrackingData.containers.filter(c => c.status === 'in_transit').length;
    const alertsCount = gpsTrackingData.containers.reduce((sum, c) => sum + c.alerts.length, 0);
    const deliveredCount = gpsTrackingData.containers.filter(c => c.status === 'delivered').length;
    
    document.getElementById('totalContainers').textContent = totalContainers;
    document.getElementById('activeTracking').textContent = activeTracking;
    document.getElementById('alertsCount').textContent = alertsCount;
    document.getElementById('deliveredCount').textContent = deliveredCount;
}

// Populate contract filter
function populateContractFilter() {
    const contractFilter = document.getElementById('contractFilter');
    contractFilter.innerHTML = '<option value="">Semua Kontrak</option>';
    
    // Get contracts from localStorage or use sample data
    let contracts = [];
    try {
        const storedContracts = localStorage.getItem('contracts');
        if (storedContracts) {
            contracts = JSON.parse(storedContracts);
        }
    } catch (e) {
        console.log('No stored contracts found, using sample data');
    }
    
    // If no stored contracts, use sample data
    if (contracts.length === 0) {
        contracts = [
            { id: 1, nomorKontrak: 'KONTRAK_15012024_001', namaProyek: 'Pengiriman Logistik Jakarta' },
            { id: 2, nomorKontrak: 'KONTRAK_01022024_002', namaProyek: 'Penyimpanan Barang Surabaya' },
            { id: 3, nomorKontrak: 'KONTRAK_01122023_003', namaProyek: 'Bongkar Muat Pelabuhan' }
        ];
    }
    
    contracts.forEach(contract => {
        const option = document.createElement('option');
        option.value = contract.id;
        option.textContent = `${contract.nomorKontrak} - ${contract.namaProyek}`;
        contractFilter.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('contractFilter').addEventListener('change', filterContainers);
    document.getElementById('statusFilter').addEventListener('change', filterContainers);
}

// Filter containers
function filterContainers() {
    const contractFilter = document.getElementById('contractFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredContainers = gpsTrackingData.containers;
    
    if (contractFilter) {
        filteredContainers = filteredContainers.filter(c => c.contractId == contractFilter);
    }
    
    if (statusFilter) {
        filteredContainers = filteredContainers.filter(c => c.status === statusFilter);
    }
    
    // Update map markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    filteredContainers.forEach(container => {
        const marker = createContainerMarker(container);
        markers.push(marker);
        map.addLayer(marker);
    });
    
    // Update container list
    const containerList = document.getElementById('containerList');
    containerList.innerHTML = '';
    
    filteredContainers.forEach(container => {
        const containerElement = createContainerElement(container);
        containerList.appendChild(containerElement);
    });
}

// Show container details
function showContainerDetails(containerId) {
    const container = gpsTrackingData.containers.find(c => c.id === containerId);
    if (!container) return;
    
    const content = document.getElementById('containerDetailsContent');
    content.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Informasi Kontainer</h6>
                <table class="table table-sm">
                    <tr><td><strong>Nomor Kontainer:</strong></td><td>${container.containerNumber}</td></tr>
                    <tr><td><strong>Status:</strong></td><td><span class="badge bg-${getStatusColor(container.status)}">${getStatusLabel(container.status)}</span></td></tr>
                    <tr><td><strong>Progress:</strong></td><td>${container.actualProgress}%</td></tr>
                    <tr><td><strong>Lokasi Saat Ini:</strong></td><td>${container.currentLocation.address}</td></tr>
                    <tr><td><strong>Update Terakhir:</strong></td><td>${formatDateTime(container.currentLocation.timestamp)}</td></tr>
                    <tr><td><strong>Estimasi Tiba:</strong></td><td>${formatDateTime(container.estimatedArrival)}</td></tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6>Informasi Kontrak</h6>
                <table class="table table-sm">
                    <tr><td><strong>Nomor Kontrak:</strong></td><td>${container.contractInfo.nomorKontrak}</td></tr>
                    <tr><td><strong>Nama Proyek:</strong></td><td>${container.contractInfo.namaProyek}</td></tr>
                    <tr><td><strong>PIC:</strong></td><td>${container.contractInfo.namaPic}</td></tr>
                </table>
            </div>
        </div>
        
        <div class="mt-4">
            <h6>Riwayat Perjalanan</h6>
            <div class="timeline">
                ${container.route.map((point, index) => `
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="timeline-content">
                            <h6>Posisi ${index + 1}</h6>
                            <p class="mb-0">${point.address || 'Lokasi tidak diketahui'}</p>
                            <small class="text-muted">${formatDateTime(point.timestamp)}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${container.alerts.length > 0 ? `
            <div class="mt-4">
                <h6>Alert</h6>
                ${container.alerts.map(alert => `
                    <div class="alert alert-${alert.severity === 'high' ? 'danger' : 'warning'}">
                        <h6 class="alert-heading">${alert.type.toUpperCase()}</h6>
                        <p class="mb-0">${alert.message}</p>
                        <small class="text-muted">${formatDateTime(alert.timestamp)}</small>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    // Store current container ID for contract details
    window.currentContainerId = containerId;
    
    const modal = new bootstrap.Modal(document.getElementById('containerDetailsModal'));
    modal.show();
}

// View contract details
function viewContractDetails() {
    const container = gpsTrackingData.containers.find(c => c.id === window.currentContainerId);
    if (container) {
        // Redirect to contracts page with the specific contract
        window.location.href = `contracts.html?contractId=${container.contractId}`;
    }
}

// Center map on all containers
function centerMap() {
    if (markers.length === 0) return;
    
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Toggle auto refresh
function toggleAutoRefresh() {
    const icon = document.getElementById('autoRefreshIcon');
    
    if (isAutoRefresh) {
        clearInterval(autoRefreshInterval);
        isAutoRefresh = false;
        icon.className = 'fas fa-play';
        Swal.fire({
            icon: 'info',
            title: 'Auto Refresh',
            text: 'Auto refresh dimatikan',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        autoRefreshInterval = setInterval(() => {
            refreshTracking();
        }, 30000); // Refresh every 30 seconds
        isAutoRefresh = true;
        icon.className = 'fas fa-pause';
        Swal.fire({
            icon: 'success',
            title: 'Auto Refresh',
            text: 'Auto refresh diaktifkan (30 detik)',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// Refresh tracking data
function refreshTracking() {
    // Simulate real-time updates
    gpsTrackingData.containers.forEach(container => {
        if (container.status === 'in_transit') {
            // Simulate movement
            const latOffset = (Math.random() - 0.5) * 0.01;
            const lngOffset = (Math.random() - 0.5) * 0.01;
            
            container.currentLocation.lat += latOffset;
            container.currentLocation.lng += lngOffset;
            container.currentLocation.timestamp = new Date().toISOString();
            
            // Update progress
            if (container.actualProgress < 100) {
                container.actualProgress += Math.random() * 2;
                container.actualProgress = Math.min(container.actualProgress, 100);
            }
        }
    });
    
    // Update UI
    addContainerMarkers();
    populateContainerList();
    populateAlertsList();
    updateStatistics();
    
    // Show refresh notification
    Swal.fire({
        icon: 'success',
        title: 'Data Diperbarui',
        text: 'Posisi kontainer telah diperbarui',
        timer: 1000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
}

// Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGPSTracking();
});
