# Jurnal Vibecoding & Rekayasa Perangkat Lunak

**Nama:** [IBRAHIM IBNU ABBAS]

**Kelas:** [11]

**Nama Proyek:** Aplikasi Penghitung Hafalan

**Link Vercel:** [Tautan Live Vercel]

---

## 🏗️ 1. Definisi Stack & Arsitektur

*Jelaskan perencanaan tingkat tinggi (high-level planning) dari aplikasimu sebelum mulai menulis kode. Seorang arsitek perangkat lunak harus tahu alat apa yang dipakai dan di mana meletakkannya.*

- **Lingkungan Pengembangan:** ReactJS dengan Vite
- **Routing:** Tidak digunakan — aplikasi bersifat single page
- **Styling:** CSS Modules (`.module.css`) — setiap komponen memiliki file CSS tersendiri, termasuk `App.module.css` di level atas
- **Manajemen State:** `useState`, `useEffect`, dan `useMemo` (React Hooks) — ditambah custom hook `useLocalStorage` untuk persistensi data
- **Data:** Data awal (`dataAwal`) didefinisikan lokal di `App.jsx` sebagai nilai default, kemudian dikelola sepenuhnya lewat state dan disimpan di `localStorage`
- **AI Code Editor / LLM Assistant:** Tidak menggunakan AI — seluruh kode ditulis secara mandiri

---

**Alasan Pemisahan Komponen:**

*Tuliskan alasan logismu mengapa kamu membagi komponen seperti Header, Footer, atau Card. Bagaimana struktur folder `src/components` milikmu?*

> Saya memisahkan aplikasi menjadi beberapa komponen dengan pertimbangan berikut:
>
> **Navbar.jsx** — Dipisah karena hanya bertanggung jawab atas satu hal: menampilkan judul aplikasi dan menyediakan tombol toggle dark mode. Komponen ini menerima `isDarkMode` dan `onToggleDarkMode` sebagai props dari `App.jsx`.
>
> **StatistikRingkasan.jsx** — Dipisah karena tugasnya murni presentasional — menampilkan ringkasan total hafalan, jumlah selesai, dan jumlah sedang berjalan. Komponen ini menerima `daftarHafalan` (array lengkap, bukan yang sudah difilter) agar statistik selalu menggambarkan keseluruhan data.
>
> **FormTambahHafalan.jsx** — Dipisah karena memiliki state inputan lokal tersendiri (nama dan total hafalan). Saat form disubmit, komponen ini memanggil fungsi `onTambah` yang diterima dari `App.jsx` — sehingga `App.jsx` tidak perlu tahu detail tentang pengelolaan form input.
>
> **FilterBar.jsx** — Dipisah karena logika tampilan filter (Semua / Sedang Berjalan / Selesai) sepenuhnya independen dari logika hafalan. Komponen ini menerima nilai filter aktif, fungsi `onFilterChange`, dan `counts` (jumlah item per kategori) sebagai props.
>
> **DaftarHafalan.jsx** — Dipisah sebagai wrapper yang menerima array hafalan yang sudah difilter dan merender setiap item. Komponen ini juga meneruskan seluruh handler (update, selesai, batal, hapus, reset) ke komponen anak.

**Struktur folder `src/components`:**

```
src/
├── hooks/
│   └── useLocalStorage.js         ← Custom hook untuk persistensi localStorage
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx             ← Judul + toggle dark mode
│   │   └── Navbar.module.css
│   ├── StatistikRingkasan/
│   │   ├── StatistikRingkasan.jsx ← Ringkasan total, selesai, proses
│   │   └── StatistikRingkasan.module.css
│   ├── FormTambahHafalan/
│   │   ├── FormTambahHafalan.jsx  ← Form input hafalan baru
│   │   └── FormTambahHafalan.module.css
│   ├── FilterBar/
│   │   ├── FilterBar.jsx          ← Tombol filter + jumlah per kategori
│   │   └── FilterBar.module.css
│   └── DaftarHafalan/
│       ├── DaftarHafalan.jsx      ← Wrapper daftar + meneruskan handler
│       └── DaftarHafalan.module.css
├── App.jsx                        ← State utama + semua handler
├── App.module.css
└── main.jsx
```

