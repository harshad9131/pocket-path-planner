
import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import { formatCurrency } from '../lib/utils';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0
  });
  
  const [recentTransactions, setRecentTransactions] = useState([]);
  
  // Calculate summary from transactions
  const calculateSummary = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return { balance: 0, income: 0, expenses: 0 };
    }
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      income,
      expenses,
      balance: income - expenses
    };
  };
  
  // Load transactions and calculate summary
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      setRecentTransactions(transactions.slice(-5).reverse()); // Get last 5 transactions
      setSummary(calculateSummary(transactions));
    }
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-500">Total Balance</h3>
            <div className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
              </svg>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold">{formatCurrency(summary.balance)}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-500">Monthly Income</h3>
            <div className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold">{formatCurrency(summary.income)}</p>
            <div className="flex items-center text-sm text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
              <span>8.2%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-500">Monthly Expenses</h3>
            <div className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
              </svg>
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold">{formatCurrency(summary.expenses)}</p>
            <div className="flex items-center text-sm text-destructive">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              <span>3.1%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
          <a href="/transactions" className="text-blue-500 hover:underline text-sm">View All</a>
        </div>
        {recentTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No transactions yet. Add your first transaction on the Transactions page.
          </div>
        ) : (
          <TransactionList transactions={recentTransactions} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
