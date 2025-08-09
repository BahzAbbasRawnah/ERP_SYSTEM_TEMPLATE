import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Suppliers = () => {
  const { t } = useTranslation();
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Supplier');

  const breadcrumbs = [
    { label: t('navigation.purchases'), href: '/purchases' },
    { label: 'Suppliers' }
  ];

  const stats = [
    {
      title: 'Total Suppliers',
      value: '67',
      icon: 'fas fa-truck-loading',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Suppliers',
      value: '54',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Categories',
      value: '12',
      icon: 'fas fa-tags',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Avg Rating',
      value: '4.2',
      icon: 'fas fa-star',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const suppliersData = [
    {
      id: 1,
      supplierName: 'Tech Supplies Co.',
      phone: '+1 (555) 123-4567',
      contactPerson: 'John Smith',
      email: 'john@techsupplies.com',
      category: 'Electronics',
      status: 'Active',
      rating: 4.2
    },
    {
      id: 2,
      supplierName: 'Office Materials Ltd',
      phone: '+1 (555) 987-6543',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@officematerials.com',
      category: 'Office Supplies',
      status: 'Active',
      rating: 4.8
    },
    {
      id: 3,
      supplierName: 'Industrial Parts Inc',
      phone: '+1 (555) 456-7890',
      contactPerson: 'Mike Wilson',
      email: 'mike@industrialparts.com',
      category: 'Manufacturing',
      status: 'Pending',
      rating: 3.5
    }
  ];

  const columns = [
    {
      key: 'supplierName',
      label: 'Supplier Name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.phone}</div>
        </div>
      )
    },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'email', label: 'Email' },
    { key: 'category', label: 'Category' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Active' ? 'badge-success' : 'badge-warning';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => (
        <div className="flex items-center">
          <span className="text-yellow-400">★★★★☆</span>
          <span className="ms-1 text-sm text-gray-500">{value}</span>
        </div>
      )
    }
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => {
        setModalTitle(`Edit Supplier ${row.id}`);
        setShowSupplierModal(true);
      },
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete supplier:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="Suppliers" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => {
            setModalTitle('New Supplier');
            setShowSupplierModal(true);
          }}>
            <i className="fas fa-plus me-2" />
            New Supplier
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        {/* Suppliers Table */}
        <DataTable
          title="All Suppliers"
          data={suppliersData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
            { value: 'Pending', label: 'Pending' }
          ]}
          filterKey="status"
        />
      </div>

      {/* Supplier Modal */}
      <Modal
        isOpen={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        title={modalTitle}
      >
        <form className="space-y-4">
          <Input label="Company Name" required />
          <Input label="Contact Person" required />
          <Input label="Email" type="email" required />
          <Input label="Phone" type="tel" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select className="input-field" required>
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Office Supplies</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
            <textarea className="input-field" rows="3" placeholder="Full address" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowSupplierModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Supplier</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Suppliers;