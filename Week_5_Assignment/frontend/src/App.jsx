import React from 'react'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Home/>
    </BrowserRouter>
    </>
  )
}

export default App