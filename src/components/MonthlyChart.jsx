
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
    <div className="w-full h-full">
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
            barGap={2}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: 'var(--muted-foreground)' }}
              tick={{ fill: 'var(--muted-foreground)' }}
            />
            <YAxis 
              axisLine={{ stroke: 'var(--muted-foreground)' }}
              tick={{ fill: 'var(--muted-foreground)' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={tooltipFormatter}
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              iconType="circle"
            />
            <Bar 
              dataKey="Income" 
              fill="var(--success)" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
            />
            <Bar 
              dataKey="Expenses" 
              fill="var(--destructive)" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
            />
            <Bar 
              dataKey="Savings" 
              fill="var(--primary)" 
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
            />
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
