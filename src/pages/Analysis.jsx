
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { monthlyData } from '../data/mockData';

const Analysis = () => {
  // Transform the data for the chart
  const chartData = Object.entries(monthlyData)
    .map(([month, values]) => ({
      name: month,
      Income: values.income,
      Expenses: values.expense,
      Savings: values.savings
    }))
    .reverse(); // Display oldest to newest

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial Analysis</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Monthly Overview</h2>
        <div className="w-full h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="Income" fill="#0EA5E9" />
                <Bar dataKey="Expenses" fill="#EF4444" />
                <Bar dataKey="Savings" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
