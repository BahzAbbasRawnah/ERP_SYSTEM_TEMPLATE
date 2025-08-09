const GridLayout = ({ 
  columns = 1, 
  gap = 'gap-6', 
  responsive = true,
  children, 
  className = '' 
}) => {
  const getGridCols = () => {
    if (!responsive) {
      return `grid-cols-${columns}`;
    }
    
    // Responsive grid classes
    const responsiveClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      12: 'grid-cols-12'
    };
    
    return responsiveClasses[columns] || `grid-cols-${columns}`;
  };

  return (
    <div className={`grid ${getGridCols()} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default GridLayout;