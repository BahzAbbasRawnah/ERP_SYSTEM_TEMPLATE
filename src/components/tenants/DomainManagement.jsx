import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DomainManagement = ({ tenant }) => {
  const { t } = useTranslation();
  const [newDomain, setNewDomain] = useState('');

  // Mock domain data
  const domains = [
    {
      id: 1,
      domain: tenant.domain,
      type: 'subdomain',
      status: 'active',
      sslStatus: 'active',
      createdAt: '2024-01-15',
      isPrimary: true
    },
    ...(tenant.customDomain ? [{
      id: 2,
      domain: tenant.customDomain,
      type: 'custom',
      status: 'active',
      sslStatus: 'active',
      createdAt: '2024-01-16',
      isPrimary: false
    }] : [])
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || colors.pending;
  };

  const handleAddDomain = (e) => {
    e.preventDefault();
    // Handle domain addition
    console.log('Adding domain:', newDomain);
    setNewDomain('');
  };

  return (
    <div className="space-y-6">
      {/* Add New Domain */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.domains.addNew')}
        </h3>
        <form onSubmit={handleAddDomain} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="erp.company.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            {t('tenants.domains.add')}
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t('tenants.domains.addHelp')}
        </p>
      </div>

      {/* Current Domains */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('tenants.domains.current')}
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {domains.map(domain => (
            <div key={domain.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {domain.domain}
                    </h4>
                    {domain.isPrimary && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {t('tenants.domains.primary')}
                      </span>
                    )}
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                      {t(`tenants.domains.types.${domain.type}`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>{t('tenants.domains.status')}:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(domain.status)}`}>
                        {t(`tenants.domains.statuses.${domain.status}`)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{t('tenants.domains.ssl')}:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(domain.sslStatus)}`}>
                        {t(`tenants.domains.ssl.${domain.sslStatus}`)}
                      </span>
                    </div>
                    <span>{t('tenants.domains.added')}: {new Date(domain.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!domain.isPrimary && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      {t('tenants.domains.makePrimary')}
                    </button>
                  )}
                  <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                    {t('tenants.domains.configure')}
                  </button>
                  {domain.type === 'custom' && (
                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                      {t('common.delete')}
                    </button>
                  )}
                </div>
              </div>

              {/* Domain Configuration Details */}
              {domain.type === 'custom' && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {t('tenants.domains.dnsConfiguration')}
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">CNAME:</span>
                      <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                        {domain.domain} → app.yourdomain.com
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">A Record:</span>
                      <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                        {domain.domain} → 192.168.1.100
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SSL Certificate Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.domains.sslManagement')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              {t('tenants.domains.sslStatus')}
            </h4>
            <div className="space-y-2">
              {domains.map(domain => (
                <div key={domain.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {domain.domain}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(domain.sslStatus)}`}>
                      {t(`tenants.domains.ssl.${domain.sslStatus}`)}
                    </span>
                    <button className="text-sm text-primary-600 hover:text-primary-800">
                      {t('tenants.domains.renew')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              {t('tenants.domains.sslActions')}
            </h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                {t('tenants.domains.generateCertificate')}
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {t('tenants.domains.uploadCertificate')}
              </button>
              <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                {t('tenants.domains.renewAll')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Verification */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.domains.verification')}
        </h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex">
            <i className="fas fa-exclamation-triangle text-yellow-400 me-3 mt-1" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                {t('tenants.domains.verificationRequired')}
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                {t('tenants.domains.verificationHelp')}
              </p>
              <div className="mt-3">
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                  {t('tenants.domains.verifyNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainManagement;