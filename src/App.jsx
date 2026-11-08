import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Units from './pages/Units'
import Zones from './pages/Zones'
import Developers from './pages/Developers'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/units" element={<Units />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}