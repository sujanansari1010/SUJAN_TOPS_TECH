// Axios function to GET data and display it

// Function to fetch and display data using Axios
async function fetchAndDisplayData() {
  try {
    // Make GET request using axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1;
    
    // Get the data from response
    const data = response.data;
    
    // Display data in console
    console.log('Fetched Data:', data);
    
    // Display data in DOM
    displayDataInDOM(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data: ' + error.message);
  }
}

// Function to display data on the webpage
function displayDataInDOM(data) {
  const container = document.getElementById('data-container');
  
  if (container) {
    container.innerHTML = `
      <h2>Data Retrieved:</h2>
      <p><strong>User ID:</strong> ${data.userId}</p>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Body:</strong> ${data.body}</p>
    `;
  }
}

// Call the function when page loads
window.addEventListener('DOMContentLoaded', fetchAndDisplayData);
