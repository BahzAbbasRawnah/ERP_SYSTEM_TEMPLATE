import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const Permissions = () => {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState('all');

  const permissionModules = [
    {
      name: 'Users Management',
      permissions: [
        { name: 'users.create', description: 'Create new users', roles: ['Admin', 'HR Manager'] },
        { name: 'users.read', description: 'View user information', roles: ['Admin', 'Manager', 'HR Manager'] },
        { name: 'users.update', description: 'Update user details', roles: ['Admin', 'HR Manager'] },
        { name: 'users.delete', description: 'Delete users', roles: ['Admin'] }
      ]
    },
    {
      name: 'Sales Management',
      permissions: [
        { name: 'sales.create', description: 'Create sales records', roles: ['Admin', 'Manager', 'Employee'] },
        { name: 'sales.read', description: 'View sales data', roles: ['Admin', 'Manager', 'Supervisor', 'Employee'] },
        { name: 'sales.update', description: 'Update sales records', roles: ['Admin', 'Manager'] },
        { name: 'sales.delete', description: 'Delete sales records', roles: ['Admin'] }
      ]
    },
    {
      name: 'Inventory Management',
      permissions: [
        { name: 'inventory.create', description: 'Add inventory items', roles: ['Admin', 'Manager'] },
        { name: 'inventory.read', description: 'View inventory', roles: ['Admin', 'Manager', 'Supervisor', 'Employee'] },
        { name: 'inventory.update', description: 'Update inventory', roles: ['Admin', 'Manager', 'Supervisor'] },
        { name: 'inventory.delete', description: 'Remove inventory items', roles: ['Admin'] }
      ]
    },
    {
      name: 'Finance Management',
      permissions: [
        { name: 'finance.create', description: 'Create financial records', roles: ['Admin', 'Finance Manager'] },
        { name: 'finance.read', description: 'View financial data', roles: ['Admin', 'Finance Manager', 'Manager'] },
        { name: 'finance.update', description: 'Update financial records', roles: ['Admin', 'Finance Manager'] },
        { name: 'finance.delete', description: 'Delete financial records', roles: ['Admin'] }
      ]
    }
  ];

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.rbac'), href: '/rbac' },
    { label: t('rbac.permissions'), href: '/rbac/permissions' }
  ];

  const allPermissions = permissionModules.flatMap(module => 
    module.permissions.map(permission => ({
      ...permission,
      module: module.name
    }))
  );

  const filteredPermissions = selectedModule === 'all' 
    ? allPermissions 
    : allPermissions.filter(permission => permission.module === selectedModule);

  const getActionColor = (action) => {
    switch (action.split('.')[1]) {
      case 'create': return 'success';
      case 'read': return 'info';
      case 'update': return 'warning';
      case 'delete': return 'danger';
      default: return 'secondary';
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Permission',
      sortable: true,
      render: (value) => (
        <Badge variant={getActionColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'module',
      header: t('rbac.module'),
      sortable: true,
      filterable: true,
      filterOptions: permissionModules.map(module => ({
        value: module.name,
        label: module.name
      }))
    },
    {
      key: 'description',
      header: t('common.description'),
      sortable: true
    },
    {
      key: 'roles',
      header: t('rbac.assignedRoles'),
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.map((role) => (
            <Badge key={role} variant="secondary" className="text-xs">
              {role}
            </Badge>
          ))}
        </div>
      )
    }
  ];

  const actions = [
    {
      icon: 'fas fa-edit',
      title: 'Edit Permission',
      onClick: (permission) => console.log('Edit permission:', permission),
      className: 'text-blue-600 hover:text-blue-800 dark:text-blue-400'
    }
  ];

  return (
    <DashboardLayout 
      title={t('rbac.permissionManagement')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        <DataTable
          data={filteredPermissions}
          columns={columns}
          actions={actions}
          searchable
          filterable
          paginated
        />

        {/* Permission Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('rbac.permissionMatrix')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-start py-2 px-3 font-semibold text-gray-900 dark:text-white">{t('rbac.module')}</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">Admin</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">Manager</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">Supervisor</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">Employee</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">HR Manager</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-900 dark:text-white">Finance Manager</th>
                </tr>
              </thead>
              <tbody>
                {permissionModules.map((module) => (
                  <tr key={module.name} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">{module.name}</td>
                    <td className="text-center py-2 px-3">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="text-center py-2 px-3">
                      <i className="fas fa-check text-green-500"></i>
                    </td>
                    <td className="text-center py-2 px-3">
                      <i className="fas fa-minus text-yellow-500"></i>
                    </td>
                    <td className="text-center py-2 px-3">
                      <i className="fas fa-minus text-yellow-500"></i>
                    </td>
                    <td className="text-center py-2 px-3">
                      {module.name === 'Users Management' ? 
                        <i className="fas fa-check text-green-500"></i> : 
                        <i className="fas fa-times text-red-500"></i>
                      }
                    </td>
                    <td className="text-center py-2 px-3">
                      {module.name === 'Finance Management' ? 
                        <i className="fas fa-check text-green-500"></i> : 
                        <i className="fas fa-times text-red-500"></i>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Permissions;