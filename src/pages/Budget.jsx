
import { useState, useEffect } from 'react';
import { getLocalStorageItem, setLocalStorageItem, formatCurrency } from '../lib/utils';
import { categories } from '../lib/data';

const Budget = () => {
  const [budgets, setBudgets] = useState({});
  const [activeCategory, setActiveCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  useEffect(() => {
    const savedBudgets = getLocalStorageItem('budgets', {});
    setBudgets(savedBudgets);
  }, []);
  
  const handleCategoryChange = (e) => {
    setActiveCategory(e.target.value);
    // Load existing budget amount for the selected category
    setAmount(budgets[e.target.value] ? budgets[e.target.value].toString() : '');
  };
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedBudgets = {
      ...budgets,
      [activeCategory]: parseFloat(amount)
    };
    
    setBudgets(updatedBudgets);
    setLocalStorageItem('budgets', updatedBudgets);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  const getBudgetedCategories = () => {
    return Object.keys(budgets).filter(category => budgets[category] > 0);
  };
  
  const getTotalBudget = () => {
    return Object.values(budgets).reduce((sum, amount) => sum + amount, 0);
  };
  
  const budgetedCategories = getBudgetedCategories();
  const totalBudget = getTotalBudget();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Budget Planning</h1>
        <p className="text-gray-600">Set spending limits for different categories</p>
      </div>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Budget updated successfully!</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border md:col-span-2">
          <h2 className="text-lg font-medium mb-4">Budget Overview</h2>
          
          {budgetedCategories.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">No budget categories defined yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {budgetedCategories.map(category => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm font-medium">{formatCurrency(budgets[category])}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(budgets[category] / totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total Budget</span>
                  <span className="font-medium">{formatCurrency(totalBudget)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Set Budget</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={activeCategory}
                onChange={handleCategoryChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {categories.expense.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Budget Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Set Budget
            </button>
          </form>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Budget Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">50/30/20 Rule</h3>
            <p className="text-sm text-gray-600">
              Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Zero-Based Budgeting</h3>
            <p className="text-sm text-gray-600">
              Assign every dollar of income to a specific category until you reach zero.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Pay Yourself First</h3>
            <p className="text-sm text-gray-600">
              Set aside a portion of your income for savings before budgeting for expenses.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Review Regularly</h3>
            <p className="text-sm text-gray-600">
              Review your budget monthly and adjust as needed based on changing priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
