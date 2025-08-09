import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';

const SalesManagement = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t('Sales'), href: '/sales' }
  ];

  // Sample data
  const leadsData = [
    {
      id: 1,
      company: 'Acme Corporation',
      contact: 'John Smith',
      email: 'john@acme.com',
      value: '$25,000',
      status: 'Qualified',
      lastContact: '2024-01-15',
      industry: 'Technology'
    },
    {
      id: 2,
      company: 'TechStart Inc',
      contact: 'Sarah Johnson',
      email: 'sarah@techstart.com',
      value: '$12,500',
      status: 'New',
      lastContact: '2024-01-14',
      industry: 'Startup'
    },
    {
      id: 3,
      company: 'Global Solutions',
      contact: 'Mike Davis',
      email: 'mike@global.com',
      value: '$45,000',
      status: 'Proposal',
      lastContact: '2024-01-13',
      industry: 'Enterprise'
    }
  ];

  const columns = [
    {
      key: 'company',
      header: t('Company'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.industry}</div>
        </div>
      )
    },
    {
      key: 'contact',
      header: t('Contact'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      )
    },
    {
      key: 'value',
      header: t('Value'),
      sortable: true
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'New', label: t('New') },
        { value: 'Qualified', label: t('Qualified') },
        { value: 'Proposal', label: t('Proposal') },
        { value: 'Negotiation', label: t('Negotiation') }
      ],
      render: (value) => {
        const statusColors = {
          'New': 'badge-info',
          'Qualified': 'badge-success',
          'Proposal': 'badge-warning',
          'Negotiation': 'badge-purple'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    },
    {
      key: 'lastContact',
      header: t('Last Contact'),
      sortable: true
    }
  ];

  const actions = [
    {
      label: t('View'),
      onClick: (row) => console.log('View', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: t('Contact'),
      onClick: (row) => console.log('Contact', row),
      className: 'text-green-600 hover:text-green-900'
    }
  ];

  return (
    <DashboardLayout title={t('Sales Management')} breadcrumbs={breadcrumbs}>
      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('Total Revenue')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                $125,430
                <i className="fas fa-arrow-up mx-2 text-green-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Active Leads')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                247
                <i className="fas fa-arrow-up mx-2 text-blue-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-plus text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-purple-100 truncate">{t('Conversion Rate')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                24.5%
                <i className="fas fa-arrow-up mx-2 text-purple-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-orange-100 truncate">{t('Deals Closed')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                89
                <i className="fas fa-arrow-up mx-2 text-orange-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-handshake text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Pipeline and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Sales Pipeline')}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full m-2" />
                  <span className="text-gray-600 dark:text-gray-400">{t('Prospects')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full m-2" />
                  <span className="text-gray-600 dark:text-gray-400">{t('Qualified')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full m-2" />
                  <span className="text-gray-600 dark:text-gray-400">{t('Closed')}</span>
                </div>
              </div>
            </div>
            <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-chart-bar text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">{t('Sales Pipeline Chart')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Recent Activity')}</h3>
              <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
                <i className="fas fa-ellipsis-h" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 m-2 bg-green-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Deal closed with Acme Corp')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$15,000 - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 m-2 bg-blue-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('New lead from website')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">TechStart Inc - 15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 m-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Follow-up scheduled')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Global Solutions - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 m-2 bg-purple-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Proposal sent')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Innovation Labs - 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <DataTable
        data={leadsData}
        columns={columns}
        actions={actions}
        searchable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
      />
    </DashboardLayout>
  );
};

export default SalesManagement;