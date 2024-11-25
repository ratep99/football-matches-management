import React from 'react'
import { Route,
   createBrowserRouter,
    createRoutesFromElements,
     RouterProvider } from 'react-router-dom'

import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import MainLayout from './layouts/MainLayout';
import { PageNotFound } from './pages/PageNotFound';
import AddEventPage from './pages/AddEventPage';
import EventsPage from './pages/EventsPage';
import EditEventPage from './pages/EditEventPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage />} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/add-event" element={<AddEventPage/>} />
        <Route path="/edit-event/:id" element={<EditEventPage/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />
}

export default App;