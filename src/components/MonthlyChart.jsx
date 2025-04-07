
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ data }) => {
  // Transform the data for the chart
  const chartData = Object.entries(data)
    .map(([month, values]) => ({
      name: month,
      Income: values.income,
      Expenses: values.expense,
      Savings: values.savings
    }))
    .reverse(); // Display oldest to newest

  return (
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
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
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
  );
};

export default MonthlyChart;
