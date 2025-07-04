import React, { useState, useCallback, useMemo } from 'react';
import PropertyForm from '../properties/PropertyForm';
import PropertyDetails from '../properties/PropertyDetails';
import './Booking.css';

const Booking = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(() => {
    const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    return savedProperties.filter(property => property.status === 'Booked');
  });

  // State for filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter function
  const filterProperties = useCallback(() => {
    return properties.filter(property => {
      const matchesType = typeFilter === 'all' || property.type.toLowerCase() === typeFilter.toLowerCase();
      const matchesSearch = 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  }, [properties, typeFilter, searchQuery]);

  // Memoized filtered properties
  const filteredProperties = useMemo(() => filterProperties(), [filterProperties]);

  // Handlers
  const handlePropertyAction = (formData, action) => {
    const newProperties = [...properties];
    switch (action) {
      case 'edit':
        const index = newProperties.findIndex(p => p.id === formData.id);
        if (index !== -1) {
          newProperties[index] = formData;
        }
        break;
      case 'delete':
        newProperties.splice(newProperties.findIndex(p => p.id === formData.id), 1);
        break;
      default:
        return;
    }
    setProperties(newProperties);
    localStorage.setItem('properties', JSON.stringify(newProperties));
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="header-actions">
          <div className="header-stats">
            <div className="stat-item">
              <i className="fas fa-clock"></i>
              <div>
                <span className="stat-value">{properties.length}</span>
                <span className="stat-label">Booked Properties</span>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-filters">
          <div className="filter-group">
            <label>Type</label>
            <select className="type-filter" onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search</label>
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search properties..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="booking-grid">
        {filteredProperties.map((property) => (
          <div key={property.id} className="booking-card">
            <div className="booking-image">
              <img src={property.image} alt={property.title} />
              <div className="booking-overlay">
                <div className="overlay-content">
                  <h3>{property.title}</h3>
                  <p className="overlay-price">${property.price.toLocaleString()}</p>
                  <button className="quick-view-btn" onClick={() => handleViewDetails(property)}>
                    <i className="fas fa-search"></i> Quick View
                  </button>
                </div>
              </div>
            </div>
            <div className="booking-info">
              <div className="property-meta">
                <span className="property-type">{property.type}</span>
                <span className="property-location">{property.location}</span>
              </div>
              <div className="property-details">
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
              <div className="property-price">
                <span className="price-label">Price:</span>
                <span className="price-value">${property.price.toLocaleString()}</span>
              </div>
              <div className="booking-actions">
                <button className="action-btn view-btn" onClick={() => handleViewDetails(property)}>
                  <i className="fas fa-eye"></i> View Details
                </button>
                <button className="action-btn edit-btn" onClick={() => handlePropertyAction(property, 'edit')}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => handlePropertyAction(property, 'delete')}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={() => {
            setShowForm(false);
            setEditingProperty(null);
          }}
          onSubmit={handlePropertyAction}
        />
      )}

      {/* Property Details Modal */}
      {showDetails && selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => {
            setShowDetails(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default Booking;
