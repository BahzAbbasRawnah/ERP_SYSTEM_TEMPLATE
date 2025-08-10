import { create } from 'zustand';

const useTenantsStore = create((set, get) => ({
  // State
  tenants: [],
  selectedTenant: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    plan: 'all'
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  },

  // Actions
  setTenants: (tenants) => set({ tenants }),
  
  setSelectedTenant: (tenant) => set({ selectedTenant: tenant }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination }
  })),
  
  addTenant: (tenant) => set((state) => ({
    tenants: [...state.tenants, tenant]
  })),
  
  updateTenant: (id, updates) => set((state) => ({
    tenants: state.tenants.map(tenant =>
      tenant.id === id ? { ...tenant, ...updates } : tenant
    ),
    selectedTenant: state.selectedTenant?.id === id 
      ? { ...state.selectedTenant, ...updates } 
      : state.selectedTenant
  })),
  
  deleteTenant: (id) => set((state) => ({
    tenants: state.tenants.filter(tenant => tenant.id !== id),
    selectedTenant: state.selectedTenant?.id === id ? null : state.selectedTenant
  })),
  
  clearError: () => set({ error: null }),
  
  reset: () => set({
    tenants: [],
    selectedTenant: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      status: 'all',
      plan: 'all'
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  })
}));

export default useTenantsStore;