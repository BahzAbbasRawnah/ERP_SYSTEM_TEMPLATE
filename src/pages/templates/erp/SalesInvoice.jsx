import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';
import TemplateFooter from '../components/TemplateFooter';

const SalesInvoice = ({ 
  organizationData = {},
  invoiceData = {},
  customerData = {},
  items = []
}) => {
  const { t } = useTranslation();

  const defaultInvoiceData = {
    invoiceNo: 'SI001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    ...invoiceData
  };

  const defaultCustomerData = {
    customerName: 'ABC Company Ltd.',
    customerAddress: '123 Business Street, City, State 12345',
    phone: '+1 234 567 8900',
    email: 'contact@abccompany.com',
    ...customerData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      itemCode: 'PROD001',
      itemName: 'Premium Widget A',
      hsn: '8471',
      quantity: 10,
      rate: 1500,
      amount: 15000,
      cgst: 1350,
      sgst: 1350,
      igst: 0
    },
    { 
      itemCode: 'PROD002',
      itemName: 'Standard Widget B',
      hsn: '8472',
      quantity: 5,
      rate: 2000,
      amount: 10000,
      cgst: 900,
      sgst: 900,
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
      align: 'end',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'amount', 
      header: t('templates.common.amount'),
      align: 'end',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'cgst', 
      header: t('templates.erp.salesInvoice.cgst'),
      align: 'end',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'sgst', 
      header: t('templates.erp.salesInvoice.sgst'),
      align: 'end',
      render: (value) => value.toLocaleString()
    }
  ];

  const subtotal = defaultItems.reduce((sum, item) => sum + item.amount, 0);
  const totalTax = defaultItems.reduce((sum, item) => sum + item.cgst + item.sgst + item.igst, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-5xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title={t('templates.erp.salesInvoice.title')}
            titleAr="فاتورة مبيعات"
            rightSection={{
              title: "Bill To:",
              data: {
                [defaultCustomerData.customerName]: "",
                [defaultCustomerData.customerAddress]: "",
                ["Phone"]: defaultCustomerData.phone,
                ["Email"]: defaultCustomerData.email
              }
            }}
            leftSection={{
              title: "Invoice Details:",
              data: {
                [t('templates.erp.salesInvoice.invoiceNo')]: defaultInvoiceData.invoiceNo,
                [t('templates.common.date')]: defaultInvoiceData.date,
                ["Due Date"]: defaultInvoiceData.dueDate
              }
            }}
          />
        </div>
        
        <div className="template-body">



      <TemplateTable columns={columns} data={defaultItems} />

      <div className="mt-6">
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

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="text-sm font-medium">
          Amount in words: <span className="font-normal">Twenty Seven Thousand Two Hundred Fifty Only</span>
        </p>
      </div>

      <TemplateFooter 
        notes="Payment is due within 30 days of invoice date. Late payments may incur additional charges."
        terms="1. All prices are in local currency. 2. Goods once sold will not be taken back. 3. Payment terms: Net 30 days."
      />

      <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default SalesInvoice;