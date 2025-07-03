import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = ({ property, onClose }) => {
  const amenities = property.amenities || [];
  const features = [
    { 
      icon: 'fas fa-home', 
      label: 'Type', 
      value: property.type 
    },
    { 
      icon: 'fas fa-tag', 
      label: 'Status', 
      value: property.status 
    },
    { 
      icon: 'fas fa-dollar-sign', 
      label: 'Price', 
      value: `$${property.price.toLocaleString()}` 
    },
    { 
      icon: 'fas fa-bed', 
      label: 'Bedrooms', 
      value: property.bedrooms 
    },
    { 
      icon: 'fas fa-bath', 
      label: 'Bathrooms', 
      value: property.bathrooms 
    },
    { 
      icon: 'fas fa-ruler-combined', 
      label: 'Area', 
      value: `${property.area} sqft` 
    },
    { 
      icon: 'fas fa-map-marker-alt', 
      label: 'Location', 
      value: property.location 
    },
  ];

  const amenityIcons = {
    pool: 'fas fa-swimming-pool',
    garden: 'fas fa-tree',
    parking: 'fas fa-car',
    gym: 'fas fa-dumbbell',
    security: 'fas fa-shield-alt',
    wifi: 'fas fa-wifi',
  };

  return (
    <div className="property-details-modal">
      <div className="property-details">
        <div className="hero-section">
          <div className="hero-image">
            <img src={property.image} alt={property.title} />
            <div className="status-badge {property.status.toLowerCase()}">
              {property.status}
            </div>
          </div>
          <div className="hero-content">
            <div className="hero-header">
              <h1>{property.title}</h1>
              <div className="price-tag">
                <i className="fas fa-dollar-sign"></i>
                <span>${property.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="hero-features">
              {features.slice(0, 3).map((feature) => (
                <div key={feature.label} className="feature-badge">
                  <i className={feature.icon}></i>
                  <span>{feature.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="details-content">
          <div className="close-section">
            <button className="close-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="property-info-section">
            <div className="description-section">
              <h2>About This Property</h2>
              <p>{property.description}</p>
            </div>

            <div className="features-section">
              <h2>Property Features</h2>
              <div className="features-grid">
                {features.map((feature) => (
                  <div key={feature.label} className="feature-item">
                    <i className={feature.icon}></i>
                    <span className="feature-label">{feature.label}:</span>
                    <span className="feature-value">{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="amenities-section">
              <h2>Property Amenities</h2>
              <div className="amenities-grid">
                {amenities.map((amenity) => (
                  <div key={amenity} className="amenity-item">
                    <i className={amenityIcons[amenity]}></i>
                    <span>{amenity.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-section">
              <button className="primary-btn" onClick={onClose}>
                <i className="fas fa-arrow-left"></i>
                Back to Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
