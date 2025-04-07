
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateBalance = (transactions) => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);
};

export const calculateTotalByType = (transactions, type) => {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const groupByCategory = (transactions, type) => {
  const filtered = transactions.filter(transaction => transaction.type === type);
  return filtered.reduce((groups, transaction) => {
    const category = transaction.category;
    if (!groups[category]) {
      groups[category] = 0;
    }
    groups[category] += transaction.amount;
    return groups;
  }, {});
};

export const calculateMonthlySavings = (annualTarget) => {
  return annualTarget / 12;
};

export const generateMonthlyData = (transactions) => {
  const monthlyData = {};
  const currentDate = new Date();
  
  // Get data for the last 6 months
  for (let i = 0; i < 6; i++) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthString = month.toLocaleString('default', { month: 'short' });
    
    const monthIncome = transactions
      .filter(t => {
        const transDate = new Date(t.date);
        return t.type === 'income' && 
               transDate.getMonth() === month.getMonth() && 
               transDate.getFullYear() === month.getFullYear();
      })
      .reduce((sum, t) => sum + t.amount, 0);
      
    const monthExpense = transactions
      .filter(t => {
        const transDate = new Date(t.date);
        return t.type === 'expense' && 
               transDate.getMonth() === month.getMonth() && 
               transDate.getFullYear() === month.getFullYear();
      })
      .reduce((sum, t) => sum + t.amount, 0);
      
    monthlyData[monthString] = {
      income: monthIncome,
      expense: monthExpense,
      savings: monthIncome - monthExpense
    };
  }
  
  return monthlyData;
};

export function getLocalStorageItem(key, defaultValue) {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error parsing stored value for ${key}:`, error);
    return defaultValue;
  }
}

export function setLocalStorageItem(key, value) {
  if (typeof window === "undefined") {
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing value for ${key}:`, error);
  }
}
