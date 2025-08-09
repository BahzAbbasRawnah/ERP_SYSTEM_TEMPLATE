import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const ProductSales = () => {
  const { t } = useTranslation();

  const products = [
    { name: 'Headphone', sales: 220, icon: 'fas fa-headphones' },
    { name: 'Laptop', sales: 110, icon: 'fas fa-laptop' },
    { name: 'Phone', sales: 90, icon: 'fas fa-mobile-alt' },
    { name: 'Shoes', sales: 77, icon: 'fas fa-running' }
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.productSales.title')}
          </h3>
          <button className="p-1 rounded-md text-gray-400 hover:text-gray-500">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <i className={`${product.icon} text-2xl text-gray-600 dark:text-gray-400`}></i>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.sales} {t('dashboard.productSales.sales')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductSales;