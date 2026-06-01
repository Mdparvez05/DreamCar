import { useState } from 'react';
import { Car, Users, Fuel, Gauge } from 'lucide-react';

const STEPS = [
  {
    id: 'category',
    title: 'What best describes your need?',
    description: 'Pick any that appeal.',
    type: 'options',
    options: [
      { id: 1, label: 'Best for first car', icon: '🎓', sublabel: '' },
      { id: 2, label: 'Best for family', icon: '👨‍👩‍👧‍👦', sublabel: '' },
      { id: 3, label: 'Travel car', icon: '✈️', sublabel: '' },
      { id: 4, label: 'Sporty car', icon: '🏁', sublabel: '' },
    ],
  },
  {
    id: 'budget',
    title: "What's your budget?",
    description: "The most you'd want to spend. We'll allow a little stretch and flag anything over.",
    type: 'slider',
    min: 15000,
    max: 60000,
    step: 1000,
  },
  {
    id: 'seats',
    title: 'How many seats do you need?',
    description: "We'll only show cars that comfortably seat your crew.",
    type: 'options',
    options: [
      { id: 2, label: 'Just me', icon: '👤', sublabel: '2 seats is plenty' },
      { id: 4, label: 'Small household', icon: '👨‍👩‍👧', sublabel: 'Up to 4 seats' },
      { id: 5, label: 'Medium household', icon: '👨‍👩‍👧‍👦', sublabel: 'Up to 5 seats' },
      { id: 7, label: 'Big family', icon: '👨‍👩‍👧‍👦', sublabel: '7+ seats' },
    ],
  },
  {
    id: 'bodyType',
    title: 'Any body styles in mind?',
    description: 'Optional — leave blank to keep an open mind. Pick any that appeal.',
    type: 'options',
    multiSelect: true,
    options: [
      { id: 'suv', label: 'SUV', icon: '🚙', sublabel: '' },
      { id: 'sedan', label: 'Sedan', icon: '🚗', sublabel: '' },
      { id: 'hatchback', label: 'Hatchback', icon: '🚗', sublabel: '' },
      { id: 'truck', label: 'Truck', icon: '🚚', sublabel: '' },
      { id: 'minivan', label: 'Minivan', icon: '🚐', sublabel: '' },
      { id: 'coupe', label: 'Coupe', icon: '🏎️', sublabel: '' },
    ],
  },
  {
    id: 'fuel',
    title: 'Any fuel preference?',
    description: "Optional — leave blank if you're open to anything.",
    type: 'options',
    options: [
      { id: 'petrol', label: 'Petrol', icon: '⛽', sublabel: 'Simple & familiar' },
      { id: 'hybrid', label: 'Hybrid', icon: '🔌⛽', sublabel: 'Great efficiency' },
      { id: 'electric', label: 'Electric', icon: '⚡', sublabel: 'Zero tailpipe' },
      { id: 'diesel', label: 'Diesel', icon: '⛽', sublabel: 'Long-haul torque' },
    ],
  },
];

export default function CarFinder({ onClose, onSubmit, apiUrl }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    categoryId: null,
    price: 40000,
    seatingCapacity: null,
    bodyType: [],
    fuelType: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleOptionSelect = (optionId, isMultiSelect = false) => {
    if (step.id === 'category') {
      setFormData({ ...formData, categoryId: optionId });
    } else if (step.id === 'seats') {
      setFormData({ ...formData, seatingCapacity: optionId });
    } else if (step.id === 'bodyType') {
      const selected = formData.bodyType.includes(optionId)
        ? formData.bodyType.filter(id => id !== optionId)
        : [...formData.bodyType, optionId];
      setFormData({ ...formData, bodyType: selected });
    } else if (step.id === 'fuel') {
      setFormData({ ...formData, fuelType: optionId });
    }
  };

  const handlePriceChange = (e) => {
    setFormData({ ...formData, price: parseInt(e.target.value) });
  };

  const handleNext = () => {
    // Validate current step
    if (step.id === 'category' && formData.categoryId === null) {
      setErrors({ category: 'Please select an option' });
      return;
    }

    setErrors({});
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else {
      onClose();
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      categoryId: formData.categoryId || 0,
      price: formData.price,
      seatingCapacity: formData.seatingCapacity || 0,
      bodyType: formData.bodyType.length > 0 ? formData.bodyType.join(',') : '',
      fuelType: formData.fuelType || '',
    };

    try {
      setLoading(true);
      console.log('Sending request to:', apiUrl);
      console.log('Request data:', requestData);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      let data = null;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }
      
      console.log('API Response:', data);
      onSubmit(requestData, data);
    } catch (err) {
      console.error('Error submitting form:', err);
      console.error('API URL:', apiUrl);
      
      // Check if backend is running
      if (err.name === 'AbortError') {
        alert('Request timeout. The backend server may not be responding. Proceeding with demo data.');
      } else if (err.message.includes('Failed to fetch')) {
        alert('Cannot connect to backend at ' + apiUrl + '. Make sure the backend server is running. Proceeding with demo data.');
      }
      
      // Still proceed even if API fails - will use mock data
      onSubmit(requestData);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (step.id === 'category') return formData.categoryId !== null;
    if (step.id === 'seats') return formData.seatingCapacity !== null;
    return true;
  };

  const getSelectedOption = (optionId) => {
    if (step.id === 'category') return formData.categoryId === optionId;
    if (step.id === 'seats') return formData.seatingCapacity === optionId;
    if (step.id === 'bodyType') return formData.bodyType.includes(optionId);
    if (step.id === 'fuel') return formData.fuelType === optionId;
    return false;
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'linear-gradient(135deg, #f5f5f5 0%, #fff 100%)' }}>
      <div className="car-finder-container">
        <div className="finder-header">
          <div className="finder-info">
            <div className="step-indicator">Step {currentStep + 1} of {STEPS.length}</div>
            <h2>{step.title}</h2>
            <p className="finder-description">{step.description}</p>
          </div>
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="step-content">
          {step.type === 'options' && (
            <div className="options-grid">
              {step.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-button ${getSelectedOption(option.id) ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option.id, step.multiSelect)}
                >
                  <div className="option-icon">{option.icon}</div>
                  <div className="option-label">{option.label}</div>
                  {option.sublabel && <div className="option-sublabel">{option.sublabel}</div>}
                </button>
              ))}
            </div>
          )}

          {step.type === 'slider' && (
            <div className="slider-container">
              <div className="slider-value">${formData.price.toLocaleString()}</div>
              <div className="slider-range">
                <span>${step.min.toLocaleString()}</span>
                <span>${step.max.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={step.min}
                max={step.max}
                step={step.step}
                value={formData.price}
                onChange={handlePriceChange}
                className="slider"
              />
            </div>
          )}

          {errors[step.id] && (
            <div style={{ color: '#c33', fontSize: '14px', marginTop: '16px' }}>
              {errors[step.id]}
            </div>
          )}
        </div>

        <div className="finder-footer">
          <button className="btn-back" onClick={handleBack}>
            ← Back
          </button>
          <div className="footer-buttons">
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              style={{ opacity: (!isStepValid() || loading) ? 0.5 : 1, cursor: (!isStepValid() || loading) ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Loading...' : currentStep === STEPS.length - 1 ? 'Find my car' : 'Continue'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
  