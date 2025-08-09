import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const Receipts = () => {
  const { t } = useTranslation();
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [entries, setEntries] = useState([
    { account: '', description: '', debit: '', credit: '' },
    { account: '', description: '', debit: '', credit: '' }
  ]);

  const breadcrumbs = [
    { label: t('navigation.finance'), href: '/finance' },
    { label: 'Receipts' }
  ];

  const stats = [
    {
      title: 'Total Receipts',
      value: '$45,230',
      icon: 'fas fa-receipt',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'This Month',
      value: '$12,450',
      icon: 'fas fa-calendar',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending',
      value: '8',
      icon: 'fas fa-clock',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Approved',
      value: '142',
      icon: 'fas fa-check-circle',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const receiptsData = [
    {
      id: 1,
      receiptNumber: '#RCP-001',
      date: '2024-01-15',
      description: 'Payment from Client ABC',
      fromTo: 'ABC Corporation',
      amount: '$2,500.00',
      status: 'Approved'
    },
    {
      id: 2,
      receiptNumber: '#RCP-002',
      date: '2024-01-14',
      description: 'Office Rent Payment',
      fromTo: 'Property Management Co.',
      amount: '$1,200.00',
      status: 'Pending'
    },
    {
      id: 3,
      receiptNumber: '#RCP-003',
      date: '2024-01-13',
      description: 'Equipment Purchase',
      fromTo: 'Tech Solutions Ltd',
      amount: '$3,450.00',
      status: 'Approved'
    }
  ];

  const columns = [
    { key: 'receiptNumber', label: 'Receipt #', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'fromTo', label: 'From/To' },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value, row) => (
        <span className={row.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`badge ${value === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
          {value}
        </span>
      )
    }
  ];

  const generateReceiptNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RCP-${year}${month}${day}-${random}`;
  };

  const addEntry = () => {
    setEntries([...entries, { account: '', description: '', debit: '', credit: '' }]);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const calculateTotals = () => {
    const totalDebit = entries.reduce((sum, entry) => sum + (parseFloat(entry.debit) || 0), 0);
    const totalCredit = entries.reduce((sum, entry) => sum + (parseFloat(entry.credit) || 0), 0);
    return { totalDebit, totalCredit };
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setShowReceiptModal(true);
  };

  const handleModalClose = () => {
    setShowReceiptModal(false);
    setEditingReceipt(null);
    setEntries([
      { account: '', description: '', debit: '', credit: '' },
      { account: '', description: '', debit: '', credit: '' }
    ]);
  };

  const actions = [
    {
      label: 'Edit',
      onClick: handleEdit,
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'View',
      onClick: (row) => console.log('View receipt:', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete receipt:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="Receipts" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3 rtl:space-x-reverse">
          <Button variant="secondary">
            <i className="fas fa-download me-1" />
            Export
          </Button>
          <Button onClick={() => setShowReceiptModal(true)}>
            <i className="fas fa-plus me-1" />
            New Receipt
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

        {/* Receipts Table */}
        <DataTable
          title="All Receipts"
          data={receiptsData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' }
          ]}
          filterKey="status"
        />
      </div>

      {/* Receipt Modal */}
      <Modal
        isOpen={showReceiptModal}
        onClose={handleModalClose}
        title={editingReceipt ? `Edit Receipt ${editingReceipt.receiptNumber}` : 'New Receipt'}
        size="4xl"
      >
        <form className="space-y-6">
          {/* Receipt Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Receipt Number"
              defaultValue={editingReceipt?.receiptNumber || generateReceiptNumber()}
              readOnly
            />
            <Input
              label="Date"
              type="date"
              defaultValue={editingReceipt?.date || new Date().toISOString().split('T')[0]}
              required
            />
            <Input
              label="Reference"
              placeholder="Reference number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="From/To"
              placeholder="Enter party name"
              defaultValue={editingReceipt?.fromTo}
              required
            />
            <Input
              label="Description"
              placeholder="Receipt description"
              defaultValue={editingReceipt?.description}
              required
            />
          </div>

          {/* Double Entry Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Double Entry Details</h4>
              <Button type="button" variant="secondary" onClick={addEntry}>
                <i className="fas fa-plus me-1" />
                Add Entry
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Debit</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Credit</th>
                    <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {entries.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <Select
                          value={entry.account}
                          onChange={(value) => updateEntry(index, 'account', value)}
                          options={[
                            { value: 'cash', label: 'Cash' },
                            { value: 'bank', label: 'Bank Account' },
                            { value: 'accounts-receivable', label: 'Accounts Receivable' },
                            { value: 'accounts-payable', label: 'Accounts Payable' },
                            { value: 'revenue', label: 'Revenue' },
                            { value: 'expenses', label: 'Expenses' }
                          ]}
                          placeholder="Select Account"
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Entry description"
                          value={entry.description}
                          onChange={(e) => updateEntry(index, 'description', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="0.00"
                          value={entry.debit}
                          onChange={(e) => updateEntry(index, 'debit', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="0.00"
                          value={entry.credit}
                          onChange={(e) => updateEntry(index, 'credit', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => removeEntry(index)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <td colSpan="2" className="px-4 py-3 text-end font-medium text-gray-900 dark:text-white">Totals:</td>
                    <td className="px-4 py-3 font-bold text-green-600">${totalDebit.toFixed(2)}</td>
                    <td className="px-4 py-3 font-bold text-red-600">${totalCredit.toFixed(2)}</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="px-4 py-3 text-center">
                      <span className={`text-sm font-medium ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                        {isBalanced ? '✓ Balanced' : totalDebit !== totalCredit ? `⚠ Out of balance by $${Math.abs(totalDebit - totalCredit).toFixed(2)}` : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Additional notes (optional)"
            />
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
            <Button type="button" variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Receipt
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Receipts;