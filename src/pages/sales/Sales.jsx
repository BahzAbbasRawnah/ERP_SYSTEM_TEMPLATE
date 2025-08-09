import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Sales = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const salesData = [
    { id: '#12345', customer: 'John Doe', amount: '$299.00', status: 'completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', amount: '$149.00', status: 'pending', date: '2024-01-14' },
    { id: '#12347', customer: 'Mike Johnson', amount: '$89.00', status: 'cancelled', date: '2024-01-13' },
    { id: '#12348', customer: 'Sarah Wilson', amount: '$199.00', status: 'completed', date: '2024-01-12' }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {t(`sales.status.${status}`)}
      </span>
    );
  };

  const filteredData = salesData.filter(item =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.sales') }
  ];

  return (
    <DashboardLayout 
      title={t('sales.title')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2"></i>
            {t('common.export')}
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-2"></i>
            {t('sales.addSale')}
          </Button>
        </div>

        {/* Sales Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('sales.totalSales')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('sales.completedOrders')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('sales.pendingOrders')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-times-circle text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('sales.cancelledOrders')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sales Table */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('sales.recentSales')}
              </h3>
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder={t('common.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon="fas fa-search"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('sales.orderId')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('sales.customer')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('sales.amount')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('sales.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('sales.date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {sale.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {sale.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {sale.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(sale.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {sale.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 me-4">
                          {t('common.view')}
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          {t('common.delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Sales;