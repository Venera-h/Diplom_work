import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Dashboard from './pages/Dashboard'
import Packages from './pages/Packages'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import News from './pages/News'
import Auth from './pages/Auth'
import Apply from './pages/Apply'
import torch from './assets/torch.jpg'
import ChinaMap from './pages/ChinaMap'
import Quiz from './pages/Quiz'
import Roadmap from './pages/Roadmap'


function App() {
  const [showModal, setShowModal] = useState(true)

  return (
    <BrowserRouter>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
      <div style={{
        width: '100%',
        maxHeight: '180px',
        overflow: 'hidden',
        background: '#f5ede0'
      }}>
        <img
          src={torch}
          alt="Фонарики"
          style={{ width: '100%', objectFit: 'cover', objectPosition: 'top', maxHeight: '180px', opacity: 0.9 }}
        />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/map" element={<ChinaMap />} />
        <Route path="/quiz" element={<Quiz />} />
        <Link to="/roadmap" style={linkStyle}>🗺️ Roadmap</Link>
      </Routes>
    </BrowserRouter>
  )
}

export default App
