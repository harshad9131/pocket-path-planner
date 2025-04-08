
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

export function calculateMonthlySavings(amount) {
  // Simple calculation - annual savings divided by 12
  return amount / 12;
}
