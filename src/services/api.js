const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();
  
  if (!response.ok) throw new Error(data.error || 'API Error');
  return data;
};

export const authAPI = {
  register: (userData) => apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => apiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
};

export const coursesAPI = {
  getAll: () => apiCall('/courses'),
  getById: (id) => apiCall(`/courses/${id}`)
};

export const progressAPI = {
  get: () => apiCall('/progress'),
  update: (data) => apiCall('/progress', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const assignmentAPI = {
  submit: (courseId, answers) => apiCall(`/assignment/${courseId}`, {
    method: 'POST',
    body: JSON.stringify({ answers })
  })
};

export const certificatesAPI = {
  getAll: () => apiCall('/certificates'),
  add: (certificateData) => apiCall('/certificates', {
    method: 'POST',
    body: JSON.stringify(certificateData)
  })
};