
import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/utils';
import { 
  PlusCircle, 
  Target, 
  Trash2, 
  Calendar, 
  TrendingUp,
  PiggyBank,
  DollarSign,
  Lightbulb
} from 'lucide-react';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ 
    name: '', 
    amount: '', 
    deadline: '',
    monthlySaving: 0 
  });
  
  // Load saved goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('financialGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.amount) {
      // Calculate monthly saving
      let monthsToTarget = 12; // Default to 1 year
      
      if (newGoal.deadline) {
        const today = new Date();
        const deadline = new Date(newGoal.deadline);
        const diffMonths = (deadline.getFullYear() - today.getFullYear()) * 12 + 
                         (deadline.getMonth() - today.getMonth());
        if (diffMonths > 0) {
          monthsToTarget = diffMonths;
        }
      }
      
      const monthlySaving = Number(newGoal.amount) / monthsToTarget;
      
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        amount: Number(newGoal.amount),
        deadline: newGoal.deadline || '',
        monthlySaving,
        createdAt: new Date().toISOString()
      };
      
      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      localStorage.setItem('financialGoals', JSON.stringify(updatedGoals));
      
      setNewGoal({ name: '', amount: '', deadline: '', monthlySaving: 0 });
      setIsAdding(false);
    }
  };
  
  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('financialGoals', JSON.stringify(updatedGoals));
  };

  // Calculate progress if there are associated transactions
  const calculateProgress = (goalId) => {
    // This is a placeholder for actual implementation
    // In a real app, you would track contributions toward specific goals
    return Math.random() * 30; // Random progress between 0-30% for demo
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Target className="h-7 w-7 text-purple-500 mr-2" />
          Financial Goals
        </h1>
        <button 
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg shadow-sm hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add New Goal
        </button>
      </div>
      
      {isAdding && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-purple-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PiggyBank className="mr-2 h-5 w-5 text-purple-500" />
            Add New Goal
          </h2>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label htmlFor="goalName" className="block text-sm font-medium text-gray-700 mb-1">
                Goal Name
              </label>
              <input
                type="text"
                id="goalName"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g. New Car, Emergency Fund"
              />
            </div>
            <div>
              <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="goalAmount"
                  value={newGoal.amount}
                  onChange={(e) => setNewGoal({...newGoal, amount: e.target.value})}
                  className="w-full border-gray-300 rounded-lg shadow-sm p-2 border pl-7 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.00"
                  min="1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="goalDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                Target Date (Optional)
              </label>
              <input
                type="date"
                id="goalDeadline"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                className="w-full border-gray-300 rounded-lg shadow-sm p-2 border focus:ring-purple-500 focus:border-purple-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm col-span-full text-center border border-gray-200">
            <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-3 opacity-70" />
            <p className="text-gray-600 font-medium">No goals set yet. Add your first financial goal to get started.</p>
          </div>
        ) : (
          goals.map(goal => {
            const progress = calculateProgress(goal.id);
            
            return (
              <div key={goal.id} className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-sm border border-purple-100 relative transition-all hover:shadow-md">
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pr-8">{goal.name}</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Target</p>
                    <p className="text-lg font-medium text-gray-800">{formatCurrency(goal.amount)}</p>
                  </div>
                  
                  {goal.deadline && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="text-sm font-medium text-gray-700 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">Progress</span>
                    <span className="text-purple-600 font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Monthly Savings Needed
                  </p>
                  <p className="text-xl font-semibold text-purple-900 mt-1">{formatCurrency(goal.monthlySaving)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-purple-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-purple-500" />
          Savings Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Automate Your Savings</h3>
            <p className="text-gray-600 text-sm">
              Set up automatic transfers to your savings account on payday to ensure consistent progress toward your goals.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">50/30/20 Rule</h3>
            <p className="text-gray-600 text-sm">
              Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment for balanced finances.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Review Subscriptions</h3>
            <p className="text-gray-600 text-sm">
              Monthly review of subscriptions can help identify services you no longer use, freeing up money for your goals.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-2">Track Your Progress</h3>
            <p className="text-gray-600 text-sm">
              Regularly monitor your progress towards goals to stay motivated and make adjustments to your savings plan as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
