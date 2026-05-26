import styles from './FilterBar.module.css';

export default function FilterBar({ filter, onFilterChange, counts }) {
  const filters = [
    { key: 'semua', label: 'Semua', count: counts.semua },
    { key: 'proses', label: 'Sedang Proses', count: counts.proses },
    { key: 'selesai', label: 'Selesai', count: counts.selesai },
  ];

  return (
    <div className={styles.filterBar}>
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {label}
          <span className={styles.badge}>{count}</span>
        </button>
      ))}
    </div>
  );
}
