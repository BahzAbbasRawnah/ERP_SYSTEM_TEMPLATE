import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Accounting = () => {
  const { t } = useTranslation();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('invoices');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    description: '',
    account: '',
    amount: '',
    notes: ''
  });

  const breadcrumbs = [
    { label: t('navigation.finance'), href: '/finance' },
    { label: t('navigation.accounting') }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      icon: 'fas fa-dollar-sign',
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
    {
      title: 'Total Expenses',
      value: '$45,230',
      icon: 'fas fa-credit-card',
      color: 'from-red-500 to-red-600',
      trend: 'up'
    },
    {
      title: 'Net Profit',
      value: '$80,200',
      icon: 'fas fa-chart-pie',
      color: 'from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      title: 'Pending Invoices',
      value: '156',
      icon: 'fas fa-file-invoice',
      color: 'from-yellow-500 to-yellow-600',
      trend: 'down'
    }
  ];

  const tabs = [
    { id: 'invoices', label: 'Invoices', icon: 'fas fa-file-invoice' },
    { id: 'accounts', label: 'Chart of Accounts', icon: 'fas fa-list' },
    { id: 'reports', label: 'Financial Reports', icon: 'fas fa-chart-bar' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction data:', formData);
    setShowTransactionModal(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: '',
      description: '',
      account: '',
      amount: '',
      notes: ''
    });
  };

  return (
    <DashboardLayout title="Accounting Dashboard" breadcrumbs={breadcrumbs}>
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

        {/* Tabs */}
        <div className="card">
          <div className="px-6 border-b border-gray-200 dark:border-gray-700">
            <navigation className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} me-2`} />
                  {tab.label}
                </button>
              ))}
            </navigation>
          </div>

          <div className="p-6">
            {activeTab === 'invoices' && (
              <div className="text-center py-12">
                <i className="fas fa-file-invoice text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Invoice Management</h3>
                <p className="text-gray-600 dark:text-gray-400">Create and manage customer invoices</p>
              </div>
            )}

            {activeTab === 'accounts' && (
              <div className="text-center py-12">
                <i className="fas fa-list text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Chart of Accounts</h3>
                <p className="text-gray-600 dark:text-gray-400">Organize your financial accounts structure</p>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <i className="fas fa-chart-bar text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Financial Reports</h3>
                <p className="text-gray-600 dark:text-gray-400">Generate comprehensive financial reports</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Transaction Modal */}
      <Modal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        title="New Transaction"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter transaction description"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account</label>
              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Account</option>
                <option value="checking">Checking Account</option>
                <option value="savings">Savings Account</option>
                <option value="office-expenses">Office Expenses</option>
                <option value="accounts-receivable">Accounts Receivable</option>
              </select>
            </div>
            <Input
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Additional notes (optional)"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowTransactionModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Transaction
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Accounting;