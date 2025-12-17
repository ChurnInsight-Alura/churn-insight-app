
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './layout/home/home'
import Header from './components/header/header'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Header/>}>
      <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

export default App
