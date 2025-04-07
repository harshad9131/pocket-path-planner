
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useAuth } from '../contexts/AuthContext';

const Transactions = () => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch transactions from Supabase
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Failed to fetch transactions');
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });
  
  // Add transaction mutation
  const addTransactionMutation = useMutation({
    mutationFn: async (transaction) => {
      const { error } = await supabase
        .from('transactions')
        .insert([{
          ...transaction,
          user_id: user.id
        }]);
      
      if (error) {
        console.error('Error adding transaction:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction added successfully!');
      setIsAddFormVisible(false);
    },
    onError: (error) => {
      toast.error(`Failed to add transaction: ${error.message}`);
    }
  });
  
  // Update transaction mutation
  const updateTransactionMutation = useMutation({
    mutationFn: async (transaction) => {
      const { error } = await supabase
        .from('transactions')
        .update({
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', transaction.id);
      
      if (error) {
        console.error('Error updating transaction:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction updated successfully!');
      setIsEditFormVisible(false);
      setEditingTransaction(null);
    },
    onError: (error) => {
      toast.error(`Failed to update transaction: ${error.message}`);
    }
  });
  
  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting transaction:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete transaction: ${error.message}`);
    }
  });
  
  const handleAddTransaction = (transaction) => {
    addTransactionMutation.mutate(transaction);
  };
  
  const handleEditTransaction = (transaction) => {
    updateTransactionMutation.mutate(transaction);
  };
  
  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransactionMutation.mutate(id);
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
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <TransactionList 
            transactions={transactions} 
            onEdit={startEditTransaction} 
            onDelete={handleDeleteTransaction} 
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
