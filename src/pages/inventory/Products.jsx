import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Products = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.inventory'), href: '/inventory' },
    { label: 'Products Management' }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '1,247',
      icon: 'fas fa-cubes',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Products',
      value: '1,156',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Low Stock',
      value: '68',
      icon: 'fas fa-exclamation-triangle',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Categories',
      value: '23',
      icon: 'fas fa-tags',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const productsData = [
    {
      id: 1,
      product: 'Wireless Headphones',
      sku: 'WH-001',
      category: 'Electronics',
      stock: 156,
      price: '$199.99',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      product: 'Cotton T-Shirt',
      sku: 'TS-002',
      category: 'Clothing',
      stock: 23,
      price: '$29.99',
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      product: 'Laptop Stand',
      sku: 'LS-003',
      category: 'Electronics',
      stock: 0,
      price: '$79.99',
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const columns = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      ),
      render: () => (
        <input
          type="checkbox"
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
      )
    },
    {
      key: 'product',
      label: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-lg me-3" src={row.image} alt="Product" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Premium Audio Quality</div>
          </div>
        </div>
      )
    },
    { key: 'sku', label: 'SKU' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'price', label: 'Price' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Active' ? 'badge-success' : 
                          value === 'Low Stock' ? 'badge-warning' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit product:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete product:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  const bulkActions = [
    { label: 'Update Prices', icon: 'fas fa-edit' },
    { label: 'Change Category', icon: 'fas fa-tag' },
    { label: 'Deactivate Products', icon: 'fas fa-eye-slash' },
    { label: 'Delete Selected', icon: 'fas fa-trash', className: 'text-red-600' }
  ];

  return (
    <DashboardLayout title="Products Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setShowBulkModal(true)}>
            <i className="fas fa-tasks me-2" />
            Bulk Actions
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus me-2" />
            Add Product
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

        {/* Products Table */}
        <DataTable
          title="All Products"
          data={productsData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Categories' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Clothing', label: 'Clothing' },
            { value: 'Home & Garden', label: 'Home & Garden' }
          ]}
          filterKey="category"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
          }
        />
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Product Name" required />
              <Input label="SKU" required />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="input-field" required>
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home & Garden</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Price" type="number" step="0.01" required />
                <Input label="Initial Stock" type="number" required />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea className="input-field" rows="4" />
              </div>
              <Input label="Min Stock Level" type="number" required />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select className="input-field">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </Modal>

      {/* Bulk Actions Modal */}
      <Modal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        title="Bulk Actions"
      >
        <div className="space-y-3">
          {bulkActions.map((action, index) => (
            <button
              key={index}
              className={`w-full text-start px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
                action.className || 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <i className={`${action.icon} me-2`} />
              {action.label}
            </button>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => setShowBulkModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Products;