import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './components/Home/home.jsx';
import Body from './components/Body/body.jsx';
import Navbar from './components/Navbar/nav.jsx';


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
        path:"/",
        element:<Navbar />
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
