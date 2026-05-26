import styles from './Navbar.module.css';

export default function Navbar({ isDarkMode, onToggleDarkMode }) {
  return (
    <nav className={`${styles.navbar} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>📖 Penghitung Hafalan</h1>
        <button
          className={styles.toggleBtn}
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
