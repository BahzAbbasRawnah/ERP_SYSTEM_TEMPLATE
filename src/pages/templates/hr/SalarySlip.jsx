import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const SalarySlip = ({ organizationData = {}, employeeData = {}, salaryData = {} }) => {
  const { t } = useTranslation();

  const defaultEmployeeData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    department: 'IT Department',
    designation: 'Software Engineer',
    ...employeeData
  };

  const defaultSalaryData = {
    month: 'January 2024',
    basicSalary: 50000,
    allowances: 15000,
    overtime: 5000,
    deductions: 8000,
    ...salaryData
  };

  const earnings = [
    { description: 'Basic Salary', amount: defaultSalaryData.basicSalary },
    { description: 'House Allowance', amount: 10000 },
    { description: 'Transport Allowance', amount: 5000 },
    { description: 'Overtime', amount: defaultSalaryData.overtime }
  ];

  const deductions = [
    { description: 'Income Tax', amount: 5000 },
    { description: 'Social Security', amount: 2000 },
    { description: 'Insurance', amount: 1000 }
  ];

  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const earningsColumns = [
    { key: 'description', header: 'Earnings' },
    { key: 'amount', header: 'Amount', align: 'end', render: (value) => value.toLocaleString() }
  ];

  const deductionsColumns = [
    { key: 'description', header: 'Deductions' },
    { key: 'amount', header: 'Amount', align: 'end', render: (value) => value.toLocaleString() }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-4xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Salary Slip"
            titleAr="قسيمة راتب"
            rightSection={{
              title: "Employee:",
              data: {
                [defaultEmployeeData.employeeName]: "",
                ["ID"]: defaultEmployeeData.employeeId,
                ["Department"]: defaultEmployeeData.department,
                ["Designation"]: defaultEmployeeData.designation
              }
            }}
            leftSection={{
              title: "Pay Period:",
              data: {
                ["Month"]: defaultSalaryData.month,
                ["Pay Date"]: new Date().toISOString().split('T')[0]
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <TemplateTable columns={earningsColumns} data={earnings} showTotal={true} totalAmount={totalEarnings} />
            </div>
            <div>
              <TemplateTable columns={deductionsColumns} data={deductions} showTotal={true} totalAmount={totalDeductions} />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Net Salary:</span>
              <span className="text-xl font-bold text-green-600">{netSalary.toLocaleString()}</span>
            </div>
          </div>

          <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;