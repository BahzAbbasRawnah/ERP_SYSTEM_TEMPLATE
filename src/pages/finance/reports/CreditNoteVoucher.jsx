import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const CreditNoteVoucher = ({ 
  organizationData = {},
  voucherData = {},
  items = []
}) => {
  const { t, i18n } = useTranslation();

  const defaultVoucherData = {
    creditNoteNo: 'CN001',
    date: new Date().toISOString().split('T')[0],
    customerName: 'ABC Company Ltd.',
    reason: 'Product return due to quality issues',
    originalInvoice: 'INV001',
    ...voucherData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      description: 'Product A - Defective items returned', 
      quantity: 5, 
      unitPrice: 1000, 
      amount: 5000 
    },
    { 
      description: 'Product B - Wrong specification', 
      quantity: 2, 
      unitPrice: 2500, 
      amount: 5000 
    }
  ];

  const columns = [
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
    }
  ];

  const totalAmount = defaultItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="template">
      <div className={`template-container`}>
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title={t('templates.accounts.creditNoteVoucher.title')}
          titleAr="سند إشعار دائن"
          rightSection={{
            title: "Customer:",
            data: {
              [defaultVoucherData.customerName]: "",
              ["Original Invoice"]: defaultVoucherData.originalInvoice,
              ["Reason"]: defaultVoucherData.reason
            }
          }}
          leftSection={{
            title: "Credit Note Details:",
            data: {
              [t('templates.accounts.creditNoteVoucher.creditNoteNo')]: defaultVoucherData.creditNoteNo,
              [t('templates.common.date')]: defaultVoucherData.date
            }
          }}
        />
        
        <div className="report-section">



      <TemplateBody columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-red-50 border border-red-200 rounded`}>
        <p className="text-sm font-medium text-red-800">
          Credit Amount: <span className="text-lg font-bold">{totalAmount.toLocaleString()}</span>
        </p>
        <p className="text-xs text-red-600 mt-1">
          This amount will be credited to your account or adjusted against future invoices.
        </p>
      </div>

      <TemplateFooter 
        notes="This credit note is issued for the returned/defective items as per company policy."
        terms="Credit note is valid for 90 days from the date of issue."
      />

      <div className="signature-section">
        <div className="signature-line">
          <span>Prepared By</span>
        </div>
        <div className="signature-line">
          <span>Approved By</span>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default CreditNoteVoucher;
