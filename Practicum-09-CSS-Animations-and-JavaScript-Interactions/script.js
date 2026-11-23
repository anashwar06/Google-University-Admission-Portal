/* ==========================================
   PRACTICUM 9: ANIMATED USER INTERACTIONS
========================================== */

// Get HTML elements using their IDs
const detailsButton = document.getElementById("detailsButton");
const programmeCard = document.getElementById("programmeCard");

const notifyButton = document.getElementById("notifyButton");
const notification = document.getElementById("notification");

// Show or hide programme information
if (detailsButton && programmeCard) {

    detailsButton.addEventListener("click", function() {

        // Toggle the show class
        programmeCard.classList.toggle("show");

        // Change button text
        if (programmeCard.classList.contains("show")) {

            detailsButton.textContent = "Hide Programme Details";

        } else {

            detailsButton.textContent = "View Programme Details";

        }

    });
}

// Display admission notification
if (notifyButton && notification) {

    notifyButton.addEventListener("click", function() {

        // Show notification
        notification.classList.add("show");

        // Hide notification after 3 seconds
        setTimeout(function() {

            notification.classList.remove("show");

        }, 3000);

    });
}