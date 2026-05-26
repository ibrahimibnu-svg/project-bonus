import { useState } from 'react';
import styles from './FormTambahHafalan.module.css';

export default function FormTambahHafalan({ onTambah }) {
  const [nama, setNama] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nama.trim()) {
      setError('Nama hafalan tidak boleh kosong');
      return;
    }

    const totalNum = Number(total);
    if (!total || totalNum <= 0 || !Number.isInteger(totalNum)) {
      setError('Total harus berupa angka bulat lebih dari 0');
      return;
    }

    onTambah(nama.trim(), totalNum);
    setNama('');
    setTotal('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Tambah Target Hafalan</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="namaHafalan">
          Nama Hafalan
        </label>
        <input
          id="namaHafalan"
          type="text"
          className={styles.input}
          placeholder="Contoh: Surat Al-Fatihah"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="totalItem">
          Total Ayat / Halaman / Item
        </label>
        <input
          id="totalItem"
          type="number"
          className={styles.input}
          placeholder="Contoh: 7"
          min="1"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.button}>
        + Tambahkan
      </button>
    </form>
  );
}
