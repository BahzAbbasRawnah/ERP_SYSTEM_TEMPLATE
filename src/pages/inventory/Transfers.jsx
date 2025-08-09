import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Transfers = () => {
  const { t } = useTranslation();
  const [showTransferModal, setShowTransferModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.inventory'), href: '/inventory' },
    { label: 'Stock Transfers' }
  ];

  const stats = [
    {
      title: 'Total Transfers',
      value: '156',
      icon: 'fas fa-exchange-alt',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Completed',
      value: '134',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pending',
      value: '18',
      icon: 'fas fa-clock',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'In Transit',
      value: '4',
      icon: 'fas fa-truck',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const transfersData = [
    {
      id: 1,
      transferId: '#TRF-001',
      product: 'Wireless Headphones',
      sku: 'WH-001',
      fromLocation: 'Warehouse A',
      toLocation: 'Store 1',
      quantity: 25,
      status: 'Completed',
      date: '2024-01-15',
      icon: 'fas fa-headphones text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      transferId: '#TRF-002',
      product: 'Cotton T-Shirt',
      sku: 'TS-002',
      fromLocation: 'Store 2',
      toLocation: 'Warehouse B',
      quantity: 50,
      status: 'Pending',
      date: '2024-01-14',
      icon: 'fas fa-tshirt text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      transferId: '#TRF-003',
      product: 'Laptop Stand',
      sku: 'LS-003',
      fromLocation: 'Warehouse A',
      toLocation: 'Store 2',
      quantity: 15,
      status: 'In Transit',
      date: '2024-01-13',
      icon: 'fas fa-laptop text-purple-600 dark:text-purple-400'
    }
  ];

  const columns = [
    { key: 'transferId', label: 'Transfer ID' },
    {
      key: 'product',
      label: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center me-3">
            <i className={`${row.icon} text-sm`} />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {row.sku}</div>
          </div>
        </div>
      )
    },
    { key: 'fromLocation', label: 'From Location' },
    { key: 'toLocation', label: 'To Location' },
    { key: 'quantity', label: 'Quantity' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Completed' ? 'badge-success' : 
                          value === 'Pending' ? 'badge-warning' : 
                          value === 'In Transit' ? 'badge-info' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    },
    { key: 'date', label: 'Date' }
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => console.log('View transfer:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Approve',
      onClick: (row) => console.log('Approve transfer:', row),
      className: 'text-blue-600 hover:text-blue-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Receive',
      onClick: (row) => console.log('Receive transfer:', row),
      className: 'text-green-600 hover:text-green-900',
      condition: (row) => row.status === 'In Transit'
    },
    {
      label: 'Cancel',
      onClick: (row) => console.log('Cancel transfer:', row),
      className: 'text-red-600 hover:text-red-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Print',
      onClick: (row) => console.log('Print transfer:', row),
      className: 'text-gray-600 hover:text-gray-900'
    }
  ];

  return (
    <DashboardLayout title="Stock Transfers" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowTransferModal(true)}>
            <i className="fas fa-plus me-2" />
            New Transfer
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

        {/* Transfers Table */}
        <DataTable
          title="All Transfers"
          data={transfersData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Pending', label: 'Pending' },
            { value: 'In Transit', label: 'In Transit' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Cancelled', label: 'Cancelled' }
          ]}
          filterKey="status"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Locations</option>
              <option>Warehouse A</option>
              <option>Warehouse B</option>
              <option>Store 1</option>
              <option>Store 2</option>
            </select>
          }
        />
      </div>

      {/* New Transfer Modal */}
      <Modal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        title="New Stock Transfer"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Location</label>
              <select className="input-field" required>
                <option>Select location</option>
                <option>Warehouse A</option>
                <option>Warehouse B</option>
                <option>Store 1</option>
                <option>Store 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To Location</label>
              <select className="input-field" required>
                <option>Select location</option>
                <option>Warehouse A</option>
                <option>Warehouse B</option>
                <option>Store 1</option>
                <option>Store 2</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transfer Items</label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Product</th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Available</th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Quantity</th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2">
                      <select className="input-field">
                        <option>Select product</option>
                        <option>Wireless Headphones</option>
                        <option>Cotton T-Shirt</option>
                        <option>Laptop Stand</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">156</td>
                    <td className="px-4 py-2">
                      <input type="number" className="input-field" placeholder="0" />
                    </td>
                    <td className="px-4 py-2">
                      <button type="button" className="text-red-600 hover:text-red-900">
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="mt-2 text-primary-600 hover:text-primary-900 text-sm">
              <i className="fas fa-plus me-1" />
              Add Item
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transfer Notes</label>
            <textarea className="input-field" rows="3" placeholder="Optional notes about this transfer" />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowTransferModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Transfer</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Transfers;