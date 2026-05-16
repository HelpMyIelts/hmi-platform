export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid or expired token',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions for this action',
  INVALID_PASSWORD: 'Password is invalid',
  WEAK_PASSWORD: 'Password does not meet security requirements',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  ACCOUNT_DISABLED: 'Account is disabled',
} as const;

export type AuthError = typeof AUTH_ERRORS[keyof typeof AUTH_ERRORS];
