import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      <h3>Top Matches:</h3>
      <div className="results-container">
        {results.items.map((item, index) => (
          <div key={index} className="result-item">
            <img
              src={`http://localhost:5001/uploads/${item.image}`} // Assuming images are served from this URL
              alt={item.description}
            />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
