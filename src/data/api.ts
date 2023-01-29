// https://x8ki-letl-twmt.n7.xano.io/api:ikRIWViF/auth/login

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:ikRIWViF';
export const request = async (path: string, options?: RequestInit) => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_BASE_URL + path, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accepts: 'application/json',
      ...options,
    }
  });
  const json = await response.json();
  return json;
};

export const endpoints = {
  getCurrentUser: () => request('/auth/me')
};
