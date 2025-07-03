import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@/style/layout/app.css'
import Trial from './pages/trial'
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/trial' Component={Trial} />
        <Route path='/' Component={Home} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
