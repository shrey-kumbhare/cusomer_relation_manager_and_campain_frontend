// Use the environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Helper function to handle the POST request with JSON data
const postRequest = async (url, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

// Helper function to handle the GET request
const getRequest = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

export const createCustomer = (customerData) =>
  postRequest(`${API_BASE_URL}customers`, customerData);
export const createOrder = (orderData) =>
  postRequest(`${API_BASE_URL}/orders`, orderData);
export const createAudience = (audienceData) =>
  postRequest(`${API_BASE_URL}/campaigns/audience`, audienceData);
export const getCampaigns = () => getRequest(`${API_BASE_URL}/campaigns/`);
export const getCustomers = () => getRequest(`${API_BASE_URL}/customers`);
