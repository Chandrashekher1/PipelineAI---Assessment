import './App.css'
import Navbar from './components/Navbar'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
