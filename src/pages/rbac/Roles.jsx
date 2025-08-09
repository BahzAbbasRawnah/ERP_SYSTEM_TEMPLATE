import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

const Roles = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const roles = [
    { id: 1, name: 'Admin', description: 'Full system access', users: 5, permissions: 24, color: 'danger' },
    { id: 2, name: 'Manager', description: 'Department management', users: 12, permissions: 18, color: 'warning' },
    { id: 3, name: 'Supervisor', description: 'Team supervision', users: 25, permissions: 12, color: 'info' },
    { id: 4, name: 'Employee', description: 'Basic user access', users: 89, permissions: 8, color: 'success' },
    { id: 5, name: 'HR Manager', description: 'Human resources management', users: 3, permissions: 15, color: 'purple' },
    { id: 6, name: 'Finance Manager', description: 'Financial operations', users: 7, permissions: 16, color: 'indigo' }
  ];

  const permissions = [
    'users.create', 'users.read', 'users.update', 'users.delete',
    'roles.create', 'roles.read', 'roles.update', 'roles.delete',
    'sales.create', 'sales.read', 'sales.update', 'sales.delete',
    'inventory.create', 'inventory.read', 'inventory.update', 'inventory.delete',
    'finance.create', 'finance.read', 'finance.update', 'finance.delete',
    'hr.create', 'hr.read', 'hr.update', 'hr.delete'
  ];

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.rbac'), href: '/rbac' },
    { label: t('rbac.roles'), href: '/rbac/roles' }
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  return (
    <DashboardLayout 
      title={t('rbac.roleManagement')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Input
              placeholder={`${t('common.search')} ${t('rbac.roles').toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <i className="fas fa-th"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <i className="fas fa-plus me-1"></i>{t('rbac.addRole')}
          </Button>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={role.color} className="text-sm">
                    {role.name}
                  </Badge>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditRole(role)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{role.description}</p>
                
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-lg text-blue-600 dark:text-blue-400">{role.users}</div>
                    <div className="text-gray-500 dark:text-gray-400">{t('rbac.users')}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg text-green-600 dark:text-green-400">{role.permissions}</div>
                    <div className="text-gray-500 dark:text-gray-400">{t('rbac.permissions')}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-start py-3 px-6 font-semibold text-gray-900 dark:text-white">Role</th>
                    <th className="text-start py-3 px-6 font-semibold text-gray-900 dark:text-white">{t('common.description')}</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-900 dark:text-white">{t('rbac.users')}</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-900 dark:text-white">{t('rbac.permissions')}</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-900 dark:text-white">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRoles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="py-4 px-6">
                        <Badge variant={role.color} className="text-sm">
                          {role.name}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                        {role.description}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{role.users}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-semibold text-green-600 dark:text-green-400">{role.permissions}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => handleEditRole(role)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                            title="Edit Role"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                            title="Delete Role"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="bg-green-500 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Role Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Role Name" defaultValue={selectedRole?.name} />
              <div>
                <label className="block text-sm font-medium mb-2">{t('common.description')}</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  rows="3"
                  defaultValue={selectedRole?.description}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">{t('rbac.permissions')}</label>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {permissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              
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

export default Roles;