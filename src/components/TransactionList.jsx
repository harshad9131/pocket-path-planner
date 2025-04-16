
import React from 'react';
import { formatCurrency } from '../lib/utils';
import { Edit, Trash2, Calendar, Tag, FileText } from 'lucide-react';
import './TransactionList.css';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
            <th className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              Date
            </th>
            <th className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-gray-500" />
              Description
            </th>
            <th className="flex items-center gap-1">
              <Tag className="h-4 w-4 text-gray-500" />
              Category
            </th>
            <th>Amount</th>
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={onEdit || onDelete ? 5 : 4} className="empty-message">No transactions found</td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-blue-50 transition-colors">
                <td>{transaction.date}</td>
                <td className="max-w-xs truncate">{transaction.description}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {transaction.category}
                  </span>
                </td>
                <td className={transaction.type === 'income' ? 'transaction-income' : 'transaction-expense'}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </td>
                {(onEdit || onDelete) && (
                  <td>
                    <div className="action-buttons">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(transaction.id)} 
                          className="edit-button p-1 hover:bg-blue-100 rounded-full transition-colors"
                          title="Edit transaction"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(transaction.id)} 
                          className="delete-button p-1 hover:bg-red-100 rounded-full transition-colors"
                          title="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
