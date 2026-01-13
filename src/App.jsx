
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './layout/home/home'
import Header from './components/header/Header'
import VerticalHeader from './components/verticalHeader/VerticalHeader'
import Dashboard from '@/layout/dashboard/Dashboard'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
      <Route path="/" element={<Header/>}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
