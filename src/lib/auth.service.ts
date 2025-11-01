const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  detail?: string;
  details?: string;
  isAuthenticated?: boolean;
  username?: string;
  requires_otp?: boolean;
  user_id?: number;
  email?: string;
}

export interface OTPVerifyRequest {
  user_id: number;
  otp_code: string;
}

export interface OTPResendRequest {
  user_id: number;
}

// Get CSRF token from cookies
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Fetch CSRF token
export async function fetchCSRFToken(): Promise<void> {
  try {
    await fetch(`${API_URL}/session/`, {
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  // Ensure we have CSRF token
  await fetchCSRFToken();
  
  const csrfToken = getCookie('csrftoken');
  
  const response = await fetch(`${API_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'Signup failed');
  }
  
  return data;
}

// Login - Now returns OTP requirement
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Ensure we have CSRF token
  await fetchCSRFToken();
  
  const csrfToken = getCookie('csrftoken');
  
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'Login failed');
  }
  
  return data;
}

// Verify OTP
export async function verifyOTP(request: OTPVerifyRequest): Promise<AuthResponse> {
  const csrfToken = getCookie('csrftoken');
  
  const response = await fetch(`${API_URL}/verify-otp/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    },
    credentials: 'include',
    body: JSON.stringify(request),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'OTP verification failed');
  }
  
  return data;
}

// Resend OTP
export async function resendOTP(request: OTPResendRequest): Promise<AuthResponse> {
  const csrfToken = getCookie('csrftoken');
  
  const response = await fetch(`${API_URL}/resend-otp/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    },
    credentials: 'include',
    body: JSON.stringify(request),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to resend OTP');
  }
  
  return data;
}

// Logout
export async function logout(): Promise<AuthResponse> {
  const csrfToken = getCookie('csrftoken');
  
  const response = await fetch(`${API_URL}/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
    },
    credentials: 'include',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'Logout failed');
  }
  
  return data;
}

// Check session
export async function checkSession(): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/session/`, {
    credentials: 'include',
  });

  return response.json();
}

// Get current user
export async function whoami(): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/whoami/`, {
    credentials: 'include',
  });

  return response.json();
}

// Google Login - Now returns OTP requirement
export async function googleLogin(credential: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/google/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ credential }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'Google login failed');
  }
  
  return data;
}