import { useState, useEffect } from 'react';

export default function ResultsPage({ searchParams, apiResponse, onBack, apiUrl }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (apiResponse) {
      // Use API response if provided
      const transformedCars = Array.isArray(apiResponse) ? apiResponse : [apiResponse];
      setCars(transformedCars);
    } else {
      // Fallback to mock data
      setCars(generateMockCars());
    }
  }, [apiResponse]);

  const generateMockCars = () => {
    return [
      {
        id: 1,
        brandName: 'Toyota',
        variantName: 'Corolla',
        price: 24500,
        mileage: 50,
        topSpeed: 138,
        fuelType: 'Hybrid',
        bodyType: 'Sedan',
        rating: 4.5,
        reviews: 128,
        badge: 'Best match',
      },
      {
        id: 2,
        brandName: 'Honda',
        variantName: 'Civic',
        price: 27800,
        mileage: 36,
        topSpeed: 180,
        fuelType: 'Sport',
        bodyType: 'Sedan',
        rating: 4.7,
        reviews: 95,
        badge: '#2 pick',
      },
      {
        id: 3,
        brandName: 'Toyota',
        variantName: 'Sienna',
        price: 43500,
        mileage: 36,
        topSpeed: 245,
        fuelType: 'Hybrid',
        bodyType: 'Minivan',
        rating: 4.8,
        reviews: 62,
        badge: '#3 pick',
      },
      {
        id: 4,
        brandName: 'Mazda',
        variantName: 'CX-5',
        price: 32000,
        mileage: 28,
        topSpeed: 180,
        fuelType: 'Petrol',
        bodyType: 'SUV',
        rating: 4.6,
        reviews: 150,
      },
    ];
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to search
        </button>
        <h1>Your matches</h1>
      </div>

      <div className="results-container">
        {cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>No cars found matching your criteria</h2>
            <p>Try adjusting your preferences</p>
            <button className="btn-primary" onClick={onBack} style={{ marginTop: '24px' }}>
              Adjust search
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {cars.map((car, index) => (
              <div key={car.id || index} className="car-card">
                <div className="car-image">
                  {car.badge && <div className="car-badge">{car.badge}</div>}
                  <button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(car.id)}
                    style={{
                      color: favorites.includes(car.id) ? '#E67E3D' : '#ddd',
                    }}
                  >
                    ♥
                  </button>
                  🚗
                </div>

                <div className="car-content">
                  <div className="car-type">{car.bodyType || 'Vehicle'}</div>
                  <h3 className="car-title">
                    {car.brandName} {car.variantName}
                  </h3>
                  <div className="car-subtitle">
                    {car.fuelType} · {new Date().getFullYear()}
                  </div>

                  <div className="car-price">
                    ${car.price?.toLocaleString('en-US', { maximumFractionDigits: 0 }) || 'N/A'}
                  </div>

                  <div className="car-features">
                    <div className="car-feature">Top tier safety</div>
                    <div className="car-feature">Strong value for money</div>
                    <div className="car-feature">
                      Loved by owners ({car.averageRating || car.rating || 4.5}★)
                    </div>
                  </div>

                  <div className="car-specs">
                    <div className="spec">
                      <div className="spec-value">{car.mileage || 'N/A'}</div>
                      <div className="spec-label">MPG</div>
                    </div>
                    <div className="spec">
                      <div className="spec-value">5</div>
                      <div className="spec-label">Seats</div>
                    </div>
                    <div className="spec">
                      <div className="spec-value">5★</div>
                      <div className="spec-label">Safety</div>
                    </div>
                    <div className="spec">
                      <div className="spec-value">{car.topSpeed || 'N/A'}</div>
                      <div className="spec-label">HP</div>
                    </div>
                  </div>

                  <div className="car-actions">
                    <button className="car-btn car-btn-secondary">Details</button>
                    <button className="car-btn car-btn-primary">Shortlist</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
   