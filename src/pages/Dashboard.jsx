
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  
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
    }
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
