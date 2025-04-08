
import React, { useState } from 'react';
import GoalCard from '../components/GoalCard';
import { financialGoals } from '../data/mockData';

const Goals = () => {
  const [goals, setGoals] = useState(financialGoals);
  
  const handleEditGoal = (goal) => {
    alert(`Edit goal: ${goal.name}`);
    // In a real app, this would open a modal or form to edit the goal
  };
  
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Goals</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalCard 
            key={goal.id}
            goal={goal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
          />
        ))}
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
