import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';

const POSReports = () => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t('navigation.pos'), href: '/pos' },
    { label: 'POS Reports' }
  ];

  const stats = [
    {
      title: 'Total Sales',
      value: '$12,847',
      icon: 'fas fa-dollar-sign',
      color: 'from-green-500 to-green-600',
      change: '+12.5% from yesterday'
    },
    {
      title: 'Transactions',
      value: '456',
      icon: 'fas fa-receipt',
      color: 'from-blue-500 to-blue-600',
      change: '+8.2% from yesterday'
    },
    {
      title: 'Avg. Transaction',
      value: '$28.17',
      icon: 'fas fa-chart-line',
      color: 'from-purple-500 to-purple-600',
      change: '+3.8% from yesterday'
    },
    {
      title: 'Customers',
      value: '234',
      icon: 'fas fa-users',
      color: 'from-orange-500 to-orange-600',
      change: '+15.3% from yesterday'
    }
  ];

  const topProducts = [
    {
      id: 1,
      product: 'Espresso Coffee',
      sold: 156,
      revenue: '$546.00',
      icon: 'fas fa-coffee',
      color: 'blue'
    },
    {
      id: 2,
      product: 'Club Sandwich',
      sold: 89,
      revenue: '$800.11',
      icon: 'fas fa-hamburger',
      color: 'green'
    },
    {
      id: 3,
      product: 'Fresh Juice',
      sold: 67,
      revenue: '$284.75',
      icon: 'fas fa-glass-whiskey',
      color: 'purple'
    }
  ];

  const transactionsData = [
    {
      id: 1,
      transactionId: '#TXN001',
      time: '09:15 AM',
      items: 'Coffee x2, Sandwich x1',
      amount: '$15.99',
      payment: 'Card',
      status: 'Completed'
    },
    {
      id: 2,
      transactionId: '#TXN002',
      time: '09:32 AM',
      items: 'Juice x1, Pastry x2',
      amount: '$15.75',
      payment: 'Cash',
      status: 'Completed'
    }
  ];

  const columns = [
    { key: 'transactionId', label: 'Transaction ID' },
    { key: 'time', label: 'Time' },
    { key: 'items', label: 'Items' },
    { key: 'amount', label: 'Amount' },
    { key: 'payment', label: 'Payment' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="badge badge-success">{value}</span>
      )
    }
  ];

  return (
    <DashboardLayout title="POS Reports" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export Report
          </Button>
          <Button>
            <i className="fas fa-chart-bar me-2" />
            Generate Report
          </Button>
        </div>

        {/* Report Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <select className="input-field">
                <option>Today</option>
                <option>Yesterday</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Type</label>
              <select className="input-field">
                <option>Sales Summary</option>
                <option>Product Performance</option>
                <option>Customer Analysis</option>
                <option>Payment Methods</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select className="input-field">
                <option>All Categories</option>
                <option>Beverages</option>
                <option>Food</option>
                <option>Snacks</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <i className="fas fa-search me-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Sales Summary Cards */}
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
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Trend</h3>
            </div>
            <div className="p-6">
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Sales Chart Placeholder</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 bg-${product.color}-100 dark:bg-${product.color}-900 rounded-lg flex items-center justify-center me-2`}>
                        <i className={`${product.icon} text-${product.color}-600 dark:text-${product.color}-400`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{product.product}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{product.sold} sold</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Report Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Details</h3>
              <Button variant="success">
                <i className="fas fa-download me-2" />
                Export
              </Button>
            </div>
          </div>
          <DataTable
            data={transactionsData}
            columns={columns}
            showHeader={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POSReports;