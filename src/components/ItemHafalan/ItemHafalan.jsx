import { useState } from 'react';
import styles from './ItemHafalan.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import { hitungPersentase } from '../../utils/hitungProgress';

export default function ItemHafalan({
  item,
  onUpdateProgress,
  onSelesai,
  onBatalSelesai,
  onHapus,
  onReset,
}) {
  const [showHapusKonfirmasi, setShowHapusKonfirmasi] = useState(false);
  const [showResetKonfirmasi, setShowResetKonfirmasi] = useState(false);
  const [inputLoncat, setInputLoncat] = useState('');

  const persentase = hitungPersentase(item.selesai, item.total);
  const isSelesai = item.status === 'selesai';

  const handleKurang = () => {
    if (item.selesai > 0) {
      onUpdateProgress(item.id, item.selesai - 1);
    }
  };

  const handleTambah = () => {
    if (item.selesai < item.total) {
      onUpdateProgress(item.id, item.selesai + 1);
    }
  };

  const handleLoncat = (e) => {
    e.preventDefault();
    const nilai = Number(inputLoncat);
    if (!isNaN(nilai) && nilai >= 0 && nilai <= item.total) {
      onUpdateProgress(item.id, nilai);
      setInputLoncat('');
    }
  };

  const handleKonfirmasiHapus = () => {
    setShowHapusKonfirmasi(false);
    onHapus(item.id);
  };

  const handleKonfirmasiReset = () => {
    setShowResetKonfirmasi(false);
    onReset(item.id);
  };

  return (
    <div className={`${styles.item} ${isSelesai ? styles.selesai : ''}`}>
      <div className={styles.header}>
        <div className={styles.namaWrapper}>
          <span className={styles.icon}>{isSelesai ? '✅' : '📗'}</span>
          <h3 className={styles.nama}>{item.nama}</h3>
        </div>
        {isSelesai && <span className={styles.badge}>SELESAI</span>}
      </div>

      <p className={styles.progress}>
        {item.selesai} / {item.total} ayat
      </p>

      <ProgressBar selesai={item.selesai} total={item.total} />

      <div className={styles.tanggal}>
        <small>
          Mulai: {item.tanggalMulai}
          {item.tanggalSelesai && ` • Selesai: ${item.tanggalSelesai}`}
        </small>
      </div>

      <div className={styles.actions}>
        {isSelesai ? (
          <button
            className={`${styles.btn} ${styles.resetBtn}`}
            onClick={() => setShowResetKonfirmasi(true)}
          >
            ↺ Reset
          </button>
        ) : (
          <>
            <button className={`${styles.btn} ${styles.kurangBtn}`} onClick={handleKurang}>
              −1
            </button>
            <button className={`${styles.btn} ${styles.tambahBtn}`} onClick={handleTambah}>
              +1
            </button>
            <form className={styles.loncatForm} onSubmit={handleLoncat}>
              <input
                type="number"
                className={styles.loncatInput}
                placeholder="Loncat"
                min="0"
                max={item.total}
                value={inputLoncat}
                onChange={(e) => setInputLoncat(e.target.value)}
              />
            </form>
            <button
              className={`${styles.btn} ${styles.selesaiBtn}`}
              onClick={() => onSelesai(item.id)}
            >
              ✅ Selesai
            </button>
          </>
        )}

        {showHapusKonfirmasi ? (
          <div className={styles.konfirmasi}>
            <span>Yakin hapus?</span>
            <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={handleKonfirmasiHapus}>
              Ya
            </button>
            <button
              className={`${styles.btn} ${styles.cancelBtn}`}
              onClick={() => setShowHapusKonfirmasi(false)}
            >
              Tidak
            </button>
          </div>
        ) : (
          <button
            className={`${styles.btn} ${styles.hapusBtn}`}
            onClick={() => setShowHapusKonfirmasi(true)}
          >
            🗑 Hapus
          </button>
        )}
      </div>

      {showResetKonfirmasi && (
        <div className={styles.konfirmasiInline}>
          <p>Reset progress ke 0?</p>
          <button className={`${styles.btn} ${styles.confirmBtn}`} onClick={handleKonfirmasiReset}>
            Ya, Reset
          </button>
          <button
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={() => setShowResetKonfirmasi(false)}
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}
