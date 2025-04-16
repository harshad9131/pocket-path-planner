
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

  // Custom tooltip formatter to add dollar sign
  const tooltipFormatter = (value, name) => {
    return [`$${value.toFixed(2)}`, name];
  };

  return (
    <div className="w-full h-[400px] relative">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 20,
            }}
            barGap={2}
            barSize={20}
            animationDuration={1200}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#64748b' }}
              tick={{ fill: '#334155', fontWeight: 500 }}
              tickMargin={10}
            />
            <YAxis 
              axisLine={{ stroke: '#64748b' }}
              tick={{ fill: '#334155', fontWeight: 500 }}
              tickFormatter={(value) => `$${value}`}
              width={70}
              tickMargin={8}
            />
            <Tooltip 
              formatter={tooltipFormatter}
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px',
                border: '1px solid #e2e8f0'
              }}
              cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              iconType="circle"
              iconSize={10}
            />
            <Bar 
              dataKey="Income" 
              fill="#10b981" /* Green */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="Expenses" 
              fill="#ef4444" /* Red */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={100}
            />
            <Bar 
              dataKey="Savings" 
              fill="#3b82f6" /* Blue */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner">
          <p className="text-gray-500 font-medium">No data available</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyChart;
