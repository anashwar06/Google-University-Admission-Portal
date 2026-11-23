
/* ==========================================
   PRACTICUM 12: API DATA MANAGEMENT
========================================== */

// Get the HTML elements
const fetchButton = document.getElementById("fetchButton");
const apiStatus = document.getElementById("apiStatus");
const apiTableBody = document.getElementById("apiTableBody");

// Check whether the API section exists
if (fetchButton && apiStatus && apiTableBody) {

    // Function to fetch programming resources
    async function fetchCodingResources() {

        try {

            // Display loading message
            apiStatus.textContent = "Loading programming resources...";

            // Disable button while loading
            fetchButton.disabled = true;

            // Request programming repositories from GitHub
            const response = await fetch(
                "https://api.github.com/search/repositories?q=javascript+tutorial&sort=stars&per_page=8"
            );

            // Check whether the request was successful
            if (!response.ok) {
                throw new Error(
                    "Unable to retrieve resources. Status: " + response.status
                );
            }

            // Convert response into JSON format
            const data = await response.json();

            // Clear previous table data
            apiTableBody.textContent = "";

            // Check whether repositories are available
            if (!data.items || data.items.length === 0) {
                apiStatus.textContent = "No programming resources found.";
                return;
            }

            // Create a table row for each repository
            data.items.forEach(function(resource) {

                // Create a new table row
                const row = document.createElement("tr");

                // Create table cells
                const nameCell = document.createElement("td");
                const topicsCell = document.createElement("td");
                const typeCell = document.createElement("td");
                const websiteCell = document.createElement("td");

                // Display repository name
                nameCell.textContent = resource.full_name;

                // Display topics or description
                topicsCell.textContent =
                    resource.topics && resource.topics.length > 0
                    ? resource.topics.join(", ")
                    : resource.description || "Not available";

                // Display programming language
                typeCell.textContent =
                    resource.language || "Not specified";

                // Create a link to the repository
                const websiteLink = document.createElement("a");

                websiteLink.textContent = "Visit Resource";
                websiteLink.href = resource.html_url;
                websiteLink.target = "_blank";
                websiteLink.rel = "noopener noreferrer";

                websiteCell.appendChild(websiteLink);

                // Add cells to the row
                row.appendChild(nameCell);
                row.appendChild(topicsCell);
                row.appendChild(typeCell);
                row.appendChild(websiteCell);

                // Add the row to the table
                apiTableBody.appendChild(row);

            });

            // Display success message
            apiStatus.textContent =
                "Programming resources loaded successfully! Total resources: "
                + data.items.length;

            // Display API data in the console
            console.log("GitHub API Data:", data);

        } catch (error) {

            // Display error message
            apiStatus.textContent =
                "Error loading resources: " + error.message;

            console.error("API Error:", error);

        } finally {

            // Enable button after request completes
            fetchButton.disabled = false;

            // Display completion message
            console.log("API request completed.");

        }

    }

    // Fetch data when the button is clicked
    fetchButton.addEventListener("click", fetchCodingResources);
}
