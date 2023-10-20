import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import Todolist from './Todolist.tsx'
import Home from './Home.tsx'
import Loading from './Loading.tsx'
import _404 from './_404.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <_404 />,
  },
  {
    path: "todolist",
    element: <Todolist />,
    errorElement: <_404 />,
  },
  {
    path: "home",
    element: <Home />,
    errorElement: <_404 />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>,
)
