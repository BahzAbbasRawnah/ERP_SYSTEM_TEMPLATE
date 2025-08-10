import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BillingHistory = ({ tenant }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Mock billing data
  const billingHistory = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      date: '2024-01-15',
      amount: 199,
      currency: 'USD',
      status: 'paid',
      plan: 'Enterprise',
      period: '2024-01-15 to 2024-02-15',
      paymentMethod: '**** **** **** 1234',
      downloadUrl: '#'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2023-012',
      date: '2023-12-15',
      amount: 199,
      currency: 'USD',
      status: 'paid',
      plan: 'Enterprise',
      period: '2023-12-15 to 2024-01-15',
      paymentMethod: '**** **** **** 1234',
      downloadUrl: '#'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2023-011',
      date: '2023-11-15',
      amount: 199,
      currency: 'USD',
      status: 'paid',
      plan: 'Enterprise',
      period: '2023-11-15 to 2023-12-15',
      paymentMethod: '**** **** **** 1234',
      downloadUrl: '#'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2023-010',
      date: '2023-10-15',
      amount: 79,
      currency: 'USD',
      status: 'paid',
      plan: 'Professional',
      period: '2023-10-15 to 2023-11-15',
      paymentMethod: '**** **** **** 1234',
      downloadUrl: '#'
    }
  ];

  const upcomingBilling = {
    nextBillingDate: '2024-02-15',
    amount: 199,
    currency: 'USD',
    plan: 'Enterprise',
    paymentMethod: '**** **** **** 1234'
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[status] || colors.pending;
  };

  const totalPaid = billingHistory
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.billing.totalPaid')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${totalPaid.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500 text-green-100">
              <i className="fas fa-dollar-sign text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.billing.nextBilling')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${upcomingBilling.amount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(upcomingBilling.nextBillingDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 text-blue-100">
              <i className="fas fa-calendar text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.billing.invoices')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {billingHistory.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500 text-purple-100">
              <i className="fas fa-receipt text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.billing.avgMonthly')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ${Math.round(totalPaid / billingHistory.length)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-500 text-indigo-100">
              <i className="fas fa-chart-line text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Billing */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.billing.upcomingBilling')}
        </h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-medium text-blue-900 dark:text-blue-200">
                {t('tenants.billing.nextCharge')}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                ${upcomingBilling.amount} {t('tenants.billing.willBeCharged')} {new Date(upcomingBilling.nextBillingDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                {t('tenants.billing.paymentMethod')}: {upcomingBilling.paymentMethod}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {t('tenants.billing.updatePayment')}
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                {t('tenants.billing.changePlan')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('tenants.billing.history')}
            </h3>
            <div className="flex gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">{t('tenants.billing.allTime')}</option>
                <option value="thisYear">{t('tenants.billing.thisYear')}</option>
                <option value="lastYear">{t('tenants.billing.lastYear')}</option>
                <option value="last6Months">{t('tenants.billing.last6Months')}</option>
              </select>
              <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm">
                <i className="fas fa-download mx-1" />
                {t('tenants.billing.exportAll')}
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.invoice')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.plan')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.billing.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {billingHistory.map(invoice => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {invoice.period}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ${invoice.amount} {invoice.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {invoice.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(invoice.status)}`}>
                      {t(`tenants.billing.statuses.${invoice.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <i className="fas fa-eye mx-1" />
                        {t('tenants.billing.view')}
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-download mx-1" />
                        {t('tenants.billing.download')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('tenants.billing.paymentMethods')}
          </h3>
          <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
            <i className="fas fa-plus mx-1" />
            {t('tenants.billing.addPaymentMethod')}
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-credit-card text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  **** **** **** 1234
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('tenants.billing.expires')} 12/25 • {t('tenants.billing.primary')}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-primary-600 hover:text-primary-800 text-sm">
                {t('common.edit')}
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm">
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;