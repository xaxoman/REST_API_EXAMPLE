document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const methodSelect = document.getElementById('METHOD');
    const urlInput = document.getElementById('URL');
    const headersInput = document.getElementById('HEADERS');
    const bodyTextarea = document.getElementById('BODY');
    const responseDiv = document.getElementById('response');
    const sendButton = document.getElementById('sendBtn');

    // Initialize with example values based on method
    methodSelect.addEventListener('change', function() {
        const method = methodSelect.value;
        
        // Set default URL based on method
        urlInput.value = '/api/persone';
        
        // Clear and set appropriate body example based on method
        if (method === 'GET' || method === 'DELETE') {
            bodyTextarea.value = '';
            bodyTextarea.placeholder = method === 'DELETE' ? 'No body needed for DELETE requests' : 'No body needed for GET requests';
        } else if (method === 'PUT') {
            urlInput.value = '/api/persone/1';
            bodyTextarea.placeholder = '{"id": "1", "nome": "Mario", "cognome": "Rossi Updated", "interessi": ["calcio", "lettura", "nuoto"]}';
        } else if (method === 'POST') {
            bodyTextarea.placeholder = '{"id": "21", "nome": "Nuovo", "cognome": "Utente", "interessi": ["interesse1", "interesse2"]}';
            bodyTextarea.value = '{"id": "21", "nome": "Nuovo", "cognome": "Utente", "interessi": ["interesse1", "interesse2"]}';
        }
    });

    // Send request when button is clicked
    sendButton.addEventListener('click', sendRequest);

    function sendRequest() {
        // Get request details
        const method = methodSelect.value;
        const url = urlInput.value;
        let headers = {};
        
        try {
            // Parse headers if provided
            if (headersInput.value.trim()) {
                headers = JSON.parse(headersInput.value);
            }
        } catch (error) {
            displayResponse({
                error: "Invalid headers JSON format",
                message: error.message
            }, 400);
            return;
        }
        
        // Prepare fetch options
        const options = {
            method: method,
            headers: headers
        };
        
        // Add body for POST/PUT requests
        if ((method === 'POST' || method === 'PUT') && bodyTextarea.value.trim()) {
            try {
                // Validate JSON before sending
                const bodyData = JSON.parse(bodyTextarea.value);
                options.body = JSON.stringify(bodyData);
            } catch (error) {
                displayResponse({
                    error: "Invalid body JSON format",
                    message: error.message
                }, 400);
                return;
            }
        }
        
        // Show loading state
        responseDiv.innerHTML = "Loading...";
        
        // Send request
        fetch(url, options)
            .then(response => {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => {
                        displayResponse(data, response.status);
                    });
                } else {
                    return response.text().then(text => {
                        displayResponse(text, response.status);
                    });
                }
            })
            .catch(error => {
                displayResponse({
                    error: "Request failed",
                    message: error.message
                }, 500);
            });
    }
    
    function displayResponse(response, status) {
        let formattedResponse;
        
        if (typeof response === 'object') {
            formattedResponse = JSON.stringify(response, null, 2);
        } else {
            formattedResponse = response.toString();
        }
        
        const statusClass = status >= 200 && status < 300 ? 'success' : 'error';
        responseDiv.innerHTML = `<div class="status ${statusClass}">Status: ${status || 'unknown'}</div>
                               <pre>${formattedResponse}</pre>`;
    }

    // Initialize with GET method selected
    methodSelect.dispatchEvent(new Event('change'));
});
