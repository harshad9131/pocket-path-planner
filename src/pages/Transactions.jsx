
import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { toast } from 'sonner';
import { PlusCircle, ListFilter, ArrowUpDown, RefreshCw, FileDown } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'
  const [sort, setSort] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'
  const [isLoading, setIsLoading] = useState(true);
  
  // Add a new transaction
  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(), // Simple way to generate unique IDs
    };
    
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    setShowForm(false);
    toast.success('Transaction added successfully');
    
    // Save to localStorage
    const updatedTransactions = [...transactions, newTransaction];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };
  
  // Edit transaction handler
  const handleEditTransaction = (id) => {
    toast.info(`Edit functionality would be implemented here for transaction ${id}`);
  };
  
  // Delete transaction handler
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    toast.success('Transaction deleted successfully');
  };
  
  // Load transactions from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    setTimeout(() => setIsLoading(false), 500); // Simulate loading for smoother UI
  }, []);

  // Filter and sort transactions
  const getFilteredAndSortedTransactions = () => {
    let filtered = [...transactions];
    
    // Apply filter
    if (filter === 'income') {
      filtered = filtered.filter(t => t.type === 'income');
    } else if (filter === 'expense') {
      filtered = filtered.filter(t => t.type === 'expense');
    }
    
    // Apply sort
    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === 'highest') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sort === 'lowest') {
      filtered.sort((a, b) => a.amount - b.amount);
    }
    
    return filtered;
  };

  const exportTransactions = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'transactions.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Transactions exported successfully');
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <div className="flex flex-wrap gap-2">
          <button 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {showForm ? 'Cancel' : 'Add Transaction'}
          </button>
          
          <button
            onClick={exportTransactions}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
          >
            <FileDown className="mr-2 h-5 w-5" />
            Export
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Transaction</h2>
          <TransactionForm 
            onSubmit={handleAddTransaction} 
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : getFilteredAndSortedTransactions().length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm mt-2">Add your first transaction using the button above.</p>
          </div>
        ) : (
          <TransactionList 
            transactions={getFilteredAndSortedTransactions()} 
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
