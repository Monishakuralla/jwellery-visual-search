// src/components/JewelleryList.js
import { useEffect, useState } from "react";
import { fetchJewellery } from "../api/jewellery";

const JewelleryList = () => {
  const [jewellery, setJewellery] = useState([]);

  useEffect(() => {
    const getJewellery = async () => {
      const data = await fetchJewellery();
      setJewellery(data);
    };
    getJewellery();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>
        Jewellery Collection
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {jewellery.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3 style={{ marginTop: "15px", fontSize: "1.2rem" }}>{item.name}</h3>
            <p>{item.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelleryList;
