import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class TenantsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/tenants`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Tenant Management
  async getTenants(params = {}) {
    const response = await this.api.get('/', { params });
    return response.data;
  }

  async getTenant(id) {
    const response = await this.api.get(`/${id}`);
    return response.data;
  }

  async createTenant(tenantData) {
    const response = await this.api.post('/', tenantData);
    return response.data;
  }

  async updateTenant(id, updates) {
    const response = await this.api.put(`/${id}`, updates);
    return response.data;
  }

  async deleteTenant(id) {
    const response = await this.api.delete(`/${id}`);
    return response.data;
  }

  // Subscription Management
  async getSubscriptionPlans() {
    const response = await this.api.get('/plans');
    return response.data;
  }

  async createSubscriptionPlan(planData) {
    const response = await this.api.post('/plans', planData);
    return response.data;
  }

  async updateSubscriptionPlan(id, updates) {
    const response = await this.api.put(`/plans/${id}`, updates);
    return response.data;
  }

  async deleteSubscriptionPlan(id) {
    const response = await this.api.delete(`/plans/${id}`);
    return response.data;
  }

  async changeTenantPlan(tenantId, planId) {
    const response = await this.api.post(`/${tenantId}/change-plan`, { planId });
    return response.data;
  }

  // Domain Management
  async getTenantDomains(tenantId) {
    const response = await this.api.get(`/${tenantId}/domains`);
    return response.data;
  }

  async addTenantDomain(tenantId, domainData) {
    const response = await this.api.post(`/${tenantId}/domains`, domainData);
    return response.data;
  }

  async updateTenantDomain(tenantId, domainId, updates) {
    const response = await this.api.put(`/${tenantId}/domains/${domainId}`, updates);
    return response.data;
  }

  async deleteTenantDomain(tenantId, domainId) {
    const response = await this.api.delete(`/${tenantId}/domains/${domainId}`);
    return response.data;
  }

  async verifyDomain(tenantId, domainId) {
    const response = await this.api.post(`/${tenantId}/domains/${domainId}/verify`);
    return response.data;
  }

  async generateSSLCertificate(tenantId, domainId) {
    const response = await this.api.post(`/${tenantId}/domains/${domainId}/ssl`);
    return response.data;
  }

  // User Management
  async getTenantUsers(tenantId, params = {}) {
    const response = await this.api.get(`/${tenantId}/users`, { params });
    return response.data;
  }

  async addTenantUser(tenantId, userData) {
    const response = await this.api.post(`/${tenantId}/users`, userData);
    return response.data;
  }

  async updateTenantUser(tenantId, userId, updates) {
    const response = await this.api.put(`/${tenantId}/users/${userId}`, updates);
    return response.data;
  }

  async deleteTenantUser(tenantId, userId) {
    const response = await this.api.delete(`/${tenantId}/users/${userId}`);
    return response.data;
  }

  async suspendTenantUser(tenantId, userId) {
    const response = await this.api.post(`/${tenantId}/users/${userId}/suspend`);
    return response.data;
  }

  async activateTenantUser(tenantId, userId) {
    const response = await this.api.post(`/${tenantId}/users/${userId}/activate`);
    return response.data;
  }

  // Analytics & Usage
  async getTenantAnalytics(tenantId, params = {}) {
    const response = await this.api.get(`/${tenantId}/analytics`, { params });
    return response.data;
  }

  async getTenantUsage(tenantId, params = {}) {
    const response = await this.api.get(`/${tenantId}/usage`, { params });
    return response.data;
  }

  async getTenantsStats() {
    const response = await this.api.get('/stats');
    return response.data;
  }

  // Billing & Invoices
  async getTenantBilling(tenantId, params = {}) {
    const response = await this.api.get(`/${tenantId}/billing`, { params });
    return response.data;
  }

  async getTenantInvoices(tenantId, params = {}) {
    const response = await this.api.get(`/${tenantId}/invoices`, { params });
    return response.data;
  }

  async downloadInvoice(tenantId, invoiceId) {
    const response = await this.api.get(`/${tenantId}/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async updatePaymentMethod(tenantId, paymentData) {
    const response = await this.api.put(`/${tenantId}/payment-method`, paymentData);
    return response.data;
  }

  // Database Management
  async provisionTenantDatabase(tenantId, databaseConfig) {
    const response = await this.api.post(`/${tenantId}/provision-database`, databaseConfig);
    return response.data;
  }

  async backupTenantData(tenantId) {
    const response = await this.api.post(`/${tenantId}/backup`);
    return response.data;
  }

  async restoreTenantData(tenantId, backupId) {
    const response = await this.api.post(`/${tenantId}/restore`, { backupId });
    return response.data;
  }

  // Lifecycle Management
  async suspendTenant(tenantId, reason) {
    const response = await this.api.post(`/${tenantId}/suspend`, { reason });
    return response.data;
  }

  async activateTenant(tenantId) {
    const response = await this.api.post(`/${tenantId}/activate`);
    return response.data;
  }

  async archiveTenant(tenantId) {
    const response = await this.api.post(`/${tenantId}/archive`);
    return response.data;
  }

  // Export & Import
  async exportTenants(params = {}) {
    const response = await this.api.get('/export', { 
      params,
      responseType: 'blob'
    });
    return response.data;
  }

  async importTenants(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.api.post('/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}

export default new TenantsService();