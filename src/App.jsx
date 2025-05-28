import './css/App.css'
import Home from './pages/Home.jsx'
import Favorite from './pages/Favorites.jsx'
import Navbar from './components/NavBar.jsx'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext.jsx'

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App