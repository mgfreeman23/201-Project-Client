import React, { useState, useEffect } from 'react';
import usersData from '../files/users1.json';
import "../styles/Explore.css";
import { useLinkClickHandler } from 'react-router-dom';

const Explore = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((previousIndex)=>{
      let nextIndex = previousIndex+1;
      if (nextIndex >= users.length){ //wrap back
        nextIndex = 0;
      }
      return nextIndex;
    });
  };
  const prevSlide = () => {
    setCurrentIndex((previousIndex) => {
      let nextIndex = previousIndex- 1;
      if (nextIndex < 0){ //wrap front
        nextIndex = users.length - 1;
      }
      return nextIndex;
    });
  };
  const like = () => {
    setLiked(!liked); //toggle
  };

  return (
    <div className="explore-container">

      <h2>Explore</h2>
      {users.length > 0 
      && (
        <div className="match">

          <h3>{users[currentIndex].username}</h3>
          <p>Email: {users[currentIndex].emailAddress}</p>
          <p>Age: {users[currentIndex].age}</p>
          <p>Major: {users[currentIndex].major}</p>
          <p>Hometown: {users[currentIndex].hometown}</p>
          <p>Hobbies: {users[currentIndex].hobbies.join(', ')}</p>
          <p>Social Media Links:</p>
          <ul>
            {users[currentIndex].socialMediaLinks.map((link) => (
              <li> <a href={link}> {link} </a> </li>
            ))}
          </ul>

          <button 
          onClick={like} 
            id="like-button"
            style={{
              backgroundColor: liked ? '#8c1515' : 'white', 
              color: liked ? 'white' : '#8c1515'
            }} //change color if liked or not
          >	&#10084;
          </button>
          

        </div>
      )
      }
      <div id = "buttons">
      <button onClick={prevSlide} id="prev">&#x21e6;</button>
      <button onClick={nextSlide} id="next">&#x21e8;</button>
      </div>

    </div>
  );
};

export default Explore;
