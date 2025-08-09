import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';

const Users = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Employee', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Supervisor', status: 'Active', lastLogin: '2024-01-15' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Employee', status: 'Active', lastLogin: '2024-01-13' }
  ];

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.rbac'), href: '/rbac' },
    { label: t('rbac.users'), href: '/rbac/users' }
  ];

  const columns = [
    {
      key: 'name',
      header: t('common.name'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              {value.charAt(0)}
            </span>
          </div>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      header: t('common.email'),
      sortable: true
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Supervisor', label: 'Supervisor' },
        { value: 'Employee', label: 'Employee' }
      ],
      render: (value) => (
        <Badge variant={value === 'Admin' ? 'danger' : value === 'Manager' ? 'warning' : 'info'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: t('common.status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ],
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      header: t('rbac.lastLogin'),
      sortable: true
    }
  ];

  const actions = [
    {
      icon: 'fas fa-edit',
      title: 'Edit User',
      onClick: (user) => {
        setSelectedUser(user);
        setShowModal(true);
      },
      className: 'text-blue-600 hover:text-blue-800 dark:text-blue-400'
    },
    {
      icon: 'fas fa-trash',
      title: 'Delete User',
      onClick: (user) => console.log('Delete user:', user),
      className: 'text-red-600 hover:text-red-800 dark:text-red-400'
    }
  ];

  return (
    <DashboardLayout 
      title={t('rbac.userManagement')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setShowModal(true)}>
            <i className="fas fa-plus me-1"></i>{t('rbac.addUser')}
          </Button>
        </div>

        <DataTable
          data={users}
          columns={columns}
          actions={actions}
          searchable
          filterable
          paginated
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="bg-primary-500 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">User Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Input label={t('common.name')} defaultValue={selectedUser?.name} />
              <Input label={t('common.email')} defaultValue={selectedUser?.email} />
              <Select
                label="Role"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'supervisor', label: 'Supervisor' },
                  { value: 'employee', label: 'Employee' }
                ]}
                value={selectedUser?.role?.toLowerCase()}
                onChange={(value) => console.log('Role changed:', value)}
              />
              <Select
                label={t('common.status')}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
                ]}
                value={selectedUser?.status?.toLowerCase()}
                onChange={(value) => console.log('Status changed:', value)}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>{t('common.cancel')}</Button>
                <Button>{t('common.save')}</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Users;