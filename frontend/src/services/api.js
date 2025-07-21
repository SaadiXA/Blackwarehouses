import axios from 'axios';

// Get backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Service Functions

// Company Info
export const companyApi = {
  // Get company information
  getInfo: async () => {
    try {
      const response = await api.get('/company/info');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get company statistics
  getStats: async () => {
    try {
      const response = await api.get('/company/stats');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Services
export const servicesApi = {
  // Get all services
  getAll: async (page = 1, perPage = 10, category = null) => {
    try {
      const params = { page, per_page: perPage };
      if (category) params.category = category;
      
      const response = await api.get('/services', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get service categories
  getCategories: async () => {
    try {
      const response = await api.get('/services/categories/list');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get single service
  getById: async (serviceId) => {
    try {
      const response = await api.get(`/services/${serviceId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Projects/Gallery
export const projectsApi = {
  // Get all projects
  getAll: async (page = 1, perPage = 12, category = null, featured = null) => {
    try {
      const params = { page, per_page: perPage };
      if (category) params.category = category;
      if (featured !== null) params.is_featured = featured;
      
      const response = await api.get('/projects', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get featured projects for gallery
  getFeatured: async (limit = 12) => {
    try {
      const response = await api.get('/projects/featured', { 
        params: { limit } 
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get project categories
  getCategories: async () => {
    try {
      const response = await api.get('/projects/categories/list');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get single project
  getById: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Reviews
export const reviewsApi = {
  // Get all reviews
  getAll: async (page = 1, perPage = 10, minRating = null) => {
    try {
      const params = { page, per_page: perPage };
      if (minRating) params.min_rating = minRating;
      
      const response = await api.get('/reviews', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get featured reviews for display
  getFeatured: async (limit = 10, minRating = 4) => {
    try {
      const response = await api.get('/reviews/featured', { 
        params: { limit, min_rating: minRating } 
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get review statistics
  getStats: async () => {
    try {
      const response = await api.get('/reviews/stats');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get single review
  getById: async (reviewId) => {
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Contact
export const contactApi = {
  // Submit contact form
  submit: async (formData) => {
    try {
      const response = await api.post('/contact/submit', formData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Get contact statistics (admin)
  getStats: async () => {
    try {
      const response = await api.get('/contact/stats');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Generic API functions
export const genericApi = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },

  // Root endpoint
  root: async () => {
    try {
      const response = await api.get('/');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || error.message };
    }
  },
};

// Export all APIs
export default {
  company: companyApi,
  services: servicesApi,
  projects: projectsApi,
  reviews: reviewsApi,
  contact: contactApi,
  generic: genericApi,
};

// Export the configured axios instance for custom requests
export { api };