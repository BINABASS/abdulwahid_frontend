import React from 'react';
import './Properties.css';

const Properties = () => {
  // Sample property data (in a real app, this would come from an API)
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa in City Center',
      type: 'Villa',
      status: 'Available',
      price: 750000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      location: 'Downtown',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    },
    {
      id: 2,
      title: 'Modern Apartment with View',
      type: 'Apartment',
      status: 'Booked',
      price: 350000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      location: 'Suburbs',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    },
    {
      id: 3,
      title: 'Cozy Family Home',
      type: 'House',
      status: 'Available',
      price: 550000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      location: 'Residential',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    },
    // Add more sample properties as needed
  ];

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>Properties</h1>
        <div className="header-actions">
          <button className="add-property-btn">
            <i className="fas fa-plus"></i> Add Property
          </button>
        </div>
      </div>

      <div className="properties-filters">
        <div className="filter-group">
          <label htmlFor="type">Type:</label>
          <select id="type">
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="status">Status:</label>
          <select id="status">
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="price">Price Range:</label>
          <input type="range" id="price" min="0" max="1000000" />
        </div>
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-image">
              <img src={property.image} alt={property.title} />
              <div className="status-badge {property.status.toLowerCase()}">
                {property.status}
              </div>
            </div>
            <div className="property-info">
              <h3>{property.title}</h3>
              <div className="property-details">
                <div className="detail-item">
                  <i className="fas fa-home"></i>
                  <span>{property.type}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-bed"></i>
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-bath"></i>
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-ruler-combined"></i>
                  <span>{property.area} sqft</span>
                </div>
              </div>
              <div className="property-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>{property.location}</span>
              </div>
              <div className="property-price">
                <span className="price-label">Price:</span>
                <span className="price-value">${property.price.toLocaleString()}</span>
              </div>
              <div className="property-actions">
                <button className="view-details-btn">
                  <i className="fas fa-eye"></i> View Details
                </button>
                <button className="edit-btn">
                  <i className="fas fa-edit"></i> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
