import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to reset password for demo
    window.location.href = '/auth/reset-password';
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.forgotPasswordTitle')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.enterEmailToReset')}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <Input
          label={t('common.email')}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="fas fa-envelope"
          required
        />
        
        <div>
          <Link to="/auth/reset-password">
            <Button className="w-full">
              {t('auth.sendResetLink')}
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <Link
            to="/auth/login"
            className="font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center"
          >
            <i className="fas fa-arrow-left me-2" />
            {t('auth.backToSignIn')}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;