import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';

const InventoryManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('stock');
  
  const breadcrumbs = [
    { label: t('Inventory'), href: '/inventory' }
  ];

  const stockData = [
    {
      id: 1,
      product: 'Wireless Headphones',
      sku: 'WH-001',
      category: 'Electronics',
      currentStock: 156,
      minStock: 20,
      status: 'In Stock'
    },
    {
      id: 2,
      product: 'Cotton T-Shirt',
      sku: 'TS-002',
      category: 'Clothing',
      currentStock: 23,
      minStock: 50,
      status: 'Low Stock'
    },
    {
      id: 3,
      product: 'Laptop Stand',
      sku: 'LS-003',
      category: 'Electronics',
      currentStock: 0,
      minStock: 10,
      status: 'Out of Stock'
    }
  ];

  const stockColumns = [
    {
      key: 'product',
      header: t('Product'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
            <i className="fas fa-box text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'sku',
      header: t('SKU'),
      sortable: true
    },
    {
      key: 'currentStock',
      header: t('Current Stock'),
      sortable: true,
      render: (value, row) => {
        const color = value === 0 ? 'text-red-600' : value <= row.minStock ? 'text-yellow-600' : 'text-green-600';
        return <span className={`font-medium ${color}`}>{value}</span>;
      }
    },
    {
      key: 'minStock',
      header: t('Min Stock'),
      sortable: true
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'In Stock', label: t('In Stock') },
        { value: 'Low Stock', label: t('Low Stock') },
        { value: 'Out of Stock', label: t('Out of Stock') }
      ],
      render: (value) => {
        const statusColors = {
          'In Stock': 'badge-success',
          'Low Stock': 'badge-warning',
          'Out of Stock': 'badge-danger'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    }
  ];

  const stockActions = [
    {
      label: t('Adjust'),
      onClick: (row) => console.log('Adjust stock', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: t('Transfer'),
      onClick: (row) => console.log('Transfer', row),
      className: 'text-blue-600 hover:text-blue-900'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stock':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-4 border-l-4 border-red-500">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t('Stock Alerts')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Cotton T-Shirt</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">23 left</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Laptop Stand</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">0 left</span>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t('Recent Stock Movements')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-plus text-green-600 dark:text-green-400 text-xs" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Wireless Headphones</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Stock In</div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">+50</span>
                  </div>
                </div>
              </div>
            </div>

            <DataTable
              data={stockData}
              columns={stockColumns}
              actions={stockActions}
              searchable={true}
              filterable={true}
              paginated={true}
              pageSize={10}
            />
          </div>
        );
      case 'products':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Product Inventory')}</h3>
              <button className="btn-primary">
                <i className="fas fa-plus me-1" />
                {t('Add Product')}
              </button>
            </div>
            <DataTable
              data={stockData}
              columns={stockColumns}
              actions={stockActions}
              searchable={true}
              filterable={true}
              paginated={true}
              pageSize={10}
            />
          </div>
        );
      case 'transfers':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Stock Transfers')}</h3>
              <button className="btn-primary">
                <i className="fas fa-plus me-1" />
                {t('New Transfer')}
              </button>
            </div>
            <DataTable
              data={[]}
              columns={[
                { key: 'transferId', header: t('Transfer ID'), sortable: true },
                { key: 'product', header: t('Product'), sortable: true },
                { key: 'quantity', header: t('Quantity'), sortable: true }
              ]}
              searchable={true}
              paginated={true}
              pageSize={10}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title={t('Inventory Management')} breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Total Products')}</dt>
              <dd className="text-2xl font-bold text-white">1,247</dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-cubes text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('In Stock')}</dt>
              <dd className="text-2xl font-bold text-white">892</dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-yellow-100 truncate">{t('Low Stock')}</dt>
              <dd className="text-2xl font-bold text-white">45</dd>
            </div>
            <div className="w-12 h-12 bg-yellow-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-red-100 truncate">{t('Out of Stock')}</dt>
              <dd className="text-2xl font-bold text-white">23</dd>
            </div>
            <div className="w-12 h-12 bg-red-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-times-circle text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stock')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stock'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-warehouse me-1" />
              {t('Stock Overview')}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-box me-1" />
              {t('Products')}
            </button>
            <button
              onClick={() => setActiveTab('transfers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transfers'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-exchange-alt me-1" />
              {t('Transfers')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;