import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Stores = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.inventory'), href: '/inventory' },
    { label: 'Stores Management' }
  ];

  const stats = [
    {
      title: 'Total Stores',
      value: '12',
      icon: 'fas fa-store',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Stores',
      value: '10',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Warehouses',
      value: '3',
      icon: 'fas fa-warehouse',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Total Inventory',
      value: '$2.4M',
      icon: 'fas fa-boxes',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const storesData = [
    {
      id: 1,
      storeName: 'Downtown Store',
      storeId: 'ST-001',
      type: 'Retail Store',
      location: 'New York, NY',
      address: '123 Main St',
      manager: 'John Smith',
      inventoryValue: '$245,000',
      status: 'Active',
      icon: 'fas fa-store text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      storeName: 'Main Warehouse',
      storeId: 'WH-001',
      type: 'Warehouse',
      location: 'Brooklyn, NY',
      address: '456 Industrial Ave',
      manager: 'Sarah Johnson',
      inventoryValue: '$1,200,000',
      status: 'Active',
      icon: 'fas fa-warehouse text-yellow-600 dark:text-yellow-400'
    },
    {
      id: 3,
      storeName: 'Mall Store',
      storeId: 'ST-002',
      type: 'Retail Store',
      location: 'Queens, NY',
      address: '789 Mall Plaza',
      manager: 'Mike Wilson',
      inventoryValue: '$180,000',
      status: 'Maintenance',
      icon: 'fas fa-store text-green-600 dark:text-green-400'
    }
  ];

  const columns = [
    {
      key: 'storeName',
      label: 'Store Name',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center me-3">
            <i className={row.icon} />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Store ID: {row.storeId}</div>
          </div>
        </div>
      )
    },
    { key: 'type', label: 'Type' },
    {
      key: 'location',
      label: 'Location',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.address}</div>
        </div>
      )
    },
    { key: 'manager', label: 'Manager' },
    { key: 'inventoryValue', label: 'Inventory Value' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Active' ? 'badge-success' : 'badge-warning';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit store:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Inventory',
      onClick: (row) => console.log('View inventory:', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: 'View',
      onClick: (row) => console.log('View store:', row),
      className: 'text-gray-600 hover:text-gray-900'
    }
  ];

  return (
    <DashboardLayout title="Stores Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-map-marker-alt me-2" />
            View Map
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus me-2" />
            Add Store
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

        {/* Stores Table */}
        <DataTable
          title="All Stores"
          data={storesData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Types' },
            { value: 'Store', label: 'Store' },
            { value: 'Warehouse', label: 'Warehouse' },
            { value: 'Distribution Center', label: 'Distribution Center' }
          ]}
          filterKey="type"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Maintenance</option>
            </select>
          }
        />
      </div>

      {/* Add Store Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Store"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Store Name" required />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Type</label>
                <select className="input-field" required>
                  <option>Select type</option>
                  <option>Retail Store</option>
                  <option>Warehouse</option>
                  <option>Distribution Center</option>
                  <option>Outlet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Manager</label>
                <select className="input-field" required>
                  <option>Select manager</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Wilson</option>
                </select>
              </div>
              <Input label="Phone" type="tel" required />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                <textarea className="input-field" rows="3" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" required />
                <Input label="State" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="ZIP Code" required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select className="input-field">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Store</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Stores;