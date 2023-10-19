document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
  
    // Function to display an error message
    function showError(input, message) {
      const errorElement = document.getElementById(input.id + 'Error');
      errorElement.textContent = message;
    }
  
    // Function to clear the error message
    function clearError(input) {
      const errorElement = document.getElementById(input.id + 'Error');
      errorElement.textContent = '';
    }
  
    // Function to validate username
    function validateUsername() {
      if (username.value.trim() === '') {
        showError(username, 'Username is required');
      } else {
        clearError(username);
      }
    }
  
    // Function to validate email
    function validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === '') {
        showError(email, 'Email is required');
      } else if (!emailPattern.test(email.value)) {
        showError(email, 'Invalid email format');
      } else {
        clearError(email);
      }
    }
  
    // Function to validate password
    function validatePassword() {
      if (password.value.trim() === '') {
        showError(password, 'Password is required');
      } else if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
      } else {
        clearError(password);
      }
    }
  
    // Function to validate confirm password
    function validateConfirmPassword() {
      if (confirmPassword.value.trim() === '') {
        showError(confirmPassword, 'Confirm Password is required');
      } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
      } else {
        clearError(confirmPassword);
      }
    }
  
    // Event listeners for real-time validation
    username.addEventListener('blur', validateUsername);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);
  
    // Form submission handler
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Validate all fields before allowing submission
      validateUsername();
      validateEmail();
      validatePassword();
      validateConfirmPassword();
  
      // If all fields are valid, submit the form. 
      if (!document.querySelector('.error')) {
        alert('Registration successful!'); 
      }
    });
  });
  