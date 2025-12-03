const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// Data files
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const COURSES_FILE = path.join(__dirname, 'data', 'courses.json');
const PROGRESS_FILE = path.join(__dirname, 'data', 'progress.json');

// Initialize data directory
const initData = async () => {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    
    // Initialize users file
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
    
    // Initialize courses file
    try {
      await fs.access(COURSES_FILE);
    } catch {
      const courses = [
        {
          id: 1,
          title: 'React Fundamentals',
          category: 'Programming',
          description: 'Master React from basics to advanced concepts',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
          videos: [
            { id: 1, title: 'React in 100 Seconds', url: 'Tn6-PIqc4UM' },
            { id: 2, title: 'React Components Tutorial', url: 'Y2hgEGPzTZY' },
            { id: 3, title: 'React State Management', url: 'O6P86uwfdR0' },
            { id: 4, title: 'React Event Handling', url: 'Znqv84xi8Vs' },
            { id: 5, title: 'React Hooks Explained', url: 'TNhaISOUy6Q' }
          ],
          assignment: {
            questions: [
              { id: 1, question: 'What is React?', options: ['A library', 'A framework', 'A language', 'A database'], correct: 0 },
              { id: 2, question: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax', 'JSON Extension', 'JavaScript Extension'], correct: 0 },
              { id: 3, question: 'Which method is used to render React elements?', options: ['render()', 'ReactDOM.render()', 'display()', 'show()'], correct: 1 },
              { id: 4, question: 'What are React components?', options: ['Functions or classes', 'Only functions', 'Only classes', 'HTML elements'], correct: 0 },
              { id: 5, question: 'What is state in React?', options: ['Component data', 'CSS styling', 'HTML structure', 'JavaScript function'], correct: 0 },
              { id: 6, question: 'What are props in React?', options: ['Component properties', 'CSS properties', 'HTML attributes', 'JavaScript variables'], correct: 0 },
              { id: 7, question: 'Which hook is used for state management?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correct: 0 },
              { id: 8, question: 'What is the virtual DOM?', options: ['JavaScript representation of DOM', 'Real DOM', 'CSS DOM', 'HTML DOM'], correct: 0 },
              { id: 9, question: 'How do you handle events in React?', options: ['Event handlers', 'Event listeners', 'Event callbacks', 'Event functions'], correct: 0 },
              { id: 10, question: 'What is useEffect used for?', options: ['Side effects', 'State management', 'Event handling', 'Component rendering'], correct: 0 },
              { id: 11, question: 'What is a React fragment?', options: ['Wrapper element', 'Component type', 'Hook type', 'State type'], correct: 0 },
              { id: 12, question: 'How do you pass data to child components?', options: ['Props', 'State', 'Context', 'Refs'], correct: 0 },
              { id: 13, question: 'What is conditional rendering?', options: ['Rendering based on conditions', 'Always rendering', 'Never rendering', 'Random rendering'], correct: 0 },
              { id: 14, question: 'What is the key prop used for?', options: ['List item identification', 'Styling', 'Event handling', 'State management'], correct: 0 },
              { id: 15, question: 'What is React Router?', options: ['Navigation library', 'State library', 'UI library', 'Testing library'], correct: 0 },
              { id: 16, question: 'What is context in React?', options: ['Global state management', 'Local state', 'Component props', 'Event system'], correct: 0 },
              { id: 17, question: 'What is a higher-order component?', options: ['Component that wraps other components', 'Parent component', 'Child component', 'Root component'], correct: 0 },
              { id: 18, question: 'What is React.memo?', options: ['Performance optimization', 'State management', 'Event handling', 'Routing'], correct: 0 },
              { id: 19, question: 'What is useCallback used for?', options: ['Memoizing functions', 'State updates', 'Effect cleanup', 'Component mounting'], correct: 0 },
              { id: 20, question: 'What is useMemo used for?', options: ['Memoizing values', 'State management', 'Event handling', 'Component rendering'], correct: 0 },
              { id: 21, question: 'What is the difference between state and props?', options: ['State is mutable, props are immutable', 'Both are mutable', 'Both are immutable', 'Props are mutable, state is immutable'], correct: 0 },
              { id: 22, question: 'What is component lifecycle?', options: ['Component creation to destruction', 'Component rendering', 'Component styling', 'Component testing'], correct: 0 },
              { id: 23, question: 'What is componentDidMount equivalent in hooks?', options: ['useEffect with empty dependency', 'useState', 'useContext', 'useReducer'], correct: 0 },
              { id: 24, question: 'What is controlled component?', options: ['Component controlled by React state', 'Uncontrolled component', 'Parent component', 'Child component'], correct: 0 },
              { id: 25, question: 'What is uncontrolled component?', options: ['Component with DOM state', 'React state component', 'Stateless component', 'Pure component'], correct: 0 },
              { id: 26, question: 'What is React.StrictMode?', options: ['Development mode helper', 'Production optimizer', 'Testing utility', 'Debugging tool'], correct: 0 },
              { id: 27, question: 'What is error boundary?', options: ['Component that catches errors', 'Error handler', 'Try-catch block', 'Error logger'], correct: 0 },
              { id: 28, question: 'What is React.lazy used for?', options: ['Code splitting', 'State management', 'Event handling', 'Component styling'], correct: 0 },
              { id: 29, question: 'What is Suspense used for?', options: ['Loading fallback', 'Error handling', 'State management', 'Event handling'], correct: 0 },
              { id: 30, question: 'What is the latest React version approach?', options: ['Functional components with hooks', 'Class components', 'Mixed approach', 'Legacy components'], correct: 0 }
            ],
            timeLimit: 30
          }
        },
        {
          id: 2,
          title: 'Digital Marketing Mastery',
          category: 'Marketing',
          description: 'Complete guide to digital marketing strategies',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
          videos: [
            { id: 1, title: 'Digital Marketing Fundamentals', url: 'bixR-KIJKYM' },
            { id: 2, title: 'SEO Basics Explained', url: 'xsVTqzratPs' },
            { id: 3, title: 'Social Media Marketing Strategy', url: 'R1ZVAoP0CJM' },
            { id: 4, title: 'Content Marketing Guide', url: 'B_2_LqEsKWE' },
            { id: 5, title: 'Google Analytics Tutorial', url: 'gBeMELnxdIg' }
          ],
          assignment: {
            questions: [
              { id: 1, question: 'What is digital marketing?', options: ['Online marketing', 'Traditional marketing', 'Print marketing', 'Radio marketing'], correct: 0 },
              { id: 2, question: 'What does SEO stand for?', options: ['Search Engine Optimization', 'Social Engine Optimization', 'Search Engine Operation', 'Social Engine Operation'], correct: 0 },
              { id: 3, question: 'What is SEM?', options: ['Search Engine Marketing', 'Social Engine Marketing', 'Search Engine Management', 'Social Engine Management'], correct: 0 },
              { id: 4, question: 'What is PPC?', options: ['Pay Per Click', 'Pay Per Customer', 'Pay Per Campaign', 'Pay Per Conversion'], correct: 0 },
              { id: 5, question: 'What is CTR?', options: ['Click Through Rate', 'Cost Through Rate', 'Customer Through Rate', 'Campaign Through Rate'], correct: 0 },
              { id: 6, question: 'What is conversion rate?', options: ['Percentage of visitors who take action', 'Number of clicks', 'Number of impressions', 'Cost per click'], correct: 0 },
              { id: 7, question: 'What is content marketing?', options: ['Creating valuable content', 'Paid advertising', 'Email marketing', 'Social media ads'], correct: 0 },
              { id: 8, question: 'What is social media marketing?', options: ['Marketing on social platforms', 'Email marketing', 'Search marketing', 'Display advertising'], correct: 0 },
              { id: 9, question: 'What is email marketing?', options: ['Direct marketing via email', 'Social media marketing', 'Search marketing', 'Content marketing'], correct: 0 },
              { id: 10, question: 'What is affiliate marketing?', options: ['Commission-based marketing', 'Direct marketing', 'Content marketing', 'Social marketing'], correct: 0 },
              { id: 11, question: 'What is influencer marketing?', options: ['Marketing through influencers', 'Direct advertising', 'Email campaigns', 'Search ads'], correct: 0 },
              { id: 12, question: 'What is remarketing?', options: ['Targeting previous visitors', 'New customer acquisition', 'Brand awareness', 'Content creation'], correct: 0 },
              { id: 13, question: 'What is A/B testing?', options: ['Comparing two versions', 'Single version testing', 'User feedback', 'Market research'], correct: 0 },
              { id: 14, question: 'What is ROI in marketing?', options: ['Return on Investment', 'Rate of Interest', 'Return of Income', 'Rate of Impression'], correct: 0 },
              { id: 15, question: 'What is CPA?', options: ['Cost Per Acquisition', 'Cost Per Action', 'Cost Per Advertisement', 'Cost Per Audience'], correct: 0 },
              { id: 16, question: 'What is CPM?', options: ['Cost Per Mille', 'Cost Per Month', 'Cost Per Marketing', 'Cost Per Management'], correct: 0 },
              { id: 17, question: 'What is CPC?', options: ['Cost Per Click', 'Cost Per Customer', 'Cost Per Campaign', 'Cost Per Conversion'], correct: 0 },
              { id: 18, question: 'What is organic traffic?', options: ['Unpaid search traffic', 'Paid search traffic', 'Social media traffic', 'Direct traffic'], correct: 0 },
              { id: 19, question: 'What is paid traffic?', options: ['Traffic from paid ads', 'Organic search traffic', 'Social media traffic', 'Email traffic'], correct: 0 },
              { id: 20, question: 'What is bounce rate?', options: ['Percentage leaving after one page', 'Conversion rate', 'Click-through rate', 'Engagement rate'], correct: 0 },
              { id: 21, question: 'What is engagement rate?', options: ['User interaction percentage', 'Bounce rate', 'Conversion rate', 'Click rate'], correct: 0 },
              { id: 22, question: 'What is brand awareness?', options: ['Recognition of brand', 'Sales volume', 'Profit margin', 'Market share'], correct: 0 },
              { id: 23, question: 'What is lead generation?', options: ['Attracting potential customers', 'Closing sales', 'Customer service', 'Product development'], correct: 0 },
              { id: 24, question: 'What is customer retention?', options: ['Keeping existing customers', 'Acquiring new customers', 'Increasing prices', 'Reducing costs'], correct: 0 },
              { id: 25, question: 'What is customer lifetime value?', options: ['Total customer worth', 'Single purchase value', 'Monthly revenue', 'Annual profit'], correct: 0 },
              { id: 26, question: 'What is marketing automation?', options: ['Automated marketing processes', 'Manual marketing', 'Traditional advertising', 'Personal selling'], correct: 0 },
              { id: 27, question: 'What is programmatic advertising?', options: ['Automated ad buying', 'Manual ad placement', 'Traditional advertising', 'Direct marketing'], correct: 0 },
              { id: 28, question: 'What is native advertising?', options: ['Ads matching content format', 'Banner ads', 'Pop-up ads', 'Video ads'], correct: 0 },
              { id: 29, question: 'What is viral marketing?', options: ['Content that spreads rapidly', 'Paid advertising', 'Email marketing', 'Direct mail'], correct: 0 },
              { id: 30, question: 'What is omnichannel marketing?', options: ['Integrated multi-channel approach', 'Single channel marketing', 'Traditional marketing', 'Digital-only marketing'], correct: 0 }
            ],
            timeLimit: 30
          }
        }
      ];
      await fs.writeFile(COURSES_FILE, JSON.stringify(courses));
    }
    
    // Initialize progress file
    try {
      await fs.access(PROGRESS_FILE);
    } catch {
      await fs.writeFile(PROGRESS_FILE, JSON.stringify({}));
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), name, email, mobile, password: hashedPassword };
    users.push(user);
    
    await fs.writeFile(USERS_FILE, JSON.stringify(users));
    
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name, email, mobile } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email, mobile: user.mobile } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Course routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = JSON.parse(await fs.readFile(COURSES_FILE, 'utf8'));
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const courses = JSON.parse(await fs.readFile(COURSES_FILE, 'utf8'));
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Progress routes
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8'));
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    const courses = JSON.parse(await fs.readFile(COURSES_FILE, 'utf8'));
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const userProgress = progress[req.user.id] || {};
    const enrolledCourses = user.enrolledCourses || [];
    const completedCourses = user.completedCourses || [];
    
    const progressDetails = enrolledCourses.map(courseId => {
      const course = courses.find(c => c.id === courseId);
      const courseProgress = userProgress[courseId] || {};
      const videosCompleted = courseProgress.videosCompleted || [];
      const assignmentScore = courseProgress.assignmentScore;
      const isCompleted = completedCourses.includes(courseId);
      
      return {
        courseId,
        courseTitle: course?.title || 'Unknown Course',
        category: course?.category || 'Unknown',
        totalVideos: course?.videos?.length || 0,
        completedVideos: videosCompleted.length,
        videoProgress: course ? (videosCompleted.length / course.videos.length) * 100 : 0,
        assignmentScore,
        assignmentGrade: courseProgress.assignmentGrade,
        isCompleted,
        overallProgress: isCompleted ? 100 : (assignmentScore !== undefined ? 90 : (videosCompleted.length / (course?.videos?.length || 1)) * 90)
      };
    });
    
    res.json({
      totalEnrolled: enrolledCourses.length,
      totalCompleted: completedCourses.length,
      certificatesEarned: user.certificates?.length || 0,
      averageProgress: progressDetails.length > 0 ? progressDetails.reduce((sum, p) => sum + p.overallProgress, 0) / progressDetails.length : 0,
      courses: progressDetails
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/progress', authenticateToken, async (req, res) => {
  try {
    const progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8'));
    if (!progress[req.user.id]) progress[req.user.id] = {};
    progress[req.user.id] = { ...progress[req.user.id], ...req.body };
    await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Assignment routes
app.post('/api/assignment/:courseId', authenticateToken, async (req, res) => {
  try {
    const { answers } = req.body;
    const courseId = parseInt(req.params.courseId);
    
    // Get course-specific questions
    const courses = JSON.parse(await fs.readFile(COURSES_FILE, 'utf8'));
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.assignment) {
      return res.status(404).json({ error: 'Course or assignment not found' });
    }
    const questions = course.assignment.questions;
    
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) score++;
    });
    
    const percentage = (score / 30) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    
    const progress = JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf8'));
    if (!progress[req.user.id]) progress[req.user.id] = {};
    if (!progress[req.user.id].assignments) progress[req.user.id].assignments = {};
    
    progress[req.user.id].assignments[courseId] = { score, percentage, grade };
    await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress));
    
    res.json({ score, percentage, grade });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Certificate routes
