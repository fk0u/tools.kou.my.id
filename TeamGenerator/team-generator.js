let namaArray = [];
let jumlahKelompok = 1;

document.getElementById('fileInput').addEventListener('change', importData);

function importData() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = e.target.result;

            // Menggunakan fungsi parseXLSXData untuk mengambil data dari kolom "nama"
            const parsedData = parseXLSXData(data);

            // Tampilkan data yang diimpor di dalam textarea
            const textarea = document.getElementById('nama');
            textarea.value = parsedData.nama.join(', ');
        };

        reader.readAsBinaryString(file);
    }

    // Bersihkan nilai input agar pengguna dapat memilih file yang sama lagi
    fileInput.value = '';
}

function parseXLSXData(data) {
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0]; // Anda dapat mengganti indeks sesuai dengan sheet yang ingin Anda impor
    const sheet = workbook.Sheets[sheetName];

    // Menggunakan objek untuk menyimpan data dari kolom "nama"
    const parsedData = {
        nama: [],
    };

    // Lakukan iterasi melalui sel-sel pada kolom "nama"
    for (const cell in sheet) {
        if (cell.startsWith('A') && sheet[cell].v) {
            parsedData.nama.push(sheet[cell].v);
        }
    }

    return parsedData;
}

function generateKelompok() {
    namaArray = [];
    const namaInput = document.getElementById("nama").value;
    jumlahKelompok = parseInt(document.getElementById("jumlah-kelompok").value);

    namaArray = namaInput.split(/[,|\n]/).map(nama => nama.trim()).filter(nama => nama !== "");

    // Acak urutan nama-nama
    for (let i = namaArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [namaArray[i], namaArray[j]] = [namaArray[j], namaArray[i]];
    }

    tampilkanKelompok();
}

function generateUlang() {
    if (namaArray.length === 0) {
        alert("Silakan isi nama-nama dan generate kelompok terlebih dahulu.");
        return;
    }

    // Acak ulang urutan nama-nama
    for (let i = namaArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [namaArray[i], namaArray[j]] = [namaArray[j], namaArray[i]];
    }

    tampilkanKelompok();
}

function tampilkanKelompok() {
    const kelompok = [];

    for (let i = 0; i < jumlahKelompok; i++) {
        kelompok[i] = [];
    }

    for (let i = 0; i < namaArray.length; i++) {
        kelompok[i % jumlahKelompok].push(namaArray[i]);
    }

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    for (let i = 0; i < kelompok.length; i++) {
        const kelompokDiv = document.createElement("div");
        kelompokDiv.classList.add('kelompok-box');
        kelompokDiv.innerHTML = `<strong>Kelompok ${i + 1}:</strong><br>${kelompok[i].join('<br>')}`;
        outputDiv.appendChild(kelompokDiv);
    }
}

function goBack() {
    window.history.back();
}
