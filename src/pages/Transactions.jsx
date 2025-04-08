
import React, { useState } from 'react';
import TransactionList from '../components/TransactionList';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  
  // Simple handlers for editing and deleting transactions
  const handleEditTransaction = (id) => {
    alert(`Edit transaction ${id} (Functionality would be implemented here)`);
  };
  
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Transaction
        </button>
      </div>
      
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
