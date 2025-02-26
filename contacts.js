const fs = require('fs');
const readline = require('node:readline');
const validator = require('validator');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

// Membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tanya = (pertanyaan, validasi) => {
    return new Promise((resolve) => {
        const tanyaUlang = () => {
            rl.question(pertanyaan, (jawaban) => {
                if (validasi(jawaban)) {
                    resolve(jawaban);
                } else {
                    console.log('Terdapat data yang tidak valid. Silakan coba lagi.');
                    tanyaUlang();
                }
            });
        };
        tanyaUlang();
    });
};

const main = async () => {
    const nama = await tanya('Masukkan nama anda: ', (input) => input.trim() !== '');
    const nohp = await tanya('Masukkan no HP anda: ', (input) => validator.isMobilePhone(input, 'id-ID'));
    const alamat = await tanya('Masukkan alamat anda: ', (input) => input.trim() !== '');
    const email = await tanya('Masukkan email anda: ', (input) => validator.isEmail(input));

    const kontak = { nama, nohp, alamat, email };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const kontaks = JSON.parse(file);
    kontaks.push(kontak);
    fs.writeFileSync('data/contacts.json', JSON.stringify(kontaks, null, 2));

    console.log(`Data berhasil disimpan. Terima kasih sudah mengisi data.`);
    rl.close();
};

main();