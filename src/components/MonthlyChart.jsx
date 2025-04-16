
import React, { useEffect, useRef } from 'react';
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

  const containerRef = useRef(null);

  return (
    <div className="w-full h-[350px] relative" ref={containerRef}>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            barGap={2}
            barSize={20}
            animationDuration={800}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: 'var(--muted-foreground)' }}
              tick={{ fill: 'var(--muted-foreground)' }}
              tickMargin={10}
            />
            <YAxis 
              axisLine={{ stroke: 'var(--muted-foreground)' }}
              tick={{ fill: 'var(--muted-foreground)' }}
              tickFormatter={(value) => `$${value}`}
              width={70}
              tickMargin={8}
            />
            <Tooltip 
              formatter={tooltipFormatter}
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                padding: '10px'
              }}
              cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 10 }}
              iconType="circle"
              iconSize={10}
            />
            <Bar 
              dataKey="Income" 
              fill="#22c55e" /* Green */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease"
            />
            <Bar 
              dataKey="Expenses" 
              fill="#ef4444" /* Red */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease"
              animationBegin={100}
            />
            <Bar 
              dataKey="Savings" 
              fill="#0ea5e9" /* Blue */
              radius={[4, 4, 0, 0]} 
              className="hover:opacity-90 transition-opacity"
              animationDuration={1500}
              animationEasing="ease"
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyChart;
