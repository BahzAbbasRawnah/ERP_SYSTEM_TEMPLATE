import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';

const TwoFactor = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState(['', '', '', '', '', '']);

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
          {t('auth.twoFactorAuthentication')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.enter6DigitCode')}
        </p>
      </div>

      <div className="mt-8">
        <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-shield-alt text-primary-600 dark:text-primary-400 text-2xl" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
            {t('auth.authenticationCode')}
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
          <Link to="/dashboard">
            <Button className="w-full">
              {t('auth.verifyContinue')}
            </Button>
          </Link>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t('auth.havingTrouble')}
            </p>
            <Link to="/auth/login" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              {t('auth.useBackupCodes')}
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
      </div>
    </AuthLayout>
  );
};

export default TwoFactor;