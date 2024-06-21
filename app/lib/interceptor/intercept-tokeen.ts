function getToken() {
  const token = localStorage.getItem('token')
  return token
}

export async function fetchWithToken(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken(); // Remove the 'await' here
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const requestOptions: RequestInit = {
    ...options,
    headers,
  };
  
  return await fetch(url, requestOptions);
}