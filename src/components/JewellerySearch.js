import { getJewellery } from "../api/jewelleryAPI";
import { useEffect, useState } from "react";

const JewellerySearch = () => {
  const [jewellery, setJewellery] = useState([]);

  useEffect(() => {
    const fetchJewellery = async () => {
      const data = await getJewellery();
      console.log("Fetched Jewellery Data:", data); // Debugging
      setJewellery(data);
    };

    fetchJewellery();
  }, []);

  return (
    <div>
      <h2>Jewellery Collection</h2>
      {jewellery.map((item) => (
        <div key={item._id}>
          <img src={item.imageUrl} alt={item.name} width="200" />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default JewellerySearch;
