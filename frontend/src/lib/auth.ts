// lib/tokenUtils.ts

const setToken = (key: 'access_token' | 'refresh_token', token: string) => {
  localStorage.setItem(key, token);
};

const getToken = (key: 'access_token' | 'refresh_token') => {
  return localStorage.getItem(key);
};

const removeToken = (key: 'access_token' | 'refresh_token') => {
  localStorage.removeItem(key);
};

export const saveTokens = ({ access, refresh }: { access: string; refresh: string }) => {
  setToken('access_token', access);
  setToken('refresh_token', refresh);
};

export const getAccessToken = () => getToken('access_token');

export const getRefreshToken = () => getToken('refresh_token');

export const clearTokens = () => {
  removeToken('access_token');
  removeToken('refresh_token');
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch('/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
      credentials: 'include',
    });

    if (!res.ok) return null;

    const data = await res.json();
    saveTokens({ access: data.access, refresh: data.refresh });
    return data.access;
  } catch (error) {
    console.log(error)
    return null;
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = getAccessToken();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      clearTokens();
      window.location.href = '/login';
      return;
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

