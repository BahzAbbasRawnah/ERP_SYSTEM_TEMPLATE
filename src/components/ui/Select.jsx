import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select option...',
  searchable = false,
  disabled = false,
  className = '',
  label,
  error,
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

  const selectedOption = options.find(option => option.value === value);

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
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (searchable && !isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
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
            'w-full h-[42px] px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 cursor-pointer transition-colors',
            'border-gray-300 dark:border-gray-600',
            'hover:border-gray-400 dark:hover:border-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-red-500 dark:border-red-400',
            isOpen && 'ring-2 ring-primary-500 border-primary-500'
          )}
        >
          <div className="flex items-center justify-between">
            <span className={cn(
              'block truncate',
              selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            )}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <i className={cn(
              'fas fa-chevron-down transition-transform duration-200',
              'text-gray-400 dark:text-gray-500',
              isOpen && 'rotate-180'
            )} />
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
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'px-3 py-2 cursor-pointer transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-600',
                      option.value === value && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="block truncate">{option.label}</span>
                      {option.value === value && (
                        <i className="fas fa-check text-primary-600 dark:text-primary-400" />
                      )}
                    </div>
                  </div>
                ))
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

export default Select;