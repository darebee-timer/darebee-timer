import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import App from './App.tsx'
import { EditWorkoutPage, CreateWorkoutPage } from './edit-workout-page.tsx'
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
        element: <CreateWorkoutPage />,
      },
      {
        path: ":workoutId/timer",
        element: <TimerPage />,
      },
      {
        path: ":workoutId/edit",
        element: <EditWorkoutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
