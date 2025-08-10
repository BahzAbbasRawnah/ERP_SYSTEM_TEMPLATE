import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';

const RefundReceipt = ({ organizationData = {}, refundData = {} }) => {
  const { t } = useTranslation();

  const defaultRefundData = {
    refundNo: 'REF-2024-001',
    originalReceiptNo: 'POS-2024-001234',
    date: new Date().toISOString().split('T')[0],
    time: '15:45:30',
    cashier: 'أحمد محمد',
    terminal: 'كاشير 02',
    reason: 'عيب في المنتج',
    ...refundData
  };

  const refundItems = [
    { itemCode: 'PRD001', itemName: 'قهوة عربية فاخرة', quantity: 1, unitPrice: 25.50, total: 25.50, tax: 1.91 },
    { itemCode: 'PRD003', itemName: 'حلويات شرقية', quantity: 2, unitPrice: 12.75, total: 25.50, tax: 1.91 }
  ];

  const subtotal = refundItems.reduce((sum, item) => sum + item.total, 0);
  const totalTax = refundItems.reduce((sum, item) => sum + item.tax, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-sm mx-auto bg-white" style={{ width: '80mm' }}>
        <div className="template-header text-center">
          <h2 className="text-lg font-bold">{organizationData.organizationName || 'متجر الخليج'}</h2>
          <p className="text-xs">{organizationData.address || 'الرياض، المملكة العربية السعودية'}</p>
          <p className="text-xs">هاتف: {organizationData.phone || '+966 11 123 4567'}</p>
          <p className="text-xs">ض.ب: {organizationData.taxId || '123456789'}</p>
        </div>
        
        <div className="border-t border-dashed border-gray-400 my-3"></div>
        
        <div className="text-center mb-3">
          <h3 className="font-bold text-red-600">إيصال استرداد</h3>
          <p className="text-xs">رقم الاسترداد: {defaultRefundData.refundNo}</p>
          <p className="text-xs">الفاتورة الأصلية: {defaultRefundData.originalReceiptNo}</p>
        </div>

        <div className="text-xs space-y-1 mb-3">
          <div className="flex justify-between">
            <span>التاريخ:</span>
            <span>{defaultRefundData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>الوقت:</span>
            <span>{defaultRefundData.time}</span>
          </div>
          <div className="flex justify-between">
            <span>الكاشير:</span>
            <span>{defaultRefundData.cashier}</span>
          </div>
          <div className="flex justify-between">
            <span>المحطة:</span>
            <span>{defaultRefundData.terminal}</span>
          </div>
          <div className="flex justify-between">
            <span>سبب الاسترداد:</span>
            <span>{defaultRefundData.reason}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-center mb-2">
          <h4 className="font-semibold text-sm">الأصناف المستردة</h4>
        </div>

        <div className="space-y-2">
          {refundItems.map((item, index) => (
            <div key={index} className="text-xs">
              <div className="flex justify-between font-medium">
                <span>{item.itemName}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>- {item.quantity} × {item.unitPrice.toFixed(2)}</span>
                <span>- {item.total.toFixed(2)} ر.س</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between text-red-600">
            <span>المجموع الفرعي:</span>
            <span>- {subtotal.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>ضريبة القيمة المضافة (15%):</span>
            <span>- {totalTax.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between font-bold text-sm border-t pt-1 text-red-600">
            <span>إجمالي المبلغ المسترد:</span>
            <span>- {grandTotal.toFixed(2)} ر.س</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>طريقة الاسترداد:</span>
            <span>نقدي</span>
          </div>
          <div className="flex justify-between">
            <span>المبلغ المسترد:</span>
            <span>{grandTotal.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>حالة الاسترداد:</span>
            <span className="text-green-600">مكتمل</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-center text-xs space-y-1">
          <p className="font-semibold">شروط الاسترداد:</p>
          <p>• يجب الاحتفاظ بهذا الإيصال</p>
          <p>• الاسترداد خلال 7 أيام من تاريخ الشراء</p>
          <p>• المنتج يجب أن يكون في حالته الأصلية</p>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-center text-xs space-y-1">
          <p>شكراً لتفهمكم</p>
          <p>نعتذر عن أي إزعاج</p>
          <p>للاستفسارات: 920000000</p>
        </div>

        <div className="text-center mt-3">
          <div className="text-xs">* * * * * * * * * *</div>
        </div>

        <div className="mt-4 p-2 bg-red-50 rounded text-center">
          <p className="text-xs font-semibold text-red-600">إيصال استرداد</p>
          <p className="text-xs text-red-600">يرجى الاحتفاظ بهذا الإيصال</p>
        </div>
      </div>
    </div>
  );
};

export default RefundReceipt;