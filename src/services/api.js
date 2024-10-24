const API_URL = "http://localhost:3002";

async function apiRequest(endpoint, method = "GET", data = null, headers = {}) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (data) {
    if (data instanceof FormData) {
      config.body = data;
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

export function get(endpoint, headers = {}) {
  return apiRequest(endpoint, "GET", null, headers);
}

export function post(endpoint, data, headers = {}) {
  console.log(data);
  return apiRequest(endpoint, "POST", data, headers);
}

export function put(endpoint, data, headers = {}) {
  return apiRequest(endpoint, "PUT", data, headers);
}

export function del(endpoint, headers = {}) {
  return apiRequest(endpoint, "DELETE", null, headers);
}
