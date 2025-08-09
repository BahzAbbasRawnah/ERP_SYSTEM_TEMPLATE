import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Ecommerce = () => {
  const { t } = useTranslation();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.ecommerce') }
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: '2,847',
      icon: 'fas fa-shopping-cart',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Products',
      value: '1,234',
      icon: 'fas fa-box',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Revenue',
      value: '$89,432',
      icon: 'fas fa-dollar-sign',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Customers',
      value: '5,678',
      icon: 'fas fa-users',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const productsData = [
    {
      id: 1,
      product: 'Wireless Headphones',
      sku: 'WH-001',
      price: '$99.99',
      stock: 45,
      category: 'Electronics',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      product: 'Running Shoes',
      sku: 'RS-002',
      price: '$129.99',
      stock: 0,
      category: 'Fashion',
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      product: 'Smart Watch',
      sku: 'SW-003',
      price: '$299.99',
      stock: 23,
      category: 'Electronics',
      status: 'Active',
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
            <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {row.sku}</div>
          </div>
        </div>
      )
    },
    { key: 'price', label: 'Price' },
    { 
      key: 'stock', 
      label: 'Stock',
      render: (value) => (
        <span className={value === 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'}>
          {value}
        </span>
      )
    },
    { key: 'category', label: 'Category' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Active' ? 'badge-success' : 'badge-error';
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
    <DashboardLayout title="E-commerce Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setShowBulkModal(true)}>
            <i className="fas fa-tasks me-2" />
            Bulk Actions
          </Button>
          <Button onClick={() => setShowProductModal(true)}>
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
            { value: 'Fashion', label: 'Fashion' },
            { value: 'Home & Garden', label: 'Home & Garden' }
          ]}
          filterKey="category"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>
          }
        />
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Add New Product"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Product Name" required />
              <Input label="SKU" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Price" type="number" step="0.01" required />
                <Input label="Stock Quantity" type="number" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="input-field" required>
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea className="input-field" rows="4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Drop images here or click to upload</p>
                </div>
              </div>
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
            <Button type="button" variant="secondary" onClick={() => setShowProductModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
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

export default Ecommerce;