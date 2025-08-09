const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive',
  icon, 
  gradient = 'from-blue-500 to-blue-600',
  className = '' 
}) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} overflow-hidden shadow-sm rounded-lg p-6 text-white ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <dt className="text-sm font-medium text-white/80 truncate">{title}</dt>
          <dd className="text-2xl font-bold text-white flex items-center">
            {value}
            {change && (
              <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'} ml-2 text-white/60`} />
            )}
          </dd>
          {change && (
            <div className="text-xs text-white/70 mt-1">
              {change}
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <i className={`${icon} text-white text-xl`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;