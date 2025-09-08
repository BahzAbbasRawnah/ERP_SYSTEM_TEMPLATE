import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const PriceQuote = ({ 
  organizationData = {},
  quoteData = {},
  customerData = {},
  items = []
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const defaultQuoteData = {
    quoteNo: 'QT001',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    deliveryTime: '7-10 business days',
    paymentTerms: '50% advance, 50% on delivery',
    ...quoteData
  };

  const defaultCustomerData = {
    customerName: 'Potential Client Ltd.',
    customerAddress: '789 Corporate Plaza, City, State 67890',
    phone: '+1 555 123 4567',
    email: 'procurement@potentialclient.com',
    ...customerData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      itemCode: 'SERV001',
      itemName: 'Professional Consulting Service',
      description: 'Business process optimization consulting',
      quantity: 40,
      unitPrice: 1500,
      amount: 60000,
      discount: 5000
    },
    { 
      itemCode: 'PROD003',
      itemName: 'Enterprise Software License',
      description: 'Annual license for 50 users',
      quantity: 1,
      unitPrice: 25000,
      amount: 25000,
      discount: 2000
    }
  ];

  const columns = [
    { key: 'itemCode', header: t('templates.erp.salesInvoice.itemCode') },
    { key: 'itemName', header: t('templates.erp.salesInvoice.itemName') },
    { key: 'description', header: t('templates.common.description') },
    { 
      key: 'quantity', 
      header: t('templates.common.quantity'),
      align: 'center'
    },
    { 
      key: 'unitPrice', 
      header: t('templates.common.unitPrice'),
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
      key: 'discount', 
      header: t('templates.common.discount'),
      align: 'right',
      render: (value) => value > 0 ? value.toLocaleString() : '-'
    }
  ];

  const subtotal = defaultItems.reduce((sum, item) => sum + item.amount, 0);
  const totalDiscount = defaultItems.reduce((sum, item) => sum + (item.discount || 0), 0);
  const tax = (subtotal - totalDiscount) * 0.18; // 18% tax
  const grandTotal = subtotal - totalDiscount + tax;

  return (
    <div className="template">
      <div className={`template-container max-w-5xl mx-auto bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title={t('templates.erp.priceQuote.title')}
          titleAr="عرض سعر"
          rightSection={{
            title: "Quote For:",
            data: {
              [defaultCustomerData.customerName]: "",
              [defaultCustomerData.customerAddress]: "",
              ["Phone"]: defaultCustomerData.phone,
              ["Email"]: defaultCustomerData.email
            }
          }}
          leftSection={{
            title: "Quote Details:",
            data: {
              [t('templates.erp.priceQuote.quoteNo')]: defaultQuoteData.quoteNo,
              [t('templates.common.date')]: defaultQuoteData.date,
              ["Valid Until"]: defaultQuoteData.validUntil
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
            <div className="flex justify-between text-red-600">
              <span>{t('templates.common.discount')}:</span>
              <span>-{totalDiscount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('templates.common.tax')} (18%):</span>
              <span>{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>{t('templates.common.grandTotal')}:</span>
              <span>{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-4 bg-blue-50 border border-blue-200 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <h4 className="font-semibold text-blue-800 mb-2">{t('templates.erp.priceQuote.paymentTerms')}:</h4>
        <p className="text-sm text-blue-700">{defaultQuoteData.paymentTerms}</p>
      </div>

      <div className={`mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">Note:</span> This quote is valid until {defaultQuoteData.validUntil}. 
          Prices are subject to change after the validity period.
        </p>
      </div>

      <TemplateFooter 
        notes="Thank you for considering our services. We look forward to working with you."
        terms="1. Quote valid for 30 days. 2. Prices exclude applicable taxes unless specified. 3. Delivery terms as mentioned above."
      />

      <SignatureSection 
        showReceivedBy={false}
        approvedByLabel="Sales Manager"
      />
        </div>
      </div>
    </div>
  );
};

export default PriceQuote;