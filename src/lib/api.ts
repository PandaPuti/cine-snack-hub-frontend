export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

// GET request to the backend with the login token attached.
// Call it from inside useEffect or an event handler (it reads localStorage).
export async function apiGet<T>(path: string): Promise<T> {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token ?? ''}` },
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Your session has expired. Please log in again.');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }
  return data as T;
}