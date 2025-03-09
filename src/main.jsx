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
import Shedule from './components/Shedule/shedule.jsx';
import Cards from './components/Cards/card.jsx';
import Bcards from './components/Cards/bcard.jsx'
// import Admin from './components/Admin/admin.jsx'


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
      {
        path:"/shedule",
        element:<Shedule />
      },
      {
        path:"/car",
        element:<Cards />
      },
      {
        path:"/bike",
        element:<Bcards />
      },
      // {
      //   path:"/admin",
      //   element:<Admin />
      // },
    ],
  },
],)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
export default router
