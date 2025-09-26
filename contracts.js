// Contract Management System
let contracts = [];
let filteredContracts = [];
let selectedContracts = new Set();

// Sample contract data based on new database structure
const sampleContracts = [
    {
        id: 1,
        nomorKontrak: 'KONTRAK_15012024_001',
        namaProyek: 'Pengiriman Logistik Jakarta',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-01-15T08:00:00.000Z',
        tglMulai: '2024-01-15',
        tglSelesai: '2024-04-15',
        nilaiKontrak: 25000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
        kontakResmi: '08123456789',
        namaPic: 'John Doe',
        npwp: '12.345.678.9-012.000',
        asuransi: 1,
        terminPembayaran: 'DP',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 0,
        penaltiTerlambat: 100000,
        hariPenalti: 7,
        dokumenLampiran: 'kontrak_logistik_jakarta.pdf',
        status: 'active',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15',
        // Legacy fields
        name: 'Pengiriman Logistik Jakarta',
        client: 'John Doe',
        type: 'logistik',
        value: 25000000,
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        description: 'Kontrak Logistik - Pengiriman Logistik Jakarta',
        manager: 'John Doe'
    },
    {
        id: 2,
        nomorKontrak: 'KONTRAK_01022024_002',
        namaProyek: 'Penyimpanan Barang Surabaya',
        jenisKontrak: 'Penyimpanan',
        tglPengajuan: '2024-02-01T09:00:00.000Z',
        tglMulai: '2024-02-01',
        tglSelesai: '2024-06-01',
        nilaiKontrak: 35000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Thamrin No. 456, Surabaya',
        kontakResmi: '08123456788',
        namaPic: 'Jane Smith',
        npwp: '98.765.432.1-098.000',
        asuransi: 0,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 500000,
        penaltiTerlambat: 150000,
        hariPenalti: 10,
        dokumenLampiran: 'kontrak_penyimpanan_surabaya.pdf',
        status: 'pending',
        createdAt: '2024-01-25',
        updatedAt: '2024-01-25',
        // Legacy fields
        name: 'Penyimpanan Barang Surabaya',
        client: 'Jane Smith',
        type: 'penyimpanan',
        value: 35000000,
        startDate: '2024-02-01',
        endDate: '2024-06-01',
        description: 'Kontrak Penyimpanan - Penyimpanan Barang Surabaya',
        manager: 'Jane Smith'
    },
    {
        id: 3,
        nomorKontrak: 'KONTRAK_01122023_003',
        namaProyek: 'Bongkar Muat Pelabuhan',
        jenisKontrak: 'Bongkar Muat',
        tglPengajuan: '2023-12-01T10:00:00.000Z',
        tglMulai: '2023-12-01',
        tglSelesai: '2024-01-31',
        nilaiKontrak: 15000000,
        mataUang: 'USD',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Tanjung Priok, Jakarta',
        kontakResmi: '08123456787',
        namaPic: 'Mike Johnson',
        npwp: '11.222.333.4-555.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 0,
        penaltiTerlambat: 200000,
        hariPenalti: 5,
        dokumenLampiran: 'kontrak_bongkar_muat.pdf',
        status: 'completed',
        createdAt: '2023-11-20',
        updatedAt: '2024-01-31',
        // Legacy fields
        name: 'Bongkar Muat Pelabuhan',
        client: 'Mike Johnson',
        type: 'bongkar_muat',
        value: 15000000,
        startDate: '2023-12-01',
        endDate: '2024-01-31',
        description: 'Kontrak Bongkar Muat - Bongkar Muat Pelabuhan',
        manager: 'Mike Johnson'
    }
];

// Initialize contracts
function initializeContracts() {
    contracts = [...sampleContracts];
    filteredContracts = [...contracts];
    updateContractStats();
    renderContractsTable();
    setupContractEventListeners();
}

