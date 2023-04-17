import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <div className="around">
      <AuthProvider>
        <Home />
      </AuthProvider>
    </div>
  );
}

export default App;
