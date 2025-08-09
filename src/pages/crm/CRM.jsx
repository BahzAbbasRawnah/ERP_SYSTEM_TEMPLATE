import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CRM = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const customersData = [
    { id: 'CUS001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'active', totalOrders: 15, totalSpent: '$2,450' },
    { id: 'CUS002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', status: 'active', totalOrders: 8, totalSpent: '$1,200' },
    { id: 'CUS003', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', status: 'inactive', totalOrders: 3, totalSpent: '$450' },
    { id: 'CUS004', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1234567893', status: 'active', totalOrders: 22, totalSpent: '$3,800' }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {t(`crm.status.${status}`)}
      </span>
    );
  };

  const filteredData = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.crm') }
  ];

  return (
    <DashboardLayout 
      title={t('crm.title')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')}
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            {t('crm.addCustomer')}
          </Button>
        </div>

        {/* CRM Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('crm.totalCustomers')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user-check text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">987</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('crm.activeCustomers')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user-plus text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('crm.newCustomers')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-dollar-sign text-white text-xl"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$45,678</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('crm.totalRevenue')}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Customers Table */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {t('crm.customerList')}
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
                      {t('crm.customerId')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('crm.customerName')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('crm.email')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('crm.phone')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('crm.totalOrders')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('crm.totalSpent')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {customer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {customer.totalSpent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(customer.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 ltr:mr-4 rtl:ml-4">
                          {t('common.view')}
                        </button>
                        <button className="text-primary-600 hover:text-primary-900 ltr:mr-4 rtl:ml-4">
                          {t('common.edit')}
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

export default CRM;