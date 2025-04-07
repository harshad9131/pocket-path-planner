
// Mock data for initial development
// In a real app, this would be stored in a database
export const initialTransactions = [
  {
    id: 1,
    date: "2025-04-01",
    description: "Salary",
    amount: 3000,
    type: "income",
    category: "Salary"
  },
  {
    id: 2,
    date: "2025-04-02",
    description: "Rent",
    amount: 1200,
    type: "expense",
    category: "Housing"
  },
  {
    id: 3,
    date: "2025-04-03",
    description: "Groceries",
    amount: 150,
    type: "expense",
    category: "Food"
  },
  {
    id: 4,
    date: "2025-04-05",
    description: "Freelance Work",
    amount: 500,
    type: "income",
    category: "Side Gig"
  },
  {
    id: 5,
    date: "2025-04-10",
    description: "Utilities",
    amount: 200,
    type: "expense",
    category: "Utilities"
  }
];

export const categories = {
  income: ["Salary", "Investments", "Side Gig", "Gifts", "Other Income"],
  expense: ["Housing", "Food", "Transportation", "Utilities", "Entertainment", "Healthcare", "Debt Payment", "Personal Care", "Education", "Shopping", "Other Expenses"]
};

export const chartColors = [
  "#38BDF8", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#A3E635", // Lime
  "#D946EF", // Fuchsia
  "#0EA5E9", // Sky
];
