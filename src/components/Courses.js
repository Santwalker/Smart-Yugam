import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = ({ courses, user, setUserProgress, setUser }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const enrollInCourse = (courseId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].enrolledCourses) users[userIndex].enrolledCourses = [];
      if (!users[userIndex].enrolledCourses.includes(courseId)) {
        users[userIndex].enrolledCourses.push(courseId);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        // Update current user state
        setUser(users[userIndex]);
        
        // Update user progress
        setUserProgress(prev => ({
          ...prev,
          [courseId]: { currentVideo: 0, videosCompleted: [], assignmentCompleted: false }
        }));
      }
    }
  };

  const saveCourse = (courseId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].savedCourses) users[userIndex].savedCourses = [];
      if (!users[userIndex].savedCourses.includes(courseId)) {
        users[userIndex].savedCourses.push(courseId);
      } else {
        users[userIndex].savedCourses = users[userIndex].savedCourses.filter(id => id !== courseId);
      }
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      
      // Update current user state
      setUser(users[userIndex]);
    }
  };

  const unenrollFromCourse = (courseId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      if (users[userIndex].enrolledCourses) {
        users[userIndex].enrolledCourses = users[userIndex].enrolledCourses.filter(id => id !== courseId);
      }
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      
      // Update current user state
      setUser(users[userIndex]);
      
      // Remove progress
      setUserProgress(prev => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'enrolled') return matchesSearch && user.enrolledCourses?.includes(course.id);
    if (activeTab === 'saved') return matchesSearch && user.savedCourses?.includes(course.id);
    if (activeTab === 'programming') return matchesSearch && course.category === 'Programming';
    if (activeTab === 'marketing') return matchesSearch && course.category === 'Marketing';
    
    return matchesSearch;
  });

  const tabs = [
    { id: 'all', label: 'All Courses', icon: 'school' },
    { id: 'enrolled', label: 'My Courses', icon: 'check_circle' },
    { id: 'saved', label: 'Saved', icon: 'favorite' },
    { id: 'programming', label: 'Programming', icon: 'code' },
    { id: 'marketing', label: 'Marketing', icon: 'trending_up' }
  ];

  return (
    <div className="dynamic-bg min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="floating-shapes">
        <div className="shape bg-green-400"></div>
        <div className="shape bg-blue-400"></div>
        <div className="shape bg-indigo-400"></div>
        <div className="shape bg-teal-400"></div>
        <div className="shape bg-cyan-400"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Courses</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <span className="material-icons">search</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="material-icons text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card overflow-hidden">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => saveCourse(course.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    user.savedCourses?.includes(course.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <span className="material-icons">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <span className="material-icons text-sm">play_circle</span>
                    <span>{course.videos.length} videos</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="material-icons text-sm">assignment</span>
                    <span>Assignment</span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {user.enrolledCourses?.includes(course.id) ? (
                  <div className="flex space-x-2">
                    <Link
                      to={`/learning/${course.id}`}
                      className="btn-primary flex-1 text-center text-sm py-2"
                    >
                      Continue Learning
                    </Link>
                    <Link
                      to={`/assignment/${course.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                    >
                      Start Assignment
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    className="btn-primary w-full text-sm py-2"
                  >
                    Enroll Now
                  </button>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveCourse(course.id)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                      user.savedCourses?.includes(course.id)
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {user.savedCourses?.includes(course.id) ? 'Remove Saved' : 'Save Course'}
                  </button>
                  
                  {user.enrolledCourses?.includes(course.id) && (
                    <button
                      onClick={() => unenrollFromCourse(course.id)}
                      className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-600 px-3 py-2 rounded-lg font-medium transition-all text-sm hover:bg-red-200 dark:hover:bg-red-900/50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4"><span className="material-icons text-6xl text-gray-400">school</span></div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filters</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Courses;