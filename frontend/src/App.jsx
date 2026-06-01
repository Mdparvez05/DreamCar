import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import CarFinder from './pages/CarFinder'
import ResultsPage from './pages/ResultsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [searchParams, setSearchParams] = useState(null)
  const [apiResponse, setApiResponse] = useState(null)
  
  // Update this with your actual backend API URL
  const API_URL = 'https://localhost:7055/api/slider'

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
