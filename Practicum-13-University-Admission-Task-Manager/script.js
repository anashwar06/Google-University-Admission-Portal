
/* ==========================================
   PRACTICUM 13: UNIVERSITY ADMISSION TASK MANAGER
   CREATE, READ, UPDATE AND DELETE TASKS
========================================== */

// Get the HTML elements
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskDueDate = document.getElementById("taskDueDate");
const taskStatus = document.getElementById("taskStatus");

const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");

// Get the task summary elements
const pendingCount = document.getElementById("pendingCount");
const progressCount = document.getElementById("progressCount");
const completedCount = document.getElementById("completedCount");

// Get the form submit button
const taskSubmitButton = document.getElementById("taskSubmitButton");

// Check whether the task manager exists
if (taskForm && taskList) {

    // Store the ID of the task currently being edited
    let editingTaskId = null;

    // Retrieve previously saved tasks from Local Storage
    let tasks = JSON.parse(localStorage.getItem("universityTasks")) || [];

    // Function to save tasks in Local Storage
    function saveTasks() {
        localStorage.setItem("universityTasks", JSON.stringify(tasks));
    }

    // Function to update the task summary
    function updateTaskSummary() {

        // Count tasks based on their status
        pendingCount.textContent =
            tasks.filter(task => task.status === "Pending").length;

        progressCount.textContent =
            tasks.filter(task => task.status === "In Progress").length;

        completedCount.textContent =
            tasks.filter(task => task.status === "Completed").length;
    }

    // Function to display all tasks
    function displayTasks() {

        // Clear the previous task list
        taskList.textContent = "";

        // Display a message depending on the number of tasks
        if (tasks.length === 0) {
            taskMessage.textContent = "No tasks added yet.";
        } else {
            taskMessage.textContent = "Your admission tasks:";
        }

        // Display each task
        tasks.forEach(function(task) {

            // Create a list item for the task
            const listItem = document.createElement("li");

            // Store the task ID in the list item
            listItem.dataset.taskId = task.id;

            // Create elements for task information
            const title = document.createElement("h3");
            const description = document.createElement("p");
            const category = document.createElement("p");
            const dueDate = document.createElement("p");

            // Add task information
            title.textContent = task.title;
            description.textContent = task.description;
            category.textContent = "Category: " + task.category;
            dueDate.textContent = "Due Date: " + task.dueDate;

            // Create a status selection dropdown
            const statusLabel = document.createElement("label");
            statusLabel.textContent = "Task Status: ";

            const statusSelect = document.createElement("select");

            // Add available status options
            const statusOptions = [
                "Pending",
                "In Progress",
                "Completed"
            ];

            statusOptions.forEach(function(optionText) {

                const option = document.createElement("option");

                option.value = optionText;
                option.textContent = optionText;

                statusSelect.appendChild(option);

            });

            // Display the current task status
            statusSelect.value = task.status;

            // Update task status when the dropdown changes
            statusSelect.addEventListener("change", function() {

                // Find the selected task using its ID
                const selectedTask = tasks.find(function(item) {
                    return item.id === task.id;
                });

                // Update the task status
                if (selectedTask) {
                    selectedTask.status = statusSelect.value;

                    // Save the updated task
                    saveTasks();

                    // Update the task summary
                    updateTaskSummary();
                }

            });

            statusLabel.appendChild(statusSelect);

            // Add task information to the list item
            listItem.appendChild(title);
            listItem.appendChild(description);
            listItem.appendChild(category);
            listItem.appendChild(dueDate);
            listItem.appendChild(statusLabel);

            // Create an Edit button
            const editButton = document.createElement("button");

            editButton.textContent = "Edit";
            editButton.type = "button";

            // Add editing functionality
            editButton.addEventListener("click", function() {

                // Find the selected task
                const selectedTask = tasks.find(function(item) {
                    return item.id === task.id;
                });

                if (selectedTask) {

                    // Fill the form with existing task details
                    taskTitle.value = selectedTask.title;
                    taskDescription.value = selectedTask.description;
                    taskCategory.value = selectedTask.category;
                    taskDueDate.value = selectedTask.dueDate;
                    taskStatus.value = selectedTask.status;

                    // Store the ID of the task being edited
                    editingTaskId = selectedTask.id;

                    // Change the submit button text
                    taskSubmitButton.textContent = "Update Task";

                    // Move the page to the task form
                    taskForm.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            });

            // Create a Delete button
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.type = "button";

            // Add deleting functionality
            deleteButton.addEventListener("click", function() {

                // Remove the selected task from the array
                tasks = tasks.filter(function(item) {
                    return item.id !== task.id;
                });

                // Remove the task from the webpage
                listItem.remove();

                // Save the updated task list
                saveTasks();

                // Update the task summary
                updateTaskSummary();

                // Display a message if no tasks remain
                if (tasks.length === 0) {
                    taskMessage.textContent = "No tasks added yet.";
                }

                // Reset the form if the deleted task was being edited
                if (editingTaskId === task.id) {
                    editingTaskId = null;
                    taskForm.reset();
                    taskSubmitButton.textContent = "Add Task";
                }

            });

            // Add buttons to the task
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            // Add the task to the webpage
            taskList.appendChild(listItem);

        });

        // Update the task summary
        updateTaskSummary();
    }

    // Handle adding and updating tasks
    taskForm.addEventListener("submit", function(event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Check whether the form is valid
        if (!taskForm.checkValidity()) {
            taskForm.reportValidity();
            return;
        }

        // Check whether the user is editing an existing task
        if (editingTaskId !== null) {

            // Find the task being edited
            const selectedTask = tasks.find(function(task) {
                return task.id === editingTaskId;
            });

            // Update the existing task details
            if (selectedTask) {

                selectedTask.title = taskTitle.value.trim();
                selectedTask.description = taskDescription.value.trim();
                selectedTask.category = taskCategory.value;
                selectedTask.dueDate = taskDueDate.value;
                selectedTask.status = taskStatus.value;

            }

            // Finish editing mode
            editingTaskId = null;

            // Change the button text back
            taskSubmitButton.textContent = "Add Task";

        } else {

            // Create a new task object
            const newTask = {
                id: Date.now(),
                title: taskTitle.value.trim(),
                description: taskDescription.value.trim(),
                category: taskCategory.value,
                dueDate: taskDueDate.value,
                status: taskStatus.value
            };

            // Add the new task to the array
            tasks.push(newTask);
        }

        // Save tasks in Local Storage
        saveTasks();

        // Display the updated task list
        displayTasks();

        // Clear the form
        taskForm.reset();

    });

    // Display previously saved tasks when the page loads
    displayTasks();

}
