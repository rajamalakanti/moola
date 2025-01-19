import axios, { AxiosInstance, AxiosError } from 'axios';

// Create Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Global redirection function
let redirectToSignIn: (() => void) | null = null;

// Interceptor for handling refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite retry loops

      try {
        // Try refreshing the token
        await api.post('/api/jwt/refresh/');
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);

        // Redirect to sign-in if the function is set
        if (redirectToSignIn) {
          redirectToSignIn();
        } else {
          console.error('Redirection to /sign-in not configured');
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other cases of 401
    if (redirectToSignIn) {
      redirectToSignIn();
    } else {
      console.error('Redirection to /sign-in not configured');
    }

    return Promise.reject(error);
  }
);

// Utility for checking if an error is an AxiosError
export function isAxiosError(error: any): error is AxiosError {
  return error?.isAxiosError === true;
}

// Export a setter for the redirection function
export function setRedirectToSignIn(redirectFunction: () => void) {
  redirectToSignIn = redirectFunction;
}
