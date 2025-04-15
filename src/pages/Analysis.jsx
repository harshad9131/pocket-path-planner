
import React, { useState, useEffect } from 'react';
import MonthlyChart from '../components/MonthlyChart';
import SpendingChart from '../components/SpendingChart';
import { Download, RefreshCw } from 'lucide-react';

const Analysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('all'); // 'all', '6months', '3months'

  useEffect(() => {
    loadTransactionData();
  }, [period]);

  const loadTransactionData = () => {
    setIsLoading(true);
    
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const transactions = JSON.parse(savedTransactions);
      
      // Filter transactions based on selected period
      const filteredTransactions = filterTransactionsByPeriod(transactions, period);
      
      // Group transactions by month
      const monthlyDataMap = {};
      const categoryDataMap = {};
      
      filteredTransactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        // Monthly data processing
        if (!monthlyDataMap[month]) {
          monthlyDataMap[month] = { income: 0, expense: 0, savings: 0 };
        }
        
        if (transaction.type === 'income') {
          monthlyDataMap[month].income += transaction.amount;
        } else {
          monthlyDataMap[month].expense += transaction.amount;
        }
        
        // Calculate savings
        monthlyDataMap[month].savings = monthlyDataMap[month].income - monthlyDataMap[month].expense;
        
        // Category data processing (for expense categories)
        if (transaction.type === 'expense' && transaction.category) {
          if (!categoryDataMap[transaction.category]) {
            categoryDataMap[transaction.category] = 0;
          }
          categoryDataMap[transaction.category] += transaction.amount;
        }
      });
      
      setMonthlyData(monthlyDataMap);
      setCategoryData(categoryDataMap);
    }
    
    setIsLoading(false);
  };

  const filterTransactionsByPeriod = (transactions, selectedPeriod) => {
    if (selectedPeriod === 'all') return transactions;
    
    const now = new Date();
    const monthsToSubtract = selectedPeriod === '3months' ? 3 : 6;
    const cutoffDate = new Date(now.setMonth(now.getMonth() - monthsToSubtract));
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= cutoffDate;
    });
  };

  const handleRefresh = () => {
    loadTransactionData();
  };

  const handleExportData = () => {
    // Prepare the data to export
    const exportData = {
      monthlyAnalysis: monthlyData,
      categoryAnalysis: categoryData,
      exportDate: new Date().toISOString(),
    };
    
    // Convert to JSON string
    const dataStr = JSON.stringify(exportData, null, 2);
    
    // Create a download link
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileName = 'financial-analysis-' + new Date().toISOString().split('T')[0] + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Financial Analysis</h1>
        
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setPeriod('all')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                period === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200`}
            >
              All Time
            </button>
            <button
              type="button"
              onClick={() => setPeriod('6months')}
              className={`px-4 py-2 text-sm font-medium ${
                period === '6months' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border-t border-b border-gray-200`}
            >
              6 Months
            </button>
            <button
              type="button"
              onClick={() => setPeriod('3months')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                period === '3months' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200`}
            >
              3 Months
            </button>
          </div>
          
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          
          <button
            onClick={handleExportData}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-success rounded-lg hover:bg-success/90 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
          <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
            Monthly Overview
            <span className="ml-2 text-xs font-normal text-gray-500">
              {period === 'all' ? 'All time' : period === '3months' ? 'Last 3 months' : 'Last 6 months'}
            </span>
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="text-gray-500 mt-4">Loading your financial data...</p>
              </div>
            </div>
          ) : Object.keys(monthlyData).length > 0 ? (
            <div className="h-80">
              <MonthlyChart data={monthlyData} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No data available for this period.</p>
              <p className="text-sm text-gray-400">Add transactions to see your monthly analysis.</p>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
          <h2 className="text-lg font-medium mb-4 text-gray-800">Expense Categories</h2>
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <p className="text-gray-500 mt-4">Loading your expense data...</p>
              </div>
            </div>
          ) : Object.keys(categoryData).length > 0 ? (
            <div className="h-64">
              <SpendingChart data={categoryData} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No expense categories found for this period.</p>
              <p className="text-sm text-gray-400">Add categorized transactions to see your spending patterns.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-4 text-gray-800">Financial Insights</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : Object.keys(monthlyData).length > 0 ? (
          <div className="space-y-4">
            {calculateInsights()}
          </div>
        ) : (
          <p className="text-gray-500">Add more transactions to see insights about your financial habits.</p>
        )}
      </div>
    </div>
  );

  function calculateInsights() {
    // This is a placeholder for actual financial insights logic
    // In a real app, you would analyze the data and provide meaningful insights
    const insights = [];
    
    // Calculate total income and expenses
    let totalIncome = 0;
    let totalExpenses = 0;
    
    Object.values(monthlyData).forEach(month => {
      totalIncome += month.income;
      totalExpenses += month.expense;
    });
    
    // Calculate savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    // Add insights based on the data
    insights.push(
      <div key="savings-rate" className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800">Savings Rate</h3>
        <p className="text-blue-600">
          Your current savings rate is <strong>{savingsRate.toFixed(1)}%</strong> 
          {savingsRate >= 20 
            ? " – Great job! You're saving a healthy portion of your income."
            : savingsRate >= 10
              ? " – You're on the right track. Aim for 20% or more for long-term financial health."
              : " – Consider finding ways to increase your savings rate to at least 10-20% of your income."}
        </p>
      </div>
    );
    
    // Add insight about largest expense category if we have category data
    if (Object.keys(categoryData).length > 0) {
      const largestCategory = Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0];
      const percentage = (largestCategory[1] / totalExpenses) * 100;
      
      insights.push(
        <div key="largest-expense" className="p-4 bg-amber-50 rounded-lg">
          <h3 className="font-medium text-amber-800">Largest Expense Category</h3>
          <p className="text-amber-600">
            Your largest expense category is <strong>{largestCategory[0]}</strong>, 
            accounting for <strong>{percentage.toFixed(1)}%</strong> of your total expenses.
            {percentage > 30 
              ? " Consider if you can reduce spending in this category."
              : " This appears to be a reasonable proportion of your budget."}
          </p>
        </div>
      );
    }
    
    // Add a general insight based on months with data
    if (Object.keys(monthlyData).length > 1) {
      insights.push(
        <div key="spending-trend" className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">Spending Trends</h3>
          <p className="text-green-600">
            You have financial data for {Object.keys(monthlyData).length} months. 
            Consistent tracking is the first step to financial success!
          </p>
        </div>
      );
    }
    
    return insights;
  }
};

export default Analysis;
