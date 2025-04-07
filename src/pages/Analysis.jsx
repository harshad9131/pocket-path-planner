
import { useState, useEffect } from 'react';
import SpendingChart from '../components/SpendingChart';
import MonthlyChart from '../components/MonthlyChart';
import { 
  formatCurrency, 
  calculateTotalByType, 
  groupByCategory, 
  generateMonthlyData,
  getLocalStorageItem
} from '../lib/utils';
import { initialTransactions } from '../lib/data';

const Analysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('All Time');
  
  useEffect(() => {
    const savedTransactions = getLocalStorageItem('transactions', initialTransactions);
    setTransactions(savedTransactions);
    
    const monthData = generateMonthlyData(savedTransactions);
    setMonthlyData(monthData);
  }, []);
  
  const getFilteredTransactions = () => {
    if (selectedMonth === 'All Time') {
      return transactions;
    }
    
    const currentDate = new Date();
    const selectedMonthIndex = new Date(Date.parse(`1 ${selectedMonth} ${currentDate.getFullYear()}`)).getMonth();
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === selectedMonthIndex;
    });
  };
  
  const filteredTransactions = getFilteredTransactions();
  const expensesByCategory = groupByCategory(filteredTransactions, 'expense');
  const incomeByCategory = groupByCategory(filteredTransactions, 'income');
  
  const totalIncome = calculateTotalByType(filteredTransactions, 'income');
  const totalExpenses = calculateTotalByType(filteredTransactions, 'expense');
  
  const months = [
    'All Time', 'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Spending Analysis</h1>
        <p className="text-gray-600">Visualize your spending patterns</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Monthly Overview</h2>
        </div>
        <MonthlyChart data={monthlyData} />
      </div>
      
      <div className="flex justify-end">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-2">Income Breakdown</h2>
          <p className="text-gray-600 mb-4">Total: {formatCurrency(totalIncome)}</p>
          <SpendingChart data={incomeByCategory} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-2">Expense Breakdown</h2>
          <p className="text-gray-600 mb-4">Total: {formatCurrency(totalExpenses)}</p>
          <SpendingChart data={expensesByCategory} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Budget vs Actual Spending</h2>
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">Set up your budget in the Budget page to see the comparison.</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
