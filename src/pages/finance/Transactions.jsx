import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Transactions = () => {
  const { t } = useTranslation();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [entries, setEntries] = useState([
    { account: '', description: '', debit: '', credit: '' },
    { account: '', description: '', debit: '', credit: '' }
  ]);

  const breadcrumbs = [
    { label: t('navigation.finance'), href: '/finance' },
    { label: 'Transactions' }
  ];

  const stats = [
    {
      title: 'Total Income',
      value: '$15,240',
      icon: 'fas fa-arrow-up',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Expenses',
      value: '$8,430',
      icon: 'fas fa-arrow-down',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Net Balance',
      value: '$6,810',
      icon: 'fas fa-balance-scale',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const transactionsData = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Office Supplies Purchase',
      account: 'Office Expenses',
      type: 'Expense',
      amount: '-$245.00',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Client Payment - Invoice #1234',
      account: 'Accounts Receivable',
      type: 'Income',
      amount: '+$2,500.00',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Bank Transfer',
      account: 'Checking Account',
      type: 'Transfer',
      amount: '$1,000.00',
      status: 'Pending'
    },
    {
      id: 4,
      date: '2024-01-12',
      description: 'Software License Renewal',
      account: 'Software Expenses',
      type: 'Expense',
      amount: '-$599.00',
      status: 'Completed'
    },
    {
      id: 5,
      date: '2024-01-11',
      description: 'Consulting Service Payment',
      account: 'Service Revenue',
      type: 'Income',
      amount: '+$3,200.00',
      status: 'Completed'
    }
  ];

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description' },
    { key: 'account', label: 'Account' },
    {
      key: 'type',
      label: 'Type',
      render: (value) => {
        const badgeClass = value === 'Income' ? 'badge-success' : 
                          value === 'Expense' ? 'badge-danger' : 'badge-info';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value) => (
        <span className={`font-medium ${
          value.startsWith('+') ? 'text-green-600' : 
          value.startsWith('-') ? 'text-red-600' : ''
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`badge ${value === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
          {value}
        </span>
      )
    }
  ];

  const generateTransactionNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TXN-${year}${month}${day}-${random}`;
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

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleModalClose = () => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
    setEntries([
      { account: '', description: '', debit: '', credit: '' },
      { account: '', description: '', debit: '', credit: '' }
    ]);
  };

  const handleSave = () => {
    if (!isBalanced) {
      alert('Error: Debit and Credit totals must be equal for double entry accounting.');
      return;
    }
    if (totalDebit === 0) {
      alert('Error: Please add at least one entry with amounts.');
      return;
    }
    alert('Transaction saved successfully!');
    handleModalClose();
  };

  const actions = [
    {
      label: 'Edit',
      onClick: handleEdit,
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete transaction:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="Transactions" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowTransactionModal(true)}>
            <i className="fas fa-plus me-2" />
            New Transaction
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Transactions Table */}
        <DataTable
          title="All Transactions"
          data={transactionsData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Types' },
            { value: 'Income', label: 'Income' },
            { value: 'Expense', label: 'Expense' },
            { value: 'Transfer', label: 'Transfer' }
          ]}
          filterKey="type"
        />
      </div>

      {/* Transaction Modal */}
      <Modal
        isOpen={showTransactionModal}
        onClose={handleModalClose}
        title={editingTransaction ? `Edit Transaction ${editingTransaction.id}` : 'New Transaction'}
        size="4xl"
      >
        <form className="space-y-6">
          {/* Transaction Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Transaction Number"
              defaultValue={generateTransactionNumber()}
              readOnly
            />
            <Input
              label="Date"
              type="date"
              defaultValue={editingTransaction?.date || new Date().toISOString().split('T')[0]}
              required
            />
            <Input
              label="Reference"
              placeholder="Reference number"
            />
          </div>

          <Input
            label="Description"
            placeholder="Transaction description"
            defaultValue={editingTransaction?.description}
            required
          />

          {/* Double Entry Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">Double Entry Details</h4>
              <Button type="button" variant="secondary" onClick={addEntry}>
                <i className="fas fa-plus me-2" />
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
                        <select
                          className="input-field w-full"
                          value={entry.account}
                          onChange={(e) => updateEntry(index, 'account', e.target.value)}
                        >
                          <option value="">Select Account</option>
                          <option value="cash">Cash</option>
                          <option value="bank">Bank Account</option>
                          <option value="accounts-receivable">Accounts Receivable</option>
                          <option value="accounts-payable">Accounts Payable</option>
                          <option value="revenue">Revenue</option>
                          <option value="expenses">Expenses</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          className="input-field w-full"
                          placeholder="Entry description"
                          value={entry.description}
                          onChange={(e) => updateEntry(index, 'description', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="input-field w-full"
                          placeholder="0.00"
                          value={entry.debit}
                          onChange={(e) => updateEntry(index, 'debit', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="input-field w-full"
                          placeholder="0.00"
                          value={entry.credit}
                          onChange={(e) => updateEntry(index, 'credit', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
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
                    <td colSpan="2" className="px-4 py-3 text-end font-medium">Totals:</td>
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

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Transaction
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Transactions;