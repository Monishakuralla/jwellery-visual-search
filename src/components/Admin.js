// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5001/items');
    setItems(res.data);
  };

  const handleAdd = async () => {
    await axios.post('http://localhost:5001/items', newItem);
    fetchItems();
    setNewItem({ name: '', price: '', description: '', image: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/items/${id}`);
    fetchItems();
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div className="form">
        <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
        <input type="text" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
        <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
        <input type="text" placeholder="Image filename" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} />
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <div className="item-list">
        {items.map((item, idx) => (
          <div key={idx} className="item-card">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p><strong>Image:</strong> {item.image}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Admin;
