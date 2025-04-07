
import { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import SavingsGoalForm from '../components/SavingsGoalForm';
import { getLocalStorageItem, setLocalStorageItem } from '../lib/utils';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const savedGoals = getLocalStorageItem('goals', []);
    setGoals(savedGoals);
  }, []);
  
  const saveGoals = (newGoals) => {
    setGoals(newGoals);
    setLocalStorageItem('goals', newGoals);
  };
  
  const handleAddGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now(),
    };
    
    const newGoals = [...goals, newGoal];
    saveGoals(newGoals);
    
    setIsAddFormVisible(false);
    showSuccess('Savings goal added successfully!');
  };
  
  const handleEditGoal = (goal) => {
    const updatedGoals = goals.map(g => 
      g.id === goal.id ? goal : g
    );
    
    saveGoals(updatedGoals);
    
    setIsEditFormVisible(false);
    setEditingGoal(null);
    showSuccess('Savings goal updated successfully!');
  };
  
  const handleDeleteGoal = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      const updatedGoals = goals.filter(g => g.id !== id);
      saveGoals(updatedGoals);
      showSuccess('Savings goal deleted successfully!');
    }
  };
  
  const startEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsEditFormVisible(true);
  };
  
  const cancelEdit = () => {
    setIsEditFormVisible(false);
    setEditingGoal(null);
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
          <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
          <p className="text-gray-600">Track your progress toward financial goals</p>
        </div>
        <button
          onClick={() => {
            setIsAddFormVisible(!isAddFormVisible);
            setIsEditFormVisible(false);
            setEditingGoal(null);
          }}
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
              Add Goal
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
          <h2 className="text-lg font-medium mb-4">Create New Savings Goal</h2>
          <SavingsGoalForm onSave={handleAddGoal} />
        </div>
      )}
      
      {/* Edit Form */}
      {isEditFormVisible && editingGoal && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="text-lg font-medium mb-4">Edit Savings Goal</h2>
          <SavingsGoalForm 
            onSave={handleEditGoal} 
            initialGoal={editingGoal}
          />
        </div>
      )}
      
      {/* Goals List */}
      {goals.length === 0 && !isAddFormVisible ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center justify-center" style={{ minHeight: '300px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-500 mb-2">No Savings Goals Yet</h3>
          <p className="text-gray-500 mb-6">Create your first savings goal to track your progress</p>
          <button
            onClick={() => setIsAddFormVisible(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Create Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal}
              onEdit={startEditGoal}
              onDelete={handleDeleteGoal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Goals;
