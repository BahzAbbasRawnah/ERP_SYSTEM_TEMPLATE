import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';

const POSSales = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([
    { id: 1, name: 'Coffee', price: 3.50, quantity: 2 },
    { id: 2, name: 'Sandwich', price: 8.99, quantity: 1 }
  ]);

  const breadcrumbs = [
    { label: t('navigation.pos'), href: '/pos' },
    { label: 'POS Sales' }
  ];

  const stats = [
    {
      title: "Today's Sales",
      value: '$2,847',
      icon: 'fas fa-cash-register',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Transactions',
      value: '156',
      icon: 'fas fa-receipt',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Avg. Sale',
      value: '$18.25',
      icon: 'fas fa-chart-line',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Open Till',
      value: '08:30',
      icon: 'fas fa-clock',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const products = [
    { id: 1, name: 'Coffee', price: 3.50 },
    { id: 2, name: 'Sandwich', price: 8.99 },
    { id: 3, name: 'Juice', price: 4.25 },
    { id: 4, name: 'Pastry', price: 5.75 }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <DashboardLayout title="POS Sales" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button>
            <i className="fas fa-plus me-2" />
            New Sale
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                  <i className={`${stat.icon} text-xl`} />
                </div>
                <div className="ms-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="product-item p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart & Checkout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Sale</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name} x{item.quantity}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">${item.price} each</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p className="text-sm text-gray-900 dark:text-white">${calculateSubtotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tax (8%)</p>
                  <p className="text-sm text-gray-900 dark:text-white">${calculateTax().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-lg text-gray-900 dark:text-white">Total</p>
                  <p className="text-lg text-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  <i className="fas fa-credit-card me-2" />
                  Process Payment
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <i className="fas fa-save me-2" />
                  Hold Sale
                </button>
                <button
                  onClick={() => setCart([])}
                  className="w-full px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
                >
                  <i className="fas fa-trash me-2" />
                  Clear Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POSSales;