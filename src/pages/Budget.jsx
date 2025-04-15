
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Edit, 
  Save, 
  X 
} from 'lucide-react';

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

  // Prepare data for the budget chart
  const budgetChartData = [
    { name: 'Budget', value: monthlyBudget, fill: 'var(--primary)' },
    { name: 'Spent', value: spentAmount, fill: 'var(--destructive)' },
    { name: 'Remaining', value: remainingAmount, fill: 'var(--success)' }
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Budget Overview</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Budget Management Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          {isEditing ? (
            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-2">
                  Set Monthly Budget
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="monthlyBudget"
                    min="0"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="flex-grow border-gray-300 rounded-md shadow-sm p-2 border focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors"
                  >
                    <X className="mr-2 h-5 w-5" />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Monthly Budget</h2>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Spent: {formatCurrency(spentAmount)}</span>
                  <span className="text-gray-600">Budget: {formatCurrency(monthlyBudget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${percentageSpent > 80 ? 'bg-destructive' : 'bg-success'}`} 
                    style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="font-medium text-lg text-gray-800">
                  {percentageRemaining.toFixed(0)}% of your budget remaining
                </p>
                <p className="text-gray-500 text-sm">
                  You have {formatCurrency(remainingAmount)} left to spend this month
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Budget Chart Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Budget Breakdown</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                />
                <Bar dataKey="value" fill="fill" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
