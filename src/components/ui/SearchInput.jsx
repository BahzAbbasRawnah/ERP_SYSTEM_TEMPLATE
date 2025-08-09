import { useState } from 'react';
import { cn } from '../../utils/cn';

const SearchInput = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className={cn(
          'fas fa-search text-sm transition-colors',
          isFocused ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
        )} />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full h-[42px] pl-10 pr-10 border rounded-lg transition-colors',
          'bg-white dark:bg-gray-700',
          'border-gray-300 dark:border-gray-600',
          'text-gray-900 dark:text-white',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'hover:border-gray-400 dark:hover:border-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          disabled && 'opacity-50 cursor-not-allowed',
          isFocused && 'ring-2 ring-primary-500 border-primary-500'
        )}
        {...props}
      />
      
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          type="button"
        >
          <i className="fas fa-times text-sm" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;