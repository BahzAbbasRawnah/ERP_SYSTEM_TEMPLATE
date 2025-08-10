import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const OvertimeReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    department: 'IT Department',
    month: 'January 2024',
    hourlyRate: 50,
    ...reportData
  };

  const overtimeData = [
    { date: '2024-01-02', regularHours: 8, overtimeHours: 2, rate: 50, amount: 100, reason: 'Project deadline' },
    { date: '2024-01-05', regularHours: 8, overtimeHours: 1.5, rate: 50, amount: 75, reason: 'System maintenance' },
    { date: '2024-01-10', regularHours: 8, overtimeHours: 3, rate: 50, amount: 150, reason: 'Emergency support' },
    { date: '2024-01-15', regularHours: 8, overtimeHours: 1, rate: 50, amount: 50, reason: 'Training session' }
  ];

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'regularHours', header: 'Regular Hours', align: 'center' },
    { key: 'overtimeHours', header: 'Overtime Hours', align: 'center' },
    { key: 'rate', header: 'Rate/Hour', align: 'end', render: (value) => `$${value}` },
    { key: 'amount', header: 'Amount', align: 'end', render: (value) => `$${value}` },
    { key: 'reason', header: 'Reason' }
  ];

  const totalOvertimeHours = overtimeData.reduce((sum, item) => sum + item.overtimeHours, 0);
  const totalAmount = overtimeData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-5xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Overtime Report"
            titleAr="تقرير العمل الإضافي"
            rightSection={{
              title: "Employee:",
              data: {
                [defaultReportData.employeeName]: "",
                ["ID"]: defaultReportData.employeeId,
                ["Department"]: defaultReportData.department
              }
            }}
            leftSection={{
              title: "Report Period:",
              data: {
                ["Month"]: defaultReportData.month,
                ["Hourly Rate"]: `$${defaultReportData.hourlyRate}`,
                ["Generated"]: new Date().toISOString().split('T')[0]
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <TemplateTable columns={columns} data={overtimeData} showTotal={true} totalAmount={totalAmount} />

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Summary</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Total Overtime Hours:</span> {totalOvertimeHours}</p>
                <p><span className="font-medium">Total Overtime Amount:</span> ${totalAmount}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Notes</h4>
              <p className="text-sm">Overtime rates are calculated at 1.5x regular hourly rate. All overtime must be pre-approved by department manager.</p>
            </div>
          </div>

          <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default OvertimeReport;