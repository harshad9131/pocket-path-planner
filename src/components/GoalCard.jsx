
import { formatCurrency } from '../lib/utils';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const progressPercentage = (goal.progress / goal.totalAmount) * 100;
  const remaining = goal.totalAmount - goal.progress;
  
  // Calculate days remaining
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  
  // Calculate monthly savings needed
  const monthsRemaining = Math.max(Math.ceil(daysRemaining / 30), 1);
  const monthlySavingsNeeded = remaining / monthsRemaining;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          onClick={() => onEdit(goal)} 
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button 
          onClick={() => onDelete(goal.id)} 
          className="text-gray-500 hover:text-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
      
      <h3 className="text-lg font-medium mb-4">{goal.name}</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{formatCurrency(goal.progress)} of {formatCurrency(goal.totalAmount)}</span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Days Remaining</p>
            <p className="font-medium">{daysRemaining > 0 ? daysRemaining : 'Overdue'}</p>
          </div>
          <div>
            <p className="text-gray-500">Deadline</p>
            <p className="font-medium">{deadline.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Remaining</p>
            <p className="font-medium">{formatCurrency(remaining)}</p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Need</p>
            <p className="font-medium">{formatCurrency(monthlySavingsNeeded)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
