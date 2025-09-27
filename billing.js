// E-Billing System with Integrated Payment
class BillingSystem {
    constructor() {
        this.bills = [];
        this.payments = [];
        this.contracts = [];
        this.paymentMethods = [
            {
                id: 'bank_transfer',
                name: 'Bank Transfer',
                icon: 'fas fa-university',
                description: 'Transfer melalui bank',
                processingTime: '1-2 hari kerja',
                fee: 0
            },
            {
                id: 'credit_card',
                name: 'Credit Card',
                icon: 'fas fa-credit-card',
                description: 'Pembayaran dengan kartu kredit',
                processingTime: 'Instan',
                fee: 2500
            },
            {
                id: 'debit_card',
                name: 'Debit Card',
                icon: 'fas fa-credit-card',
                description: 'Pembayaran dengan kartu debit',
                processingTime: 'Instan',
                fee: 1500
            },
            {
                id: 'e_wallet',
                name: 'E-Wallet',
                icon: 'fas fa-mobile-alt',
                description: 'Pembayaran melalui e-wallet',
                processingTime: 'Instan',
                fee: 1000
            },
            {
                id: 'virtual_account',
                name: 'Virtual Account',
                icon: 'fas fa-building',
                description: 'Pembayaran melalui virtual account',
                processingTime: 'Instan',
                fee: 0
            }
        ];
        this.init();
    }

    init() {
        this.loadSampleData();
    }

