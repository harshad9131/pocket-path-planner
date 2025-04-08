
import React from 'react';
import SpendingChart from '../components/SpendingChart';
import { budgetData } from '../data/mockData';

const Budget = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Budget Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Monthly Budget</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Spent: $2,450.00</span>
                <span>Budget: $3,500.00</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              You've spent 70% of your monthly budget. You have $1,050.00 left to spend this month.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Spending by Category</h2>
          <SpendingChart data={budgetData} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Budget Categories</h2>
        <div className="space-y-4">
          {Object.entries(budgetData).map(([category, amount]) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{category}</span>
                <span className="text-sm text-gray-500">${amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(amount / Object.values(budgetData).reduce((a, b) => a + b, 0)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
