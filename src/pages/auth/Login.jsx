import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../stores/useAuthStore';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setLoading, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const userData = {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
      const token = 'mock-jwt-token';
      
      login(userData, token);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t('auth.welcomeBack')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('auth.signInToAccount')}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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
            label={t('common.password')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon="fas fa-lock"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ltr:ml-2 rtl:mr-2 block text-sm text-gray-900 dark:text-gray-300">
              {t('auth.rememberMe')}
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/auth/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={!formData.email || !formData.password}
          >
            {t('common.login')}
          </Button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.dontHaveAccount')}{' '}
            <Link
              to="/auth/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {t('auth.signUp')}
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;