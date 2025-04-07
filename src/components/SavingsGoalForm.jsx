
import { useState, useEffect } from 'react';
import { calculateMonthlySavings, formatCurrency } from '../lib/utils';

const SavingsGoalForm = ({ onSave, initialGoal }) => {
  const [goal, setGoal] = useState({
    name: '',
    totalAmount: '',
    deadline: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0], // End of current year
    progress: 0
  });

  const [monthlySavings, setMonthlySavings] = useState(0);

  useEffect(() => {
    if (initialGoal) {
      setGoal(initialGoal);
    }
  }, [initialGoal]);

  useEffect(() => {
    if (goal.totalAmount) {
      const annualTarget = parseFloat(goal.totalAmount) - goal.progress;
      const monthly = calculateMonthlySavings(annualTarget);
      setMonthlySavings(monthly);
    }
  }, [goal.totalAmount, goal.progress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedGoal = {
      ...goal,
      totalAmount: parseFloat(goal.totalAmount),
      progress: parseFloat(goal.progress)
    };
    
    onSave(formattedGoal);
    
    if (!initialGoal) {
      setGoal({
        name: '',
        totalAmount: '',
        deadline: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
        progress: 0
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={goal.name}
            onChange={handleChange}
            placeholder="e.g., Buy a car, Emergency fund"
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount
            </label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={goal.totalAmount}
              onChange={handleChange}
              placeholder="0.00"
              min="1"
              step="0.01"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={goal.deadline}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
            Current Progress
          </label>
          <input
            type="number"
            id="progress"
            name="progress"
            value={goal.progress}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            {initialGoal ? 'Update Goal' : 'Create Goal'}
          </button>
        </div>
      </form>
      
      {goal.totalAmount && (
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Monthly Savings Needed</h3>
          <p className="text-blue-900">
            To reach your goal of {formatCurrency(goal.totalAmount)} by{' '}
            {new Date(goal.deadline).toLocaleDateString()}, you need to save approximately{' '}
            <strong>{formatCurrency(monthlySavings)}</strong> each month.
          </p>
        </div>
      )}
    </div>
  );
};

export default SavingsGoalForm;
