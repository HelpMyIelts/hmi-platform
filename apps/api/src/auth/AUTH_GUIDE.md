# Authentication System Guide

This guide explains the role-based access control (RBAC) authentication system for HelpMyIELTS.

## Overview

The authentication system uses JWT (JSON Web Tokens) for stateless authentication with support for role-based access control (RBAC). Four user roles are supported:

- **SUPER_ADMIN**: Full system access
- **INSTITUTION_ADMIN**: Administrative access within their institution
- **TEACHER**: Can create tests, grade assignments, manage classes
- **STUDENT**: Can take tests, view progress, access learning materials

## API Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"  // Optional, defaults to STUDENT
}

Response:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STUDENT"
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: (same as register)
```

### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGc..."
}

Response:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc..."
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {access_token}

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT"
}
```

## Frontend Integration

### 1. Store Tokens
After login/register, store tokens in secure storage:

```typescript
// Store in localStorage (or better: httpOnly cookie)
localStorage.setItem('access_token', response.access_token);
localStorage.setItem('refresh_token', response.refresh_token);
localStorage.setItem('user', JSON.stringify(response.user));
```

### 2. Attach Token to Requests
Include the access token in Authorization header for protected endpoints:

```typescript
const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};
```

### 3. Handle Token Refresh
When access token expires (401 response), use refresh token to get new one:

```typescript
// Call POST /auth/refresh with refresh_token
// Update stored tokens
// Retry original request
```

### 4. Role-Based Navigation
Use the user's role to show/hide UI elements:

```typescript
const { user } = await fetchUser();

if (user.role === 'SUPER_ADMIN' || user.role === 'INSTITUTION_ADMIN') {
  // Show admin panel
}

if (user.role === 'TEACHER') {
  // Show test creation UI
}

if (user.role === 'STUDENT') {
  // Show student dashboard
}
```

## Shared Types for Frontend

Import types from `@repo/types`:

```typescript
import {
  UserRole,           // Enum: SUPER_ADMIN, INSTITUTION_ADMIN, TEACHER, STUDENT
  UserPayload,        // JWT payload structure
  AuthResponse,       // Login/Register response
  AuthenticatedUser,  // User without sensitive fields
  LoginRequest,       // Login DTO
  RegisterRequest,    // Register DTO
  AUTH_ERRORS,        // Error message constants
} from '@repo/types';
```

## Backend Usage (in API)

### 1. Protect Routes with JWT
```typescript
@Get('profile')
@UseGuards(JwtGuard)
async getProfile(@CurrentUser() user: UserPayload) {
  return { user };
}
```

### 2. Restrict by Role
```typescript
@Delete('users/:id')
@UseGuards(JwtGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
async deleteUser(@Param('id') id: string) {
  return { message: 'User deleted' };
}
```

### 3. Get Current User Info
```typescript
@Get('my-tests')
@UseGuards(JwtGuard)
async getMyTests(@CurrentUser() user: UserPayload) {
  // user.sub contains the user ID
  // user.role contains the user's role
  // user.email, user.firstName, user.lastName are available
  return this.testService.findByCreator(user.sub);
}
```

## Environment Variables

Configure these in `.env`:

```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
BCRYPT_SALT_ROUNDS=10
```

## Password Requirements

- Minimum 8 characters
- Maximum 50 characters
- No format restrictions (allow special characters)

## Role Definitions

### STUDENT
- View their own progress
- Take assigned tests
- View learning materials
- Cannot access admin features

### TEACHER
- Create tests and questions
- Assign tests to students
- View student progress
- Grade manual answers
- Cannot delete users

### INSTITUTION_ADMIN
- Manage institution staff and students
- Create/manage institution tests
- View all institution analytics
- Cannot manage system-level settings

### SUPER_ADMIN
- Full system access
- Manage all institutions
- Create system-level content
- Manage platform settings

## Security Best Practices

1. **Token Storage**: Use httpOnly cookies if possible (not localStorage)
2. **Token Transmission**: Always use HTTPS in production
3. **Refresh Token Rotation**: Refresh tokens should be rotated on each use
4. **Token Expiry**: Keep access tokens short-lived (15m recommended)
5. **CORS**: Properly configure CORS to prevent unauthorized access
6. **Password Hashing**: Passwords are hashed with bcryptjs (10 salt rounds)
7. **Input Validation**: All inputs validated with class-validator

## Error Handling

Common error responses:

```json
// Invalid credentials
{
  "statusCode": 401,
  "message": "Invalid credentials"
}

// User exists
{
  "statusCode": 409,
  "message": "User with this email already exists"
}

// Insufficient permissions
{
  "statusCode": 403,
  "message": "Insufficient permissions. Required roles: SUPER_ADMIN"
}

// Token expired
{
  "statusCode": 401,
  "message": "Invalid refresh token"
}
```
