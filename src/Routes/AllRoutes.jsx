import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import CreateIPO from '../Pages/CreateIPO'
import PrivateRoute from './PrivateRoute'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path='/create-ipo' element={<PrivateRoute><CreateIPO/></PrivateRoute>} />
        </Routes>
    </div>
  )
}
