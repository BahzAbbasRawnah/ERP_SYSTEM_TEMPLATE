import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import SearchInput from '../ui/SearchInput';

const RecentSalesTable = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const salesData = [
    { name: 'Bamboo Watch', category: 'Accessories', price: '$65.00' },
    { name: 'Black Watch', category: 'Accessories', price: '$72.00' },
    { name: 'Blue Band', category: 'Fitness', price: '$79.00' },
    { name: 'Smart Phone', category: 'Electronics', price: '$299.00' },
    { name: 'Wireless Headphones', category: 'Electronics', price: '$149.00' }
  ];

  const filteredData = salesData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.recentSales.title')}
          </h3>
          <div className="flex items-center space-x-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={t('common.search')}
              className="w-48"
            />
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">
                  {t('dashboard.recentSales.name')}
                </th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">
                  {t('dashboard.recentSales.category')}
                </th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">
                  {t('dashboard.recentSales.price')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                  </td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default RecentSalesTable;