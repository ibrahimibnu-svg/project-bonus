import styles from './StatistikRingkasan.module.css';

export default function StatistikRingkasan({ daftarHafalan }) {
  const totalTarget = daftarHafalan.length;
  const totalSelesai = daftarHafalan.filter(item => item.status === 'selesai').length;
  const totalProses = daftarHafalan.filter(item => item.status === 'proses').length;
  const totalBelum = daftarHafalan.filter(item => item.status === 'belum').length;

  const totalSelesaiAyat = daftarHafalan.reduce((acc, item) => acc + item.selesai, 0);
  const totalAyat = daftarHafalan.reduce((acc, item) => acc + item.total, 0);
  const persentaseKeseluruhan = totalAyat > 0
    ? Math.round((totalSelesaiAyat / totalAyat) * 100)
    : 0;

  return (
    <div className={styles.statistik}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.label}>Total Target</span>
          <span className={styles.value}>{totalTarget}</span>
        </div>
        <div className={`${styles.card} ${styles.selesai}`}>
          <span className={styles.label}>Selesai</span>
          <span className={styles.value}>{totalSelesai}</span>
        </div>
        <div className={`${styles.card} ${styles.proses}`}>
          <span className={styles.label}>Sedang Proses</span>
          <span className={styles.value}>{totalProses}</span>
        </div>
        <div className={`${styles.card} ${styles.belum}`}>
          <span className={styles.label}>Belum Mulai</span>
          <span className={styles.value}>{totalBelum}</span>
        </div>
        <div className={`${styles.card} ${styles.persentase}`}>
          <span className={styles.label}>Persentase</span>
          <span className={styles.value}>{persentaseKeseluruhan}%</span>
        </div>
      </div>
    </div>
  );
}
