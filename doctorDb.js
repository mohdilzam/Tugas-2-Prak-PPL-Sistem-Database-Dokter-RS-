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
