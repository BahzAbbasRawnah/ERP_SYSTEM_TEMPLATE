import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import SignatureSection from '../components/SignatureSection';

const LeaveApplication = ({ organizationData = {}, leaveData = {} }) => {
  const { t } = useTranslation();

  const defaultLeaveData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    department: 'IT Department',
    leaveType: 'Annual Leave',
    fromDate: '2024-02-01',
    toDate: '2024-02-05',
    totalDays: 5,
    reason: 'Family vacation',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    ...leaveData
  };

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-4xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Leave Application"
            titleAr="طلب إجازة"
            rightSection={{
              title: "Employee:",
              data: {
                [defaultLeaveData.employeeName]: "",
                ["ID"]: defaultLeaveData.employeeId,
                ["Department"]: defaultLeaveData.department
              }
            }}
            leftSection={{
              title: "Application Details:",
              data: {
                ["Application Date"]: defaultLeaveData.applicationDate,
                ["Status"]: defaultLeaveData.status
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Leave Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Leave Type:</span> {defaultLeaveData.leaveType}</p>
                <p><span className="font-medium">From Date:</span> {defaultLeaveData.fromDate}</p>
                <p><span className="font-medium">To Date:</span> {defaultLeaveData.toDate}</p>
                <p><span className="font-medium">Total Days:</span> {defaultLeaveData.totalDays}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Reason</h3>
              <div className="p-3 bg-gray-50 rounded text-sm">
                {defaultLeaveData.reason}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Approval Section</h3>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">Employee Signature</p>
              </div>
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">Manager Approval</p>
              </div>
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">HR Approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;