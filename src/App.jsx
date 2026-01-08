
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './layout/home/home'
import Header from './components/header/header'
import VerticalHeader from './components/verticalHeader/VerticalHeader'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
      <Route path="/" element={<Header/>}>
      <Route index element={<Home />} />
      </Route>
      <Route path="/dashboard" element={<VerticalHeader/>}>
      <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
