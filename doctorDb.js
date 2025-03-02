const fs = require('fs');
const readline = require('readline');

// Membuat interface untuk interaksi dengan terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path ke file database JSON
const dbPath = './doctors.json';

// Fungsi untuk memastikan file database ada
function initializeDatabase() {
  try {
    // Periksa apakah file database sudah ada
    if (!fs.existsSync(dbPath)) {
      // Jika tidak ada, buat file dengan array kosong
      fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
      console.log('Database baru telah dibuat!');
    }
  } catch (error) {
    console.error('Error saat menginisialisasi database:', error);
    process.exit(1);
  }
}

// Fungsi untuk membaca data dari database
function readDatabase() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error saat membaca database:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data ke database
function saveDatabase(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saat menyimpan ke database:', error);
    return false;
  }
}

// Fungsi untuk menampilkan semua dokter
function displayAllDoctors() {
  const doctors = readDatabase();
  
  if (doctors.length === 0) {
    console.log('\nBelum ada dokter yang terdaftar di database.');
  } else {
    console.log('\n===== DAFTAR DOKTER =====');
    doctors.forEach((doctor, index) => {
      console.log(`\n#${index + 1}`);
      console.log(`Nama: ${doctor.name}`);
      console.log(`Spesialisasi: ${doctor.specialization}`);
      console.log(`Nomor Lisensi: ${doctor.licenseNumber}`);
      console.log(`Jam Praktek: ${doctor.practiceHours}`);
      console.log('-------------------------');
    });
  }
  
  showMainMenu();
}

// Fungsi untuk mencari dan menampilkan dokter tertentu
function searchDoctor() {
  const doctors = readDatabase();
  
  if (doctors.length === 0) {
    console.log('\nBelum ada dokter yang terdaftar di database.');
    showMainMenu();
    return;
  }
  
  console.log('\n===== CARI DOKTER =====');
  console.log('Pilih kriteria pencarian:');
  console.log('1. Berdasarkan nama');
  console.log('2. Berdasarkan spesialisasi');
  console.log('3. Berdasarkan nomor lisensi');
  console.log('0. Kembali ke menu utama');
  
  rl.question('Masukkan pilihan: ', (choice) => {
    if (choice === '0') {
      showMainMenu();
      return;
    }
    
    let searchField;
    let searchPrompt;
    
    switch (choice) {
      case '1':
        searchField = 'name';
        searchPrompt = 'Masukkan nama dokter yang dicari: ';
        break;
      case '2':
        searchField = 'specialization';
        searchPrompt = 'Masukkan spesialisasi dokter yang dicari: ';
        break;
      case '3':
        searchField = 'licenseNumber';
        searchPrompt = 'Masukkan nomor lisensi dokter yang dicari: ';
        break;
      default:
        console.log('\nPilihan tidak valid!');
        searchDoctor();
        return;
    }
    
    rl.question(searchPrompt, (searchTerm) => {
      // Lakukan pencarian (case insensitive)
      const results = doctors.filter(doctor => 
        doctor[searchField].toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (results.length === 0) {
        console.log(`\nTidak ditemukan dokter dengan ${searchField} yang mengandung "${searchTerm}".`);
      } else {
        console.log(`\nDitemukan ${results.length} dokter:`);
        results.forEach((doctor, index) => {
          console.log(`\n#${index + 1}`);
          console.log(`Nama: ${doctor.name}`);
          console.log(`Spesialisasi: ${doctor.specialization}`);
          console.log(`Nomor Lisensi: ${doctor.licenseNumber}`);
          console.log(`Jam Praktek: ${doctor.practiceHours}`);
          console.log('-------------------------');
        });
      }
      
      showMainMenu();
    });
  });
}

// Fungsi untuk menambahkan dokter baru
function addNewDoctor() {
  rl.question('\nNama dokter: ', (name) => {
    rl.question('Spesialisasi: ', (specialization) => {
      rl.question('Nomor Lisensi: ', (licenseNumber) => {
        rl.question('Jam Praktek: ', (practiceHours) => {
          const doctors = readDatabase();


// Membuat objek dokter baru
const newDoctor = {
  name,
  specialization,
  licenseNumber,
  practiceHours
};

// Menambahkan ke array dan menyimpan
doctors.push(newDoctor);
          
if (saveDatabase(doctors)) {
  console.log('\nDokter baru berhasil ditambahkan!');
} else {
  console.log('\nGagal menambahkan dokter baru.');
}

showMainMenu();
});
});
});
});
}