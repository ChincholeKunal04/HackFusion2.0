import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Application from './stu-components/application-approval.jsx';
import Campus from './stu-components/campus-booking.jsx';
import Election from './stu-components/election.jsx';
import Complaints from './stu-components/complaints.jsx';
import HomePage from './stu-components/Home.jsx';
import RegisterStudent from './stu-components/register.jsx';
// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
<Route path="" element={<HomePage />} />
      <Route path="application" element={<Application />} />
      <Route path="register" element={<RegisterStudent />} />
      <Route path="campus" element={<Campus />} />
      <Route path="election" element={<Election />} />
      <Route path="complaints" element={<Complaints />} />
    </Route>
  )
);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
