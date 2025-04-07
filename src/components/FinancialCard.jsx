
import { cn } from "../lib/utils";

const FinancialCard = ({ title, value, icon, trend, trendValue, className }) => {
  const isTrendPositive = trend === "up";
  const trendColor = isTrendPositive ? "text-success" : "text-destructive";
  
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-sm border", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-500">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      
      <div className="flex items-end space-x-2">
        <p className="text-2xl font-bold">{value}</p>
        
        {trend && (
          <div className={cn("flex items-center text-sm", trendColor)}>
            {isTrendPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialCard;
