import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Payroll = () => {
  const { t } = useTranslation();
  const [showProcessPayrollModal, setShowProcessPayrollModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.hr'), href: '/hr' },
    { label: 'Payroll Management' }
  ];

  const stats = [
    {
      title: 'Total Payroll',
      value: '$1,247,500',
      icon: 'fas fa-dollar-sign',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Processed',
      value: '229',
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
      title: 'Avg Salary',
      value: '$5,050',
      icon: 'fas fa-chart-line',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const payrollData = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      employeeId: 'EMP-001',
      department: 'Engineering',
      baseSalary: '$6,500',
      overtime: '$450',
      deductions: '-$1,200',
      netPay: '$5,750',
      status: 'Processed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      employee: 'Michael Chen',
      employeeId: 'EMP-002',
      department: 'Engineering',
      baseSalary: '$7,000',
      overtime: '$320',
      deductions: '-$1,350',
      netPay: '$5,970',
      status: 'Processed',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      employee: 'Emily Rodriguez',
      employeeId: 'EMP-003',
      department: 'Sales',
      baseSalary: '$5,500',
      overtime: '$0',
      deductions: '-$1,100',
      netPay: '$4,400',
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
            <div className="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</div>
          </div>
        </div>
      )
    },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'department', label: 'Department' },
    { key: 'baseSalary', label: 'Base Salary' },
    { key: 'overtime', label: 'Overtime' },
    { 
      key: 'deductions', 
      label: 'Deductions',
      render: (value) => <span className="text-red-600">{value}</span>
    },
    { 
      key: 'netPay', 
      label: 'Net Pay',
      render: (value) => <span className="font-bold text-green-600">{value}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const badgeClass = value === 'Processed' ? 'badge-success' : 'badge-warning';
        return <span className={`badge ${badgeClass}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: 'View',
      onClick: (row) => console.log('View payslip:', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: 'Process',
      onClick: (row) => console.log('Process payroll:', row),
      className: 'text-green-600 hover:text-green-900',
      condition: (row) => row.status === 'Pending'
    },
    {
      label: 'Print',
      onClick: (row) => console.log('Print payslip:', row),
      className: 'text-blue-600 hover:text-blue-900'
    }
  ];

  return (
    <DashboardLayout title="Payroll Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowProcessPayrollModal(true)}>
            <i className="fas fa-play me-2" />
            Process Payroll
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

        {/* Payroll Table */}
        <DataTable
          title="Employee Payroll"
          data={payrollData}
          columns={columns}
          actions={actions}
          searchable
          filterable
          filterOptions={[
            { value: '', label: 'Current Month' },
            { value: 'last-month', label: 'Last Month' },
            { value: 'last-3-months', label: 'Last 3 Months' },
            { value: 'last-6-months', label: 'Last 6 Months' }
          ]}
          filterKey="period"
          additionalFilters={
            <select className="input-field w-32">
              <option>All Status</option>
              <option>Processed</option>
              <option>Pending</option>
              <option>On Hold</option>
            </select>
          }
        />
      </div>

      {/* Process Payroll Modal */}
      <Modal
        isOpen={showProcessPayrollModal}
        onClose={() => setShowProcessPayrollModal(false)}
        title="Process Payroll"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pay Period</label>
                <select className="input-field" required>
                  <option>January 2024</option>
                  <option>February 2024</option>
                  <option>March 2024</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <select className="input-field">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
              <Input label="Pay Date" type="date" required />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Include Overtime</label>
                <select className="input-field">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Include Bonuses</label>
                <select className="input-field">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                <textarea className="input-field" rows="3" placeholder="Optional notes" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payroll Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Employees:</span>
                <span className="font-medium">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Gross Pay:</span>
                <span className="font-medium">$1,450,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Deductions:</span>
                <span className="font-medium text-red-600">-$202,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Net Pay:</span>
                <span className="font-bold text-green-600">$1,247,500</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowProcessPayrollModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Process Payroll</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Payroll;