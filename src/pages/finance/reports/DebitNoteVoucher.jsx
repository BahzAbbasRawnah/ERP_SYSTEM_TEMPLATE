import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const DebitNoteVoucher = ({ 
  organizationData = {},
  voucherData = {},
  items = []
}) => {
  const { t } = useTranslation();

  const defaultVoucherData = {
    debitNoteNo: 'DN001',
    date: new Date().toISOString().split('T')[0],
    supplierName: 'XYZ Suppliers Ltd.',
    reason: 'Additional charges for express delivery',
    originalInvoice: 'PINV001',
    ...voucherData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      description: 'Express delivery charges', 
      quantity: 1, 
      unitPrice: 2000, 
      amount: 2000 
    },
    { 
      description: 'Additional handling charges', 
      quantity: 1, 
      unitPrice: 500, 
      amount: 500 
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
          title={t('templates.accounts.debitNoteVoucher.title')}
          titleAr="سند إشعار مدين"
          rightSection={{
            title: "Supplier:",
            data: {
              [defaultVoucherData.supplierName]: "",
              ["Original Invoice"]: defaultVoucherData.originalInvoice,
              ["Reason"]: defaultVoucherData.reason
            }
          }}
          leftSection={{
            title: "Debit Note Details:",
            data: {
              [t('templates.accounts.debitNoteVoucher.debitNoteNo')]: defaultVoucherData.debitNoteNo,
              [t('templates.common.date')]: defaultVoucherData.date
            }
          }}
        />
        
        <div className="report-section">



      <TemplateBody columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-blue-50 border border-blue-200 rounded`}>
        <p className="text-sm font-medium text-blue-800">
          Debit Amount: <span className="text-lg font-bold">{totalAmount.toLocaleString()}</span>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          This amount will be debited from your account or added to future invoices.
        </p>
      </div>

      <TemplateFooter 
        notes="This debit note is issued for additional charges as per agreed terms."
        terms="Debit note amount is payable within 30 days from the date of issue."
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

export default DebitNoteVoucher;
