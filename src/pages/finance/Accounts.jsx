import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const Accounts = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [accountData, setAccountData] = useState([]);

  const breadcrumbs = [
    { label: t('navigation.finance'), href: '/finance' },
    { label: 'Chart of Accounts' }
  ];

  const accountTree = [
    {
      id: '1',
      name: 'Assets',
      icon: 'fas fa-coins text-green-500 dark:text-green-400',
      children: [
        {
          id: '11',
          name: 'Current Assets',
          icon: 'fas fa-university text-blue-500 dark:text-blue-400',
          children: [
            { id: '111', name: 'Cash', icon: 'fas fa-wallet text-gray-500 dark:text-gray-400' },
            { id: '112', name: 'Accounts Receivable', icon: 'fas fa-credit-card text-gray-500 dark:text-gray-400' }
          ]
        },
        {
          id: '12',
          name: 'Fixed Assets',
          icon: 'fas fa-building text-blue-500 dark:text-blue-400',
          children: [
            { id: '121', name: 'Property', icon: 'fas fa-home text-gray-500 dark:text-gray-400' },
            { id: '122', name: 'Equipment', icon: 'fas fa-laptop text-gray-500 dark:text-gray-400' }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Liabilities',
      icon: 'fas fa-exclamation-triangle text-red-500 dark:text-red-400',
      children: [
        {
          id: '21',
          name: 'Current Liabilities',
          icon: 'fas fa-clock text-orange-500 dark:text-orange-400',
          children: [
            { id: '211', name: 'Accounts Payable', icon: 'fas fa-file-invoice text-gray-500 dark:text-gray-400' },
            { id: '212', name: 'Taxes Payable', icon: 'fas fa-percentage text-gray-500 dark:text-gray-400' }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Equity',
      icon: 'fas fa-chart-pie text-purple-500 dark:text-purple-400',
      children: [
        { id: '31', name: "Owner's Equity", icon: 'fas fa-user-tie text-gray-500 dark:text-gray-400' },
        { id: '32', name: 'Retained Earnings', icon: 'fas fa-piggy-bank text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: '4',
      name: 'Revenue',
      icon: 'fas fa-arrow-up text-green-500 dark:text-green-400',
      children: [
        { id: '41', name: 'Sales Revenue', icon: 'fas fa-shopping-cart text-gray-500 dark:text-gray-400' },
        { id: '42', name: 'Service Revenue', icon: 'fas fa-handshake text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: '5',
      name: 'Expenses',
      icon: 'fas fa-arrow-down text-red-500 dark:text-red-400',
      children: [
        { id: '51', name: 'Operating Expenses', icon: 'fas fa-briefcase text-gray-500 dark:text-gray-400' },
        { id: '52', name: 'Administrative Expenses', icon: 'fas fa-tools text-gray-500 dark:text-gray-400' }
      ]
    }
  ];

  const sampleAccountData = {
    '1': [
      { code: '11', name: 'Current Assets', type: 'Asset', balance: '$125,000', status: 'Active' },
      { code: '12', name: 'Fixed Assets', type: 'Asset', balance: '$85,000', status: 'Active' }
    ],
    '11': [
      { code: '111', name: 'Cash', type: 'Asset', balance: '$25,000', status: 'Active' },
      { code: '112', name: 'Accounts Receivable', type: 'Asset', balance: '$15,000', status: 'Active' }
    ],
    '2': [
      { code: '21', name: 'Current Liabilities', type: 'Liability', balance: '$35,000', status: 'Active' }
    ]
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const selectAccount = (account) => {
    setSelectedAccount(account);
    setAccountData(sampleAccountData[account.id] || []);
  };

  const renderTreeNode = (node, level = 0) => (
    <div key={node.id} className={`ltr:ml-${level * 4} rtl:mr-${level * 4}`}>
      <div
        className={`tree-node flex items-center py-3 px-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-sm ${
          selectedAccount?.id === node.id 
            ? 'bg-primary-100 dark:bg-primary-900/30 border-l-4 ltr:border-l-primary-500 rtl:border-r-4 rtl:border-r-primary-500 shadow-sm' 
            : 'hover:border-l-2 ltr:hover:border-l-primary-300 rtl:hover:border-r-2 rtl:hover:border-r-primary-300'
        }`}
        onClick={() => selectAccount(node)}
      >
        {node.children && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNode(node.id);
            }}
            className="me-1 p-1 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
          >
            <i className={`fas fa-chevron-${expandedNodes[node.id] ? 'down' : (document.dir === 'rtl' ? 'left' : 'right')} transition-transform duration-200 text-gray-500 dark:text-gray-400 text-sm`} />
          </button>
        )}
        {!node.children && <span className="w-6 me-1" />}
        <i className={`${node.icon} ltr:mr-3 rtl:ml-3 text-lg`} />
        <span className={`${node.children ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'} flex-1`}>
          {node.name}
        </span>
        {selectedAccount?.id === node.id && (
          <i className="fas fa-check-circle text-primary-500 ltr:ml-2 rtl:me-1" />
        )}
      </div>
      {node.children && expandedNodes[node.id] && (
        <div className="ms-4 mt-1 space-y-1">
          {node.children.map(child => renderTreeNode(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="Chart of Accounts" breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Chart of Accounts Tree */}
        <div className="col-span-4">
          <div className="card h-full">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-sitemap ltr:mr-3 rtl:ml-3 text-xl" />
                  <h3 className="text-lg font-semibold">Account Structure</h3>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <i className="fas fa-plus me-1" />
                  Add
                </Button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              <div className="space-y-1">
                {accountTree.map(node => renderTreeNode(node))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Table */}
        <div className="col-span-8">
          <div className="card h-full">
            <div className="p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <i className="fas fa-table ltr:mr-3 rtl:ml-3 text-xl" />
                  <h3 className="text-lg font-semibold">
                    {selectedAccount ? `${selectedAccount.name} - Sub Accounts` : 'Account Details'}
                  </h3>
                </div>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <div className="relative">
                    <i className="fas fa-search absolute ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      className="w-64 ltr:pl-10 rtl:pr-10 pr-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    />
                  </div>
                  <Button 
                    onClick={() => setShowSubModal(true)} 
                    disabled={!selectedAccount}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50"
                  >
                    <i className="fas fa-plus me-1" />
                    Add Sub Account
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-hashtag me-1 text-primary-500" />
                      Account Code
                    </th>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-tag me-1 text-primary-500" />
                      Account Name
                    </th>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-layer-group me-1 text-primary-500" />
                      Type
                    </th>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-dollar-sign me-1 text-primary-500" />
                      Balance
                    </th>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-toggle-on me-1 text-primary-500" />
                      Status
                    </th>
                    <th className="text-start py-4 px-6 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <i className="fas fa-cogs me-1 text-primary-500" />
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {accountData.length === 0 ? (
                    <tr>
                      <td className="py-16 px-6 text-center text-gray-500 dark:text-gray-400" colSpan="6">
                        <div className="flex flex-col items-center">
                          <i className="fas fa-mouse-pointer text-6xl mb-4 text-gray-300 dark:text-gray-600" />
                          <h4 className="text-lg font-medium mb-2">Select an Account</h4>
                          <p className="text-sm">Click on an account from the tree to view its sub-accounts and details</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    accountData.map((account, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td className="py-4 px-6 font-mono font-medium text-gray-900 dark:text-white">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {account.code}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">{account.name}</td>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            account.type === 'Asset' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            account.type === 'Liability' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {account.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                          <span className="text-lg">{account.balance}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <i className="fas fa-circle ltr:mr-1 rtl:ml-1 text-xs" />
                            {account.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => setShowEditModal(true)}
                              className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                              <i className="fas fa-edit ltr:mr-1 rtl:ml-1" />
                              Edit
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 rounded-md text-sm font-medium transition-colors duration-200">
                              <i className="fas fa-trash ltr:mr-1 rtl:ml-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Account"
      >
        <form className="space-y-4">
          <Input label="Account Code" placeholder="e.g., 1000" required />
          <Input label="Account Name" placeholder="Enter account name" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Type</label>
            <Select
              placeholder="Select Type"
              options={[
                { value: 'assets', label: 'Assets' },
                { value: 'liabilities', label: 'Liabilities' },
                { value: 'equity', label: 'Equity' },
                { value: 'revenue', label: 'Revenue' },
                { value: 'expenses', label: 'Expenses' }
              ]}
              onChange={(value) => console.log('Type selected:', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parent Account</label>
            <Select
              placeholder="None (Main Account)"
              options={[
                { value: '1', label: 'Assets' },
                { value: '2', label: 'Liabilities' },
                { value: '3', label: 'Equity' },
                { value: '4', label: 'Revenue' },
                { value: '5', label: 'Expenses' }
              ]}
              onChange={(value) => console.log('Parent selected:', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea className="input-field" rows="3" placeholder="Account description (optional)" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Modal>

      {/* Add Sub Account Modal */}
      <Modal
        isOpen={showSubModal}
        onClose={() => setShowSubModal(false)}
        title="Add Sub Account"
      >
        <form className="space-y-4">
          <Input label="Account Code" placeholder="e.g., 1001" required />
          <Input label="Account Name" placeholder="Enter sub account name" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea className="input-field" rows="2" placeholder="Sub account description" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowSubModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Sub Account</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Account Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Account"
      >
        <form className="space-y-4">
          <Input label="Account Code" defaultValue="1001" required />
          <Input label="Account Name" defaultValue="Cash Account" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <Select
              value="active"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
              onChange={(value) => console.log('Status selected:', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea className="input-field" rows="3" defaultValue="Main cash account for daily operations" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Account</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Accounts;