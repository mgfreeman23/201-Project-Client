import React, { useState } from 'react';
import HobbiesMultiSelect from '../components/HobbiesMultiSelect';
import { saveProfile } from '../services/apiClient';
import "../styles/ProfileForm.css";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    major: '',
    hometown: '',
    hobbies: [],
    socialMedia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHobbiesChange = (selectedHobbies) => {
    setFormData((prev) => ({ ...prev, hobbies: selectedHobbies }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProfile(formData); // Send data to the backend
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile.');
    }
  };

  return (
    <div className="profile-form-container">
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Create Your Profile</h2>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Major: </label>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hometown: </label>
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Instagram: </label>
        <input
          type="text"
          name="socialMedia"
          value={formData.socialMedia}
          onChange={handleChange}
        />
      </div>
      <div className="hobbyContainer">
        <HobbiesMultiSelect
          selectedHobbies={formData.hobbies}
          onChange={handleHobbiesChange}
        />
      </div>
      <button type="submit" className="submit-button">Save Profile</button>
    </form>
    </div>
  );
};

export default CreateProfile;
