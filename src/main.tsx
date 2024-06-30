import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import App from './App.tsx'
import Workout from './Workout.tsx'
import Timer from './Timer.tsx'
import Overview from './Overview.tsx'
import './scss/styles.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "create",
        element: <Workout />,
      },
      {
        path: "create/timer",
        element: <Timer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
