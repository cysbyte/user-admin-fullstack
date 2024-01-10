import { createBrowserRouter, RouterProvider, Outlet, Navigate, Link } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import './styles/global.scss';
import User from "./pages/user/User";
import Register from "./pages/register/Register";
import { useAuthState } from './context/AuthContext';

function App() {
   const { currentUser } = useAuthState();

  const ProtectedLayout = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Link to="/" >App</Link>
      </div>

    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedLayout><Layout /></ProtectedLayout>,
      children: [
        {
          path: '/',
          element:<Home/>
        },
        {
          path: '/users',
          element:<Users/>
        },
        {
          path: '/users/:id',
          element:<User />
        },
      ]
    },
    {
      path: 'login',
      element: <Login/>
    },
    {
      path: 'register',
      element: <Register/>
    },
    {
      path: '*',
      element: <Login/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
