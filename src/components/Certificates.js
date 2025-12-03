import { Link } from 'react-router-dom';
import logoImage from '../img/SMART-YUGAM-FINAL-Logo.png';

const Certificates = ({ user, courses }) => {
  const certificates = user.certificates || [];
  
  const downloadCertificate = (certificate) => {
    const course = courses.find(c => c.id === certificate.courseId);
    if (!course) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1200;
    canvas.height = 800;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#3b82f6');
    gradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // White certificate area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 200);
    
    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillText('This is to certify that', canvas.width / 2, 280);
    
    // Student name
    ctx.font = 'bold 42px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(user.name.toUpperCase(), canvas.width / 2, 350);
    
    // Course completion text
    ctx.fillStyle = '#1f2937';
    ctx.font = '24px Arial';
    ctx.fillText('has successfully completed the course', canvas.width / 2, 420);
    
    // Course name
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText(course.title, canvas.width / 2, 490);
    
    // Date
    ctx.fillStyle = '#1f2937';
    ctx.font = '20px Arial';
    const issueDate = new Date(certificate.dateIssued).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillText(`Issued on ${issueDate}`, canvas.width / 2, 580);
    
    // Academy name
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('SMART YUGAM ACADEMY', canvas.width / 2, 630);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('★ ★ ★ AN ISO 9001:2015 CERTIFIED INSTITUTION ★ ★ ★', canvas.width / 2, 660);
    
    // Download
    const link = document.createElement('a');
    link.download = `${user.name}_${course.title}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadAllCertificates = () => {
    certificates.forEach((cert, index) => {
      setTimeout(() => downloadCertificate(cert), index * 1000);
    });
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Certificates</h1>
          <p className="text-gray-600 dark:text-gray-300">View and download your achievements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-purple-600">emoji_events</span></div>
            <h3 className="text-2xl font-bold text-purple-600">{certificates.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Certificates</p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-blue-600">school</span></div>
            <h3 className="text-2xl font-bold text-blue-600">{user.completedCourses?.length || 0}</h3>
            <p className="text-gray-600 dark:text-gray-300">Courses Completed</p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2"><span className="material-icons text-3xl text-green-600">star</span></div>
            <h3 className="text-2xl font-bold text-green-600">
              {certificates.length > 0 ? 
                Math.round(certificates.reduce((sum, cert) => sum + (cert.grade === 'A+' ? 100 : cert.grade === 'A' ? 90 : 80), 0) / certificates.length) + '%' 
                : '0%'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Average Grade</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Certificates</h2>
            {certificates.length > 0 && (
              <button 
                onClick={downloadAllCertificates}
                className="btn-primary flex items-center gap-2"
              >
                <span className="material-icons">download</span>
                Download All
              </button>
            )}
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => {
                const course = courses.find(c => c.id === certificate.courseId);
                if (!course) return null;

                return (
                  <div key={certificate.courseId} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Certificate Preview */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                      <div className="bg-white rounded p-4 text-center">
                        <div className="flex justify-center items-center space-x-2 mb-2">
                          <img src={logoImage} alt="Logo" className="h-6 w-auto" />
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="material-icons text-white text-xs">school</span>
                          </div>
                        </div>
                        <h3 className="text-xs font-bold text-gray-800 mb-1">CERTIFICATE OF COMPLETION</h3>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-2"></div>
                        <p className="text-xs text-gray-600 mb-1">This certifies that</p>
                        <p className="text-sm font-bold text-blue-600 mb-1">{user.name.toUpperCase()}</p>
                        <p className="text-xs text-gray-600 mb-1">has completed</p>
                        <p className="text-xs font-bold text-purple-600 mb-2">{course.title}</p>
                        <p className="text-xs text-gray-500">Smart Yugam Academy</p>
                      </div>
                    </div>

                    {/* Certificate Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{course.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Grade:</span>
                          <span className="font-medium text-green-600">{certificate.grade || 'A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Issued:</span>
                          <span className="font-medium">
                            {new Date(certificate.dateIssued).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadCertificate(certificate)}
                          className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1"
                        >
                          <span className="material-icons text-sm">download</span>
                          Download
                        </button>
                        <Link
                          to={`/certificate/${certificate.courseId}`}
                          className="flex-1 btn-secondary text-sm py-2 text-center"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"><span className="material-icons text-6xl text-gray-400">emoji_events</span></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No certificates yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Complete courses to earn certificates</p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Achievement Levels */}
        {certificates.length > 0 && (
          <div className="mt-8 card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievement Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg text-center ${certificates.length >= 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                <div className="text-2xl mb-2"><span className="material-icons text-2xl">military_tech</span></div>
                <h3 className="font-semibold">Beginner</h3>
                <p className="text-sm">1+ Certificate</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${certificates.length >= 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                <div className="text-2xl mb-2"><span className="material-icons text-2xl">workspace_premium</span></div>
                <h3 className="font-semibold">Intermediate</h3>
                <p className="text-sm">3+ Certificates</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${certificates.length >= 5 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                <div className="text-2xl mb-2"><span className="material-icons text-2xl">emoji_events</span></div>
                <h3 className="font-semibold">Advanced</h3>
                <p className="text-sm">5+ Certificates</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${certificates.length >= 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
                <div className="text-2xl mb-2"><span className="material-icons text-2xl">stars</span></div>
                <h3 className="font-semibold">Expert</h3>
                <p className="text-sm">10+ Certificates</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/courses" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-blue-500">school</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Browse Courses</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Discover new courses to earn more certificates</p>
            </div>
          </Link>
          
          <Link to="/progress" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-green-500">analytics</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">View Progress</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Track your learning journey and progress</p>
            </div>
          </Link>
          
          <Link to="/dashboard" className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-3"><span className="material-icons text-3xl text-purple-500">dashboard</span></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Return to your learning dashboard</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Certificates;