---

## 🗣️ 2. Strategi Prompting

*Vibecoding membutuhkan kemampuan komunikasi yang jelas dengan AI. Tuliskan 1 atau 2 prompt andalan yang kamu gunakan untuk membangun fitur kompleks.*

> Pada proyek ini saya **tidak menggunakan AI** dalam proses penulisan kode. Seluruh kode ditulis secara mandiri.

**Pendekatan yang digunakan sebagai pengganti AI:**

> Sebelum mulai menulis kode, saya memetakan seluruh kebutuhan aplikasi dalam bentuk pseudocode. Dua bagian yang paling saya pikirkan matang-matang adalah **alur data** dan **daftar handler** yang harus ada di `App.jsx`.
>
> Pseudocode yang saya tulis sebelum mulai:
>
> ```
> STATE di App.jsx:
> - daftarHafalan  → array of objects, simpan ke localStorage via custom hook
> - filter         → string: 'semua' | 'proses' | 'selesai'
> - isDarkMode     → boolean, simpan ke localStorage via custom hook
>
> HANDLER yang dibutuhkan:
> - tambahHafalan(nama, total)
>     → buat object baru dengan id unik (Date.now())
>     → tambahkan ke array dengan spread operator
>
> - updateProgress(id, jumlah)
>     → cari item dengan id yang cocok
>     → validasi jumlah: tidak boleh < 0 atau > total
>     → hitung status otomatis: belum / proses / selesai
>     → update tanggalSelesai jika 100%
>
> - selesaikanHafalan(id)  → set selesai = total, status = 'selesai'
> - batalkanSelesai(id)    → set selesai = 0, status = 'belum'
> - hapusHafalan(id)       → filter array, buang item dengan id tsb
> - resetHafalan(id)       → set selesai = 0, status = 'belum'
> - toggleDarkMode()       → balik nilai isDarkMode
>
> COMPUTED (useMemo):
> - daftarHafalanTersaring → filter array berdasarkan state filter
> - filterCounts           → hitung jumlah item per kategori filter
>
> EFEK SAMPING (useEffect):
> - Setiap isDarkMode berubah → tambah/hapus class 'dark' di document.documentElement
> ```
>
> Dengan peta ini, saya tahu persis apa yang harus ditulis sebelum membuka code editor.

**Hasil Evaluasi Pendekatan:**

> Menulis pseudocode detail sebelum coding terbukti sangat efektif untuk proyek sekompleks ini. Karena ada banyak handler dan dua jenis data yang perlu disimpan ke `localStorage`, tanpa perencanaan yang matang saya pasti akan kebingungan di tengah jalan.
>
> Yang paling membantu adalah memutuskan di awal bahwa **semua state dan handler tinggal di `App.jsx`**, kemudian diteruskan ke komponen anak sebagai props. Keputusan arsitektur ini membuat alur data menjadi konsisten dan mudah ditelusuri ketika ada bug.

---

## 🐛 3. Log Problem Solving

*Programmer sejati belajar dari error warna merah. Ceritakan minimal 1 masalah/bug paling menantang yang kamu temui selama satu pekan ini.*

- **Deskripsi Error / Bug:**

    > Fitur dark mode tidak berfungsi dengan benar. Nilai `isDarkMode` berhasil tersimpan di `localStorage` dan tombol toggle bekerja, namun warna tampilan tidak berubah sama sekali — halaman tetap terang meskipun `isDarkMode` bernilai `true`.

- **Langkah Investigasi:**

    > Saya menambahkan `console.log("isDarkMode:", isDarkMode)` di dalam `useEffect` untuk memastikan effect benar-benar berjalan setiap kali nilai berubah. Log menunjukkan nilai berubah dengan benar antara `true` dan `false`.
    >
    > Langkah berikutnya, saya membuka browser DevTools → tab **Elements** dan memeriksa tag `<html>` setiap kali tombol diklik. Ternyata class `dark` memang ditambahkan dan dihapus dengan benar di `document.documentElement`.
    >
    > Masalahnya bukan di JavaScript — melainkan di CSS. Saya belum menulis aturan CSS apapun yang merespons class `dark` di elemen `html`. Class sudah ada, tapi tidak ada style yang terpicu karenanya.

