export const menuConfig = [
  {
    id: 'dashboard',
    title: 'navigation.dashboard',
    icon: 'fas fa-tachometer-alt',
    path: '/dashboard'
  },
  {
    id: 'sales',
    title: 'navigation.sales',
    icon: 'fas fa-shopping-cart',
    path: '/sales',
    children: [
      { id: 'sales-overview', title: 'navigation.overview', path: '/sales', icon: 'fas fa-tachometer-alt' },
      { id: 'sales-management', title: 'navigation.salesManagement', path: '/sales/management', icon: 'fas fa-chart-bar' },
      { id: 'orders', title: 'navigation.orders', path: '/sales/orders', icon: 'fas fa-file-invoice' },
      { id: 'sales-reports', title: 'التقارير', path: '/sales/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'purchases',
    title: 'navigation.purchases',
    icon: 'fas fa-shopping-bag',
    path: '/purchases',
    children: [
      { id: 'purchases-overview', title: 'navigation.overview', path: '/purchases', icon: 'fas fa-tachometer-alt' },
      { id: 'purchases-management', title: 'navigation.purchasesManagement', path: '/purchases/management', icon: 'fas fa-chart-bar' },
      { id: 'suppliers', title: 'navigation.suppliers', path: '/purchases/suppliers', icon: 'fas fa-truck' },
      { id: 'contracts', title: 'navigation.contracts', path: '/purchases/contracts', icon: 'fas fa-handshake' },
      { id: 'purchases-reports', title: 'التقارير', path: '/purchases/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'inventory',
    title: 'navigation.inventory',
    icon: 'fas fa-boxes',
    path: '/inventory',
    children: [
      { id: 'inventory-overview', title: 'navigation.overview', path: '/inventory', icon: 'fas fa-tachometer-alt' },
      { id: 'inventory-management', title: 'navigation.inventoryManagement', path: '/inventory/management', icon: 'fas fa-chart-bar' },
      { id: 'products', title: 'navigation.products', path: '/inventory/products', icon: 'fas fa-box' },
      { id: 'stores', title: 'navigation.stores', path: '/inventory/stores', icon: 'fas fa-warehouse' },
      { id: 'transfers', title: 'navigation.transfers', path: '/inventory/transfers', icon: 'fas fa-exchange-alt' },
      { id: 'inventory-reports', title: 'التقارير', path: '/inventory/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'finance',
    title: 'navigation.finance',
    icon: 'fas fa-chart-line',
    path: '/finance',
    children: [
      { id: 'finance-overview', title: 'navigation.overview', path: '/finance', icon: 'fas fa-tachometer-alt' },
      { id: 'accounting', title: 'navigation.accounting', path: '/finance/accounting', icon: 'fas fa-calculator' },
      { id: 'accounts', title: 'navigation.accounts', path: '/finance/accounts', icon: 'fas fa-list' },
      { id: 'receipts', title: 'navigation.receipts', path: '/finance/receipts', icon: 'fas fa-receipt' },
      { id: 'transactions', title: 'navigation.transactions', path: '/finance/transactions', icon: 'fas fa-exchange-alt' },
      { id: 'finance-reports', title: 'التقارير', path: '/finance/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'hr',
    title: 'navigation.hr',
    icon: 'fas fa-users',
    path: '/hr',
    children: [
      { id: 'hr-overview', title: 'navigation.overview', path: '/hr', icon: 'fas fa-tachometer-alt' },
      { id: 'hr-management', title: 'navigation.hrManagement', path: '/hr/management', icon: 'fas fa-chart-bar' },
      { id: 'employees', title: 'navigation.employees', path: '/hr/employees', icon: 'fas fa-user-tie' },
      { id: 'attendance', title: 'navigation.attendance', path: '/hr/attendance', icon: 'fas fa-clock' },
      { id: 'payroll', title: 'navigation.payroll', path: '/hr/payroll', icon: 'fas fa-money-check-alt' },
      { id: 'leaves', title: 'navigation.leaves', path: '/hr/leaves', icon: 'fas fa-calendar-times' },
      { id: 'hr-reports', title: 'التقارير', path: '/hr/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'crm',
    title: 'navigation.crm',
    icon: 'fas fa-handshake',
    path: '/crm',
    children: [
      { id: 'crm-overview', title: 'navigation.overview', path: '/crm', icon: 'fas fa-tachometer-alt' },
      { id: 'crm-management', title: 'navigation.crmManagement', path: '/crm/management', icon: 'fas fa-chart-bar' },
      { id: 'crm-reports', title: 'التقارير', path: '/crm/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'pos',
    title: 'navigation.pos',
    icon: 'fas fa-cash-register',
    path: '/pos',
    children: [
      { id: 'pos-overview', title: 'navigation.overview', path: '/pos', icon: 'fas fa-tachometer-alt' },
      { id: 'pos-management', title: 'navigation.posManagement', path: '/pos/management', icon: 'fas fa-chart-bar' },
      { id: 'pos-sales', title: 'navigation.sales', path: '/pos/sales', icon: 'fas fa-shopping-cart' },
      { id: 'pos-products', title: 'navigation.products', path: '/pos/products', icon: 'fas fa-box' },
      { id: 'pos-customers', title: 'navigation.customers', path: '/pos/customers', icon: 'fas fa-users' },
      { id: 'pos-reports', title: 'التقارير', path: '/pos/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'ecommerce',
    title: 'navigation.ecommerce',
    icon: 'fas fa-store',
    path: '/ecommerce',
    children: [
      { id: 'ecommerce-overview', title: 'navigation.overview', path: '/ecommerce', icon: 'fas fa-tachometer-alt' },
      { id: 'ecommerce-management', title: 'navigation.ecommerceManagement', path: '/ecommerce/management', icon: 'fas fa-chart-bar' },
      { id: 'ecommerce-reports', title: 'التقارير', path: '/ecommerce/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'projects',
    title: 'navigation.projects',
    icon: 'fas fa-project-diagram',
    path: '/projects',
    children: [
      { id: 'projects-overview', title: 'navigation.overview', path: '/projects', icon: 'fas fa-tachometer-alt' },
      { id: 'projects-management', title: 'navigation.projectsManagement', path: '/projects/management', icon: 'fas fa-chart-bar' },
      { id: 'projects-reports', title: 'التقارير', path: '/projects/reports', icon: 'fas fa-chart-bar' }
    ]
  },
  {
    id: 'logistics',
    title: 'navigation.logistics',
    icon: 'fas fa-shipping-fast',
    path: '/logistics'
  },
  {
    id: 'tenants',
    title: 'navigation.tenants',
    icon: 'fas fa-building',
    path: '/tenants',
    children: [
      { id: 'tenants-overview', title: 'navigation.overview', path: '/tenants', icon: 'fas fa-tachometer-alt' },
      { id: 'tenants-list', title: 'navigation.tenantsList', path: '/tenants/list', icon: 'fas fa-list' },
      { id: 'subscription-plans', title: 'navigation.subscriptionPlans', path: '/tenants/plans', icon: 'fas fa-credit-card' }
    ]
  },
  {
    id: 'templates',
    title: 'navigation.templates',
    icon: 'fas fa-file-alt',
    path: '/templates'
  },
  {
    id: 'components',
    title: 'navigation.components',
    icon: 'fas fa-puzzle-piece',
    path: '/components'
  },
  {
    id: 'layouts',
    title: 'navigation.layouts',
    icon: 'fas fa-th-large',
    path: '/layouts'
  }
];
