import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSearch = () => {
    alert('Search button clicked!');
    navigate('/search'); // Change this to the actual search route
  };

  return (
    <div className="container">
      <h1>Welcome to Jewellery Search</h1>
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Home;
