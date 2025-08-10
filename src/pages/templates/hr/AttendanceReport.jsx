import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const AttendanceReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    department: 'IT Department',
    month: 'January 2024',
    totalWorkingDays: 22,
    presentDays: 20,
    absentDays: 2,
    lateDays: 3,
    ...reportData
  };

  const attendanceData = [
    { date: '2024-01-01', checkIn: '09:00', checkOut: '17:30', hours: '8.5', status: 'Present' },
    { date: '2024-01-02', checkIn: '09:15', checkOut: '17:30', hours: '8.25', status: 'Late' },
    { date: '2024-01-03', checkIn: '-', checkOut: '-', hours: '0', status: 'Absent' },
    { date: '2024-01-04', checkIn: '08:45', checkOut: '17:45', hours: '9', status: 'Present' },
    { date: '2024-01-05', checkIn: '09:00', checkOut: '17:30', hours: '8.5', status: 'Present' }
  ];

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'checkIn', header: 'Check In', align: 'center' },
    { key: 'checkOut', header: 'Check Out', align: 'center' },
    { key: 'hours', header: 'Hours', align: 'center' },
    { key: 'status', header: 'Status', align: 'center' }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-5xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Attendance Report"
            titleAr="تقرير الحضور"
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
                ["Generated"]: new Date().toISOString().split('T')[0]
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultReportData.totalWorkingDays}</div>
              <div className="text-sm text-gray-600">Total Working Days</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultReportData.presentDays}</div>
              <div className="text-sm text-gray-600">Present Days</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">{defaultReportData.absentDays}</div>
              <div className="text-sm text-gray-600">Absent Days</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">{defaultReportData.lateDays}</div>
              <div className="text-sm text-gray-600">Late Days</div>
            </div>
          </div>

          <TemplateTable columns={columns} data={attendanceData} showTotal={false} />

          <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;