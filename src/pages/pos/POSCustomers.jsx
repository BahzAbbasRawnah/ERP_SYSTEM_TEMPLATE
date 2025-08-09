import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const POSCustomers = () => {
  const { t } = useTranslation();
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.pos'), href: '/pos' },
    { label: 'POS Customers' }
  ];

  const stats = [
    {
      title: 'Total Customers',
      value: '1,247',
      icon: 'fas fa-users',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'New Today',
      value: '23',
      icon: 'fas fa-user-plus',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'VIP Customers',
      value: '89',
      icon: 'fas fa-star',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg. Spend',
      value: '$45.20',
      icon: 'fas fa-dollar-sign',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const customersData = [
    {
      id: 1,
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      type: 'VIP',
      totalSpent: '$1,245.50',
      lastVisit: '2024-01-15',
      initials: 'JD',
      color: 'blue'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      type: 'Regular',
      totalSpent: '$567.25',
      lastVisit: '2024-01-14',
      initials: 'JS',
      color: 'green'
    }
  ];

  const columns = [
    {
      key: 'customer',
      label: 'Customer',
      render: (value, row) => (
        <div className="flex items-center">
          <div className={`w-10 h-10 bg-${row.color}-500 rounded-lg flex items-center justify-center text-white font-semibold me-2`}>
            {row.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
          </div>
        </div>
      )
    },
    { key: 'phone', label: 'Phone' },
    {
      key: 'type',
      label: 'Type',
      render: (value) => {
        const badgeClass = value === 'VIP' ? 'badge-purple' : 'badge-blue';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    },
    { key: 'totalSpent', label: 'Total Spent' },
    { key: 'lastVisit', label: 'Last Visit' }
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => console.log('View customer:', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit customer:', row),
      className: 'text-green-600 hover:text-green-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete customer:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="POS Customers" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowCustomerModal(true)}>
            <i className="fas fa-plus me-2" />
            Add Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  <i className={`${stat.icon} text-xl`} />
                </div>
                <div className="ms-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customers Table */}
        <DataTable
          title="All Customers"
          data={customersData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Types' },
            { value: 'Regular', label: 'Regular' },
            { value: 'VIP', label: 'VIP' },
            { value: 'Premium', label: 'Premium' }
          ]}
          filterKey="type"
        />
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        title="Add Customer"
      >
        <form className="space-y-4">
          <Input label="Full Name" required />
          <Input label="Email" type="email" required />
          <Input label="Phone" type="tel" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Type</label>
            <select className="input-field" required>
              <option>Regular</option>
              <option>VIP</option>
              <option>Premium</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowCustomerModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Customer</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default POSCustomers;