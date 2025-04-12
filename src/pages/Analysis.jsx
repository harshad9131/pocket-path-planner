
import React, { useState, useEffect } from 'react';
import MonthlyChart from '../components/MonthlyChart';
import SpendingChart from '../components/SpendingChart';

const Analysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      
      // Group transactions by month
      const monthlyDataMap = {};
      const categoryDataMap = {};
      
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        // Monthly data processing
        if (!monthlyDataMap[month]) {
          monthlyDataMap[month] = { income: 0, expense: 0, savings: 0 };
        }
        
        if (transaction.type === 'income') {
          monthlyDataMap[month].income += transaction.amount;
        } else {
          monthlyDataMap[month].expense += transaction.amount;
        }
        
        // Calculate savings
        monthlyDataMap[month].savings = monthlyDataMap[month].income - monthlyDataMap[month].expense;
        
        // Category data processing (for expense categories)
        if (transaction.type === 'expense' && transaction.category) {
          if (!categoryDataMap[transaction.category]) {
            categoryDataMap[transaction.category] = 0;
          }
          categoryDataMap[transaction.category] += transaction.amount;
        }
      });
      
      setMonthlyData(monthlyDataMap);
      setCategoryData(categoryDataMap);
    }
    
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial Analysis</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Monthly Overview</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : Object.keys(monthlyData).length > 0 ? (
          <MonthlyChart data={monthlyData} />
        ) : (
          <div className="flex items-center justify-center h-80">
            <p className="text-gray-500">No data available. Add transactions to see analysis.</p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Expense Categories</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : Object.keys(categoryData).length > 0 ? (
          <SpendingChart data={categoryData} />
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No expense categories found. Add categorized transactions to see analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
