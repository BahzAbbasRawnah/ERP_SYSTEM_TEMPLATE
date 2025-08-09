import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Contracts = () => {
  const { t } = useTranslation();
  const [showContractModal, setShowContractModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('New Contract');

  const breadcrumbs = [
    { label: t('navigation.purchases'), href: '/purchases' },
    { label: 'Contracts' }
  ];

  const stats = [
    {
      title: 'Total Contracts',
      value: '89',
      icon: 'fas fa-file-contract',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Contracts',
      value: '67',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Expiring Soon',
      value: '8',
      icon: 'fas fa-exclamation-triangle',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Contract Value',
      value: '$2.4M',
      icon: 'fas fa-dollar-sign',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const contractsData = [
    {
      id: 1,
      contractNumber: 'CNT-2024-001',
      supplier: 'Tech Supplies Co.',
      category: 'Electronics',
      type: 'Service Agreement',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: '$150,000',
      status: 'Active'
    },
    {
      id: 2,
      contractNumber: 'CNT-2024-002',
      supplier: 'Office Materials Ltd',
      category: 'Office Supplies',
      type: 'Supply Contract',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      value: '$75,000',
      status: 'Active'
    },
    {
      id: 3,
      contractNumber: 'CNT-2023-045',
      supplier: 'Industrial Parts Inc',
      category: 'Manufacturing',
      type: 'Maintenance Contract',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      value: '$200,000',
      status: 'Expiring Soon'
    }
  ];

  const columns = [
    { key: 'contractNumber', label: 'Contract #' },
    {
      key: 'supplier',
      label: 'Supplier',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
        </div>
      )
    },
    { key: 'type', label: 'Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'value', label: 'Value' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Active' ? 'badge-success' : 'badge-warning';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => {
        setModalTitle(`Edit Contract ${row.contractNumber}`);
        setShowContractModal(true);
      },
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'View',
      onClick: (row) => console.log('View contract:', row),
      className: 'text-green-600 hover:text-green-900'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete contract:', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  return (
    <DashboardLayout title="Contracts" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => {
            setModalTitle('New Contract');
            setShowContractModal(true);
          }}>
            <i className="fas fa-plus me-2" />
            New Contract
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

        {/* Contracts Table */}
        <DataTable
          title="All Contracts"
          data={contractsData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Active', label: 'Active' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Pending', label: 'Pending' },
            { value: 'Terminated', label: 'Terminated' }
          ]}
          filterKey="status"
        />
      </div>

      {/* Contract Modal */}
      <Modal
        isOpen={showContractModal}
        onClose={() => setShowContractModal(false)}
        title={modalTitle}
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Contract Number" value="CNT-2024-004" readOnly />
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contract Type</label>
              <select className="input-field" required>
                <option value="">Select Type</option>
                <option>Service Agreement</option>
                <option>Supply Contract</option>
                <option>Maintenance Contract</option>
                <option>Consulting Agreement</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Contract Value" type="number" step="0.01" placeholder="0.00" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Terms</label>
              <select className="input-field">
                <option>Net 30</option>
                <option>Net 15</option>
                <option>Due on Receipt</option>
                <option>Net 60</option>
              </select>
            </div>
          </div>

          <Input label="Contract Title" placeholder="Contract title or description" required />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Terms & Conditions</label>
            <textarea className="input-field" rows="6" placeholder="Enter contract terms and conditions..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auto-Renewal</label>
              <select className="input-field">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Renewal Period</label>
              <select className="input-field">
                <option>1 Year</option>
                <option>6 Months</option>
                <option>2 Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea className="input-field" rows="3" placeholder="Additional notes (optional)" />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowContractModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Contract</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Contracts;