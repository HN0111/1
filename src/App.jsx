import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CreatorDetail from './components/CreatorDetail';
import About from './components/About';
import TubeText3D from './components/TubeText3D';

import Scene from './components/Scene';

import ScrollToTop from './components/ScrollToTop';

const Home = () => (
  <>
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Scene />
    </div>
    <div className="relative z-10 pointer-events-none">
      <TubeText3D />
      <div className="w-full">
        <About />
      </div>
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F4F5F0]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator/:id" element={<CreatorDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
