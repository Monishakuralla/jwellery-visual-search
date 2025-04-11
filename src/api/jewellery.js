// src/api/jewellery.js
import axios from "axios";

const fetchJewellery = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:5000/admin/jewellery", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched Jewellery Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching jewellery:", error.response?.data || error.message);
    return [];
  }
};

export { fetchJewellery };
