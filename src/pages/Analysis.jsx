
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Analysis = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      
      // Group transactions by month
      const monthlyData = {};
      
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        if (!monthlyData[month]) {
          monthlyData[month] = { income: 0, expense: 0, savings: 0 };
        }
        
        if (transaction.type === 'income') {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expense += transaction.amount;
        }
        
        // Calculate savings
        monthlyData[month].savings = monthlyData[month].income - monthlyData[month].expense;
      });
      
      // Transform data for chart
      const formattedData = Object.entries(monthlyData)
        .map(([month, values]) => ({
          name: month,
          Income: values.income,
          Expenses: values.expense,
          Savings: values.savings
        }));
      
      setChartData(formattedData);
    }
  }, []);

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
              <p className="text-gray-500">No data available. Add transactions to see analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
