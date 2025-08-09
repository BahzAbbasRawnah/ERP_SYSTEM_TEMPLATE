import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';
import StatsCard from '../components/ui/StatsCard';
import GridLayout from '../components/layout/GridLayout';

const ComponentsShowcase = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t('Components'), href: '/components' }
  ];

  return (
    <DashboardLayout title={t('UI Components')} breadcrumbs={breadcrumbs}>
      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Buttons')}</h2>
        <Card>
          <GridLayout columns={3}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Primary Buttons')}</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <i className="fas fa-plus me-1" />
                  {t('Primary Button')}
                </Button>
                <Button variant="primary" disabled className="w-full">
                  <i className="fas fa-spinner fa-spin me-1" />
                  {t('Loading...')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Secondary Buttons')}</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-edit me-1" />
                  {t('Secondary Button')}
                </Button>
                <Button variant="secondary" disabled className="w-full">
                  {t('Disabled Button')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Icon Buttons')}</h3>
              <div className="flex space-x-2">
                <button className="p-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">
                  <i className="fas fa-heart" />
                </button>
                <button className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                  <i className="fas fa-share" />
                </button>
                <button className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          </GridLayout>
        </Card>
      </section>

      {/* Form Elements Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Form Elements')}</h2>
        <Card>
          <GridLayout columns={2}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Input Fields')}</h3>
              <div className="space-y-4">
                <Input
                  type="email"
                  label={t('Email')}
                  placeholder={t('Enter your email')}
                />
                <Input
                  type="password"
                  label={t('Password')}
                  placeholder={t('Enter your password')}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Search')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder={t('Search...')}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Select & Textarea')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Country')}
                  </label>
                  <select className="input-field">
                    <option>{t('Select a country')}</option>
                    <option>Saudi Arabia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Message')}
                  </label>
                  <textarea
                    className="input-field"
                    rows="3"
                    placeholder={t('Enter your message')}
                  />
                </div>
              </div>
            </div>
          </GridLayout>
        </Card>
      </section>

      {/* Cards Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Cards')}</h2>
        <GridLayout columns={3}>
          <Card title={t('Basic Card')} subtitle={t('This is a basic card with some content and actions.')}>
            <div className="flex space-x-2">
              <Button variant="primary">{t('Action')}</Button>
              <Button variant="secondary">{t('Cancel')}</Button>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-primary-400 to-primary-600 -m-6 mb-6" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('Card with Image')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('This card includes a header image or gradient.')}
              </p>
            </div>
          </Card>

          <StatsCard
            title={t('Total Users')}
            value="2,350"
            change="+12% from last month"
            icon="fas fa-users"
          />
        </GridLayout>
      </section>

      {/* Badges Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Badges & Tags')}</h2>
        <Card>
          <GridLayout columns={2}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Status Badges')}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">{t('Success')}</Badge>
                <Badge variant="warning">{t('Warning')}</Badge>
                <Badge variant="error">{t('Error')}</Badge>
                <Badge variant="info">{t('Info')}</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Custom Badges')}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info" icon="fas fa-star">{t('Premium')}</Badge>
                <Badge variant="default">{t('Draft')}</Badge>
                <Badge variant="purple">{t('Active')}</Badge>
              </div>
            </div>
          </GridLayout>
        </Card>
      </section>

      {/* Alerts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Alerts & Notifications')}</h2>
        <div className="space-y-4">
          <Alert type="success" title={t('Success')}>
            <p>{t('Your changes have been saved successfully.')}</p>
          </Alert>
          <Alert type="warning" title={t('Warning')}>
            <p>{t('Please review your settings before proceeding.')}</p>
          </Alert>
          <Alert type="error" title={t('Error')}>
            <p>{t('There was an error processing your request.')}</p>
          </Alert>
          <Alert type="info" title={t('Information')}>
            <p>{t('New features are available in this update.')}</p>
          </Alert>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ComponentsShowcase;