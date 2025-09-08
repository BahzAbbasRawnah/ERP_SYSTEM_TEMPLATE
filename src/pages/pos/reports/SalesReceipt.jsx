import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const SalesReceipt = ({ organizationData = {}, receiptData = {} }) => {
  const { t } = useTranslation();

  const defaultReceiptData = {
    receiptNo: 'POS-2024-001234',
    date: new Date().toISOString().split('T')[0],
    time: '14:35:22',
    cashier: 'سارة أحمد',
    terminal: 'كاشير 01',
    customerName: 'عميل نقدي',
    ...receiptData
  };

  const items = [
    { itemCode: 'PRD001', itemName: 'قهوة عربية فاخرة', quantity: 2, unitPrice: 25.50, total: 51.00, tax: 3.83 },
    { itemCode: 'PRD002', itemName: 'شاي أحمر مميز', quantity: 1, unitPrice: 18.00, total: 18.00, tax: 1.35 },
    { itemCode: 'PRD003', itemName: 'حلويات شرقية', quantity: 3, unitPrice: 12.75, total: 38.25, tax: 2.87 },
    { itemCode: 'PRD004', itemName: 'عصير طبيعي', quantity: 2, unitPrice: 8.50, total: 17.00, tax: 1.28 }
  ];

  const columns = [
    { key: 'itemName', header: 'الصنف' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'unitPrice', header: 'السعر', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` },
    { key: 'total', header: 'المجموع', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const totalTax = items.reduce((sum, item) => sum + item.tax, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className="template">
      <div className="template-container" style={{ width: '80mm' }}>
        <div className="text-center">
          <h2 className="text-lg font-bold">{organizationData.organizationName || 'متجر الخليج'}</h2>
          <p className="text-xs">{organizationData.address || 'الرياض، المملكة العربية السعودية'}</p>
          <p className="text-xs">هاتف: {organizationData.phone || '+966 11 123 4567'}</p>
          <p className="text-xs">ض.ب: {organizationData.taxId || '123456789'}</p>
        </div>
        
        <div className="border-t border-dashed border-gray-400 my-3"></div>
        
        <div className="text-center mb-3">
          <h3 className="font-bold">فاتورة مبيعات</h3>
          <p className="text-xs">رقم الفاتورة: {defaultReceiptData.receiptNo}</p>
        </div>

        <div className="text-xs space-y-1 mb-3">
          <div className="flex justify-between">
            <span>التاريخ:</span>
            <span>{defaultReceiptData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>الوقت:</span>
            <span>{defaultReceiptData.time}</span>
          </div>
          <div className="flex justify-between">
            <span>الكاشير:</span>
            <span>{defaultReceiptData.cashier}</span>
          </div>
          <div className="flex justify-between">
            <span>المحطة:</span>
            <span>{defaultReceiptData.terminal}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="text-xs">
              <div className="flex justify-between font-medium">
                <span>{item.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span>{item.quantity} × {item.unitPrice.toFixed(2)}</span>
                <span>{item.total.toFixed(2)} ر.س</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>المجموع الفرعي:</span>
            <span>{subtotal.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>ضريبة القيمة المضافة (15%):</span>
            <span>{totalTax.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between font-bold text-sm border-t pt-1">
            <span>المجموع الإجمالي:</span>
            <span>{grandTotal.toFixed(2)} ر.س</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>طريقة الدفع:</span>
            <span>نقدي</span>
          </div>
          <div className="flex justify-between">
            <span>المبلغ المدفوع:</span>
            <span>{Math.ceil(grandTotal).toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span>الباقي:</span>
            <span>{(Math.ceil(grandTotal) - grandTotal).toFixed(2)} ر.س</span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-400 my-3"></div>

        <div className="text-center text-xs space-y-1">
          <p>شكراً لزيارتكم</p>
          <p>نتطلع لخدمتكم مرة أخرى</p>
          <p>للاستفسارات: 920000000</p>
        </div>

        <div className="text-center mt-3">
          <div className="text-xs">* * * * * * * * * *</div>
        </div>
      </div>
    </div>
  );
};

export default SalesReceipt;