import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Attendance = () => {
  const { t } = useTranslation();
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.hr'), href: '/hr' },
    { label: 'Attendance Management' }
  ];

  const stats = [
    {
      title: 'Present Today',
      value: '189',
      icon: 'fas fa-user-check',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'On Time',
      value: '156',
      icon: 'fas fa-clock',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Late',
      value: '33',
      icon: 'fas fa-exclamation-triangle',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Absent',
      value: '58',
      icon: 'fas fa-user-times',
      color: 'from-red-500 to-red-600'
    }
  ];

  const attendanceData = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      employeeId: 'EMP-001',
      department: 'Engineering',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      workingHours: '8h 00m',
      status: 'Present',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      employee: 'Michael Chen',
      employeeId: 'EMP-002',
      department: 'Engineering',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      workingHours: '8h 15m',
      status: 'Late',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      employee: 'Emily Rodriguez',
      employeeId: 'EMP-003',
      department: 'Sales',
      checkIn: '-',
      checkOut: '-',
      workingHours: '-',
      status: 'Absent',
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
            <div className="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</div>
          </div>
        </div>
      )
    },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'department', label: 'Department' },
    { key: 'checkIn', label: 'Check In' },
    { key: 'checkOut', label: 'Check Out' },
    { key: 'workingHours', label: 'Working Hours' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Present' ? 'badge-success' : 
                          value === 'Late' ? 'badge-warning' : 
                          value === 'Absent' ? 'badge-danger' : 'badge-info';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'Details',
      onClick: (row) => console.log('View details:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit:', row),
      className: 'text-blue-600 hover:text-blue-900'
    }
  ];

  return (
    <DashboardLayout title="Attendance Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button onClick={() => setShowAttendanceModal(true)}>
            <i className="fas fa-clock me-2" />
            Mark Attendance
          </Button>
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
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

        {/* Attendance Table */}
        <DataTable
          title="Daily Attendance"
          data={attendanceData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'All Status' },
            { value: 'Present', label: 'Present' },
            { value: 'Absent', label: 'Absent' },
            { value: 'Late', label: 'Late' },
            { value: 'On Leave', label: 'On Leave' }
          ]}
          filterKey="status"
          additionalFilters={
            <input
              type="date"
              className="input-field w-40"
              defaultValue="2024-01-15"
            />
          }
        />
      </div>

      {/* Mark Attendance Modal */}
      <Modal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        title="Mark Attendance"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee</label>
            <select className="input-field" required>
              <option>Select employee</option>
              <option>Sarah Johnson (EMP-001)</option>
              <option>Michael Chen (EMP-002)</option>
              <option>Emily Rodriguez (EMP-003)</option>
            </select>
          </div>
          <Input label="Date" type="date" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select className="input-field" required>
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
              <option>Half Day</option>
              <option>On Leave</option>
            </select>
          </div>
          <Input label="Check In Time" type="time" />
          <Input label="Check Out Time" type="time" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
            <textarea className="input-field" rows="3" placeholder="Optional notes" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowAttendanceModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Mark Attendance</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Attendance;