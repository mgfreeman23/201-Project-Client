import React from 'react';
import "../styles/HobbyStyle.css"

// list of hobby options
const HobbiesMultiSelect = ({ selectedHobbies, onChange }) => {
  const availableHobbies = ['Art', 'Baseball', 'Baking', 'Basketball', 'Cooking',
    'Crochet', 'Dancing', 'Hiking', 'Ice Skating', 'Martial Arts', 'Running', 'Soccer',
    'Video Games', 'Singing', 'Photography', 'Programming', 'Writing', 'Languages', 
    'Reading', 'Movies', 'Scrapbooking', 'Puzzles', 'Shopping', 'Swimming'
  ];

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      onChange(selectedHobbies.filter((h) => h !== hobby));
    } else {
      onChange([...selectedHobbies, hobby]);
    }
  };

  // html element to render
  return (
    <div>
      <label>Select Hobbies:</label>
      <div className="hobbies-container">
        {availableHobbies.map((hobby) => (
          <div key={hobby}>
            <input
              type="checkbox"
              checked={selectedHobbies.includes(hobby)}
              onChange={() => toggleHobby(hobby)}
            />
            <label className="hobby-label">{hobby}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesMultiSelect;
