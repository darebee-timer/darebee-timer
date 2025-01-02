import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import App from './App.tsx'
import EditWorkoutPage from './edit-workout-page.tsx'
import TimerPage from './timer-page.tsx'
import OverviewPage from './overview-page.tsx'
import './scss/styles.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <OverviewPage />,
      },
      {
        path: "create",
        element: <EditWorkoutPage />,
      },
      {
        path: "create/timer",
        element: <TimerPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
