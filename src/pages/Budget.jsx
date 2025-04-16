
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
  X, 
  DollarSign,
  PieChart,
  BarChart as BarChartIcon,
  TrendingUp
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
    { name: 'Budget', value: monthlyBudget, fill: '#3b82f6' },
    { name: 'Spent', value: spentAmount, fill: '#ef4444' },
    { name: 'Remaining', value: remainingAmount, fill: '#10b981' }
  ];

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <DollarSign className="h-7 w-7 text-blue-500 mr-2" />
          Budget Overview
        </h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Budget Management Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
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
                    className="flex-grow border-gray-300 rounded-lg shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
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
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChartIcon className="mr-2 h-5 w-5 text-blue-500" />
                  Monthly Budget
                </h2>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Spent: {formatCurrency(spentAmount)}</span>
                  <span className="text-gray-600 font-medium">Budget: {formatCurrency(monthlyBudget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full ${
                      percentageSpent > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                      percentageSpent > 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                      'bg-gradient-to-r from-green-400 to-green-500'
                    }`} 
                    style={{ width: `${Math.min(percentageSpent, 100)}%`, transition: 'width 1s ease-in-out' }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-inner">
                <p className="font-semibold text-lg text-gray-800">
                  {percentageRemaining.toFixed(0)}% of your budget remaining
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  You have {formatCurrency(remainingAmount)} left to spend this month
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Budget Chart Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-blue-500" />
            Budget Breakdown
          </h2>
          <div className="w-full h-64 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetChartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#334155', fontWeight: 500 }} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fill: '#334155', fontWeight: 500 }} />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={(entry) => entry.fill} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
          Budget Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">50/30/20 Rule</h3>
            <p className="text-gray-600 text-sm">
              Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Automate Savings</h3>
            <p className="text-gray-600 text-sm">
              Set up automatic transfers to your savings account on payday to ensure consistent saving.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Track Expenses</h3>
            <p className="text-gray-600 text-sm">
              Monitor your spending regularly to identify areas where you can reduce unnecessary expenses.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Emergency Fund</h3>
            <p className="text-gray-600 text-sm">
              Build an emergency fund that covers 3-6 months of essential expenses for financial security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
