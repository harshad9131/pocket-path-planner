
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { chartColors } from '../lib/data';

const SpendingChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([category, amount], index) => ({
      name: category,
      value: amount,
      fill: chartColors[index % chartColors.length]
    }))
    .sort((a, b) => b.value - a.value); // Sort by value (largest first)
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null; // Only show label if segment is large enough
  };

  const tooltipFormatter = (value) => {
    return [`$${value.toFixed(2)}`, 'Amount'];
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              innerRadius="40%"
              paddingAngle={2}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
              animationBegin={200}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  className="drop-shadow-lg hover:opacity-90 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={tooltipFormatter} 
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px',
                border: '1px solid #e2e8f0'
              }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              iconSize={12}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner">
          <p className="text-gray-500 font-medium">No data available</p>
        </div>
      )}
    </div>
  );
};

export default SpendingChart;
