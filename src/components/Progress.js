import { Link } from 'react-router-dom';

const Progress = ({ user, courses, userProgress }) => {
  const enrolledCourses = user.enrolledCourses || [];
  const completedCourses = user.completedCourses || [];

  const getProgressData = () => {
    return enrolledCourses.map(courseId => {
      const course = courses.find(c => c.id === courseId);
      const progress = userProgress[courseId] || {};
      const completedVideos = progress.completedVideos || [];
      const assignmentScore = progress.assignmentScore;
      const isCompleted = completedCourses.includes(courseId);
      
      const videoProgress = course ? (completedVideos.length / course.videos.length) * 100 : 0;
      const overallProgress = isCompleted ? 100 : (assignmentScore !== undefined ? 90 : videoProgress * 0.9);
      
      return {
        course,
        videoProgress,
        overallProgress,
        completedVideos: completedVideos.length,
        totalVideos: course?.videos.length || 0,
        assignmentScore,
        isCompleted,
        grade: getGrade(assignmentScore)
      };
    });
  };

  const getGrade = (score) => {
    if (score === undefined) return null;
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const progressData = getProgressData();
  const overallStats = {
    totalEnrolled: enrolledCourses.length,
    totalCompleted: completedCourses.length,
    averageProgress: progressData.length > 0 ? 
      progressData.reduce((sum, item) => sum + item.overallProgress, 0) / progressData.length : 0,
    certificatesEarned: (user.certificates || []).length
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Progress</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your learning journey and achievements</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-blue-600">school</span></div>
            <h3 className="text-2xl font-bold text-blue-600">{overallStats.totalEnrolled}</h3>
            <p className="text-gray-600 dark:text-gray-300">Courses Enrolled</p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-green-600">check_circle</span></div>
            <h3 className="text-2xl font-bold text-green-600">{overallStats.totalCompleted}</h3>
            <p className="text-gray-600 dark:text-gray-300">Courses Completed</p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-purple-600">analytics</span></div>
            <h3 className="text-2xl font-bold text-purple-600">{Math.round(overallStats.averageProgress)}%</h3>
            <p className="text-gray-600 dark:text-gray-300">Average Progress</p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-orange-600">emoji_events</span></div>
            <h3 className="text-2xl font-bold text-orange-600">{overallStats.certificatesEarned}</h3>
            <p className="text-gray-600 dark:text-gray-300">Certificates Earned</p>
          </div>
        </div>

        {/* Course Progress Details */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Course Progress Details</h2>
          
          {progressData.length > 0 ? (
            <div className="space-y-6">
              {progressData.map(({ course, videoProgress, overallProgress, completedVideos, totalVideos, assignmentScore, isCompleted, grade }) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{course.category}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><span className="material-icons text-sm">play_circle</span> {completedVideos}/{totalVideos} videos</span>
                        {assignmentScore !== undefined && (
                          <span className="flex items-center gap-1"><span className="material-icons text-sm">assignment</span> Assignment: {assignmentScore}% ({grade})</span>
                        )}
                        {isCompleted && <span className="text-green-600 font-medium flex items-center gap-1"><span className="material-icons text-sm">check_circle</span> Completed</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {Math.round(overallProgress)}%
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/learning/${course.id}`}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          Continue
                        </Link>
                        {isCompleted && (
                          <Link
                            to={`/certificate/${course.id}`}
                            className="btn-secondary text-sm py-1 px-3"
                          >
                            Certificate
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span>Video Progress</span>
                        <span>{Math.round(videoProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span>Overall Progress</span>
                        <span>{Math.round(overallProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><span className="material-icons text-6xl text-gray-400">school</span></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Start your learning journey by enrolling in a course</p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/courses" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-blue-500">search</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Browse More Courses</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Discover new skills and expand your knowledge</p>
            </div>
          </Link>
          
          <Link to="/dashboard" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-green-500">dashboard</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">View Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">See your learning overview and recent activity</p>
            </div>
          </Link>
          
          <div className="card p-6">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-purple-500">emoji_events</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Achievements</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">View your certificates and accomplishments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;