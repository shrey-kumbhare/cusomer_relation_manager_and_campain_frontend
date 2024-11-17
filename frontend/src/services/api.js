// Helper function to handle the POST request with JSON data
const postRequest = async (url, data) => {
  try {
    const response = await fetch(`https://shreycrmbackend.onrender.com${url}`, {
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
    const response = await fetch(`https://shreycrmbackend.onrender.com${url}`);
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
  postRequest(`https://shreycrmbackend.onrender.com/customers`, customerData);
export const createOrder = (orderData) =>
  postRequest(`https://shreycrmbackend.onrender.com/orders`, orderData);
export const createAudience = (audienceData) =>
  postRequest(
    `https://shreycrmbackend.onrender.com/campaigns/audience`,
    audienceData
  );
export const getCampaigns = () =>
  getRequest(`https://shreycrmbackend.onrender.com/campaigns/`);
export const getCustomers = () =>
  getRequest(`https://shreycrmbackend.onrender.com/customers`);
