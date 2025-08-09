import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Leaves = () => {
  const { t } = useTranslation();
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.hr'), href: '/hr' },
    { label: 'Leave Management' }
  ];

  const stats = [
    {
      title: 'Total Requests',
      value: '156',
      icon: 'fas fa-file-alt',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Approved',
      value: '134',
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pending',
      value: '18',
      icon: 'fas fa-clock',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Rejected',
      value: '4',
      icon: 'fas fa-times-circle',
      color: 'from-red-500 to-red-600'
    }
  ];

  const leavesData = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      employeeId: 'EMP-001',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Approved',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      employee: 'Michael Chen',
      employeeId: 'EMP-002',
      leaveType: 'Sick Leave',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      days: 2,
      reason: 'Medical appointment',
      status: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      employee: 'Emily Rodriguez',
      employeeId: 'EMP-003',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'Personal matters',
      status: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const columns = [
    {
      key: 'employee',
      label: 'Employee',
      render: (value, row) => (
        <div className="flex items-center">
          <img className="h-8 w-8 rounded-full me-3" src={row.avatar} alt="Employee" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.employeeId}</div>
          </div>
        </div>
      )
    },
    { key: 'leaveType', label: 'Leave Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'days', label: 'Days' },
    { key: 'reason', label: 'Reason' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Approved' ? 'badge-success' : 
                          value === 'Pending' ? 'badge-warning' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => console.log('View leave:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Approve',
      onClick: (row) => console.log('Approve leave:', row),
      className: 'text-green-600 hover:text-green-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Reject',
      onClick: (row) => console.log('Reject leave:', row),
      className: 'text-red-600 hover:text-red-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Print',
      onClick: (row) => console.log('Print leave:', row),
      className: 'text-gray-600 hover:text-gray-900',
      condition: (row) => row.status === 'Approved'
    }
  ];

  return (
    <DashboardLayout title="Leave Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-calendar-alt me-2" />
            Leave Calendar
          </Button>
          <Button onClick={() => setShowApplyLeaveModal(true)}>
            <i className="fas fa-plus me-2" />
            Apply Leave
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-sm rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-white/80 truncate">{stat.title}</dt>
                  <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-white text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Requests Table */}
        <DataTable
          title="Leave Requests"
          data={leavesData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Types' },
            { value: 'Annual Leave', label: 'Annual Leave' },
            { value: 'Sick Leave', label: 'Sick Leave' },
            { value: 'Personal Leave', label: 'Personal Leave' },
            { value: 'Emergency Leave', label: 'Emergency Leave' }
          ]}
          filterKey="leaveType"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          }
        />
      </div>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={showApplyLeaveModal}
        onClose={() => setShowApplyLeaveModal(false)}
        title="Apply for Leave"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee</label>
                <select className="input-field" required>
                  <option>Select employee</option>
                  <option>Sarah Johnson (EMP-001)</option>
                  <option>Michael Chen (EMP-002)</option>
                  <option>Emily Rodriguez (EMP-003)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Leave Type</label>
                <select className="input-field" required>
                  <option>Select leave type</option>
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Emergency Leave</option>
                  <option>Maternity Leave</option>
                  <option>Paternity Leave</option>
                </select>
              </div>
              <Input label="Start Date" type="date" required />
              <Input label="End Date" type="date" required />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason</label>
                <textarea
                  className="input-field"
                  rows="4"
                  required
                  placeholder="Please provide reason for leave"
                />
              </div>
              <Input
                label="Contact During Leave"
                placeholder="Phone number or email"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Covering Employee</label>
                <select className="input-field">
                  <option>Select covering employee</option>
                  <option>John Smith</option>
                  <option>Jane Doe</option>
                  <option>Mike Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachment</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <i className="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload medical certificate or supporting documents</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowApplyLeaveModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Leaves;