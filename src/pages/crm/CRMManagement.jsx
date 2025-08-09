import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CRMManagement = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  
  const breadcrumbs = [
    { label: t('CRM'), href: '/crm' }
  ];

  const customersData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: 'Tech Solutions',
      status: 'Pending'
    }
  ];

  const leadsData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      status: 'New',
      value: '$5,000'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      title: 'CEO',
      status: 'Qualified',
      value: '$15,000'
    },
    {
      id: 3,
      name: 'Lisa Brown',
      title: 'CTO',
      status: 'Hot',
      value: '$25,000'
    }
  ];

  const dealsData = [
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'Global Tech Inc.',
      value: '$50,000',
      status: 'Closed Won',
      date: 'Closed 2 days ago'
    },
    {
      id: 2,
      title: 'Consulting Services',
      company: 'StartupXYZ',
      value: '$25,000',
      status: 'Negotiation',
      date: 'Expected close: Next week'
    }
  ];

  const customerColumns = [
    {
      key: 'name',
      header: t('Name'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'email',
      header: t('Email'),
      sortable: true
    },
    {
      key: 'company',
      header: t('Company'),
      sortable: true
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      render: (value) => {
        const statusColors = {
          'Active': 'badge-success',
          'Pending': 'badge-warning',
          'Inactive': 'badge-gray'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    }
  ];

  const customerActions = [
    {
      label: t('Edit'),
      onClick: (row) => setShowModal(true),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: t('Delete'),
      onClick: (row) => console.log('Delete', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'customers':
        return (
          <DataTable
            data={customersData}
            columns={customerColumns}
            actions={customerActions}
            searchable
            selectable
          />
        );
      case 'leads':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadsData.map((lead) => (
              <div key={lead.id} className="card p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{lead.status} Lead</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{lead.name} - {lead.title}</p>
                <div className="flex justify-between items-center">
                  <span className={`badge ${
                    lead.status === 'New' ? 'badge-info' :
                    lead.status === 'Qualified' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-sm text-gray-500">{lead.value}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'deals':
        return (
          <div className="space-y-4">
            {dealsData.map((deal) => (
              <div key={deal.id} className={`card p-4 border-l-4 ${
                deal.status === 'Closed Won' ? 'border-green-500' : 'border-yellow-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{deal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{deal.company}</p>
                  </div>
                  <span className={`text-lg font-bold ${
                    deal.status === 'Closed Won' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {deal.value}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`badge ${
                    deal.status === 'Closed Won' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {deal.status}
                  </span>
                  <span className="text-sm text-gray-500">{deal.date}</span>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title={t('Customer Relationship Management')} breadcrumbs={breadcrumbs}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Total Customers')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                1,234
                <i className="fas fa-arrow-up ml-2 text-blue-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('Active Deals')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                89
                <i className="fas fa-arrow-up ml-2 text-green-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-handshake text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-yellow-100 truncate">{t('New Leads')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                156
                <i className="fas fa-arrow-up ml-2 text-yellow-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-yellow-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-purple-100 truncate">{t('Revenue')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                $45K
                <i className="fas fa-arrow-up ml-2 text-purple-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="px-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'customers', label: t('Customers'), icon: 'fas fa-users' },
              { key: 'leads', label: t('Leads'), icon: 'fas fa-chart-line' },
              { key: 'deals', label: t('Deals'), icon: 'fas fa-handshake' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} me-1`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('Add New Customer')}
        size="medium"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('First Name')}
              required
            />
            <Input
              label={t('Last Name')}
              required
            />
          </div>
          <Input
            type="email"
            label={t('Email')}
            required
          />
          <Input
            label={t('Company')}
          />
          <Input
            type="tel"
            label={t('Phone')}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t('Cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('Save Customer')}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default CRMManagement;