
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard' 
import Packages from './pages/Packages'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import News from './pages/News'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetail />} />
        <Route path="/news" element={<News />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