    loadSampleData() {
        // Sample contract data for reference
        this.contracts = [
            {
                id: 1,
                nomorKontrak: 'KONTRAK_15012024_001',
                namaProyek: 'Pengiriman Logistik Jakarta',
                namaPic: 'PT. Maju Jaya',
                nilaiKontrak: 150000000,
                tglMulai: '2024-01-15',
                tglSelesai: '2024-04-15',
                status: 'active'
            },
            {
                id: 2,
                nomorKontrak: 'KONTRAK_01022024_002',
                namaProyek: 'Penyimpanan Barang Surabaya',
                namaPic: 'CV. Sukses Mandiri',
                nilaiKontrak: 75000000,
                tglMulai: '2024-02-01',
                tglSelesai: '2024-06-01',
                status: 'active'
            },
            {
                id: 3,
                nomorKontrak: 'KONTRAK_01122023_003',
                namaProyek: 'Bongkar Muat Pelabuhan',
                namaPic: 'PT. Pelabuhan Indonesia',
                nilaiKontrak: 200000000,
                tglMulai: '2023-12-01',
                tglSelesai: '2024-03-01',
                status: 'active'
            },
            {
                id: 4,
                nomorKontrak: 'KONTRAK_20012024_004',
                namaProyek: 'Distribusi Ekspor Batam',
                namaPic: 'PT. Batam Logistics',
                nilaiKontrak: 300000000,
                tglMulai: '2024-01-20',
                tglSelesai: '2024-07-20',
                status: 'active'
            },
            {
                id: 5,
                nomorKontrak: 'KONTRAK_10012024_005',
                namaProyek: 'Cold Storage Medan',
                namaPic: 'CV. Medan Fresh',
                nilaiKontrak: 120000000,
                tglMulai: '2024-01-10',
                tglSelesai: '2024-05-10',
                status: 'active'
            },
            {
                id: 6,
                nomorKontrak: 'KONTRAK_05012024_006',
                namaProyek: 'Warehouse Management Bandung',
                namaPic: 'PT. Bandung Storage',
                nilaiKontrak: 180000000,
                tglMulai: '2024-01-05',
                tglSelesai: '2024-08-05',
                status: 'active'
            }
        ];

        // Comprehensive billing data
        this.bills = [
            {
                id: 'BILL-001',
                contractId: 1,
                contractNumber: 'KONTRAK_15012024_001',
                projectName: 'Pengiriman Logistik Jakarta',
                clientName: 'PT. Maju Jaya',
                clientEmail: 'finance@majujaya.com',
                clientPhone: '021-12345678',
                amount: 50000000,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                status: 'pending',
                description: 'Pembayaran tahap pertama untuk pengiriman logistik',
                items: [
                    {
                        description: 'Pengiriman Kontainer 20ft',
                        quantity: 2,
                        unitPrice: 15000000,
                        total: 30000000
                    },
                    {
                        description: 'Asuransi Pengiriman',
                        quantity: 1,
                        unitPrice: 20000000,
                        total: 20000000
                    }
                ],
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-009',
                contractId: 7,
                contractNumber: 'KONTRAK_25012024_007',
                projectName: 'Distribusi Ekspor Semarang',
                clientName: 'PT. Semarang Cargo',
                clientEmail: 'billing@semarangcargo.co.id',
                clientPhone: '024-123456',
                amount: 85000000,
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                status: 'pending',
                description: 'Pembayaran untuk distribusi ekspor ke Semarang',
                items: [
                    {
                        description: 'Distribusi Ekspor',
                        quantity: 1,
                        unitPrice: 60000000,
                        total: 60000000
                    },
                    {
                        description: 'Handling Fee',
                        quantity: 1,
                        unitPrice: 25000000,
                        total: 25000000
                    }
                ],
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-010',
                contractId: 8,
                contractNumber: 'KONTRAK_30012024_008',
                projectName: 'Warehouse Management Yogyakarta',
                clientName: 'CV. Jogja Storage',
                clientEmail: 'admin@jogjastorage.com',
                clientPhone: '0274-789012',
                amount: 45000000,
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                status: 'overdue',
                description: 'Pembayaran untuk layanan warehouse management',
                items: [
                    {
                        description: 'Warehouse Management',
                        quantity: 1,
                        unitPrice: 30000000,
                        total: 30000000
                    },
                    {
                        description: 'Maintenance Fee',
                        quantity: 1,
                        unitPrice: 15000000,
                        total: 15000000
                    }
                ],
                createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-011',
                contractId: 9,
                contractNumber: 'KONTRAK_28012024_009',
                projectName: 'Cold Storage Makassar',
                clientName: 'PT. Makassar Fresh',
                clientEmail: 'finance@makassarfresh.co.id',
                clientPhone: '0411-456789',
                amount: 120000000,
                dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
                status: 'pending',
                description: 'Pembayaran untuk layanan cold storage',
                items: [
                    {
                        description: 'Cold Storage (90 hari)',
                        quantity: 90,
                        unitPrice: 1000000,
                        total: 90000000
                    },
                    {
                        description: 'Monitoring System',
                        quantity: 1,
                        unitPrice: 30000000,
                        total: 30000000
                    }
                ],
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-012',
                contractId: 10,
                contractNumber: 'KONTRAK_22012024_010',
                projectName: 'Bongkar Muat Palembang',
                clientName: 'PT. Palembang Port',
                clientEmail: 'billing@palembangport.co.id',
                clientPhone: '0711-234567',
                amount: 95000000,
                dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                status: 'overdue',
                description: 'Pembayaran untuk layanan bongkar muat',
                items: [
                    {
                        description: 'Bongkar Muat Kontainer',
                        quantity: 15,
                        unitPrice: 4000000,
                        total: 60000000
                    },
                    {
                        description: 'Equipment Rental',
                        quantity: 1,
                        unitPrice: 35000000,
                        total: 35000000
                    }
                ],
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-013',
                contractId: 11,
                contractNumber: 'KONTRAK_18012024_011',
                projectName: 'Distribusi Impor Denpasar',
                clientName: 'CV. Bali Logistics',
                clientEmail: 'admin@balilogistics.com',
                clientPhone: '0361-345678',
                amount: 180000000,
                dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                status: 'pending',
                description: 'Pembayaran untuk distribusi impor',
                items: [
                    {
                        description: 'Distribusi Impor',
                        quantity: 1,
                        unitPrice: 120000000,
                        total: 120000000
                    },
                    {
                        description: 'Customs Clearance',
                        quantity: 1,
                        unitPrice: 60000000,
                        total: 60000000
                    }
                ],
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-014',
                contractId: 12,
                contractNumber: 'KONTRAK_12012024_012',
                projectName: 'Warehouse Management Manado',
                clientName: 'PT. Manado Storage',
                clientEmail: 'finance@manadostorage.co.id',
                clientPhone: '0431-567890',
                amount: 75000000,
                dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                status: 'overdue',
                description: 'Pembayaran untuk layanan warehouse',
                items: [
                    {
                        description: 'Warehouse Rental',
                        quantity: 60,
                        unitPrice: 800000,
                        total: 48000000
                    },
                    {
                        description: 'Security Service',
                        quantity: 1,
                        unitPrice: 27000000,
                        total: 27000000
                    }
                ],
                createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-015',
                contractId: 13,
                contractNumber: 'KONTRAK_08012024_013',
                projectName: 'Pengiriman Logistik Pontianak',
                clientName: 'CV. Pontianak Cargo',
                clientEmail: 'billing@pontianakcargo.com',
                clientPhone: '0561-678901',
                amount: 65000000,
                dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
                status: 'pending',
                description: 'Pembayaran untuk pengiriman logistik',
                items: [
                    {
                        description: 'Pengiriman Darat',
                        quantity: 1,
                        unitPrice: 40000000,
                        total: 40000000
                    },
                    {
                        description: 'Asuransi Pengiriman',
                        quantity: 1,
                        unitPrice: 25000000,
                        total: 25000000
                    }
                ],
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-016',
                contractId: 14,
                contractNumber: 'KONTRAK_05012024_014',
                projectName: 'Cold Storage Banjarmasin',
                clientName: 'PT. Banjarmasin Fresh',
                clientEmail: 'admin@banjarmasinfresh.co.id',
                clientPhone: '0511-789012',
                amount: 110000000,
                dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                status: 'pending',
                description: 'Pembayaran untuk cold storage',
                items: [
                    {
                        description: 'Cold Storage (120 hari)',
                        quantity: 120,
                        unitPrice: 700000,
                        total: 84000000
                    },
                    {
                        description: 'Temperature Monitoring',
                        quantity: 1,
                        unitPrice: 26000000,
                        total: 26000000
                    }
                ],
                createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-017',
                contractId: 15,
                contractNumber: 'KONTRAK_02012024_015',
                projectName: 'Bongkar Muat Balikpapan',
                clientName: 'PT. Balikpapan Port',
                clientEmail: 'finance@balikpapanport.co.id',
                clientPhone: '0542-890123',
                amount: 80000000,
                dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                status: 'overdue',
                description: 'Pembayaran untuk bongkar muat',
                items: [
                    {
                        description: 'Bongkar Muat',
                        quantity: 20,
                        unitPrice: 3000000,
                        total: 60000000
                    },
                    {
                        description: 'Crane Service',
                        quantity: 1,
                        unitPrice: 20000000,
                        total: 20000000
                    }
                ],
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-002',
                contractId: 2,
                contractNumber: 'KONTRAK_01022024_002',
                projectName: 'Penyimpanan Barang Surabaya',
                clientName: 'CV. Sukses Mandiri',
                clientEmail: 'admin@suksesmandiri.com',
                clientPhone: '031-87654321',
                amount: 25000000,
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                status: 'paid',
                description: 'Pembayaran untuk layanan penyimpanan',
                items: [
                    {
                        description: 'Layanan Penyimpanan (30 hari)',
                        quantity: 30,
                        unitPrice: 500000,
                        total: 15000000
                    },
                    {
                        description: 'Biaya Handling & Loading',
                        quantity: 1,
                        unitPrice: 10000000,
                        total: 10000000
                    }
                ],
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-003',
                contractId: 3,
                contractNumber: 'KONTRAK_01122023_003',
                projectName: 'Bongkar Muat Pelabuhan',
                clientName: 'PT. Pelabuhan Indonesia',
                clientEmail: 'billing@pelabuhanindonesia.co.id',
                clientPhone: '021-98765432',
                amount: 75000000,
                dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days overdue
                status: 'overdue',
                description: 'Pembayaran untuk layanan bongkar muat',
                items: [
                    {
                        description: 'Bongkar Muat Kontainer 40ft',
                        quantity: 10,
                        unitPrice: 5000000,
                        total: 50000000
                    },
                    {
                        description: 'Biaya Crane & Equipment',
                        quantity: 1,
                        unitPrice: 25000000,
                        total: 25000000
                    }
                ],
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-004',
                contractId: 4,
                contractNumber: 'KONTRAK_20012024_004',
                projectName: 'Distribusi Ekspor Batam',
                clientName: 'PT. Batam Logistics',
                clientEmail: 'finance@batamlogistics.com',
                clientPhone: '0778-123456',
                amount: 100000000,
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
                status: 'pending',
                description: 'Pembayaran tahap kedua untuk distribusi ekspor',
                items: [
                    {
                        description: 'Distribusi ke Pelabuhan Batam',
                        quantity: 1,
                        unitPrice: 60000000,
                        total: 60000000
                    },
                    {
                        description: 'Dokumentasi Ekspor',
                        quantity: 1,
                        unitPrice: 20000000,
                        total: 20000000
                    },
                    {
                        description: 'Biaya Bea Cukai',
                        quantity: 1,
                        unitPrice: 20000000,
                        total: 20000000
                    }
                ],
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-005',
                contractId: 5,
                contractNumber: 'KONTRAK_10012024_005',
                projectName: 'Cold Storage Medan',
                clientName: 'CV. Medan Fresh',
                clientEmail: 'billing@medanfresh.com',
                clientPhone: '061-456789',
                amount: 40000000,
                dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
                status: 'overdue',
                description: 'Pembayaran untuk layanan cold storage',
                items: [
                    {
                        description: 'Cold Storage (60 hari)',
                        quantity: 60,
                        unitPrice: 500000,
                        total: 30000000
                    },
                    {
                        description: 'Maintenance & Monitoring',
                        quantity: 1,
                        unitPrice: 10000000,
                        total: 10000000
                    }
                ],
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-006',
                contractId: 6,
                contractNumber: 'KONTRAK_05012024_006',
                projectName: 'Warehouse Management Bandung',
                clientName: 'PT. Bandung Storage',
                clientEmail: 'admin@bandungstorage.co.id',
                clientPhone: '022-789012',
                amount: 60000000,
                dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
                status: 'pending',
                description: 'Pembayaran untuk layanan warehouse management',
                items: [
                    {
                        description: 'Warehouse Management System',
                        quantity: 1,
                        unitPrice: 30000000,
                        total: 30000000
                    },
                    {
                        description: 'Inventory Management',
                        quantity: 1,
                        unitPrice: 20000000,
                        total: 20000000
                    },
                    {
                        description: 'Staff Training',
                        quantity: 1,
                        unitPrice: 10000000,
                        total: 10000000
                    }
                ],
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-007',
                contractId: 1,
                contractNumber: 'KONTRAK_15012024_001',
                projectName: 'Pengiriman Logistik Jakarta',
                clientName: 'PT. Maju Jaya',
                clientEmail: 'finance@majujaya.com',
                clientPhone: '021-12345678',
                amount: 75000000,
                dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
                status: 'pending',
                description: 'Pembayaran tahap kedua untuk pengiriman logistik',
                items: [
                    {
                        description: 'Pengiriman Kontainer 40ft',
                        quantity: 3,
                        unitPrice: 20000000,
                        total: 60000000
                    },
                    {
                        description: 'Biaya Transportasi Darat',
                        quantity: 1,
                        unitPrice: 15000000,
                        total: 15000000
                    }
                ],
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
            },
            {
                id: 'BILL-008',
                contractId: 2,
                contractNumber: 'KONTRAK_01022024_002',
                projectName: 'Penyimpanan Barang Surabaya',
                clientName: 'CV. Sukses Mandiri',
                clientEmail: 'admin@suksesmandiri.com',
                clientPhone: '031-87654321',
                amount: 15000000,
                dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day overdue
                status: 'overdue',
                description: 'Pembayaran untuk layanan penyimpanan tambahan',
                items: [
                    {
                        description: 'Penyimpanan Tambahan (15 hari)',
                        quantity: 15,
                        unitPrice: 800000,
                        total: 12000000
                    },
                    {
                        description: 'Biaya Keamanan',
                        quantity: 1,
                        unitPrice: 3000000,
                        total: 3000000
                    }
                ],
                createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
        ];

        // Sample payment data
        this.payments = [
            {
                id: 'PAY-001',
                billId: 'BILL-002',
                amount: 25000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-123456789',
                paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Sukses Mandiri',
                    email: 'admin@suksesmandiri.com',
                    phone: '031-87654321'
                },
                fee: 0,
                totalAmount: 25000000
            },
            {
                id: 'PAY-002',
                billId: 'BILL-001',
                amount: 50000000,
                method: 'credit_card',
                methodName: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN-987654321',
                paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Maju Jaya',
                    email: 'finance@majujaya.com',
                    phone: '021-12345678'
                },
                fee: 2500000,
                totalAmount: 52500000
            },
            {
                id: 'PAY-003',
                billId: 'BILL-004',
                amount: 100000000,
                method: 'e_wallet',
                methodName: 'E-Wallet',
                status: 'completed',
                transactionId: 'TXN-456789123',
                paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Batam Logistics',
                    email: 'finance@batamlogistics.com',
                    phone: '0778-123456'
                },
                fee: 2000000,
                totalAmount: 102000000
            },
            {
                id: 'PAY-004',
                billId: 'BILL-006',
                amount: 60000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-789123456',
                paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Bandung Storage',
                    email: 'admin@bandungstorage.co.id',
                    phone: '022-789012'
                },
                fee: 0,
                totalAmount: 60000000
            },
            {
                id: 'PAY-005',
                billId: 'BILL-007',
                amount: 75000000,
                method: 'credit_card',
                methodName: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN-321654987',
                paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Maju Jaya',
                    email: 'finance@majujaya.com',
                    phone: '021-12345678'
                },
                fee: 3000000,
                totalAmount: 78000000
            },
            {
                id: 'PAY-006',
                billId: 'BILL-008',
                amount: 40000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'pending_verification',
                transactionId: 'TXN-654987321',
                paidAt: null,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Medan Fresh',
                    email: 'billing@medanfresh.com',
                    phone: '061-456789'
                },
                fee: 0,
                totalAmount: 40000000,
                transferInfo: {
                    bank: 'Bank Mandiri',
                    accountNumber: '1234567890',
                    accountName: 'PT. Minerva Logistics',
                    transferDate: '2024-01-28',
                    transferNote: 'Pembayaran cold storage',
                    proofFile: 'bukti_transfer_medan.jpg'
                }
            },
            {
                id: 'PAY-007',
                billId: 'BILL-009',
                amount: 85000000,
                method: 'e_wallet',
                methodName: 'E-Wallet',
                status: 'completed',
                transactionId: 'TXN-147258369',
                paidAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Semarang Cargo',
                    email: 'billing@semarangcargo.co.id',
                    phone: '024-123456'
                },
                fee: 1500000,
                totalAmount: 86500000
            },
            {
                id: 'PAY-008',
                billId: 'BILL-010',
                amount: 45000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'failed',
                transactionId: 'TXN-369258147',
                paidAt: null,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Jogja Storage',
                    email: 'admin@jogjastorage.com',
                    phone: '0274-789012'
                },
                fee: 0,
                totalAmount: 45000000
            },
            {
                id: 'PAY-009',
                billId: 'BILL-011',
                amount: 120000000,
                method: 'credit_card',
                methodName: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN-852741963',
                paidAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Makassar Fresh',
                    email: 'finance@makassarfresh.co.id',
                    phone: '0411-456789'
                },
                fee: 4000000,
                totalAmount: 124000000
            },
            {
                id: 'PAY-010',
                billId: 'BILL-012',
                amount: 95000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-963852741',
                paidAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Palembang Port',
                    email: 'billing@palembangport.co.id',
                    phone: '0711-234567'
                },
                fee: 0,
                totalAmount: 95000000
            },
            {
                id: 'PAY-011',
                billId: 'BILL-013',
                amount: 180000000,
                method: 'e_wallet',
                methodName: 'E-Wallet',
                status: 'completed',
                transactionId: 'TXN-741852963',
                paidAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Bali Logistics',
                    email: 'admin@balilogistics.com',
                    phone: '0361-345678'
                },
                fee: 3000000,
                totalAmount: 183000000
            },
            {
                id: 'PAY-012',
                billId: 'BILL-014',
                amount: 75000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-159753486',
                paidAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Manado Storage',
                    email: 'finance@manadostorage.co.id',
                    phone: '0431-567890'
                },
                fee: 0,
                totalAmount: 75000000
            },
            {
                id: 'PAY-013',
                billId: 'BILL-015',
                amount: 65000000,
                method: 'credit_card',
                methodName: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN-486159753',
                paidAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Pontianak Cargo',
                    email: 'billing@pontianakcargo.com',
                    phone: '0561-678901'
                },
                fee: 2500000,
                totalAmount: 67500000
            },
            {
                id: 'PAY-014',
                billId: 'BILL-016',
                amount: 110000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-753486159',
                paidAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Banjarmasin Fresh',
                    email: 'admin@banjarmasinfresh.co.id',
                    phone: '0511-789012'
                },
                fee: 0,
                totalAmount: 110000000
            },
            {
                id: 'PAY-015',
                billId: 'BILL-017',
                amount: 80000000,
                method: 'e_wallet',
                methodName: 'E-Wallet',
                status: 'completed',
                transactionId: 'TXN-951753486',
                paidAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Balikpapan Port',
                    email: 'finance@balikpapanport.co.id',
                    phone: '0542-890123'
                },
                fee: 2000000,
                totalAmount: 82000000
            },
            {
                id: 'PAY-016',
                billId: 'BILL-003',
                amount: 120000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-357159486',
                paidAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Bandung Cargo',
                    email: 'finance@bandungcargo.com',
                    phone: '022-34567890'
                },
                fee: 0,
                totalAmount: 120000000
            },
            {
                id: 'PAY-017',
                billId: 'BILL-005',
                amount: 40000000,
                method: 'credit_card',
                methodName: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN-486357159',
                paidAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Medan Fresh',
                    email: 'billing@medanfresh.com',
                    phone: '061-456789'
                },
                fee: 2000000,
                totalAmount: 42000000
            },
            {
                id: 'PAY-018',
                billId: 'BILL-001',
                amount: 50000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'pending_verification',
                transactionId: 'TXN-159486357',
                paidAt: null,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Maju Jaya',
                    email: 'finance@majujaya.com',
                    phone: '021-12345678'
                },
                fee: 0,
                totalAmount: 50000000,
                transferInfo: {
                    bank: 'Bank Mandiri',
                    accountNumber: '1234567890',
                    accountName: 'PT. Minerva Logistics',
                    transferDate: '2024-01-29',
                    transferNote: 'Pembayaran tahap pertama',
                    proofFile: 'bukti_transfer_jakarta.pdf'
                }
            },
            {
                id: 'PAY-019',
                billId: 'BILL-002',
                amount: 25000000,
                method: 'e_wallet',
                methodName: 'E-Wallet',
                status: 'completed',
                transactionId: 'TXN-753159486',
                paidAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'CV. Sukses Mandiri',
                    email: 'admin@suksesmandiri.com',
                    phone: '031-87654321'
                },
                fee: 1000000,
                totalAmount: 26000000
            },
            {
                id: 'PAY-020',
                billId: 'BILL-004',
                amount: 100000000,
                method: 'bank_transfer',
                methodName: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN-486753159',
                paidAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
                createdAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Batam Logistics',
                    email: 'finance@batamlogistics.com',
                    phone: '0778-123456'
                },
                fee: 0,
                totalAmount: 100000000
            },
            {
                id: 'PAY-021',
                billId: 'BILL-006',
                amount: 60000000,
                method: 'virtual_account',
                status: 'completed',
                transactionId: 'TXN-789123456',
                paidAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                clientInfo: {
                    name: 'PT. Bandung Storage',
                    email: 'admin@bandungstorage.co.id',
                    phone: '022-789012'
                }
            }
        ];
    }

    // Generate new bill
    generateBill(contractId, items, dueDate) {
        const contract = this.contracts.find(c => c.id === contractId);
        if (!contract) {
            throw new Error('Contract not found');
        }

        const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        
        const bill = {
            id: `BILL-${String(this.bills.length + 1).padStart(3, '0')}`,
            contractId: contractId,
            contractNumber: contract.nomorKontrak,
            projectName: contract.namaProyek,
            clientName: contract.namaPic,
            amount: totalAmount,
            dueDate: dueDate,
            status: 'pending',
            description: `Pembayaran untuk ${contract.namaProyek}`,
            items: items,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.bills.push(bill);
        return bill;
    }

    // Process payment
    processPayment(billId, paymentMethod, amount) {
        const bill = this.bills.find(b => b.id === billId);
        if (!bill) {
            throw new Error('Bill not found');
        }

        if (bill.status === 'paid') {
            throw new Error('Bill already paid');
        }

        const payment = {
            id: `PAY-${String(this.payments.length + 1).padStart(3, '0')}`,
            billId: billId,
            amount: amount,
            method: paymentMethod,
            status: 'processing',
            transactionId: `TXN-${Date.now()}`,
            paidAt: null,
            createdAt: new Date()
        };

        this.payments.push(payment);

        // Simulate payment processing
        setTimeout(() => {
            payment.status = 'completed';
            payment.paidAt = new Date();
            bill.status = 'paid';
            bill.updatedAt = new Date();
            
            // Trigger payment success event
            this.onPaymentSuccess(payment, bill);
        }, 2000);

        return payment;
    }

    // Payment success callback
    onPaymentSuccess(payment, bill) {
        console.log('Payment successful:', payment);
        console.log('Bill updated:', bill);
        
        // You can add notification or other success actions here
        this.showNotification(`Pembayaran ${bill.id} berhasil diproses!`, 'success');
    }

    // Get bills by status
    getBillsByStatus(status) {
        return this.bills.filter(bill => bill.status === status);
    }

    // Get overdue bills
    getOverdueBills() {
        const now = new Date();
        return this.bills.filter(bill => 
            bill.status === 'pending' && 
            bill.dueDate < now
        );
    }

    // Get payment history
    getPaymentHistory(billId) {
        return this.payments.filter(payment => payment.billId === billId);
    }

    // Calculate total outstanding
    getTotalOutstanding() {
        return this.bills
            .filter(bill => bill.status === 'pending')
            .reduce((sum, bill) => sum + bill.amount, 0);
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // AI Actions
    analyzeBillingData() {
        const totalBills = this.bills.length;
        const pendingBills = this.getBillsByStatus('pending').length;
        const overdueBills = this.getOverdueBills().length;
        const totalOutstanding = this.getTotalOutstanding();
        const avgBillAmount = this.bills.reduce((sum, bill) => sum + bill.amount, 0) / totalBills;
        
        const analysis = {
            totalBills,
            pendingBills,
            overdueBills,
            totalOutstanding,
            avgBillAmount,
            paymentTrend: this.calculatePaymentTrend(),
            riskScore: this.calculateRiskScore()
        };
        
        this.showAIAnalysis(analysis);
    }

    predictPayments() {
        const predictions = {
            nextWeekPayments: this.predictNextWeekPayments(),
            overdueRisk: this.predictOverdueRisk(),
            paymentRecommendations: this.getPaymentRecommendations()
        };
        
        this.showAIPredictions(predictions);
    }

    calculatePaymentTrend() {
        const completedPayments = this.payments.filter(p => p.status === 'completed');
        const last7Days = completedPayments.filter(p => 
            new Date(p.paidAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        const previous7Days = completedPayments.filter(p => {
            const date = new Date(p.paidAt);
            return date > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && 
                   date <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        });
        
        const currentWeek = last7Days.reduce((sum, p) => sum + p.amount, 0);
        const previousWeek = previous7Days.reduce((sum, p) => sum + p.amount, 0);
        
        if (previousWeek === 0) return 'new';
        const trend = ((currentWeek - previousWeek) / previousWeek) * 100;
        
        if (trend > 10) return 'increasing';
        if (trend < -10) return 'decreasing';
        return 'stable';
    }

    calculateRiskScore() {
        const overdueBills = this.getOverdueBills().length;
        const totalBills = this.bills.length;
        const overduePercentage = (overdueBills / totalBills) * 100;
        
        if (overduePercentage > 30) return 'high';
        if (overduePercentage > 15) return 'medium';
        return 'low';
    }

    predictNextWeekPayments() {
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const billsDueNextWeek = this.bills.filter(bill => 
            bill.status === 'pending' && 
            new Date(bill.dueDate) <= nextWeek
        );
        
        return {
            count: billsDueNextWeek.length,
            totalAmount: billsDueNextWeek.reduce((sum, bill) => sum + bill.amount, 0),
            bills: billsDueNextWeek
        };
    }

    predictOverdueRisk() {
        const bills = this.bills.filter(bill => bill.status === 'pending');
        const highRiskBills = bills.filter(bill => {
            const daysUntilDue = Math.ceil((new Date(bill.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            return daysUntilDue <= 3 && daysUntilDue > 0;
        });
        
        return {
            count: highRiskBills.length,
            totalAmount: highRiskBills.reduce((sum, bill) => sum + bill.amount, 0),
            bills: highRiskBills
        };
    }

    getPaymentRecommendations() {
        const recommendations = [];
        
        // Check for overdue bills
        const overdueBills = this.getOverdueBills();
        if (overdueBills.length > 0) {
            recommendations.push({
                type: 'urgent',
                message: `Ada ${overdueBills.length} bill yang sudah lewat jatuh tempo. Segera follow up ke client.`,
                action: 'Follow up overdue bills'
            });
        }
        
        // Check for bills due soon
        const billsDueSoon = this.bills.filter(bill => {
            const daysUntilDue = Math.ceil((new Date(bill.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            return bill.status === 'pending' && daysUntilDue <= 3 && daysUntilDue > 0;
        });
        
        if (billsDueSoon.length > 0) {
            recommendations.push({
                type: 'warning',
                message: `${billsDueSoon.length} bill akan jatuh tempo dalam 3 hari. Kirim reminder.`,
                action: 'Send payment reminders'
            });
        }
        
        // Check payment trends
        const trend = this.calculatePaymentTrend();
        if (trend === 'decreasing') {
            recommendations.push({
                type: 'info',
                message: 'Tren pembayaran menurun. Pertimbangkan untuk menawarkan diskon early payment.',
                action: 'Offer early payment discount'
            });
        }
        
        return recommendations;
    }

    showAIAnalysis(analysis) {
        const modal = new bootstrap.Modal(document.getElementById('aiAnalysisModal'));
        const content = document.getElementById('aiAnalysisContent');
        
        if (content) {
            content.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6>Statistik Billing</h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total Bills:</span>
                                <strong>${analysis.totalBills}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Pending Bills:</span>
                                <strong>${analysis.pendingBills}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Overdue Bills:</span>
                                <strong class="text-danger">${analysis.overdueBills}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total Outstanding:</span>
                                <strong>Rp ${analysis.totalOutstanding.toLocaleString('id-ID')}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Rata-rata Bill:</span>
                                <strong>Rp ${Math.round(analysis.avgBillAmount).toLocaleString('id-ID')}</strong>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6>Analisis AI</h6>
                        <div class="alert alert-${analysis.paymentTrend === 'increasing' ? 'success' : analysis.paymentTrend === 'decreasing' ? 'warning' : 'info'}">
                            <strong>Tren Pembayaran:</strong> ${analysis.paymentTrend === 'increasing' ? 'Meningkat' : analysis.paymentTrend === 'decreasing' ? 'Menurun' : 'Stabil'}
                        </div>
                        <div class="alert alert-${analysis.riskScore === 'high' ? 'danger' : analysis.riskScore === 'medium' ? 'warning' : 'success'}">
                            <strong>Risk Score:</strong> ${analysis.riskScore === 'high' ? 'Tinggi' : analysis.riskScore === 'medium' ? 'Sedang' : 'Rendah'}
                        </div>
                    </div>
                </div>
            `;
        }
        
        modal.show();
    }

    showAIPredictions(predictions) {
        const modal = new bootstrap.Modal(document.getElementById('aiPredictionsModal'));
        const content = document.getElementById('aiPredictionsContent');
        
        if (content) {
            content.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6>Prediksi Pembayaran Minggu Depan</h6>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${predictions.nextWeekPayments.count} Bills</h5>
                                <p class="card-text">Total: Rp ${predictions.nextWeekPayments.totalAmount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>Risiko Overdue</h6>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-warning">${predictions.overdueRisk.count} Bills</h5>
                                <p class="card-text">Total: Rp ${predictions.overdueRisk.totalAmount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>Rekomendasi AI</h6>
                        ${predictions.paymentRecommendations.map(rec => `
                            <div class="alert alert-${rec.type === 'urgent' ? 'danger' : rec.type === 'warning' ? 'warning' : 'info'}">
                                <strong>${rec.action}:</strong> ${rec.message}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        modal.show();
    }

    // Payment Methods
    renderPaymentMethods() {
        return this.paymentMethods.map(method => `
            <div class="col-md-6 mb-3">
                <div class="card payment-method-card" onclick="selectPaymentMethod('${method.id}')">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="payment-method-icon me-3">
                                <i class="${method.icon} fa-2x text-primary"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${method.name}</h6>
                                <small class="text-muted">${method.description}</small>
                                <div class="mt-1">
                                    <small class="text-success">
                                        <i class="fas fa-clock me-1"></i>${method.processingTime}
                                    </small>
                                    ${method.fee > 0 ? `
                                        <small class="text-warning ms-2">
                                            <i class="fas fa-info-circle me-1"></i>Fee: Rp ${method.fee.toLocaleString('id-ID')}
                                        </small>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Payment History
    renderPaymentHistory() {
        const payments = this.payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Bill ID</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payments.map(payment => this.renderPaymentRow(payment)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderPaymentRow(payment) {
        const statusBadge = this.getPaymentStatusBadge(payment.status);
        
        return `
            <tr>
                <td><strong>${payment.id}</strong></td>
                <td>${payment.billId}</td>
                <td><strong>Rp ${payment.amount.toLocaleString('id-ID')}</strong></td>
                <td>
                    <i class="${this.paymentMethods.find(m => m.id === payment.method)?.icon} me-2"></i>
                    ${payment.methodName || this.paymentMethods.find(m => m.id === payment.method)?.name}
                </td>
                <td>${statusBadge}</td>
                <td>
                    ${payment.paidAt ? payment.paidAt.toLocaleString('id-ID') : payment.createdAt.toLocaleString('id-ID')}
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewPaymentDetails('${payment.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-secondary" onclick="downloadReceipt('${payment.id}')" title="Download Receipt">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    getPaymentStatusBadge(status) {
        const badges = {
            'processing': '<span class="badge bg-warning"><i class="fas fa-clock me-1"></i>Processing</span>',
            'completed': '<span class="badge bg-success"><i class="fas fa-check me-1"></i>Completed</span>',
            'failed': '<span class="badge bg-danger"><i class="fas fa-times me-1"></i>Failed</span>',
            'cancelled': '<span class="badge bg-secondary"><i class="fas fa-ban me-1"></i>Cancelled</span>',
            'pending': '<span class="badge bg-info"><i class="fas fa-hourglass-half me-1"></i>Pending</span>',
            'pending_verification': '<span class="badge bg-warning"><i class="fas fa-file-upload me-1"></i>Pending Verification</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }

    // Render billing dashboard
    renderBillingDashboard() {
        const totalBills = this.bills.length;
        const pendingBills = this.getBillsByStatus('pending').length;
        const paidBills = this.getBillsByStatus('paid').length;
        const overdueBills = this.getOverdueBills().length;
        const totalOutstanding = this.getTotalOutstanding();

        return `
            <div class="row mb-4">
                <div class="col-md-3">
                    <div class="card bg-primary text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h4 class="mb-0">${totalBills}</h4>
                                    <small>Total Bills</small>
                                </div>
                                <i class="fas fa-file-invoice fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h4 class="mb-0">${pendingBills}</h4>
                                    <small>Pending Bills</small>
                                </div>
                                <i class="fas fa-clock fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-danger text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h4 class="mb-0">${overdueBills}</h4>
                                    <small>Overdue Bills</small>
                                </div>
                                <i class="fas fa-exclamation-triangle fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card bg-success text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h4 class="mb-0">Rp ${totalOutstanding.toLocaleString('id-ID')}</h4>
                                    <small>Total Outstanding</small>
                                </div>
                                <i class="fas fa-dollar-sign fa-2x opacity-75"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render bills table
    renderBillsTable() {
        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Daftar Bills</h5>
                    <button class="btn btn-primary btn-sm" onclick="showGenerateBillModal()">
                        <i class="fas fa-plus me-2"></i>Generate Bill
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Bill ID</th>
                                    <th>Contract</th>
                                    <th>Client</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.bills.map(bill => this.renderBillRow(bill)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // Render bill row
    renderBillRow(bill) {
        const statusBadge = this.getStatusBadge(bill.status);
        const isOverdue = bill.status === 'pending' && bill.dueDate < new Date();
        
        return `
            <tr class="${isOverdue ? 'table-danger' : ''}">
                <td><strong>${bill.id}</strong></td>
                <td>
                    <div>
                        <strong>${bill.contractNumber}</strong><br>
                        <small class="text-muted">${bill.projectName}</small>
                    </div>
                </td>
                <td>${bill.clientName}</td>
                <td><strong>Rp ${bill.amount.toLocaleString('id-ID')}</strong></td>
                <td>
                    ${bill.dueDate.toLocaleDateString('id-ID')}
                    ${isOverdue ? '<br><small class="text-danger">Overdue</small>' : ''}
                </td>
                <td>${statusBadge}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="viewBillDetails('${bill.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${bill.status === 'pending' ? `
                            <button class="btn btn-outline-success" onclick="showPaymentModal('${bill.id}')" title="Make Payment">
                                <i class="fas fa-credit-card"></i>
                            </button>
                        ` : ''}
                        <button class="btn btn-outline-secondary" onclick="downloadBill('${bill.id}')" title="Download PDF">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    // Get status badge
    getStatusBadge(status) {
        const badges = {
            'pending': '<span class="badge bg-warning">Pending</span>',
            'paid': '<span class="badge bg-success">Paid</span>',
            'overdue': '<span class="badge bg-danger">Overdue</span>',
            'cancelled': '<span class="badge bg-secondary">Cancelled</span>'
        };
        return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
    }
}

// Global billing system instance
let billingSystem = new BillingSystem();

// Global functions for billing
function showGenerateBillModal() {
    // Populate contract select dropdown
    const contractSelect = document.getElementById('contractSelect');
    if (contractSelect) {
        contractSelect.innerHTML = '<option value="">Choose contract...</option>';
        billingSystem.contracts.forEach(contract => {
            const option = document.createElement('option');
            option.value = contract.id;
            option.textContent = `${contract.nomorKontrak} - ${contract.namaProyek} (${contract.namaPic})`;
            contractSelect.appendChild(option);
        });
    }
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('generateBillModal'));
    modal.show();
}

function viewBillDetails(billId) {
    const bill = billingSystem.bills.find(b => b.id === billId);
    if (bill) {
        const content = document.getElementById('billDetailsContent');
        if (content) {
            content.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6>Bill Information</h6>
                        <table class="table table-sm">
                            <tr><td><strong>Bill ID:</strong></td><td>${bill.id}</td></tr>
                            <tr><td><strong>Contract:</strong></td><td>${bill.contractNumber}</td></tr>
                            <tr><td><strong>Project:</strong></td><td>${bill.projectName}</td></tr>
                            <tr><td><strong>Client:</strong></td><td>${bill.clientName}</td></tr>
                            <tr><td><strong>Amount:</strong></td><td><strong>Rp ${bill.amount.toLocaleString('id-ID')}</strong></td></tr>
                            <tr><td><strong>Due Date:</strong></td><td>${bill.dueDate.toLocaleDateString('id-ID')}</td></tr>
                            <tr><td><strong>Status:</strong></td><td>${billingSystem.getStatusBadge(bill.status)}</td></tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <h6>Client Information</h6>
                        <table class="table table-sm">
                            <tr><td><strong>Email:</strong></td><td>${bill.clientEmail}</td></tr>
                            <tr><td><strong>Phone:</strong></td><td>${bill.clientPhone}</td></tr>
                        </table>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>Bill Items</h6>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bill.items.map(item => `
                                    <tr>
                                        <td>${item.description}</td>
                                        <td>${item.quantity}</td>
                                        <td>Rp ${item.unitPrice.toLocaleString('id-ID')}</td>
                                        <td><strong>Rp ${item.total.toLocaleString('id-ID')}</strong></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>Description</h6>
                        <p>${bill.description}</p>
                    </div>
                </div>
            `;
        }
        
        const modal = new bootstrap.Modal(document.getElementById('billDetailsModal'));
        modal.show();
    }
}

function showPaymentModal(billId) {
    const bill = billingSystem.bills.find(b => b.id === billId);
    if (bill) {
        // Populate payment form with bill data
        document.getElementById('paymentBillId').textContent = bill.id;
        document.getElementById('paymentAmount').textContent = `Rp ${bill.amount.toLocaleString('id-ID')}`;
        document.getElementById('paymentDueDate').textContent = bill.dueDate.toLocaleDateString('id-ID');
        document.getElementById('paymentClient').textContent = bill.clientName;
        
        // Populate client info
        document.getElementById('clientName').value = bill.clientName;
        document.getElementById('clientEmail').value = bill.clientEmail;
        document.getElementById('clientPhone').value = bill.clientPhone;
        
        // Populate payment methods
        const paymentMethodSelect = document.getElementById('paymentMethod');
        if (paymentMethodSelect) {
            paymentMethodSelect.innerHTML = '<option value="">Select payment method...</option>';
            paymentSystem.paymentMethods.forEach(method => {
                const option = document.createElement('option');
                option.value = method.id;
                option.textContent = `${method.name} ${method.fee > 0 ? `(Fee: Rp ${method.fee.toLocaleString('id-ID')})` : '(No Fee)'}`;
                paymentMethodSelect.appendChild(option);
            });
        }
        
        // Update payment summary
        updatePaymentSummary();
        
        const modal = new bootstrap.Modal(document.getElementById('paymentFormModal'));
        modal.show();
    }
}

function downloadBill(billId) {
    const bill = billingSystem.bills.find(b => b.id === billId);
    if (bill) {
        console.log('Download bill:', billId);
        // Generate and download PDF
    }
}
