# 📋 Prosedur Transaksi Payment - Sistem Minerva

## 🔄 **Alur Transaksi Payment**

### **1. Pembuatan Bill (E-Billing)**
```
Kontrak → Generate Bill → Bill Status: Pending
```

**Langkah-langkah:**
1. Buka halaman **E-Billing**
2. Klik tombol **"Generate Bill"**
3. Pilih kontrak dari dropdown
4. Set tanggal jatuh tempo
5. Tambahkan item-item bill (deskripsi, qty, harga)
6. Klik **"Generate Bill"**
7. Bill otomatis dibuat dengan status **"Pending"**

### **2. Proses Payment (E-Payment)**
```
Bill Pending → Pilih Payment Method → Proses Payment → Status Update
```

**Langkah-langkah:**
1. Buka halaman **E-Payment** atau klik tombol **"Make Payment"** di bill
2. Pilih metode pembayaran:
   - **Bank Transfer** (Fee: Rp 0, Processing: 1-2 hari)
   - **Credit Card** (Fee: Rp 2,500, Processing: Instan)
   - **Debit Card** (Fee: Rp 1,500, Processing: Instan)
   - **E-Wallet** (Fee: Rp 1,000, Processing: Instan)
   - **Virtual Account** (Fee: Rp 0, Processing: Instan)
3. Isi informasi client (nama, email, phone)
4. Klik **"Process Payment"**
5. Sistem akan memproses payment secara otomatis

### **3. Status Payment**
```
Processing → Completed/Failed/Cancelled
```

**Status Payment:**
- **Processing**: Payment sedang diproses
- **Completed**: Payment berhasil
- **Failed**: Payment gagal (dana tidak cukup, dll)
- **Cancelled**: Payment dibatalkan

## 💳 **Metode Pembayaran**

| Metode | Fee | Processing Time | Deskripsi |
|--------|-----|-----------------|-----------|
| Bank Transfer | Rp 0 | 1-2 hari kerja | Transfer melalui bank |
| Credit Card | Rp 2,500 | Instan | Pembayaran dengan kartu kredit |
| Debit Card | Rp 1,500 | Instan | Pembayaran dengan kartu debit |
| E-Wallet | Rp 1,000 | Instan | Pembayaran melalui e-wallet |
| Virtual Account | Rp 0 | Instan | Pembayaran melalui virtual account |

## 📊 **Dashboard Features**

### **E-Billing Dashboard**
- **Total Bills**: Jumlah total bill
- **Pending Bills**: Bill yang belum dibayar
- **Overdue Bills**: Bill yang sudah lewat jatuh tempo
- **Total Outstanding**: Total nominal yang belum dibayar

### **E-Payment Dashboard**
- **Total Payments**: Jumlah total payment
- **Completed**: Payment yang berhasil
- **Processing**: Payment yang sedang diproses
- **Total Amount**: Total nominal yang sudah dibayar

## 🔧 **Fitur Tambahan**

### **Bill Management**
- **View Details**: Lihat detail lengkap bill
- **Make Payment**: Langsung ke halaman payment
- **Download PDF**: Download bill dalam format PDF

### **Payment Management**
- **View Details**: Lihat detail lengkap payment
- **Download Receipt**: Download receipt pembayaran
- **Payment History**: Riwayat semua transaksi

## 🚨 **Status Bill**

- **Pending**: Bill baru dibuat, menunggu pembayaran
- **Paid**: Bill sudah dibayar
- **Overdue**: Bill sudah lewat jatuh tempo

## 📱 **Notifikasi**

Sistem akan mengirim notifikasi untuk:
- Payment berhasil diproses
- Payment gagal
- Bill sudah jatuh tempo
- Konfirmasi email otomatis

## 🔐 **Keamanan**

- **SSL Encrypted**: Semua transaksi dienkripsi
- **PCI Compliant**: Mematuhi standar keamanan PCI DSS
- **2FA Enabled**: Two-factor authentication aktif

## 📈 **Laporan**

- Riwayat pembayaran lengkap
- Statistik pembayaran per metode
- Laporan bill per status
- Export data ke PDF/Excel

---

## 🎯 **Contoh Skenario Lengkap**

### **Skenario 1: Payment Berhasil**
1. Admin buat bill untuk kontrak "Pengiriman Logistik Jakarta"
2. Bill muncul dengan status "Pending"
3. Client buka E-Payment, pilih "Credit Card"
4. Isi data client, klik "Process Payment"
5. Payment status: "Processing" → "Completed"
6. Bill status otomatis berubah ke "Paid"
7. Client terima email konfirmasi

### **Skenario 2: Payment Gagal**
1. Client pilih "Bank Transfer"
2. Klik "Process Payment"
3. Payment status: "Processing" → "Failed"
4. Alasan: "Insufficient funds"
5. Bill tetap status "Pending"
6. Client bisa coba payment lagi

### **Skenario 3: Bill Overdue**
1. Bill sudah lewat jatuh tempo
2. Status berubah ke "Overdue"
3. Bill ditampilkan dengan warna merah
4. Admin bisa kirim reminder ke client