- **Kolaborasi dengan AI:**

    > Pada proyek ini saya tidak menggunakan AI. Saya menyelesaikan masalah ini secara mandiri setelah menyadari bahwa masalahnya ada di CSS, bukan di logika React.

- **Solusi Akhir:**

    > Saya perlu mendefinisikan CSS variables yang berbeda untuk kondisi dark mode di file `index.css` (CSS global), menggunakan selector `:root` untuk mode terang dan `html.dark` untuk mode gelap:
    >
    > ```css
    > /* Mode terang — default */
    > :root {
    >   --warna-latar: #ffffff;
    >   --warna-teks: #111827;
    >   --warna-kartu: #f9fafb;
    > }
    >
    > /* Mode gelap — aktif saat class 'dark' ada di <html> */
    > html.dark {
    >   --warna-latar: #111827;
    >   --warna-teks: #f9fafb;
    >   --warna-kartu: #1f2937;
    > }
    > ```
    >
    > Kemudian di setiap file CSS Modules komponen, saya menggunakan variabel tersebut alih-alih nilai warna langsung:
    >
    > ```css
    > .app {
    >   background-color: var(--warna-latar);
    >   color: var(--warna-teks);
    > }
    > ```
    >
    > Logikanya: `useEffect` di `App.jsx` sudah benar menambahkan class `dark` ke `<html>`. Yang kurang adalah CSS yang merespons class tersebut. Dengan mendefinisikan CSS variables yang berbeda untuk dua kondisi, seluruh komponen otomatis ikut berubah tampilannya hanya dari satu titik perubahan di `index.css` — tanpa perlu menulis ulang style di setiap komponen.

---

## 🎯 4. Refleksi Pribadi

*Setelah 1 pekan mengerjakan proyek ini dengan metode Vibecoding, pelajaran berharga apa yang kamu dapatkan tentang peran manusia sebagai 'Arsitek' dibandingkan AI sebagai 'Asisten Pengetik'?*

> Dari semua proyek yang sudah saya kerjakan, Aplikasi Penghitung Hafalan ini adalah yang paling kompleks — ada custom hook, `useMemo`, `useEffect`, CSS Modules, dark mode, enam handler berbeda, dan dua data yang harus disinkronkan ke `localStorage`. Mengerjakan ini semua tanpa AI adalah tantangan terbesar, sekaligus pengalaman belajar yang paling bermakna.
>
> Hal pertama yang saya pelajari adalah pentingnya **memisahkan tanggung jawab sejak awal**. Keputusan untuk membuat custom hook `useLocalStorage` terpisah dari logika utama, misalnya, membuat `App.jsx` jauh lebih bersih dan mudah dibaca. Tanpa perencanaan itu, saya pasti akan menulis ulang logika `localStorage` di setiap tempat yang membutuhkannya.
>
> Yang paling mengubah cara pandang saya adalah proses debug dark mode. Saya menghabiskan waktu cukup lama memeriksa kode JavaScript — padahal masalahnya ada di CSS. Pengalaman itu mengajarkan saya untuk tidak langsung mengasumsikan bahwa bug selalu ada di tempat yang paling terakhir saya kerjakan. Debug yang baik dimulai dari membuktikan di mana masalah **tidak** ada, kemudian mempersempitnya.
>
> Satu hal lagi: menulis `useMemo` untuk `daftarHafalanTersaring` dan `filterCounts` adalah keputusan yang saya buat sendiri setelah menyadari bahwa filter dijalankan ulang setiap render meskipun datanya tidak berubah. Memahami kapan dan mengapa menggunakan `useMemo` — bukan sekadar tahu cara menulisnya — adalah pemahaman yang hanya bisa didapat dengan mengerjakan proyeknya sendiri.
>
> Kesimpulan: proyek ini membuktikan bahwa semakin kompleks sebuah aplikasi, semakin penting peran arsitek yang merencanakan sebelum mengeksekusi. AI mungkin bisa menulis semua kode ini lebih cepat — tapi saya tidak akan pernah benar-benar memahami mengapa setiap bagiannya ditulis seperti itu.