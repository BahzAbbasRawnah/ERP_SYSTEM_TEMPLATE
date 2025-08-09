import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ResetPassword = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.resetPasswordTitle')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.enterNewPassword')}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <Input
          label={t('auth.newPassword')}
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          icon="fas fa-lock"
          required
        />
        
        <Input
          label={t('auth.confirmNewPassword')}
          name="confirmNewPassword"
          type="password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          icon="fas fa-lock"
          required
        />

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {t('auth.passwordRequirements')}
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• {t('auth.atLeast8Characters')}</li>
            <li>• {t('auth.containsUpperLower')}</li>
            <li>• {t('auth.containsNumber')}</li>
            <li>• {t('auth.containsSpecialChar')}</li>
          </ul>
        </div>

        <div>
          <Link to="/auth/login">
            <Button className="w-full">
              {t('auth.resetPassword')}
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <Link
            to="/auth/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {t('auth.backToSignIn')}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;