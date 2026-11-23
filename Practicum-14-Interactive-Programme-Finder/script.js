/* ==========================================
   PRACTICUM 14: INTERACTIVE PROGRAMME FINDER
   SEARCH, FILTER AND SELECT PROGRAMMES
========================================== */

// Get the Programme Finder section
const programmeFinder = document.querySelector("#programme-finder");

// Get the search and filter elements
const programmeSearch = document.getElementById("programmeSearch");
const programmeFilter = document.getElementById("programmeFilter");
const clearProgrammeSearch = document.getElementById("clearProgrammeSearch");

// Get the programme list
const interactiveProgrammeList =
    document.getElementById("interactiveProgrammeList");

// Get the message displayed when no programmes match
const noProgrammeMessage =
    document.getElementById("noProgrammeMessage");

// Check whether the Programme Finder exists
if (
    programmeFinder &&
    programmeSearch &&
    programmeFilter &&
    clearProgrammeSearch &&
    interactiveProgrammeList &&
    noProgrammeMessage
) {

    // Select all programme items
    const programmeItems = Array.from(
        interactiveProgrammeList.querySelectorAll(".programme-item")
    );


    // ==========================================
    // PART 1: SEARCH AND FILTER PROGRAMMES
    // ==========================================

    // Function to search and filter programmes
    function filterProgrammes() {

        // Get the entered search text
        const searchText = programmeSearch.value.toLowerCase().trim();

        // Get the selected programme level
        const selectedLevel = programmeFilter.value;

        // Filter programmes based on search and level
        const matchingProgrammes = programmeItems.filter(function(programme) {

            // Get the programme name
            const programmeName =
                programme.querySelector("h3").textContent.toLowerCase();

            // Check whether the programme name matches
            const matchesSearch = programmeName.includes(searchText);

            // Check whether the programme level matches
            const matchesLevel =
                selectedLevel === "All" ||
                programme.dataset.level === selectedLevel;

            // Return programmes matching both conditions
            return matchesSearch && matchesLevel;

        });

        // Show matching programmes and hide others
        programmeItems.forEach(function(programme) {

            if (matchingProgrammes.includes(programme)) {

                // Display the matching programme
                programme.classList.remove("hidden-programme");

            } else {

                // Hide programmes that do not match
                programme.classList.add("hidden-programme");

            }

        });

        // Display a message if no programmes match
        if (matchingProgrammes.length === 0) {
            noProgrammeMessage.hidden = false;
        } else {
            noProgrammeMessage.hidden = true;
        }

    }


    // Search when the user types
    programmeSearch.addEventListener("input", filterProgrammes);

    // Filter when the dropdown changes
    programmeFilter.addEventListener("change", filterProgrammes);


    // ==========================================
    // PART 2: CLEAR SEARCH AND FILTERS
    // ==========================================

    // Clear the search and filter
    clearProgrammeSearch.addEventListener("click", function() {

        // Reset the search field
        programmeSearch.value = "";

        // Reset the dropdown
        programmeFilter.value = "All";

        // Display all programmes again
        filterProgrammes();

    });


    // ==========================================
    // PART 3: SELECT A PROGRAMME
    // ==========================================

    // Get all Select Programme buttons
    const selectButtons =
        interactiveProgrammeList.querySelectorAll(".selectProgramme");

    // Add click functionality to each button
    selectButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            // Find the selected programme card
            const selectedCard = button.closest(".programme-item");

            // Get the selected programme name
            const selectedName =
                selectedCard.querySelector("h3").textContent;

            // Find the selected programme in the list
            const selectedProgramme = programmeItems.find(function(programme) {

                return programme.querySelector("h3").textContent === selectedName;

            });

            // Toggle the selected programme highlight
            if (selectedProgramme) {

                selectedProgramme.classList.toggle("programme-selected");

            }

            // Display the selection message
            alert(
                "You selected: " + selectedName +
                "\nYou can now proceed to the application page."
            );

        });

    });

}