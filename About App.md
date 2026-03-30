# Nirikshan - Dormitory Management System

A comprehensive dormitory management system with role-based access control (RBAC) for students, parents, and wardens.

## Features

- **Authentication & Role Management**: Secure login with role-based access (Student/Parent/Warden)
- **Database/API Backend**: RESTful API with Prisma ORM and PostgreSQL
- **Real-time Communication**: Messaging system between different user roles
- **Dorm Information Management**: Room assignments, student profiles, and administrative data

## Tech Stack

### Backend

- **Node.js** with **TypeScript**
- **Express.js** framework
- **Prisma** ORM with **PostgreSQL**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend

- **React Native** with **Expo**
- **TypeScript**
- **React Navigation** for routing
- **Axios** for API calls
- **Expo SecureStore** for secure token storage

## Project Structure

```
nirikshan+/
├── server/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Authentication & validation
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── scripts/        # Database seeding
│   ├── prisma/             # Database schema
│   └── package.json
├── frontend/               # React Native app
│   ├── src/
│   │   ├── contexts/       # React contexts
│   │   ├── screens/        # App screens
│   │   └── services/       # API services
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Expo CLI (`npm install -g @expo/cli`)

### Backend Setup

1. **Navigate to server directory**:

   ```bash
   cd server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your database credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nirikshan_db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

4. **Set up the database**:

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

The server will be running at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the Expo development server**:

   ```bash
   npm start
   ```

4. **Run on your preferred platform**:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Request/Response Examples

#### Register

```json
POST /api/auth/register
{
  "email": "student@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT",
  "phone": "+1234567890"
}
```

#### Login

```json
POST /api/auth/login
{
  "email": "student@example.com",
  "password": "password123"
}
```

## Demo Accounts

The system comes with pre-seeded demo accounts:

| Role            | Email                      | Password    |
| --------------- | -------------------------- | ----------- |
| 👑 Chief Warden | chief.warden@nirikshan.com | password123 |
| 👮 Warden       | warden@nirikshan.com       | password123 |
| 👨‍👩‍👧‍👦 Parent       | parent@example.com         | password123 |
| 👨‍🎓 Student      | student@nirikshan.com      | password123 |

## Role-Based Features

### Student

- View room details and dorm status
- Message parents and wardens
- Report issues
- View notifications

### Parent

- Monitor child's dorm status
- View room information
- Message wardens
- Check notifications
- Access emergency contacts

### Warden

- Manage all students
- Handle room assignments
- Manage issues and reports
- Communicate with parents
- Generate dormitory reports

### Chief Warden

- Create & manage wardens
- System administration
- Dormitory policy management
- Financial oversight
- Staff performance review
- Emergency response coordination
- Generate system reports

## Database Schema

The system uses the following main entities:

- **User**: Base user information with role-based profiles
- **StudentProfile**: Student-specific information
- **ParentProfile**: Parent-specific information
- **WardenProfile**: Warden-specific information
- **Message**: Communication between users
- **Room**: Dormitory room information

## Development

### Backend Development

- Follow the modular approach: Services (business logic) → Controllers (request handling) → Routes (endpoints)
- Use Prisma for all database operations
- Implement proper error handling and validation
- Use JWT middleware for protected routes

### Frontend Development

- Use TypeScript for type safety
- Implement proper state management with React Context
- Use secure storage for authentication tokens
- Follow React Native best practices

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js for security headers

## App Overview

Nirikshan is a role-based dormitory management app designed to improve communication, accountability, and safety between students, parents, wardens, and chief wardens.

### Key App Capabilities

- Secure sign-in and role-aware access
- Student profile and dorm status visibility
- Parent monitoring and communication tools
- Warden administration workflows for student and room management
- Messaging and emergency response support

### Intended Users

- Students residing in dormitories
- Parents or guardians
- Wardens and chief wardens
- Institutional administrators

## Terms and Conditions

By using the Nirikshan application and associated backend services, you agree to the following terms:

1. **Eligibility**
   - You must be authorized by your institution or dormitory administration to use this app.
   - You are responsible for maintaining accurate account information.

2. **Account Responsibility**
   - You are responsible for safeguarding your login credentials.
   - You must immediately report unauthorized access or suspicious account activity.

3. **Acceptable Use**
   - You must use the app only for lawful and institutional purposes.
   - You must not misuse the messaging system for harassment, abuse, or spam.
   - You must not attempt to disrupt, reverse engineer, or compromise system security.

4. **Data Accuracy**
   - Dormitory and user information is maintained by authorized staff and users.
   - You agree not to intentionally provide false or misleading information.

5. **Service Availability**
   - The app may be updated, suspended, or modified for maintenance, security, or operational reasons.
   - We do not guarantee uninterrupted availability at all times.

6. **Limitation of Liability**
   - To the extent permitted by law, the maintainers are not liable for indirect, incidental, or consequential damages resulting from app use.

7. **Termination of Access**
   - Access may be revoked for violations of these terms, policy breaches, or institutional instructions.

8. **Changes to Terms**
   - These terms may be updated periodically. Continued use after updates means you accept the revised terms.

## Privacy Notice

Nirikshan values user privacy and applies role-based controls to limit access to sensitive information.

### Information We Collect

- Account details: name, email, phone number, role, authentication data
- Profile details: student/parent/warden-related profile metadata
- Operational data: requests, messages, room assignments, activity logs
- Technical data: basic logs for security, diagnostics, and performance monitoring

### How We Use Information

- To authenticate users and enforce role-based permissions
- To provide messaging, request handling, and dorm management features
- To maintain platform security, reliability, and auditability
- To support administrative and emergency response processes

### Data Sharing

- Data is shared only with authorized roles and institutional stakeholders based on access permissions.
- Data may be disclosed when legally required or to protect safety and system integrity.

### Data Retention

- Data is retained as needed for operational, legal, security, and institutional requirements.
- Retention periods may vary by data type and institutional policy.

### Data Security

- Authentication tokens and password hashing are used to protect accounts.
- Security controls such as validation, rate limiting, CORS, and secure headers are implemented.

### Your Rights

- You may request updates or corrections to your profile information through authorized administrators.
- You may contact the institution or system administrator regarding privacy concerns.

### Privacy Notice Updates

- This notice may be updated over time. Material changes should be communicated through official channels.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
