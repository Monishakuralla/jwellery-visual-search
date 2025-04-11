// C:\Users\hanis\jewellery-search\src\components\AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [jewellery, setJewellery] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/jewellery');
      setJewellery(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load items from server.');
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/admin/add', newItem);
      alert('Item added successfully!');
      setNewItem({ name: '', description: '', price: '', image: '' });
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Failed to add item.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/delete/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item.');
    }
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setNewItem(item);
  };

  const handleUpdate = async () => {
    if (!newItem.name || !newItem.description || !newItem.price || !newItem.image) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:5001/api/admin/update/${itemToEdit.id}`, newItem);
      alert('Item updated successfully!');
      setNewItem({ name: '', description: '', price: '', image: '' });
      setItemToEdit(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Failed to update item.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Jewellery Visual Search</h2>
        <h3>Welcome Admin!</h3>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image filename"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />
        <button onClick={itemToEdit ? handleUpdate : handleAdd}>
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </button>
      </div>

      <div className="item-list">
        {jewellery.map((item, idx) => (
          <div key={idx} className="item-card">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p><strong>Image:</strong> {item.image}</p>
            <img
              src={`http://localhost:5001/uploads/${item.image}`}
              alt={item.name}
              style={{ width: '200px', height: 'auto' }}
            />
            <br />
            <button onClick={() => handleDelete(item.id)}>Delete</button>&nbsp;&nbsp;
            <button onClick={() => handleEdit(item)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
