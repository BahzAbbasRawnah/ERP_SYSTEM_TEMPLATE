import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Inventory = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('stock');
  const [showStockModal, setShowStockModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.inventory') }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '1,247',
      icon: 'fas fa-cubes',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'In Stock',
      value: '892',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Low Stock',
      value: '45',
      icon: 'fas fa-exclamation-triangle',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Out of Stock',
      value: '23',
      icon: 'fas fa-times-circle',
      color: 'from-red-500 to-red-600'
    }
  ];

  const stockData = [
    {
      id: 1,
      product: 'Wireless Headphones',
      sku: 'WH-001',
      currentStock: 156,
      minStock: 20,
      status: 'In Stock',
      category: 'Electronics'
    },
    {
      id: 2,
      product: 'Cotton T-Shirt',
      sku: 'TS-002',
      currentStock: 23,
      minStock: 50,
      status: 'Low Stock',
      category: 'Clothing'
    }
  ];

  const columns = [
    {
      key: 'product',
      label: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center me-3">
            <i className="fas fa-headphones text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
          </div>
        </div>
      )
    },
    { key: 'sku', label: 'SKU' },
    { 
      key: 'currentStock', 
      label: 'Current Stock',
      render: (value, row) => (
        <span className={`font-medium ${row.status === 'Low Stock' ? 'text-yellow-600' : 'text-green-600'}`}>
          {value}
        </span>
      )
    },
    { key: 'minStock', label: 'Min Stock' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'In Stock' ? 'badge-success' : 
                          value === 'Low Stock' ? 'badge-warning' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'Adjust',
      onClick: (row) => setShowStockModal(true),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Transfer',
      onClick: (row) => console.log('Transfer:', row),
      className: 'text-blue-600 hover:text-blue-900'
    }
  ];

  const tabs = [
    { id: 'stock', label: 'Stock Overview', icon: 'fas fa-warehouse' },
    { id: 'products', label: 'Products', icon: 'fas fa-box' },
    { id: 'transfers', label: 'Transfers', icon: 'fas fa-exchange-alt' }
  ];

  return (
    <DashboardLayout title="Inventory Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowStockModal(true)}>
            <i className="fas fa-plus me-2" />
            Stock Adjustment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-sm rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-white/80 truncate">{stat.title}</dt>
                  <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-white text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} me-2`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'stock' && (
              <div className="space-y-6">
                {/* Stock Alerts & Recent Movements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card p-4 border-s-4 border-red-500">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Stock Alerts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full me-3" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Cotton T-Shirt</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">23 left</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full me-3" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Laptop Stand</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">0 left</span>
                      </div>
                    </div>
                  </div>

                  <div className="card p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Stock Movements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center me-3">
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

                {/* Stock Summary Table */}
                <DataTable
                  title="Stock Summary"
                  data={stockData}
                  columns={columns}
                  actions={actions}
                  searchable
                  filterable
                  filterOptions={[
                    { value: '', label: 'All Status' },
                    { value: 'In Stock', label: 'In Stock' },
                    { value: 'Low Stock', label: 'Low Stock' },
                    { value: 'Out of Stock', label: 'Out of Stock' }
                  ]}
                  filterKey="status"
                />
              </div>
            )}

            {activeTab === 'products' && (
              <div className="text-center py-12">
                <i className="fas fa-box text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product Inventory</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
              </div>
            )}

            {activeTab === 'transfers' && (
              <div className="text-center py-12">
                <i className="fas fa-exchange-alt text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Stock Transfers</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage inventory transfers between locations</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      <Modal
        isOpen={showStockModal}
        onClose={() => setShowStockModal(false)}
        title="Stock Adjustment"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product</label>
            <select className="input-field" required>
              <option>Select product</option>
              <option>Wireless Headphones</option>
              <option>Cotton T-Shirt</option>
              <option>Laptop Stand</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Adjustment Type</label>
            <select className="input-field" required>
              <option>Stock In</option>
              <option>Stock Out</option>
              <option>Adjustment</option>
            </select>
          </div>
          <Input label="Quantity" type="number" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason</label>
            <textarea className="input-field" rows="3" placeholder="Reason for adjustment" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowStockModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Adjustment</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Inventory;