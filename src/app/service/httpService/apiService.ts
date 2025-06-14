import axiosInstance from './axiosConfig';

// Example API service class
class ApiService {
  // GET request
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(error.message || 'An error occurred');
    }
  }
}

export const apiService = new ApiService(); 