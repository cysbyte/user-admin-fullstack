import React, { createContext, useContext, useReducer, Dispatch } from 'react';

// Define types
type User = {
  username: string;
  email: string;
  // Add other user-related fields as needed
};

type AuthState = {
  currentUser: User | null;
};

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGGEDINUSER'; payload: User }
  | { type: 'LOGOUT' };

type AuthDispatch = Dispatch<AuthAction>;

// Create context
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

// Define reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGGEDINUSER':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

// AuthProvider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { currentUser: null });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Custom hooks to use context
const useAuthState = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

const useAuthDispatch = (): AuthDispatch => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };