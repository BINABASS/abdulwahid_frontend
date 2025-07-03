import React, { useState } from 'react';
import './PropertyForm.css';

const PropertyForm = ({ onClose, onSubmit, property = null }) => {
  const [formData, setFormData] = useState(property || {
    title: '',
    type: '',
    status: 'available',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    location: '',
    image: null,
    previewImage: null
  });

  const [amenities, setAmenities] = useState(property?.amenities || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities(prev => checked 
      ? [...prev, value] 
      : prev.filter(amenity => amenity !== value)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        previewImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload a property image.');
      return;
    }
    onSubmit({
      ...formData,
      amenities,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area)
    });
  };

  return (
    <div className="property-form-modal">
      <div className="property-form">
        <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Property Image</label>
            <div 
              className="image-upload-container"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.previewImage ? (
                <div className="image-preview">
                  <img src={formData.previewImage} alt="Preview" />
                  <button type="button" onClick={() => setFormData(prev => ({
                    ...prev,
                    image: null,
                    previewImage: null
                  }))} className="remove-image-btn">
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Drag and drop an image or click to upload</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Property title"
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
                required
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
                required
              />
            </div>

            <div className="form-group">
              <label>Area (sqft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Property description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Property location"
              required
            />
          </div>

          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="pool"
                  checked={amenities.includes('pool')}
                  onChange={handleAmenityChange}
                />
                <label>Swimming Pool</label>
              </div>
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="garden"
                  checked={amenities.includes('garden')}
                  onChange={handleAmenityChange}
                />
                <label>Garden</label>
              </div>
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="parking"
                  checked={amenities.includes('parking')}
                  onChange={handleAmenityChange}
                />
                <label>Parking</label>
              </div>
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="gym"
                  checked={amenities.includes('gym')}
                  onChange={handleAmenityChange}
                />
                <label>Gym</label>
              </div>
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="security"
                  checked={amenities.includes('security')}
                  onChange={handleAmenityChange}
                />
                <label>24/7 Security</label>
              </div>
              <div className="amenity-item">
                <input
                  type="checkbox"
                  value="wifi"
                  checked={amenities.includes('wifi')}
                  onChange={handleAmenityChange}
                />
                <label>High-speed WiFi</label>
              </div>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {property ? 'Update Property' : 'Add Property'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
