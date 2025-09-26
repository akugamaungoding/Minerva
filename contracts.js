// Contract Management System
let contracts = [];
let filteredContracts = [];
let selectedContracts = new Set();
let currentPage = 1;
let itemsPerPage = 10;
let totalPages = 1;
let barangData = new Map(); // Map untuk menyimpan data barang per kontrak

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
        status: 'draft',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15'
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
        updatedAt: '2024-01-25'
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
        status: 'expired',
        createdAt: '2023-11-20',
        updatedAt: '2024-01-31'
    },
    {
        id: 4,
        nomorKontrak: 'KONTRAK_15022024_004',
        namaProyek: 'Transportasi Barang Medan',
        jenisKontrak: 'Transportasi',
        tglPengajuan: '2024-02-15T08:30:00.000Z',
        tglMulai: '2024-02-15',
        tglSelesai: '2024-05-15',
        nilaiKontrak: 25000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Gatot Subroto No. 123, Medan',
        kontakResmi: '+628123456789',
        namaPic: 'Sarah Wilson',
        npwp: '12.345.678.9-012.000',
        asuransi: 1,
        terminPembayaran: 'DP',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 750000,
        penaltiTerlambat: 100000,
        hariPenalti: 7,
        dokumenLampiran: 'kontrak_transportasi_medan.pdf',
        status: 'active',
        createdAt: '2024-02-10',
        updatedAt: '2024-02-15'
    },
    {
        id: 5,
        nomorKontrak: 'KONTRAK_01032024_005',
        namaProyek: 'Logistik Ekspor Batam',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-03-01T14:00:00.000Z',
        tglMulai: '2024-03-01',
        tglSelesai: '2024-08-01',
        nilaiKontrak: 50000000,
        mataUang: 'USD',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Kawasan Industri Batam, Kepulauan Riau',
        kontakResmi: '+628123456790',
        namaPic: 'David Brown',
        npwp: '13.456.789.0-123.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 1000000,
        penaltiTerlambat: 300000,
        hariPenalti: 14,
        dokumenLampiran: 'kontrak_logistik_batam.pdf',
        status: 'pending',
        createdAt: '2024-02-25',
        updatedAt: '2024-03-01'
    },
    {
        id: 6,
        nomorKontrak: 'KONTRAK_15032024_006',
        namaProyek: 'Penyimpanan Cold Storage',
        jenisKontrak: 'Penyimpanan',
        tglPengajuan: '2024-03-15T11:15:00.000Z',
        tglMulai: '2024-03-15',
        tglSelesai: '2024-09-15',
        nilaiKontrak: 75000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Raya Bogor KM 25, Cibinong',
        kontakResmi: '+628123456791',
        namaPic: 'Lisa Anderson',
        npwp: '14.567.890.1-234.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 1500000,
        penaltiTerlambat: 500000,
        hariPenalti: 10,
        dokumenLampiran: 'kontrak_cold_storage.pdf',
        status: 'active',
        createdAt: '2024-03-10',
        updatedAt: '2024-03-15'
    },
    {
        id: 7,
        nomorKontrak: 'KONTRAK_01042024_007',
        namaProyek: 'Bongkar Muat Container',
        jenisKontrak: 'Bongkar Muat',
        tglPengajuan: '2024-04-01T09:45:00.000Z',
        tglMulai: '2024-04-01',
        tglSelesai: '2024-06-30',
        nilaiKontrak: 30000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Tanjung Perak, Surabaya',
        kontakResmi: '+628123456792',
        namaPic: 'Robert Taylor',
        npwp: '15.678.901.2-345.000',
        asuransi: 0,
        terminPembayaran: 'DP',
        metodePembayaran: 'Cash',
        ppn: 11.00,
        pajakLainnya: 500000,
        penaltiTerlambat: 200000,
        hariPenalti: 5,
        dokumenLampiran: 'kontrak_container_surabaya.pdf',
        status: 'completed',
        createdAt: '2024-03-25',
        updatedAt: '2024-06-30'
    },
    {
        id: 8,
        nomorKontrak: 'KONTRAK_15042024_008',
        namaProyek: 'Transportasi Internasional',
        jenisKontrak: 'Transportasi',
        tglPengajuan: '2024-04-15T16:20:00.000Z',
        tglMulai: '2024-04-15',
        tglSelesai: '2024-10-15',
        nilaiKontrak: 100000000,
        mataUang: 'USD',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Bandara Soekarno-Hatta, Tangerang',
        kontakResmi: '+628123456793',
        namaPic: 'Maria Garcia',
        npwp: '16.789.012.3-456.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 2500000,
        penaltiTerlambat: 750000,
        hariPenalti: 21,
        dokumenLampiran: 'kontrak_transportasi_internasional.pdf',
        status: 'active',
        createdAt: '2024-04-10',
        updatedAt: '2024-04-15'
    },
    {
        id: 9,
        nomorKontrak: 'KONTRAK_01052024_009',
        namaProyek: 'Logistik Perishable Goods',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-05-01T12:30:00.000Z',
        tglMulai: '2024-05-01',
        tglSelesai: '2024-07-31',
        nilaiKontrak: 40000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Raya Puncak KM 50, Cianjur',
        kontakResmi: '+628123456794',
        namaPic: 'James Miller',
        npwp: '17.890.123.4-567.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 800000,
        penaltiTerlambat: 400000,
        hariPenalti: 3,
        dokumenLampiran: 'kontrak_perishable_goods.pdf',
        status: 'pending',
        createdAt: '2024-04-25',
        updatedAt: '2024-05-01'
    },
    {
        id: 10,
        nomorKontrak: 'KONTRAK_15052024_010',
        namaProyek: 'Penyimpanan Berbahaya',
        jenisKontrak: 'Penyimpanan',
        tglPengajuan: '2024-05-15T10:00:00.000Z',
        tglMulai: '2024-05-15',
        tglSelesai: '2024-11-15',
        nilaiKontrak: 60000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Kawasan Industri Cikarang, Bekasi',
        kontakResmi: '+628123456795',
        namaPic: 'Jennifer Davis',
        npwp: '18.901.234.5-678.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 1200000,
        penaltiTerlambat: 600000,
        hariPenalti: 7,
        dokumenLampiran: 'kontrak_penyimpanan_berbahaya.pdf',
        status: 'active',
        createdAt: '2024-05-10',
        updatedAt: '2024-05-15'
    },
    {
        id: 11,
        nomorKontrak: 'KONTRAK_01062024_011',
        namaProyek: 'Bongkar Muat Bulk Cargo',
        jenisKontrak: 'Bongkar Muat',
        tglPengajuan: '2024-06-01T13:45:00.000Z',
        tglMulai: '2024-06-01',
        tglSelesai: '2024-08-31',
        nilaiKontrak: 45000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Belawan, Medan',
        kontakResmi: '+628123456796',
        namaPic: 'Michael Wilson',
        npwp: '19.012.345.6-789.000',
        asuransi: 0,
        terminPembayaran: 'DP',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 900000,
        penaltiTerlambat: 300000,
        hariPenalti: 10,
        dokumenLampiran: 'kontrak_bulk_cargo.pdf',
        status: 'completed',
        createdAt: '2024-05-25',
        updatedAt: '2024-08-31'
    },
    {
        id: 12,
        nomorKontrak: 'KONTRAK_15062024_012',
        namaProyek: 'Transportasi Multi Modal',
        jenisKontrak: 'Transportasi',
        tglPengajuan: '2024-06-15T15:30:00.000Z',
        tglMulai: '2024-06-15',
        tglSelesai: '2024-12-15',
        nilaiKontrak: 80000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Terminal Peti Kemas, Jakarta',
        kontakResmi: '+628123456797',
        namaPic: 'Amanda Johnson',
        npwp: '20.123.456.7-890.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 2000000,
        penaltiTerlambat: 800000,
        hariPenalti: 14,
        dokumenLampiran: 'kontrak_multi_modal.pdf',
        status: 'active',
        createdAt: '2024-06-10',
        updatedAt: '2024-06-15'
    },
    {
        id: 13,
        nomorKontrak: 'KONTRAK_01072024_013',
        namaProyek: 'Logistik E-commerce',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-07-01T11:00:00.000Z',
        tglMulai: '2024-07-01',
        tglSelesai: '2024-09-30',
        nilaiKontrak: 35000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Raya Bekasi KM 20, Bekasi',
        kontakResmi: '+628123456798',
        namaPic: 'Christopher Lee',
        npwp: '21.234.567.8-901.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 700000,
        penaltiTerlambat: 350000,
        hariPenalti: 5,
        dokumenLampiran: 'kontrak_ecommerce.pdf',
        status: 'pending',
        createdAt: '2024-06-25',
        updatedAt: '2024-07-01'
    },
    {
        id: 14,
        nomorKontrak: 'KONTRAK_15072024_014',
        namaProyek: 'Penyimpanan Fulfillment Center',
        jenisKontrak: 'Penyimpanan',
        tglPengajuan: '2024-07-15T14:15:00.000Z',
        tglMulai: '2024-07-15',
        tglSelesai: '2024-12-31',
        nilaiKontrak: 90000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Kawasan Industri Jababeka, Cikarang',
        kontakResmi: '+628123456799',
        namaPic: 'Sarah Thompson',
        npwp: '22.345.678.9-012.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 1800000,
        penaltiTerlambat: 900000,
        hariPenalti: 21,
        dokumenLampiran: 'kontrak_fulfillment_center.pdf',
        status: 'active',
        createdAt: '2024-07-10',
        updatedAt: '2024-07-15'
    },
    {
        id: 15,
        nomorKontrak: 'KONTRAK_01082024_015',
        namaProyek: 'Bongkar Muat Ro-Ro',
        jenisKontrak: 'Bongkar Muat',
        tglPengajuan: '2024-08-01T08:30:00.000Z',
        tglMulai: '2024-08-01',
        tglSelesai: '2024-10-31',
        nilaiKontrak: 55000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Merak, Banten',
        kontakResmi: '+628123456800',
        namaPic: 'Daniel Rodriguez',
        npwp: '23.456.789.0-123.000',
        asuransi: 0,
        terminPembayaran: 'DP',
        metodePembayaran: 'Cash',
        ppn: 11.00,
        pajakLainnya: 1100000,
        penaltiTerlambat: 550000,
        hariPenalti: 7,
        dokumenLampiran: 'kontrak_ro_ro.pdf',
        status: 'completed',
        createdAt: '2024-07-25',
        updatedAt: '2024-10-31'
    },
    {
        id: 16,
        nomorKontrak: 'KONTRAK_15082024_016',
        namaProyek: 'Transportasi Overland',
        jenisKontrak: 'Transportasi',
        tglPengajuan: '2024-08-15T12:45:00.000Z',
        tglMulai: '2024-08-15',
        tglSelesai: '2024-11-15',
        nilaiKontrak: 65000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Trans Sumatra, Lampung',
        kontakResmi: '+628123456801',
        namaPic: 'Jessica Martinez',
        npwp: '24.567.890.1-234.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 1300000,
        penaltiTerlambat: 650000,
        hariPenalti: 10,
        dokumenLampiran: 'kontrak_overland.pdf',
        status: 'active',
        createdAt: '2024-08-10',
        updatedAt: '2024-08-15'
    },
    {
        id: 17,
        nomorKontrak: 'KONTRAK_01092024_017',
        namaProyek: 'Logistik Express Delivery',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-09-01T16:00:00.000Z',
        tglMulai: '2024-09-01',
        tglSelesai: '2024-11-30',
        nilaiKontrak: 28000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Raya Bogor KM 30, Depok',
        kontakResmi: '+628123456802',
        namaPic: 'Kevin Anderson',
        npwp: '25.678.901.2-345.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 560000,
        penaltiTerlambat: 280000,
        hariPenalti: 3,
        dokumenLampiran: 'kontrak_express_delivery.pdf',
        status: 'pending',
        createdAt: '2024-08-25',
        updatedAt: '2024-09-01'
    },
    {
        id: 18,
        nomorKontrak: 'KONTRAK_15092024_018',
        namaProyek: 'Penyimpanan Cross Dock',
        jenisKontrak: 'Penyimpanan',
        tglPengajuan: '2024-09-15T09:30:00.000Z',
        tglMulai: '2024-09-15',
        tglSelesai: '2024-12-31',
        nilaiKontrak: 70000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Kawasan Industri MM2100, Cibitung',
        kontakResmi: '+628123456803',
        namaPic: 'Michelle White',
        npwp: '26.789.012.3-456.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 1400000,
        penaltiTerlambat: 700000,
        hariPenalti: 14,
        dokumenLampiran: 'kontrak_cross_dock.pdf',
        status: 'active',
        createdAt: '2024-09-10',
        updatedAt: '2024-09-15'
    },
    {
        id: 19,
        nomorKontrak: 'KONTRAK_01102024_019',
        namaProyek: 'Bongkar Muat Break Bulk',
        jenisKontrak: 'Bongkar Muat',
        tglPengajuan: '2024-10-01T13:20:00.000Z',
        tglMulai: '2024-10-01',
        tglSelesai: '2024-12-31',
        nilaiKontrak: 40000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Tanjung Emas, Semarang',
        kontakResmi: '+628123456804',
        namaPic: 'Ryan Clark',
        npwp: '27.890.123.4-567.000',
        asuransi: 0,
        terminPembayaran: 'DP',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 800000,
        penaltiTerlambat: 400000,
        hariPenalti: 5,
        dokumenLampiran: 'kontrak_break_bulk.pdf',
        status: 'completed',
        createdAt: '2024-09-25',
        updatedAt: '2024-12-31'
    },
    {
        id: 20,
        nomorKontrak: 'KONTRAK_15102024_020',
        namaProyek: 'Transportasi Inter Island',
        jenisKontrak: 'Transportasi',
        tglPengajuan: '2024-10-15T11:45:00.000Z',
        tglMulai: '2024-10-15',
        tglSelesai: '2025-01-15',
        nilaiKontrak: 85000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Pelabuhan Gilimanuk, Bali',
        kontakResmi: '+628123456805',
        namaPic: 'Nicole Taylor',
        npwp: '28.901.234.5-678.000',
        asuransi: 1,
        terminPembayaran: 'Cicilan',
        metodePembayaran: 'LC',
        ppn: 11.00,
        pajakLainnya: 1700000,
        penaltiTerlambat: 850000,
        hariPenalti: 21,
        dokumenLampiran: 'kontrak_inter_island.pdf',
        status: 'active',
        createdAt: '2024-10-10',
        updatedAt: '2024-10-15'
    },
    {
        id: 21,
        nomorKontrak: 'KONTRAK_01112024_021',
        namaProyek: 'Logistik Last Mile',
        jenisKontrak: 'Logistik',
        tglPengajuan: '2024-11-01T15:15:00.000Z',
        tglMulai: '2024-11-01',
        tglSelesai: '2025-01-31',
        nilaiKontrak: 32000000,
        mataUang: 'IDR',
        perusahaanPemberi: 1,
        perusahaanPenyedia: 2,
        alamat: 'Jl. Raya Cikampek KM 15, Karawang',
        kontakResmi: '+628123456806',
        namaPic: 'Brandon Lewis',
        npwp: '29.012.345.6-789.000',
        asuransi: 1,
        terminPembayaran: 'Pelunasan',
        metodePembayaran: 'Transfer Bank',
        ppn: 11.00,
        pajakLainnya: 640000,
        penaltiTerlambat: 320000,
        hariPenalti: 7,
        dokumenLampiran: 'kontrak_last_mile.pdf',
        status: 'pending',
        createdAt: '2024-10-25',
        updatedAt: '2024-11-01'
    }
];

