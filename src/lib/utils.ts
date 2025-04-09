
// Simple function to combine class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Format currency
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Calculate monthly savings needed
export function calculateMonthlySavings(amount, months = 12) {
  return amount / months;
}
