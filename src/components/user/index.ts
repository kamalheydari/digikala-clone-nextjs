export { default as Signup } from './Signup'
export { default as Logout } from './Logout'
export { default as RequireUser } from './RequireUser'
export { default as UserDropdown } from './UserDropdown'

// Authentication Components: These components are related to user authentication processes like logging in and out, as well as protecting routes that require a user to be authenticated.

// Logout.tsx -> Authentication/LogoutButton.tsx

// Functionality: This component handles the user logout process.
// Comment: // Previous name: Logout.tsx
// RequireUser.tsx -> Authentication/ProtectedRouteWrapper.tsx

// Functionality: This component wraps around protected routes to ensure that only authenticated users with the correct roles can access them.
// Comment: // Previous name: RequireUser.tsx
// User Components: These components are related to user interface elements that display user information or provide user-related actions.

// Signup.tsx -> User/UserAuthLinks.tsx

// Functionality: This component displays links for login and registration if the user is not logged in, or user profile and dropdown if the user is logged in.
// Comment: // Previous name: Signup.tsx
// UserDropdown.tsx -> User/UserMenuDropdown.tsx

// Functionality: This component provides a dropdown menu for user actions, including logging out.
// Comment: // Previous name: UserDropdown.tsx
