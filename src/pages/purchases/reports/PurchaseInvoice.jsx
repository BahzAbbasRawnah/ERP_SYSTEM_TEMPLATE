import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const PurchaseInvoice = ({ 
  organizationData = {},
  invoiceData = {},
  supplierData = {},
  items = []
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const defaultInvoiceData = {
    invoiceNo: 'PI001',
    date: new Date().toISOString().split('T')[0],
    poNumber: 'PO001',
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    ...invoiceData
  };

  const defaultSupplierData = {
    supplierName: 'XYZ Suppliers Ltd.',
    supplierAddress: '456 Industrial Area, City, State 54321',
    phone: '+1 987 654 3210',
    email: 'sales@xyzsuppliers.com',
    gstNo: 'GST123456789',
    ...supplierData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      itemCode: 'RAW001',
      itemName: 'Raw Material A',
      hsn: '2710',
      quantity: 100,
      rate: 250,
      amount: 25000,
      cgst: 2250,
      sgst: 2250,
      igst: 0
    },
    { 
      itemCode: 'RAW002',
      itemName: 'Raw Material B',
      hsn: '2711',
      quantity: 50,
      rate: 400,
      amount: 20000,
      cgst: 1800,
      sgst: 1800,
      igst: 0
    }
  ];

  const columns = [
    { key: 'itemCode', header: t('templates.erp.salesInvoice.itemCode') },
    { key: 'itemName', header: t('templates.erp.salesInvoice.itemName') },
    { key: 'hsn', header: t('templates.erp.salesInvoice.hsn'), align: 'center' },
    { 
      key: 'quantity', 
      header: t('templates.common.quantity'),
      align: 'center'
    },
    { 
      key: 'rate', 
      header: t('templates.erp.salesInvoice.rate'),
      align: 'right',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'amount', 
      header: t('templates.common.amount'),
      align: 'right',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'cgst', 
      header: t('templates.erp.salesInvoice.cgst'),
      align: 'right',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'sgst', 
      header: t('templates.erp.salesInvoice.sgst'),
      align: 'right',
      render: (value) => value.toLocaleString()
    }
  ];

  const subtotal = defaultItems.reduce((sum, item) => sum + item.amount, 0);
  const totalTax = defaultItems.reduce((sum, item) => sum + item.cgst + item.sgst + item.igst, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className="template">
      <div className={`template-container max-w-5xl mx-auto bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title={t('templates.erp.purchaseInvoice.title')}
          titleAr="فاتورة مشتريات"
          rightSection={{
            title: "Vendor Details:",
            data: {
              [defaultSupplierData.supplierName]: "",
              [defaultSupplierData.supplierAddress]: "",
              ["Phone"]: defaultSupplierData.phone,
              ["GST No"]: defaultSupplierData.gstNo
            }
          }}
          leftSection={{
            title: "Invoice Details:",
            data: {
              [t('templates.erp.purchaseInvoice.invoiceNo')]: defaultInvoiceData.invoiceNo,
              [t('templates.common.date')]: defaultInvoiceData.date,
              ["PO Number"]: defaultInvoiceData.poNumber
            }
          }}
        />
        
        <div className="report-section">



      <TemplateBody columns={columns} data={defaultItems} />

      <div className={`mt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="flex justify-end">
          <div className="w-80 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t('templates.common.subtotal')}:</span>
              <span>{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('templates.common.tax')}:</span>
              <span>{totalTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>{t('templates.common.grandTotal')}:</span>
              <span>{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-4 bg-gray-50 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-medium">
          Amount in words: <span className="font-normal">Fifty Three Thousand One Hundred Only</span>
        </p>
      </div>

      <TemplateFooter 
        notes="Please ensure all items are delivered as per specifications and quality standards."
        terms="1. Payment terms: 30 days from invoice date. 2. All items subject to quality inspection. 3. Returns accepted within 7 days."
      />

      <SignatureSection 
        showReceivedBy={true}
        receivedByLabel="Goods Received By"
      />
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;