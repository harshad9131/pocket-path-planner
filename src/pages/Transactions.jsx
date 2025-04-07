
import { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { getLocalStorageItem, setLocalStorageItem } from '../lib/utils';
import { initialTransactions } from '../lib/data';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const savedTransactions = getLocalStorageItem('transactions', initialTransactions);
    setTransactions(savedTransactions);
  }, []);
  
  const saveTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    setLocalStorageItem('transactions', newTransactions);
  };
  
  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(), // Simple way to generate unique IDs
    };
    
    const newTransactions = [...transactions, newTransaction];
    saveTransactions(newTransactions);
    
    setIsAddFormVisible(false);
    showSuccess('Transaction added successfully!');
  };
  
  const handleEditTransaction = (transaction) => {
    const updatedTransactions = transactions.map(t => 
      t.id === transaction.id ? transaction : t
    );
    
    saveTransactions(updatedTransactions);
    
    setIsEditFormVisible(false);
    setEditingTransaction(null);
    showSuccess('Transaction updated successfully!');
  };
  
  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const updatedTransactions = transactions.filter(t => t.id !== id);
      saveTransactions(updatedTransactions);
      showSuccess('Transaction deleted successfully!');
    }
  };
  
  const startEditTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setEditingTransaction(transaction);
      setIsEditFormVisible(true);
    }
  };
  
  const cancelEdit = () => {
    setIsEditFormVisible(false);
    setEditingTransaction(null);
  };
  
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-600">Manage your income and expenses</p>
        </div>
        <button
          onClick={() => setIsAddFormVisible(!isAddFormVisible)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center"
        >
          {isAddFormVisible ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Transaction
            </>
          )}
        </button>
      </div>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      {/* Add Form */}
      {isAddFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-medium mb-4">Add New Transaction</h2>
          <TransactionForm onSubmit={handleAddTransaction} />
        </div>
      )}
      
      {/* Edit Form */}
      {isEditFormVisible && editingTransaction && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-medium mb-4">Edit Transaction</h2>
          <TransactionForm 
            onSubmit={handleEditTransaction} 
            initialValues={editingTransaction}
            onCancel={cancelEdit}
          />
        </div>
      )}
      
      {/* Transactions List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">All Transactions</h2>
        <TransactionList 
          transactions={transactions} 
          onEdit={startEditTransaction} 
          onDelete={handleDeleteTransaction} 
        />
      </div>
    </div>
  );
};

export default Transactions;
