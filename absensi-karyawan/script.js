// Data untuk menyimpan informasi karyawan dan absensi
let karyawan = JSON.parse(localStorage.getItem('karyawan')) || [];
let absensi = JSON.parse(localStorage.getItem('absensi')) || [];

// Fungsi untuk menampilkan halaman tertentu
function showPage(pageName) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Tampilkan halaman yang dipilih
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Muat data sesuai halaman
    switch(pageName) {
        case 'dashboard':
            tampilkanDashboard();
            break;
        case 'absensi':
            tampilkanAbsensi();
            break;
        case 'karyawan':
            tampilkanKaryawan();
            break;
        case 'laporan':
            // Tidak perlu tindakan khusus untuk laporan
            break;
    }
}

// Fungsi untuk menyimpan data ke localStorage
function simpanKeStorage() {
    localStorage.setItem('karyawan', JSON.stringify(karyawan));
    localStorage.setItem('absensi', JSON.stringify(absensi));
}

// Fungsi untuk halaman dashboard
function tampilkanDashboard() {
    document.getElementById('total-karyawan').textContent = karyawan.length;
    
    // Hitung jumlah karyawan yang hadir hari ini
    const today = new Date().toISOString().split('T')[0];
    const hadirHariIni = absensi.filter(item => 
        item.tanggal === today && item.status === 'hadir'
    ).length;
    
    const izinHariIni = absensi.filter(item => 
        item.tanggal === today && item.status === 'izin'
    ).length;
    
    const tidakHadir = karyawan.length - hadirHariIni - izinHariIni;
    
    document.getElementById('hadir-hari-ini').textContent = hadirHariIni;
    document.getElementById('izin-hari-ini').textContent = izinHariIni;
    document.getElementById('tidak-hadir').textContent = tidakHadir;
}

// Fungsi untuk menyimpan absensi
function simpanAbsensi() {
    const nip = document.getElementById('nip').value;
    const status = document.getElementById('status-absensi').value;
    
    if (!nip) {
        alert('Silakan masukkan NIP karyawan!');
        return;
    }
    
    // Cari karyawan berdasarkan NIP
    const karyawanFound = karyawan.find(k => k.nip === nip);
    
    if (!karyawanFound) {
        alert('Karyawan dengan NIP tersebut tidak ditemukan!');
        return;
    }
    
    // Tambahkan data absensi
    const tanggal = new Date().toISOString().split('T')[0];
    const waktu = new Date().toLocaleTimeString();
    
    const absensiBaru = {
        nip: nip,
        nama: karyawanFound.nama,
        status: status,
        tanggal: tanggal,
        waktu: waktu
    };
    
    absensi.push(absensiBaru);
    simpanKeStorage();
    
    // Kosongkan form
    document.getElementById('nip').value = '';
    
    // Tampilkan data absensi terbaru
    tampilkanAbsensi();
    
    alert('Absensi berhasil disimpan!');
}

// Fungsi untuk menampilkan data absensi
function tampilkanAbsensi() {
    const tbody = document.getElementById('isi-tabel-absensi');
    tbody.innerHTML = '';
    
    const today = new Date().toISOString().split('T')[0];
    const absensiHariIni = absensi.filter(item => item.tanggal === today);
    
    absensiHariIni.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nip}</td>
            <td>${item.nama}</td>
            <td>${item.status}</td>
            <td>${item.waktu}</td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi untuk menyimpan data karyawan
function simpanKaryawan() {
    const nip = document.getElementById('nip-karyawan').value;
    const nama = document.getElementById('nama-karyawan').value;
    const jabatan = document.getElementById('jabatan').value;
    const departemen = document.getElementById('departemen').value;
    
    if (!nip || !nama || !jabatan || !departemen) {
        alert('Silakan lengkapi semua data karyawan!');
        return;
    }
    
    // Cek apakah NIP sudah ada
    const karyawanExists = karyawan.find(k => k.nip === nip);
    
    if (karyawanExists) {
        alert('NIP sudah terdaftar!');
        return;
    }
    
    // Tambahkan data karyawan baru
    const karyawanBaru = {
        nip: nip,
        nama: nama,
        jabatan: jabatan,
        departemen: departemen
    };
    
    karyawan.push(karyawanBaru);
    simpanKeStorage();
    
    // Kosongkan form
    document.getElementById('nip-karyawan').value = '';
    document.getElementById('nama-karyawan').value = '';
    document.getElementById('jabatan').value = '';
    document.getElementById('departemen').value = '';
    
    // Tampilkan data karyawan terbaru
    tampilkanKaryawan();
    
    alert('Data karyawan berhasil disimpan!');
}

// Fungsi untuk menampilkan data karyawan
function tampilkanKaryawan() {
    const tbody = document.getElementById('isi-tabel-karyawan');
    tbody.innerHTML = '';
    
    karyawan.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nip}</td>
            <td>${item.nama}</td>
            <td>${item.jabatan}</td>
            <td>${item.departemen}</td>
            <td>
                <button class="edit-btn" onclick="editKaryawan(${index})">Edit</button>
                <button class="delete-btn" onclick="hapusKaryawan(${index})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi untuk mengedit data karyawan
function editKaryawan(index) {
    const karyawanEdit = karyawan[index];
    
    document.getElementById('nip-karyawan').value = karyawanEdit.nip;
    document.getElementById('nama-karyawan').value = karyawanEdit.nama;
    document.getElementById('jabatan').value = karyawanEdit.jabatan;
    document.getElementById('departemen').value = karyawanEdit.departemen;
    
    // Hapus karyawan lama
    karyawan.splice(index, 1);
    simpanKeStorage();
    
    tampilkanKaryawan();
}

// Fungsi untuk menghapus data karyawan
function hapusKaryawan(index) {
    if (confirm('Apakah Anda yakin ingin menghapus data karyawan ini?')) {
        karyawan.splice(index, 1);
        simpanKeStorage();
        tampilkanKaryawan();
    }
}

// Fungsi untuk menampilkan laporan
function tampilkanLaporan() {
    const tanggal = document.getElementById('tanggal-laporan').value;
    
    if (!tanggal) {
        alert('Silakan pilih tanggal untuk laporan!');
        return;
    }
    
    const tbody = document.getElementById('isi-tabel-laporan');
    tbody.innerHTML = '';
    
    const absensiTanggal = absensi.filter(item => item.tanggal === tanggal);
    
    if (absensiTanggal.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4">Tidak ada data absensi untuk tanggal ${tanggal}</td>`;
        tbody.appendChild(row);
        return;
    }
    
    absensiTanggal.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nip}</td>
            <td>${item.nama}</td>
            <td>${item.status}</td>
            <td>${item.waktu}</td>
        `;
        tbody.appendChild(row);
    });
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan halaman dashboard sebagai default
    showPage('dashboard');
    
    // Set tanggal default untuk laporan ke hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal-laporan').value = today;
});