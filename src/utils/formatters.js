export const formatStipend = (amount) => `₹${Number(amount).toLocaleString('en-IN')}/month`;

export const formatSalary = (salaryStr) => salaryStr;

export const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return date;
  }
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export const truncate = (str, len = 100) => {
  if (!str || str.length <= len) return str;
  return str.slice(0, len) + '...';
};

export const formatNumber = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
};

export const getDaysLeft = (deadline) => {
  const today = new Date();
  const end = new Date(deadline);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Expired';
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day left';
  return `${diff} days left`;
};

export const getMatchColor = (score) => {
  if (score >= 85) return '#10B981';
  if (score >= 70) return '#3B82F6';
  if (score >= 55) return '#F59E0B';
  return '#EF4444';
};
