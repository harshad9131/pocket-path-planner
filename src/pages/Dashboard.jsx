
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import SpendingChart from '../components/SpendingChart';
import { BarChart2, PieChart, ArrowRight, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import './Dashboard.css';

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
    
    // Simulate loading for smoother UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Financial Overview</h1>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income-card">
          <h2 className="summary-card-title flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            Total Income
          </h2>
          <p className="summary-card-value text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="summary-card expense-card">
          <h2 className="summary-card-title flex items-center">
            <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
            Total Expenses
          </h2>
          <p className="summary-card-value text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
        
        <div className="summary-card balance-card">
          <h2 className="summary-card-title flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-blue-500" />
            Current Balance
          </h2>
          <p className="summary-card-value text-blue-600">{formatCurrency(balance)}</p>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="section-header">
            <h2 className="section-title">
              <BarChart2 className="h-5 w-5" /> 
              Monthly Overview
            </h2>
          </div>
          {isLoading ? (
            <div className="loading-container">
              <div></div>
              <p>Loading your financial data...</p>
            </div>
          ) : Object.keys(monthlyData).length > 0 ? (
            <MonthlyChart data={monthlyData} />
          ) : (
            <div className="empty-state">
              <p>No data available. Add transactions to see your monthly analysis.</p>
            </div>
          )}
        </div>
        
        <div className="chart-container">
          <div className="section-header">
            <h2 className="section-title">
              <PieChart className="h-5 w-5" />
              Expense Categories
            </h2>
          </div>
          {isLoading ? (
            <div className="loading-container">
              <div></div>
              <p>Loading your expense data...</p>
            </div>
          ) : Object.keys(categoryData).length > 0 ? (
            <SpendingChart data={categoryData} />
          ) : (
            <div className="empty-state">
              <p>No expense categories found. Add categorized transactions to view your spending patterns.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <h2 className="section-title">Recent Transactions</h2>
          <a href="/transactions" className="view-all-link">
            View All
            <ArrowRight className="ml-1" />
          </a>
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div></div>
            <p>Loading your recent transactions...</p>
          </div>
        ) : transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <div className="empty-state">
            <p>No transactions yet. Add your first transaction to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
