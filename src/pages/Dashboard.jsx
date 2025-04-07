
import { useState, useEffect } from 'react';
import FinancialCard from '../components/FinancialCard';
import TransactionList from '../components/TransactionList';
import MonthlyChart from '../components/MonthlyChart';
import { 
  calculateBalance, 
  calculateTotalByType,
  formatCurrency,
  generateMonthlyData,
  getLocalStorageItem
} from '../lib/utils';
import { initialTransactions } from '../lib/data';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  
  useEffect(() => {
    const savedTransactions = getLocalStorageItem('transactions', initialTransactions);
    setTransactions(savedTransactions);
    
    const monthData = generateMonthlyData(savedTransactions);
    setMonthlyData(monthData);
  }, []);

  // Calculate financial metrics
  const balance = calculateBalance(transactions);
  const totalIncome = calculateTotalByType(transactions, 'income');
  const totalExpenses = calculateTotalByType(transactions, 'expense');
  
  // Get recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your financial situation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialCard
          title="Current Balance"
          value={formatCurrency(balance)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          }
        />
        
        <FinancialCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          trend="up"
          trendValue="2.3%"
        />
        
        <FinancialCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
            </svg>
          }
          trend="down"
          trendValue="1.5%"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Monthly Overview</h2>
          <MonthlyChart data={monthlyData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
          <TransactionList 
            transactions={recentTransactions} 
            onEdit={() => {}} 
            onDelete={() => {}}
          />
          {transactions.length > 5 && (
            <div className="mt-4 text-center">
              <a 
                href="/transactions" 
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                View All Transactions
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
