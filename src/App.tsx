import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, Post } from '@pages'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/post/:id" element={<Post />} /> {/* rota dinâmica */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
