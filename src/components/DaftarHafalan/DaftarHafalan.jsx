import styles from './DaftarHafalan.module.css';
import ItemHafalan from '../ItemHafalan/ItemHafalan';

export default function DaftarHafalan({
  daftarHafalan,
  onUpdateProgress,
  onSelesai,
  onBatalSelesai,
  onHapus,
  onReset,
}) {
  if (daftarHafalan.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>📭 Belum ada hafalan yang ditambahkan.</p>
        <p className={styles.emptyHint}>Gunakan form di atas untuk menambah target hafalan.</p>
      </div>
    );
  }

  return (
    <div className={styles.daftar}>
      {daftarHafalan.map((item) => (
        <ItemHafalan
          key={item.id}
          item={item}
          onUpdateProgress={onUpdateProgress}
          onSelesai={onSelesai}
          onBatalSelesai={onBatalSelesai}
          onHapus={onHapus}
          onReset={onReset}
        />
      ))}
    </div>
  );
}
