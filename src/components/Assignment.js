import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentAPI } from '../services/api';

const Assignment = ({ courses, user, setUserProgress, setUser }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(courseId));
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState('');

  const calculateScore = useCallback(() => {
    let correct = 0;
    course.assignment.questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correct++;
      }
    });
    return correct;
  }, [course.assignment.questions, answers]);

  const getGrade = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const handleSubmit = useCallback(async () => {
    try {
      const answersArray = course.assignment.questions.map(q => answers[q.id] || -1);
      const result = await assignmentAPI.submit(courseId, answersArray);
      
      setScore(result.score);
      setGrade(result.grade);
      setIsSubmitted(true);

      const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      const updatedProgress = {
        ...userProgress,
        [courseId]: {
          ...userProgress[courseId],
          assignmentCompleted: true,
          assignmentScore: result.score,
          assignmentGrade: result.grade
        }
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      setUserProgress(updatedProgress);

      if (result.percentage >= 60) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        
        if (userIndex !== -1) {
          if (!users[userIndex].completedCourses) users[userIndex].completedCourses = [];
          if (!users[userIndex].completedCourses.includes(parseInt(courseId))) {
            users[userIndex].completedCourses.push(parseInt(courseId));
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            
            // Update current user state
            setUser(users[userIndex]);
          }
        }
      }
    } catch (error) {
      // Fallback to local calculation
      const finalScore = calculateScore();
      const finalGrade = getGrade(finalScore, course.assignment.questions.length);
      
      setScore(finalScore);
      setGrade(finalGrade);
      setIsSubmitted(true);
    }
  }, [course, courseId, setUserProgress, setUser, user.id, answers, calculateScore]);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  if (!course) {
    return (
      <div className="dynamic-bg min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="floating-shapes">
          <div className="shape bg-orange-400"></div>
          <div className="shape bg-red-400"></div>
          <div className="shape bg-pink-400"></div>
          <div className="shape bg-rose-400"></div>
          <div className="shape bg-amber-400"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignment not found</h1>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const percentage = (score / course.assignment.questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="dynamic-bg min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="floating-shapes">
          <div className="shape bg-orange-400"></div>
          <div className="shape bg-red-400"></div>
          <div className="shape bg-pink-400"></div>
          <div className="shape bg-rose-400"></div>
          <div className="shape bg-amber-400"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="card p-8 text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-6 ${
            passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            <span className="material-icons text-4xl">
              {passed ? 'emoji_events' : 'sentiment_dissatisfied'}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Assignment {passed ? 'Completed!' : 'Failed'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
              <div className="text-blue-800 dark:text-blue-300">Correct Answers</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{Math.round(percentage)}%</div>
              <div className="text-purple-800 dark:text-purple-300">Score</div>
            </div>
            <div className={`p-6 rounded-lg ${
              passed ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
            }`}>
              <div className={`text-3xl font-bold ${
                passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>{grade}</div>
              <div className={passed ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}>Grade</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="btn-secondary"
            >
              Back to Courses
            </button>
            {passed && (
              <button
                onClick={() => navigate(`/certificate/${courseId}`)}
                className="btn-primary"
              >
                <span className="flex items-center gap-2">
                  Get Certificate <span className="material-icons">emoji_events</span>
                </span>
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = course.assignment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / course.assignment.questions.length) * 100;

  return (
    <div className="dynamic-bg min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="floating-shapes">
        <div className="shape bg-orange-400"></div>
        <div className="shape bg-red-400"></div>
        <div className="shape bg-pink-400"></div>
        <div className="shape bg-rose-400"></div>
        <div className="shape bg-amber-400"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{course.title} - Assignment</h1>
          <div className={`text-xl font-bold flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeLeft < 300 ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30' : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
          }`}>
            <span className="material-icons text-2xl">timer</span>
            <div>
              <div className="text-sm font-normal text-gray-600 dark:text-gray-300">Time Remaining</div>
              <div className="text-xl font-bold">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>Question {currentQuestion + 1} of {course.assignment.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="card p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Question {currentQuestion + 1} of {course.assignment.questions.length}</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>
        
        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                answers[currentQ.id] === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                  answers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg leading-relaxed text-gray-900 dark:text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {course.assignment.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white shadow-lg'
                  : answers[course.assignment.questions[index].id] !== undefined
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        {currentQuestion === course.assignment.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="btn-primary"
          >
            Submit Assignment
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(course.assignment.questions.length - 1, currentQuestion + 1))}
            className="btn-primary"
          >
            Next
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default Assignment;