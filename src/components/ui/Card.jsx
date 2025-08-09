const Card = ({ 
  title, 
  subtitle, 
  children, 
  headerActions,
  className = '',
  padding = 'p-6',
  hover = false 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}>
      {(title || subtitle || headerActions) && (
        <div className={`border-b border-gray-200 dark:border-gray-700 ${padding} pb-4`}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center space-x-2">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={title || subtitle || headerActions ? padding : padding}>
        {children}
      </div>
    </div>
  );
};

export default Card;