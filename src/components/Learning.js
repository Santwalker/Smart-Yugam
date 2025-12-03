import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Learning = ({ courses, user, userProgress, setUserProgress }) => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === parseInt(courseId));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(userProgress[courseId] || {
    currentVideo: 0,
    videosCompleted: [],
    assignmentCompleted: false
  });

  useEffect(() => {
    if (course && userProgress[courseId]) {
      setCurrentVideoIndex(userProgress[courseId].currentVideo || 0);
      setProgress(userProgress[courseId]);
    }
  }, [courseId, userProgress, course]);

  const markVideoComplete = () => {
    const newProgress = {
      ...progress,
      videosCompleted: [...new Set([...progress.videosCompleted, currentVideoIndex])]
    };
    
    const updatedUserProgress = {
      ...userProgress,
      [courseId]: newProgress
    };
    
    setProgress(newProgress);
    setUserProgress(updatedUserProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < course.videos.length - 1) {
      const nextIndex = currentVideoIndex + 1;
      setCurrentVideoIndex(nextIndex);
      
      const newProgress = {
        ...progress,
        currentVideo: nextIndex
      };
      
      const updatedUserProgress = {
        ...userProgress,
        [courseId]: newProgress
      };
      
      setProgress(newProgress);
      setUserProgress(updatedUserProgress);
      localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      setCurrentVideoIndex(prevIndex);
      
      const newProgress = {
        ...progress,
        currentVideo: prevIndex
      };
      
      const updatedUserProgress = {
        ...userProgress,
        [courseId]: newProgress
      };
      
      setProgress(newProgress);
      setUserProgress(updatedUserProgress);
      localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
    }
  };

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h1>
          <Link to="/courses" className="btn-primary mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const currentVideo = course.videos[currentVideoIndex];
  const allVideosCompleted = progress.videosCompleted.length === course.videos.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{course.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-3">
          <div className="card overflow-hidden">
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.url}`}
                title={currentVideo.title}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {currentVideo.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Video {currentVideoIndex + 1} of {course.videos.length}
              </p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round((progress.videosCompleted.length / course.videos.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.videosCompleted.length / course.videos.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button
                    onClick={goToPreviousVideo}
                    disabled={currentVideoIndex === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  
                  <button
                    onClick={markVideoComplete}
                    disabled={progress.videosCompleted.includes(currentVideoIndex)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      progress.videosCompleted.includes(currentVideoIndex)
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {progress.videosCompleted.includes(currentVideoIndex) ? (
                      <><span className="material-icons text-sm mr-1">check</span>Completed</>
                    ) : 'Mark Complete'}
                  </button>
                  
                  <button
                    onClick={goToNextVideo}
                    disabled={currentVideoIndex === course.videos.length - 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
                
                {allVideosCompleted && (
                  <Link
                    to={`/assignment/${courseId}`}
                    className="btn-primary"
                  >
                    <span className="flex items-center gap-2">
                      Take Assignment <span className="material-icons">assignment</span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Course Content</h3>
            
            <div className="space-y-2">
              {course.videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    index === currentVideoIndex
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      progress.videosCompleted.includes(index)
                        ? 'bg-green-500 text-white'
                        : index === currentVideoIndex
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {progress.videosCompleted.includes(index) ? (
                        <span className="material-icons text-sm">check</span>
                      ) : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{video.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Video {index + 1}</p>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* Assignment */}
              <div className={`p-3 rounded-lg border-2 ${
                allVideosCompleted
                  ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-600'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    progress.assignmentCompleted
                      ? 'bg-green-500 text-white'
                      : allVideosCompleted
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {progress.assignmentCompleted ? (
                      <span className="material-icons text-sm">check</span>
                    ) : (
                      <span className="material-icons text-sm">assignment</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">Final Assignment</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {allVideosCompleted ? 'Available' : 'Complete all videos first'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="card p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Videos Watched</span>
                <span className="font-semibold">{progress.videosCompleted.length}/{course.videos.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Assignment</span>
                <span className="font-semibold">
                  {progress.assignmentCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
                <span className="font-semibold text-primary-600">
                  {Math.round(((progress.videosCompleted.length + (progress.assignmentCompleted ? 1 : 0)) / (course.videos.length + 1)) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;