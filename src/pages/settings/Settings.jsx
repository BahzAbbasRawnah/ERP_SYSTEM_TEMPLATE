import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import useThemeStore from '../../stores/useThemeStore';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, colorScheme, setTheme, setColorScheme } = useThemeStore();
  
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'ERP Company',
    companyEmail: 'info@erpcompany.com',
    companyPhone: '+1234567890',
    companyAddress: '123 Business Street, City, Country',
    currency: 'USD',
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    language: i18n.language
  });

  const tabs = [
    { id: 'general', label: t('settings.general'), icon: 'fas fa-cog' },
    { id: 'appearance', label: t('settings.appearance'), icon: 'fas fa-palette' },
    { id: 'notifications', label: t('settings.notifications'), icon: 'fas fa-bell' },
    { id: 'security', label: t('settings.security'), icon: 'fas fa-shield-alt' },
    { id: 'integrations', label: t('settings.integrations'), icon: 'fas fa-plug' }
  ];

  const themes = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleSettingChange('language', lang);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('settings.companyName')}
          value={settings.companyName}
          onChange={(e) => handleSettingChange('companyName', e.target.value)}
        />
        <Input
          label={t('settings.companyEmail')}
          type="email"
          value={settings.companyEmail}
          onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
        />
        <Input
          label={t('settings.companyPhone')}
          value={settings.companyPhone}
          onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
        />
        <Select
          label={t('settings.currency')}
          value={settings.currency}
          onChange={(value) => handleSettingChange('currency', value)}
          options={[
            { value: 'USD', label: 'USD - US Dollar' },
            { value: 'EUR', label: 'EUR - Euro' },
            { value: 'GBP', label: 'GBP - British Pound' },
            { value: 'SAR', label: 'SAR - Saudi Riyal' }
          ]}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('settings.companyAddress')}
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500"
          rows="3"
          value={settings.companyAddress}
          onChange={(e) => handleSettingChange('companyAddress', e.target.value)}
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('settings.colorScheme')}
        </h4>
        <div className="flex space-x-4">
          <button
            onClick={() => setColorScheme('light')}
            className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
              colorScheme === 'light'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <i className="fas fa-sun me-1"></i>
            {t('settings.light')}
          </button>
          <button
            onClick={() => setColorScheme('dark')}
            className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
              colorScheme === 'dark'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <i className="fas fa-moon me-1"></i>
            {t('settings.dark')}
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('settings.themeColor')}
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                theme === themeOption.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${themeOption.color} mb-2`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {themeOption.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('settings.language')}
        </h4>
        <div className="flex space-x-4">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
              settings.language === 'en'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <span className="me-1">🇺🇸</span>
            English
          </button>
          <button
            onClick={() => handleLanguageChange('ar')}
            className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
              settings.language === 'ar'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <span className="me-1">🇸🇦</span>
            العربية
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'notifications':
        return (
          <div className="text-center py-12">
            <i className="fas fa-bell text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">
              {t('settings.notificationsComingSoon')}
            </p>
          </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <i className="fas fa-shield-alt text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">
              {t('settings.securityComingSoon')}
            </p>
          </div>
        );
      case 'integrations':
        return (
          <div className="text-center py-12">
            <i className="fas fa-plug text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">
              {t('settings.integrationsComingSoon')}
            </p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.settings') }
  ];

  return (
    <DashboardLayout 
      title={t('settings.title')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className={`${tab.icon} ltr:mr-3 rtl:ml-3`}></i>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h3>
                </div>

                {renderTabContent()}

                {(activeTab === 'general' || activeTab === 'appearance') && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-end space-x-3">
                      <Button variant="secondary">
                        {t('common.cancel')}
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        {t('common.save')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;