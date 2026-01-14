/**
 * Centralized API utility for making authenticated requests
 * This automatically adds authentication tokens to all requests
 */

// Get token from localStorage or context
const getAuthToken = (): string | null => {
  const token = localStorage.getItem('token');
  return token || null;
};

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Enhanced fetch wrapper that automatically adds authentication
 * @param url - The URL to fetch
 * @param options - Fetch options (method, body, headers, etc.)
 * @returns Promise with the response
 */
export const apiFetch = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const { requiresAuth = true, headers = {}, ...restOptions } = options;
  const requestHeaders = new Headers(headers as HeadersInit);

  // Add auth token if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  // Make the request
  const response = await fetch(url, {
    ...restOptions,
    headers: requestHeaders,
  });

  // Handle 401 Unauthorized - token expired or invalid
  if (response.status === 401 && requiresAuth) {
    // Clear invalid token
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = '/login?session=expired';
  }

  return response;
};

/**
 * GET request helper
 */
export const apiGet = async (url: string, requiresAuth = true) => {
  return apiFetch(url, { method: 'GET', requiresAuth });
};

/**
 * POST request helper
 */
export const apiPost = async (
  url: string,
  data?: any,
  requiresAuth = true
) => {
  const isFormData = data instanceof FormData;
  const hasData = data !== undefined && data !== null;

  const options: any = {
    method: 'POST',
    requiresAuth,
  };

  if (hasData) {
    options.headers = isFormData ? {} : { 'Content-Type': 'application/json' };
    options.body = isFormData ? data : JSON.stringify(data);
  }

  return apiFetch(url, options);
};

/**
 * PUT request helper
 */
export const apiPut = async (
  url: string,
  data?: any,
  requiresAuth = true
) => {
  const isFormData = data instanceof FormData;
  const hasData = data !== undefined && data !== null;

  const options: any = {
    method: 'PUT',
    requiresAuth,
  };

  if (hasData) {
    options.headers = isFormData ? {} : { 'Content-Type': 'application/json' };
    options.body = isFormData ? data : JSON.stringify(data);
  }

  return apiFetch(url, options);
};

/**
 * DELETE request helper
 */
export const apiDelete = async (url: string, requiresAuth = true) => {
  return apiFetch(url, { method: 'DELETE', requiresAuth });
};
