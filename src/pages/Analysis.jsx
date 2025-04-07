
import { useState, useEffect } from 'react';
import SpendingChart from '../components/SpendingChart';
import MonthlyChart from '../components/MonthlyChart';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { 
  formatCurrency, 
  calculateTotalByType, 
  groupByCategory, 
  generateMonthlyData,
} from '../lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const fetchTransactionsData = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
};

const fetchUsersData = async () => {
  const { data: { users }, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    console.error("Admin access required to view users");
    return [];
  }
  
  return users || [];
};

const Analysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('All Time');
  
  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactionsData
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsersData,
    onError: (error) => {
      console.error("Error fetching users:", error);
      // This will fail for non-admin users, which is expected
    }
  });
  
  useEffect(() => {
    if (transactions.length > 0) {
      const monthData = generateMonthlyData(transactions);
      setMonthlyData(monthData);
    }
  }, [transactions]);
  
  const getFilteredTransactions = () => {
    if (selectedMonth === 'All Time') {
      return transactions;
    }
    
    const currentDate = new Date();
    const selectedMonthIndex = new Date(Date.parse(`1 ${selectedMonth} ${currentDate.getFullYear()}`)).getMonth();
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === selectedMonthIndex;
    });
  };
  
  const filteredTransactions = getFilteredTransactions();
  const expensesByCategory = groupByCategory(filteredTransactions, 'expense');
  const incomeByCategory = groupByCategory(filteredTransactions, 'income');
  
  const totalIncome = calculateTotalByType(filteredTransactions, 'income');
  const totalExpenses = calculateTotalByType(filteredTransactions, 'expense');
  
  const months = [
    'All Time', 'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isAdmin = false; // In a real app, you would check if the user has admin privileges
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Spending Analysis</h1>
        <p className="text-gray-600">Visualize your spending patterns</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Monthly Overview</h2>
        </div>
        <MonthlyChart data={monthlyData} />
      </div>
      
      <div className="flex justify-end">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-2">Income Breakdown</h2>
          <p className="text-gray-600 mb-4">Total: {formatCurrency(totalIncome)}</p>
          <SpendingChart data={incomeByCategory} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-2">Expense Breakdown</h2>
          <p className="text-gray-600 mb-4">Total: {formatCurrency(totalExpenses)}</p>
          <SpendingChart data={expensesByCategory} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Budget vs Actual Spending</h2>
        {transactionsLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Budgeted</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Difference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(expensesByCategory).map(([category, amount]) => (
                  <TableRow key={category}>
                    <TableCell className="font-medium">{category}</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>{formatCurrency(amount)}</TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Set up your budget in the Budget page to see the comparison.</p>
          </div>
        )}
      </div>
      
      {isAdmin && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">User Management (Admin Only)</h2>
          {usersLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : users.length > 0 ? (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Sign In</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                      <TableCell>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">No users found or admin access required.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Analysis;
