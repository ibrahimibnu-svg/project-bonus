export function hitungPersentase(selesai, total) {
  if (total === 0) return 0;
  return Math.round((selesai / total) * 100);
}

export function getWarnaProgress(persentase) {
  if (persentase === 0) return 'danger';
  if (persentase <= 33) return 'danger';
  if (persentase <= 66) return 'warning';
  if (persentase < 100) return 'info';
  return 'success';
}

export function getLabelStatus(status) {
  switch (status) {
    case 'belum':
      return 'Belum Mulai';
    case 'proses':
      return 'Sedang Proses';
    case 'selesai':
      return 'Selesai';
    default:
      return 'Unknown';
  }
}

export function formatTanggal(tanggal) {
  if (!tanggal) return '-';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(tanggal).toLocaleDateString('id-ID', options);
}
