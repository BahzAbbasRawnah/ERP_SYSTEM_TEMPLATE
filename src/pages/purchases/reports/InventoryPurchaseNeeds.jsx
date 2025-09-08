import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const InventoryPurchaseNeeds = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="احتياجات شراء المخزون" titleEn="Inventory Purchase Needs Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير احتياجات شراء المخزون</h2>
            <p className="text-gray-600">تحديد المنتجات التي تحتاج إلى إعادة شراء</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">اسم المنتج</th>
                  <th className="px-4 py-2 text-right border-b">الكمية الحالية</th>
                  <th className="px-4 py-2 text-right border-b">الحد الأدنى</th>
                  <th className="px-4 py-2 text-right border-b">الكمية المطلوبة</th>
                  <th className="px-4 py-2 text-right border-b">الأولوية</th>
                  <th className="px-4 py-2 text-right border-b">المورد المفضل</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">ورق A4</td>
                  <td className="px-4 py-2 border-b">15 علبة</td>
                  <td className="px-4 py-2 border-b">50 علبة</td>
                  <td className="px-4 py-2 border-b">100 علبة</td>
                  <td className="px-4 py-2 border-b"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">عاجل</span></td>
                  <td className="px-4 py-2 border-b">شركة الإمداد المتقدم</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">أحبار طابعة</td>
                  <td className="px-4 py-2 border-b">8 قطعة</td>
                  <td className="px-4 py-2 border-b">20 قطعة</td>
                  <td className="px-4 py-2 border-b">50 قطعة</td>
                  <td className="px-4 py-2 border-b"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">متوسط</span></td>
                  <td className="px-4 py-2 border-b">مؤسسة التوريد الشامل</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مواد تنظيف</td>
                  <td className="px-4 py-2 border-b">25 قطعة</td>
                  <td className="px-4 py-2 border-b">30 قطعة</td>
                  <td className="px-4 py-2 border-b">60 قطعة</td>
                  <td className="px-4 py-2 border-b"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">منخفض</span></td>
                  <td className="px-4 py-2 border-b">شركة المواد الأساسية</td>
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

export default InventoryPurchaseNeeds;