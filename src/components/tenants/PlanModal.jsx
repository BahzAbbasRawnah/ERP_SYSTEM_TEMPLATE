import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';

const PlanModal = ({ isOpen, onClose, plan }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    billing: 'monthly',
    maxUsers: '',
    maxStorage: '',
    maxApiCalls: '',
    modules: [],
    support: 'email',
    customDomain: false,
    apiAccess: false,
    isPopular: false,
    description: ''
  });

  const availableModules = [
    'HR', 'Finance', 'Inventory', 'CRM', 'Projects', 'POS', 'Logistics', 'Purchasing', 'Sales'
  ];

  const supportOptions = [
    { value: 'email', label: t('tenants.plans.support.email') },
    { value: 'chat', label: t('tenants.plans.support.chat') },
    { value: 'phone', label: t('tenants.plans.support.phone') },
    { value: 'dedicated', label: t('tenants.plans.support.dedicated') }
  ];

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        price: plan.price || '',
        currency: plan.currency || 'USD',
        billing: plan.billing || 'monthly',
        maxUsers: plan.limits?.maxUsers || '',
        maxStorage: plan.limits?.maxStorage || '',
        maxApiCalls: plan.limits?.maxApiCalls || '',
        modules: plan.features?.modules || [],
        support: plan.features?.support?.toLowerCase() || 'email',
        customDomain: plan.features?.customDomain || false,
        apiAccess: plan.features?.apiAccess || false,
        isPopular: plan.isPopular || false,
        description: plan.description || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        currency: 'USD',
        billing: 'monthly',
        maxUsers: '',
        maxStorage: '',
        maxApiCalls: '',
        modules: [],
        support: 'email',
        customDomain: false,
        apiAccess: false,
        isPopular: false,
        description: ''
      });
    }
  }, [plan]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (module) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter(m => m !== module)
        : [...prev.modules, module]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Plan form submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header onClose={onClose}>
        <Modal.Title>
          {plan ? t('tenants.plans.editPlan') : t('tenants.plans.createPlan')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Content>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tenants.plans.form.name')}
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
                {t('tenants.plans.form.description')}
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tenants.plans.form.price')}
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tenants.plans.form.currency')}
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="SAR">SAR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('tenants.plans.form.billing')}
              </label>
              <select
                value={formData.billing}
                onChange={(e) => handleInputChange('billing', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="monthly">{t('tenants.plans.billing.monthly')}</option>
                <option value="yearly">{t('tenants.plans.billing.yearly')}</option>
                <option value="custom">{t('tenants.plans.billing.custom')}</option>
              </select>
            </div>
          </div>

          {/* Limits */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              {t('tenants.plans.form.limits')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('tenants.plans.form.maxUsers')}
                </label>
                <input
                  type="number"
                  value={formData.maxUsers}
                  onChange={(e) => handleInputChange('maxUsers', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  min="1"
                  placeholder={t('tenants.plans.form.unlimitedPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('tenants.plans.form.maxStorage')} (MB)
                </label>
                <input
                  type="number"
                  value={formData.maxStorage}
                  onChange={(e) => handleInputChange('maxStorage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  min="100"
                  placeholder={t('tenants.plans.form.unlimitedPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('tenants.plans.form.maxApiCalls')}
                </label>
                <input
                  type="number"
                  value={formData.maxApiCalls}
                  onChange={(e) => handleInputChange('maxApiCalls', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  min="1000"
                  placeholder={t('tenants.plans.form.unlimitedPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              {t('tenants.plans.form.features')}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('tenants.plans.form.support')}
                </label>
                <select
                  value={formData.support}
                  onChange={(e) => handleInputChange('support', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  {supportOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="customDomain"
                    checked={formData.customDomain}
                    onChange={(e) => handleInputChange('customDomain', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="customDomain" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    {t('tenants.plans.form.customDomain')}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="apiAccess"
                    checked={formData.apiAccess}
                    onChange={(e) => handleInputChange('apiAccess', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="apiAccess" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    {t('tenants.plans.form.apiAccess')}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    {t('tenants.plans.form.isPopular')}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              {t('tenants.plans.form.modules')}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableModules.map(module => (
                <div key={module} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`module-${module}`}
                    checked={formData.modules.includes(module)}
                    onChange={() => handleModuleToggle(module)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`module-${module}`} className="ml-2 block text-sm text-gray-900 dark:text-white">
                    {module}
                  </label>
                </div>
              ))}
            </div>
          </div>
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
          {plan ? t('common.update') : t('common.create')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanModal;