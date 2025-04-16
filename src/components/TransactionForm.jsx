
import { useState, useEffect } from 'react';
import { categories } from '../lib/data';
import { Calendar, DollarSign, FileText, Tag, CircleCheck, X } from 'lucide-react';

const TransactionForm = ({ onSubmit, initialValues = null, onCancel }) => {
  const [transaction, setTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food'
  });

  useEffect(() => {
    if (initialValues) {
      setTransaction(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
    
    // Update category options when type changes
    if (name === 'type') {
      setTransaction(prev => ({ 
        ...prev, 
        [name]: value,
        category: categories[value][0] // Set to first category of the selected type
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount)
    };
    
    onSubmit(formattedTransaction);
    
    // Reset form if not editing
    if (!initialValues) {
      setTransaction({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
          <FileText className="h-4 w-4 mr-1 text-gray-500" />
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={transaction.description}
          onChange={handleChange}
          required
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="e.g. Grocery shopping, Salary payment"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 flex items-center">
            <Tag className="h-4 w-4 mr-1 text-gray-500" />
            Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={transaction.type === 'expense'}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={transaction.type === 'income'}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Income</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 flex items-center">
            <Tag className="h-4 w-4 mr-1 text-gray-500" />
            Category
          </label>
          <select
            id="category"
            name="category"
            value={transaction.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {categories[transaction.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <X className="mr-2 h-4 w-4 text-gray-500" />
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <CircleCheck className="mr-2 h-4 w-4" />
          {initialValues ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
