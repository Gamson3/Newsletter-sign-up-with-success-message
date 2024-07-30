// Initialize form validation and success message handling when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  // Get references to the form, email input, and error message elements
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById("email-input");
  const errorMsg = document.getElementById("error-msg");

  form.noValidate = true; // Disable default HTML5 form validation

  // Handle form submission to validate email input and show success or error messages
  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent default form submission

      const emailValue = emailInput.value.trim(); // Get and trim the email input value

      if (!emailValue) {
          // Display an error message and add error styling if the email input is empty
          errorMsg.textContent = "Valid email required";
          emailInput.classList.add("error");
      } else if (!validateEmail(emailValue)) {
          // Display an error message and add error styling if the email format is invalid
          errorMsg.textContent = "Valid email required";
          emailInput.classList.add("error");
      } else {
          // Clear any error messages and styling, then show the success message if the email is valid
          emailInput.classList.remove("error");
          errorMsg.textContent = "";
          showSuccessMessage(emailValue); // Call function to display the success message
      }
  });

  // Validate email input in real-time as the user types
  emailInput.addEventListener("input", function() {
      const emailValue = emailInput.value.trim(); 

      if (validateEmail(emailValue)) {
          // Remove error styling and clear error messages if the email format is valid
          emailInput.classList.remove("error");
          errorMsg.textContent = "";
      }
  });

  /**
   * Validate the format of the email address using a regular expression.
   * @param {string} email - The email address to validate.
   * @returns {boolean} - True if the email is valid, otherwise false.
   */
  function validateEmail(email) {
      const emailRegex = /^(?!.*\.\.)(?!.*--)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(String(email).toLowerCase());
  }

  /**
   * Display a success message and update the UI after a successful email submission.
   * @param {string} email - The email address that was successfully submitted.
   */
  function showSuccessMessage(email) {
      const signupFormContainer = document.getElementById("signup-form-container");
      const successMessage = document.getElementById("success-message");
      const successEmail = document.getElementById("success-email");

      successEmail.textContent = email; // Display the submitted email in the success message
      signupFormContainer.style.display = "none"; // Hide the signup form
      successMessage.style.display = "flex"; // Show the success message
  }

  /**
   * Reset the form and hide the success message when dismissed.
   */
  window.dismissMessage = function() {
      const signupFormContainer = document.getElementById("signup-form-container");
      const successMessage = document.getElementById("success-message");

      emailInput.value = ''; // Clear the email input field
      emailInput.classList.remove('error'); // Remove error styling

      signupFormContainer.style.display = "flex"; // Show the signup form
      successMessage.style.display = "none"; // Hide the success message
  }

});