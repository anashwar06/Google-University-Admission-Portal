
/* ==========================================
   PRACTICUM 15: CUSTOM TOGGLE SWITCH
   ADMISSION NOTIFICATION SETTINGS
========================================== */

// Get the notification toggle checkbox
const notificationToggle =
    document.getElementById("notificationToggle");

// Get the notification status message
const notificationStatus =
    document.getElementById("notificationStatus");

// Get the toggle container
const toggleContainer =
    document.getElementById("toggle-container");

// Check whether the Practicum 15 elements exist
if (notificationToggle && notificationStatus && toggleContainer) {

    // ==========================================
    // PART 1: LOAD THE SAVED SETTING
    // ==========================================

    // Get the saved notification setting from Local Storage
    const savedNotificationSetting =
        localStorage.getItem("admissionNotifications");

    // Restore the saved setting when the page loads
    if (savedNotificationSetting === "enabled") {

        notificationToggle.checked = true;

    } else {

        notificationToggle.checked = false;

    }

    // ==========================================
    // PART 2: UPDATE THE NOTIFICATION SETTING
    // ==========================================

    // Function to update the setting and status
    function updateNotificationSetting() {

        // Check whether the toggle is enabled
        if (notificationToggle.checked) {

            // Save the enabled setting
            localStorage.setItem("admissionNotifications", "enabled");

            // Update the status message
            notificationStatus.textContent =
                "Notifications are currently enabled.";

            // Add the enabled class
            toggleContainer.classList.toggle("notifications-enabled", true);

        } else {

            // Save the disabled setting
            localStorage.setItem("admissionNotifications", "disabled");

            // Update the status message
            notificationStatus.textContent =
                "Notifications are currently disabled.";

            // Remove the enabled class
            toggleContainer.classList.toggle("notifications-enabled", false);

        }

    }

    // ==========================================
    // PART 3: HANDLE TOGGLE CHANGES
    // ==========================================

    // Listen for changes to the checkbox
    notificationToggle.addEventListener("change", updateNotificationSetting);

    // Display the saved setting when the page first loads
    updateNotificationSetting();

}
