import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';

const Logistics = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t('Logistics'), href: '/logistics' }
  ];

  const shipmentsData = [
    {
      id: 1,
      shipmentId: 'SH-2024-001',
      origin: 'Los Angeles, CA',
      originDetail: 'Warehouse A',
      destination: 'New York, NY',
      destinationDetail: 'Customer Site',
      status: 'In Transit',
      eta: 'Jan 18, 2024',
      carrier: 'FedEx'
    },
    {
      id: 2,
      shipmentId: 'SH-2024-002',
      origin: 'Chicago, IL',
      originDetail: 'Warehouse B',
      destination: 'Miami, FL',
      destinationDetail: 'Distribution Center',
      status: 'Delayed',
      eta: 'Jan 20, 2024',
      carrier: 'UPS'
    },
    {
      id: 3,
      shipmentId: 'SH-2024-003',
      origin: 'Seattle, WA',
      originDetail: 'Warehouse C',
      destination: 'Denver, CO',
      destinationDetail: 'Retail Store',
      status: 'Delivered',
      eta: 'Jan 16, 2024',
      carrier: 'DHL'
    }
  ];

  const columns = [
    {
      key: 'shipmentId',
      header: t('Shipment ID'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'origin',
      header: t('Origin'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.originDetail}</div>
        </div>
      )
    },
    {
      key: 'destination',
      header: t('Destination'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.destinationDetail}</div>
        </div>
      )
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Pending', label: t('Pending') },
        { value: 'In Transit', label: t('In Transit') },
        { value: 'Delivered', label: t('Delivered') },
        { value: 'Delayed', label: t('Delayed') }
      ],
      render: (value) => {
        const statusColors = {
          'In Transit': 'badge-info',
          'Delayed': 'badge-warning',
          'Delivered': 'badge-success',
          'Pending': 'badge-gray'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    },
    {
      key: 'eta',
      header: t('ETA'),
      sortable: true
    },
    {
      key: 'carrier',
      header: t('Carrier'),
      sortable: true
    }
  ];

  const actions = [
    {
      label: t('Track'),
      onClick: (row) => console.log('Track', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: t('Details'),
      onClick: (row) => console.log('Details', row),
      className: 'text-green-600 hover:text-green-900'
    }
  ];

  return (
    <DashboardLayout title={t('Logistics Management')} breadcrumbs={breadcrumbs}>
      {/* Logistics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Active Shipments')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                156
                <i className="fas fa-arrow-up ml-2 text-blue-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-truck text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('On-Time Delivery')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                94.5%
                <i className="fas fa-arrow-up ml-2 text-green-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-orange-100 truncate">{t('In Transit')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                89
                <i className="fas fa-arrow-up ml-2 text-orange-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-shipping-fast text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-purple-100 truncate">{t('Warehouses')}</dt>
              <dd className="text-2xl font-bold text-white flex items-center">
                12
                <i className="fas fa-arrow-up ml-2 text-purple-200" />
              </dd>
            </div>
            <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-warehouse text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Shipment Tracking and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('Shipment Tracking')}</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full me-1" />
                  <span className="text-gray-600 dark:text-gray-400">{t('In Transit')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full me-1" />
                  <span className="text-gray-600 dark:text-gray-400">{t('Delivered')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full me-1" />
                  <span className="text-gray-600 dark:text-gray-400">{t('Delayed')}</span>
                </div>
              </div>
            </div>
            <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map-marked-alt text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500 dark:text-gray-400">{t('Interactive Shipment Map')}</p>
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
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Shipment SH-001 delivered')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">New York - 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('New shipment created')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SH-045 - 15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Shipment delayed')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SH-032 - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{t('Route optimized')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Route A-12 - 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <DataTable
        title={t('Active Shipments')}
        data={shipmentsData}
        columns={columns}
        actions={actions}
        searchable
        filterable
        exportable
        onAdd={() => console.log('New Shipment')}
        addButtonText={t('New Shipment')}
        headerActions={
          <Button variant="secondary" className="mr-3">
            <i className="fas fa-map me-1" />
            {t('Track Shipment')}
          </Button>
        }
      />
    </DashboardLayout>
  );
};

export default Logistics;