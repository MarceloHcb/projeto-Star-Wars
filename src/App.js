import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
