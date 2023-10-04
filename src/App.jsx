import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import FileExplorer from './pages/FileExplorer';
import Aplikasi from './pages/Aplikasi';
import { JwtProvider } from './context/JwtContext';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <JwtProvider>
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/explore" element={<FileExplorer />}/>
        <Route exact path="/aplikasi" element={<Aplikasi />}/>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </JwtProvider>
  );
}

export default App;
