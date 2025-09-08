import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const PurchaseOrderTracking = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تتبع أوامر الشراء" titleEn="Purchase Order Tracking Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير تتبع أوامر الشراء</h2>
            <p className="text-gray-600">متابعة حالة أوامر الشراء من الطلب إلى الاستلام</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">رقم الأمر</th>
                  <th className="px-4 py-2 text-right border-b">المورد</th>
                  <th className="px-4 py-2 text-right border-b">تاريخ الطلب</th>
                  <th className="px-4 py-2 text-right border-b">تاريخ التسليم المتوقع</th>
                  <th className="px-4 py-2 text-right border-b">الحالة</th>
                  <th className="px-4 py-2 text-right border-b">القيمة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">PO-2024-001</td>
                  <td className="px-4 py-2 border-b">شركة الإمداد المتقدم</td>
                  <td className="px-4 py-2 border-b">2024/03/01</td>
                  <td className="px-4 py-2 border-b">2024/03/15</td>
                  <td className="px-4 py-2 border-b"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">مستلم</span></td>
                  <td className="px-4 py-2 border-b">15,000 ر.س</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">PO-2024-002</td>
                  <td className="px-4 py-2 border-b">مؤسسة التوريد الشامل</td>
                  <td className="px-4 py-2 border-b">2024/03/05</td>
                  <td className="px-4 py-2 border-b">2024/03/20</td>
                  <td className="px-4 py-2 border-b"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">قيد التنفيذ</span></td>
                  <td className="px-4 py-2 border-b">8,500 ر.س</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">PO-2024-003</td>
                  <td className="px-4 py-2 border-b">شركة المواد الأساسية</td>
                  <td className="px-4 py-2 border-b">2024/03/10</td>
                  <td className="px-4 py-2 border-b">2024/03/25</td>
                  <td className="px-4 py-2 border-b"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">معتمد</span></td>
                  <td className="px-4 py-2 border-b">12,000 ر.س</td>
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

export default PurchaseOrderTracking;