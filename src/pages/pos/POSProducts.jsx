import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const POSProducts = () => {
  const { t } = useTranslation();
  const [showProductModal, setShowProductModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.pos'), href: '/pos' },
    { label: 'POS Products' }
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '248',
      icon: 'fas fa-barcode',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active',
      value: '235',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Low Stock',
      value: '13',
      icon: 'fas fa-exclamation-triangle',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Categories',
      value: '18',
      icon: 'fas fa-tags',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const productsData = [
    {
      id: 1,
      product: 'Espresso Coffee',
      sku: 'ESP001',
      category: 'Beverages',
      price: '$3.50',
      stock: 45,
      status: 'Active'
    },
    {
      id: 2,
      product: 'Club Sandwich',
      sku: 'SAND001',
      category: 'Food',
      price: '$8.99',
      stock: 12,
      status: 'Active'
    }
  ];

  const columns = [
    {
      key: 'product',
      label: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg me-2" />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {row.sku}</div>
          </div>
        </div>
      )
    },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="badge badge-success">{value}</span>
      )
    }
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit product:', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete product:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="POS Products" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowProductModal(true)}>
            <i className="fas fa-plus me-2" />
            Add Product
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
            { value: 'Beverages', label: 'Beverages' },
            { value: 'Food', label: 'Food' },
            { value: 'Snacks', label: 'Snacks' }
          ]}
          filterKey="category"
        />
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Add POS Product"
      >
        <form className="space-y-4">
          <Input label="Product Name" required />
          <Input label="SKU" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select className="input-field" required>
              <option>Beverages</option>
              <option>Food</option>
              <option>Snacks</option>
            </select>
          </div>
          <Input label="Price" type="number" step="0.01" required />
          <Input label="Stock Quantity" type="number" required />
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowProductModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default POSProducts;