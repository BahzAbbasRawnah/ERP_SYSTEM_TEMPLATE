# ERP Document Templates Module

This module contains React components for various ERP document templates with full RTL/LTR support and internationalization.

## 📁 Structure

```
templates/
├── components/           # Reusable template components
│   ├── OrganizationHeader.jsx
│   ├── TemplateTable.jsx
│   ├── SignatureSection.jsx
│   └── TemplateFooter.jsx
├── accounts/            # Account-related templates
│   ├── TotalAccountStatement.jsx
│   ├── DetailedAccountStatement.jsx
│   ├── ReceiptVoucher.jsx
│   ├── DisbursementVoucher.jsx
│   ├── CreditNoteVoucher.jsx
│   └── DebitNoteVoucher.jsx
├── erp/                 # ERP business templates
│   ├── SalesInvoice.jsx
│   ├── PurchaseInvoice.jsx
│   └── PriceQuote.jsx
├── TemplatesDemo.jsx    # Demo page for all templates
├── templates.css        # Print-ready styles
├── index.js            # Main exports
└── README.md           # This file
```

## 🚀 Features

- **RTL/LTR Support**: Dynamic layout direction based on language
- **Internationalization**: Full i18n support with react-i18next
- **Print-Ready**: Optimized CSS for professional printing
- **Reusable Components**: Modular design with shared components
- **Responsive Design**: Works on all screen sizes
- **Modern Styling**: Clean, professional appearance with Tailwind CSS

## 📋 Available Templates

### Account Templates
1. **Total Account Statement** - Summary view of account transactions
2. **Detailed Account Statement** - Detailed transaction history
3. **Receipt Voucher** - Payment receipt documentation
4. **Disbursement Voucher** - Payment disbursement records
5. **Credit Note Voucher** - Credit adjustments and returns
6. **Debit Note Voucher** - Debit adjustments and charges

### ERP Templates
1. **Sales Invoice** - Customer billing with tax calculations
2. **Purchase Invoice** - Supplier billing and procurement
3. **Price Quote** - Customer quotations and proposals

## 🔧 Usage

### Basic Usage

```jsx
import { SalesInvoice } from '../templates';

const MyComponent = () => {
  const organizationData = {
    organizationName: "Your Company Name",
    address: "123 Business Street, City, Country",
    phone: "+1 234 567 8900",
    email: "info@company.com"
  };

  return (
    <SalesInvoice 
      organizationData={organizationData}
      invoiceData={{ invoiceNo: 'INV001' }}
      customerData={{ customerName: 'ABC Corp' }}
      items={[/* your items */]}
    />
  );
};
```

### With Custom Data

```jsx
import { ReceiptVoucher } from '../templates';

const ReceiptComponent = () => {
  const voucherData = {
    voucherNo: 'RV001',
    date: '2024-01-15',
    receivedFrom: 'Customer Name',
    paymentMode: 'Cash'
  };

  const items = [
    {
      accountHead: 'Sales Revenue',
      description: 'Payment for services',
      amount: 5000
    }
  ];

  return (
    <ReceiptVoucher 
      voucherData={voucherData}
      items={items}
    />
  );
};
```

## 🎨 Reusable Components

### OrganizationHeader
Displays company information at the top of documents.

```jsx
<OrganizationHeader 
  organizationName="Company Name"
  address="Company Address"
  phone="+1 234 567 8900"
  email="info@company.com"
  logo="/path/to/logo.png"
  taxId="TAX123456"
/>
```

### TemplateTable
Renders data in a professional table format.

```jsx
<TemplateTable 
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'amount', header: 'Amount', align: 'right' }
  ]}
  data={tableData}
  showTotal={true}
  totalAmount={1000}
/>
```

### SignatureSection
Adds signature lines for authorization.

```jsx
<SignatureSection 
  showPreparedBy={true}
  showApprovedBy={true}
  showReceivedBy={false}
/>
```

### TemplateFooter
Displays notes and terms at the bottom.

```jsx
<TemplateFooter 
  notes="Additional notes here"
  terms="Terms and conditions"
/>
```

## 🌐 Internationalization

All templates support multiple languages through react-i18next:

```jsx
// Translation keys are automatically applied
// English: "Sales Invoice"
// Arabic: "فاتورة مبيعات"
```

Translation files are located in:
- `src/locales/en/translate.json`
- `src/locales/ar/translate.json`

## 🖨️ Printing

Templates are optimized for printing with:
- A4 page size support
- Proper page breaks
- Print-specific CSS styles
- Color preservation

To print a template:
```jsx
<button onClick={() => window.print()}>
  Print Document
</button>
```

## 📱 RTL Support

Templates automatically adjust for RTL languages:
- Text alignment
- Table column order
- Layout direction
- Signature positioning

## 🎯 Demo Page

View all templates in the demo page:
```jsx
import TemplatesDemo from './templates/TemplatesDemo';

// Renders a sidebar with all templates for preview
```

## 🔄 Data Flow

Templates accept props for dynamic data:

1. **organizationData** - Company information
2. **Template-specific data** - Invoice, voucher, or statement data
3. **items** - Array of line items or transactions
4. **Additional props** - Customer data, supplier data, etc.

## 🎨 Styling

Templates use Tailwind CSS with custom print styles:
- Responsive design
- Dark mode support (screen only)
- Professional appearance
- Consistent spacing and typography

## 📝 Customization

To customize templates:

1. **Modify existing components** in the `components/` folder
2. **Add new templates** following the existing pattern
3. **Update translations** in the locale files
4. **Extend CSS** in `templates.css` for print styles

## 🔍 Best Practices

1. **Always provide fallback data** for missing props
2. **Use translation keys** for all text content
3. **Test print output** on different browsers
4. **Maintain consistent styling** across templates
5. **Follow RTL/LTR guidelines** for international support

## 🐛 Troubleshooting

### Print Issues
- Ensure `templates.css` is imported
- Check browser print settings
- Verify page margins and scaling

### RTL Layout Problems
- Check `i18n.language` detection
- Verify CSS direction classes
- Test with Arabic content

### Translation Missing
- Verify translation keys exist
- Check locale file imports
- Ensure i18next is configured properly