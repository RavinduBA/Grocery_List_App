




const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        // Send a fetch request to the provided URL with the given options
        const response = await fetch(url, optionsObj);

        // Check if the response is not ok (e.g., status code 4xx or 5xx)
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        // If an error occurs during the fetch request, catch it and store the error message
        errMsg = err.message;
    } finally {
        // Return the error message (if any) after the try-catch block execution
        return errMsg;
    }
}

// Export the apiRequest function to make it accessible to other modules
export default apiRequest;