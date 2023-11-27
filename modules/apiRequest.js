async function makeAPIRequest(url, method = "GET", headers = {}, body = null) {
  try {
    const options = {
      method: method.toUpperCase(),
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch data");
  }
}
