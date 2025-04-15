
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import SpendingChart from '../components/SpendingChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [monthlyData, setMonthlyData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      
      // Sort by date (most recent first)
      const sortedTransactions = parsedTransactions.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setTransactions(sortedTransactions.slice(0, 5)); // Get only the 5 most recent
      
      // Calculate totals
      const income = parsedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = parsedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      setTotalIncome(income);
      setTotalExpenses(expenses);
      setBalance(income - expenses);
      
      // Process data for charts
      // Group transactions by month
      const monthlyDataMap = {};
      const categoryDataMap = {};
      
      parsedTransactions.forEach(transaction => {
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income-card">
          <h2 className="summary-card-title">Total Income</h2>
          <p className="summary-card-value">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="summary-card expense-card">
          <h2 className="summary-card-title">Total Expenses</h2>
          <p className="summary-card-value">{formatCurrency(totalExpenses)}</p>
        </div>
        
        <div className="summary-card balance-card">
          <h2 className="summary-card-title">Balance</h2>
          <p className="summary-card-value">{formatCurrency(balance)}</p>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h2 className="section-title">Monthly Overview</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading data...</p>
            </div>
          ) : Object.keys(monthlyData).length > 0 ? (
            <MonthlyChart data={monthlyData} />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No data available. Add transactions to see analysis.</p>
            </div>
          )}
        </div>
        
        <div className="chart-container">
          <h2 className="section-title">Expense Categories</h2>
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
      
      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <h2 className="section-title">Recent Transactions</h2>
          <a href="/transactions" className="view-all-link">View All</a>
        </div>
        
        <TransactionList transactions={transactions} />
        
        {transactions.length === 0 && (
          <div className="empty-state">
            <p>No transactions yet. Add your first transaction to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
