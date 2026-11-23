
/* ==========================================
   PRACTICUM 10: DOM MANIPULATION
========================================== */

// Get HTML elements using their IDs
const programmeInput = document.getElementById("programmeInput");
const addButton = document.getElementById("addButton");
const programmeList = document.getElementById("programmeList");
const count = document.getElementById("count");

// Select the suggestion section
const suggestionSection = document.querySelector("#programme-management");

// Store the suggestion currently being edited
let editingSuggestion = null;

// Check whether the suggestion system exists
if (programmeInput && addButton && programmeList && count) {

    // Function to update the suggestion count
    function updateCount() {
        count.textContent = programmeList.children.length;
    }

    // Function to add a new suggestion or update an existing one
    function addSuggestion() {

        // Get the entered programme name
        const programmeName = programmeInput.value.trim();

        // Check whether the input is empty
        if (programmeName === "") {
            programmeInput.setAttribute(
                "placeholder",
                "Please enter a suggestion"
            );
            return;
        }

        // Update an existing suggestion
        if (editingSuggestion !== null) {

            const suggestionText =
                editingSuggestion.querySelector("span");

            suggestionText.textContent = programmeName;

            editingSuggestion = null;

            addButton.textContent = "Submit Suggestion";
        }

        // Create a new suggestion if not editing
        else {

            // Create a new list item
            const listItem = document.createElement("li");

            // Create a span to display the suggestion
            const suggestionText = document.createElement("span");
            suggestionText.textContent = programmeName;

            // Create an edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.type = "button";
            editButton.className = "edit-button";

            // Create a remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.type = "button";

            // Add the text and buttons to the list item
            listItem.appendChild(suggestionText);
            listItem.appendChild(editButton);
            listItem.appendChild(removeButton);

            // Add the new suggestion to the webpage
            programmeList.appendChild(listItem);
        }

        // Clear the input field
        programmeInput.value = "";

        programmeInput.setAttribute(
            "placeholder",
            "Enter your programme suggestion"
        );

        // Update the total suggestion count
        updateCount();
    }

    // Listen for clicks on the submit button
    addButton.addEventListener("click", addSuggestion);

    // Listen for clicks on the suggestion list
    programmeList.addEventListener("click", function(event) {

        // Check whether the clicked element is an Edit button
        if (event.target.classList.contains("edit-button")) {

            // Select the suggestion to edit
            editingSuggestion = event.target.parentElement;

            // Display the existing suggestion in the input
            programmeInput.value =
                editingSuggestion.querySelector("span").textContent;

            // Change the button text
            addButton.textContent = "Update Suggestion";

            programmeInput.focus();
        }

        // Check whether the clicked element is a Remove button
        if (event.target.textContent === "Remove") {

            // Select the suggestion to remove
            const listItem = event.target.parentElement;

            // Reset editing if the selected suggestion is removed
            if (editingSuggestion === listItem) {
                editingSuggestion = null;
                addButton.textContent = "Submit Suggestion";
                programmeInput.value = "";
            }

            // Remove the selected suggestion
            listItem.remove();

            // Update the suggestion count
            updateCount();
        }

    });

    // Set the initial suggestion count
    updateCount();
}
