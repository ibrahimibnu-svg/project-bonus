import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar/Navbar';
import StatistikRingkasan from './components/StatistikRingkasan/StatistikRingkasan';
import FormTambahHafalan from './components/FormTambahHafalan/FormTambahHafalan';
import FilterBar from './components/FilterBar/FilterBar';
import DaftarHafalan from './components/DaftarHafalan/DaftarHafalan';
import styles from './App.module.css';

// Initial sample data for demonstration
const dataAwal = [
  {
    id: '1',
    nama: 'Surat Al-Fatihah',
    total: 7,
    selesai: 7,
    status: 'selesai',
    tanggalMulai: '2026-05-20',
    tanggalSelesai: '2026-05-21',
  },
  {
    id: '2',
    nama: 'Surat Al-Baqarah',
    total: 286,
    selesai: 120,
    status: 'proses',
    tanggalMulai: '2026-05-22',
    tanggalSelesai: null,
  },
  {
    id: '3',
    nama: 'Surat Al-Ikhlas',
    total: 4,
    selesai: 0,
    status: 'belum',
    tanggalMulai: '2026-05-25',
    tanggalSelesai: null,
  },
];

function App() {
  // State utama untuk menyimpan daftar hafalan
  // Menggunakan custom hook useLocalStorage untuk persistensi data
  const [daftarHafalan, setDaftarHafalan] = useLocalStorage('daftarHafalan', dataAwal);

  // State untuk filter tampilan: "semua", "proses", atau "selesai"
  const [filter, setFilter] = useState('semua');

  // State untuk dark mode dengan default false dan persistensi ke localStorage
  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', false);

  // Effect untuk mengaplikasikan class dark pada root element
  // Setiap kali isDarkMode berubah, effect ini akan menjalankan
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handler untuk menambah hafalan baru
  const tambahHafalan = (nama, total) => {
    const item = {
      id: Date.now().toString(),
      nama,
      total: Number(total),
      selesai: 0,
      status: 'belum',
      tanggalMulai: new Date().toISOString().split('T')[0],
      tanggalSelesai: null,
    };
    setDaftarHafalan((prev) => [...prev, item]);
  };

  // Handler untuk mengupdate progress hafalan
  const updateProgress = (id, jumlah) => {
    setDaftarHafalan((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const jumlahValid = Math.max(0, Math.min(jumlah, item.total));
        const isSelesai = jumlahValid >= item.total;

        return {
          ...item,
          selesai: jumlahValid,
          status: isSelesai ? 'selesai' : jumlahValid > 0 ? 'proses' : 'belum',
          tanggalSelesai: isSelesai ? new Date().toISOString().split('T')[0] : null,
        };
      })
    );
  };

  // Handler untuk menandai hafalan sebagai selesai
  const selesaikanHafalan = (id) => {
    setDaftarHafalan((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          selesai: item.total,
          status: 'selesai',
          tanggalSelesai: new Date().toISOString().split('T')[0],
        };
      })
    );
  };

  // Handler untuk membatalkan status selesai
  const batalkanSelesai = (id) => {
    setDaftarHafalan((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          selesai: 0,
          status: 'belum',
          tanggalSelesai: null,
        };
      })
    );
  };

  // Handler untuk menghapus hafalan
  const hapusHafalan = (id) => {
    setDaftarHafalan((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler untuk mereset progress hafalan ke 0
  const resetHafalan = (id) => {
    setDaftarHafalan((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          selesai: 0,
          status: 'belum',
          tanggalSelesai: null,
        };
      })
    );
  };

  // Handler untuk toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Filter daftar hafalan berdasarkan status filter
  const daftarHafalanTersaring = useMemo(() => {
    if (filter === 'semua') return daftarHafalan;
    if (filter === 'proses') return daftarHafalan.filter((item) => item.status !== 'selesai');
    if (filter === 'selesai') return daftarHafalan.filter((item) => item.status === 'selesai');
    return daftarHafalan;
  }, [daftarHafalan, filter]);

  // Hitung jumlah untuk setiap kategori filter
  const filterCounts = useMemo(() => ({
    semua: daftarHafalan.length,
    proses: daftarHafalan.filter((item) => item.status !== 'selesai').length,
    selesai: daftarHafalan.filter((item) => item.status === 'selesai').length,
  }), [daftarHafalan]);

  return (
    <div className={styles.app}>
      <Navbar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      <main className={styles.main}>
        <StatistikRingkasan daftarHafalan={daftarHafalan} />

        <FormTambahHafalan onTambah={tambahHafalan} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          counts={filterCounts}
        />

        <DaftarHafalan
          daftarHafalan={daftarHafalanTersaring}
          onUpdateProgress={updateProgress}
          onSelesai={selesaikanHafalan}
          onBatalSelesai={batalkanSelesai}
          onHapus={hapusHafalan}
          onReset={resetHafalan}
        />
      </main>
    </div>
  );
}

export default App;