// Sample barang data
const sampleBarangData = {
    1: [ // Kontrak 1 - Pengiriman Logistik Jakarta
        {
            id: 1,
            jenisBarang: 'Elektronik Konsumen',
            volume: 150.50,
            berat: 2500.75,
            jumlahKontainer: 2,
            ukuranKontainer: 20,
            nomorKontainer: 'MSKU1234567',
            createdAt: '2024-01-15T08:00:00.000Z',
            updatedAt: '2024-01-15T08:00:00.000Z'
        },
        {
            id: 2,
            jenisBarang: 'Pakaian dan Tekstil',
            volume: 200.25,
            berat: 1800.50,
            jumlahKontainer: 3,
            ukuranKontainer: 40,
            nomorKontainer: 'MSKU1234568',
            createdAt: '2024-01-15T08:00:00.000Z',
            updatedAt: '2024-01-15T08:00:00.000Z'
        }
    ],
    2: [ // Kontrak 2 - Penyimpanan Barang Surabaya
        {
            id: 3,
            jenisBarang: 'Makanan dan Minuman',
            volume: 300.00,
            berat: 5000.00,
            jumlahKontainer: 4,
            ukuranKontainer: 20,
            nomorKontainer: 'MSKU1234569',
            createdAt: '2024-02-01T09:00:00.000Z',
            updatedAt: '2024-02-01T09:00:00.000Z'
        }
    ],
    3: [ // Kontrak 3 - Bongkar Muat Pelabuhan
        {
            id: 4,
            jenisBarang: 'Mesin Industri',
            volume: 500.75,
            berat: 12000.25,
            jumlahKontainer: 5,
            ukuranKontainer: 40,
            nomorKontainer: 'MSKU1234570',
            createdAt: '2023-12-01T10:00:00.000Z',
            updatedAt: '2023-12-01T10:00:00.000Z'
        },
        {
            id: 5,
            jenisBarang: 'Bahan Kimia',
            volume: 100.50,
            berat: 800.75,
            jumlahKontainer: 1,
            ukuranKontainer: 20,
            nomorKontainer: 'MSKU1234571',
            createdAt: '2023-12-01T10:00:00.000Z',
            updatedAt: '2023-12-01T10:00:00.000Z'
        }
    ],
    4: [ // Kontrak 4 - Transportasi Barang Medan
        {
            id: 6,
            jenisBarang: 'Hasil Pertanian',
            volume: 400.00,
            berat: 3000.00,
            jumlahKontainer: 3,
            ukuranKontainer: 20,
            nomorKontainer: 'MSKU1234572',
            createdAt: '2024-02-15T08:30:00.000Z',
            updatedAt: '2024-02-15T08:30:00.000Z'
        }
    ],
    5: [ // Kontrak 5 - Logistik Ekspor Batam
        {
            id: 7,
            jenisBarang: 'Komponen Elektronik',
            volume: 250.25,
            berat: 1500.50,
            jumlahKontainer: 2,
            ukuranKontainer: 40,
            nomorKontainer: 'MSKU1234573',
            createdAt: '2024-03-01T14:00:00.000Z',
            updatedAt: '2024-03-01T14:00:00.000Z'
        },
        {
            id: 8,
            jenisBarang: 'Produk Tekstil',
            volume: 180.75,
            berat: 1200.25,
            jumlahKontainer: 2,
            ukuranKontainer: 20,
            nomorKontainer: 'MSKU1234574',
            createdAt: '2024-03-01T14:00:00.000Z',
            updatedAt: '2024-03-01T14:00:00.000Z'
        }
    ]
};

