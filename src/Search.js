import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [file, setFile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const jewelleryInfo = {
    "jwellery1.jpg": {
      name: "Ruby Gold Necklace",
      price: "₹45,000",
      description: "Elegant ruby-studded necklace with gold finish."
    },
    "jwellery2.jpg": {
      name: "Diamond Pendant Set",
      price: "₹38,500",
      description: "Sparkling diamond pendant with matching earrings."
    },
    "jwellery3.jpg": {
      name: "Antique Bridal Set",
      price: "₹72,300",
      description: "Traditional bridal set with antique polish."
    },
    "jwellery4.jpg": {
      name: "Emerald Drop Earrings",
      price: "₹25,200",
      description: "Stylish emerald earrings with modern design."
    },
    "jwellery5.jpg": {
      name: "Pearl Chain",
      price: "₹18,900",
      description: "Minimalist pearl chain perfect for daily wear."
    },
    "jwellery6.jpg": {
      name: "Gold Hoop Earrings",
      price: "₹22,100",
      description: "Trendy gold hoops for daily and casual wear."
    },
    "jwellery7.jpg": {
      name: "Stone Studded Bangle",
      price: "₹30,800",
      description: "Elegant bangle embedded with colorful stones."
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData);
      const matches = Array.from(new Set(response.data.matches));
      setSearchResults(matches);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2 className="title"><strong>Jewellery Visual Search</strong></h2>
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button className="upload-button" onClick={handleUpload}>Upload and Search</button>

      {searchResults.length > 0 && (
        <div className="results-section">
          <h3>Top Matches:</h3>
          <div className="results-grid">
            {searchResults.map((match, index) => {
              const info = jewelleryInfo[match] || {
                name: "Jewellery Item",
                price: "₹--,--",
                description: "Description not available."
              };

              return (
                <div key={index} className="result-card">
                  <img
                    src={`http://localhost:5001/jewellery_dataset/${match}`}
                    alt={match}
                    className="result-image"
                  />
                  <div className="result-info">
                    <div className="result-name">{info.name}</div>
                    <div className="result-desc">{info.description}</div>
                    <p className="result-price">{info.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
