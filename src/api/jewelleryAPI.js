import axios from "axios";

const getJewellery = async () => {
  const token = localStorage.getItem("token"); // Get stored token
  try {
    const response = await axios.get("http://localhost:5000/admin/jewellery", {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token in request header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jewellery:", error.response.data);
    return [];
  }
};

export { getJewellery };
