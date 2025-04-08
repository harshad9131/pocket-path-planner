
import React from 'react';
import MonthlyChart from '../components/MonthlyChart';
import { monthlyData } from '../data/mockData';

const Analysis = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial Analysis</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Monthly Overview</h2>
        <MonthlyChart data={monthlyData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Top Spending Categories</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Housing</span>
              <span className="font-medium">$1,200.00</span>
            </div>
            <div className="flex justify-between">
              <span>Food</span>
              <span className="font-medium">$450.00</span>
            </div>
            <div className="flex justify-between">
              <span>Transportation</span>
              <span className="font-medium">$350.00</span>
            </div>
            <div className="flex justify-between">
              <span>Entertainment</span>
              <span className="font-medium">$200.00</span>
            </div>
            <div className="flex justify-between">
              <span>Utilities</span>
              <span className="font-medium">$180.00</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-700 mb-1">Spending Trend</h3>
              <p className="text-sm text-gray-600">Your spending has decreased by 5% compared to last month.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-700 mb-1">Savings Rate</h3>
              <p className="text-sm text-gray-600">You're saving 15% of your income, which is on track with your goals.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-md">
              <h3 className="font-medium text-yellow-700 mb-1">Budget Alert</h3>
              <p className="text-sm text-gray-600">You're close to your entertainment budget limit this month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
