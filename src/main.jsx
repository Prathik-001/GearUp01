import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './components/Home/home.jsx';
import Body from './components/Body/body.jsx';
import Navbar from './components/Navbar/nav.jsx';
import Login from './components/Login/login.jsx';


const router= createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children: [
      {
        path:"/",
        element:<Home />,
      },
      {
        path:"/body",
        element:<Body />
      },
      {
        path:"/navbar",
        element:<Navbar />
      },
      {
        path:"/login",
        element:<Login />
      },
    ],
  },
],)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
export default router
