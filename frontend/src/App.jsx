
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard' 

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

      </Routes>
    </BrowserRouter>
  )
}

export default App
