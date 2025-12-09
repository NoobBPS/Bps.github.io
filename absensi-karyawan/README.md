# Sistem Informasi Absensi Karyawan

Aplikasi ini merupakan sistem informasi sederhana untuk mengelola absensi karyawan di perusahaan. Aplikasi ini dibuat menggunakan HTML, CSS, dan JavaScript murni tanpa memerlukan server backend.

## Fitur Utama

1. **Dashboard** - Menampilkan statistik absensi karyawan secara real-time
2. **Absensi** - Fitur untuk mencatat kehadiran karyawan
3. **Data Karyawan** - Fitur untuk mengelola data karyawan
4. **Laporan** - Fitur untuk melihat laporan absensi harian

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript ES6
- LocalStorage (untuk menyimpan data secara lokal di browser)

## Cara Menggunakan

1. Buka file `index.html` di browser Anda
2. Gunakan menu navigasi untuk berpindah antar halaman
3. Tambahkan data karyawan terlebih dahulu sebelum mencatat absensi
4. Gunakan form absensi untuk mencatat kehadiran karyawan

## Fitur Lengkap

- **Manajemen Karyawan**: Tambah, edit, dan hapus data karyawan
- **Pencatatan Absensi**: Pilih status kehadiran (hadir, izin, sakit, alpha)
- **Statistik Harian**: Tampilkan jumlah karyawan hadir, izin, dan tidak hadir
- **Laporan Harian**: Tampilkan laporan absensi berdasarkan tanggal tertentu
- **Penyimpanan Data**: Semua data disimpan di localStorage browser

## Struktur File

```
absensi-karyawan/
│
├── index.html          # Halaman utama aplikasi
├── style.css           # File stylesheet untuk tampilan
├── script.js           # File JavaScript untuk logika aplikasi
└── README.md           # Dokumentasi aplikasi
```

## Catatan

- Data disimpan secara lokal di browser menggunakan localStorage
- Data akan hilang jika cache browser dihapus
- Aplikasi ini cocok untuk penggunaan sederhana dan pengembangan lanjutan