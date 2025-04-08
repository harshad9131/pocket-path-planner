
// Mock data for our financial app
export const summary = {
  balance: 8546.12,
  income: 5200.00,
  expenses: 2450.00
};

// Mock transactions
export const recentTransactions = [
  { id: 1, date: '2025-04-07', description: 'Grocery Store', category: 'Food', amount: 86.42, type: 'expense' },
  { id: 2, date: '2025-04-06', description: 'Salary Deposit', category: 'Income', amount: 2600.00, type: 'income' },
  { id: 3, date: '2025-04-05', description: 'Electric Bill', category: 'Utilities', amount: 94.62, type: 'expense' },
  { id: 4, date: '2025-04-04', description: 'Restaurant', category: 'Food', amount: 45.80, type: 'expense' },
  { id: 5, date: '2025-04-03', description: 'Gas Station', category: 'Transportation', amount: 38.25, type: 'expense' }
];

// All transactions
export const allTransactions = [
  ...recentTransactions,
  { id: 6, date: '2025-04-02', description: 'Internet Bill', category: 'Utilities', amount: 79.99, type: 'expense' },
  { id: 7, date: '2025-04-01', description: 'Side Project', category: 'Income', amount: 350.00, type: 'income' },
  { id: 8, date: '2025-03-30', description: 'Phone Bill', category: 'Utilities', amount: 65.00, type: 'expense' },
  { id: 9, date: '2025-03-29', description: 'Movie Theater', category: 'Entertainment', amount: 24.50, type: 'expense' },
  { id: 10, date: '2025-03-28', description: 'Clothing Store', category: 'Shopping', amount: 128.75, type: 'expense' },
  { id: 11, date: '2025-03-27', description: 'Public Transport', category: 'Transportation', amount: 25.00, type: 'expense' },
  { id: 12, date: '2025-03-26', description: 'Coffee Shop', category: 'Food', amount: 12.40, type: 'expense' }
];

// Budget data
export const budgetData = {
  Housing: 1200.00,
  Food: 450.00,
  Transportation: 350.00,
  Entertainment: 200.00,
  Utilities: 180.00,
  Healthcare: 150.00,
  Shopping: 100.00,
  Other: 120.00
};

// Chart colors
export const chartColors = [
  '#0EA5E9', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#6366F1', // indigo
  '#14B8A6'  // teal
];

// Financial goals
export const financialGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    totalAmount: 10000.00,
    progress: 6500.00,
    deadline: '2025-09-01'
  },
  {
    id: 2,
    name: 'New Car',
    totalAmount: 25000.00,
    progress: 5000.00,
    deadline: '2026-01-15'
  },
  {
    id: 3,
    name: 'Vacation',
    totalAmount: 3000.00,
    progress: 1200.00,
    deadline: '2025-06-30'
  },
  {
    id: 4,
    name: 'Home Down Payment',
    totalAmount: 60000.00,
    progress: 15000.00,
    deadline: '2027-03-01'
  }
];

// Monthly financial data
export const monthlyData = {
  'Jan 2025': { income: 4800, expense: 3200, savings: 1600 },
  'Feb 2025': { income: 4900, expense: 3300, savings: 1600 },
  'Mar 2025': { income: 5100, expense: 2900, savings: 2200 },
  'Apr 2025': { income: 5200, expense: 2450, savings: 2750 }
};