// Initialize contracts
function initializeContracts() {
    contracts = [...sampleContracts];
    filteredContracts = [...contracts];
    
    // Initialize barang data
    Object.keys(sampleBarangData).forEach(contractId => {
        barangData.set(parseInt(contractId), sampleBarangData[contractId]);
    });
    
    updateContractStats();
    calculatePagination();
    renderContractsTable();
    setupContractEventListeners();
}

// Update contract statistics
function updateContractStats() {
    const total = contracts.length;
    const pending = contracts.filter(c => c.status === 'pending').length;
    const active = contracts.filter(c => c.status === 'active').length;
    const expiring = contracts.filter(c => {
        const endDate = new Date(c.tglSelesai || c.endDate);
        const today = new Date();
        const daysUntilExpiry = (endDate - today) / (1000 * 60 * 60 * 24);
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;

    document.getElementById('totalContracts').textContent = total;
    document.getElementById('pendingContracts').textContent = pending;
    document.getElementById('activeContracts').textContent = active;
    document.getElementById('expiringContracts').textContent = expiring;
}

// Calculate pagination
function calculatePagination() {
    totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }
}

// Get paginated contracts
function getPaginatedContracts() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContracts.slice(startIndex, endIndex);
}

// Render pagination
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    const showingStart = document.getElementById('showingStart');
    const showingEnd = document.getElementById('showingEnd');
    const totalRecords = document.getElementById('totalRecords');
    
    // Update pagination info
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredContracts.length);
    
    showingStart.textContent = filteredContracts.length > 0 ? startIndex : 0;
    showingEnd.textContent = endIndex;
    totalRecords.textContent = filteredContracts.length;
    
    // Clear existing pagination
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    `;
    paginationContainer.appendChild(prevItem);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    // First page
    if (startPage > 1) {
        const firstItem = document.createElement('li');
        firstItem.className = 'page-item';
        firstItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(1)">1</a>`;
        paginationContainer.appendChild(firstItem);
        
        if (startPage > 2) {
            const ellipsisItem = document.createElement('li');
            ellipsisItem.className = 'page-item disabled';
            ellipsisItem.innerHTML = `<span class="page-link">...</span>`;
            paginationContainer.appendChild(ellipsisItem);
        }
    }
    
    // Page numbers around current page
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        paginationContainer.appendChild(pageItem);
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsisItem = document.createElement('li');
            ellipsisItem.className = 'page-item disabled';
            ellipsisItem.innerHTML = `<span class="page-link">...</span>`;
            paginationContainer.appendChild(ellipsisItem);
        }
        
        const lastItem = document.createElement('li');
        lastItem.className = 'page-item';
        lastItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${totalPages})">${totalPages}</a>`;
        paginationContainer.appendChild(lastItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    `;
    paginationContainer.appendChild(nextItem);
}

// Go to specific page
function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    currentPage = page;
    
    // Reset select all checkbox when changing pages
    const selectAll = document.getElementById('selectAllContracts');
    if (selectAll) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
    
    renderContractsTable();
    
    // Scroll to top of table
    document.querySelector('.contracts-table-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Render contracts table
function renderContractsTable() {
    const tbody = document.getElementById('contractsTableBody');
    tbody.innerHTML = '';

    if (filteredContracts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="text-center py-4">
                    <i class="fas fa-search me-2"></i>
                    Tidak ada kontrak yang ditemukan
                </td>
            </tr>
        `;
        renderPagination();
        return;
    }

    const paginatedContracts = getPaginatedContracts();
    
    paginatedContracts.forEach(contract => {
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
            <td class="contract-value">${contract.mataUang || 'Rp'} ${formatCurrency(contract.nilaiKontrak || contract.value)}</td>
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
                    <button class="btn btn-sm btn-outline-info" onclick="viewBarang(${contract.id})" title="Lihat Barang">
                        <i class="fas fa-boxes"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" 
                            onclick="editContract(${contract.id})" 
                            title="Edit Kontrak"
                            ${contract.status !== 'draft' ? 'disabled' : ''}>
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
    
    // Update select all checkbox status
    const selectAll = document.getElementById('selectAllContracts');
    const allSelected = paginatedContracts.every(contract => selectedContracts.has(contract.id));
    const someSelected = paginatedContracts.some(contract => selectedContracts.has(contract.id));
    
    if (allSelected && paginatedContracts.length > 0) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
    } else if (someSelected) {
        selectAll.checked = false;
        selectAll.indeterminate = true;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
    
    // Render pagination after table
    renderPagination();
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

    // Reset to first page when filtering
    currentPage = 1;
    calculatePagination();
    
    // Reset select all checkbox when filtering
    const selectAll = document.getElementById('selectAllContracts');
    if (selectAll) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
    
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
    document.getElementById('createContractForm').classList.remove('was-validated');
    document.getElementById('createContractForm').removeAttribute('data-edit-id');
    
    // Clear contract barang list
    contractBarangList = [];
    loadContractBarangData();
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

    // Check if editing existing contract
    const editId = form.getAttribute('data-edit-id');
    const isEditing = editId !== null;
    
    // Generate contract number (only for new contracts)
    const nomorKontrak = isEditing ? contracts.find(c => c.id === parseInt(editId)).nomorKontrak : generateContractNumber();
    
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
        kontakResmi: document.getElementById('countryCode').value + document.getElementById('kontakResmi').value,
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
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
    };

    if (isEditing) {
        // Update existing contract
        const index = contracts.findIndex(c => c.id === parseInt(editId));
        if (index !== -1) {
            contracts[index] = { ...contracts[index], ...newContract };
            showSuccess('Kontrak berhasil diperbarui!');
        }
    } else {
        // Add new contract
        contracts.unshift(newContract);
        
        // Save barang data for new contract
        if (contractBarangList.length > 0) {
            barangData.set(newContract.id, [...contractBarangList]);
        }
        
        showSuccess(`Kontrak berhasil dibuat dengan nomor: ${nomorKontrak}`);
    }
    
    applyFilters();
    updateContractStats();

    // Close modal and clear form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createContractModal'));
    modal.hide();
    clearCreateContractForm();
}

