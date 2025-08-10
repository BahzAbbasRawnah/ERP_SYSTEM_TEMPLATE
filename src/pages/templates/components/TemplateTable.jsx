import { useTranslation } from 'react-i18next';

const TemplateTable = ({ columns, data, showTotal = true, totalAmount = 0, calculateTotal = true }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Auto-calculate total if not provided
  const calculatedTotal = calculateTotal && !totalAmount ? 
    data.reduce((sum, row) => {
      const amountField = columns.find(col => col.key === 'amount' || col.key === 'total');
      return sum + (amountField ? (row[amountField.key] || 0) : 0);
    }, 0) : totalAmount;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, index) => (
              <th 
                key={index}
                className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 text-start"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className={`border border-gray-300 px-3 py-2 text-sm text-gray-700 ${
                    column.align === 'center' ? 'text-center' : column.align === 'end' ? 'text-end' : 'text-start'
                  }`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td 
              colSpan={columns.length - 1} 
              className="border border-gray-300 px-3 py-2 text-sm text-start"
            >
              {t('templates.common.grandTotal')}
            </td>
            <td className="border border-gray-300 px-3 py-2 text-sm text-end">
              {calculatedTotal.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TemplateTable;