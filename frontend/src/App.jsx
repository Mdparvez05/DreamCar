import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CarFinder from './pages/CarFinder'
import ResultsPage from './pages/ResultsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [searchParams, setSearchParams] = useState(null)
  const [apiResponse, setApiResponse] = useState(null)
  
  // Use the deployed backend URL when available, otherwise call the same origin API path.
  // When you paste the build into backend wwwroot, /api/slider will resolve on the same host.
  const API_URL = import.meta.env.VITE_API_URL || '/api/slider'

  const handleFindCar = () => {
    setCurrentPage('finder')
  }

  const handleFinderClose = () => {
    setCurrentPage('home')
  }

  const handleFinderSubmit = (params, response) => {
    setSearchParams(params)
    if (response) {
      setApiResponse(response)
    }
    setCurrentPage('results')
  }

  const handleBackToSearch = () => {
    setCurrentPage('finder')
  }

  return (
    <>
      {currentPage === 'home' && <HomePage onFindCar={handleFindCar} />}
      {currentPage === 'finder' && <CarFinder onClose={handleFinderClose} onSubmit={handleFinderSubmit} apiUrl={API_URL} />}
      {currentPage === 'results' && searchParams && (
        <ResultsPage 
          searchParams={searchParams} 
          apiResponse={apiResponse}
          onBack={handleBackToSearch}
          apiUrl={API_URL}
        />
      )}
    </>
  )
}

export default App
