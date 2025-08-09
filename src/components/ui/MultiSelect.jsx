import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options...',
  searchable = true,
  disabled = false,
  className = '',
  label,
  error,
  maxDisplay = 3,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOptions = options.filter(option => value.includes(option.value));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    const newValue = value.includes(option.value)
      ? value.filter(v => v !== option.value)
      : [...value, option.value];
    onChange(newValue);
  };

  const handleRemove = (optionValue, e) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (searchable && !isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange([]);
  };

  const renderSelectedItems = () => {
    if (selectedOptions.length === 0) {
      return (
        <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
      );
    }

    if (selectedOptions.length <= maxDisplay) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
            >
              {option.label}
              <button
                onClick={(e) => handleRemove(option.value, e)}
                className="ml-1 hover:text-primary-600 dark:hover:text-primary-300"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {selectedOptions.slice(0, maxDisplay).map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200"
            >
              {option.label}
              <button
                onClick={(e) => handleRemove(option.value, e)}
                className="ml-1 hover:text-primary-600 dark:hover:text-primary-300"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          +{selectedOptions.length - maxDisplay} more
        </span>
      </div>
    );
  };

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <div
          onClick={handleToggle}
          className={cn(
            'w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 cursor-pointer transition-colors min-h-[42px]',
            'border-gray-300 dark:border-gray-600',
            'hover:border-gray-400 dark:hover:border-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-red-500 dark:border-red-400',
            isOpen && 'ring-2 ring-primary-500 border-primary-500'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {renderSelectedItems()}
            </div>
            <div className="flex items-center gap-2 ml-2">
              {selectedOptions.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <i className="fas fa-times text-sm" />
                </button>
              )}
              <i className={cn(
                'fas fa-chevron-down transition-transform duration-200',
                'text-gray-400 dark:text-gray-500',
                isOpen && 'rotate-180'
              )} />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        'px-3 py-2 cursor-pointer transition-colors',
                        'hover:bg-gray-100 dark:hover:bg-gray-600',
                        isSelected && 'bg-primary-50 dark:bg-primary-900/20'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          'block truncate',
                          isSelected && 'text-primary-600 dark:text-primary-400'
                        )}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <i className="fas fa-check text-primary-600 dark:text-primary-400" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default MultiSelect;