// Edit contract
function editContract(contractId) {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) {
        showError('Kontrak tidak ditemukan!');
        return;
    }
    
    // Check if contract can be edited (only draft status)
    if (contract.status !== 'draft') {
        showError('Kontrak hanya dapat diedit jika status masih DRAFT!');
        return;
    }
    
    // Fill edit form with existing data
    document.getElementById('editNamaProyek').value = contract.namaProyek || '';
    document.getElementById('editJenisKontrak').value = contract.jenisKontrak || '';
    document.getElementById('editTglMulai').value = contract.tglMulai || '';
    document.getElementById('editTglSelesai').value = contract.tglSelesai || '';
    document.getElementById('editNilaiKontrak').value = contract.nilaiKontrak || '';
    document.getElementById('editMataUang').value = contract.mataUang || '';
    document.getElementById('editAlamat').value = contract.alamat || '';
    document.getElementById('editCountryCode').value = contract.kontakResmi ? contract.kontakResmi.substring(0, 3) : '+62';
    document.getElementById('editKontakResmi').value = contract.kontakResmi ? contract.kontakResmi.substring(3) : '';
    document.getElementById('editNamaPic').value = contract.namaPic || '';
    document.getElementById('editNpwp').value = contract.npwp || '';
    document.getElementById('editAsuransi').value = contract.asuransi ? '1' : '0';
    document.getElementById('editTerminPembayaran').value = contract.terminPembayaran || '';
    document.getElementById('editMetodePembayaran').value = contract.metodePembayaran || '';
    document.getElementById('editPpn').value = contract.ppn || '';
    document.getElementById('editPajakLainnya').value = contract.pajakLainnya || '';
    document.getElementById('editPenaltiTerlambat').value = contract.penaltiTerlambat || '';
    document.getElementById('editHariPenalti').value = contract.hariPenalti || '';
    document.getElementById('editDokumenLampiran').value = contract.dokumenLampiran || '';
    
    // Update currency symbols for edit form
    initializeEditCurrencySymbols();
    
    // Store contract ID for update
    document.getElementById('editContractForm').setAttribute('data-edit-id', contractId);
    
    // Show edit contract modal
    const modal = new bootstrap.Modal(document.getElementById('editContractModal'));
    modal.show();
}

