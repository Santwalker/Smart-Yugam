import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoImage from '../img/SMART-YUGAM-FINAL-Logo.png';

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/courses', label: 'Courses', icon: 'school' },
    { path: '/progress', label: 'Progress', icon: 'analytics' },
    { path: '/certificates', label: 'Certificates', icon: 'emoji_events' },
  ];

  return (
    <nav className="dynamic-navbar shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={logoImage} alt="Smart Yugam Academy" className="h-10 w-auto object-contain" />
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`dynamic-nav-item flex items-center space-x-2 px-3 py-2 rounded-lg z-10 relative ${
                    location.pathname === item.path
                      ? 'text-white active'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="material-icons text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="material-icons text-xl">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="dynamic-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;