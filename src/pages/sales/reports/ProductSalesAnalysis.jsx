import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const ProductSalesAnalysis = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تحليل مبيعات المنتجات" titleEn="Product Sales Analysis Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تحليل مبيعات المنتجات</h2>
            <p className="text-gray-600">تقرير عن أداء المنتجات والأكثر مبيعاً</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">اسم المنتج</th>
                  <th className="px-4 py-2 text-right border-b">الكمية المباعة</th>
                  <th className="px-4 py-2 text-right border-b">إجمالي المبيعات</th>
                  <th className="px-4 py-2 text-right border-b">متوسط السعر</th>
                  <th className="px-4 py-2 text-right border-b">الربح</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">لابتوب ديل XPS</td>
                  <td className="px-4 py-2 border-b">45 قطعة</td>
                  <td className="px-4 py-2 border-b">67,500 ر.س</td>
                  <td className="px-4 py-2 border-b">1,500 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">13,500 ر.س</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">هاتف آيفون 15</td>
                  <td className="px-4 py-2 border-b">32 قطعة</td>
                  <td className="px-4 py-2 border-b">128,000 ر.س</td>
                  <td className="px-4 py-2 border-b">4,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">25,600 ر.س</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">طابعة HP LaserJet</td>
                  <td className="px-4 py-2 border-b">28 قطعة</td>
                  <td className="px-4 py-2 border-b">14,000 ر.س</td>
                  <td className="px-4 py-2 border-b">500 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">2,800 ر.س</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TemplateBody>
      <SignatureSection />
      <TemplateFooter />
    </div>
  );
};

export default ProductSalesAnalysis;