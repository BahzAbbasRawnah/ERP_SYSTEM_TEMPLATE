import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const QuarterGoals = () => {
  const { t } = useTranslation();

  const goals = [
    { name: 'T-Shirt', value: 89, color: 'bg-cyan-500' },
    { name: 'Controller', value: 23, color: 'bg-orange-500' },
    { name: 'Phone Case', value: 134, color: 'bg-pink-500' },
    { name: 'Purple Band', value: 42, color: 'bg-purple-500' },
    { name: 'Blue Band', value: 63, color: 'bg-blue-500' }
  ];

  const totalGoal = 2500;
  const currentProgress = 2125;
  const progressPercentage = Math.round((currentProgress / totalGoal) * 100);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.goals.quarterGoals')}
          </h3>
          <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{progressPercentage}% ({currentProgress}/{totalGoal})</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 via-orange-500 via-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Goal Items */}
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${goal.color} rounded-full ltr:mr-3 rtl:ml-3`}></div>
                <span className="text-sm text-gray-900 dark:text-white">{goal.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuarterGoals;