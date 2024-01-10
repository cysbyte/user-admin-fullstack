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
  | { type: 'LOGOUT' };

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
  
  export default AuthReducer;