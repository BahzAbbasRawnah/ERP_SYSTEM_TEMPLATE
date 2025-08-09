import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Select from '../../components/ui/Select';

const Orders = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  
  const breadcrumbs = [
    { label: t('Sales'), href: '/sales' },
    { label: t('Orders') }
  ];

  const ordersData = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'ABC Company',
      date: '2024-01-15',
      status: 'Pending',
      total: '$2,500.00'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'XYZ Corp',
      date: '2024-01-14',
      status: 'Completed',
      total: '$1,800.00'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Tech Solutions',
      date: '2024-01-13',
      status: 'Processing',
      total: '$3,200.00'
    }
  ];

  const columns = [
    {
      key: 'orderNumber',
      header: t('Order #'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'customer',
      header: t('Customer'),
      sortable: true
    },
    {
      key: 'date',
      header: t('Date'),
      sortable: true
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Pending', label: t('Pending') },
        { value: 'Processing', label: t('Processing') },
        { value: 'Completed', label: t('Completed') },
        { value: 'Cancelled', label: t('Cancelled') }
      ],
      render: (value) => {
        const statusColors = {
          'Pending': 'badge-warning',
          'Processing': 'badge-info',
          'Completed': 'badge-success',
          'Cancelled': 'badge-danger'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    },
    {
      key: 'total',
      header: t('Total'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    }
  ];

  const actions = [
    {
      label: t('Edit'),
      onClick: (row) => console.log('Edit', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: t('Delete'),
      onClick: (row) => console.log('Delete', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title={t('Orders')} breadcrumbs={breadcrumbs}>
      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Total Orders')}</dt>
              <dd className="text-2xl font-bold text-white">156</dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-file-invoice text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('Order Value')}</dt>
              <dd className="text-2xl font-bold text-white">$45,230</dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-orange-100 truncate">{t('Pending Orders')}</dt>
              <dd className="text-2xl font-bold text-white">23</dd>
            </div>
            <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mb-6">
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download me-1" />
            {t('Export')}
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus me-1" />
            {t('New Order')}
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable
        data={ordersData}
        columns={columns}
        actions={actions}
        searchable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
      />

      {/* New Order Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all w-full max-w-4xl">
              <div className="bg-primary-500 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{t('New Order')}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl" />
                </button>
              </div>
              
              <div className="px-6 py-4">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('Order Number')}
                      </label>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Auto-generated" 
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('Date')}
                      </label>
                      <input type="date" className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('Customer')}
                      </label>
                      <Select
                        placeholder={t('Select Customer')}
                        options={[
                          { value: 'abc-company', label: 'ABC Company' },
                          { value: 'xyz-corp', label: 'XYZ Corp' },
                          { value: 'tech-solutions', label: 'Tech Solutions' }
                        ]}
                        onChange={(value) => console.log('Customer selected:', value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('Status')}
                      </label>
                      <Select
                        options={[
                          { value: 'pending', label: t('Pending') },
                          { value: 'processing', label: t('Processing') },
                          { value: 'completed', label: t('Completed') },
                          { value: 'cancelled', label: t('Cancelled') }
                        ]}
                        value="pending"
                        onChange={(value) => console.log('Status selected:', value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('Reference')}
                      </label>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder={t('Reference number')} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('Notes')}
                    </label>
                    <textarea 
                      className="input-field" 
                      rows="3" 
                      placeholder={t('Additional notes (optional)')}
                    />
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  {t('Cancel')}
                </button>
                <button className="btn-primary">
                  {t('Save Order')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Orders;