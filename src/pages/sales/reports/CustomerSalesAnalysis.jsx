import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const CustomerSalesAnalysis = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تحليل مبيعات العملاء" titleEn="Customer Sales Analysis Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تحليل مبيعات العملاء</h2>
            <p className="text-gray-600">تقرير عن أداء العملاء وحجم مشترياتهم</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">اسم العميل</th>
                  <th className="px-4 py-2 text-right border-b">إجمالي المشتريات</th>
                  <th className="px-4 py-2 text-right border-b">عدد الطلبات</th>
                  <th className="px-4 py-2 text-right border-b">متوسط الطلب</th>
                  <th className="px-4 py-2 text-right border-b">آخر طلب</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">شركة الأمل التجارية</td>
                  <td className="px-4 py-2 border-b">45,000 ر.س</td>
                  <td className="px-4 py-2 border-b">25</td>
                  <td className="px-4 py-2 border-b">1,800 ر.س</td>
                  <td className="px-4 py-2 border-b">2024/03/15</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مؤسسة النجاح</td>
                  <td className="px-4 py-2 border-b">38,500 ر.س</td>
                  <td className="px-4 py-2 border-b">22</td>
                  <td className="px-4 py-2 border-b">1,750 ر.س</td>
                  <td className="px-4 py-2 border-b">2024/03/12</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">شركة التقدم المحدودة</td>
                  <td className="px-4 py-2 border-b">32,000 ر.س</td>
                  <td className="px-4 py-2 border-b">18</td>
                  <td className="px-4 py-2 border-b">1,778 ر.س</td>
                  <td className="px-4 py-2 border-b">2024/03/10</td>
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

export default CustomerSalesAnalysis;