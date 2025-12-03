import { useParams, Link } from 'react-router-dom';
import logoImage from '../img/SMART-YUGAM-FINAL-Logo.png';

const Certificate = ({ courses, user, setUser }) => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === parseInt(courseId));

  const downloadCertificate = () => {
    // Record certificate generation
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      if (!users[userIndex].certificates) users[userIndex].certificates = [];
      const certificateExists = users[userIndex].certificates.some(cert => cert.courseId === parseInt(courseId));
      
      if (!certificateExists) {
        users[userIndex].certificates.push({
          courseId: parseInt(courseId),
          courseName: course.title,
          dateIssued: new Date().toISOString(),
          grade: 'A' // You can get this from userProgress if needed
        });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        // Update current user state
        if (setUser) setUser(users[userIndex]);
      }
    }
    
    // Create a canvas element for the certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;
    
    // Load and draw logo
    const logo = new Image();
    logo.onload = () => {
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
      
      // Logo at the top
      const logoWidth = 270;
      const logoHeight = 90;
      ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 70, logoWidth, logoHeight);
      
      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 220);
      
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
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      ctx.fillText(`Issued on ${currentDate}`, canvas.width / 2, 580);
      
      // Academy name and branding
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('SMART YUGAM ACADEMY', canvas.width / 2, 630);
      
      ctx.font = '16px Arial';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('★ ★ ★ AN ISO 9001:2015 CERTIFIED INSTITUTION ★ ★ ★', canvas.width / 2, 660);
      
      // Download the certificate
      const link = document.createElement('a');
      link.download = `${user.name}_${course.title}_Certificate.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    
    logo.src = logoImage;
  };

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificate not found</h1>
          <Link to="/courses" className="btn-primary mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Certificate</h1>
        <p className="text-gray-600 dark:text-gray-300">Congratulations on completing {course.title}!</p>
      </div>

      {/* Certificate Preview */}
      <div className="card overflow-hidden mb-8">
        <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-8">
          <div className="bg-white rounded-lg p-12 shadow-2xl">
            <div className="text-center">
              {/* Header */}
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-8 mb-6">
                  <img src={logoImage} alt="Smart Yugam Academy" className="h-50 w-25 object-contain" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  CERTIFICATE OF COMPLETION
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
                <h2 className="text-3xl font-bold text-primary-600 mb-4">
                  {user.name.toUpperCase()}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  has successfully completed the course
                </p>
                <h3 className="text-2xl font-bold text-secondary-600 mb-6">
                  {course.title}
                </h3>
                
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-sm">play_circle</span>
                    <span>{course.videos.length} Videos Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-sm">assignment</span>
                    <span>Assignment Passed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-sm">event</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-sm text-gray-600"></p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-primary-600">
                      Smart Yugam Academy
                    </h4>
                    <p className="text-sm text-gray-600">Online Learning Platform</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link to="/courses" className="btn-secondary">
          Back to Courses
        </Link>
        <button onClick={downloadCertificate} className="btn-primary flex items-center gap-2">
          <span className="material-icons">download</span>
          Download Certificate
        </button>
        <Link to="/dashboard" className="btn-primary">
          View Dashboard
        </Link>
      </div>

      {/* Certificate Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3"><span className="material-icons text-3xl text-yellow-500">emoji_events</span></div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Achievement Unlocked</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            You've successfully completed all course requirements
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3"><span className="material-icons text-3xl text-blue-500">verified</span></div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Skills Verified</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Your knowledge in {course.category} has been validated
          </p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3"><span className="material-icons text-3xl text-green-500">star</span></div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Career Ready</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Add this certificate to your professional portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;