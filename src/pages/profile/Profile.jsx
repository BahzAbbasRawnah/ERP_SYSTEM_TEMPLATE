import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Profile = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator',
    department: 'Information Technology',
    bio: 'Experienced system administrator with 8+ years in enterprise environments. Specialized in cloud infrastructure and security management.'
  });
  
  const breadcrumbs = [
    { label: t('Profile'), href: '/profile' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DashboardLayout title={t('Profile Settings')} breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img 
                  className="w-24 h-24 rounded-full mx-auto" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
                  <i className="fas fa-camera text-sm" />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{formData.jobTitle}</p>
              <div className="mt-4 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                  {t('Active')}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                  {t('Admin')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('Quick Stats')}</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Projects')}</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Tasks Completed')}</span>
                <span className="font-semibold">248</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Hours Logged')}</span>
                <span className="font-semibold">1,240</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Personal Information')}</h3>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('First Name')}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  label={t('Last Name')}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <Input
                type="email"
                label={t('Email Address')}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />

              <Input
                type="tel"
                label={t('Phone Number')}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />

              <Input
                label={t('Job Title')}
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Department')}
                </label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Information Technology">{t('Information Technology')}</option>
                  <option value="Human Resources">{t('Human Resources')}</option>
                  <option value="Finance">{t('Finance')}</option>
                  <option value="Marketing">{t('Marketing')}</option>
                  <option value="Operations">{t('Operations')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('Bio')}
                </label>
                <textarea 
                  name="bio"
                  rows="4" 
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="input-field" 
                  placeholder={t('Tell us about yourself...')}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="secondary">
                  {t('Cancel')}
                </Button>
                <Button variant="primary" type="submit">
                  {t('Save Changes')}
                </Button>
              </div>
            </form>
          </div>

          {/* Security Settings */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Security Settings')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('Two-Factor Authentication')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('Add an extra layer of security to your account')}</p>
                </div>
                <Button variant="success">
                  {t('Enabled')}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{t('Change Password')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('Update your password regularly')}</p>
                </div>
                <Button variant="primary">
                  {t('Change')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;