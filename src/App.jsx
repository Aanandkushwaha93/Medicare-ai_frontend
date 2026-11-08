import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddPatient from './pages/AddPatient'
import PageNotFound from './pages/PageNotFound '
import AddDoctor from './pages/AddDoctors'
import Appointment from './pages/Appointment'
import Prescription from './pages/Prescriptions'
import AddPrescription from './pages/AddPrescription'
function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/addDoctor" element={<AddDoctor/>} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/prescription" element={<Prescription/>} />
        <Route path="/addprescription" element={<AddPrescription/>} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
