import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';

const TenantModal = ({ isOpen, onClose, tenant }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    customDomain: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    plan: 'basic',
    status: 'active',
    maxUsers: 5,
    maxStorage: 1024,
    databaseType: 'schema', // 'database' or 'schema'
    databaseName: '',
    schemaName: '',
    sslEnabled: false,
    autoRenewal: true,
    gracePeriod: 7
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name || '',
        domain: tenant.domain || '',
        customDomain: tenant.customDomain || '',
        ownerName: tenant.owner?.name || '',
        ownerEmail: tenant.owner?.email || '',
        ownerPhone: tenant.owner?.phone || '',
        plan: tenant.plan || 'basic',
        status: tenant.status || 'active',
        maxUsers: tenant.maxUsers || 5,
        maxStorage: tenant.maxStorage || 1024,
        databaseType: tenant.database ? 'database' : 'schema',
        databaseName: tenant.database || '',
        schemaName: tenant.schema || '',
        sslEnabled: tenant.sslEnabled || false,
        autoRenewal: tenant.autoRenewal || true,
        gracePeriod: tenant.gracePeriod || 7
      });
    } else {
      setFormData({
        name: '',
        domain: '',
        customDomain: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        plan: 'basic',
        status: 'active',
        maxUsers: 5,
        maxStorage: 1024,
        databaseType: 'schema',
        databaseName: '',
        schemaName: '',
        sslEnabled: false,
        autoRenewal: true,
        gracePeriod: 7
      });
    }
  }, [tenant]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: t('tenants.modal.tabs.basic'), icon: 'fas fa-info-circle' },
    { id: 'subscription', label: t('tenants.modal.tabs.subscription'), icon: 'fas fa-credit-card' },
    { id: 'technical', label: t('tenants.modal.tabs.technical'), icon: 'fas fa-cogs' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <Modal.Header onClose={onClose}>
        <Modal.Title>
          {tenant ? t('tenants.modal.editTitle') : t('tenants.modal.createTitle')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Content>
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <i className={`${tab.icon} me-2`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info & Owner Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* Tenant Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  {t('tenants.modal.sections.tenantInfo')}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.domain')}
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={formData.domain}
                        onChange={(e) => handleInputChange('domain', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="tenant-name"
                        required
                      />
                      <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-gray-500 dark:text-gray-400">
                        .yourdomain.com
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.status')}
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="active">{t('tenants.status.active')}</option>
                      <option value="trial">{t('tenants.status.trial')}</option>
                      <option value="suspended">{t('tenants.status.suspended')}</option>
                      <option value="expired">{t('tenants.status.expired')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  {t('tenants.modal.sections.ownerInfo')}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.ownerName')}
                    </label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.ownerEmail')}
                    </label>
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.ownerPhone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('tenants.modal.fields.plan')}
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => handleInputChange('plan', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="basic">{t('tenants.plans.basic')}</option>
                  <option value="professional">{t('tenants.plans.professional')}</option>
                  <option value="enterprise">{t('tenants.plans.enterprise')}</option>
                  <option value="custom">{t('tenants.plans.custom')}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('tenants.modal.fields.maxUsers')}
                  </label>
                  <input
                    type="number"
                    value={formData.maxUsers}
                    onChange={(e) => handleInputChange('maxUsers', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('tenants.modal.fields.maxStorage')} (MB)
                  </label>
                  <input
                    type="number"
                    value={formData.maxStorage}
                    onChange={(e) => handleInputChange('maxStorage', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    min="100"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoRenewal"
                  checked={formData.autoRenewal}
                  onChange={(e) => handleInputChange('autoRenewal', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="autoRenewal" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  {t('tenants.modal.fields.autoRenewal')}
                </label>
              </div>
            </div>
          )}

          {/* Technical Configuration Tab */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              {/* Database Configuration */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  {t('tenants.modal.sections.databaseConfig')}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.databaseType')}
                    </label>
                    <select
                      value={formData.databaseType}
                      onChange={(e) => handleInputChange('databaseType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="schema">{t('tenants.modal.databaseTypes.schema')}</option>
                      <option value="database">{t('tenants.modal.databaseTypes.database')}</option>
                    </select>
                  </div>
                  {formData.databaseType === 'database' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('tenants.modal.fields.databaseName')}
                      </label>
                      <input
                        type="text"
                        value={formData.databaseName}
                        onChange={(e) => handleInputChange('databaseName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="tenant_database_name"
                      />
                    </div>
                  )}
                  {formData.databaseType === 'schema' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('tenants.modal.fields.schemaName')}
                      </label>
                      <input
                        type="text"
                        value={formData.schemaName}
                        onChange={(e) => handleInputChange('schemaName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="tenant_schema_name"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Domain Configuration */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  {t('tenants.modal.sections.domainConfig')}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('tenants.modal.fields.customDomain')}
                    </label>
                    <input
                      type="text"
                      value={formData.customDomain}
                      onChange={(e) => handleInputChange('customDomain', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="erp.company.com"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {t('tenants.modal.fields.customDomainHelp')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sslEnabled"
                      checked={formData.sslEnabled}
                      onChange={(e) => handleInputChange('sslEnabled', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sslEnabled" className="ml-2 block text-sm text-gray-900 dark:text-white">
                      {t('tenants.modal.fields.sslEnabled')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Modal.Content>

      <Modal.Footer>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700"
        >
          {tenant ? t('common.update') : t('common.create')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TenantModal;