// Update contract statistics
function updateContractStats() {
    const total = contracts.length;
    const pending = contracts.filter(c => c.status === 'pending').length;
    const active = contracts.filter(c => c.status === 'active').length;
    const expiring = contracts.filter(c => {
        const endDate = new Date(c.endDate);
        const today = new Date();
        const daysUntilExpiry = (endDate - today) / (1000 * 60 * 60 * 24);
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;

    document.getElementById('totalContracts').textContent = total;
    document.getElementById('pendingContracts').textContent = pending;
    document.getElementById('activeContracts').textContent = active;
    document.getElementById('expiringContracts').textContent = expiring;
}

// Render contracts table
function renderContractsTable() {
    const tbody = document.getElementById('contractsTableBody');
    tbody.innerHTML = '';

    if (filteredContracts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="text-center py-4">
                    <i class="fas fa-search me-2"></i>
                    Tidak ada kontrak yang ditemukan
                </td>
            </tr>
        `;
        return;
    }

    filteredContracts.forEach(contract => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <input type="checkbox" class="contract-checkbox" value="${contract.id}" 
                       onchange="toggleContractSelection(${contract.id})">
            </td>
            <td>
                <strong>${contract.nomorKontrak || `#${contract.id}`}</strong>
            </td>
            <td>
                <strong>${contract.namaProyek || contract.name}</strong>
                ${contract.description ? `<br><small class="text-muted">${contract.description}</small>` : ''}
            </td>
            <td>
                <span class="type-badge type-${(contract.jenisKontrak || contract.type).toLowerCase().replace(' ', '_')}">
                    ${contract.jenisKontrak || getTypeLabel(contract.type)}
                </span>
            </td>
            <td>${contract.namaPic || contract.client}</td>
            <td class="contract-value">${formatCurrency(contract.nilaiKontrak || contract.value)}</td>
            <td class="text-center">
                <span class="badge bg-secondary">${contract.mataUang || 'IDR'}</span>
            </td>
            <td class="contract-dates">${formatDate(contract.tglMulai || contract.startDate)}</td>
            <td class="contract-dates">${formatDate(contract.tglSelesai || contract.endDate)}</td>
            <td>
                <span class="status-badge status-${contract.status}">
                    ${getStatusLabel(contract.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons-small">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewContract(${contract.id})" title="Lihat Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="editContract(${contract.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteContract(${contract.id})" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupContractEventListeners() {
    // Search functionality
    document.getElementById('contractSearch').addEventListener('input', function(e) {
        applyFilters();
    });

    // Filter change events
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('typeFilter').addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('contractSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    filteredContracts = contracts.filter(contract => {
        const matchesSearch = (contract.namaProyek || contract.name || '').toLowerCase().includes(searchTerm) ||
                            (contract.namaPic || contract.client || '').toLowerCase().includes(searchTerm) ||
                            (contract.nomorKontrak || '').toLowerCase().includes(searchTerm) ||
                            (contract.description || '').toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || contract.status === statusFilter;
        const matchesType = !typeFilter || (contract.jenisKontrak || contract.type) === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    renderContractsTable();
}

// Show create contract modal
function showCreateContractModal() {
    const modal = new bootstrap.Modal(document.getElementById('methodSelectionModal'));
    modal.show();
}

// Clear create contract form
function clearCreateContractForm() {
    document.getElementById('createContractForm').reset();
    document.getElementById('contractStatus').value = 'draft';
}

// Generate contract number
function generateContractNumber() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const sequence = String(contracts.length + 1).padStart(3, '0');
    
    return `KONTRAK_${day}${month}${year}_${sequence}`;
}

// Create new contract
function createContract() {
    const form = document.getElementById('createContractForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Generate contract number
    const nomorKontrak = generateContractNumber();
    
    // Get form values
    const newContract = {
        id: contracts.length + 1,
        nomorKontrak: nomorKontrak,
        namaProyek: document.getElementById('namaProyek').value,
        jenisKontrak: document.getElementById('jenisKontrak').value,
        tglPengajuan: new Date().toISOString(),
        tglMulai: document.getElementById('tglMulai').value,
        tglSelesai: document.getElementById('tglSelesai').value,
        nilaiKontrak: parseFloat(document.getElementById('nilaiKontrak').value),
        mataUang: document.getElementById('mataUang').value,
        perusahaanPemberi: 1, // Default from logged user
        perusahaanPenyedia: 2, // Default ILCS
        alamat: document.getElementById('alamat').value,
        kontakResmi: document.getElementById('kontakResmi').value,
        namaPic: document.getElementById('namaPic').value,
        npwp: document.getElementById('npwp').value,
        asuransi: document.getElementById('asuransi').checked ? 1 : 0,
        terminPembayaran: document.getElementById('terminPembayaran').value,
        metodePembayaran: document.getElementById('metodePembayaran').value,
        ppn: parseFloat(document.getElementById('ppn').value),
        pajakLainnya: parseFloat(document.getElementById('pajakLainnya').value) || 0,
        penaltiTerlambat: parseFloat(document.getElementById('penaltiTerlambat').value) || 0,
        hariPenalti: parseInt(document.getElementById('hariPenalti').value) || 0,
        dokumenLampiran: document.getElementById('dokumenLampiran').files.length > 0 ? 
                        Array.from(document.getElementById('dokumenLampiran').files).map(f => f.name).join(',') : '',
        // Legacy fields for backward compatibility
        name: document.getElementById('namaProyek').value,
        client: document.getElementById('namaPic').value,
        type: document.getElementById('jenisKontrak').value.toLowerCase().replace(' ', '_'),
        status: 'pending',
        value: parseFloat(document.getElementById('nilaiKontrak').value),
        startDate: document.getElementById('tglMulai').value,
        endDate: document.getElementById('tglSelesai').value,
        description: `Kontrak ${document.getElementById('jenisKontrak').value} - ${document.getElementById('namaProyek').value}`,
        manager: document.getElementById('namaPic').value,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    };

    contracts.unshift(newContract);
    applyFilters();
    updateContractStats();

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('createContractModal'));
    modal.hide();

    showSuccess(`Kontrak berhasil dibuat dengan nomor: ${nomorKontrak}`);
}

// View contract details
function viewContract(contractId) {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    const content = document.getElementById('contractDetailsContent');
    content.innerHTML = `
        <div class="contract-details-grid">
            <div class="contract-detail-card">
                <h6>Nama Kontrak</h6>
                <p>${contract.name}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Klien</h6>
                <p>${contract.client}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Tipe Kontrak</h6>
                <p>${getTypeLabel(contract.type)}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Status</h6>
                <p><span class="status-badge status-${contract.status}">${getStatusLabel(contract.status)}</span></p>
            </div>
            <div class="contract-detail-card">
                <h6>Nilai Kontrak</h6>
                <p class="contract-value">Rp ${formatCurrency(contract.value)}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Project Manager</h6>
                <p>${contract.manager}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Tanggal Mulai</h6>
                <p>${formatDate(contract.startDate)}</p>
            </div>
            <div class="contract-detail-card">
                <h6>Tanggal Berakhir</h6>
                <p>${formatDate(contract.endDate)}</p>
            </div>
        </div>
        
        <div class="contract-timeline">
            <h5><i class="fas fa-history me-2"></i>Timeline Kontrak</h5>
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="timeline-content">
                    <h6>Kontrak Dibuat</h6>
                    <p>${formatDate(contract.createdAt)}</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="timeline-content">
                    <h6>Kontrak Dimulai</h6>
                    <p>${formatDate(contract.startDate)}</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-flag"></i>
                </div>
                <div class="timeline-content">
                    <h6>Kontrak Berakhir</h6>
                    <p>${formatDate(contract.endDate)}</p>
                </div>
            </div>
        </div>
        
        <div class="contract-timeline">
            <h5><i class="fas fa-file-alt me-2"></i>Deskripsi</h5>
            <p>${contract.description}</p>
        </div>
    `;

    // Store current contract ID for edit/delete operations
    window.currentContractId = contractId;

    const modal = new bootstrap.Modal(document.getElementById('contractDetailsModal'));
    modal.show();
}

// Edit contract
function editContract(contractId) {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    // Populate form with contract data
    document.getElementById('contractName').value = contract.name;
    document.getElementById('clientName').value = contract.client;
    document.getElementById('contractType').value = contract.type;
    document.getElementById('contractStatus').value = contract.status;
    document.getElementById('contractValue').value = contract.value;
    document.getElementById('startDate').value = contract.startDate;
    document.getElementById('endDate').value = contract.endDate;
    document.getElementById('contractDescription').value = contract.description;
    document.getElementById('contractManager').value = contract.manager;

    // Close details modal and open create modal for editing
    const detailsModal = bootstrap.Modal.getInstance(document.getElementById('contractDetailsModal'));
    if (detailsModal) detailsModal.hide();

    // Update modal title and button
    document.querySelector('#createContractModal .modal-title').innerHTML = '<i class="fas fa-edit me-2"></i>Edit Kontrak';
    document.querySelector('#createContractModal .btn-primary').innerHTML = '<i class="fas fa-save me-2"></i>Update Kontrak';
    
    window.currentContractId = contractId;

    const modal = new bootstrap.Modal(document.getElementById('createContractModal'));
    modal.show();
}

// Delete contract
function deleteContract(contractId) {
    if (confirm('Apakah Anda yakin ingin menghapus kontrak ini?')) {
        const index = contracts.findIndex(c => c.id === contractId);
        if (index !== -1) {
            contracts.splice(index, 1);
            applyFilters();
            updateContractStats();
            showSuccess('Kontrak berhasil dihapus!');

            // Close modal if open
            const modal = bootstrap.Modal.getInstance(document.getElementById('contractDetailsModal'));
            if (modal) modal.hide();
        }
    }
}

// Toggle contract selection
function toggleContractSelection(contractId) {
    if (selectedContracts.has(contractId)) {
        selectedContracts.delete(contractId);
    } else {
        selectedContracts.add(contractId);
    }
    updateBulkActions();
}

// Toggle select all contracts
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAllContracts');
    const checkboxes = document.querySelectorAll('.contract-checkbox');
    
    if (selectAll.checked) {
        filteredContracts.forEach(contract => {
            selectedContracts.add(contract.id);
        });
    } else {
        selectedContracts.clear();
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateBulkActions();
}

// Update bulk actions visibility
function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedContracts.size > 0) {
        bulkActions.style.display = 'block';
        selectedCount.textContent = selectedContracts.size;
    } else {
        bulkActions.style.display = 'none';
    }
}

// Bulk export
function bulkExport() {
    if (selectedContracts.size === 0) return;
    
    const selectedContractsList = Array.from(selectedContracts);
    const contractsToExport = contracts.filter(c => selectedContractsList.includes(c.id));
    
    showSuccess(`Exporting ${contractsToExport.length} kontrak...`);
}

// Bulk archive
function bulkArchive() {
    if (selectedContracts.size === 0) return;
    
    if (confirm(`Apakah Anda yakin ingin mengarsipkan ${selectedContracts.size} kontrak?`)) {
        selectedContracts.forEach(id => {
            const contract = contracts.find(c => c.id === id);
            if (contract) {
                contract.status = 'completed';
                contract.updatedAt = new Date().toISOString().split('T')[0];
            }
        });
        
        selectedContracts.clear();
        applyFilters();
        updateContractStats();
        updateBulkActions();
        showSuccess('Kontrak berhasil diarsipkan!');
    }
}

// Bulk delete
function bulkDelete() {
    if (selectedContracts.size === 0) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedContracts.size} kontrak?`)) {
        contracts = contracts.filter(c => !selectedContracts.has(c.id));
        selectedContracts.clear();
        applyFilters();
        updateContractStats();
        updateBulkActions();
        showSuccess('Kontrak berhasil dihapus!');
    }
}

// Export contracts
function exportContracts() {
    showSuccess('Exporting semua kontrak...');
}

// Refresh contracts
function refreshContracts() {
    applyFilters();
    showSuccess('Data kontrak telah diperbarui!');
}

// Utility functions
function getStatusLabel(status) {
    const labels = {
        'draft': 'Draft',
        'pending': 'Pending',
        'active': 'Aktif',
        'completed': 'Selesai',
        'expired': 'Kadaluarsa'
    };
    return labels[status] || status;
}

function getTypeLabel(type) {
    const labels = {
        'project': 'Proyek',
        'service': 'Layanan',
        'maintenance': 'Maintenance',
        'consultation': 'Konsultasi'
    };
    return labels[type] || type;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showSuccess(message) {
    // Create a simple success notification
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('contractsPage')) {
        initializeContracts();
    }
    
    // Initialize floating labels for form inputs
    initializeFloatingLabels();
    
    // Initialize currency symbol updates
    initializeCurrencySymbols();
});

// Function to initialize floating labels
function initializeFloatingLabels() {
    // Get all form floating inputs
    const floatingInputs = document.querySelectorAll('.form-floating input, .form-floating select, .form-floating textarea');
    
    floatingInputs.forEach(input => {
        // Check if input has value on load
        if (input.value && input.value !== '') {
            input.classList.add('has-value');
        }
        
        // Add event listeners
        input.addEventListener('input', function() {
            if (this.value && this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Function to initialize currency symbols
function initializeCurrencySymbols() {
    const mataUangSelect = document.getElementById('mataUang');
    const currencySymbol = document.getElementById('currencySymbol');
    const pajakCurrencySymbol = document.getElementById('pajakCurrencySymbol');
    const penaltiCurrencySymbol = document.getElementById('penaltiCurrencySymbol');
    
    // Currency symbol mapping
    const currencyMap = {
        'IDR': 'Rp',
        'USD': '$',
        'EUR': '€',
        'SGD': 'S$'
    };
    
    // Function to update currency symbols
    function updateCurrencySymbols() {
        const selectedCurrency = mataUangSelect.value;
        const symbol = currencyMap[selectedCurrency] || 'Rp';
        
        if (currencySymbol) currencySymbol.textContent = symbol;
        if (pajakCurrencySymbol) pajakCurrencySymbol.textContent = symbol;
        if (penaltiCurrencySymbol) penaltiCurrencySymbol.textContent = symbol;
    }
    
    // Add event listener for currency change
    if (mataUangSelect) {
        mataUangSelect.addEventListener('change', updateCurrencySymbols);
        
        // Set initial currency symbol
        updateCurrencySymbols();
    }
}
