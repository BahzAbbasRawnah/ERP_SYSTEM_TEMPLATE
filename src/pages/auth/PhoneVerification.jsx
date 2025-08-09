import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import useAuthStore from '../../stores/useAuthStore';

const PhoneVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.verifyYourPhone')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.verificationCodeSent')}
        </p>
      </div>

      <div className="mt-8">
        <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-mobile-alt text-primary-600 dark:text-primary-400 text-2xl" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
            {t('auth.enterVerificationCode')}
          </label>
          <div className="flex justify-center space-x-2 rtl:space-x-reverse">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full" 
            loading={loading}
            onClick={async () => {
              setLoading(true);
              // Simulate verification
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Mock successful login
              const userData = {
                id: 1,
                name: 'John Doe',
                email: 'user@example.com',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              };
              const token = 'mock-jwt-token';
              
              login(userData, token);
              navigate('/dashboard', { replace: true });
              setLoading(false);
            }}
          >
            {t('auth.verifyPhoneNumber')}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('auth.didntReceiveCode')}{' '}
              <Link to="/auth/phone-verification" className="font-medium text-primary-600 hover:text-primary-500">
                {t('auth.resendCode')}
              </Link>
            </p>
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
      </div>
    </AuthLayout>
  );
};

export default PhoneVerification;