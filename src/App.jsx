import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddPatient from './pages/AddPatient'
import PageNotFound from './pages/PageNotFound '
function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/addPatient" element={<AddPatient />} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
