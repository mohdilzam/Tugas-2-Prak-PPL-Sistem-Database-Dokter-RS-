const fs = require('fs');
const readline = require('readline');

// Membuat interface untuk interaksi dengan terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path ke file database JSON
const dbPath = './doctors.json';