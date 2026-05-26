import styles from './ProgressBar.module.css';
import { hitungPersentase, getWarnaProgress } from '../../utils/hitungProgress';

export default function ProgressBar({ selesai, total }) {
  const persentase = hitungPersentase(selesai, total);
  const warna = getWarnaProgress(persentase);

  return (
    <div className={styles.container}>
      <div className={styles.barWrapper}>
        <div
          className={`${styles.bar} ${styles[warna]}`}
          style={{ width: `${persentase}%` }}
        />
      </div>
      <span className={`${styles.persentase} ${styles[warna]}`}>
        {persentase}%
      </span>
    </div>
  );
}
