import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.createAccount')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.signInToAccount')}
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <Input
          label={t('common.name')}
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          icon="fas fa-user"
          required
        />
        
        <Input
          label={t('common.name')}
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          icon="fas fa-user"
          required
        />
        
        <Input
          label={t('common.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon="fas fa-envelope"
          required
        />
        
        <Input
          label={t('common.phone')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          icon="fas fa-phone"
          required
        />
        
        <Input
          label={t('common.password')}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          icon="fas fa-lock"
          required
        />
        
        <Input
          label={t('auth.confirmPassword')}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon="fas fa-lock"
          required
        />
        
        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="agree-terms" className="ltr:ml-2 rtl:mr-2 block text-sm text-gray-900 dark:text-gray-300">
            {t('auth.agreeToTerms')} <Link to="#" className="text-primary-600 hover:text-primary-500">{t('auth.termsOfService')}</Link> {t('auth.and')} <Link to="#" className="text-primary-600 hover:text-primary-500">{t('auth.privacyPolicy')}</Link>
          </label>
        </div>
        
        <div>
          <Link to="/auth/email-verification">
            <Button className="w-full">
              {t('auth.signUp')}
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link
              to="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {t('auth.signIn')}
            </Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;