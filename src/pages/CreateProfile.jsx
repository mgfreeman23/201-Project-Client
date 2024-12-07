import React, { useState, useEffect } from 'react';
import HobbiesMultiSelect from '../components/HobbiesMultiSelect';
import { saveProfile } from '../services/apiClient';
import "../styles/ProfileForm.css";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    age: '',
    major: '',
    hometown: '',
    hobbies: [],
    instagram: ''
  });

  // grab the user id and add it to the form data once the page renders
  useEffect(() => {
    const user_id = localStorage.getItem('uid');
    if(user_id){
      setFormData((prev) => ({...prev, userId: user_id}))
    }
  }, []);

 // called when normal input field is changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // called when hobbies input field is changed
  const handleHobbiesChange = (selectedHobbies) => {
    setFormData((prev) => ({ ...prev, hobbies: selectedHobbies }));
  };
  
  // called when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call to backend 
      const response = await saveProfile(formData); 
      console.log("Profile saved successfully: ", response);
      // show this message below in a paragraph
    } catch (error) {
      console.error('Error saving profile:', error.response.data);
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
          name="instagram"
          value={formData.instagram}
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
