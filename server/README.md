# Smart Yugam Academy Backend

## Setup
```bash
cd server
npm install
npm start
```

## API Endpoints

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - Login user

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get course by ID

### Progress
- GET `/api/progress` - Get user progress (requires auth)
- POST `/api/progress` - Update user progress (requires auth)

### Assignments
- POST `/api/assignment/:courseId` - Submit assignment (requires auth)

## Environment Variables
Create `.env` file with:
```
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```