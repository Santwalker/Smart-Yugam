
import { Link } from 'react-router-dom';

const Dashboard = ({ user, userProgress }) => {
  // Calculate proper stats
  const enrolledCourses = user.enrolledCourses || [];
  const completedCourses = user.completedCourses || [];
  const certificates = user.certificates || [];
  const assignmentScores = Object.keys(userProgress).filter(courseId => userProgress[courseId].assignmentScore !== undefined);
  
  const stats = {
    ongoing: enrolledCourses.length - completedCourses.length,
    completed: completedCourses.length,
    certificates: certificates.length,
    assignments: assignmentScores.length
  };

  const recentActivity = [
    { type: 'course', title: 'Started React Fundamentals', time: '2 hours ago' },
    { type: 'assignment', title: 'Completed Marketing Quiz', time: '1 day ago' },
    { type: 'certificate', title: 'Earned JavaScript Certificate', time: '3 days ago' }
  ];

  return (
    <div className="dynamic-bg min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Continue your learning journey
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Ongoing Courses</p>
              <p className="text-4xl font-bold">{stats.ongoing}</p>
            </div>
            <div className="text-white/80">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Completed</p>
              <p className="text-4xl font-bold">{stats.completed}</p>
            </div>
            <div className="text-white/80">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Certificates</p>
              <p className="text-4xl font-bold">{stats.certificates}</p>
            </div>
            <div className="text-white/80">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 5h5.5l1.5 5 1.5-5H17l-2 11H5zm2.7-2h6.6l.9-5h-2.5l-1.5 3-1.5-3H7.2l.5 5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Assignments</p>
              <p className="text-4xl font-bold">{stats.assignments}</p>
            </div>
            <div className="text-white/80">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
              <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>
            
            {user.enrolledCourses?.length > 0 ? (
              <div className="space-y-4">
                {user.enrolledCourses.slice(0, 3).map((courseId) => (
                  <div key={courseId} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="material-icons text-white">school</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Course {courseId}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Continue learning</p>
                    </div>
                    <Link
                      to={`/learning/${courseId}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4"><span className="material-icons text-6xl text-gray-400 dark:text-gray-500">school</span></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses enrolled yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Start your learning journey by enrolling in a course</p>
                <Link to="/courses" className="btn-primary">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activity.type === 'course' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  activity.type === 'assignment' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  <span className="material-icons text-sm">
                    {activity.type === 'course' ? 'school' : 
                     activity.type === 'assignment' ? 'assignment' : 'emoji_events'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/courses" className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/50 dark:hover:to-blue-700/50 transition-all">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="material-icons text-white text-xl">search</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Browse Courses</h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">Discover new skills</p>
              </div>
            </Link>

            <Link to="/progress" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/50 dark:hover:to-green-700/50 transition-all">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="material-icons text-white text-xl">analytics</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-300">View Progress</h3>
                <p className="text-green-700 dark:text-green-400 text-sm">Track your learning</p>
              </div>
            </Link>

            <Link to="/certificates" className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/50 dark:hover:to-purple-700/50 transition-all">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="material-icons text-white text-xl">emoji_events</span>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-300">Certificates</h3>
                <p className="text-purple-700 dark:text-purple-400 text-sm">View achievements</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;