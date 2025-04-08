
import React, { useState } from 'react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { toast } from 'sonner';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
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
    alert(`Edit transaction ${id} (Functionality would be implemented here)`);
  };
  
  // Delete transaction handler
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    toast.success('Transaction deleted successfully');
  };
  
  // Load transactions from localStorage on component mount
  React.useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Transaction</h2>
          <TransactionForm 
            onSubmit={handleAddTransaction} 
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No transactions yet. Add your first transaction using the button above.
          </div>
        ) : (
          <TransactionList 
            transactions={transactions} 
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
