import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';

const EmailVerification = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.checkYourEmail')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.verificationLinkSent')}
        </p>
      </div>

      <div className="mt-8 text-center">
        <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-envelope text-primary-600 dark:text-primary-400 text-2xl" />
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {t('auth.checkInboxSpam')}
        </p>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          {t('auth.clickVerificationLink')}
        </p>

        <div className="space-y-4">
          <Link to="/auth/phone-verification">
            <Button className="w-full">
              {t('auth.resendVerificationEmail')}
            </Button>
          </Link>
          
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

export default EmailVerification;