import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Purchasing = () => {
  const { t } = useTranslation();
  const [showPOModal, setShowPOModal] = useState(false);
  const [items, setItems] = useState([{ item: '', quantity: 1, unitPrice: 0 }]);

  const breadcrumbs = [
    { label: t('navigation.purchases') }
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: '342',
      icon: 'fas fa-shopping-cart',
      color: 'from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      title: 'Total Spend',
      value: '$89,450',
      icon: 'fas fa-dollar-sign',
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
    {
      title: 'Pending Orders',
      value: '23',
      icon: 'fas fa-clock',
      color: 'from-yellow-500 to-yellow-600',
      trend: 'down'
    },
    {
      title: 'Active Suppliers',
      value: '67',
      icon: 'fas fa-truck',
      color: 'from-purple-500 to-purple-600',
      trend: 'up'
    }
  ];

  const ordersData = [
    {
      id: 1,
      poNumber: 'PO-2024-001',
      supplier: 'Tech Supplies Co.',
      category: 'Electronics',
      amount: '$15,250',
      status: 'Approved',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-22'
    },
    {
      id: 2,
      poNumber: 'PO-2024-002',
      supplier: 'Office Materials Ltd',
      category: 'Office Supplies',
      amount: '$3,450',
      status: 'Pending',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-20'
    },
    {
      id: 3,
      poNumber: 'PO-2024-003',
      supplier: 'Industrial Parts Inc',
      category: 'Manufacturing',
      amount: '$28,900',
      status: 'Delivered',
      orderDate: '2024-01-10',
      expectedDelivery: '2024-01-17'
    }
  ];

  const columns = [
    { key: 'poNumber', label: 'PO Number' },
    {
      key: 'supplier',
      label: 'Supplier',
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
        </div>
      )
    },
    { key: 'amount', label: 'Amount' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Approved' ? 'badge-success' : 
                          value === 'Pending' ? 'badge-warning' : 
                          value === 'Delivered' ? 'badge-info' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    },
    { key: 'orderDate', label: 'Order Date' },
    { key: 'expectedDelivery', label: 'Expected Delivery' }
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => console.log('View order:', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: 'Track',
      onClick: (row) => console.log('Track order:', row),
      className: 'text-green-600 hover:text-green-900',
      condition: (row) => row.status === 'Approved'
    },
    {
      label: 'Approve',
      onClick: (row) => console.log('Approve order:', row),
      className: 'text-green-600 hover:text-green-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Invoice',
      onClick: (row) => console.log('Create invoice:', row),
      className: 'text-purple-600 hover:text-purple-900',
      condition: (row) => row.status === 'Delivered'
    }
  ];

  const addItem = () => {
    setItems([...items, { item: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0).toFixed(2);
  };

  return (
    <DashboardLayout title="Purchasing Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowPOModal(true)}>
            <i className="fas fa-plus me-2" />
            New Purchase Order
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-sm rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-white/80 truncate">{stat.title}</dt>
                  <dd className="text-2xl font-bold text-white flex items-center">
                    {stat.value}
                    <i className={`fas fa-arrow-${stat.trend} ms-2 text-white/70`} />
                  </dd>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-white text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Orders Table */}
        <DataTable
          title="Recent Purchase Orders"
          data={ordersData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Delivered', label: 'Delivered' },
            { value: 'Cancelled', label: 'Cancelled' }
          ]}
          filterKey="status"
        />
      </div>

      {/* New Purchase Order Modal */}
      <Modal
        isOpen={showPOModal}
        onClose={() => setShowPOModal(false)}
        title="New Purchase Order"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="PO Number" value="PO-2024-004" readOnly />
            <Input label="Order Date" type="date" required />
            <Input label="Expected Delivery" type="date" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier</label>
              <select className="input-field" required>
                <option value="">Select Supplier</option>
                <option>Tech Supplies Co.</option>
                <option>Office Materials Ltd</option>
                <option>Industrial Parts Inc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select className="input-field">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Purchase Items</h4>
              <Button type="button" variant="secondary" onClick={addItem}>
                <i className="fas fa-plus me-2" />
                Add Item
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Item</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Unit Price</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          className="input-field w-full"
                          placeholder="Item description"
                          value={item.item}
                          onChange={(e) => updateItem(index, 'item', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          className="input-field w-full"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="input-field w-full"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => removeItem(index)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-end font-medium">Purchase Total:</td>
                    <td className="px-4 py-3 font-bold text-primary-600">${calculateTotal()}</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea className="input-field" rows="3" placeholder="Additional notes (optional)" />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowPOModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Purchase Order</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Purchasing;