// Update contract
function updateContract() {
    const form = document.getElementById('editContractForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Get edit ID
    const editId = form.getAttribute('data-edit-id');
    if (!editId) {
        showError('ID kontrak tidak ditemukan!');
        return;
    }
    
    // Find contract to update
    const contractIndex = contracts.findIndex(c => c.id === parseInt(editId));
    if (contractIndex === -1) {
        showError('Kontrak tidak ditemukan!');
        return;
    }
    
    // Get form values
    const updatedContract = {
        namaProyek: document.getElementById('editNamaProyek').value,
        jenisKontrak: document.getElementById('editJenisKontrak').value,
        tglMulai: document.getElementById('editTglMulai').value,
        tglSelesai: document.getElementById('editTglSelesai').value,
        nilaiKontrak: parseFloat(document.getElementById('editNilaiKontrak').value),
        mataUang: document.getElementById('editMataUang').value,
        alamat: document.getElementById('editAlamat').value,
        kontakResmi: document.getElementById('editCountryCode').value + document.getElementById('editKontakResmi').value,
        namaPic: document.getElementById('editNamaPic').value,
        npwp: document.getElementById('editNpwp').value,
        asuransi: document.getElementById('editAsuransi').value === '1' ? 1 : 0,
        terminPembayaran: document.getElementById('editTerminPembayaran').value,
        metodePembayaran: document.getElementById('editMetodePembayaran').value,
        ppn: parseFloat(document.getElementById('editPpn').value),
        pajakLainnya: parseFloat(document.getElementById('editPajakLainnya').value) || 0,
        penaltiTerlambat: parseFloat(document.getElementById('editPenaltiTerlambat').value) || 0,
        hariPenalti: parseInt(document.getElementById('editHariPenalti').value) || 0,
        dokumenLampiran: document.getElementById('editDokumenLampiran').value,
        updatedAt: new Date().toISOString().split('T')[0]
    };
    
    // Update contract
    contracts[contractIndex] = { ...contracts[contractIndex], ...updatedContract };
    
    // Update UI
    applyFilters();
    updateContractStats();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editContractModal'));
    modal.hide();
    
    // Clear form
    form.reset();
    form.classList.remove('was-validated');
    form.removeAttribute('data-edit-id');
    
    showSuccess('Kontrak berhasil diperbarui!');
}

// View contract details
function viewContract(contractId) {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return;

    const content = document.getElementById('contractDetailsContent');
    content.innerHTML = `
        <!-- Informasi Dasar Kontrak -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-info-circle me-2"></i>Informasi Dasar Kontrak</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-file-contract me-2"></i>Nomor Kontrak</h6>
                    <p>${contract.nomorKontrak || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-project-diagram me-2"></i>Nama Proyek</h6>
                    <p>${contract.namaProyek || contract.name || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-tags me-2"></i>Jenis Kontrak</h6>
                    <p>${contract.jenisKontrak || contract.type || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-info-circle me-2"></i>Status</h6>
                    <p><span class="status-badge status-${contract.status}">${getStatusLabel(contract.status)}</span></p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-calendar-alt me-2"></i>Tanggal Mulai</h6>
                    <p>${formatDate(contract.tglMulai || contract.startDate)}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-calendar-check me-2"></i>Tanggal Selesai</h6>
                    <p>${formatDate(contract.tglSelesai || contract.endDate)}</p>
                </div>
            </div>
        </div>

        <!-- Nilai Kontrak -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-money-bill-wave me-2"></i>Nilai Kontrak</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-money-bill me-2"></i>Nilai Kontrak</h6>
                    <p class="contract-value">${contract.mataUang || 'Rp'} ${formatCurrency(contract.nilaiKontrak || contract.value)}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-coins me-2"></i>Mata Uang</h6>
                    <p><span class="badge bg-secondary">${contract.mataUang || 'IDR'}</span></p>
                </div>
            </div>
        </div>

        <!-- Informasi Perusahaan -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-building me-2"></i>Informasi Perusahaan</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-user-tie me-2"></i>Nama PIC</h6>
                    <p>${contract.namaPic || contract.client || contract.manager || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-phone me-2"></i>Kontak Resmi</h6>
                    <p>${contract.kontakResmi || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-id-card me-2"></i>NPWP</h6>
                    <p>${contract.npwp || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-map-marker-alt me-2"></i>Alamat</h6>
                    <p>${contract.alamat || 'N/A'}</p>
                </div>
            </div>
        </div>

        <!-- Asuransi -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-shield-alt me-2"></i>Asuransi</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-shield-alt me-2"></i>Asuransi</h6>
                    <p>${contract.asuransi ? 'Ya' : 'Tidak'}</p>
                </div>
            </div>
        </div>

        <!-- Informasi Pembayaran -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-credit-card me-2"></i>Informasi Pembayaran</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-calendar-week me-2"></i>Termin Pembayaran</h6>
                    <p>${contract.terminPembayaran || 'N/A'}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-money-check me-2"></i>Metode Pembayaran</h6>
                    <p>${contract.metodePembayaran || 'N/A'}</p>
                </div>
            </div>
        </div>

        <!-- Pajak dan Penalti -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-calculator me-2"></i>Pajak dan Penalti</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-percentage me-2"></i>PPN</h6>
                    <p>${contract.ppn || 0}%</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-receipt me-2"></i>Pajak Lainnya</h6>
                    <p>${contract.mataUang || 'Rp'} ${formatCurrency(contract.pajakLainnya || 0)}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-exclamation-triangle me-2"></i>Penalti Terlambat</h6>
                    <p>${contract.mataUang || 'Rp'} ${formatCurrency(contract.penaltiTerlambat || 0)}</p>
                </div>
                <div class="contract-detail-card">
                    <h6><i class="fas fa-calendar-times me-2"></i>Hari Penalti</h6>
                    <p>${contract.hariPenalti || 0} hari</p>
                </div>
            </div>
        </div>

        <!-- Dokumen Lampiran -->
        <div class="contract-section">
            <div class="section-header mb-3">
                <h6><i class="fas fa-paperclip me-2"></i>Dokumen Lampiran</h6>
            </div>
            <div class="contract-details-grid">
                <div class="contract-detail-card">
                    <h6><i class="fas fa-paperclip me-2"></i>Dokumen Lampiran</h6>
                    <p>${contract.dokumenLampiran || 'Tidak ada'}</p>
                </div>
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
                    <i class="fas fa-calendar-plus"></i>
                </div>
                <div class="timeline-content">
                    <h6>Tanggal Pengajuan</h6>
                    <p>${formatDate(contract.tglPengajuan)}</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="timeline-content">
                    <h6>Kontrak Dimulai</h6>
                    <p>${formatDate(contract.tglMulai || contract.startDate)}</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon">
                    <i class="fas fa-flag"></i>
                </div>
                <div class="timeline-content">
                    <h6>Kontrak Berakhir</h6>
                    <p>${formatDate(contract.tglSelesai || contract.endDate)}</p>
                </div>
            </div>
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
    if (!contract) {
        showError('Kontrak tidak ditemukan!');
        return;
    }
    
    // Check if contract can be edited (only draft status)
    if (contract.status !== 'draft') {
        showError('Kontrak hanya dapat diedit jika status masih DRAFT!');
        return;
    }
    
    // Fill edit form with existing data
    document.getElementById('editNamaProyek').value = contract.namaProyek || '';
    document.getElementById('editJenisKontrak').value = contract.jenisKontrak || '';
    document.getElementById('editTglMulai').value = contract.tglMulai || '';
    document.getElementById('editTglSelesai').value = contract.tglSelesai || '';
    document.getElementById('editNilaiKontrak').value = contract.nilaiKontrak || '';
    document.getElementById('editMataUang').value = contract.mataUang || '';
    document.getElementById('editAlamat').value = contract.alamat || '';
    
    // Parse phone number to extract country code and number
    if (contract.kontakResmi) {
        const phoneNumber = contract.kontakResmi;
        if (phoneNumber.startsWith('+')) {
            // Find where the country code ends (usually 2-4 digits)
            const match = phoneNumber.match(/^(\+\d{1,4})(.*)$/);
            if (match) {
                document.getElementById('editCountryCode').value = match[1];
                document.getElementById('editKontakResmi').value = match[2];
            } else {
                document.getElementById('editCountryCode').value = '+62';
                document.getElementById('editKontakResmi').value = phoneNumber;
            }
        } else {
            document.getElementById('editCountryCode').value = '+62';
            document.getElementById('editKontakResmi').value = phoneNumber;
        }
    } else {
        document.getElementById('editCountryCode').value = '+62';
        document.getElementById('editKontakResmi').value = '';
    }
    
    document.getElementById('editNamaPic').value = contract.namaPic || '';
    document.getElementById('editNpwp').value = contract.npwp || '';
    document.getElementById('editAsuransi').value = contract.asuransi ? '1' : '0';
    document.getElementById('editTerminPembayaran').value = contract.terminPembayaran || '';
    document.getElementById('editMetodePembayaran').value = contract.metodePembayaran || '';
    document.getElementById('editPpn').value = contract.ppn || '';
    document.getElementById('editPajakLainnya').value = contract.pajakLainnya || '';
    document.getElementById('editPenaltiTerlambat').value = contract.penaltiTerlambat || '';
    document.getElementById('editHariPenalti').value = contract.hariPenalti || '';
    // Note: File inputs cannot have their value set programmatically for security reasons
    // The dokumenLampiran field will show existing file names in a separate display area if needed
    
    // Update currency symbols for edit form
    initializeEditCurrencySymbols();
    
    // Store contract ID for update
    document.getElementById('editContractForm').setAttribute('data-edit-id', contractId);
    
    // Show edit contract modal
    const modal = new bootstrap.Modal(document.getElementById('editContractModal'));
    modal.show();
}

// Update contract
function updateContract() {
    const form = document.getElementById('editContractForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Get edit ID
    const editId = form.getAttribute('data-edit-id');
    if (!editId) {
        showError('ID kontrak tidak ditemukan!');
        return;
    }
    
    // Find contract to update
    const contractIndex = contracts.findIndex(c => c.id === parseInt(editId));
    if (contractIndex === -1) {
        showError('Kontrak tidak ditemukan!');
        return;
    }
    
    // Get form values
    const updatedContract = {
        namaProyek: document.getElementById('editNamaProyek').value,
        jenisKontrak: document.getElementById('editJenisKontrak').value,
        tglMulai: document.getElementById('editTglMulai').value,
        tglSelesai: document.getElementById('editTglSelesai').value,
        nilaiKontrak: parseFloat(document.getElementById('editNilaiKontrak').value),
        mataUang: document.getElementById('editMataUang').value,
        alamat: document.getElementById('editAlamat').value,
        kontakResmi: document.getElementById('editCountryCode').value + document.getElementById('editKontakResmi').value,
        namaPic: document.getElementById('editNamaPic').value,
        npwp: document.getElementById('editNpwp').value,
        asuransi: document.getElementById('editAsuransi').value === '1' ? 1 : 0,
        terminPembayaran: document.getElementById('editTerminPembayaran').value,
        metodePembayaran: document.getElementById('editMetodePembayaran').value,
        ppn: parseFloat(document.getElementById('editPpn').value),
        pajakLainnya: parseFloat(document.getElementById('editPajakLainnya').value) || 0,
        penaltiTerlambat: parseFloat(document.getElementById('editPenaltiTerlambat').value) || 0,
        hariPenalti: parseInt(document.getElementById('editHariPenalti').value) || 0,
        dokumenLampiran: document.getElementById('editDokumenLampiran').value,
        updatedAt: new Date().toISOString().split('T')[0]
    };
    
    // Update contract
    contracts[contractIndex] = { ...contracts[contractIndex], ...updatedContract };
    
    // Update UI
    applyFilters();
    updateContractStats();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editContractModal'));
    modal.hide();
    
    // Clear form
    form.reset();
    form.classList.remove('was-validated');
    form.removeAttribute('data-edit-id');
    
    showSuccess('Kontrak berhasil diperbarui!');
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
    
    // Update select all checkbox status
    const paginatedContracts = getPaginatedContracts();
    const selectAll = document.getElementById('selectAllContracts');
    const allSelected = paginatedContracts.every(contract => selectedContracts.has(contract.id));
    const someSelected = paginatedContracts.some(contract => selectedContracts.has(contract.id));
    
    if (allSelected) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
    } else if (someSelected) {
        selectAll.checked = false;
        selectAll.indeterminate = true;
    } else {
        selectAll.checked = false;
        selectAll.indeterminate = false;
    }
    
    updateBulkActions();
}

// Toggle select all contracts
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAllContracts');
    const checkboxes = document.querySelectorAll('.contract-checkbox');
    const paginatedContracts = getPaginatedContracts();
    
    if (selectAll.checked) {
        paginatedContracts.forEach(contract => {
            selectedContracts.add(contract.id);
        });
    } else {
        paginatedContracts.forEach(contract => {
            selectedContracts.delete(contract.id);
        });
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    // Reset indeterminate state
    selectAll.indeterminate = false;
    
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

// Barang Management Functions
let currentContractId = null;
let editingBarangId = null;
let contractBarangList = []; // For managing barang during contract creation

// View barang for a contract
function viewBarang(contractId) {
    currentContractId = contractId;
    const contract = contracts.find(c => c.id === contractId);
    
    if (!contract) {
        showError('Kontrak tidak ditemukan!');
        return;
    }
    
    // Set contract title
    document.getElementById('barangContractTitle').textContent = contract.namaProyek || contract.name || `Kontrak #${contractId}`;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('barangDetailsModal'));
    modal.show();
    
    // Load barang data
    loadBarangData(contractId);
}

// Load barang data for a contract
function loadBarangData(contractId) {
    const barangList = barangData.get(contractId) || [];
    const tbody = document.getElementById('barangTableBody');
    const totalCount = document.getElementById('barangTotalCount');
    const contract = contracts.find(c => c.id === contractId);
    const canEdit = contract && contract.status === 'draft';
    
    // Update total count
    totalCount.textContent = barangList.length;
    
    // Clear existing data
    tbody.innerHTML = '';
    
    if (barangList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4">
                    <i class="fas fa-box-open me-2"></i>
                    Belum ada barang untuk kontrak ini
                </td>
            </tr>
        `;
        return;
    }
    
    // Render barang data
    barangList.forEach((barang, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${barang.jenisBarang}</strong></td>
            <td>${barang.volume.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
            <td>${barang.berat.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
            <td>${barang.jumlahKontainer}</td>
            <td>${barang.ukuranKontainer} ft</td>
            <td><code>${barang.nomorKontainer}</code></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary ${!canEdit ? 'disabled' : ''}" 
                            onclick="${canEdit ? 'editBarang(' + barang.id + ')' : 'void(0)'}" 
                            title="${!canEdit ? 'Edit hanya tersedia untuk status DRAFT' : 'Edit'}"
                            ${!canEdit ? 'disabled' : ''}>
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger ${!canEdit ? 'disabled' : ''}" 
                            onclick="${canEdit ? 'deleteBarang(' + barang.id + ')' : 'void(0)'}" 
                            title="${!canEdit ? 'Hapus hanya tersedia untuk status DRAFT' : 'Hapus'}"
                            ${!canEdit ? 'disabled' : ''}>
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Show add barang modal
function showAddBarangModal() {
    const contract = contracts.find(c => c.id === currentContractId);
    
    // Check if contract can be edited (only draft status)
    if (!contract || contract.status !== 'draft') {
        showError('Barang hanya dapat ditambahkan jika status kontrak masih DRAFT!');
        return;
    }
    
    editingBarangId = null;
    document.getElementById('addBarangModalTitle').textContent = 'Tambah Barang Baru';
    clearBarangForm();
    
    const modal = new bootstrap.Modal(document.getElementById('addBarangModal'));
    modal.show();
}

// Edit barang
function editBarang(barangId) {
    const contract = contracts.find(c => c.id === currentContractId);
    
    // Check if contract can be edited (only draft status)
    if (!contract || contract.status !== 'draft') {
        showError('Barang hanya dapat diedit jika status kontrak masih DRAFT!');
        return;
    }
    
    const barangList = barangData.get(currentContractId) || [];
    const barang = barangList.find(b => b.id === barangId);
    
    if (!barang) {
        showError('Barang tidak ditemukan!');
        return;
    }
    
    editingBarangId = barangId;
    document.getElementById('addBarangModalTitle').textContent = 'Edit Barang';
    
    // Fill form with existing data
    document.getElementById('jenisBarang').value = barang.jenisBarang;
    document.getElementById('volume').value = barang.volume;
    document.getElementById('berat').value = barang.berat;
    document.getElementById('jumlahKontainer').value = barang.jumlahKontainer;
    document.getElementById('ukuranKontainer').value = barang.ukuranKontainer;
    document.getElementById('nomorKontainer').value = barang.nomorKontainer;
    
    const modal = new bootstrap.Modal(document.getElementById('addBarangModal'));
    modal.show();
}

// Save barang (add or edit)
function saveBarang() {
    const form = document.getElementById('addBarangForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const barangData = {
        jenisBarang: document.getElementById('jenisBarang').value,
        volume: parseFloat(document.getElementById('volume').value),
        berat: parseFloat(document.getElementById('berat').value),
        jumlahKontainer: parseInt(document.getElementById('jumlahKontainer').value),
        ukuranKontainer: parseInt(document.getElementById('ukuranKontainer').value),
        nomorKontainer: document.getElementById('nomorKontainer').value,
        updatedAt: new Date().toISOString()
    };
    
    // Check if we're in contract creation mode or contract editing mode
    if (currentContractId === null) {
        // Contract creation mode
        saveContractBarang();
        return;
    }
    
    // Contract editing mode
    if (editingBarangId) {
        // Edit existing barang
        const barangList = barangData.get(currentContractId) || [];
        const index = barangList.findIndex(b => b.id === editingBarangId);
        
        if (index !== -1) {
            barangList[index] = { ...barangList[index], ...barangData };
            barangData.set(currentContractId, barangList);
            showSuccess('Barang berhasil diperbarui!');
        }
    } else {
        // Add new barang
        const newId = Date.now(); // Simple ID generation
        const newBarang = {
            id: newId,
            ...barangData,
            createdAt: new Date().toISOString()
        };
        
        const barangList = barangData.get(currentContractId) || [];
        barangList.push(newBarang);
        barangData.set(currentContractId, barangList);
        showSuccess('Barang berhasil ditambahkan!');
    }
    
    // Close modal and refresh data
    const modal = bootstrap.Modal.getInstance(document.getElementById('addBarangModal'));
    modal.hide();
    
    loadBarangData(currentContractId);
}

// Delete barang
function deleteBarang(barangId) {
    const contract = contracts.find(c => c.id === currentContractId);
    
    // Check if contract can be edited (only draft status)
    if (!contract || contract.status !== 'draft') {
        showError('Barang hanya dapat dihapus jika status kontrak masih DRAFT!');
        return;
    }
    
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        const barangList = barangData.get(currentContractId) || [];
        const filteredList = barangList.filter(b => b.id !== barangId);
        
        barangData.set(currentContractId, filteredList);
        loadBarangData(currentContractId);
        showSuccess('Barang berhasil dihapus!');
    }
}

// Clear barang form
function clearBarangForm() {
    document.getElementById('addBarangForm').reset();
    document.getElementById('addBarangForm').classList.remove('was-validated');
}

// Contract Creation Barang Management
function addBarangToContract() {
    // Show add barang modal for contract creation
    editingBarangId = null;
    document.getElementById('addBarangModalTitle').textContent = 'Tambah Barang ke Kontrak';
    clearBarangForm();
    
    const modal = new bootstrap.Modal(document.getElementById('addBarangModal'));
    modal.show();
}

function saveContractBarang() {
    const form = document.getElementById('addBarangForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    const barangData = {
        jenisBarang: document.getElementById('jenisBarang').value,
        volume: parseFloat(document.getElementById('volume').value),
        berat: parseFloat(document.getElementById('berat').value),
        jumlahKontainer: parseInt(document.getElementById('jumlahKontainer').value),
        ukuranKontainer: parseInt(document.getElementById('ukuranKontainer').value),
        nomorKontainer: document.getElementById('nomorKontainer').value,
        updatedAt: new Date().toISOString()
    };
    
    if (editingBarangId) {
        // Edit existing barang
        const index = contractBarangList.findIndex(b => b.id === editingBarangId);
        if (index !== -1) {
            contractBarangList[index] = { ...contractBarangList[index], ...barangData };
            showSuccess('Barang berhasil diperbarui!');
        }
    } else {
        // Add new barang
        const newId = Date.now();
        const newBarang = {
            id: newId,
            ...barangData,
            createdAt: new Date().toISOString()
        };
        
        contractBarangList.push(newBarang);
        showSuccess('Barang berhasil ditambahkan!');
    }
    
    // Close modal and refresh data
    const modal = bootstrap.Modal.getInstance(document.getElementById('addBarangModal'));
    modal.hide();
    
    loadContractBarangData();
}

function editContractBarang(barangId) {
    const barang = contractBarangList.find(b => b.id === barangId);
    
    if (!barang) {
        showError('Barang tidak ditemukan!');
        return;
    }
    
    editingBarangId = barangId;
    document.getElementById('addBarangModalTitle').textContent = 'Edit Barang Kontrak';
    
    // Fill form with existing data
    document.getElementById('jenisBarang').value = barang.jenisBarang;
    document.getElementById('volume').value = barang.volume;
    document.getElementById('berat').value = barang.berat;
    document.getElementById('jumlahKontainer').value = barang.jumlahKontainer;
    document.getElementById('ukuranKontainer').value = barang.ukuranKontainer;
    document.getElementById('nomorKontainer').value = barang.nomorKontainer;
    
    const modal = new bootstrap.Modal(document.getElementById('addBarangModal'));
    modal.show();
}

function deleteContractBarang(barangId) {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        contractBarangList = contractBarangList.filter(b => b.id !== barangId);
        loadContractBarangData();
        showSuccess('Barang berhasil dihapus!');
    }
}

function loadContractBarangData() {
    const tbody = document.getElementById('contractBarangTableBody');
    const totalCount = document.getElementById('contractBarangCount');
    
    // Update total count
    totalCount.textContent = contractBarangList.length;
    
    // Clear existing data
    tbody.innerHTML = '';
    
    if (contractBarangList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-3">
                    <i class="fas fa-box-open me-2"></i>
                    Belum ada barang untuk kontrak ini
                </td>
            </tr>
        `;
        return;
    }
    
    // Render barang data
    contractBarangList.forEach((barang, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${barang.jenisBarang}</strong></td>
            <td>${barang.volume.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
            <td>${barang.berat.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
            <td>${barang.jumlahKontainer}</td>
            <td>${barang.ukuranKontainer} ft</td>
            <td><code>${barang.nomorKontainer}</code></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editContractBarang(${barang.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteContractBarang(${barang.id})" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
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

function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
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
    
    // Initialize edit form phone validation
    initializeEditPhoneValidation();
});

// Initialize phone validation for edit form
function initializeEditPhoneValidation() {
    const phoneInput = document.getElementById('editKontakResmi');
    
    if (phoneInput) {
        // Prevent non-numeric input except allowed characters
        phoneInput.addEventListener('keypress', function(e) {
            const allowedChars = /[0-9\s\-\(\)]/;
            if (!allowedChars.test(e.key)) {
                e.preventDefault();
            }
        });
        
        // Clean input on paste
        phoneInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                let value = e.target.value;
                value = value.replace(/[^0-9\s\-\(\)]/g, '');
                e.target.value = value;
            }, 0);
        });
        
        // Clean input on input event
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            value = value.replace(/[^0-9\s\-\(\)]/g, '');
            e.target.value = value;
        });
    }
}

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
// Initialize currency symbols for edit form
function initializeEditCurrencySymbols() {
    const mataUangSelect = document.getElementById('editMataUang');
    const currencySymbol = document.getElementById('editCurrencySymbol');
    const pajakCurrencySymbol = document.getElementById('editPajakCurrencySymbol');
    const penaltiCurrencySymbol = document.getElementById('editPenaltiCurrencySymbol');
    
    // Currency symbol mapping
    const currencyMap = {
        'IDR': 'Rp',
        'USD': '$',
        'EUR': '€',
        'SGD': 'S$'
    };
    
    // Function to update currency symbols
    function updateEditCurrencySymbols() {
        const selectedCurrency = mataUangSelect.value;
        const symbol = currencyMap[selectedCurrency] || 'Rp';
        
        if (currencySymbol) currencySymbol.textContent = symbol;
        if (pajakCurrencySymbol) pajakCurrencySymbol.textContent = symbol;
        if (penaltiCurrencySymbol) penaltiCurrencySymbol.textContent = symbol;
    }
    
    // Add event listener for currency change
    if (mataUangSelect) {
        mataUangSelect.addEventListener('change', updateEditCurrencySymbols);
        
        // Set initial currency symbol
        updateEditCurrencySymbols();
    }
}

