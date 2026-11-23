
/* ==========================================
   PRACTICUM 11: FORM VALIDATION
========================================== */

// Get the form and message elements
const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");
const studentAge = document.getElementById("studentAge");

// Check whether the enquiry form exists
if (enquiryForm && formMessage && studentAge) {

    // Set a custom validation message for age
    studentAge.addEventListener("input", function() {

        if (studentAge.value !== "" &&
            (Number(studentAge.value) < 16 ||
             Number(studentAge.value) > 35)) {

            studentAge.setCustomValidity(
                "Age must be between 16 and 35."
            );

        } else {
            studentAge.setCustomValidity("");
        }

    });

    // Validate the form when submitted
    enquiryForm.addEventListener("submit", function(event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Check whether all fields are valid
        if (enquiryForm.checkValidity()) {

            // Display success message
            formMessage.textContent =
                "Your admission enquiry has been submitted successfully!";

            formMessage.style.color = "green";

            // Clear the form after successful submission
            enquiryForm.reset();

            // Clear the custom age validation message
            studentAge.setCustomValidity("");

        } else {

            // Display error message
            formMessage.textContent =
                "Please correct the highlighted fields and try again.";

            formMessage.style.color = "red";

            // Display browser validation messages
            enquiryForm.reportValidity();
        }

    });
}
