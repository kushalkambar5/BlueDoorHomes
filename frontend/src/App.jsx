import './App.css'

import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Properties from './pages/Properties.jsx'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/properties' element={<Properties/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App