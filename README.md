# Smart Yugam Academy - React Learning Platform

A comprehensive React-based online learning platform with advanced Tailwind CSS styling and modern UI/UX design.

## Features

### Authentication System
- **User Registration**: Name, email, mobile, password validation with confirmation matching
- **Sign In**: Email and password authentication
- **Forgot Password**: Captcha verification with mobile number recovery
- **Data Persistence**: User data stored in localStorage (simulating file-based authentication)

### Course Management
- **Course Browsing**: Filter by categories (Programming, Marketing, etc.)
- **Course Enrollment**: One-click enrollment system
- **Save for Later**: Bookmark courses for future reference
- **Search Functionality**: Find courses by title or description
- **Course Categories**: Organized learning paths

### Learning Experience
- **Video-based Learning**: 5 videos per course with YouTube integration
- **Manual Navigation**: Previous/Next buttons with progress tracking
- **Video Progress**: Track completed videos with visual indicators
- **Assignment System**: 30-question multiple choice quizzes
- **Timer Functionality**: 30-minute countdown for assignments
- **Automatic Scoring**: Real-time grading with letter grades (A+ to F)

### Dashboard & Analytics
- **Progress Overview**: Visual stats for ongoing/completed courses
- **Assignment Reports**: Detailed marks and grades display
- **Recent Activity**: Timeline of learning activities
- **Quick Actions**: Fast access to common tasks
- **Statistics Cards**: Certificates, assignments, and course counts

### Certificates
- **Free Certificates**: Generated upon successful course completion
- **Personalized Design**: Student name and course title integration
- **Dual Logo Display**: Professional certificate layout
- **Download Functionality**: PNG format certificate download
- **Canvas-based Generation**: High-quality certificate creation

### Advanced UI/UX
- **Tailwind CSS**: Modern utility-first styling
- **Gradient Backgrounds**: Beautiful color transitions
- **Glass Morphism**: Modern frosted glass effects
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Loading States**: Professional loading screens
- **Interactive Elements**: Hover effects and transitions

## Technical Stack

- **Frontend**: React 18 with Hooks (useState, useEffect)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v3 with custom configurations
- **State Management**: Local state with localStorage persistence
- **Video Integration**: YouTube embedded player
- **Icons**: Emoji-based icon system
- **Build Tool**: Create React App
- **Fonts**: Inter font family from Google Fonts

## Project Structure

```
smart-yugam-academy/
├── public/
│   ├── index.html          # HTML template with loading screen
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # Website favicon
├── src/
│   ├── components/
│   │   ├── Auth.js         # Authentication component
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Dashboard.js    # User dashboard
│   │   ├── Courses.js      # Course listing and filtering
│   │   ├── Learning.js     # Video learning interface
│   │   ├── Assignment.js   # Quiz and assessment
│   │   └── Certificate.js  # Certificate generation
│   ├── App.js              # Main application component
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS with custom styles
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd smart-yugam-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage Guide

### Getting Started
1. **Register**: Create a new account with your details
<img width="2553" height="1271" alt="Screenshot 2025-12-03 192558" src="https://github.com/user-attachments/assets/f9814388-4907-4c13-835b-e1d322b46f96" />
<img width="2559" height="1272" alt="Screenshot 2025-12-03 192619" src="https://github.com/user-attachments/assets/abc0f5c7-d1da-42f3-ad6c-8bf2cdfcebce" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------

2. **Browse Courses**: Explore available courses by category
<img width="1722" height="1205" alt="Screenshot 2025-12-03 192741" src="https://github.com/user-attachments/assets/db9ebb00-d01a-4136-ad08-b3d9b39dfc04" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------


3. **Enroll**: Click "Enroll Now" on any course
<img width="1749" height="1194" alt="Screenshot 2025-12-03 192811" src="https://github.com/user-attachments/assets/fe7feddd-4f04-4e26-a38a-76a098d45fac" />
<img width="1086" height="602" alt="Screenshot 2025-12-03 192843" src="https://github.com/user-attachments/assets/f93bdfb2-8828-4bce-a892-2ac0d129726b" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------

4. **Learn**: Watch videos sequentially and track progress
<img width="1340" height="987" alt="Screenshot 2025-12-03 193744" src="https://github.com/user-attachments/assets/de92d80b-5912-4209-8462-488ef4c35a7f" />
<img width="1430" height="1005" alt="Screenshot 2025-12-03 193816" src="https://github.com/user-attachments/assets/44f2f1f9-d3dd-43b9-92c8-d72ddd385def" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------

5. **Assessment**: Complete the 30-question assignment
<img width="1354" height="1040" alt="Screenshot 2025-12-03 192925" src="https://github.com/user-attachments/assets/30c392b9-5c0b-4f4e-82ed-e645723b0f52" />
<img width="1346" height="1086" alt="Screenshot 2025-12-03 194733" src="https://github.com/user-attachments/assets/ac926b4a-dad9-49c8-b425-43c820892653" />
--------------------------------------------------------------------------------------------------------------------------------------------------------------

6. **Certificate**: Download your certificate upon passing
<img width="1373" height="922" alt="Screenshot 2025-12-03 194800" src="https://github.com/user-attachments/assets/1c24285b-9844-4510-b6c6-acfe86989697" />
<img width="1568" height="1196" alt="Screenshot 2025-12-03 194823" src="https://github.com/user-attachments/assets/377d5919-3efa-4cbe-baf9-3b8941310fe5" />
-----------------------------------------------------------------------------------------------------------------------------------------------------------
### Course Flow
```
Browse Courses → Enroll → Watch Videos → Complete Assignment → Get Certificate
```

### Grading System
- **A+**: 90-100% (Excellent)
- **A**: 80-89% (Very Good)
- **B**: 70-79% (Good)
- **C**: 60-69% (Satisfactory)
- **D**: 50-59% (Pass)
- **F**: Below 50% (Fail)

## Design Features

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple gradient (#8b5cf6 to #7c3aed)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-900)
- **Body**: Regular weight (400-500)
- **UI Elements**: Medium weight (500-600)

### Animations
- **Fade In**: Smooth element appearance
- **Slide Up**: Bottom-to-top transitions
- **Hover Effects**: Scale and translate transforms
- **Loading States**: Pulse and spin animations

## Customization

### Adding New Courses
Edit the `initialCourses` array in `App.js`:
```javascript
{
  id: 3,
  title: 'Your Course Title',
  category: 'Your Category',
  description: 'Course description',
  image: 'https://your-image-url.com',
  videos: [
    { id: 1, title: 'Video 1', url: 'youtube-video-id' },
    // ... more videos
  ],
  assignment: {
    questions: generateQuestions('Your Topic'),
    timeLimit: 30
  }
}
```

### Styling Customization
Modify `tailwind.config.js` for:
- Custom colors
- New animations
- Typography scales
- Spacing values

### Component Customization
Each component is modular and can be easily modified:
- `Auth.js`: Login/registration forms
- `Dashboard.js`: User statistics and overview
- `Courses.js`: Course listing and filtering
- `Learning.js`: Video player and progress
- `Assignment.js`: Quiz interface and timer
- `Certificate.js`: Certificate design and download

## Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Data Storage

Currently uses localStorage for:
- User accounts and authentication
- Course enrollment data
- Learning progress tracking
- Assignment scores and grades
- Certificate records

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build files to S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Smart Yugam Academy** - Empowering learners with modern technology and beautiful design!