app.get('/api/certificates', authenticateToken, async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    const courses = JSON.parse(await fs.readFile(COURSES_FILE, 'utf8'));
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const certificates = (user.certificates || []).map(cert => {
      const course = courses.find(c => c.id === cert.courseId);
      return {
        ...cert,
        courseTitle: course?.title || 'Unknown Course',
        category: course?.category || 'Unknown'
      };
    });
    
    res.json({
      totalCertificates: certificates.length,
      totalCompleted: user.completedCourses?.length || 0,
      averageGrade: certificates.length > 0 ? 
        Math.round(certificates.reduce((sum, cert) => {
          const gradeValue = cert.grade === 'A+' ? 100 : cert.grade === 'A' ? 90 : cert.grade === 'B' ? 80 : cert.grade === 'C' ? 70 : cert.grade === 'D' ? 60 : 50;
          return sum + gradeValue;
        }, 0) / certificates.length) : 0,
      certificates
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/certificates', authenticateToken, async (req, res) => {
  try {
    const { courseId, courseName, grade } = req.body;
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });
    
    if (!users[userIndex].certificates) users[userIndex].certificates = [];
    
    const existingCert = users[userIndex].certificates.find(cert => cert.courseId === courseId);
    if (existingCert) {
      return res.status(400).json({ error: 'Certificate already exists' });
    }
    
    users[userIndex].certificates.push({
      courseId,
      courseName,
      grade: grade || 'A',
      dateIssued: new Date().toISOString()
    });
    
    await fs.writeFile(USERS_FILE, JSON.stringify(users));
    res.json({ success: true, message: 'Certificate added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

initData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});