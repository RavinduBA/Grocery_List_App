import Header from './Header'; // Importing Header component
import Content from './Content'; // Importing Content component
import Footer from './Footer'; // Importing Footer component
import { useState, useEffect } from 'react'; // Importing useState and useEffect hooks from React
import AddItem from './AddItem'; // Importing AddItem component
import SearchItem from './SearchItem'; // Importing SearchItem component
import apiRequest from './apiRequest'; // Importing apiRequest function

function App() {

  const API_URL = 'http://localhost:3500/items'; // Define the API URL

  // State variables for managing shopping list items, new item input, search input, fetch error status, and loading
  const [items, setItems] = useState([]); // State variable for shopping list items
  const [newItem, setNewItem] = useState(''); // State variable for new item input
  const [search, setSearch] = useState(''); // State variable for search input
  const [fetchError, setFetchError] = useState(null); // State variable for fetch error
  const [isLoading, setIsLoading] = useState(true); // State variable for loading indicator

  // Fetch items from API on component mount
  useEffect(() => {
    // Define a function to fetch items asynchronously from the API
    const fetchItems = async () => {
      try {
        // Send a request to the API URL
        const response = await fetch(API_URL);
        // Check if the response is successful; otherwise, throw an error
        if (!response.ok) throw Error('Did not receive expected data');
        // Parse the response body as JSON
        const listItems = await response.json();
        // Update the state with the fetched items
        setItems(listItems);
        // Reset fetch error to null
        setFetchError(null);
      } catch (err) {
        // Set the fetch error state if an error occurs during fetching
        setFetchError(err.message);
      } finally {
        // Set loading indicator to false after fetching is complete
        setIsLoading(false);
      }
    };

    // Execute the fetchItems function after a delay of 2000 milliseconds
    setTimeout(() => {
      // Immediately invoke fetchItems function
      (async () => await fetchItems())();
    }, 2000);

  }, []); // Run this effect only once after initial rendering, hence the empty dependency array


  // Function to add a new item to the shopping list
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // Generating unique id for new item
    const myNewItem = { id, checked: false, item }; // Creating new item object
    const listItems = [...items, myNewItem]; // Adding new item to the list
    setItems(listItems); // Updating the list

    // Prepare options for POST request
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    // Send POST request to API
    const result = await apiRequest(API_URL, postOptions);
    // Set fetch error if result is not null
    if (result) setFetchError(result);
  }

  
  // Function to handle checking/unchecking an item
  const handleCheck = async (id) => {
    // Toggle checked property of the item with given id
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    // Update the list of items
    setItems(listItems);

    // Prepare options for PATCH request
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    // Send PATCH request to API
    const result = await apiRequest(reqUrl, updateOptions);
    // Set fetch error if result is not null
    if (result) setFetchError(result);
  }

  // Function to handle deleting an item
  const handleDelete = async (id) => {
    // Filter out the item to delete
    const listItems = items.filter((item) => item.id !== id);
    // Update the list of items
    setItems(listItems);

    // Prepare options for DELETE request
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    // Send DELETE request to API
    const result = await apiRequest(reqUrl, deleteOptions);
    // Set fetch error if result is not null
    if (result) setFetchError(result);
  }

  // Function to handle form submission for adding a new item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return; // If new item is empty, do nothing
    addItem(newItem); // Add the new item to the list
    setNewItem(''); // Clear the new item input
  }

  // Render the UI components
  return (
    <div className="App">
      <Header /> {/* Render Header component */}
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      /> {/* Render AddItem component and pass props */}
      <SearchItem
        search={search}
        setSearch={setSearch}
      /> {/* Render SearchItem component and pass props */}
      <main>
        {/* Display loading message if isLoading state is true */}
        {isLoading && <p>Loading Items....</p>}
        {/* Display error message if fetchError state is not null */}
        {fetchError && <p>{`Error:  ${fetchError}`}</p>}
        {/* Render content if there is no fetch error and loading is complete */}
        {!fetchError && !isLoading && <Content
          // Pass filtered items and necessary functions to the Content component
          items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} /> {/* Render Footer component and pass props */}
    </div>
  );
}

export default App;
