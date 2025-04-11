import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5001/admin/add', formData, {
        headers: {
          role: 'admin'
        }
      });
      
      alert('Item added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add item.');
    }
  };

  return (
    <div className="add-item-form">
      <h2>Add New Jewellery Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
