
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';

const Budget = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  const remainingAmount = monthlyBudget - spentAmount;
  const percentageSpent = monthlyBudget > 0 ? (spentAmount / monthlyBudget) * 100 : 0;
  const percentageRemaining = monthlyBudget > 0 ? 100 - percentageSpent : 0;

  // Load budget from localStorage and calculate spent amount from transactions
  useEffect(() => {
    const savedBudget = localStorage.getItem('monthlyBudget');
    if (savedBudget) {
      setMonthlyBudget(parseFloat(savedBudget));
    }
    
    // Calculate spent amount from this month's expense transactions
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      
      // Get current month's expenses
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const monthlyExpenses = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && 
               transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear;
      });
      
      const totalSpent = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
      setSpentAmount(totalSpent);
    }
  }, []);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('monthlyBudget', monthlyBudget);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Budget Overview</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        {isEditing ? (
          <form onSubmit={handleBudgetSubmit} className="space-y-4">
            <div>
              <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-1">
                Set Monthly Budget
              </label>
              <input
                type="number"
                id="monthlyBudget"
                min="0"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Budget
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Monthly Budget</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Spent: {formatCurrency(spentAmount)}</span>
                <span>Budget: {formatCurrency(monthlyBudget)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${percentageSpent > 80 ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="font-medium text-lg">
                {percentageRemaining.toFixed(0)}% of your budget remaining
              </p>
              <p className="text-gray-500">
                You have {formatCurrency(remainingAmount)} left to spend this month
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
