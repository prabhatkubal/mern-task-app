// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import AuthProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

export default function App(){
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/task/new" element={<ProtectedRoute><TaskForm/></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><TaskForm/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
