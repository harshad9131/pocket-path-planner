
import React, { useState } from 'react';
import { formatCurrency } from '../lib/utils';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', amount: '', monthlySaving: 0 });
  
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.amount) {
      // Calculate monthly saving (simple division by 12 months)
      const monthlySaving = Number(newGoal.amount) / 12;
      
      setGoals([...goals, {
        id: Date.now(),
        name: newGoal.name,
        amount: Number(newGoal.amount),
        monthlySaving
      }]);
      
      setNewGoal({ name: '', amount: '', monthlySaving: 0 });
      setIsAdding(false);
    }
  };
  
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Goals</h1>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAdding(true)}
        >
          Add New Goal
        </button>
      </div>
      
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Add New Goal</h2>
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
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                placeholder="e.g. New Car, Emergency Fund"
              />
            </div>
            <div>
              <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount
              </label>
              <input
                type="number"
                id="goalAmount"
                value={newGoal.amount}
                onChange={(e) => setNewGoal({...newGoal, amount: e.target.value})}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                placeholder="0.00"
                min="1"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow col-span-full text-center text-gray-500">
            No goals set yet. Add your first financial goal to get started.
          </div>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="bg-white p-6 rounded-lg shadow relative">
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              <h3 className="text-lg font-medium mb-2">{goal.name}</h3>
              <p className="text-gray-700">Target: {formatCurrency(goal.amount)}</p>
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <p className="font-medium">Monthly Savings Needed</p>
                <p className="text-lg">{formatCurrency(goal.monthlySaving)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Savings Tips</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Set up automatic transfers to your savings account on payday</li>
          <li>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
          <li>Review subscriptions monthly and cancel unused services</li>
          <li>Try a no-spend challenge for non-essential items</li>
          <li>Compare prices before making large purchases</li>
        </ul>
      </div>
    </div>
  );
};

export default Goals;
