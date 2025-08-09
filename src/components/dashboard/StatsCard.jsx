import { cn } from '../../utils/cn';

const StatsCard = ({ title, value, icon, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-100',
    orange: 'from-orange-500 to-orange-600 text-orange-100',
    purple: 'from-purple-500 to-purple-600 text-purple-100',
    gray: 'from-gray-500 to-gray-600 text-gray-100',
    green: 'from-green-500 to-green-600 text-green-100',
    red: 'from-red-500 to-red-600 text-red-100'
  };

  const trendIcon = trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
  const trendColor = trend === 'up' ? 'text-green-200' : 'text-red-200';

  return (
    <div className={cn(
      'bg-gradient-to-r overflow-hidden shadow-sm rounded-lg p-6 text-white',
      colorClasses[color] || colorClasses.blue
    )}>
      <div className="flex items-center justify-between">
        <div>
          <dt className={cn('text-sm font-medium truncate', colorClasses[color]?.replace('text-', 'text-').replace('-100', '-200'))}>
            {title}
          </dt>
          <dd className="text-2xl font-bold text-white flex items-center">
            {value}
            <i className={cn('ltr:ml-2 rtl:mr-2', trendIcon, trendColor)}></i>
          </dd>
        </div>
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center',
          `bg-${color}-400/30`
        )}>
          <i className={cn(icon, 'text-white text-xl')}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;