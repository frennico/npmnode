// const validator = require('validator');
// // const cekemail = validator.isEmail('frenniconico@gmail.com');
// const cektelp = validator.isMobilePhone('081250312522','id-ID');
// console.log(cektelp);

const validator = require('validator'); // Third-party module
const readline = require('readline');   // Core module

// Membuat interface untuk input user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Meminta input email dari user
rl.question('Masukkan email Anda: ', (email) => {
    if (validator.isEmail(email)) {
        console.log('✅ Email valid!');
    } else {
        console.log('❌ Email tidak valid!');
    }

    // Meminta input nomor telepon dari user
    rl.question('Masukkan nomor telepon Anda: ', (telp) => {
        if (validator.isMobilePhone(telp, 'id-ID')) {
            console.log('✅ Nomor telepon valid!');
        } else {
            console.log('❌ Nomor telepon tidak valid!');
        }

        rl.close(); // Menutup input
    });
});
