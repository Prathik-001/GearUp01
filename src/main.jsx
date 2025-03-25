import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import './index.css';
import App from './App.jsx';
import Home from './components/Home/home.jsx';
import Body from './components/Body/body.jsx';
import Navbar from './components/Navbar/nav.jsx';
import Login from './components/Login/login.jsx';
import Shedule from './components/Shedule/shedule.jsx';
import Cards from './components/Cards/card.jsx';
import Bcards from './components/Cards/bcard.jsx';
import More from './components/Cards/more.jsx';
import Not_found from './components/Not_found/notfound.jsx';
import Singup from './components/Singnup/singnup.jsx'
import Admin from './components/Admin/admin.jsx'
import Add from './components/Admin/add.jsx';
import Userdash from './components/Userdash/userdash.jsx';
import About from './components/About/about.jsx';


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
      {
        path:"/more",
        element:<More />
      },
      {
        path:"*",
        element:<Not_found />
      },
      {
        path:"/singup",
        element:<Singup />
      },
      {
        path:"/admin",
        element:<Admin />
      },
      {
        path:"/add",
        element:<Add />
      },
      {
        path:"/userdash",
        element:<Userdash />
      },
      {
        path:"/about",
        element:<About />
      },
    ],
  },
],)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
export default router
