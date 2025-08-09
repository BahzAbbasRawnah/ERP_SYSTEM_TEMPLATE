import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';

const POS = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([
    { id: 1, name: 'Headphones', price: 199.99, quantity: 1, icon: 'fas fa-headphones', color: 'blue' },
    { id: 2, name: 'T-Shirt', price: 29.99, quantity: 2, icon: 'fas fa-tshirt', color: 'green' }
  ]);

  const breadcrumbs = [
    { label: t('navigation.pos') }
  ];

  const stats = [
    {
      title: "Today's Sales",
      value: '$2,450',
      icon: 'fas fa-cash-register',
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
    {
      title: 'Transactions',
      value: '47',
      icon: 'fas fa-receipt',
      color: 'from-blue-500 to-blue-600',
      trend: 'up'
    },
    {
      title: 'Avg. Sale',
      value: '$52.13',
      icon: 'fas fa-chart-line',
      color: 'from-purple-500 to-purple-600',
      trend: 'up'
    },
    {
      title: 'Items Sold',
      value: '156',
      icon: 'fas fa-shopping-bag',
      color: 'from-orange-500 to-orange-600',
      trend: 'up'
    }
  ];

  const products = [
    { id: 1, name: 'Headphones', price: 199.99, icon: 'fas fa-headphones', color: 'blue' },
    { id: 2, name: 'T-Shirt', price: 29.99, icon: 'fas fa-tshirt', color: 'green' },
    { id: 3, name: 'Laptop', price: 899.99, icon: 'fas fa-laptop', color: 'purple' },
    { id: 4, name: 'Phone', price: 599.99, icon: 'fas fa-mobile-alt', color: 'yellow' }
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

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
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
    <DashboardLayout title="Point of Sales" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-history me-2" />
            History
          </Button>
          <Button>
            <i className="fas fa-plus me-2" />
            New Sale
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-sm rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-white/80 truncate">{stat.title}</dt>
                  <dd className="text-2xl font-bold text-white flex items-center">
                    {stat.value}
                    <i className={`fas fa-arrow-${stat.trend} ms-2 text-white/70`} />
                  </dd>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-white text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* POS Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Products</h3>
                  <div className="flex space-x-3">
                    <input type="text" placeholder="Search products..." className="input-field w-64" />
                    <select className="input-field w-32">
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Food</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 bg-${product.color}-100 dark:bg-${product.color}-900 rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                          <i className={`${product.icon} text-${product.color}-600 dark:text-${product.color}-400 text-2xl`} />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart & Checkout */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Sale</h3>
              </div>
              <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-lg flex items-center justify-center me-2`}>
                          <i className={`${item.icon} text-${item.color}-600 dark:text-${item.color}-400`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">${item.price} x {item.quantity}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="text-gray-900 dark:text-white">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax (8%):</span>
                    <span className="text-gray-900 dark:text-white">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 space-y-3">
                  <Button className="w-full">
                    <i className="fas fa-credit-card me-2" />
                    Card Payment
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <i className="fas fa-money-bill me-2" />
                    Cash Payment
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <i className="fas fa-mobile-alt me-2" />
                    Mobile Payment
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <i className="fas fa-save me-2" />
                    Save for Later
                  </button>
                  <button
                    onClick={() => setCart([])}
                    className="w-full text-sm text-red-600 hover:text-red-900"
                  >
                    <i className="fas fa-trash me-2" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POS;