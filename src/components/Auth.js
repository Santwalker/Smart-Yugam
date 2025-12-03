import React, { useState } from 'react';
import { authAPI } from '../services/api';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: captcha, 2: mobile
  const [captcha, setCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  React.useEffect(() => {
    // Create a test user if none exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const testUser = {
        id: 1,
        name: 'Test User',
        email: 'test@smartyugam.com',
        mobile: '9876543210',
        password: 'test123',
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        savedCourses: []
      };
      users.push(testUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Generate captcha when component mounts
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      // Mobile validation
      const mobileRegex = /^[0-9]{10}$/;
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
      
      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Try API first, fallback to localStorage
        try {
          const response = await authAPI.login({ email: formData.email, password: formData.password });
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          setUser(response.user);
        } catch (apiError) {
          // Fallback to localStorage authentication
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.email === formData.email && u.password === formData.password);
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setUser(user);
          } else {
            setErrors({ email: 'Invalid email or password' });
          }
        }
      } else {
        // Try API first, fallback to localStorage
        try {
          const response = await authAPI.register({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password
          });
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          setUser(response.user);
        } catch (apiError) {
          // Fallback to localStorage registration
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const existingUser = users.find(u => u.email === formData.email);
          if (existingUser) {
            setErrors({ email: 'Email already exists' });
            return;
          }
          
          const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            enrolledCourses: [],
            completedCourses: [],
            certificates: [],
            savedCourses: []
          };
          
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          setUser(newUser);
        }
      }
    } catch (error) {
      setErrors({ email: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setForgotStep(1);
    setGeneratedCaptcha(generateCaptcha());
    setErrors({});
  };

  const handleCaptchaSubmit = () => {
    if (captcha.toUpperCase() !== generatedCaptcha) {
      setErrors({ captcha: 'Invalid captcha code' });
      setGeneratedCaptcha(generateCaptcha());
      setCaptcha('');
      return;
    }
    setForgotStep(2);
    setErrors({});
  };

  const handleMobileSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.mobile === formData.mobile);
    
    if (user) {
      setErrors({ success: `Your password is: ${user.password}` });
    } else {
      setErrors({ mobile: 'Mobile number not found in our records' });
    }
  };

  const resetForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotStep(1);
    setCaptcha('');
    setFormData({ ...formData, mobile: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl max-w-md w-full p-8 animate-fade-in shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">SMART YUGAM</h1>
          <p className="text-yellow-300 font-semibold text-sm mb-1">★ ★ ★ ACADEMY ★ ★ ★</p>
          <p className="text-white/80 text-xs mb-4">AN ISO 9001:2015 CERTIFIED INSTITUTION</p>
          <p className="text-white/100 text-sm">Advanced Learning Platform</p>
        </div>

        <div className="flex mb-6 bg-white/20 rounded-full p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
              isLogin ? 'bg-white text-purple-700 shadow-lg' : 'text-white/70 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
              !isLogin ? 'bg-white text-purple-700 shadow-lg' : 'text-white/70 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {showForgotPassword ? (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-semibold">Forgot Password</h3>
              <p className="text-white/70 text-sm mt-1">
                {forgotStep === 1 ? 'Enter the captcha code' : 'Enter your mobile number'}
              </p>
            </div>

            {forgotStep === 1 ? (
              <>
                <div className="bg-white/20 p-4 rounded-xl text-center">
                  <div className="bg-white/30 p-3 rounded-lg mb-3">
                    <span className="text-white font-bold text-2xl tracking-widest">{generatedCaptcha}</span>
                  </div>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">security</span>
                    <input
                      type="text"
                      placeholder="Enter captcha code"
                      className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                    />
                  </div>
                  {errors.captcha && <p className="text-red-300 text-sm mt-2">{errors.captcha}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleCaptchaSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  Verify Captcha
                </button>
              </>
            ) : (
              <>
                <div>
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">phone</span>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                  {errors.mobile && <p className="text-red-300 text-sm mt-1">{errors.mobile}</p>}
                  {errors.success && <p className="text-green-300 text-sm mt-2 p-3 bg-green-500/20 rounded-xl">{errors.success}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleMobileSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  Get Password
                </button>
              </>
            )}

            <button
              type="button"
              onClick={resetForgotPassword}
              className="w-full text-white/80 hover:text-white font-medium py-2 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <div className="relative">
                  <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">person</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">phone</span>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                {errors.mobile && <p className="text-red-300 text-sm mt-1">{errors.mobile}</p>}
              </div>
            </>
          )}

          <div>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">email</span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">lock</span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div>
              <div className="relative">
                <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">lock_outline</span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-300 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
          </form>
        )}

        {isLogin && !showForgotPassword && (
          <div className="mt-6">
            <button 
              onClick={handleForgotPassword} 
              className="w-full text-white/80 hover:text-white font-medium py-2 transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;