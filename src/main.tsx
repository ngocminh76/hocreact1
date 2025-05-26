import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
    path: "/book",
    element: <div>Book page</div>,
  },
  {
    path: "/about",
    element: <div>about page</div>,
  },
    
    ]
  },
  {
    path: "/login",
    element: <div>login page</div>,
  },
  {
    path: "/register",
    element: <div>register page</div>,
  },
   
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Layout /> */}
        <RouterProvider router={router} />

  </StrictMode>,
)
